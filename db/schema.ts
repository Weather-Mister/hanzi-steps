import {sqliteTable,text,integer,index} from 'drizzle-orm/sqlite-core';
export const practiceSessions=sqliteTable('practice_sessions',{
 id:text('id').primaryKey(),userId:text('user_id').notNull(),lessonId:text('lesson_id').notNull(),position:integer('position').notNull(),independent:integer('independent').notNull(),assisted:integer('assisted').notNull(),complete:integer('complete').notNull(),updatedAt:integer('updated_at').notNull(),completedAt:integer('completed_at')
},table=>[index('idx_practice_sessions_user_lesson').on(table.userId,table.lessonId),index('idx_practice_sessions_user_complete').on(table.userId,table.complete,table.completedAt)]);
