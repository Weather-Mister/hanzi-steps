import type {UnitData} from '../schema.ts';

const unit:UnitData = {
  "schemaVersion": 1,
  "bookId": "book-1",
  "order": 28,
  "unit": {
    "id": "unit-28",
    "number": 28,
    "theme": "amber",
    "label": "Duration, dates & travel plans",
    "title": "How Long and When?",
    "description": "Finish the supported Lesson 9 time system while carrying the remaining date, 還, Maokong, and condition-marker vocabulary forward into active use.",
    "chars": [
      "年",
      "日",
      "鐘",
      "頭",
      "月",
      "號",
      "就",
      "貓"
    ],
    "lessonIds": [
      "u28-film",
      "u28-years-days",
      "u28-hours",
      "u28-object",
      "u28-negation",
      "u28-separable",
      "u28-review"
    ],
    "banner": {
      "text": "我學中文學一年。",
      "pinyin": "Wǒ xué Zhōngwén xué yì nián."
    },
    "goal": {
      "text": "要是我有空，我就一起去。",
      "pinyin": "Yàoshi wǒ yǒu kòng, wǒ jiù yìqǐ qù.",
      "meaning": "If I have time, then I'll go together."
    },
    "grammarIds": [
      "u28-when-duration-contrast",
      "u28-object-duration",
      "u28-duration-negation",
      "u28-separable-duration"
    ],
    "bookReference": "A Course in Contemporary Chinese 1 · Lesson 9 Dialogue I–II / Vocabulary I–II and Grammar I–II (printed pp. 182–190), with lexical preview from Grammar V. Covers 影片, duration structure, month/date vocabulary, 還, 貓空, 要是 and 就. Formal calendar-date and 要是…就… grammar remains in Unit 29."
  },
  "reviewLessonId": "u28-review",
  "lessons": [
    {
      "id": "u28-film",
      "title": "Films, Months, and Dates",
      "subtitle": "Contrast duration with calendar time, then learn 月 and 號.",
      "chars": [
        "月",
        "號"
      ],
      "minutes": "10–13 min",
      "unitId": "unit-28",
      "review": false,
      "steps": [
        {
          "id": "u28-film-p1",
          "type": "phrase",
          "phrase": "u28-film"
        },
        {
          "id": "u28-film-g1",
          "type": "grammar",
          "grammar": "u28-when-duration-contrast"
        },
        {
          "id": "u28-film-p2",
          "type": "phrase",
          "phrase": "u28-two-days"
        },
        {
          "id": "u28-film-s1",
          "type": "select",
          "prompt": "Which expression answers “for how long?”",
          "options": [
            "兩天",
            "明天",
            "今天"
          ],
          "answer": "兩天",
          "explanation": "兩天 is a duration; 明天 and 今天 tell when.",
          "grammarIds": [
            "u28-when-duration-contrast"
          ]
        },
        {
          "id": "u28-film-o1",
          "type": "order",
          "phrase": "u28-two-days",
          "tokens": [
            "我",
            "想玩",
            "兩天"
          ]
        },
        {
          "id": "u28-film-month-月-intro",
          "type": "intro",
          "char": "月"
        },
        {
          "id": "u28-film-month-月-trace",
          "type": "trace",
          "char": "月"
        },
        {
          "id": "u28-film-month-月-build",
          "type": "build",
          "char": "月"
        },
        {
          "id": "u28-film-month-月-complete",
          "type": "complete",
          "char": "月"
        },
        {
          "id": "u28-film-month-月-memory",
          "type": "memory",
          "char": "月"
        },
        {
          "id": "u28-film-date-號-intro",
          "type": "intro",
          "char": "號"
        },
        {
          "id": "u28-film-date-號-trace",
          "type": "trace",
          "char": "號"
        },
        {
          "id": "u28-film-date-號-build",
          "type": "build",
          "char": "號"
        },
        {
          "id": "u28-film-date-號-complete",
          "type": "complete",
          "char": "號"
        },
        {
          "id": "u28-film-date-號-memory",
          "type": "memory",
          "char": "號"
        },
        {
          "id": "u28-film-date-p1",
          "type": "phrase",
          "phrase": "u28-date-preview"
        },
        {
          "id": "u28-film-date-s1",
          "type": "select",
          "prompt": "In 九月三十號, which character marks the month?",
          "options": [
            "月",
            "號",
            "年"
          ],
          "answer": "月",
          "explanation": "月 follows the month number: 九月 is September."
        },
        {
          "id": "u28-film-date-s2",
          "type": "select",
          "prompt": "In 九月三十號, which character marks the spoken day of the month?",
          "options": [
            "號",
            "月",
            "鐘"
          ],
          "answer": "號",
          "explanation": "號 follows the day number in an everyday spoken date."
        }
      ]
    },
    {
      "id": "u28-years-days",
      "title": "Years, Days, and What Is Still True",
      "subtitle": "Use duration units, then distinguish 還 as “still” and “also/in addition.”",
      "chars": [
        "年",
        "日"
      ],
      "minutes": "10–13 min",
      "unitId": "unit-28",
      "review": false,
      "steps": [
        {
          "id": "u28-years-年-intro",
          "type": "intro",
          "char": "年"
        },
        {
          "id": "u28-years-年-trace",
          "type": "trace",
          "char": "年"
        },
        {
          "id": "u28-years-年-build",
          "type": "build",
          "char": "年"
        },
        {
          "id": "u28-years-年-complete",
          "type": "complete",
          "char": "年"
        },
        {
          "id": "u28-years-年-memory",
          "type": "memory",
          "char": "年"
        },
        {
          "id": "u28-years-日-intro",
          "type": "intro",
          "char": "日"
        },
        {
          "id": "u28-years-日-trace",
          "type": "trace",
          "char": "日"
        },
        {
          "id": "u28-years-日-build",
          "type": "build",
          "char": "日"
        },
        {
          "id": "u28-years-日-complete",
          "type": "complete",
          "char": "日"
        },
        {
          "id": "u28-years-日-memory",
          "type": "memory",
          "char": "日"
        },
        {
          "id": "u28-years-s1",
          "type": "select",
          "prompt": "Which word means “year”?",
          "options": [
            "年",
            "日",
            "天"
          ],
          "answer": "年",
          "explanation": "年 means year; 日 and 天 can both refer to a day in different uses."
        },
        {
          "id": "u28-years-s2",
          "type": "select",
          "prompt": "Which standalone word is used for a duration such as 兩天?",
          "options": [
            "天",
            "年",
            "鐘頭"
          ],
          "answer": "天",
          "explanation": "天 is the day unit in durations such as 兩天."
        },
        {
          "id": "u28-years-s3",
          "type": "select",
          "prompt": "In a written date, which character can mean “day of the month”?",
          "options": [
            "日",
            "年",
            "天"
          ],
          "answer": "日",
          "explanation": "日 is used as a written date marker; 號 will be introduced with spoken dates next."
        },
        {
          "id": "u28-years-p1",
          "type": "phrase",
          "phrase": "u28-one-year"
        },
        {
          "id": "u28-years-hai-p1",
          "type": "phrase",
          "phrase": "u28-hai-preview"
        },
        {
          "id": "u28-years-hai-s1",
          "type": "select",
          "prompt": "In 我還不知道, 還 means:",
          "options": [
            "still",
            "already",
            "only"
          ],
          "answer": "still",
          "explanation": "The not-knowing continues, so 還 means “still.”"
        },
        {
          "id": "u28-years-hai-p2",
          "type": "phrase",
          "phrase": "u28-hai-additional-preview"
        },
        {
          "id": "u28-years-hai-s2",
          "type": "select",
          "prompt": "In 還有什麼好玩的地方, 還 adds:",
          "options": [
            "another possibility",
            "a past tense",
            "a comparison"
          ],
          "answer": "another possibility",
          "explanation": "還有 introduces something additional: “what other…?”"
        }
      ]
    },
    {
      "id": "u28-hours",
      "title": "Hours and a Place to Go",
      "subtitle": "Count hours, then learn the Lesson 9 destination 貓空.",
      "chars": [
        "鐘",
        "頭",
        "貓"
      ],
      "minutes": "11–14 min",
      "unitId": "unit-28",
      "review": false,
      "steps": [
        {
          "id": "u28-hours-鐘-intro",
          "type": "intro",
          "char": "鐘"
        },
        {
          "id": "u28-hours-鐘-trace",
          "type": "trace",
          "char": "鐘"
        },
        {
          "id": "u28-hours-鐘-build",
          "type": "build",
          "char": "鐘"
        },
        {
          "id": "u28-hours-鐘-complete",
          "type": "complete",
          "char": "鐘"
        },
        {
          "id": "u28-hours-鐘-memory",
          "type": "memory",
          "char": "鐘"
        },
        {
          "id": "u28-hours-頭-intro",
          "type": "intro",
          "char": "頭"
        },
        {
          "id": "u28-hours-頭-trace",
          "type": "trace",
          "char": "頭"
        },
        {
          "id": "u28-hours-頭-build",
          "type": "build",
          "char": "頭"
        },
        {
          "id": "u28-hours-頭-complete",
          "type": "complete",
          "char": "頭"
        },
        {
          "id": "u28-hours-頭-memory",
          "type": "memory",
          "char": "頭"
        },
        {
          "id": "u28-hours-p1",
          "type": "phrase",
          "phrase": "u28-three-hours-song"
        },
        {
          "id": "u28-hours-s1",
          "type": "select",
          "prompt": "Which expression means “three hours”?",
          "options": [
            "三個鐘頭",
            "三天",
            "三年"
          ],
          "answer": "三個鐘頭",
          "explanation": "鐘頭 is an hour, so 三個鐘頭 means three hours."
        },
        {
          "id": "u28-hours-l1",
          "type": "listen",
          "char": "鐘",
          "options": [
            "鐘",
            "年",
            "日",
            "影"
          ],
          "answer": "鐘",
          "explanation": "鐘 is zhōng, the first character of 鐘頭."
        },
        {
          "id": "u28-hours-maokong-貓-intro",
          "type": "intro",
          "char": "貓"
        },
        {
          "id": "u28-hours-maokong-貓-trace",
          "type": "trace",
          "char": "貓"
        },
        {
          "id": "u28-hours-maokong-貓-build",
          "type": "build",
          "char": "貓"
        },
        {
          "id": "u28-hours-maokong-貓-complete",
          "type": "complete",
          "char": "貓"
        },
        {
          "id": "u28-hours-maokong-貓-memory",
          "type": "memory",
          "char": "貓"
        },
        {
          "id": "u28-hours-maokong-p1",
          "type": "phrase",
          "phrase": "u28-maokong-preview"
        },
        {
          "id": "u28-hours-maokong-s1",
          "type": "select",
          "prompt": "Which item is the Taipei place name from Lesson 9?",
          "options": [
            "貓空",
            "茶館",
            "夜市"
          ],
          "answer": "貓空",
          "explanation": "貓空 is the proper place name; 茶館 and 夜市 are common nouns."
        }
      ]
    },
    {
      "id": "u28-object",
      "title": "Repeat the Verb after an Object",
      "subtitle": "Keep both the object and the duration without losing either role.",
      "chars": [],
      "minutes": "8–11 min",
      "unitId": "unit-28",
      "review": false,
      "steps": [
        {
          "id": "u28-object-g1",
          "type": "grammar",
          "grammar": "u28-object-duration"
        },
        {
          "id": "u28-object-p1",
          "type": "phrase",
          "phrase": "u28-one-year"
        },
        {
          "id": "u28-object-o1",
          "type": "order",
          "phrase": "u28-one-year",
          "tokens": [
            "我",
            "學中文",
            "學一年"
          ]
        },
        {
          "id": "u28-object-s1",
          "type": "select",
          "prompt": "You want to say “I study Chinese for one year.” Which structure matches Lesson 9?",
          "options": [
            "我學中文學一年。",
            "我一年學中文一年。",
            "我學一年中文。"
          ],
          "answer": "我學中文學一年。",
          "explanation": "With an object plus duration, the textbook repeats the verb before the duration.",
          "grammarIds": [
            "u28-object-duration"
          ]
        },
        {
          "id": "u28-object-s2",
          "type": "select",
          "prompt": "Why is 學 repeated in 我學中文學一年?",
          "options": [
            "中文 is the object and 一年 is the duration",
            "It makes the sentence a question",
            "It means the action is finished"
          ],
          "answer": "中文 is the object and 一年 is the duration",
          "explanation": "The first 學 takes 中文; the repeated 學 introduces the duration.",
          "grammarIds": [
            "u28-object-duration"
          ]
        }
      ]
    },
    {
      "id": "u28-negation",
      "title": "A Duration before Negation",
      "subtitle": "Say how long something cannot happen.",
      "chars": [],
      "minutes": "8–11 min",
      "unitId": "unit-28",
      "review": false,
      "steps": [
        {
          "id": "u28-negation-g1",
          "type": "grammar",
          "grammar": "u28-duration-negation"
        },
        {
          "id": "u28-negation-p1",
          "type": "phrase",
          "phrase": "u28-two-days-no-class"
        },
        {
          "id": "u28-negation-o1",
          "type": "order",
          "phrase": "u28-two-days-no-class",
          "tokens": [
            "我",
            "兩天",
            "不能來上課"
          ]
        },
        {
          "id": "u28-negation-s1",
          "type": "select",
          "prompt": "Which sentence means “I cannot come to class for two days”?",
          "options": [
            "我兩天不能來上課。",
            "我不能來兩天上課。",
            "我不能兩天來上課。"
          ],
          "answer": "我兩天不能來上課。",
          "explanation": "For a negative span, Lesson 9 places the duration before the negation.",
          "grammarIds": [
            "u28-duration-negation"
          ]
        },
        {
          "id": "u28-negation-s2",
          "type": "select",
          "prompt": "In the negative-duration pattern, what comes immediately before 不 or 不能?",
          "options": [
            "The duration",
            "The object",
            "A question word"
          ],
          "answer": "The duration",
          "explanation": "The duration scopes over the length of the negative situation.",
          "grammarIds": [
            "u28-duration-negation"
          ]
        }
      ]
    },
    {
      "id": "u28-separable",
      "title": "Duration Inside Verbs — and a Condition Preview",
      "subtitle": "Finish separable-verb duration, then learn 要是 and 就 before their full grammar lesson.",
      "chars": [
        "就"
      ],
      "minutes": "9–12 min",
      "unitId": "unit-28",
      "review": false,
      "steps": [
        {
          "id": "u28-separable-g1",
          "type": "grammar",
          "grammar": "u28-separable-duration"
        },
        {
          "id": "u28-separable-p1",
          "type": "phrase",
          "phrase": "u28-three-day-break"
        },
        {
          "id": "u28-separable-o1",
          "type": "order",
          "phrase": "u28-three-day-break",
          "tokens": [
            "我們",
            "放",
            "三天的假"
          ]
        },
        {
          "id": "u28-separable-p2",
          "type": "phrase",
          "phrase": "u28-three-hours-song"
        },
        {
          "id": "u28-separable-o2",
          "type": "order",
          "phrase": "u28-three-hours-song",
          "tokens": [
            "我",
            "唱",
            "三個鐘頭的歌"
          ]
        },
        {
          "id": "u28-separable-s1",
          "type": "select",
          "prompt": "Which sentence correctly inserts a duration into 放假?",
          "options": [
            "我們放三天的假。",
            "我們三天放假三天。",
            "我們放假三天的。"
          ],
          "answer": "我們放三天的假。",
          "explanation": "放假 is separable, so the duration can appear between 放 and 假.",
          "grammarIds": [
            "u28-separable-duration"
          ]
        },
        {
          "id": "u28-separable-condition-就-intro",
          "type": "intro",
          "char": "就"
        },
        {
          "id": "u28-separable-condition-就-trace",
          "type": "trace",
          "char": "就"
        },
        {
          "id": "u28-separable-condition-就-build",
          "type": "build",
          "char": "就"
        },
        {
          "id": "u28-separable-condition-就-complete",
          "type": "complete",
          "char": "就"
        },
        {
          "id": "u28-separable-condition-就-memory",
          "type": "memory",
          "char": "就"
        },
        {
          "id": "u28-separable-if-p1",
          "type": "phrase",
          "phrase": "u28-if-preview"
        },
        {
          "id": "u28-separable-if-s1",
          "type": "select",
          "prompt": "Which word in 要是…就… means “if”?",
          "options": [
            "要是",
            "就",
            "還"
          ],
          "answer": "要是",
          "explanation": "要是 introduces the condition."
        },
        {
          "id": "u28-separable-if-s2",
          "type": "select",
          "prompt": "Which word in 要是…就… marks the consequence “then/in that case”?",
          "options": [
            "就",
            "要是",
            "號"
          ],
          "answer": "就",
          "explanation": "就 introduces what follows from the condition."
        }
      ]
    },
    {
      "id": "u28-review",
      "title": "Unit 28 Review",
      "subtitle": "Duration, dates, 還, Maokong, and condition markers.",
      "chars": [],
      "minutes": "14–18 min",
      "unitId": "unit-28",
      "review": true,
      "steps": [
        {
          "id": "u28-review-01",
          "type": "select",
          "prompt": "Which word means film or video?",
          "options": [
            "影片",
            "旅行",
            "功課"
          ],
          "answer": "影片",
          "explanation": "影片 is film or video."
        },
        {
          "id": "u28-review-02",
          "type": "listen",
          "char": "月",
          "options": [
            "月",
            "號",
            "年",
            "日"
          ],
          "answer": "月",
          "explanation": "月 is yuè, month."
        },
        {
          "id": "u28-review-03",
          "type": "listen",
          "char": "號",
          "options": [
            "號",
            "月",
            "頭",
            "日"
          ],
          "answer": "號",
          "explanation": "號 is hào, the spoken day/date marker."
        },
        {
          "id": "u28-review-04",
          "type": "listen",
          "char": "就",
          "options": [
            "就",
            "月",
            "年",
            "日"
          ],
          "answer": "就",
          "explanation": "就 is jiù, the consequence marker used in 要是…就…."
        },
        {
          "id": "u28-review-05",
          "type": "select",
          "prompt": "Which expression answers “when?” rather than “for how long?”",
          "options": [
            "明天",
            "兩天",
            "三個鐘頭"
          ],
          "answer": "明天",
          "explanation": "明天 locates the event in time; the others are durations.",
          "grammarIds": [
            "u28-when-duration-contrast"
          ]
        },
        {
          "id": "u28-review-06",
          "type": "order",
          "phrase": "u28-two-days",
          "tokens": [
            "我",
            "想玩",
            "兩天"
          ]
        },
        {
          "id": "u28-review-07",
          "type": "select",
          "prompt": "Which word means hour?",
          "options": [
            "鐘頭",
            "年",
            "日"
          ],
          "answer": "鐘頭",
          "explanation": "鐘頭 means hour."
        },
        {
          "id": "u28-review-08",
          "type": "order",
          "phrase": "u28-one-year",
          "tokens": [
            "我",
            "學中文",
            "學一年"
          ]
        },
        {
          "id": "u28-review-09",
          "type": "select",
          "prompt": "With an object plus a duration, what does Lesson 9 require?",
          "options": [
            "Repeat the verb before the duration",
            "Put the duration before the subject",
            "Delete the object"
          ],
          "answer": "Repeat the verb before the duration",
          "explanation": "The repeated verb separates the object from the duration.",
          "grammarIds": [
            "u28-object-duration"
          ]
        },
        {
          "id": "u28-review-10",
          "type": "select",
          "prompt": "Which sentence has the duration in the correct place before negation?",
          "options": [
            "我兩天不能來上課。",
            "我不能兩天來上課。",
            "我不能來上課兩天不。"
          ],
          "answer": "我兩天不能來上課。",
          "explanation": "The duration precedes 不能.",
          "grammarIds": [
            "u28-duration-negation"
          ]
        },
        {
          "id": "u28-review-11",
          "type": "order",
          "phrase": "u28-two-days-no-class",
          "tokens": [
            "我",
            "兩天",
            "不能來上課"
          ]
        },
        {
          "id": "u28-review-12",
          "type": "select",
          "prompt": "Which is the correct separable-verb pattern?",
          "options": [
            "放三天的假",
            "三天放假三天",
            "放假的三天放"
          ],
          "answer": "放三天的假",
          "explanation": "The duration is inserted between 放 and 假.",
          "grammarIds": [
            "u28-separable-duration"
          ]
        },
        {
          "id": "u28-review-13",
          "type": "order",
          "phrase": "u28-three-day-break",
          "tokens": [
            "我們",
            "放",
            "三天的假"
          ]
        },
        {
          "id": "u28-review-14",
          "type": "order",
          "phrase": "u28-three-hours-song",
          "tokens": [
            "我",
            "唱",
            "三個鐘頭的歌"
          ]
        },
        {
          "id": "u28-review-15",
          "type": "select",
          "prompt": "In 我還不知道, 還 means:",
          "options": [
            "still",
            "already",
            "only"
          ],
          "answer": "still",
          "explanation": "還 marks a continuing state here."
        },
        {
          "id": "u28-review-16",
          "type": "select",
          "prompt": "Which item is a place name?",
          "options": [
            "貓空",
            "鐘頭",
            "影片"
          ],
          "answer": "貓空",
          "explanation": "貓空 is a Taipei place name."
        },
        {
          "id": "u28-review-17",
          "type": "select",
          "prompt": "Which sentence contains an object and therefore repeats the verb?",
          "options": [
            "我學中文學一年。",
            "我想玩兩天。",
            "我明天去旅行。"
          ],
          "answer": "我學中文學一年。",
          "explanation": "中文 is the object, so 學 repeats before 一年.",
          "grammarIds": [
            "u28-object-duration"
          ]
        },
        {
          "id": "u28-review-18",
          "type": "select",
          "prompt": "Which sentence means “We have three days off”?",
          "options": [
            "我們放三天的假。",
            "我們看三天的影片。",
            "我們三年放假。"
          ],
          "answer": "我們放三天的假。",
          "explanation": "This is the separable 放假 duration pattern.",
          "grammarIds": [
            "u28-separable-duration"
          ]
        },
        {
          "id": "u28-review-19",
          "type": "select",
          "prompt": "Two days of being unable to attend class is expressed as:",
          "options": [
            "兩天不能來上課",
            "不能來上課兩天不",
            "不能兩天上課來"
          ],
          "answer": "兩天不能來上課",
          "explanation": "The duration comes before the negation.",
          "grammarIds": [
            "u28-duration-negation"
          ]
        },
        {
          "id": "u28-review-20",
          "type": "select",
          "prompt": "Which pair gives the basic “if…then…” markers?",
          "options": [
            "要是…就…",
            "還…號…",
            "年…月…"
          ],
          "answer": "要是…就…",
          "explanation": "要是 marks the condition and 就 marks the consequence; Unit 29 develops the complete grammar.",
          "grammarIds": [
            "u28-when-duration-contrast"
          ]
        },
        {
          "id": "u28-review-21",
          "type": "order",
          "phrase": "u28-date-preview",
          "tokens": [
            "我",
            "九月三十號",
            "回國"
          ]
        },
        {
          "id": "u28-review-22",
          "type": "order",
          "phrase": "u28-if-preview",
          "tokens": [
            "要是我有空",
            "我就一起去"
          ]
        }
      ]
    }
  ],
  "newVocabulary": [
    {
      "text": "影片",
      "pinyin": "yǐngpiàn",
      "meaning": "film; video",
      "lessonId": "u28-film",
      "core": false
    },
    {
      "text": "年",
      "pinyin": "nián",
      "meaning": "year",
      "lessonId": "u28-years-days",
      "core": false
    },
    {
      "text": "日",
      "pinyin": "rì",
      "meaning": "day; date (written date form)",
      "lessonId": "u28-years-days",
      "core": false
    },
    {
      "text": "天",
      "pinyin": "tiān",
      "meaning": "day (as a duration unit)",
      "lessonId": "u28-years-days",
      "core": false,
      "note": "The character was already known from 今天/明天; this is its first standalone vocabulary teaching."
    },
    {
      "text": "鐘頭",
      "pinyin": "zhōngtóu",
      "meaning": "hour",
      "lessonId": "u28-hours",
      "core": false
    },
    {
      "text": "月",
      "pinyin": "yuè",
      "meaning": "month of the year",
      "lessonId": "u28-film",
      "core": false
    },
    {
      "text": "號",
      "pinyin": "hào",
      "meaning": "date; numbered day of a month",
      "lessonId": "u28-film",
      "core": false
    },
    {
      "text": "還",
      "pinyin": "hái",
      "meaning": "still; additionally; also",
      "lessonId": "u28-years-days",
      "core": false,
      "note": "The character was seen earlier in 還是; this is the first formal teaching of 還 as an independent adverb."
    },
    {
      "text": "貓空",
      "pinyin": "Māokōng",
      "meaning": "Maokong, a Taipei place known for tea and scenery",
      "lessonId": "u28-hours",
      "core": false
    },
    {
      "text": "要是",
      "pinyin": "yàoshi",
      "meaning": "if",
      "lessonId": "u28-separable",
      "core": false
    },
    {
      "text": "就",
      "pinyin": "jiù",
      "meaning": "then; in that case",
      "lessonId": "u28-separable",
      "core": false
    }
  ],
  "reviewVocabulary": [
    "中文",
    "教",
    "書法",
    "唱歌",
    "上課",
    "能",
    "來",
    "放假",
    "星期",
    "旅行"
  ],
  "newCharacters": [
    "年",
    "日",
    "鐘",
    "頭",
    "月",
    "號",
    "就",
    "貓"
  ],
  "reviewCharacters": [],
  "characters": {
    "年": {
      "hanzi": "年",
      "pinyin": "nián",
      "zhuyin": "ㄋㄧㄢˊ",
      "meaning": "year",
      "strokes": 6,
      "layout": "whole",
      "note": "年 is second-tone nián and names a year or a duration measured in years.",
      "memory": "The six strokes interlock around a central vertical; keep the middle horizontals distinct before the final vertical finish.",
      "parts": [
        {
          "label": "upper",
          "name": "upper strokes",
          "role": "Visual component",
          "description": "The first two strokes establish the upper-left and top horizontal of 年.",
          "strokes": [
            0,
            1
          ]
        },
        {
          "label": "middle",
          "name": "middle cross",
          "role": "Visual component",
          "description": "The next two strokes build the central horizontal-and-vertical structure.",
          "strokes": [
            2,
            3
          ]
        },
        {
          "label": "lower",
          "name": "lower finish",
          "role": "Visual component",
          "description": "The last two strokes complete the lower bar and final vertical.",
          "strokes": [
            4,
            5
          ]
        }
      ],
      "example": {
        "text": "一年",
        "pinyin": "yì nián",
        "meaning": "one year"
      }
    },
    "日": {
      "hanzi": "日",
      "pinyin": "rì",
      "zhuyin": "ㄖˋ",
      "meaning": "day; date",
      "strokes": 4,
      "layout": "whole",
      "note": "日 is fourth-tone rì. In dates it can mean day of the month, as in 三十日.",
      "memory": "日 is a tall box with one inner horizontal; the bottom edge closes the frame last.",
      "parts": [
        {
          "label": "囗",
          "name": "outer frame",
          "role": "Visual component",
          "description": "The outer frame uses the first two strokes and the final closing stroke; the bottom is written last.",
          "strokes": [
            0,
            1,
            3
          ]
        },
        {
          "label": "一",
          "name": "inner horizontal",
          "role": "Visual component",
          "description": "The third stroke is the short horizontal inside the frame.",
          "strokes": [
            2
          ]
        }
      ],
      "example": {
        "text": "三十日",
        "pinyin": "sānshí rì",
        "meaning": "the 30th day of the month"
      },
      "partOrderLabel": "outer sides, inner line, then close the bottom"
    },
    "鐘": {
      "hanzi": "鐘",
      "pinyin": "zhōng",
      "zhuyin": "ㄓㄨㄥ",
      "meaning": "clock; bell; hour in 鐘頭",
      "strokes": 20,
      "layout": "side",
      "note": "鐘 is first-tone zhōng. In 鐘頭, the whole word means an hour.",
      "memory": "金 fills the left eight strokes and 童 fills the right twelve; keep the dense right side tall and narrow.",
      "parts": [
        {
          "label": "金",
          "name": "metal component",
          "role": "Visual component",
          "description": "The first eight strokes form 金 on the left.",
          "strokes": [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7
          ]
        },
        {
          "label": "童",
          "name": "right component",
          "role": "Visual component",
          "description": "The final twelve strokes form 童 on the right.",
          "strokes": [
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19
          ]
        }
      ],
      "example": {
        "text": "鐘頭",
        "pinyin": "zhōngtóu",
        "meaning": "hour"
      }
    },
    "頭": {
      "hanzi": "頭",
      "pinyin": "tóu",
      "zhuyin": "ㄊㄡˊ",
      "meaning": "head; final character of 鐘頭",
      "strokes": 16,
      "layout": "side",
      "note": "頭 is second-tone tóu. In 鐘頭 it completes the everyday word for an hour.",
      "memory": "豆 takes the first seven strokes on the left and 頁 takes the last nine on the right.",
      "parts": [
        {
          "label": "豆",
          "name": "left component",
          "role": "Visual component",
          "description": "The first seven strokes form 豆 on the left.",
          "strokes": [
            0,
            1,
            2,
            3,
            4,
            5,
            6
          ]
        },
        {
          "label": "頁",
          "name": "right component",
          "role": "Visual component",
          "description": "The last nine strokes form 頁 on the right.",
          "strokes": [
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15
          ]
        }
      ],
      "example": {
        "text": "鐘頭",
        "pinyin": "zhōngtóu",
        "meaning": "hour"
      }
    },
    "月": {
      "hanzi": "月",
      "pinyin": "yuè",
      "zhuyin": "ㄩㄝˋ",
      "meaning": "month; moon",
      "strokes": 4,
      "layout": "whole",
      "note": "月 is fourth-tone yuè. After a number, it names a month, as in 九月.",
      "memory": "The first two strokes make the tall outer shape; the final two short horizontals sit inside it.",
      "parts": [
        {
          "label": "⺆",
          "name": "outer frame",
          "role": "Visual component",
          "description": "The first two strokes form the tall outer frame of 月.",
          "strokes": [
            0,
            1
          ]
        },
        {
          "label": "二",
          "name": "inner lines",
          "role": "Visual component",
          "description": "The last two strokes are the two short horizontal lines inside.",
          "strokes": [
            2,
            3
          ]
        }
      ],
      "example": {
        "text": "九月",
        "pinyin": "jiǔyuè",
        "meaning": "September"
      }
    },
    "號": {
      "hanzi": "號",
      "pinyin": "hào",
      "zhuyin": "ㄏㄠˋ",
      "meaning": "date; number",
      "strokes": 13,
      "layout": "side",
      "note": "號 is fourth-tone hào. After a number in a date, it means the numbered day of the month.",
      "memory": "A compact five-stroke left sound component balances the eight-stroke 虎 component on the right.",
      "parts": [
        {
          "label": "号",
          "name": "left sound component",
          "role": "Visual component",
          "description": "The first five strokes form the compact left component with 口 above a hooked lower shape.",
          "strokes": [
            0,
            1,
            2,
            3,
            4
          ]
        },
        {
          "label": "虎",
          "name": "tiger component",
          "role": "Visual component",
          "description": "The final eight strokes form 虎 on the right.",
          "strokes": [
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12
          ]
        }
      ],
      "example": {
        "text": "三十號",
        "pinyin": "sānshí hào",
        "meaning": "the 30th"
      }
    },
    "就": {
      "hanzi": "就",
      "pinyin": "jiù",
      "zhuyin": "ㄐㄧㄡˋ",
      "meaning": "then; in that case",
      "strokes": 12,
      "layout": "side",
      "note": "就 is fourth-tone jiù. In 要是…就…, it introduces the consequence of the condition.",
      "memory": "京 fills the left eight strokes; 尤 completes the right with four strokes.",
      "parts": [
        {
          "label": "京",
          "name": "left component",
          "role": "Visual component",
          "description": "The first eight strokes form 京 on the left.",
          "strokes": [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7
          ]
        },
        {
          "label": "尤",
          "name": "right component",
          "role": "Visual component",
          "description": "The final four strokes form 尤 on the right.",
          "strokes": [
            8,
            9,
            10,
            11
          ]
        }
      ],
      "example": {
        "text": "要是有空，就一起去。",
        "pinyin": "Yàoshi yǒu kòng, jiù yìqǐ qù.",
        "meaning": "If there is time, then go together."
      }
    },
    "貓": {
      "hanzi": "貓",
      "pinyin": "māo",
      "zhuyin": "ㄇㄠ",
      "meaning": "cat; first character of 貓空",
      "strokes": 16,
      "layout": "side",
      "note": "貓 is first-tone māo. Here it is learned as the first character of the Taipei place name 貓空.",
      "memory": "豸 uses the first seven strokes on the left; 苗 uses the final nine strokes on the right.",
      "parts": [
        {
          "label": "豸",
          "name": "left component",
          "role": "Visual component",
          "description": "The first seven strokes form 豸 on the left.",
          "strokes": [
            0,
            1,
            2,
            3,
            4,
            5,
            6
          ]
        },
        {
          "label": "苗",
          "name": "right component",
          "role": "Visual component",
          "description": "The final nine strokes form 苗 on the right, with 艹 above 田.",
          "strokes": [
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15
          ]
        }
      ],
      "example": {
        "text": "貓空",
        "pinyin": "Māokōng",
        "meaning": "Maokong"
      }
    }
  },
  "grammarRules": {
    "u28-when-duration-contrast": {
      "id": "u28-when-duration-contrast",
      "title": "When something happens vs. how long it lasts",
      "pattern": "Time-When + Subject/Verb ...  /  Subject + Verb + Time-Duration",
      "explanation": "Time-When expressions locate an event at a point or period on the calendar, while Time-Duration expressions give the length of the action. In the basic patterns here, a when-expression appears before the action, while a duration follows the verb.",
      "examples": [
        {
          "text": "我明天去旅行。",
          "pinyin": "Wǒ míngtiān qù lǚxíng.",
          "meaning": "I will travel tomorrow."
        },
        {
          "text": "我想玩兩天。",
          "pinyin": "Wǒ xiǎng wán liǎng tiān.",
          "meaning": "I want to be away / have fun for two days."
        }
      ],
      "remember": "Ask whether the expression answers “when?” or “for how long?” before deciding its position.",
      "words": [
        "天",
        "年",
        "鐘頭"
      ]
    },
    "u28-object-duration": {
      "id": "u28-object-duration",
      "title": "Repeat the verb when a duration follows an object",
      "pattern": "Subject + Verb + Object + Verb + Duration",
      "explanation": "When the verb has an object and you also state how long the activity lasts, Lesson 9 repeats the verb before the duration. The first verb takes the object; the repeated verb introduces the length of time.",
      "examples": [
        {
          "text": "我學中文學一年。",
          "pinyin": "Wǒ xué Zhōngwén xué yì nián.",
          "meaning": "I study Chinese for one year."
        },
        {
          "text": "我教中文教一年。",
          "pinyin": "Wǒ jiāo Zhōngwén jiāo yì nián.",
          "meaning": "I teach Chinese for one year."
        }
      ],
      "remember": "Object present? Repeat the verb before the duration.",
      "words": [
        "年"
      ]
    },
    "u28-duration-negation": {
      "id": "u28-duration-negation",
      "title": "Put the duration before a negated action",
      "pattern": "Subject + Duration + Negation + Verb Phrase",
      "explanation": "When the duration tells how long a negative situation lasts, the duration comes before 不 or 不能. This is different from the basic affirmative pattern where the duration follows the verb.",
      "examples": [
        {
          "text": "我兩天不能來上課。",
          "pinyin": "Wǒ liǎng tiān bù néng lái shàngkè.",
          "meaning": "I cannot come to class for two days."
        },
        {
          "text": "我一個星期不能去旅行。",
          "pinyin": "Wǒ yí ge xīngqí bù néng qù lǚxíng.",
          "meaning": "I cannot travel for one week."
        }
      ],
      "remember": "For a negative span, say the duration first, then the negation.",
      "words": [
        "天",
        "星期"
      ]
    },
    "u28-separable-duration": {
      "id": "u28-separable-duration",
      "title": "Insert duration into a separable verb",
      "pattern": "V + Duration + (的) + Object",
      "explanation": "With a separable verb, the duration can go between the verb and its object. Lesson 9 shows both forms with and without 的. 放假 can become 放三天的假, and 唱歌 can become 唱三個鐘頭的歌.",
      "examples": [
        {
          "text": "我們放三天的假。",
          "pinyin": "Wǒmen fàng sān tiān de jià.",
          "meaning": "We have three days off."
        },
        {
          "text": "我唱三個鐘頭的歌。",
          "pinyin": "Wǒ chàng sān ge zhōngtóu de gē.",
          "meaning": "I sing for three hours."
        }
      ],
      "remember": "For separable verbs, place the duration inside the verb-object pair.",
      "words": [
        "鐘頭",
        "天",
        "放假",
        "唱歌"
      ]
    }
  },
  "grammarIntroductions": [
    {
      "id": "u28-when-duration-contrast",
      "kind": "rule",
      "ref": "u28-when-duration-contrast",
      "lessonId": "u28-film",
      "stepId": "u28-film-g1"
    },
    {
      "id": "u28-object-duration",
      "kind": "rule",
      "ref": "u28-object-duration",
      "lessonId": "u28-object",
      "stepId": "u28-object-g1"
    },
    {
      "id": "u28-duration-negation",
      "kind": "rule",
      "ref": "u28-duration-negation",
      "lessonId": "u28-negation",
      "stepId": "u28-negation-g1"
    },
    {
      "id": "u28-separable-duration",
      "kind": "rule",
      "ref": "u28-separable-duration",
      "lessonId": "u28-separable",
      "stepId": "u28-separable-g1"
    }
  ],
  "reviewGrammar": [
    "u26-time-when",
    "u27-duration-basic"
  ],
  "phrases": {
    "u28-film": {
      "text": "我在家看影片。",
      "pinyin": "Wǒ zài jiā kàn yǐngpiàn.",
      "meaning": "I watch films at home.",
      "note": "影片 is the Lesson 9 word for film or video.",
      "tokens": [
        "我",
        "在家",
        "看影片"
      ]
    },
    "u28-two-days": {
      "text": "我想玩兩天。",
      "pinyin": "Wǒ xiǎng wán liǎng tiān.",
      "meaning": "I want to be away / have fun for two days.",
      "note": "兩天 is a duration and follows 玩.",
      "tokens": [
        "我",
        "想玩",
        "兩天"
      ],
      "grammarIds": [
        "u28-when-duration-contrast"
      ]
    },
    "u28-one-year": {
      "text": "我學中文學一年。",
      "pinyin": "Wǒ xué Zhōngwén xué yì nián.",
      "meaning": "I study Chinese for one year.",
      "note": "The verb 學 repeats because 中文 is an object before the duration.",
      "tokens": [
        "我",
        "學中文",
        "學一年"
      ],
      "grammarIds": [
        "u28-object-duration"
      ]
    },
    "u28-two-days-no-class": {
      "text": "我兩天不能來上課。",
      "pinyin": "Wǒ liǎng tiān bù néng lái shàngkè.",
      "meaning": "I cannot come to class for two days.",
      "note": "The duration 兩天 appears before the negation 不能.",
      "tokens": [
        "我",
        "兩天",
        "不能來上課"
      ],
      "grammarIds": [
        "u28-duration-negation"
      ]
    },
    "u28-three-day-break": {
      "text": "我們放三天的假。",
      "pinyin": "Wǒmen fàng sān tiān de jià.",
      "meaning": "We have three days off.",
      "note": "放假 is separable here: 放 + 三天的 + 假.",
      "tokens": [
        "我們",
        "放",
        "三天的假"
      ],
      "grammarIds": [
        "u28-separable-duration"
      ]
    },
    "u28-three-hours-song": {
      "text": "我唱三個鐘頭的歌。",
      "pinyin": "Wǒ chàng sān ge zhōngtóu de gē.",
      "meaning": "I sing for three hours.",
      "note": "唱歌 is separable: 唱 + duration + 的 + 歌.",
      "tokens": [
        "我",
        "唱",
        "三個鐘頭的歌"
      ],
      "grammarIds": [
        "u28-separable-duration"
      ]
    },
    "u28-date-preview": {
      "text": "我九月三十號回國。",
      "pinyin": "Wǒ jiǔyuè sānshí hào huíguó.",
      "meaning": "I return to my country on September 30.",
      "note": "月 marks the month and 號 marks the spoken day of the month. Unit 29 formalizes the complete date pattern.",
      "tokens": [
        "我",
        "九月三十號",
        "回國"
      ]
    },
    "u28-hai-preview": {
      "text": "我還不知道。",
      "pinyin": "Wǒ hái bù zhīdào.",
      "meaning": "I still do not know.",
      "note": "Here 還 means that a state continues: still.",
      "tokens": [
        "我",
        "還",
        "不知道"
      ]
    },
    "u28-hai-additional-preview": {
      "text": "還有什麼好玩的地方？",
      "pinyin": "Hái yǒu shénme hǎowán de dìfāng?",
      "meaning": "What other fun places are there?",
      "note": "Here 還 adds another possibility: also / in addition / other.",
      "tokens": [
        "還有",
        "什麼",
        "好玩的地方"
      ]
    },
    "u28-maokong-preview": {
      "text": "我想去貓空。",
      "pinyin": "Wǒ xiǎng qù Māokōng.",
      "meaning": "I want to go to Maokong.",
      "note": "貓空 is the Taipei place name used in Lesson 9 Dialogue II.",
      "tokens": [
        "我",
        "想去",
        "貓空"
      ]
    },
    "u28-if-preview": {
      "text": "要是我有空，我就一起去。",
      "pinyin": "Yàoshi wǒ yǒu kòng, wǒ jiù yìqǐ qù.",
      "meaning": "If I have time, then I'll go together.",
      "note": "For now, learn 要是 as “if” and 就 as the consequence marker “then.” Unit 29 gives the full placement rules.",
      "tokens": [
        "要是我有空",
        "我就一起去"
      ]
    }
  },
  "revisionStepIds": []
};
export default unit;
