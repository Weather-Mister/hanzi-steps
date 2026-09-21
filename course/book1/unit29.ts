import type {UnitData} from '../schema.ts';

const unit:UnitData = {
  "schemaVersion": 1,
  "bookId": "book-1",
  "order": 29,
  "unit": {
    "id": "unit-29",
    "number": 29,
    "theme": "teal",
    "label": "Dates, conditions & trying fruit",
    "title": "If I Have Time, I’ll Try It",
    "description": "Consolidate Lesson 9 dates and conditions, then begin Lesson 10 with fruit, colors, taste words, opportunities, and the tentative VV看 pattern.",
    "chars": [
      "月",
      "號",
      "就",
      "貓",
      "水",
      "果",
      "黃",
      "色",
      "芒",
      "給",
      "香",
      "瓜"
    ],
    "lessonIds": [
      "u29-date",
      "u29-hai",
      "u29-maokong",
      "u29-condition",
      "u29-negative",
      "u29-integrate",
      "u29-review"
    ],
    "banner": {
      "text": "這個芒果很好吃，你吃吃看。",
      "pinyin": "Zhè ge mángguǒ hěn hǎochī, nǐ chīchīkàn."
    },
    "goal": {
      "text": "要是有機會，我就吃吃看。",
      "pinyin": "Yàoshi yǒu jīhuì, wǒ jiù chīchīkàn.",
      "meaning": "If I get the chance, then I'll try it."
    },
    "grammarIds": [
      "u29-calendar-date",
      "u29-yaoshi-jiu",
      "u29-vv-kan"
    ],
    "bookReference": "A Course in Contemporary Chinese 1 · Lesson 9 Grammar I/V (printed pp. 188, 192–193) plus Lesson 10 Dialogue I / Vocabulary I and Grammar I (printed pp. 202–208). Existing Lesson 9 date/condition steps are retained for saved-progress compatibility; new lexical load comes from Lesson 10 rather than padding transparent combinations."
  },
  "reviewLessonId": "u29-review",
  "lessons": [
    {
      "id": "u29-date",
      "title": "Dates and Fruit",
      "subtitle": "Keep the date pattern, then begin Lesson 10 with 水果.",
      "chars": [
        "月",
        "號",
        "水",
        "果"
      ],
      "minutes": "11–14 min",
      "unitId": "unit-29",
      "review": false,
      "steps": [
        {
          "id": "u29-date-月-intro",
          "type": "intro",
          "char": "月"
        },
        {
          "id": "u29-date-月-trace",
          "type": "trace",
          "char": "月"
        },
        {
          "id": "u29-date-月-build",
          "type": "build",
          "char": "月"
        },
        {
          "id": "u29-date-月-complete",
          "type": "complete",
          "char": "月"
        },
        {
          "id": "u29-date-月-memory",
          "type": "memory",
          "char": "月"
        },
        {
          "id": "u29-date-號-intro",
          "type": "intro",
          "char": "號"
        },
        {
          "id": "u29-date-號-trace",
          "type": "trace",
          "char": "號"
        },
        {
          "id": "u29-date-號-build",
          "type": "build",
          "char": "號"
        },
        {
          "id": "u29-date-號-complete",
          "type": "complete",
          "char": "號"
        },
        {
          "id": "u29-date-號-memory",
          "type": "memory",
          "char": "號"
        },
        {
          "id": "u29-date-g1",
          "type": "grammar",
          "grammar": "u29-calendar-date"
        },
        {
          "id": "u29-date-p1",
          "type": "phrase",
          "phrase": "u29-date"
        },
        {
          "id": "u29-date-p2",
          "type": "phrase",
          "phrase": "u29-return-date"
        },
        {
          "id": "u29-date-o1",
          "type": "order",
          "phrase": "u29-date",
          "tokens": [
            "我女朋友",
            "九月三十號",
            "要來看我"
          ]
        },
        {
          "id": "u29-date-s1",
          "type": "select",
          "prompt": "Which expression means September 30?",
          "options": [
            "九月三十號",
            "三十月九號",
            "九號三十月"
          ],
          "answer": "九月三十號",
          "explanation": "Chinese dates put the month before the day.",
          "grammarIds": [
            "u29-calendar-date"
          ]
        },
        {
          "id": "u29-date-s2",
          "type": "select",
          "prompt": "Which marker is common in a spoken day-of-month date?",
          "options": [
            "號",
            "年",
            "鐘頭"
          ],
          "answer": "號",
          "explanation": "號 follows the day number in spoken dates."
        },
        {
          "id": "u29-date-fruit-水-intro",
          "type": "intro",
          "char": "水"
        },
        {
          "id": "u29-date-fruit-水-trace",
          "type": "trace",
          "char": "水"
        },
        {
          "id": "u29-date-fruit-水-build",
          "type": "build",
          "char": "水"
        },
        {
          "id": "u29-date-fruit-水-complete",
          "type": "complete",
          "char": "水"
        },
        {
          "id": "u29-date-fruit-水-memory",
          "type": "memory",
          "char": "水"
        },
        {
          "id": "u29-date-fruit-果-intro",
          "type": "intro",
          "char": "果"
        },
        {
          "id": "u29-date-fruit-果-trace",
          "type": "trace",
          "char": "果"
        },
        {
          "id": "u29-date-fruit-果-build",
          "type": "build",
          "char": "果"
        },
        {
          "id": "u29-date-fruit-果-complete",
          "type": "complete",
          "char": "果"
        },
        {
          "id": "u29-date-fruit-果-memory",
          "type": "memory",
          "char": "果"
        },
        {
          "id": "u29-date-fruit-p1",
          "type": "phrase",
          "phrase": "u29-fruit"
        },
        {
          "id": "u29-date-fruit-s1",
          "type": "select",
          "prompt": "Which word is the general word for “fruit”?",
          "options": [
            "水果",
            "西瓜",
            "芒果"
          ],
          "answer": "水果",
          "explanation": "水果 is the general category “fruit”; 西瓜 and 芒果 are specific fruits."
        }
      ]
    },
    {
      "id": "u29-hai",
      "title": "Still More to Try",
      "subtitle": "Retain 還, then learn mango, giving, fragrance, and sweetness.",
      "chars": [
        "芒",
        "給",
        "香"
      ],
      "minutes": "7–9 min",
      "unitId": "unit-29",
      "review": false,
      "steps": [
        {
          "id": "u29-hai-p1",
          "type": "phrase",
          "phrase": "u29-still"
        },
        {
          "id": "u29-hai-o1",
          "type": "order",
          "phrase": "u29-still",
          "tokens": [
            "我",
            "還",
            "不知道"
          ]
        },
        {
          "id": "u29-hai-p2",
          "type": "phrase",
          "phrase": "u29-additional"
        },
        {
          "id": "u29-hai-s1",
          "type": "select",
          "prompt": "In 我還不知道, what does 還 mean?",
          "options": [
            "still",
            "already",
            "only"
          ],
          "answer": "still",
          "explanation": "The state of not knowing continues: still do not know."
        },
        {
          "id": "u29-hai-s2",
          "type": "select",
          "prompt": "In 這裡還有茶館, what does 還 add?",
          "options": [
            "another item / also",
            "a past-time marker",
            "a comparison"
          ],
          "answer": "another item / also",
          "explanation": "還有 adds something else that is present."
        },
        {
          "id": "u29-hai-mango-芒-intro",
          "type": "intro",
          "char": "芒"
        },
        {
          "id": "u29-hai-mango-芒-trace",
          "type": "trace",
          "char": "芒"
        },
        {
          "id": "u29-hai-mango-芒-build",
          "type": "build",
          "char": "芒"
        },
        {
          "id": "u29-hai-mango-芒-complete",
          "type": "complete",
          "char": "芒"
        },
        {
          "id": "u29-hai-mango-芒-memory",
          "type": "memory",
          "char": "芒"
        },
        {
          "id": "u29-hai-give-給-intro",
          "type": "intro",
          "char": "給"
        },
        {
          "id": "u29-hai-give-給-trace",
          "type": "trace",
          "char": "給"
        },
        {
          "id": "u29-hai-give-給-build",
          "type": "build",
          "char": "給"
        },
        {
          "id": "u29-hai-give-給-complete",
          "type": "complete",
          "char": "給"
        },
        {
          "id": "u29-hai-give-給-memory",
          "type": "memory",
          "char": "給"
        },
        {
          "id": "u29-hai-fragrant-香-intro",
          "type": "intro",
          "char": "香"
        },
        {
          "id": "u29-hai-fragrant-香-trace",
          "type": "trace",
          "char": "香"
        },
        {
          "id": "u29-hai-fragrant-香-build",
          "type": "build",
          "char": "香"
        },
        {
          "id": "u29-hai-fragrant-香-complete",
          "type": "complete",
          "char": "香"
        },
        {
          "id": "u29-hai-fragrant-香-memory",
          "type": "memory",
          "char": "香"
        },
        {
          "id": "u29-hai-mango-p1",
          "type": "phrase",
          "phrase": "u29-give-mango"
        },
        {
          "id": "u29-hai-taste-p1",
          "type": "phrase",
          "phrase": "u29-fragrant-sweet"
        },
        {
          "id": "u29-hai-s3",
          "type": "select",
          "prompt": "Which word describes a pleasant smell?",
          "options": [
            "香",
            "甜",
            "對"
          ],
          "answer": "香",
          "explanation": "香 describes fragrance; 甜 describes a sweet taste."
        },
        {
          "id": "u29-hai-s4",
          "type": "select",
          "prompt": "Which word describes a sweet taste?",
          "options": [
            "甜",
            "香",
            "給"
          ],
          "answer": "甜",
          "explanation": "甜 is the state verb “sweet.”"
        }
      ]
    },
    {
      "id": "u29-maokong",
      "title": "Colors and Fruit",
      "subtitle": "Keep the Maokong retrieval, then describe fruit with 黃色 and 西瓜.",
      "chars": [
        "貓",
        "黃",
        "色",
        "瓜"
      ],
      "minutes": "8–10 min",
      "unitId": "unit-29",
      "review": false,
      "steps": [
        {
          "id": "u29-maokong-貓-intro",
          "type": "intro",
          "char": "貓"
        },
        {
          "id": "u29-maokong-貓-trace",
          "type": "trace",
          "char": "貓"
        },
        {
          "id": "u29-maokong-貓-build",
          "type": "build",
          "char": "貓"
        },
        {
          "id": "u29-maokong-貓-complete",
          "type": "complete",
          "char": "貓"
        },
        {
          "id": "u29-maokong-貓-memory",
          "type": "memory",
          "char": "貓"
        },
        {
          "id": "u29-maokong-p1",
          "type": "phrase",
          "phrase": "u29-maokong"
        },
        {
          "id": "u29-maokong-o1",
          "type": "order",
          "phrase": "u29-maokong",
          "tokens": [
            "貓空的風景",
            "很美"
          ]
        },
        {
          "id": "u29-maokong-s1",
          "type": "select",
          "prompt": "Which place name from Dialogue II is associated with tea and scenery?",
          "options": [
            "貓空",
            "夜市",
            "茶館"
          ],
          "answer": "貓空",
          "explanation": "貓空 is the named Taipei destination in the dialogue."
        },
        {
          "id": "u29-maokong-l1",
          "type": "listen",
          "char": "貓",
          "options": [
            "貓",
            "月",
            "號",
            "就"
          ],
          "answer": "貓",
          "explanation": "貓 is māo, the first character of 貓空."
        },
        {
          "id": "u29-maokong-yellow-黃-intro",
          "type": "intro",
          "char": "黃"
        },
        {
          "id": "u29-maokong-yellow-黃-trace",
          "type": "trace",
          "char": "黃"
        },
        {
          "id": "u29-maokong-yellow-黃-build",
          "type": "build",
          "char": "黃"
        },
        {
          "id": "u29-maokong-yellow-黃-complete",
          "type": "complete",
          "char": "黃"
        },
        {
          "id": "u29-maokong-yellow-黃-memory",
          "type": "memory",
          "char": "黃"
        },
        {
          "id": "u29-maokong-color-色-intro",
          "type": "intro",
          "char": "色"
        },
        {
          "id": "u29-maokong-color-色-trace",
          "type": "trace",
          "char": "色"
        },
        {
          "id": "u29-maokong-color-色-build",
          "type": "build",
          "char": "色"
        },
        {
          "id": "u29-maokong-color-色-complete",
          "type": "complete",
          "char": "色"
        },
        {
          "id": "u29-maokong-color-色-memory",
          "type": "memory",
          "char": "色"
        },
        {
          "id": "u29-maokong-melon-瓜-intro",
          "type": "intro",
          "char": "瓜"
        },
        {
          "id": "u29-maokong-melon-瓜-trace",
          "type": "trace",
          "char": "瓜"
        },
        {
          "id": "u29-maokong-melon-瓜-build",
          "type": "build",
          "char": "瓜"
        },
        {
          "id": "u29-maokong-melon-瓜-complete",
          "type": "complete",
          "char": "瓜"
        },
        {
          "id": "u29-maokong-melon-瓜-memory",
          "type": "memory",
          "char": "瓜"
        },
        {
          "id": "u29-maokong-yellow-p1",
          "type": "phrase",
          "phrase": "u29-yellow-fruit"
        },
        {
          "id": "u29-maokong-watermelon-p1",
          "type": "phrase",
          "phrase": "u29-watermelon"
        },
        {
          "id": "u29-maokong-correct-p1",
          "type": "phrase",
          "phrase": "u29-correct"
        },
        {
          "id": "u29-maokong-s2",
          "type": "select",
          "prompt": "Which word means “yellow”?",
          "options": [
            "黃色",
            "水果",
            "西瓜"
          ],
          "answer": "黃色",
          "explanation": "黃色 is the color yellow."
        },
        {
          "id": "u29-maokong-s3",
          "type": "select",
          "prompt": "Which expression is a conversational confirmation meaning “right/correct”?",
          "options": [
            "對",
            "以前",
            "機會"
          ],
          "answer": "對",
          "explanation": "對 means correct/right and can confirm what someone has said."
        }
      ]
    },
    {
      "id": "u29-condition",
      "title": "If There Is a Chance",
      "subtitle": "Use 要是…就… with 以前 and 機會.",
      "chars": [
        "就"
      ],
      "minutes": "10–13 min",
      "unitId": "unit-29",
      "review": false,
      "steps": [
        {
          "id": "u29-condition-就-intro",
          "type": "intro",
          "char": "就"
        },
        {
          "id": "u29-condition-就-trace",
          "type": "trace",
          "char": "就"
        },
        {
          "id": "u29-condition-就-build",
          "type": "build",
          "char": "就"
        },
        {
          "id": "u29-condition-就-complete",
          "type": "complete",
          "char": "就"
        },
        {
          "id": "u29-condition-就-memory",
          "type": "memory",
          "char": "就"
        },
        {
          "id": "u29-condition-g1",
          "type": "grammar",
          "grammar": "u29-yaoshi-jiu"
        },
        {
          "id": "u29-condition-p1",
          "type": "phrase",
          "phrase": "u29-if-free"
        },
        {
          "id": "u29-condition-o1",
          "type": "order",
          "phrase": "u29-if-free",
          "tokens": [
            "要是我有空",
            "我就跟你一起去"
          ]
        },
        {
          "id": "u29-condition-s1",
          "type": "select",
          "prompt": "Which word introduces the consequence in 要是…就…?",
          "options": [
            "就",
            "要是",
            "還"
          ],
          "answer": "就",
          "explanation": "要是 marks the condition; 就 begins the consequence predicate.",
          "grammarIds": [
            "u29-yaoshi-jiu"
          ]
        },
        {
          "id": "u29-condition-s2",
          "type": "select",
          "prompt": "Which sentence correctly means “If I am free, then I will go with you”?",
          "options": [
            "要是我有空，我就跟你一起去。",
            "我就要是有空，跟你一起去。",
            "有空就我，要是一起去。"
          ],
          "answer": "要是我有空，我就跟你一起去。",
          "explanation": "The condition comes with 要是 and the result with 就.",
          "grammarIds": [
            "u29-yaoshi-jiu"
          ]
        },
        {
          "id": "u29-condition-before-p1",
          "type": "phrase",
          "phrase": "u29-before"
        },
        {
          "id": "u29-condition-opportunity-p1",
          "type": "phrase",
          "phrase": "u29-opportunity"
        },
        {
          "id": "u29-condition-s3",
          "type": "select",
          "prompt": "Which word means “before / in the past”?",
          "options": [
            "以前",
            "機會",
            "要是"
          ],
          "answer": "以前",
          "explanation": "以前 refers to an earlier time or past situation."
        },
        {
          "id": "u29-condition-s4",
          "type": "select",
          "prompt": "Which word means “opportunity / chance”?",
          "options": [
            "機會",
            "以前",
            "還"
          ],
          "answer": "機會",
          "explanation": "機會 is an opportunity or chance."
        }
      ]
    },
    {
      "id": "u29-negative",
      "title": "Try It and See",
      "subtitle": "Keep negative conditions, then learn the tentative VV看 pattern.",
      "chars": [],
      "minutes": "8–10 min",
      "unitId": "unit-29",
      "review": false,
      "steps": [
        {
          "id": "u29-negative-p1",
          "type": "phrase",
          "phrase": "u29-if-not-free"
        },
        {
          "id": "u29-negative-o1",
          "type": "order",
          "phrase": "u29-if-not-free",
          "tokens": [
            "你要是沒空",
            "我們就不去夜市"
          ]
        },
        {
          "id": "u29-negative-s1",
          "type": "select",
          "prompt": "Which sentence correctly handles a negative condition?",
          "options": [
            "你要是沒空，我們就不去夜市。",
            "你沒空就要是我們不去夜市。",
            "要是就你沒空，我們夜市不去。"
          ],
          "answer": "你要是沒空，我們就不去夜市。",
          "explanation": "Negation stays inside its clause; 要是 and 就 keep their normal roles.",
          "grammarIds": [
            "u29-yaoshi-jiu"
          ]
        },
        {
          "id": "u29-negative-s2",
          "type": "select",
          "prompt": "Can the subject come before 要是?",
          "options": [
            "Yes, as in 你要是沒空…",
            "No, 要是 must always be the first word",
            "Only in questions"
          ],
          "answer": "Yes, as in 你要是沒空…",
          "explanation": "Lesson 9 explicitly allows 要是 before or after the subject of the condition clause.",
          "grammarIds": [
            "u29-yaoshi-jiu"
          ]
        },
        {
          "id": "u29-negative-vvkan-g1",
          "type": "grammar",
          "grammar": "u29-vv-kan"
        },
        {
          "id": "u29-negative-vvkan-p1",
          "type": "phrase",
          "phrase": "u29-try-mango"
        },
        {
          "id": "u29-negative-vvkan-o1",
          "type": "order",
          "phrase": "u29-try-mango",
          "tokens": [
            "這個芒果很好吃",
            "你吃吃看"
          ]
        },
        {
          "id": "u29-negative-vvkan-s1",
          "type": "select",
          "prompt": "Which expression means “try tasting it and see”?",
          "options": [
            "吃吃看",
            "吃西瓜",
            "給芒果"
          ],
          "answer": "吃吃看",
          "explanation": "吃吃看 is the tentative VV看 pattern.",
          "grammarIds": [
            "u29-vv-kan"
          ]
        },
        {
          "id": "u29-negative-vvkan-s2",
          "type": "select",
          "prompt": "In the Lesson 10 VV看 pattern, can you normally put the object directly after 看, as in *吃吃看芒果?",
          "options": [
            "No",
            "Yes, always",
            "Only with dates"
          ],
          "answer": "No",
          "explanation": "The textbook notes that VV看 generally cannot be followed directly by an object; use 吃吃看 in context instead.",
          "grammarIds": [
            "u29-vv-kan"
          ]
        }
      ]
    },
    {
      "id": "u29-integrate",
      "title": "From a Condition to Trying Something",
      "subtitle": "Combine Lesson 9 condition logic with the first Lesson 10 fruit language.",
      "chars": [],
      "minutes": "9–12 min",
      "unitId": "unit-29",
      "review": false,
      "steps": [
        {
          "id": "u29-integrate-p1",
          "type": "phrase",
          "phrase": "u29-date"
        },
        {
          "id": "u29-integrate-p2",
          "type": "phrase",
          "phrase": "u29-still"
        },
        {
          "id": "u29-integrate-p3",
          "type": "phrase",
          "phrase": "u29-maokong"
        },
        {
          "id": "u29-integrate-p4",
          "type": "phrase",
          "phrase": "u29-if-free"
        },
        {
          "id": "u29-integrate-s1",
          "type": "select",
          "prompt": "Your plan depends on whether you are free. Which frame expresses that dependency?",
          "options": [
            "要是…就…",
            "比…",
            "從…到…"
          ],
          "answer": "要是…就…",
          "explanation": "要是…就… presents a condition and its consequence.",
          "grammarIds": [
            "u29-yaoshi-jiu"
          ]
        },
        {
          "id": "u29-integrate-s2",
          "type": "select",
          "prompt": "Which date expression belongs before the action as a Time-When phrase?",
          "options": [
            "九月三十號",
            "三個鐘頭",
            "兩天"
          ],
          "answer": "九月三十號",
          "explanation": "A calendar date answers when; the other two answer how long.",
          "grammarIds": [
            "u29-calendar-date"
          ]
        },
        {
          "id": "u29-integrate-fruit-p1",
          "type": "phrase",
          "phrase": "u29-yellow-fruit"
        },
        {
          "id": "u29-integrate-taste-p1",
          "type": "phrase",
          "phrase": "u29-fragrant-sweet"
        },
        {
          "id": "u29-integrate-try-p1",
          "type": "phrase",
          "phrase": "u29-if-chance-try"
        },
        {
          "id": "u29-integrate-try-o1",
          "type": "order",
          "phrase": "u29-if-chance-try",
          "tokens": [
            "要是有機會",
            "我就吃吃看"
          ]
        },
        {
          "id": "u29-integrate-s3",
          "type": "select",
          "prompt": "Which sentence combines a condition with “try it and see”?",
          "options": [
            "要是有機會，我就吃吃看。",
            "我以前不喜歡吃水果。",
            "對，這是西瓜。"
          ],
          "answer": "要是有機會，我就吃吃看。",
          "explanation": "It combines 要是…就… with 吃吃看.",
          "grammarIds": [
            "u29-yaoshi-jiu",
            "u29-vv-kan"
          ]
        }
      ]
    },
    {
      "id": "u29-review",
      "title": "Unit 29 Review",
      "subtitle": "Dates, conditions, fruit, taste words, and VV看.",
      "chars": [],
      "minutes": "14–18 min",
      "unitId": "unit-29",
      "review": true,
      "steps": [
        {
          "id": "u29-review-01",
          "type": "listen",
          "char": "水",
          "options": [
            "水",
            "黃",
            "給",
            "瓜"
          ],
          "answer": "水",
          "explanation": "水 is shuǐ, the first character of 水果."
        },
        {
          "id": "u29-review-02",
          "type": "listen",
          "char": "黃",
          "options": [
            "黃",
            "水",
            "香",
            "瓜"
          ],
          "answer": "黃",
          "explanation": "黃 is huáng, yellow."
        },
        {
          "id": "u29-review-03",
          "type": "listen",
          "char": "給",
          "options": [
            "給",
            "香",
            "水",
            "果"
          ],
          "answer": "給",
          "explanation": "給 is gěi, to give."
        },
        {
          "id": "u29-review-04",
          "type": "select",
          "prompt": "Which word is the general category “fruit”?",
          "options": [
            "水果",
            "芒果",
            "西瓜"
          ],
          "answer": "水果",
          "explanation": "水果 means fruit in general.",
          "grammarIds": [
            "u29-calendar-date"
          ]
        },
        {
          "id": "u29-review-05",
          "type": "order",
          "phrase": "u29-yellow-fruit",
          "tokens": [
            "這個",
            "黃色的水果",
            "叫什麼"
          ]
        },
        {
          "id": "u29-review-06",
          "type": "order",
          "phrase": "u29-give-mango",
          "tokens": [
            "給你",
            "一塊芒果"
          ]
        },
        {
          "id": "u29-review-07",
          "type": "select",
          "prompt": "Which word means mango?",
          "options": [
            "芒果",
            "西瓜",
            "水果"
          ],
          "answer": "芒果",
          "explanation": "芒果 is mango."
        },
        {
          "id": "u29-review-08",
          "type": "select",
          "phrase": "u29-still",
          "tokens": [
            "我",
            "還",
            "不知道"
          ],
          "prompt": "Which word describes fragrance rather than taste?",
          "options": [
            "香",
            "甜",
            "對"
          ],
          "answer": "香",
          "explanation": "香 describes a pleasant smell; 甜 describes a sweet taste."
        },
        {
          "id": "u29-review-09",
          "type": "select",
          "prompt": "Which word means watermelon?",
          "options": [
            "西瓜",
            "芒果",
            "水果"
          ],
          "answer": "西瓜",
          "explanation": "西瓜 is watermelon."
        },
        {
          "id": "u29-review-10",
          "type": "select",
          "prompt": "Which word can confirm “Right / Correct”?",
          "options": [
            "對",
            "給",
            "以前"
          ],
          "answer": "對",
          "explanation": "對 means correct/right."
        },
        {
          "id": "u29-review-11",
          "type": "order",
          "phrase": "u29-before",
          "tokens": [
            "我以前",
            "不喜歡吃水果"
          ]
        },
        {
          "id": "u29-review-12",
          "type": "select",
          "prompt": "Which word means opportunity or chance?",
          "options": [
            "機會",
            "以前",
            "還"
          ],
          "answer": "機會",
          "explanation": "機會 means opportunity/chance.",
          "grammarIds": [
            "u29-yaoshi-jiu"
          ]
        },
        {
          "id": "u29-review-13",
          "type": "select",
          "prompt": "Which expression means “try tasting it and see”?",
          "options": [
            "吃吃看",
            "吃水果",
            "給你"
          ],
          "answer": "吃吃看",
          "explanation": "吃吃看 is 吃 + 吃 + 看.",
          "grammarIds": [
            "u29-vv-kan"
          ]
        },
        {
          "id": "u29-review-14",
          "type": "order",
          "phrase": "u29-try-mango",
          "tokens": [
            "這個芒果很好吃",
            "你吃吃看"
          ]
        },
        {
          "id": "u29-review-15",
          "type": "select",
          "phrase": "u29-if-not-free",
          "tokens": [
            "你要是沒空",
            "我們就不去夜市"
          ],
          "prompt": "Which follows the Lesson 10 restriction on VV看?",
          "options": [
            "吃吃看",
            "吃吃看芒果",
            "芒果看吃吃"
          ],
          "answer": "吃吃看",
          "explanation": "VV看 generally does not take its object directly after 看.",
          "grammarIds": [
            "u29-vv-kan"
          ]
        },
        {
          "id": "u29-review-16",
          "type": "select",
          "prompt": "Which sentence correctly allows the subject before 要是?",
          "options": [
            "你要是沒空，我們就不去夜市。",
            "你就要是沒空，我們不去夜市。",
            "要是就你沒空，我們不去夜市。"
          ],
          "answer": "你要是沒空，我們就不去夜市。",
          "explanation": "The subject may come before 要是; 就 still marks the consequence.",
          "grammarIds": [
            "u29-yaoshi-jiu"
          ]
        },
        {
          "id": "u29-review-17",
          "type": "select",
          "prompt": "Which is a Time-When calendar expression?",
          "options": [
            "九月三十號",
            "三個鐘頭",
            "兩天"
          ],
          "answer": "九月三十號",
          "explanation": "A calendar date answers when; the others are durations.",
          "grammarIds": [
            "u29-calendar-date"
          ]
        },
        {
          "id": "u29-review-18",
          "type": "order",
          "prompt": "Which sentence correctly places a date before the action?",
          "options": [
            "我九月三十號回國。",
            "我回國九月三十號回。",
            "九月回國我三十號。"
          ],
          "answer": "我九月三十號回國。",
          "explanation": "The date is a Time-When expression and precedes the verb phrase.",
          "grammarIds": [
            "u29-calendar-date"
          ],
          "phrase": "u29-return-date",
          "tokens": [
            "我",
            "九月三十號",
            "回國"
          ]
        },
        {
          "id": "u29-review-19",
          "type": "select",
          "prompt": "If the condition is negative, does 就 disappear?",
          "options": [
            "No, 就 still introduces the consequence",
            "Yes, negatives never use 就",
            "Only dates can use 就"
          ],
          "answer": "No, 就 still introduces the consequence",
          "explanation": "Negation stays inside its clause; the 要是…就… frame remains.",
          "grammarIds": [
            "u29-yaoshi-jiu"
          ]
        },
        {
          "id": "u29-review-20",
          "type": "order",
          "prompt": "Which sentence uses 還 to add another item?",
          "options": [
            "這裡還有茶館。",
            "我還不知道。",
            "我九月三十號回國。"
          ],
          "answer": "這裡還有茶館。",
          "explanation": "還有 means there is/are also something else.",
          "phrase": "u29-if-chance-try",
          "tokens": [
            "要是有機會",
            "我就吃吃看"
          ]
        }
      ]
    }
  ],
  "newVocabulary": [
    {
      "text": "水果",
      "pinyin": "shuǐguǒ",
      "meaning": "fruit",
      "lessonId": "u29-date",
      "core": true
    },
    {
      "text": "黃色",
      "pinyin": "huángsè",
      "meaning": "yellow",
      "lessonId": "u29-date",
      "core": true
    },
    {
      "text": "芒果",
      "pinyin": "mángguǒ",
      "meaning": "mango",
      "lessonId": "u29-hai",
      "core": true
    },
    {
      "text": "給",
      "pinyin": "gěi",
      "meaning": "to give",
      "lessonId": "u29-hai",
      "core": true
    },
    {
      "text": "香",
      "pinyin": "xiāng",
      "meaning": "fragrant; good-smelling",
      "lessonId": "u29-hai",
      "core": true
    },
    {
      "text": "甜",
      "pinyin": "tián",
      "meaning": "sweet (taste)",
      "lessonId": "u29-hai",
      "core": true,
      "note": "The character was seen earlier in 甜點; this is the first formal teaching of 甜 as an independent state verb."
    },
    {
      "text": "西瓜",
      "pinyin": "xīguā",
      "meaning": "watermelon",
      "lessonId": "u29-maokong",
      "core": true
    },
    {
      "text": "對",
      "pinyin": "duì",
      "meaning": "correct; right",
      "lessonId": "u29-maokong",
      "core": true,
      "note": "The character was already taught in another use; this is the first formal vocabulary entry for 對 as “correct/right.”"
    },
    {
      "text": "以前",
      "pinyin": "yǐqián",
      "meaning": "before; in the past",
      "lessonId": "u29-condition",
      "core": true
    },
    {
      "text": "機會",
      "pinyin": "jīhuì",
      "meaning": "opportunity; chance",
      "lessonId": "u29-condition",
      "core": true
    },
    {
      "text": "吃吃看",
      "pinyin": "chīchīkàn",
      "meaning": "try tasting it; have a taste and see",
      "lessonId": "u29-negative",
      "core": true
    }
  ],
  "reviewVocabulary": [
    "女朋友",
    "來",
    "看",
    "回國",
    "知道",
    "茶館",
    "風景",
    "美",
    "有空",
    "一起",
    "跟",
    "夜市",
    "月",
    "號",
    "還",
    "貓空",
    "要是",
    "就",
    "塊",
    "吧",
    "請",
    "喜歡",
    "很",
    "好吃",
    "這個",
    "也",
    "旅行"
  ],
  "newCharacters": [
    "水",
    "果",
    "黃",
    "色",
    "芒",
    "給",
    "香",
    "瓜"
  ],
  "reviewCharacters": [
    "月",
    "號",
    "就",
    "貓"
  ],
  "characters": {
    "水": {
      "hanzi": "水",
      "pinyin": "shuǐ",
      "zhuyin": "ㄕㄨㄟˇ",
      "meaning": "water",
      "strokes": 4,
      "layout": "whole",
      "note": "水 is third-tone shuǐ. In 水果, it is the first character of the word for fruit.",
      "memory": "A central hook anchors 水; a left sweep and two right-side strokes spread outward like flowing water.",
      "parts": [
        {
          "label": "亅",
          "name": "central hook",
          "role": "Visual component",
          "description": "The first stroke is the central hooked stroke that anchors the character.",
          "strokes": [
            0
          ]
        },
        {
          "label": "㇇",
          "name": "left sweep",
          "role": "Visual component",
          "description": "The second stroke sweeps out from the center toward the left.",
          "strokes": [
            1
          ]
        },
        {
          "label": "丿㇏",
          "name": "right-side pair",
          "role": "Visual component",
          "description": "The final two strokes open to the right as a falling pair.",
          "strokes": [
            2,
            3
          ]
        }
      ],
      "example": {
        "text": "水果",
        "pinyin": "shuǐguǒ",
        "meaning": "fruit"
      }
    },
    "果": {
      "hanzi": "果",
      "pinyin": "guǒ",
      "zhuyin": "ㄍㄨㄛˇ",
      "meaning": "fruit; result",
      "strokes": 8,
      "layout": "stack",
      "note": "果 is third-tone guǒ. It appears in both 水果 “fruit” and 芒果 “mango.”",
      "memory": "Write the 田-shaped upper block first, then let the 木-shaped lower strokes pass through and spread underneath.",
      "parts": [
        {
          "label": "田",
          "name": "field-shaped top",
          "role": "Visual component",
          "description": "The first four strokes form the 田-shaped upper block.",
          "strokes": [
            0,
            1,
            2,
            3
          ]
        },
        {
          "label": "木",
          "name": "tree-shaped base",
          "role": "Visual component",
          "description": "The final four strokes form the 木-shaped structure through the center and bottom.",
          "strokes": [
            4,
            5,
            6,
            7
          ]
        }
      ],
      "example": {
        "text": "芒果",
        "pinyin": "mángguǒ",
        "meaning": "mango"
      }
    },
    "黃": {
      "hanzi": "黃",
      "pinyin": "huáng",
      "zhuyin": "ㄏㄨㄤˊ",
      "meaning": "yellow",
      "strokes": 12,
      "layout": "stack",
      "note": "黃 is second-tone huáng, the color yellow. 黃色 is the noun/adjective expression “yellow.”",
      "memory": "Build the wide top, place the central horizontal and 田-shaped block beneath it, then finish with the two spreading bottom strokes.",
      "parts": [
        {
          "label": "廿",
          "name": "top block",
          "role": "Visual component",
          "description": "The first four strokes form the wide top component.",
          "strokes": [
            0,
            1,
            2,
            3
          ]
        },
        {
          "label": "一",
          "name": "middle bar",
          "role": "Visual component",
          "description": "The fifth stroke is the horizontal bar below the top.",
          "strokes": [
            4
          ]
        },
        {
          "label": "田",
          "name": "middle field",
          "role": "Visual component",
          "description": "Strokes six through ten form the central 田-shaped block.",
          "strokes": [
            5,
            6,
            7,
            8,
            9
          ]
        },
        {
          "label": "八",
          "name": "bottom pair",
          "role": "Visual component",
          "description": "The final two strokes spread outward at the bottom.",
          "strokes": [
            10,
            11
          ]
        }
      ],
      "example": {
        "text": "黃色",
        "pinyin": "huángsè",
        "meaning": "yellow"
      }
    },
    "色": {
      "hanzi": "色",
      "pinyin": "sè",
      "zhuyin": "ㄙㄜˋ",
      "meaning": "color",
      "strokes": 6,
      "layout": "stack",
      "note": "色 is fourth-tone sè and means color. It combines with a color word, as in 黃色.",
      "memory": "The two-stroke top sits over the four-stroke 巴-shaped lower part.",
      "parts": [
        {
          "label": "⺈",
          "name": "top component",
          "role": "Visual component",
          "description": "The first two strokes form the small top component.",
          "strokes": [
            0,
            1
          ]
        },
        {
          "label": "巴",
          "name": "lower component",
          "role": "Visual component",
          "description": "The final four strokes form the 巴-shaped lower part.",
          "strokes": [
            2,
            3,
            4,
            5
          ]
        }
      ],
      "example": {
        "text": "黃色",
        "pinyin": "huángsè",
        "meaning": "yellow"
      }
    },
    "芒": {
      "hanzi": "芒",
      "pinyin": "máng",
      "zhuyin": "ㄇㄤˊ",
      "meaning": "awn; first character of 芒果",
      "strokes": 6,
      "layout": "stack",
      "note": "芒 is second-tone máng. In this course it is learned mainly as the first character of 芒果, mango.",
      "memory": "The three-stroke grass top 艹 sits above the three-stroke 亡 below.",
      "parts": [
        {
          "label": "艹",
          "name": "grass top",
          "role": "Semantic component",
          "description": "The first three strokes form 艹, the grass/plant component at the top.",
          "strokes": [
            0,
            1,
            2
          ]
        },
        {
          "label": "亡",
          "name": "lower component",
          "role": "Visual component",
          "description": "The last three strokes form 亡 beneath the grass top.",
          "strokes": [
            3,
            4,
            5
          ]
        }
      ],
      "example": {
        "text": "芒果",
        "pinyin": "mángguǒ",
        "meaning": "mango"
      }
    },
    "給": {
      "hanzi": "給",
      "pinyin": "gěi",
      "zhuyin": "ㄍㄟˇ",
      "meaning": "to give",
      "strokes": 12,
      "layout": "side",
      "note": "給 is third-tone gěi when it means “to give.” Keep the left 糹 narrow so 合 has room on the right.",
      "memory": "The silk component 糹 takes the first six strokes on the left; 合 takes the final six on the right.",
      "parts": [
        {
          "label": "糹",
          "name": "silk component",
          "role": "Semantic component",
          "description": "The first six strokes form 糹 on the left.",
          "strokes": [
            0,
            1,
            2,
            3,
            4,
            5
          ]
        },
        {
          "label": "合",
          "name": "right component",
          "role": "Sound/visual component",
          "description": "The final six strokes form 合 on the right.",
          "strokes": [
            6,
            7,
            8,
            9,
            10,
            11
          ]
        }
      ],
      "example": {
        "text": "給你一塊芒果",
        "pinyin": "gěi nǐ yí kuài mángguǒ",
        "meaning": "give you a piece of mango"
      }
    },
    "香": {
      "hanzi": "香",
      "pinyin": "xiāng",
      "zhuyin": "ㄒㄧㄤ",
      "meaning": "fragrant",
      "strokes": 9,
      "layout": "stack",
      "note": "香 is first-tone xiāng and describes a pleasant smell.",
      "memory": "禾 forms the five-stroke top; 日 forms the four-stroke block below.",
      "parts": [
        {
          "label": "禾",
          "name": "grain component",
          "role": "Visual component",
          "description": "The first five strokes form 禾 at the top.",
          "strokes": [
            0,
            1,
            2,
            3,
            4
          ]
        },
        {
          "label": "日",
          "name": "sun block",
          "role": "Visual component",
          "description": "The final four strokes form 日 below.",
          "strokes": [
            5,
            6,
            7,
            8
          ]
        }
      ],
      "example": {
        "text": "這個芒果很香",
        "pinyin": "zhè ge mángguǒ hěn xiāng",
        "meaning": "this mango smells very fragrant"
      }
    },
    "瓜": {
      "hanzi": "瓜",
      "pinyin": "guā",
      "zhuyin": "ㄍㄨㄚ",
      "meaning": "melon; gourd",
      "strokes": 5,
      "layout": "whole",
      "note": "瓜 is first-tone guā. In 西瓜 it means melon and completes the word “watermelon.”",
      "memory": "Start with the upper-left strokes, tuck the small turn-and-dot into the middle, and finish with the long right sweep.",
      "parts": [
        {
          "label": "upper-left",
          "name": "upper-left strokes",
          "role": "Visual grouping",
          "description": "The first two strokes establish the top and left side of 瓜.",
          "strokes": [
            0,
            1
          ]
        },
        {
          "label": "middle",
          "name": "middle turn and dot",
          "role": "Visual grouping",
          "description": "The third and fourth strokes form the small central turn-and-dot detail.",
          "strokes": [
            2,
            3
          ]
        },
        {
          "label": "㇏",
          "name": "right sweep",
          "role": "Visual grouping",
          "description": "The final stroke is the long falling sweep on the right.",
          "strokes": [
            4
          ]
        }
      ],
      "example": {
        "text": "西瓜",
        "pinyin": "xīguā",
        "meaning": "watermelon"
      }
    }
  },
  "grammarRules": {
    "u29-calendar-date": {
      "id": "u29-calendar-date",
      "title": "Say a month and date",
      "pattern": "Number + 月 + Number + 號 / 日",
      "explanation": "A month is formed with a number plus 月. A spoken day of the month commonly uses a number plus 號; the textbook also lists 日 as a written date form. The whole date functions as a Time-When expression and therefore comes before the action.",
      "examples": [
        {
          "text": "我女朋友九月三十號要來看我。",
          "pinyin": "Wǒ nǚpéngyou jiǔyuè sānshí hào yào lái kàn wǒ.",
          "meaning": "My girlfriend is coming to see me on September 30."
        },
        {
          "text": "我九月三十號回國。",
          "pinyin": "Wǒ jiǔyuè sānshí hào huíguó.",
          "meaning": "I return to my country on September 30."
        }
      ],
      "remember": "Month first, then day: 九月三十號. Put the complete date before the action.",
      "words": [
        "月",
        "號",
        "日"
      ]
    },
    "u29-yaoshi-jiu": {
      "id": "u29-yaoshi-jiu",
      "title": "Condition and consequence with 要是…就…",
      "pattern": "要是 + Condition，(Subject) + 就 + Consequence  /  Subject + 要是 + Condition，Subject + 就 + Consequence",
      "explanation": "要是 introduces the condition. 就 stands at the beginning of the predicate in the consequence clause. The subject can come before 要是 or after it. The condition or consequence may be negative; keep 就 in the consequence clause.",
      "examples": [
        {
          "text": "要是我有空，我就跟你一起去。",
          "pinyin": "Yàoshi wǒ yǒu kòng, wǒ jiù gēn nǐ yìqǐ qù.",
          "meaning": "If I am free, then I will go with you."
        },
        {
          "text": "你要是沒空，我們就不去夜市。",
          "pinyin": "Nǐ yàoshi méi kòng, wǒmen jiù bú qù yèshì.",
          "meaning": "If you are not free, then we will not go to the night market."
        }
      ],
      "remember": "要是 marks the if-clause; 就 marks what follows from it.",
      "words": [
        "要是",
        "就"
      ]
    },
    "u29-vv-kan": {
      "id": "u29-vv-kan",
      "title": "Try it and see with VV看",
      "pattern": "V + V + 看",
      "explanation": "For a one-syllable action verb, repeat the verb and add 看 to make a tentative “try doing it and see” expression. The pattern has a light, exploratory tone. In the Lesson 10 pattern, an object normally does not follow 看 directly, so say 吃吃看 rather than *吃吃看芒果.",
      "examples": [
        {
          "text": "這個芒果很好吃，你吃吃看。",
          "pinyin": "Zhè ge mángguǒ hěn hǎochī, nǐ chīchīkàn.",
          "meaning": "This mango tastes good. Try it."
        },
        {
          "text": "這杯茶很香，你喝喝看。",
          "pinyin": "Zhè bēi chá hěn xiāng, nǐ hēhēkàn.",
          "meaning": "This tea smells good. Try drinking it."
        }
      ],
      "remember": "One-syllable action verb: repeat it, then add 看. Use it to suggest trying an action and seeing the result.",
      "words": [
        "吃吃看"
      ]
    }
  },
  "grammarIntroductions": [
    {
      "id": "u29-calendar-date",
      "kind": "rule",
      "ref": "u29-calendar-date",
      "lessonId": "u29-date",
      "stepId": "u29-date-g1"
    },
    {
      "id": "u29-yaoshi-jiu",
      "kind": "rule",
      "ref": "u29-yaoshi-jiu",
      "lessonId": "u29-condition",
      "stepId": "u29-condition-g1"
    },
    {
      "id": "u29-vv-kan",
      "kind": "rule",
      "ref": "u29-vv-kan",
      "lessonId": "u29-negative",
      "stepId": "u29-negative-vvkan-g1"
    }
  ],
  "reviewGrammar": [
    "u26-time-when",
    "u27-yinggai"
  ],
  "phrases": {
    "u29-date": {
      "text": "我女朋友九月三十號要來看我。",
      "pinyin": "Wǒ nǚpéngyou jiǔyuè sānshí hào yào lái kàn wǒ.",
      "meaning": "My girlfriend is coming to see me on September 30.",
      "note": "九月三十號 is a complete Time-When expression.",
      "tokens": [
        "我女朋友",
        "九月三十號",
        "要來看我"
      ],
      "grammarIds": [
        "u29-calendar-date"
      ]
    },
    "u29-return-date": {
      "text": "我九月三十號回國。",
      "pinyin": "Wǒ jiǔyuè sānshí hào huíguó.",
      "meaning": "I return to my country on September 30.",
      "note": "The date comes before 回國.",
      "tokens": [
        "我",
        "九月三十號",
        "回國"
      ],
      "grammarIds": [
        "u29-calendar-date"
      ]
    },
    "u29-still": {
      "text": "我還不知道。",
      "pinyin": "Wǒ hái bù zhīdào.",
      "meaning": "I still do not know.",
      "note": "還 means still in this sentence.",
      "tokens": [
        "我",
        "還",
        "不知道"
      ]
    },
    "u29-additional": {
      "text": "這裡還有茶館。",
      "pinyin": "Zhèlǐ hái yǒu cháguǎn.",
      "meaning": "There are also tea houses here.",
      "note": "還 can also add another item: also / in addition.",
      "tokens": [
        "這裡",
        "還有",
        "茶館"
      ]
    },
    "u29-maokong": {
      "text": "貓空的風景很美。",
      "pinyin": "Māokōng de fēngjǐng hěn měi.",
      "meaning": "The scenery in Maokong is beautiful.",
      "note": "貓空 is the Taipei place name from Lesson 9 Dialogue II.",
      "tokens": [
        "貓空的風景",
        "很美"
      ]
    },
    "u29-if-free": {
      "text": "要是我有空，我就跟你一起去。",
      "pinyin": "Yàoshi wǒ yǒu kòng, wǒ jiù gēn nǐ yìqǐ qù.",
      "meaning": "If I am free, then I will go with you.",
      "note": "要是 presents the condition and 就 presents the consequence.",
      "tokens": [
        "要是我有空",
        "我就跟你一起去"
      ],
      "grammarIds": [
        "u29-yaoshi-jiu"
      ]
    },
    "u29-if-not-free": {
      "text": "你要是沒空，我們就不去夜市。",
      "pinyin": "Nǐ yàoshi méi kòng, wǒmen jiù bú qù yèshì.",
      "meaning": "If you are not free, then we will not go to the night market.",
      "note": "The condition is negative, and 就 still introduces the consequence.",
      "tokens": [
        "你要是沒空",
        "我們就不去夜市"
      ],
      "grammarIds": [
        "u29-yaoshi-jiu"
      ]
    },
    "u29-fruit": {
      "text": "這個水果很好吃。",
      "pinyin": "Zhè ge shuǐguǒ hěn hǎochī.",
      "meaning": "This fruit tastes good.",
      "note": "水果 is the general word for fruit.",
      "tokens": [
        "這個水果",
        "很好吃"
      ]
    },
    "u29-yellow-fruit": {
      "text": "這個黃色的水果叫什麼？",
      "pinyin": "Zhè ge huángsè de shuǐguǒ jiào shénme?",
      "meaning": "What is this yellow fruit called?",
      "note": "黃色 modifies 水果 with 的.",
      "tokens": [
        "這個",
        "黃色的水果",
        "叫什麼"
      ]
    },
    "u29-give-mango": {
      "text": "給你一塊芒果。",
      "pinyin": "Gěi nǐ yí kuài mángguǒ.",
      "meaning": "Here, have a piece of mango.",
      "note": "給 means give. 塊 is reused here in its Lesson 10 sense as a measure word for a piece of food, rather than its earlier price/dollar use.",
      "tokens": [
        "給你",
        "一塊芒果"
      ]
    },
    "u29-fragrant-sweet": {
      "text": "這個芒果很香，也很甜。",
      "pinyin": "Zhè ge mángguǒ hěn xiāng, yě hěn tián.",
      "meaning": "This mango is fragrant and also sweet.",
      "note": "香 describes smell; 甜 describes taste. This sentence uses ordinary 很, not the later reduplicated-state-verb pattern.",
      "tokens": [
        "這個芒果",
        "很香",
        "也很甜"
      ]
    },
    "u29-watermelon": {
      "text": "我喜歡吃西瓜。",
      "pinyin": "Wǒ xǐhuan chī xīguā.",
      "meaning": "I like eating watermelon.",
      "note": "西瓜 means watermelon.",
      "tokens": [
        "我",
        "喜歡吃",
        "西瓜"
      ]
    },
    "u29-correct": {
      "text": "對，這是西瓜。",
      "pinyin": "Duì, zhè shì xīguā.",
      "meaning": "Right, this is watermelon.",
      "note": "對 is a state verb meaning correct/right and is also used as a conversational confirmation.",
      "tokens": [
        "對",
        "這是西瓜"
      ]
    },
    "u29-before": {
      "text": "我以前不喜歡吃水果。",
      "pinyin": "Wǒ yǐqián bù xǐhuan chī shuǐguǒ.",
      "meaning": "I did not like eating fruit before.",
      "note": "以前 places the state in an earlier period: before / in the past.",
      "tokens": [
        "我以前",
        "不喜歡吃水果"
      ]
    },
    "u29-opportunity": {
      "text": "要是有機會，我就去旅行。",
      "pinyin": "Yàoshi yǒu jīhuì, wǒ jiù qù lǚxíng.",
      "meaning": "If I get the chance, then I will travel.",
      "note": "機會 means an opportunity or chance. The sentence reuses the 要是…就… pattern already taught in this lesson.",
      "tokens": [
        "要是有機會",
        "我就去旅行"
      ],
      "grammarIds": [
        "u29-yaoshi-jiu"
      ]
    },
    "u29-try-mango": {
      "text": "這個芒果很好吃，你吃吃看。",
      "pinyin": "Zhè ge mángguǒ hěn hǎochī, nǐ chīchīkàn.",
      "meaning": "This mango tastes good. Try it.",
      "note": "吃吃看 is 吃 + 吃 + 看: try tasting it and see.",
      "tokens": [
        "這個芒果很好吃",
        "你吃吃看"
      ],
      "grammarIds": [
        "u29-vv-kan"
      ]
    },
    "u29-if-chance-try": {
      "text": "要是有機會，我就吃吃看。",
      "pinyin": "Yàoshi yǒu jīhuì, wǒ jiù chīchīkàn.",
      "meaning": "If I get the chance, then I'll try it.",
      "note": "This combines Lesson 9 要是…就… with Lesson 10 VV看.",
      "tokens": [
        "要是有機會",
        "我就吃吃看"
      ],
      "grammarIds": [
        "u29-yaoshi-jiu",
        "u29-vv-kan"
      ]
    }
  },
  "revisionStepIds": []
};
export default unit;
