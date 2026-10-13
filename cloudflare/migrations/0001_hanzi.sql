-- Standalone Hanzi Steps backend. No other Supabase application's tables are imported.
CREATE TABLE username_accounts (
 username TEXT PRIMARY KEY CHECK(length(username) BETWEEN 2 AND 32),
 legacy_user_id TEXT NOT NULL UNIQUE, created_at TEXT NOT NULL
);
CREATE TABLE lesson_lengths (
 lesson_id TEXT PRIMARY KEY, steps INTEGER NOT NULL CHECK(steps>0),
 historical_steps TEXT NOT NULL DEFAULT '[]' CHECK(json_valid(historical_steps))
);
CREATE TABLE hanzi_sessions (
 id TEXT PRIMARY KEY, user_id TEXT NOT NULL, lesson_id TEXT NOT NULL,
 position INTEGER NOT NULL CHECK(position>=0), independent INTEGER NOT NULL CHECK(independent>=0),
 assisted INTEGER NOT NULL CHECK(assisted>=0), complete INTEGER NOT NULL CHECK(complete IN (0,1)),
 updated_at INTEGER NOT NULL, completed_at INTEGER,
 CHECK(independent+assisted<=position)
);
CREATE INDEX sessions_user_lesson ON hanzi_sessions(user_id,lesson_id,complete,updated_at DESC,id);
CREATE INDEX sessions_user_completed ON hanzi_sessions(user_id,completed_at) WHERE complete=1;
CREATE TABLE mastered_vocab (
 user_id TEXT NOT NULL, vocab_id TEXT NOT NULL CHECK(length(vocab_id) BETWEEN 1 AND 1024),
 created_at TEXT NOT NULL, PRIMARY KEY(user_id,vocab_id)
);
CREATE TABLE practice_skill_state (
 user_id TEXT NOT NULL, item_id TEXT NOT NULL, mode TEXT NOT NULL,
 attempts INTEGER NOT NULL DEFAULT 0, correct INTEGER NOT NULL DEFAULT 0,
 assisted INTEGER NOT NULL DEFAULT 0, misses INTEGER NOT NULL DEFAULT 0,
 streak INTEGER NOT NULL DEFAULT 0, strength REAL NOT NULL DEFAULT 0 CHECK(strength BETWEEN 0 AND 1),
 last_seen INTEGER NOT NULL DEFAULT 0, next_review INTEGER NOT NULL DEFAULT 0,
 clean_correct INTEGER NOT NULL DEFAULT 0, clean_tracked INTEGER NOT NULL DEFAULT 0,
 PRIMARY KEY(user_id,item_id,mode)
);
CREATE TABLE practice_attempt_events (
 user_id TEXT NOT NULL, attempt_id TEXT NOT NULL, item_id TEXT NOT NULL,
 mode TEXT NOT NULL CHECK(mode IN ('recognition','recall','pinyin','input','sentence','handwriting','context')),
 correct INTEGER NOT NULL CHECK(correct IN (0,1)), assisted INTEGER NOT NULL CHECK(assisted IN (0,1)),
 session_kind TEXT NOT NULL CHECK(session_kind IN ('lesson','daily','revenge','mega','taiwan')),
 created_at TEXT NOT NULL, PRIMARY KEY(user_id,attempt_id)
);
-- An insert and its aggregate update are one SQLite transaction. Duplicate
-- retries do not fire this trigger, even across concurrent Worker instances.
CREATE TRIGGER practice_event_added AFTER INSERT ON practice_attempt_events BEGIN
 INSERT INTO practice_skill_state(user_id,item_id,mode)
 VALUES(NEW.user_id,NEW.item_id,NEW.mode) ON CONFLICT DO NOTHING;
 UPDATE practice_skill_state SET
  attempts=attempts+1, correct=correct+NEW.correct, assisted=assisted+NEW.assisted,
  misses=misses+(1-NEW.correct), clean_correct=clean_correct+NEW.correct*(1-NEW.assisted),
  clean_tracked=clean_tracked+1,
  strength=CASE WHEN NEW.correct=1 AND NEW.assisted=0 THEN min(1.0,strength+0.16+min(streak+1,5)*0.02)
                WHEN NEW.correct=1 THEN max(0.05,strength*0.9) ELSE max(0.0,strength*0.55) END,
  streak=CASE WHEN NEW.correct=1 AND NEW.assisted=0 THEN streak+1 ELSE 0 END,
  last_seen=CAST(round((julianday(NEW.created_at)-2440587.5)*86400000) AS INTEGER)
 WHERE user_id=NEW.user_id AND item_id=NEW.item_id AND mode=NEW.mode;
 UPDATE practice_skill_state SET next_review=last_seen+CASE
  WHEN strength<0.2 THEN 600000 WHEN strength<0.4 THEN 86400000
  WHEN strength<0.65 THEN 259200000 WHEN strength<0.82 THEN 604800000 ELSE 1209600000 END
 WHERE user_id=NEW.user_id AND item_id=NEW.item_id AND mode=NEW.mode;
END;
CREATE TABLE hanzi_push_subscriptions (
 endpoint TEXT PRIMARY KEY, user_id TEXT NOT NULL, p256dh TEXT NOT NULL, auth TEXT NOT NULL,
 enabled INTEGER NOT NULL DEFAULT 1, streak_reminders INTEGER NOT NULL DEFAULT 1,
 encouragement INTEGER NOT NULL DEFAULT 1, sentence_checks INTEGER NOT NULL DEFAULT 1,
 created_at TEXT NOT NULL, updated_at TEXT NOT NULL,
 last_sent_at TEXT, last_streak_day TEXT, last_encouragement_at TEXT,
 last_sentence_at TEXT, last_sentence_id TEXT, failure_count INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX push_user ON hanzi_push_subscriptions(user_id);
CREATE INDEX push_enabled ON hanzi_push_subscriptions(enabled);
CREATE TABLE hanzi_push_log (
 id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT NOT NULL, kind TEXT NOT NULL,
 sentence_id TEXT, sent_at TEXT NOT NULL
);
CREATE TABLE push_deliveries (
 endpoint TEXT NOT NULL, slot TEXT NOT NULL, claimed_at INTEGER NOT NULL,
 status TEXT NOT NULL DEFAULT 'pending', PRIMARY KEY(endpoint,slot)
);
CREATE TABLE migration_state (
 key TEXT PRIMARY KEY, value TEXT NOT NULL
);
INSERT INTO migration_state(key,value) VALUES('ready','false');
