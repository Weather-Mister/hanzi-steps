-- Register the published Book 2 Lesson 1 units with the progress checkpoint validator.
-- Production was hotfixed with this same migration after saves began returning
-- SQLSTATE 22023 ("Invalid lesson checkpoint") for the new Book 2 lesson IDs.

begin;

insert into hanzi_private.lesson_lengths(lesson_id,steps) values
('b2u1-l1-lesson',12),
('b2u1-l2-lesson',8),
('b2u1-l3-lesson',8),
('b2u1-l4-lesson',8),
('b2u1-l5-lesson',13),
('b2u1-l6-lesson',6),
('b2u1-l7-lesson',27),
('b2u2-l1-lesson',15),
('b2u2-l2-lesson',20),
('b2u2-l3-lesson',8),
('b2u2-l4-lesson',17),
('b2u2-l5-lesson',18),
('b2u2-l6-lesson',15),
('b2u2-l7-lesson',39),
('b2u3-l1-lesson',5),
('b2u3-l2-lesson',6),
('b2u3-l3-lesson',13),
('b2u3-l4-lesson',11),
('b2u3-l5-lesson',13),
('b2u3-l6-lesson',6),
('b2u3-l7-lesson',27),
('b2u4-l1-lesson',10),
('b2u4-l2-lesson',8),
('b2u4-l3-lesson',13),
('b2u4-l4-lesson',18),
('b2u4-l5-lesson',20),
('b2u4-l6-lesson',8),
('b2u4-l7-lesson',40),
('practice-迷',6),
('practice-轉',6),
('practice-平',6),
('practice-段',6),
('practice-綠',6),
('practice-燈',6),
('practice-第',6),
('practice-告',6),
('practice-訴',6),
('practice-提',6),
('practice-款',6),
('practice-郵',6),
('practice-著',6),
('practice-品',6),
('practice-巷',6),
('practice-餓',6),
('practice-離',6),
('practice-背',6),
('practice-正',6),
('practice-筆',6),
('practice-枝',6)
on conflict (lesson_id) do update set steps=excluded.steps;

commit;
