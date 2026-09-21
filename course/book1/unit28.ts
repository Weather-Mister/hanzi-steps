import type {UnitData} from '../schema.ts';

const unit:UnitData = {
  "schemaVersion": 1,
  "bookId": "book-1",
  "order": 28,
  "unit": {
    "id": "unit-28",
    "number": 28,
    "theme": "amber",
    "label": "Time expressions & duration structure",
    "title": "How Long Does It Take?",
    "description": "Finish the advanced Lesson 9 time-duration system: films, year/day/hour expressions, object repetition, negation, and separable verbs.",
    "chars": [
      "影",
      "片",
      "年",
      "日",
      "鐘",
      "頭"
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
      "text": "我們放三天的假。",
      "pinyin": "Wǒmen fàng sān tiān de jià.",
      "meaning": "We have three days off."
    },
    "grammarIds": [
      "u28-when-duration-contrast",
      "u28-object-duration",
      "u28-duration-negation",
      "u28-separable-duration"
    ],
    "bookReference": "A Course in Contemporary Chinese 1 · Lesson 9 Dialogue I / Vocabulary I tail and Grammar I–II (printed pp. 182–190). Covers 影片 plus the textbook time-when/time-duration contrast, duration after an object with repeated verb, duration before negation, and duration inside separable verbs. Spoken month/date language remains for Unit 29."
  },
  "reviewLessonId": "u28-review",
  "lessons": [
    {
      "id": "u28-film",
      "title": "Films and Two Kinds of Time",
      "subtitle": "Add 影片 and separate “when” from “how long.”",
      "chars": [
        "影",
        "片"
      ],
      "minutes": "10–13 min",
      "unitId": "unit-28",
      "review": false,
      "steps": [
        {
          "id": "u28-film-影-intro",
          "type": "intro",
          "char": "影"
        },
        {
          "id": "u28-film-影-trace",
          "type": "trace",
          "char": "影"
        },
        {
          "id": "u28-film-影-build",
          "type": "build",
          "char": "影"
        },
        {
          "id": "u28-film-影-complete",
          "type": "complete",
          "char": "影"
        },
        {
          "id": "u28-film-影-memory",
          "type": "memory",
          "char": "影"
        },
        {
          "id": "u28-film-片-intro",
          "type": "intro",
          "char": "片"
        },
        {
          "id": "u28-film-片-trace",
          "type": "trace",
          "char": "片"
        },
        {
          "id": "u28-film-片-build",
          "type": "build",
          "char": "片"
        },
        {
          "id": "u28-film-片-complete",
          "type": "complete",
          "char": "片"
        },
        {
          "id": "u28-film-片-memory",
          "type": "memory",
          "char": "片"
        },
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
        }
      ]
    },
    {
      "id": "u28-years-days",
      "title": "Years and Days as Durations",
      "subtitle": "Use 年, 日, and standalone 天 in time expressions.",
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
        }
      ]
    },
    {
      "id": "u28-hours",
      "title": "Count Hours with 鐘頭",
      "subtitle": "Build the everyday Lesson 9 word for an hour.",
      "chars": [
        "鐘",
        "頭"
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
      "title": "Put Time inside Separable Verbs",
      "subtitle": "Use 放…假 and 唱…歌 with a duration in the middle.",
      "chars": [],
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
        }
      ]
    },
    {
      "id": "u28-review",
      "title": "Unit 28 Review",
      "subtitle": "Time-when, duration, objects, negation, and separable verbs.",
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
          "char": "影",
          "options": [
            "影",
            "年",
            "日",
            "鐘"
          ],
          "answer": "影",
          "explanation": "影 is yǐng."
        },
        {
          "id": "u28-review-03",
          "type": "listen",
          "char": "年",
          "options": [
            "年",
            "片",
            "頭",
            "日"
          ],
          "answer": "年",
          "explanation": "年 is nián, year."
        },
        {
          "id": "u28-review-04",
          "type": "listen",
          "char": "鐘",
          "options": [
            "鐘",
            "影",
            "年",
            "日"
          ],
          "answer": "鐘",
          "explanation": "鐘 is zhōng."
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
          "prompt": "Which character can mark a day in a written date?",
          "options": [
            "日",
            "年",
            "鐘"
          ],
          "answer": "日",
          "explanation": "日 is used for a written day/date."
        },
        {
          "id": "u28-review-16",
          "type": "select",
          "prompt": "Which pair is a duration?",
          "options": [
            "一年",
            "明天",
            "今天"
          ],
          "answer": "一年",
          "explanation": "一年 answers how long."
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
          "prompt": "Which statement correctly contrasts the two time types?",
          "options": [
            "Time-when locates an event; duration gives its length",
            "Duration always comes before the subject",
            "Time-when and duration are interchangeable"
          ],
          "answer": "Time-when locates an event; duration gives its length",
          "explanation": "That is the core Lesson 9 distinction.",
          "grammarIds": [
            "u28-when-duration-contrast"
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
    "影",
    "片",
    "年",
    "日",
    "鐘",
    "頭"
  ],
  "reviewCharacters": [],
  "characters": {
    "影": {
      "hanzi": "影",
      "pinyin": "yǐng",
      "zhuyin": "ㄧㄥˇ",
      "meaning": "image; film image",
      "strokes": 15,
      "layout": "side",
      "note": "影 is third-tone yǐng. In 影片, it contributes the sense of an image or film.",
      "memory": "景 occupies the left twelve strokes and 彡 finishes the right edge with three descending slants.",
      "parts": [
        {
          "label": "景",
          "name": "left component",
          "role": "Visual component",
          "description": "The first twelve strokes form 景 on the left, with 日 above the lower 京-shaped section.",
          "strokes": [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11
          ]
        },
        {
          "label": "彡",
          "name": "three slants",
          "role": "Visual component",
          "description": "The final three strokes are the descending 彡 strokes on the right.",
          "strokes": [
            12,
            13,
            14
          ]
        }
      ],
      "example": {
        "text": "影片",
        "pinyin": "yǐngpiàn",
        "meaning": "film; video"
      }
    },
    "片": {
      "hanzi": "片",
      "pinyin": "piàn",
      "zhuyin": "ㄆㄧㄢˋ",
      "meaning": "slice; piece; film in 影片",
      "strokes": 4,
      "layout": "whole",
      "note": "片 is fourth-tone piàn. In 影片, it is the second syllable of the word for film or video.",
      "memory": "Write the left vertical structure first, then finish the right side with the horizontal and turning stroke.",
      "parts": [
        {
          "label": "left",
          "name": "left spine",
          "role": "Visual component",
          "description": "The first two strokes establish the narrow left side of 片.",
          "strokes": [
            0,
            1
          ]
        },
        {
          "label": "right",
          "name": "right finish",
          "role": "Visual component",
          "description": "The final two strokes complete the upper bar and the bent right side.",
          "strokes": [
            2,
            3
          ]
        }
      ],
      "example": {
        "text": "影片",
        "pinyin": "yǐngpiàn",
        "meaning": "film; video"
      }
    },
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
    }
  },
  "revisionStepIds": []
};
export default unit;
