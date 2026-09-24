import type {UnitData} from '../schema.ts';

const unit:UnitData = {
  "schemaVersion": 1,
  "bookId": "book-1",
  "order": 38,
  "unit": {
    "id": "unit-38",
    "number": 38,
    "theme": "cyan",
    "bookReference": "Lesson 13 Dialogue I tail (turns 7–14), remaining Vocabulary I / Name / Phrases, and Grammar I 一…就….",
    "label": "Language exchange, politeness & meeting plans",
    "title": "I'll See You After Class",
    "description": "Finish the birthday phone call: language exchange, politeness, birthday plans, meeting arrangements, and 一…就….",
    "chars": [
      "交",
      "換",
      "牙",
      "必",
      "氣",
      "門",
      "口"
    ],
    "lessonIds": [
      "u38-exchange",
      "u38-enthusiastic",
      "u38-polite",
      "u38-celebrate",
      "u38-as-soon",
      "u38-meet",
      "u38-review"
    ],
    "banner": {
      "text": "一下課，就去找你",
      "pinyin": "Yí xiàkè, jiù qù zhǎo nǐ"
    },
    "goal": {
      "text": "明天我一下課，就去你們學校找你。",
      "pinyin": "Míngtiān wǒ yí xiàkè, jiù qù nǐmen xuéxiào zhǎo nǐ.",
      "meaning": "Tomorrow, as soon as class ends, I'll go to your school to find you."
    },
    "grammarIds": [
      "u38-yi-jiu"
    ]
  },
  "reviewLessonId": "u38-review",
  "lessons": [
    {
      "id": "u38-exchange",
      "title": "Language Exchange",
      "subtitle": "Learn 語言 and 交換.",
      "chars": [
        "交",
        "換"
      ],
      "minutes": "11–14 min",
      "unitId": "unit-38",
      "review": false,
      "steps": [
        {
          "id": "u38-exchange-交-intro",
          "type": "intro",
          "char": "交"
        },
        {
          "id": "u38-exchange-交-trace",
          "type": "trace",
          "char": "交"
        },
        {
          "id": "u38-exchange-交-build",
          "type": "build",
          "char": "交"
        },
        {
          "id": "u38-exchange-交-complete",
          "type": "complete",
          "char": "交"
        },
        {
          "id": "u38-exchange-交-memory",
          "type": "memory",
          "char": "交"
        },
        {
          "id": "u38-exchange-換-intro",
          "type": "intro",
          "char": "換"
        },
        {
          "id": "u38-exchange-換-trace",
          "type": "trace",
          "char": "換"
        },
        {
          "id": "u38-exchange-換-build",
          "type": "build",
          "char": "換"
        },
        {
          "id": "u38-exchange-換-complete",
          "type": "complete",
          "char": "換"
        },
        {
          "id": "u38-exchange-換-memory",
          "type": "memory",
          "char": "換"
        },
        {
          "id": "u38-exchange-s1",
          "type": "select",
          "prompt": "語言 means…",
          "options": [
            "language",
            "exchange",
            "Spain"
          ],
          "answer": "language",
          "explanation": "語言 means language."
        },
        {
          "id": "u38-exchange-s2",
          "type": "select",
          "prompt": "交換 means…",
          "options": [
            "exchange",
            "remember",
            "wait"
          ],
          "answer": "exchange",
          "explanation": "交換 means exchange."
        },
        {
          "id": "u38-exchange-p1",
          "type": "phrase",
          "phrase": "u38-exchange-source"
        },
        {
          "id": "u38-exchange-o1",
          "type": "order",
          "phrase": "u38-exchange-source",
          "tokens": [
            "語言交換的時候",
            "你那麼熱心",
            "教我西班牙文"
          ]
        }
      ]
    },
    {
      "id": "u38-enthusiastic",
      "title": "So Enthusiastic",
      "subtitle": "Learn 熱心, 西班牙文, and the degree use of 那麼.",
      "chars": [
        "牙"
      ],
      "minutes": "10–13 min",
      "unitId": "unit-38",
      "review": false,
      "steps": [
        {
          "id": "u38-enthusiastic-牙-intro",
          "type": "intro",
          "char": "牙"
        },
        {
          "id": "u38-enthusiastic-牙-trace",
          "type": "trace",
          "char": "牙"
        },
        {
          "id": "u38-enthusiastic-牙-build",
          "type": "build",
          "char": "牙"
        },
        {
          "id": "u38-enthusiastic-牙-complete",
          "type": "complete",
          "char": "牙"
        },
        {
          "id": "u38-enthusiastic-牙-memory",
          "type": "memory",
          "char": "牙"
        },
        {
          "id": "u38-enthusiastic-s1",
          "type": "select",
          "prompt": "熱心 means…",
          "options": [
            "enthusiastic; warm-hearted",
            "approximately",
            "traditional"
          ],
          "answer": "enthusiastic; warm-hearted",
          "explanation": "熱心 describes enthusiasm/helpfulness."
        },
        {
          "id": "u38-enthusiastic-s2",
          "type": "select",
          "prompt": "西班牙文 means…",
          "options": [
            "Spanish language",
            "Spain only",
            "Chinese language"
          ],
          "answer": "Spanish language",
          "explanation": "西班牙文 is Spanish."
        },
        {
          "id": "u38-enthusiastic-s3",
          "type": "select",
          "prompt": "In 你那麼熱心, 那麼 means…",
          "options": [
            "so / that (degree)",
            "then / in that case",
            "approximately"
          ],
          "answer": "so / that (degree)",
          "explanation": "This is the degree use; Unit 36 used 那麼 as 'then/in that case'."
        },
        {
          "id": "u38-enthusiastic-l1",
          "type": "listen",
          "char": "牙",
          "audioText": "你那麼熱心教我西班牙文。",
          "prompt": "Listen for the language name.",
          "options": [
            "西班牙文",
            "中文",
            "英文"
          ],
          "answer": "西班牙文",
          "explanation": "The source says 西班牙文."
        }
      ]
    },
    {
      "id": "u38-polite",
      "title": "No Need to Be So Polite",
      "subtitle": "Learn 一樣 and the source politeness expressions.",
      "chars": [
        "必",
        "氣"
      ],
      "minutes": "11–14 min",
      "unitId": "unit-38",
      "review": false,
      "steps": [
        {
          "id": "u38-polite-必-intro",
          "type": "intro",
          "char": "必"
        },
        {
          "id": "u38-polite-必-trace",
          "type": "trace",
          "char": "必"
        },
        {
          "id": "u38-polite-必-build",
          "type": "build",
          "char": "必"
        },
        {
          "id": "u38-polite-必-complete",
          "type": "complete",
          "char": "必"
        },
        {
          "id": "u38-polite-必-memory",
          "type": "memory",
          "char": "必"
        },
        {
          "id": "u38-polite-氣-intro",
          "type": "intro",
          "char": "氣"
        },
        {
          "id": "u38-polite-氣-trace",
          "type": "trace",
          "char": "氣"
        },
        {
          "id": "u38-polite-氣-build",
          "type": "build",
          "char": "氣"
        },
        {
          "id": "u38-polite-氣-complete",
          "type": "complete",
          "char": "氣"
        },
        {
          "id": "u38-polite-氣-memory",
          "type": "memory",
          "char": "氣"
        },
        {
          "id": "u38-polite-p1",
          "type": "phrase",
          "phrase": "u38-polite-source"
        },
        {
          "id": "u38-polite-s1",
          "type": "select",
          "prompt": "不必客氣 is closest to…",
          "options": [
            "No need to be so polite / Don't mention it.",
            "Long time no see.",
            "Happy birthday."
          ],
          "answer": "No need to be so polite / Don't mention it.",
          "explanation": "It is a fixed politeness response."
        },
        {
          "id": "u38-polite-s2",
          "type": "select",
          "prompt": "太客氣 means…",
          "options": [
            "too polite / too kind",
            "very young",
            "too late"
          ],
          "answer": "too polite / too kind",
          "explanation": "太客氣 reacts to someone's courtesy."
        },
        {
          "id": "u38-polite-s3",
          "type": "select",
          "prompt": "一樣 means…",
          "options": [
            "same; alike",
            "different",
            "again"
          ],
          "answer": "same; alike",
          "explanation": "Unit 41 later expands this into 跟…一樣."
        },
        {
          "id": "u38-polite-p2",
          "type": "phrase",
          "phrase": "u38-too-polite"
        }
      ]
    },
    {
      "id": "u38-celebrate",
      "title": "Celebrate Your Birthday",
      "subtitle": "Use 過 with 生日.",
      "chars": [],
      "minutes": "8–11 min",
      "unitId": "unit-38",
      "review": false,
      "steps": [
        {
          "id": "u38-celebrate-p1",
          "type": "phrase",
          "phrase": "u38-birthday-invite"
        },
        {
          "id": "u38-celebrate-s1",
          "type": "select",
          "prompt": "In 過生日, 過 means…",
          "options": [
            "celebrate",
            "go past",
            "forget"
          ],
          "answer": "celebrate",
          "explanation": "Lesson 13 teaches 過生日 'celebrate a birthday'."
        },
        {
          "id": "u38-celebrate-s2",
          "type": "select",
          "prompt": "Which phrase means 'celebrate a birthday'?",
          "options": [
            "過生日",
            "回生日",
            "生日左右"
          ],
          "answer": "過生日",
          "explanation": "過生日 is the source combination."
        },
        {
          "id": "u38-celebrate-o1",
          "type": "order",
          "phrase": "u38-birthday-invite",
          "tokens": [
            "明天我想請你吃晚飯",
            "給你過生日"
          ]
        }
      ]
    },
    {
      "id": "u38-as-soon",
      "title": "As Soon As…",
      "subtitle": "Use 一…就… for an immediate sequence.",
      "chars": [],
      "minutes": "13–17 min",
      "unitId": "unit-38",
      "review": false,
      "steps": [
        {
          "id": "u38-as-soon-g1",
          "type": "grammar",
          "grammar": "u38-yi-jiu"
        },
        {
          "id": "u38-as-soon-p1",
          "type": "phrase",
          "phrase": "u38-as-soon-source"
        },
        {
          "id": "u38-as-soon-o1",
          "type": "order",
          "phrase": "u38-as-soon-source",
          "tokens": [
            "明天我一下課",
            "就去你們學校找你"
          ]
        },
        {
          "id": "u38-as-soon-p2",
          "type": "phrase",
          "phrase": "u38-negative-a"
        },
        {
          "id": "u38-as-soon-p3",
          "type": "phrase",
          "phrase": "u38-negative-b"
        },
        {
          "id": "u38-as-soon-s1",
          "type": "select",
          "prompt": "Which order is correct?",
          "options": [
            "Subject + 一 + Event A，(Subject) + 就 + Event B",
            "Subject + 就 + Event A，一 + Event B",
            "一 + Subject + 就 + Event A"
          ],
          "answer": "Subject + 一 + Event A，(Subject) + 就 + Event B",
          "explanation": "一 marks Event A; 就 marks Event B."
        },
        {
          "id": "u38-as-soon-s2",
          "type": "select",
          "prompt": "If the subject is the same in both events…",
          "options": [
            "the repeated second subject may be omitted",
            "就 must be omitted",
            "一 moves to the end"
          ],
          "answer": "the repeated second subject may be omitted",
          "explanation": "The source allows omission of the repeated subject."
        },
        {
          "id": "u38-as-soon-s3",
          "type": "select",
          "prompt": "Which statement is correct?",
          "options": [
            "Either Event A or Event B can be negative.",
            "Only Event B can be negative.",
            "Neither event can be negative."
          ],
          "answer": "Either Event A or Event B can be negative.",
          "explanation": "The source permits both."
        },
        {
          "id": "u38-as-soon-s4",
          "type": "select",
          "prompt": "How can the source form a yes/no question?",
          "options": [
            "Use 嗎 or 是不是.",
            "Use only ordinary A-not-A.",
            "Questions are impossible."
          ],
          "answer": "Use 嗎 or 是不是.",
          "explanation": "Both are source-valid; ordinary A-not-A is unavailable."
        }
      ]
    },
    {
      "id": "u38-meet",
      "title": "Around Five at the Gate",
      "subtitle": "Use 左右 after a time and 門口 for an entrance.",
      "chars": [
        "門",
        "口"
      ],
      "minutes": "12–15 min",
      "unitId": "unit-38",
      "review": false,
      "steps": [
        {
          "id": "u38-meet-門-intro",
          "type": "intro",
          "char": "門"
        },
        {
          "id": "u38-meet-門-trace",
          "type": "trace",
          "char": "門"
        },
        {
          "id": "u38-meet-門-build",
          "type": "build",
          "char": "門"
        },
        {
          "id": "u38-meet-門-complete",
          "type": "complete",
          "char": "門"
        },
        {
          "id": "u38-meet-門-memory",
          "type": "memory",
          "char": "門"
        },
        {
          "id": "u38-meet-口-intro",
          "type": "intro",
          "char": "口"
        },
        {
          "id": "u38-meet-口-trace",
          "type": "trace",
          "char": "口"
        },
        {
          "id": "u38-meet-口-build",
          "type": "build",
          "char": "口"
        },
        {
          "id": "u38-meet-口-complete",
          "type": "complete",
          "char": "口"
        },
        {
          "id": "u38-meet-口-memory",
          "type": "memory",
          "char": "口"
        },
        {
          "id": "u38-meet-p1",
          "type": "phrase",
          "phrase": "u38-meet-source"
        },
        {
          "id": "u38-meet-s1",
          "type": "select",
          "prompt": "Where does 左右 go in 五點左右?",
          "options": [
            "after the time/number",
            "before 五",
            "before the subject"
          ],
          "answer": "after the time/number",
          "explanation": "左右 follows the estimate."
        },
        {
          "id": "u38-meet-s2",
          "type": "select",
          "prompt": "門口 means…",
          "options": [
            "entrance; doorway",
            "classroom",
            "restaurant"
          ],
          "answer": "entrance; doorway",
          "explanation": "門口 is an entrance."
        },
        {
          "id": "u38-meet-p2",
          "type": "phrase",
          "phrase": "u38-gate-source"
        },
        {
          "id": "u38-meet-o1",
          "type": "order",
          "phrase": "u38-gate-source",
          "tokens": [
            "好",
            "我會在學校門口等你"
          ]
        },
        {
          "id": "u38-meet-s3",
          "type": "select",
          "prompt": "Which estimate is natural?",
          "options": [
            "五點左右",
            "左右五點",
            "五左右點"
          ],
          "answer": "五點左右",
          "explanation": "左右 follows the complete time expression."
        }
      ]
    },
    {
      "id": "u38-review",
      "title": "Unit 38 Review",
      "subtitle": "Retrieve the appointment vocabulary, seven new characters, and 一…就….",
      "chars": [
        "交",
        "換",
        "牙",
        "必",
        "氣",
        "門",
        "口"
      ],
      "minutes": "18–22 min",
      "unitId": "unit-38",
      "review": true,
      "steps": [
        {
          "id": "u38-review-l1",
          "type": "listen",
          "char": "交",
          "audioText": "語言交換的時候，你那麼熱心。",
          "prompt": "Listen for 'language exchange'.",
          "options": [
            "語言交換",
            "生日快樂",
            "門口"
          ],
          "answer": "語言交換",
          "explanation": "語言交換 means language exchange."
        },
        {
          "id": "u38-review-l2",
          "type": "listen",
          "char": "必",
          "audioText": "不必客氣。",
          "prompt": "Listen for the politeness expression.",
          "options": [
            "不必客氣",
            "太客氣",
            "好久不見"
          ],
          "answer": "不必客氣",
          "explanation": "The audio says 不必客氣."
        },
        {
          "id": "u38-review-l3",
          "type": "listen",
          "char": "門",
          "audioText": "我會在學校門口等你。",
          "prompt": "Listen for the meeting place.",
          "options": [
            "學校門口",
            "餐廳",
            "圖書館"
          ],
          "answer": "學校門口",
          "explanation": "The speaker waits at the school entrance."
        },
        {
          "id": "u38-review-c1",
          "type": "match",
          "chars": [
            "交",
            "換",
            "牙",
            "必",
            "氣",
            "門",
            "口"
          ]
        },
        {
          "id": "u38-review-c2",
          "type": "build",
          "char": "換"
        },
        {
          "id": "u38-review-c3",
          "type": "build",
          "char": "氣"
        },
        {
          "id": "u38-review-c4",
          "type": "build",
          "char": "口"
        },
        {
          "id": "u38-review-v1",
          "type": "select",
          "prompt": "熱心 means…",
          "options": [
            "enthusiastic; warm-hearted",
            "young",
            "most"
          ],
          "answer": "enthusiastic; warm-hearted",
          "explanation": "熱心 means enthusiastic/warm-hearted."
        },
        {
          "id": "u38-review-v2",
          "type": "select",
          "prompt": "西班牙文 means…",
          "options": [
            "Spanish language",
            "Spanish person",
            "Spain only"
          ],
          "answer": "Spanish language",
          "explanation": "西班牙文 is the language."
        },
        {
          "id": "u38-review-v3",
          "type": "select",
          "prompt": "一樣 means…",
          "options": [
            "same; alike",
            "different",
            "approximately"
          ],
          "answer": "same; alike",
          "explanation": "Full comparison grammar comes later."
        },
        {
          "id": "u38-review-v4",
          "type": "select",
          "prompt": "In 過生日, 過 means…",
          "options": [
            "celebrate",
            "cross a road",
            "finish class"
          ],
          "answer": "celebrate",
          "explanation": "This is Lesson 13's first vocabulary sense."
        },
        {
          "id": "u38-review-v5",
          "type": "select",
          "prompt": "Which expression means 'You're too kind/polite'?",
          "options": [
            "太客氣",
            "不必客氣",
            "好久不見"
          ],
          "answer": "太客氣",
          "explanation": "太客氣 reacts to someone's kindness."
        },
        {
          "id": "u38-review-g1",
          "type": "select",
          "prompt": "What marks the first event in 一…就…?",
          "options": [
            "一",
            "就",
            "也"
          ],
          "answer": "一",
          "explanation": "一 precedes Event A."
        },
        {
          "id": "u38-review-g2",
          "type": "select",
          "prompt": "What marks the immediately following event?",
          "options": [
            "就",
            "一",
            "都"
          ],
          "answer": "就",
          "explanation": "就 precedes Event B."
        },
        {
          "id": "u38-review-g3",
          "type": "select",
          "prompt": "Which demonstrates negative Event A?",
          "options": [
            "那裡一沒人，我就回家。",
            "我一下課，就回來。",
            "五點左右。"
          ],
          "answer": "那裡一沒人，我就回家。",
          "explanation": "一沒人 is negative Event A."
        },
        {
          "id": "u38-review-g4",
          "type": "select",
          "prompt": "Which question statement is accurate?",
          "options": [
            "The source allows 嗎 or 是不是; ordinary A-not-A is unavailable.",
            "Only A-not-A is possible.",
            "Questions cannot use 嗎."
          ],
          "answer": "The source allows 嗎 or 是不是; ordinary A-not-A is unavailable.",
          "explanation": "Both source-valid question strategies remain valid."
        },
        {
          "id": "u38-review-d1",
          "type": "order",
          "phrase": "u38-meet-source",
          "tokens": [
            "大概幾點",
            "五點左右"
          ]
        },
        {
          "id": "u38-review-d2",
          "type": "order",
          "phrase": "u38-gate-source",
          "tokens": [
            "好",
            "我會在學校門口等你"
          ]
        },
        {
          "id": "u38-review-t1",
          "type": "select",
          "prompt": "Class ends and you immediately go meet a friend. Which fits?",
          "options": [
            "我一下課，就去找朋友。",
            "我下課左右找朋友。",
            "我下課也一樣。"
          ],
          "answer": "我一下課，就去找朋友。",
          "explanation": "一…就… expresses immediate sequence."
        },
        {
          "id": "u38-review-t2",
          "type": "select",
          "prompt": "How do you say 'around five'?",
          "options": [
            "五點左右",
            "左右五點",
            "五點交換"
          ],
          "answer": "五點左右",
          "explanation": "左右 follows the time."
        }
      ]
    }
  ],
  "newVocabulary": [
    {
      "text": "語言",
      "pinyin": "yǔyán",
      "meaning": "language",
      "lessonId": "u38-exchange",
      "core": true,
      "note": "First standalone ownership; builds on earlier 語言中心."
    },
    {
      "text": "交換",
      "pinyin": "jiāohuàn",
      "meaning": "exchange",
      "lessonId": "u38-exchange",
      "core": true
    },
    {
      "text": "熱心",
      "pinyin": "rèxīn",
      "meaning": "enthusiastic; warm-hearted",
      "lessonId": "u38-enthusiastic",
      "core": true
    },
    {
      "text": "西班牙文",
      "pinyin": "Xībānyá wén",
      "meaning": "Spanish language",
      "lessonId": "u38-enthusiastic",
      "core": true
    },
    {
      "text": "一樣",
      "pinyin": "yíyàng",
      "meaning": "same; alike",
      "lessonId": "u38-polite",
      "core": true,
      "note": "Lexical use first; full comparison comes in Unit 41."
    },
    {
      "text": "不必客氣",
      "pinyin": "búbì kèqi",
      "meaning": "no need to be so polite; don't mention it",
      "lessonId": "u38-polite",
      "core": true
    },
    {
      "text": "太客氣",
      "pinyin": "tài kèqi",
      "meaning": "too polite; very kind of you",
      "lessonId": "u38-polite",
      "core": true
    },
    {
      "text": "過",
      "pinyin": "guò",
      "meaning": "celebrate (a birthday)",
      "lessonId": "u38-celebrate",
      "core": true,
      "note": "Book 2 later teaches the movement sense."
    },
    {
      "text": "左右",
      "pinyin": "zuǒyòu",
      "meaning": "approximately; around",
      "lessonId": "u38-meet",
      "core": true
    },
    {
      "text": "門口",
      "pinyin": "ménkǒu",
      "meaning": "entrance; doorway; gate",
      "lessonId": "u38-meet",
      "core": true
    }
  ],
  "reviewVocabulary": [
    "那麼"
  ],
  "newCharacters": [
    "交",
    "換",
    "牙",
    "必",
    "氣",
    "門",
    "口"
  ],
  "reviewCharacters": [
    "過"
  ],
  "characters": {
    "交": {
      "hanzi": "交",
      "pinyin": "jiāo",
      "zhuyin": "ㄐㄧㄠ",
      "meaning": "exchange; hand over",
      "strokes": 6,
      "note": "交 is learned in Unit 38 through 交換.",
      "memory": "Practice 交 as a complete Traditional character and connect it to 交換.",
      "parts": [
        {
          "label": "交",
          "name": "交 whole form",
          "role": "Whole character",
          "description": "Write all 6 strokes in standard order.",
          "strokes": [
            0,
            1,
            2,
            3,
            4,
            5
          ]
        }
      ],
      "layout": "single",
      "example": {
        "text": "交換",
        "pinyin": "jiāohuàn",
        "meaning": "exchange"
      }
    },
    "換": {
      "hanzi": "換",
      "pinyin": "huàn",
      "zhuyin": "ㄏㄨㄢˋ",
      "meaning": "exchange; change",
      "strokes": 12,
      "note": "換 is learned in Unit 38 through 交換.",
      "memory": "Practice 換 as a complete Traditional character and connect it to 交換.",
      "parts": [
        {
          "label": "換",
          "name": "換 whole form",
          "role": "Whole character",
          "description": "Write all 12 strokes in standard order.",
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
        }
      ],
      "layout": "single",
      "example": {
        "text": "交換",
        "pinyin": "jiāohuàn",
        "meaning": "exchange"
      }
    },
    "牙": {
      "hanzi": "牙",
      "pinyin": "yá",
      "zhuyin": "ㄧㄚˊ",
      "meaning": "tooth; character in Spanish",
      "strokes": 4,
      "note": "牙 is learned in Unit 38 through 西班牙文.",
      "memory": "Practice 牙 as a complete Traditional character and connect it to 西班牙文.",
      "parts": [
        {
          "label": "牙",
          "name": "牙 whole form",
          "role": "Whole character",
          "description": "Write all 4 strokes in standard order.",
          "strokes": [
            0,
            1,
            2,
            3
          ]
        }
      ],
      "layout": "single",
      "example": {
        "text": "西班牙文",
        "pinyin": "Xībānyá wén",
        "meaning": "Spanish language"
      }
    },
    "必": {
      "hanzi": "必",
      "pinyin": "bì",
      "zhuyin": "ㄅㄧˋ",
      "meaning": "must; component of 不必",
      "strokes": 5,
      "note": "必 is learned in Unit 38 through 不必客氣.",
      "memory": "Practice 必 as a complete Traditional character and connect it to 不必客氣.",
      "parts": [
        {
          "label": "必",
          "name": "必 whole form",
          "role": "Whole character",
          "description": "Write all 5 strokes in standard order.",
          "strokes": [
            0,
            1,
            2,
            3,
            4
          ]
        }
      ],
      "layout": "single",
      "example": {
        "text": "不必客氣",
        "pinyin": "búbì kèqi",
        "meaning": "no need to be so polite"
      }
    },
    "氣": {
      "hanzi": "氣",
      "pinyin": "qì",
      "zhuyin": "ㄑㄧˋ",
      "meaning": "air; manner; component of 客氣",
      "strokes": 10,
      "note": "氣 is learned in Unit 38 through 客氣.",
      "memory": "Practice 氣 as a complete Traditional character and connect it to 客氣.",
      "parts": [
        {
          "label": "氣",
          "name": "氣 whole form",
          "role": "Whole character",
          "description": "Write all 10 strokes in standard order.",
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
            9
          ]
        }
      ],
      "layout": "single",
      "example": {
        "text": "客氣",
        "pinyin": "kèqi",
        "meaning": "polite; courteous"
      }
    },
    "門": {
      "hanzi": "門",
      "pinyin": "mén",
      "zhuyin": "ㄇㄣˊ",
      "meaning": "door; gate",
      "strokes": 8,
      "note": "門 is learned in Unit 38 through 門口.",
      "memory": "Practice 門 as a complete Traditional character and connect it to 門口.",
      "parts": [
        {
          "label": "門",
          "name": "門 whole form",
          "role": "Whole character",
          "description": "Write all 8 strokes in standard order.",
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
      "layout": "single",
      "example": {
        "text": "門口",
        "pinyin": "ménkǒu",
        "meaning": "entrance"
      }
    },
    "口": {
      "hanzi": "口",
      "pinyin": "kǒu",
      "zhuyin": "ㄎㄡˇ",
      "meaning": "mouth; opening",
      "strokes": 3,
      "note": "口 is learned in Unit 38 through 門口.",
      "memory": "Practice 口 as a complete Traditional character and connect it to 門口.",
      "parts": [
        {
          "label": "口",
          "name": "口 whole form",
          "role": "Whole character",
          "description": "Write all 3 strokes in standard order.",
          "strokes": [
            0,
            1,
            2
          ]
        }
      ],
      "layout": "single",
      "example": {
        "text": "門口",
        "pinyin": "ménkǒu",
        "meaning": "entrance"
      }
    }
  },
  "grammarRules": {
    "u38-yi-jiu": {
      "id": "u38-yi-jiu",
      "title": "As soon as… with 一…就…",
      "pattern": "Subject + 一 + Event A，(Subject) + 就 + Event B",
      "explanation": "一…就… links two events when Event B follows Event A immediately. 一 comes before Event A and 就 before Event B; both follow the subject. If the subject is the same, the repeated subject may be omitted. Either event can be affirmative or negative. The textbook does not use ordinary A-not-A inside this construction; yes/no questions can use 嗎 or 是不是. Both question strategies are source-valid.",
      "examples": [
        {
          "text": "我一下課，就回來。",
          "pinyin": "Wǒ yí xiàkè, jiù huílái.",
          "meaning": "As soon as class ends, I come back."
        },
        {
          "text": "那裡一沒人，我就回家。",
          "pinyin": "Nàlǐ yì méi rén, wǒ jiù huí jiā.",
          "meaning": "As soon as nobody is there, I go home."
        },
        {
          "text": "老闆今天早上一到公司，就不開心。",
          "pinyin": "Lǎobǎn jīntiān zǎoshang yí dào gōngsī, jiù bù kāixīn.",
          "meaning": "As soon as the boss got to the company this morning, he was unhappy."
        }
      ],
      "remember": "一 before Event A; 就 before the immediate Event B. Same subject may be omitted. Either event may be negative; ask with 嗎 or 是不是, not ordinary A-not-A."
    }
  },
  "grammarIntroductions": [
    {
      "id": "u38-yi-jiu",
      "kind": "rule",
      "ref": "u38-yi-jiu",
      "lessonId": "u38-as-soon",
      "stepId": "u38-as-soon-g1"
    }
  ],
  "reviewGrammar": [],
  "phrases": {
    "u38-exchange-source": {
      "text": "語言交換的時候，你那麼熱心教我西班牙文。",
      "pinyin": "Yǔyán jiāohuàn de shíhou, nǐ nàme rèxīn jiāo wǒ Xībānyá wén.",
      "meaning": "During language exchange, you were so enthusiastic about teaching me Spanish.",
      "note": "Source Dialogue I turn 7 with the name omitted.",
      "tokens": [
        "語言交換的時候",
        "你那麼熱心",
        "教我西班牙文"
      ]
    },
    "u38-polite-source": {
      "text": "不必客氣，你也一樣。",
      "pinyin": "Búbì kèqi, nǐ yě yíyàng.",
      "meaning": "No need to be so polite; you are the same.",
      "note": "Source turn 8 with 妳 normalized to 你.",
      "tokens": [
        "不必客氣",
        "你也一樣"
      ]
    },
    "u38-birthday-invite": {
      "text": "明天我想請你吃晚飯，給你過生日。",
      "pinyin": "Míngtiān wǒ xiǎng qǐng nǐ chī wǎnfàn, gěi nǐ guò shēngrì.",
      "meaning": "Tomorrow I'd like to treat you to dinner and celebrate your birthday.",
      "note": "Source turn 9.",
      "tokens": [
        "明天我想請你吃晚飯",
        "給你過生日"
      ]
    },
    "u38-too-polite": {
      "text": "你太客氣了！我們在哪裡見面呢？",
      "pinyin": "Nǐ tài kèqi le! Wǒmen zài nǎlǐ jiànmiàn ne?",
      "meaning": "You're too kind! Where shall we meet?",
      "note": "Source turn 10 with 妳 normalized to 你.",
      "tokens": [
        "你太客氣了",
        "我們在哪裡見面呢"
      ]
    },
    "u38-as-soon-source": {
      "text": "明天我一下課，就去你們學校找你。",
      "pinyin": "Míngtiān wǒ yí xiàkè, jiù qù nǐmen xuéxiào zhǎo nǐ.",
      "meaning": "Tomorrow, as soon as class ends, I'll go to your school to find you.",
      "note": "Source turn 11.",
      "tokens": [
        "明天我一下課",
        "就去你們學校找你"
      ],
      "grammarIds": [
        "u38-yi-jiu"
      ]
    },
    "u38-negative-a": {
      "text": "那裡一沒人，我就回家。",
      "pinyin": "Nàlǐ yì méi rén, wǒ jiù huí jiā.",
      "meaning": "As soon as nobody is there, I go home.",
      "note": "Learner-safe negative Event A example.",
      "tokens": [
        "那裡一沒人",
        "我就回家"
      ],
      "grammarIds": [
        "u38-yi-jiu"
      ]
    },
    "u38-negative-b": {
      "text": "老闆今天早上一到公司，就不開心。",
      "pinyin": "Lǎobǎn jīntiān zǎoshang yí dào gōngsī, jiù bù kāixīn.",
      "meaning": "As soon as the boss got to the company this morning, he was unhappy.",
      "note": "Negative Event B example.",
      "tokens": [
        "老闆今天早上一到公司",
        "就不開心"
      ],
      "grammarIds": [
        "u38-yi-jiu"
      ]
    },
    "u38-meet-source": {
      "text": "大概幾點？五點左右。",
      "pinyin": "Dàgài jǐ diǎn? Wǔ diǎn zuǒyòu.",
      "meaning": "About what time? Around five.",
      "note": "Source turns 12–13.",
      "tokens": [
        "大概幾點",
        "五點左右"
      ]
    },
    "u38-gate-source": {
      "text": "好，我會在學校門口等你。",
      "pinyin": "Hǎo, wǒ huì zài xuéxiào ménkǒu děng nǐ.",
      "meaning": "Okay, I'll wait for you at the school entrance.",
      "note": "Source turn 14 with 妳 normalized to 你.",
      "tokens": [
        "好",
        "我會在學校門口等你"
      ]
    }
  },
  "revisionStepIds": [
    "u38-exchange-p1",
    "u38-polite-p1",
    "u38-celebrate-p1",
    "u38-as-soon-s3",
    "u38-meet-p2",
    "u38-review-g4"
  ]
};
export default unit;
