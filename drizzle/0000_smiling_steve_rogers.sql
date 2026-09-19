CREATE TABLE `practice_sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`lesson_id` text NOT NULL,
	`position` integer NOT NULL,
	`independent` integer NOT NULL,
	`assisted` integer NOT NULL,
	`complete` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_practice_sessions_user_lesson` ON `practice_sessions` (`user_id`,`lesson_id`);