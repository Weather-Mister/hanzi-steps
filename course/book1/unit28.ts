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
    "description": "A fuller bridge across Lessons 8–9: recover omitted transport vocabulary, then master films and the advanced time-duration system.",
    "chars": [
      "年",
      "日",
      "鐘",
      "頭",
      "非",
      "但",
      "站",
      "或",
      "利",
      "汽"
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
    "bookReference": "A Course in Contemporary Chinese 1 · Lesson 8 Dialogue I–II / Vocabulary I–II (printed pp. 160–165) plus Lesson 9 Dialogue I / Vocabulary I tail and Grammar I–II (printed pp. 182–190). This rebalance restores 非常, 但是, 站, 或是, 便利商店, 公共汽車 and 中國 without disturbing the published Unit 28 step prefixes, while retaining the complete time-duration sequence."
  },
  "reviewLessonId": "u28-review",
  "lessons": [
    {
      "id": "u28-film",
      "title": "Films, Very & But",
      "subtitle": "Keep the time contrast, then recover two important Lesson 8 connectors.",
      "chars": [
        "非",
        "但"
      ],
      "minutes": "15–18 min",
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
          "id": "u28-film-非-intro",
          "type": "intro",
          "char": "非"
        },
        {
          "id": "u28-film-非-trace",
          "type": "trace",
          "char": "非"
        },
        {
          "id": "u28-film-非-complete",
          "type": "complete",
          "char": "非"
        },
        {
          "id": "u28-film-非-memory",
          "type": "memory",
          "char": "非"
        },
        {
          "id": "u28-film-但-intro",
          "type": "intro",
          "char": "但"
        },
        {
          "id": "u28-film-但-trace",
          "type": "trace",
          "char": "但"
        },
        {
          "id": "u28-film-但-build",
          "type": "build",
          "char": "但"
        },
        {
          "id": "u28-film-但-complete",
          "type": "complete",
          "char": "但"
        },
        {
          "id": "u28-film-但-memory",
          "type": "memory",
          "char": "但"
        },
        {
          "id": "u28-film-p3",
          "type": "phrase",
          "phrase": "u28-very-but"
        },
        {
          "id": "u28-film-s2",
          "type": "select",
          "prompt": "Which pair means “very” and “but/however”?",
          "options": [
            "非常／但是",
            "比較／或是",
            "大概／不行"
          ],
          "answer": "非常／但是",
          "explanation": "非常 means very; 但是 introduces a contrast."
        }
      ]
    },
    {
      "id": "u28-years-days",
      "title": "Years, Days & Stations",
      "subtitle": "Use duration units and add the transport noun 站.",
      "chars": [
        "年",
        "日",
        "站"
      ],
      "minutes": "13–16 min",
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
          "id": "u28-station-站-intro",
          "type": "intro",
          "char": "站"
        },
        {
          "id": "u28-station-站-trace",
          "type": "trace",
          "char": "站"
        },
        {
          "id": "u28-station-站-build",
          "type": "build",
          "char": "站"
        },
        {
          "id": "u28-station-站-complete",
          "type": "complete",
          "char": "站"
        },
        {
          "id": "u28-station-站-memory",
          "type": "memory",
          "char": "站"
        },
        {
          "id": "u28-years-p2",
          "type": "phrase",
          "phrase": "u28-station"
        },
        {
          "id": "u28-years-s4",
          "type": "select",
          "prompt": "What does 站 mean in 高鐵站?",
          "options": [
            "station",
            "ticket",
            "hour"
          ],
          "answer": "station",
          "explanation": "站 means a station or stop."
        }
      ]
    },
    {
      "id": "u28-hours",
      "title": "Hours — or Another Way",
      "subtitle": "Count hours, then connect transport alternatives with 或是.",
      "chars": [
        "鐘",
        "頭",
        "或"
      ],
      "minutes": "13–16 min",
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
          "id": "u28-or-或-intro",
          "type": "intro",
          "char": "或"
        },
        {
          "id": "u28-or-或-trace",
          "type": "trace",
          "char": "或"
        },
        {
          "id": "u28-or-或-complete",
          "type": "complete",
          "char": "或"
        },
        {
          "id": "u28-or-或-memory",
          "type": "memory",
          "char": "或"
        },
        {
          "id": "u28-hours-p2",
          "type": "phrase",
          "phrase": "u28-or"
        },
        {
          "id": "u28-hours-s2",
          "type": "select",
          "prompt": "Which word links two alternatives as “or”?",
          "options": [
            "或是",
            "但是",
            "非常"
          ],
          "answer": "或是",
          "explanation": "或是 joins alternatives: A 或是 B."
        }
      ]
    },
    {
      "id": "u28-object",
      "title": "Objects, Duration & Convenience Stores",
      "subtitle": "Keep the repeated-verb pattern and add a common Taiwan ticket-buying place.",
      "chars": [
        "利"
      ],
      "minutes": "11–14 min",
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
        },
        {
          "id": "u28-store-利-intro",
          "type": "intro",
          "char": "利"
        },
        {
          "id": "u28-store-利-trace",
          "type": "trace",
          "char": "利"
        },
        {
          "id": "u28-store-利-build",
          "type": "build",
          "char": "利"
        },
        {
          "id": "u28-store-利-complete",
          "type": "complete",
          "char": "利"
        },
        {
          "id": "u28-store-利-memory",
          "type": "memory",
          "char": "利"
        },
        {
          "id": "u28-object-p2",
          "type": "phrase",
          "phrase": "u28-convenience"
        },
        {
          "id": "u28-object-p3",
          "type": "phrase",
          "phrase": "u28-ticket-options"
        },
        {
          "id": "u28-object-s3",
          "type": "select",
          "prompt": "Which place is a convenience store?",
          "options": [
            "便利商店",
            "高鐵站",
            "茶館"
          ],
          "answer": "便利商店",
          "explanation": "便利商店 means convenience store."
        }
      ]
    },
    {
      "id": "u28-negation",
      "title": "Negative Duration & the Bus",
      "subtitle": "Place duration before negation and recover the full textbook word for bus.",
      "chars": [
        "汽"
      ],
      "minutes": "11–14 min",
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
        },
        {
          "id": "u28-bus-汽-intro",
          "type": "intro",
          "char": "汽"
        },
        {
          "id": "u28-bus-汽-trace",
          "type": "trace",
          "char": "汽"
        },
        {
          "id": "u28-bus-汽-build",
          "type": "build",
          "char": "汽"
        },
        {
          "id": "u28-bus-汽-complete",
          "type": "complete",
          "char": "汽"
        },
        {
          "id": "u28-bus-汽-memory",
          "type": "memory",
          "char": "汽"
        },
        {
          "id": "u28-negation-p2",
          "type": "phrase",
          "phrase": "u28-bus"
        },
        {
          "id": "u28-negation-s3",
          "type": "select",
          "prompt": "Which textbook form means “bus”?",
          "options": [
            "公共汽車",
            "計程車",
            "機車"
          ],
          "answer": "公共汽車",
          "explanation": "公共汽車 is the full form for bus; 公車 is the shorter everyday form."
        }
      ]
    },
    {
      "id": "u28-separable",
      "title": "Separable Verbs & Ancient China",
      "subtitle": "Finish duration inside separable verbs and close one remaining Lesson 8 country term.",
      "chars": [],
      "minutes": "10–13 min",
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
          "id": "u28-separable-p3",
          "type": "phrase",
          "phrase": "u28-china-ancient"
        },
        {
          "id": "u28-separable-s2",
          "type": "select",
          "prompt": "Which word means China?",
          "options": [
            "中國",
            "古代",
            "臺灣"
          ],
          "answer": "中國",
          "explanation": "中國 is the country name China; 古代 means ancient times."
        }
      ]
    },
    {
      "id": "u28-review",
      "title": "Unit 28 Review",
      "subtitle": "Time structure plus the recovered Lesson 8 transport vocabulary.",
      "chars": [],
      "minutes": "15–19 min",
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
        },
        {
          "id": "u28-review-21",
          "type": "select",
          "prompt": "Which sentence correctly means “HSR tickets are very expensive, but taking the HSR is fast and comfortable”?",
          "options": [
            "高鐵車票非常貴，但是坐高鐵又快又舒服。",
            "高鐵車票但是貴，非常坐高鐵舒服。",
            "高鐵車票或是貴，站坐高鐵。"
          ],
          "answer": "高鐵車票非常貴，但是坐高鐵又快又舒服。",
          "explanation": "非常 strengthens 貴, while 但是 introduces the contrasting second clause."
        },
        {
          "id": "u28-review-22",
          "type": "select",
          "prompt": "Which set correctly matches the recovered transport words?",
          "options": [
            "站 = station；或是 = or；便利商店 = convenience store；公共汽車 = bus",
            "站 = hour；或是 = very；便利商店 = tea house；公共汽車 = taxi",
            "站 = film；或是 = but；便利商店 = station；公共汽車 = scooter"
          ],
          "answer": "站 = station；或是 = or；便利商店 = convenience store；公共汽車 = bus",
          "explanation": "These are the Lesson 8 meanings restored in this rebalance."
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
      "text": "非常",
      "pinyin": "fēicháng",
      "meaning": "very; extremely",
      "lessonId": "u28-film",
      "core": true
    },
    {
      "text": "但是",
      "pinyin": "dànshì",
      "meaning": "but; however",
      "lessonId": "u28-film",
      "core": true
    },
    {
      "text": "站",
      "pinyin": "zhàn",
      "meaning": "station; stop",
      "lessonId": "u28-years-days",
      "core": true
    },
    {
      "text": "或是",
      "pinyin": "huòshì",
      "meaning": "or",
      "lessonId": "u28-hours",
      "core": true
    },
    {
      "text": "便利商店",
      "pinyin": "biànlì shāngdiàn",
      "meaning": "convenience store",
      "lessonId": "u28-object",
      "core": true
    },
    {
      "text": "公共汽車",
      "pinyin": "gōnggòng qìchē",
      "meaning": "bus",
      "lessonId": "u28-negation",
      "core": true,
      "note": "Lesson 8 gives 公共汽車 as the full form and 公車 as the shorter everyday form."
    },
    {
      "text": "中國",
      "pinyin": "Zhōngguó",
      "meaning": "China",
      "lessonId": "u28-separable",
      "core": true
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
    "非",
    "但",
    "站",
    "或",
    "利",
    "汽"
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
    "非": {
      "hanzi": "非",
      "pinyin": "fēi",
      "zhuyin": "ㄈㄟ",
      "meaning": "not; non-; first character of 非常",
      "strokes": 8,
      "layout": "whole",
      "note": "非 is first-tone fēi. In 非常, it forms the common adverb meaning “very.”",
      "memory": "非 is an interlocked eight-stroke form: the two vertical sides and paired horizontals are written as one balanced shape rather than as two independent components.",
      "parts": [
        {
          "label": "非",
          "name": "interlocked whole form",
          "role": "Whole-character form",
          "description": "The eight strokes interleave the two sides of 非, so a single whole-character group is more faithful than forcing a false left-right split.",
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
        }
      ],
      "example": {
        "text": "非常",
        "pinyin": "fēicháng",
        "meaning": "very"
      }
    },
    "但": {
      "hanzi": "但",
      "pinyin": "dàn",
      "zhuyin": "ㄉㄢˋ",
      "meaning": "but; however; first character of 但是",
      "strokes": 7,
      "layout": "side",
      "note": "但 is fourth-tone dàn. In 但是, it introduces a contrast: “but; however.”",
      "memory": "亻stands on the left; 旦 on the right has 日 over a final horizontal.",
      "parts": [
        {
          "label": "亻",
          "name": "person component",
          "role": "Left component",
          "description": "The first two strokes form 亻 on the left.",
          "strokes": [
            0,
            1
          ]
        },
        {
          "label": "旦",
          "name": "dawn component",
          "role": "Right component",
          "description": "The final five strokes form 旦 on the right: 日 above the bottom horizontal.",
          "strokes": [
            2,
            3,
            4,
            5,
            6
          ]
        }
      ],
      "example": {
        "text": "但是",
        "pinyin": "dànshì",
        "meaning": "but; however"
      }
    },
    "站": {
      "hanzi": "站",
      "pinyin": "zhàn",
      "zhuyin": "ㄓㄢˋ",
      "meaning": "station; stop",
      "strokes": 10,
      "layout": "side",
      "note": "站 is fourth-tone zhàn. In 高鐵站, it means a station or stop.",
      "memory": "立 takes the left five strokes and 占 takes the right five; keep both halves narrow.",
      "parts": [
        {
          "label": "立",
          "name": "stand component",
          "role": "Left component",
          "description": "The first five strokes form 立 on the left.",
          "strokes": [
            0,
            1,
            2,
            3,
            4
          ]
        },
        {
          "label": "占",
          "name": "right component",
          "role": "Right component",
          "description": "The final five strokes form 占 on the right.",
          "strokes": [
            5,
            6,
            7,
            8,
            9
          ]
        }
      ],
      "example": {
        "text": "高鐵站",
        "pinyin": "gāotiě zhàn",
        "meaning": "HSR station"
      }
    },
    "或": {
      "hanzi": "或",
      "pinyin": "huò",
      "zhuyin": "ㄏㄨㄛˋ",
      "meaning": "or; perhaps; first character of 或是",
      "strokes": 8,
      "layout": "whole",
      "note": "或 is fourth-tone huò. In 或是, it means “or.”",
      "memory": "The 戈-like outer strokes wrap around 口 and 一. Because the wrapping strokes are interleaved with the inside, learn 或 as one ordered whole rather than a fake side-by-side split.",
      "parts": [
        {
          "label": "或",
          "name": "wrapped whole form",
          "role": "Whole-character form",
          "description": "The eight strokes combine an outer 戈-like frame with the inner 口 and 一 in interleaved stroke order.",
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
        }
      ],
      "example": {
        "text": "或是",
        "pinyin": "huòshì",
        "meaning": "or"
      }
    },
    "利": {
      "hanzi": "利",
      "pinyin": "lì",
      "zhuyin": "ㄌㄧˋ",
      "meaning": "benefit; second character of 便利",
      "strokes": 7,
      "layout": "side",
      "note": "利 is fourth-tone lì. In 便利商店, 便利 means convenient.",
      "memory": "禾 is the five-stroke left side; the two-stroke 刂 blade finishes the right edge.",
      "parts": [
        {
          "label": "禾",
          "name": "grain component",
          "role": "Left component",
          "description": "The first five strokes form 禾 on the left.",
          "strokes": [
            0,
            1,
            2,
            3,
            4
          ]
        },
        {
          "label": "刂",
          "name": "knife side",
          "role": "Right component",
          "description": "The last two strokes form 刂 on the right.",
          "strokes": [
            5,
            6
          ]
        }
      ],
      "example": {
        "text": "便利商店",
        "pinyin": "biànlì shāngdiàn",
        "meaning": "convenience store"
      }
    },
    "汽": {
      "hanzi": "汽",
      "pinyin": "qì",
      "zhuyin": "ㄑㄧˋ",
      "meaning": "steam; first character of 汽車",
      "strokes": 7,
      "layout": "side",
      "note": "汽 is fourth-tone qì. In 公共汽車, 汽車 contributes the vehicle/bus meaning.",
      "memory": "Three water dots 氵go on the left; 气 fills the right with four strokes.",
      "parts": [
        {
          "label": "氵",
          "name": "water side",
          "role": "Left component",
          "description": "The first three strokes form 氵 on the left.",
          "strokes": [
            0,
            1,
            2
          ]
        },
        {
          "label": "气",
          "name": "air component",
          "role": "Right component",
          "description": "The final four strokes form 气 on the right.",
          "strokes": [
            3,
            4,
            5,
            6
          ]
        }
      ],
      "example": {
        "text": "公共汽車",
        "pinyin": "gōnggòng qìchē",
        "meaning": "bus"
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
    "u28-very-but": {
      "text": "高鐵車票非常貴，但是坐高鐵又快又舒服。",
      "pinyin": "Gāotiě chēpiào fēicháng guì, dànshì zuò gāotiě yòu kuài yòu shūfu.",
      "meaning": "HSR tickets are very expensive, but taking the HSR is both fast and comfortable.",
      "note": "非常 strengthens 貴; 但是 introduces the contrast.",
      "tokens": [
        "高鐵車票",
        "非常貴",
        "但是",
        "坐高鐵",
        "又快又舒服"
      ]
    },
    "u28-station": {
      "text": "我在高鐵站買票。",
      "pinyin": "Wǒ zài gāotiě zhàn mǎi piào.",
      "meaning": "I buy a ticket at the HSR station.",
      "note": "站 means station or stop.",
      "tokens": [
        "我",
        "在高鐵站",
        "買票"
      ]
    },
    "u28-or": {
      "text": "坐高鐵或是坐火車都可以。",
      "pinyin": "Zuò gāotiě huòshì zuò huǒchē dōu kěyǐ.",
      "meaning": "Taking the HSR or taking the train are both possible.",
      "note": "或是 links alternatives: A or B.",
      "tokens": [
        "坐高鐵",
        "或是",
        "坐火車",
        "都可以"
      ]
    },
    "u28-convenience": {
      "text": "我在便利商店買票。",
      "pinyin": "Wǒ zài biànlì shāngdiàn mǎi piào.",
      "meaning": "I buy a ticket at a convenience store.",
      "note": "便利商店 is the Taiwan textbook term for convenience store.",
      "tokens": [
        "我",
        "在便利商店",
        "買票"
      ]
    },
    "u28-ticket-options": {
      "text": "在高鐵站或是便利商店都可以。",
      "pinyin": "Zài gāotiě zhàn huòshì biànlì shāngdiàn dōu kěyǐ.",
      "meaning": "Either at an HSR station or at a convenience store is fine.",
      "note": "This combines the Lesson 8 ticket-buying locations with 或是.",
      "tokens": [
        "在高鐵站",
        "或是",
        "便利商店",
        "都可以"
      ]
    },
    "u28-bus": {
      "text": "你可以坐公共汽車去。",
      "pinyin": "Nǐ kěyǐ zuò gōnggòng qìchē qù.",
      "meaning": "You can take the bus there.",
      "note": "公共汽車 is the full textbook form for bus; 公車 is the shorter form already learned.",
      "tokens": [
        "你可以",
        "坐公共汽車",
        "去"
      ]
    },
    "u28-china-ancient": {
      "text": "那裡有很多中國古代的東西。",
      "pinyin": "Nàlǐ yǒu hěn duō Zhōngguó gǔdài de dōngxi.",
      "meaning": "There are many things from ancient China there.",
      "note": "中國 is the country name; 古代 was introduced in Unit 26.",
      "tokens": [
        "那裡",
        "有很多",
        "中國古代的東西"
      ]
    }
  },
  "revisionStepIds": []
};
export default unit;
