'use client';

import {createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode} from 'react';

type FeedbackKind = 'tap' | 'stroke' | 'success' | 'retry' | 'complete';
type FeedbackPreferences = {animations: boolean; sounds: boolean};
type Note = {at: number; frequency: number; endFrequency?: number; duration: number; volume: number};
type Voice = {oscillator: OscillatorNode; gain: GainNode};
const storageKey = 'hanzi-steps-feedback-v1';
const defaults: FeedbackPreferences = {animations: true, sounds: true};
const notes: Record<FeedbackKind, Note[]> = {
  tap: [{at: 0, frequency: 740, endFrequency: 570, duration: .045, volume: .045}],
  stroke: [{at: 0, frequency: 880, endFrequency: 720, duration: .028, volume: .022}],
  success: [
    {at: 0, frequency: 659.25, duration: .075, volume: .055},
    {at: .085, frequency: 880, duration: .105, volume: .055},
  ],
  retry: [{at: 0, frequency: 370, endFrequency: 311.13, duration: .11, volume: .045}],
  complete: [
    {at: 0, frequency: 523.25, duration: .08, volume: .055},
    {at: .09, frequency: 659.25, duration: .08, volume: .055},
    {at: .18, frequency: 783.99, duration: .16, volume: .06},
  ],
};
const audioConstructor = () => window.AudioContext ||
  (window as typeof window & {webkitAudioContext?: typeof AudioContext}).webkitAudioContext;

const FeedbackContext = createContext<{
  preferences: FeedbackPreferences;
  updatePreferences: (next: FeedbackPreferences) => void;
  soundAvailable: boolean;
  reducedMotion: boolean;
  feedback: (kind?: FeedbackKind) => void;
  stopFeedback: () => void;
} | null>(null);

export function InteractionFeedback({children}: {children: ReactNode}) {
  const [preferences, setPreferences] = useState(defaults);
  const [soundAvailable, setSoundAvailable] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const current = useRef(defaults);
  const audio = useRef<AudioContext | null>(null);
  const voices = useRef(new Set<Voice>());
  const generation = useRef(0);
  const quietUntil = useRef(0);
  const lastKind = useRef<FeedbackKind>('tap');

  const stopFeedback = useCallback(() => {
    generation.current++;
    quietUntil.current = 0;
    const context = audio.current;
    if (!context) return;
    for (const {oscillator, gain} of voices.current) {
      try {
        const now = context.currentTime;
        const level = gain.gain.value;
        gain.gain.cancelScheduledValues(now);
        gain.gain.setValueAtTime(level, now);
        gain.gain.linearRampToValueAtTime(0, now + .008);
        oscillator.stop(now + .01);
      } catch {}
    }
    voices.current.clear();
  }, []);

  useEffect(() => {
    let saved = defaults;
    try {
      const value = JSON.parse(localStorage.getItem(storageKey) || 'null');
      if (value && typeof value === 'object') {
        // Retain the existing animation choice when replacing the old haptic setting.
        saved = {
          animations: typeof value.animations === 'boolean' ? value.animations : true,
          sounds: typeof value.sounds === 'boolean' ? value.sounds : true,
        };
      }
    } catch {}
    current.current = saved;
    setPreferences(saved);
    setSoundAvailable(typeof audioConstructor() === 'function');
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReducedMotion(media.matches);
    const onVisibility = () => { if (document.hidden) stopFeedback(); };
    updateMotion();
    media.addEventListener('change', updateMotion);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      media.removeEventListener('change', updateMotion);
      document.removeEventListener('visibilitychange', onVisibility);
      delete document.documentElement.dataset.feedbackMotion;
      stopFeedback();
      const context = audio.current;
      audio.current = null;
      if (context && context.state !== 'closed') void context.close().catch(() => {});
    };
  }, [stopFeedback]);

  useEffect(() => {
    document.documentElement.dataset.feedbackMotion = preferences.animations && !reducedMotion ? 'on' : 'off';
  }, [preferences.animations, reducedMotion]);

  const updatePreferences = useCallback((next: FeedbackPreferences) => {
    current.current = next;
    setPreferences(next);
    if (!next.sounds) stopFeedback();
    try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch {}
  }, [stopFeedback]);

  const feedback = useCallback((kind: FeedbackKind = 'tap') => {
    const speaking = () => 'speechSynthesis' in window &&
      (window.speechSynthesis.speaking || window.speechSynthesis.pending);
    if (!current.current.sounds || document.hidden || speaking()) return;
    const now = performance.now();
    // A bubbling click must not add a second blip over an answer sound.
    if (now < quietUntil.current && (kind === 'tap' || kind === 'stroke' || kind === lastKind.current)) return;
    try {
      const Constructor = audioConstructor();
      if (!Constructor) return;
      // This is called by interaction handlers: never start audio on page load.
      if (!audio.current || audio.current.state === 'closed') audio.current = new Constructor();
      const context = audio.current;
      stopFeedback();
      const ticket = generation.current;
      const phrase = notes[kind];
      lastKind.current = kind;
      quietUntil.current = now + Math.max(...phrase.map(note => note.at + note.duration)) * 1000 + 35;
      const play = () => {
        // Don't replay a stale tap after muting, speech, or returning to the tab.
        if (ticket !== generation.current || !current.current.sounds || document.hidden ||
            speaking() || context.state !== 'running' || performance.now() - now > 400) return;
        const start = context.currentTime + .005;
        for (const note of phrase) {
          const oscillator = context.createOscillator();
          const gain = context.createGain();
          const voice = {oscillator, gain};
          voices.current.add(voice);
          const at = start + note.at;
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(note.frequency, at);
          if (note.endFrequency) oscillator.frequency.exponentialRampToValueAtTime(note.endFrequency, at + note.duration);
          // Rounded attack and decay keep these quiet, short tones free of clicks.
          gain.gain.setValueAtTime(.0001, at);
          gain.gain.linearRampToValueAtTime(note.volume, at + .006);
          gain.gain.exponentialRampToValueAtTime(.0001, at + note.duration);
          oscillator.connect(gain);
          gain.connect(context.destination);
          oscillator.onended = () => {
            oscillator.disconnect();
            gain.disconnect();
            voices.current.delete(voice);
          };
          oscillator.start(at);
          oscillator.stop(at + note.duration + .008);
        }
      };
      if (context.state === 'running') play();
      else void context.resume().then(play).catch(() => {});
    } catch {
      // Sound is optional; an unavailable audio device never blocks an answer.
    }
  }, [stopFeedback]);

  return <FeedbackContext.Provider value={{preferences, updatePreferences, soundAvailable, reducedMotion, feedback, stopFeedback}}>{children}</FeedbackContext.Provider>;
}

export function useInteractionFeedback() {
  const context = useContext(FeedbackContext);
  if (!context) throw new Error('Interaction feedback must be inside its provider.');
  return context;
}
