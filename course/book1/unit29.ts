import type {UnitData} from '../schema.ts';

const unit:UnitData = {
  "schemaVersion": 1,
  "bookId": "book-1",
  "order": 29,
  "unit": {
    "id": "unit-29",
    "number": 29,
    "theme": "teal",
    "label": "Dates, additions & conditions",
    "title": "If I Have Time",
    "description": "Continue Lesson 9 Dialogue II with month/date language, 還, Maokong, and the full 要是…就… condition-consequence frame including negative conditions.",
    "chars": [
      "月",
      "號",
      "就",
      "貓"
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
      "text": "要是我有空，我就跟你一起去。",
      "pinyin": "Yàoshi wǒ yǒu kòng, wǒ jiù gēn nǐ yìqǐ qù."
    },
    "goal": {
      "text": "我女朋友九月三十號要來看我。",
      "pinyin": "Wǒ nǚpéngyou jiǔyuè sānshí hào yào lái kàn wǒ.",
      "meaning": "My girlfriend is coming to see me on September 30."
    },
    "grammarIds": [
      "u29-calendar-date",
      "u29-yaoshi-jiu"
    ],
    "bookReference": "A Course in Contemporary Chinese 1 · Lesson 9 Dialogue II / Vocabulary II and Grammar V, with the month/date portion of Grammar I (printed pp. 185–193). Covers 月, 號, 還, 貓空, 要是, 就 and both positive and negative condition-consequence patterns. 逛 and the proper name 臺東 remain explicitly deferred because the current verified Taiwan Traditional handwriting source does not provide acceptable geometry for those first-time characters."
  },
  "reviewLessonId": "u29-review",
  "lessons": [
    {
      "id": "u29-date",
      "title": "September 30",
      "subtitle": "Say months and dates the way Dialogue II does.",
      "chars": [
        "月",
        "號"
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
        }
      ]
    },
    {
      "id": "u29-hai",
      "title": "Still — and Also",
      "subtitle": "Use 還 for an unfinished state or an additional item.",
      "chars": [],
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
        }
      ]
    },
    {
      "id": "u29-maokong",
      "title": "A Place for Tea: Maokong",
      "subtitle": "Learn the Dialogue II place name without adding unrelated travel vocabulary.",
      "chars": [
        "貓"
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
        }
      ]
    },
    {
      "id": "u29-condition",
      "title": "If This, Then That",
      "subtitle": "Use 要是 to set a condition and 就 to mark the consequence.",
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
        }
      ]
    },
    {
      "id": "u29-negative",
      "title": "Negative Conditions and Consequences",
      "subtitle": "Keep the same frame when one side is negative.",
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
        }
      ]
    },
    {
      "id": "u29-integrate",
      "title": "Build the Dialogue II Logic",
      "subtitle": "Combine dates, 還, Maokong, suggestions, and conditions.",
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
        }
      ]
    },
    {
      "id": "u29-review",
      "title": "Unit 29 Review",
      "subtitle": "Dates, 還, Maokong, and 要是…就… in new combinations.",
      "chars": [],
      "minutes": "14–18 min",
      "unitId": "unit-29",
      "review": true,
      "steps": [
        {
          "id": "u29-review-01",
          "type": "listen",
          "char": "月",
          "options": [
            "月",
            "號",
            "貓",
            "就"
          ],
          "answer": "月",
          "explanation": "月 is yuè."
        },
        {
          "id": "u29-review-02",
          "type": "listen",
          "char": "號",
          "options": [
            "號",
            "月",
            "就",
            "貓"
          ],
          "answer": "號",
          "explanation": "號 is hào."
        },
        {
          "id": "u29-review-03",
          "type": "listen",
          "char": "就",
          "options": [
            "就",
            "貓",
            "號",
            "月"
          ],
          "answer": "就",
          "explanation": "就 is jiù."
        },
        {
          "id": "u29-review-04",
          "type": "select",
          "prompt": "Which expression means September 30?",
          "options": [
            "九月三十號",
            "三十月九號",
            "九年三十號"
          ],
          "answer": "九月三十號",
          "explanation": "Month precedes day.",
          "grammarIds": [
            "u29-calendar-date"
          ]
        },
        {
          "id": "u29-review-05",
          "type": "order",
          "phrase": "u29-date",
          "tokens": [
            "我女朋友",
            "九月三十號",
            "要來看我"
          ]
        },
        {
          "id": "u29-review-06",
          "type": "order",
          "phrase": "u29-return-date",
          "tokens": [
            "我",
            "九月三十號",
            "回國"
          ]
        },
        {
          "id": "u29-review-07",
          "type": "select",
          "prompt": "In 我還不知道, 還 means:",
          "options": [
            "still",
            "already",
            "only"
          ],
          "answer": "still",
          "explanation": "The state continues."
        },
        {
          "id": "u29-review-08",
          "type": "order",
          "phrase": "u29-still",
          "tokens": [
            "我",
            "還",
            "不知道"
          ]
        },
        {
          "id": "u29-review-09",
          "type": "select",
          "prompt": "In 這裡還有茶館, 還 means:",
          "options": [
            "also / in addition",
            "not yet",
            "than"
          ],
          "answer": "also / in addition",
          "explanation": "還有 adds another item."
        },
        {
          "id": "u29-review-10",
          "type": "select",
          "prompt": "Which place name is Maokong?",
          "options": [
            "貓空",
            "夜市",
            "茶館"
          ],
          "answer": "貓空",
          "explanation": "貓空 is the proper name."
        },
        {
          "id": "u29-review-11",
          "type": "order",
          "phrase": "u29-maokong",
          "tokens": [
            "貓空的風景",
            "很美"
          ]
        },
        {
          "id": "u29-review-12",
          "type": "select",
          "prompt": "Which word marks the condition?",
          "options": [
            "要是",
            "就",
            "還"
          ],
          "answer": "要是",
          "explanation": "要是 introduces the if-clause.",
          "grammarIds": [
            "u29-yaoshi-jiu"
          ]
        },
        {
          "id": "u29-review-13",
          "type": "select",
          "prompt": "Which word marks the consequence?",
          "options": [
            "就",
            "要是",
            "號"
          ],
          "answer": "就",
          "explanation": "就 introduces the result predicate.",
          "grammarIds": [
            "u29-yaoshi-jiu"
          ]
        },
        {
          "id": "u29-review-14",
          "type": "order",
          "phrase": "u29-if-free",
          "tokens": [
            "要是我有空",
            "我就跟你一起去"
          ]
        },
        {
          "id": "u29-review-15",
          "type": "order",
          "phrase": "u29-if-not-free",
          "tokens": [
            "你要是沒空",
            "我們就不去夜市"
          ]
        },
        {
          "id": "u29-review-16",
          "type": "select",
          "prompt": "Which sentence shows the subject before 要是?",
          "options": [
            "你要是沒空，我們就不去夜市。",
            "要是我有空，我就一起去。",
            "我還不知道。"
          ],
          "answer": "你要是沒空，我們就不去夜市。",
          "explanation": "Lesson 9 allows the subject before 要是.",
          "grammarIds": [
            "u29-yaoshi-jiu"
          ]
        },
        {
          "id": "u29-review-17",
          "type": "select",
          "prompt": "Which is a Time-When expression?",
          "options": [
            "九月三十號",
            "三個鐘頭",
            "兩天"
          ],
          "answer": "九月三十號",
          "explanation": "It identifies a calendar date.",
          "grammarIds": [
            "u29-calendar-date"
          ]
        },
        {
          "id": "u29-review-18",
          "type": "select",
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
          "explanation": "The condition can be negative without changing the 要是…就… frame.",
          "grammarIds": [
            "u29-yaoshi-jiu"
          ]
        },
        {
          "id": "u29-review-20",
          "type": "select",
          "prompt": "Which sentence uses 還 to add another item?",
          "options": [
            "這裡還有茶館。",
            "我還不知道。",
            "我九月三十號回國。"
          ],
          "answer": "這裡還有茶館。",
          "explanation": "還有 means there is/are also something else."
        }
      ]
    }
  ],
  "newVocabulary": [
    {
      "text": "月",
      "pinyin": "yuè",
      "meaning": "month of the year",
      "lessonId": "u29-date",
      "core": false
    },
    {
      "text": "號",
      "pinyin": "hào",
      "meaning": "date; numbered day of a month",
      "lessonId": "u29-date",
      "core": false
    },
    {
      "text": "還",
      "pinyin": "hái",
      "meaning": "still; additionally; also",
      "lessonId": "u29-hai",
      "core": false,
      "note": "The character was seen earlier in 還是; this is the first formal teaching of 還 as an independent adverb."
    },
    {
      "text": "貓空",
      "pinyin": "Māokōng",
      "meaning": "Maokong, a Taipei place known for tea and scenery",
      "lessonId": "u29-maokong",
      "core": false
    },
    {
      "text": "要是",
      "pinyin": "yàoshi",
      "meaning": "if",
      "lessonId": "u29-condition",
      "core": false
    },
    {
      "text": "就",
      "pinyin": "jiù",
      "meaning": "then; in that case",
      "lessonId": "u29-condition",
      "core": false
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
    "夜市"
  ],
  "newCharacters": [
    "月",
    "號",
    "就",
    "貓"
  ],
  "reviewCharacters": [],
  "characters": {
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
    }
  },
  "revisionStepIds": []
};
export default unit;
