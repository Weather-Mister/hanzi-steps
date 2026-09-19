import {type Session, validSession} from './curriculum';

type DraftStorage = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;
export const progressDraftKey = (userKey: string) => `hanzi-steps-unsynced-v1-${userKey}`;
const legacyKey = progressDraftKey('signed-out');

function read(storage: DraftStorage, key: string): Session[] {
  try {
    const value: unknown = JSON.parse(storage.getItem(key) || '[]');
    return Array.isArray(value) ? value.filter(validSession) : [];
  } catch {
    return [];
  }
}

export function readProgressDrafts(storage: DraftStorage, userKey: string): Session[] {
  const key = progressDraftKey(userKey);
  const current = read(storage, key);
  if (userKey === 'signed-out') return current;

  // Version 1 was owner-only. The missing identity header placed that owner's
  // unsynced checkpoints in this legacy key. Recover them after sign-in.
  const legacy = read(storage, legacyKey);
  if (!legacy.length) return current;
  const combined = new Map<string, Session>();
  for (const session of [...legacy, ...current]) {
    const previous = combined.get(session.id);
    if (!previous || session.index > previous.index ||
        (session.index === previous.index && session.updatedAt >= previous.updatedAt)) {
      combined.set(session.id, session);
    }
  }
  const drafts = [...combined.values()];
  try {
    // Copy successfully before removing the old backup. A storage failure must
    // leave the recovery source intact; the server still owns durable progress.
    storage.setItem(key, JSON.stringify(drafts));
    storage.removeItem(legacyKey);
  } catch {}
  return drafts;
}
