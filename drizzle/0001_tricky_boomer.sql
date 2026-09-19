ALTER TABLE `practice_sessions` ADD `completed_at` integer;--> statement-breakpoint
CREATE INDEX `idx_practice_sessions_user_complete` ON `practice_sessions` (`user_id`,`complete`,`completed_at`);