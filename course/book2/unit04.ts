import type {UnitData} from '../schema.ts';

const unit:UnitData = {
  "schemaVersion": 1,
  "bookId": "book-2",
  "order": 4,
  "unit": {
    "id": "book-2-unit-4",
    "number": 4,
    "displayNumber": 4,
    "theme": "amber",
    "bookReference": "A Course in Contemporary Chinese, Book 2, Lesson 1, pp. 2–14",
    "label": "Distance and two actions",
    "title": "Near the Noodle Shop",
    "description": "Read the end of the trip, do two things at once, and describe distance.",
    "chars": [
      "餓",
      "離",
      "背",
      "正",
      "筆",
      "枝"
    ],
    "lessonIds": [
      "b2u4-l1-lesson",
      "b2u4-l2-lesson",
      "b2u4-l3-lesson",
      "b2u4-l4-lesson",
      "b2u4-l5-lesson",
      "b2u4-l6-lesson",
      "b2u4-l7-lesson"
    ],
    "banner": {
      "text": "一邊",
      "pinyin": "yìbiān"
    },
    "goal": {
      "text": "他們一邊吃麵，一邊看地圖。",
      "pinyin": "Tāmen yìbiān chī miàn, yìbiān kàn dìtú.",
      "meaning": "They eat noodles while looking at the map."
    },
    "grammarIds": [
      "b2u4-l2-simultaneous",
      "b2u4-l3-distance"
    ]
  },
  "reviewLessonId": "b2u4-l7-lesson",
  "lessons": [
    {
      "id": "b2u4-l1-lesson",
      "title": "Ready for noodles",
      "subtitle": "Be hungry and find a noodle shop.",
      "chars": [
        "餓"
      ],
      "minutes": "8–12 min",
      "unitId": "book-2-unit-4",
      "steps": [
        {
          "id": "b2u4-l1-w1-explain",
          "type": "phrase",
          "phrase": "b2u4-l1-word-1"
        },
        {
          "id": "b2u4-l1-char-餓-intro",
          "type": "intro",
          "char": "餓"
        },
        {
          "id": "b2u4-l1-char-餓-trace",
          "type": "trace",
          "char": "餓"
        },
        {
          "id": "b2u4-l1-char-餓-build",
          "type": "build",
          "char": "餓"
        },
        {
          "id": "b2u4-l1-char-餓-complete",
          "type": "complete",
          "char": "餓"
        },
        {
          "id": "b2u4-l1-char-餓-memory",
          "type": "memory",
          "char": "餓"
        },
        {
          "id": "b2u4-l1-w1-meaning",
          "type": "select",
          "prompt": "In this route or shopping story, what does 餓 mean?",
          "options": [
            "hungry",
            "thirsty",
            "full"
          ],
          "answer": "hungry",
          "explanation": "覺得有點餓 means “feel a little hungry,” a reason to eat noodles."
        },
        {
          "id": "b2u4-l1-w2-explain",
          "type": "phrase",
          "phrase": "b2u4-l1-word-2"
        },
        {
          "id": "b2u4-l1-w2-meaning",
          "type": "select",
          "prompt": "In this route or shopping story, what does 麵店 mean?",
          "options": [
            "noodle shop",
            "stationery shop",
            "bank"
          ],
          "answer": "noodle shop",
          "explanation": "They eat 牛肉麵 in a 麵店; this names a noodle restaurant."
        },
        {
          "id": "b2u4-l1-application",
          "type": "select",
          "prompt": "覺得有點餓，去哪裡吃麵？",
          "options": [
            "麵店",
            "郵局",
            "路口"
          ],
          "answer": "麵店",
          "explanation": "In this context, 麵店"
        }
      ]
    },
    {
      "id": "b2u4-l2-lesson",
      "title": "Two things at once",
      "subtitle": "Describe simultaneous actions with 一邊…一邊….",
      "chars": [],
      "minutes": "8–12 min",
      "unitId": "book-2-unit-4",
      "steps": [
        {
          "id": "b2u4-l2-w1-explain",
          "type": "phrase",
          "phrase": "b2u4-l2-word-1"
        },
        {
          "id": "b2u4-l2-w1-meaning",
          "type": "select",
          "prompt": "In this route or shopping story, what does 一邊 mean?",
          "options": [
            "one side; in 一邊…一邊…, while",
            "first, then",
            "either…or"
          ],
          "answer": "one side; in 一邊…一邊…, while",
          "explanation": "Repeat 一邊 before each action to say both actions occur at the same time."
        },
        {
          "id": "b2u4-l2-g-simultaneous-explain",
          "type": "grammar",
          "grammar": "b2u4-l2-simultaneous"
        },
        {
          "id": "b2u4-l2-g-simultaneous-check",
          "type": "select",
          "prompt": "我一邊吃麵，一邊看地圖。 — what does the whole sentence mean?",
          "options": [
            "I eat noodles while looking at the map.",
            "I look at the map only after I eat.",
            "I eat only after putting away the map."
          ],
          "answer": "I eat noodles while looking at the map.",
          "explanation": "Repeat 一邊 before each action that happens at the same time. 不可以 or 不要 can prohibit the two-action combination; 一邊…一邊… is not “first, then.”"
        },
        {
          "id": "b2u4-l2-model-explain",
          "type": "phrase",
          "phrase": "b2u4-l2-model"
        },
        {
          "id": "b2u4-l2-model-order",
          "type": "order",
          "phrase": "b2u4-l2-model",
          "tokens": [
            "地圖",
            "看",
            "一邊",
            "吃麵",
            "一邊",
            "他們"
          ]
        },
        {
          "id": "b2u4-l2-transfer",
          "type": "select",
          "prompt": "Interpret the full message: 他們一邊吃麵，一邊看地圖。",
          "options": [
            "They eat noodles while looking at the map.",
            "The traveler is turning in the opposite direction.",
            "The traveler has reached a different destination."
          ],
          "answer": "They eat noodles while looking at the map.",
          "explanation": "The complete message says: They eat noodles while looking at the map."
        },
        {
          "id": "b2u4-l2-application",
          "type": "select",
          "prompt": "一邊吃麵，一邊看地圖。 When are these actions done?",
          "options": [
            "At the same time.",
            "On different days.",
            "Only after both have ended."
          ],
          "answer": "At the same time.",
          "explanation": "In this context, At the same time."
        }
      ]
    },
    {
      "id": "b2u4-l3-lesson",
      "title": "How far is it?",
      "subtitle": "Locate a store using 離…不遠.",
      "chars": [
        "離"
      ],
      "minutes": "8–12 min",
      "unitId": "book-2-unit-4",
      "steps": [
        {
          "id": "b2u4-l3-w1-explain",
          "type": "phrase",
          "phrase": "b2u4-l3-word-1"
        },
        {
          "id": "b2u4-l3-char-離-intro",
          "type": "intro",
          "char": "離"
        },
        {
          "id": "b2u4-l3-char-離-trace",
          "type": "trace",
          "char": "離"
        },
        {
          "id": "b2u4-l3-char-離-build",
          "type": "build",
          "char": "離"
        },
        {
          "id": "b2u4-l3-char-離-complete",
          "type": "complete",
          "char": "離"
        },
        {
          "id": "b2u4-l3-char-離-memory",
          "type": "memory",
          "char": "離"
        },
        {
          "id": "b2u4-l3-w1-meaning",
          "type": "select",
          "prompt": "In this route or shopping story, what does 離 mean?",
          "options": [
            "from; at a distance from",
            "toward",
            "inside"
          ],
          "answer": "from; at a distance from",
          "explanation": "A 離 B 很近 describes the distance between A and B; negate 近/遠, not 離."
        },
        {
          "id": "b2u4-l3-g-distance-explain",
          "type": "grammar",
          "grammar": "b2u4-l3-distance"
        },
        {
          "id": "b2u4-l3-g-distance-check",
          "type": "select",
          "prompt": "郵局離學校很近。 — what does the whole sentence mean?",
          "options": [
            "The post office is close to the school.",
            "The post office is far from the school.",
            "The school is inside the post office."
          ],
          "answer": "The post office is close to the school.",
          "explanation": "離 marks the reference point for distance. Say 離學校不遠 or 離學校很近. Do not negate 離 directly (*不離學校遠). Ask 遠不遠 or 是不是很遠."
        },
        {
          "id": "b2u4-l3-model-explain",
          "type": "phrase",
          "phrase": "b2u4-l3-model"
        },
        {
          "id": "b2u4-l3-model-order",
          "type": "order",
          "phrase": "b2u4-l3-model",
          "tokens": [
            "地圖",
            "看",
            "一邊",
            "吃麵",
            "一邊",
            "他們"
          ]
        },
        {
          "id": "b2u4-l3-transfer",
          "type": "select",
          "prompt": "Interpret the full message: 他們一邊吃麵，一邊看地圖。",
          "options": [
            "They eat noodles while looking at the map.",
            "The traveler is turning in the opposite direction.",
            "The traveler has reached a different destination."
          ],
          "answer": "They eat noodles while looking at the map.",
          "explanation": "The complete message says: They eat noodles while looking at the map."
        },
        {
          "id": "b2u4-l3-application",
          "type": "select",
          "prompt": "麵店離學校不遠。 Which word is negated?",
          "options": [
            "遠",
            "離",
            "學校"
          ],
          "answer": "遠",
          "explanation": "In this context, 遠"
        }
      ]
    },
    {
      "id": "b2u4-l4-lesson",
      "title": "A backpack at the right time",
      "subtitle": "Describe what you happen to want.",
      "chars": [
        "背",
        "正"
      ],
      "minutes": "8–12 min",
      "unitId": "book-2-unit-4",
      "steps": [
        {
          "id": "b2u4-l4-w1-explain",
          "type": "phrase",
          "phrase": "b2u4-l4-word-1"
        },
        {
          "id": "b2u4-l4-char-背-intro",
          "type": "intro",
          "char": "背"
        },
        {
          "id": "b2u4-l4-char-背-trace",
          "type": "trace",
          "char": "背"
        },
        {
          "id": "b2u4-l4-char-背-build",
          "type": "build",
          "char": "背"
        },
        {
          "id": "b2u4-l4-char-背-complete",
          "type": "complete",
          "char": "背"
        },
        {
          "id": "b2u4-l4-char-背-memory",
          "type": "memory",
          "char": "背"
        },
        {
          "id": "b2u4-l4-w1-meaning",
          "type": "select",
          "prompt": "In this route or shopping story, what does 背包 mean?",
          "options": [
            "backpack",
            "notebook",
            "wallet"
          ],
          "answer": "backpack",
          "explanation": "A 背包 is a bag worn on the back; the walker in the story wants to buy one."
        },
        {
          "id": "b2u4-l4-w2-explain",
          "type": "phrase",
          "phrase": "b2u4-l4-word-2"
        },
        {
          "id": "b2u4-l4-char-正-intro",
          "type": "intro",
          "char": "正"
        },
        {
          "id": "b2u4-l4-char-正-trace",
          "type": "trace",
          "char": "正"
        },
        {
          "id": "b2u4-l4-char-正-build",
          "type": "build",
          "char": "正"
        },
        {
          "id": "b2u4-l4-char-正-complete",
          "type": "complete",
          "char": "正"
        },
        {
          "id": "b2u4-l4-char-正-memory",
          "type": "memory",
          "char": "正"
        },
        {
          "id": "b2u4-l4-w2-meaning",
          "type": "select",
          "prompt": "In this route or shopping story, what does 正好 mean?",
          "options": [
            "just; happen to",
            "far too late",
            "not yet"
          ],
          "answer": "just; happen to",
          "explanation": "正好想買 means happen to want to buy one at that moment."
        },
        {
          "id": "b2u4-l4-model-explain",
          "type": "phrase",
          "phrase": "b2u4-l4-model"
        },
        {
          "id": "b2u4-l4-model-order",
          "type": "order",
          "phrase": "b2u4-l4-model",
          "tokens": [
            "不遠",
            "學校",
            "離",
            "麵店"
          ]
        },
        {
          "id": "b2u4-l4-transfer",
          "type": "select",
          "prompt": "Interpret the full message: 麵店離學校不遠。",
          "options": [
            "The noodle shop is not far from school.",
            "The traveler is turning in the opposite direction.",
            "The traveler has reached a different destination."
          ],
          "answer": "The noodle shop is not far from school.",
          "explanation": "The complete message says: The noodle shop is not far from school."
        },
        {
          "id": "b2u4-l4-application",
          "type": "select",
          "prompt": "正好想買背包 describes what?",
          "options": [
            "Happening to want a backpack.",
            "Already selling a backpack.",
            "Being far from a backpack."
          ],
          "answer": "Happening to want a backpack.",
          "explanation": "In this context, Happening to want a backpack."
        }
      ]
    },
    {
      "id": "b2u4-l5-lesson",
      "title": "Pens and a notebook",
      "subtitle": "Count stationery with the right measure words.",
      "chars": [
        "筆",
        "枝"
      ],
      "minutes": "8–12 min",
      "unitId": "book-2-unit-4",
      "steps": [
        {
          "id": "b2u4-l5-w1-explain",
          "type": "phrase",
          "phrase": "b2u4-l5-word-1"
        },
        {
          "id": "b2u4-l5-char-筆-intro",
          "type": "intro",
          "char": "筆"
        },
        {
          "id": "b2u4-l5-char-筆-trace",
          "type": "trace",
          "char": "筆"
        },
        {
          "id": "b2u4-l5-char-筆-build",
          "type": "build",
          "char": "筆"
        },
        {
          "id": "b2u4-l5-char-筆-complete",
          "type": "complete",
          "char": "筆"
        },
        {
          "id": "b2u4-l5-char-筆-memory",
          "type": "memory",
          "char": "筆"
        },
        {
          "id": "b2u4-l5-w1-meaning",
          "type": "select",
          "prompt": "In this route or shopping story, what does 筆 mean?",
          "options": [
            "pen; writing instrument",
            "a backpack",
            "a receipt"
          ],
          "answer": "pen; writing instrument",
          "explanation": "筆 is the noun “pen”; it needs a classifier when counted."
        },
        {
          "id": "b2u4-l5-w2-explain",
          "type": "phrase",
          "phrase": "b2u4-l5-word-2"
        },
        {
          "id": "b2u4-l5-char-枝-intro",
          "type": "intro",
          "char": "枝"
        },
        {
          "id": "b2u4-l5-char-枝-trace",
          "type": "trace",
          "char": "枝"
        },
        {
          "id": "b2u4-l5-char-枝-build",
          "type": "build",
          "char": "枝"
        },
        {
          "id": "b2u4-l5-char-枝-complete",
          "type": "complete",
          "char": "枝"
        },
        {
          "id": "b2u4-l5-char-枝-memory",
          "type": "memory",
          "char": "枝"
        },
        {
          "id": "b2u4-l5-w2-meaning",
          "type": "select",
          "prompt": "In this route or shopping story, what does 枝 mean?",
          "options": [
            "measure word for pens",
            "a pencil case",
            "a notebook"
          ],
          "answer": "measure word for pens",
          "explanation": "兩枝筆 counts two pens; 枝 is a classifier, not the noun “pen.”"
        },
        {
          "id": "b2u4-l5-w3-explain",
          "type": "phrase",
          "phrase": "b2u4-l5-word-3"
        },
        {
          "id": "b2u4-l5-w3-meaning",
          "type": "select",
          "prompt": "In this route or shopping story, what does 本子 mean?",
          "options": [
            "notebook",
            "a pen",
            "a street map"
          ],
          "answer": "notebook",
          "explanation": "一本本子 is one notebook; 本 is the earlier Book 1 classifier."
        },
        {
          "id": "b2u4-l5-model-explain",
          "type": "phrase",
          "phrase": "b2u4-l5-model"
        },
        {
          "id": "b2u4-l5-model-order",
          "type": "order",
          "phrase": "b2u4-l5-model",
          "tokens": [
            "不遠",
            "學校",
            "離",
            "麵店"
          ]
        },
        {
          "id": "b2u4-l5-transfer",
          "type": "select",
          "prompt": "Interpret the full message: 麵店離學校不遠。",
          "options": [
            "The noodle shop is not far from school.",
            "The traveler is turning in the opposite direction.",
            "The traveler has reached a different destination."
          ],
          "answer": "The noodle shop is not far from school.",
          "explanation": "The complete message says: The noodle shop is not far from school."
        },
        {
          "id": "b2u4-l5-application",
          "type": "select",
          "prompt": "Which phrase counts two pens?",
          "options": [
            "兩枝筆",
            "兩本筆",
            "兩個本子"
          ],
          "answer": "兩枝筆",
          "explanation": "In this context, 兩枝筆"
        }
      ]
    },
    {
      "id": "b2u4-l6-lesson",
      "title": "Finally, on Shida Road",
      "subtitle": "Close the reading and retell the trip.",
      "chars": [],
      "minutes": "8–12 min",
      "unitId": "book-2-unit-4",
      "steps": [
        {
          "id": "b2u4-l6-w1-explain",
          "type": "phrase",
          "phrase": "b2u4-l6-word-1"
        },
        {
          "id": "b2u4-l6-w1-meaning",
          "type": "select",
          "prompt": "In this route or shopping story, what does 最後 mean?",
          "options": [
            "finally; in the end",
            "at first",
            "at the same time"
          ],
          "answer": "finally; in the end",
          "explanation": "最後 tells what happened at the end of the shopping trip."
        },
        {
          "id": "b2u4-l6-w2-explain",
          "type": "phrase",
          "phrase": "b2u4-l6-word-2"
        },
        {
          "id": "b2u4-l6-w2-meaning",
          "type": "select",
          "prompt": "In this route or shopping story, what does 師大路上 mean?",
          "options": [
            "on Shida Road",
            "inside NTNU",
            "at the post office"
          ],
          "answer": "on Shida Road",
          "explanation": "A place 師大路上 is on Shida Road, the shopping street in the reading."
        },
        {
          "id": "b2u4-l6-model-explain",
          "type": "phrase",
          "phrase": "b2u4-l6-model"
        },
        {
          "id": "b2u4-l6-model-order",
          "type": "order",
          "phrase": "b2u4-l6-model",
          "tokens": [
            "本子",
            "一本",
            "和",
            "筆",
            "兩枝",
            "買了",
            "她",
            "最後"
          ]
        },
        {
          "id": "b2u4-l6-transfer",
          "type": "select",
          "prompt": "Interpret the full message: 最後她買了兩枝筆和一本本子。",
          "options": [
            "Finally she bought two pens and one notebook.",
            "The traveler is turning in the opposite direction.",
            "The traveler has reached a different destination."
          ],
          "answer": "Finally she bought two pens and one notebook.",
          "explanation": "The complete message says: Finally she bought two pens and one notebook."
        },
        {
          "id": "b2u4-l6-application",
          "type": "select",
          "prompt": "最後他們在師大路上買了東西。 Which part marks the end of events?",
          "options": [
            "最後",
            "師大路上",
            "買了"
          ],
          "answer": "最後",
          "explanation": "In this context, 最後"
        }
      ]
    },
    {
      "id": "b2u4-l7-lesson",
      "title": "Review: Lesson 1 in use",
      "subtitle": "Apply the words, characters, and grammar in complete contexts.",
      "chars": [
        "餓",
        "離",
        "背",
        "正",
        "筆",
        "枝"
      ],
      "minutes": "12–18 min",
      "unitId": "book-2-unit-4",
      "review": true,
      "steps": [
        {
          "id": "b2u4-l7-source-1",
          "type": "phrase",
          "phrase": "b2u4-l7-cumulative-1"
        },
        {
          "id": "b2u4-l7-order-1",
          "type": "order",
          "phrase": "b2u4-l7-cumulative-1",
          "tokens": [
            "地圖",
            "看",
            "一邊",
            "吃麵",
            "一邊",
            "他們"
          ]
        },
        {
          "id": "b2u4-l7-audio-meaning-1",
          "type": "listen",
          "char": "餓",
          "audioText": "他們一邊吃麵，一邊看地圖。",
          "semanticAnswer": true,
          "options": [
            "They eat noodles while looking at the map.",
            "They look at the map after finishing their meal.",
            "They eat only after putting away the map."
          ],
          "answer": "They eat noodles while looking at the map.",
          "explanation": "The full utterance means: They eat noodles while looking at the map."
        },
        {
          "id": "b2u4-l7-understand-1",
          "type": "select",
          "prompt": "What does 他們一邊吃麵，一邊看地圖。 mean?",
          "options": [
            "They eat noodles while looking at the map.",
            "They look at the map after finishing their meal.",
            "They eat only after putting away the map."
          ],
          "answer": "They eat noodles while looking at the map.",
          "explanation": "They eat noodles while looking at the map."
        },
        {
          "id": "b2u4-l7-source-2",
          "type": "phrase",
          "phrase": "b2u4-l7-cumulative-2"
        },
        {
          "id": "b2u4-l7-order-2",
          "type": "order",
          "phrase": "b2u4-l7-cumulative-2",
          "tokens": [
            "不遠",
            "學校",
            "離",
            "麵店"
          ]
        },
        {
          "id": "b2u4-l7-audio-meaning-2",
          "type": "listen",
          "char": "餓",
          "audioText": "麵店離學校不遠。",
          "semanticAnswer": true,
          "options": [
            "The noodle shop is not far from school.",
            "The noodle shop is far from school.",
            "The noodle shop is near the post office, not the school."
          ],
          "answer": "The noodle shop is not far from school.",
          "explanation": "The full utterance means: The noodle shop is not far from school."
        },
        {
          "id": "b2u4-l7-understand-2",
          "type": "select",
          "prompt": "What does 麵店離學校不遠。 mean?",
          "options": [
            "The noodle shop is not far from school.",
            "The noodle shop is far from school.",
            "The noodle shop is near the post office, not the school."
          ],
          "answer": "The noodle shop is not far from school.",
          "explanation": "The noodle shop is not far from school."
        },
        {
          "id": "b2u4-l7-source-3",
          "type": "phrase",
          "phrase": "b2u4-l7-cumulative-3"
        },
        {
          "id": "b2u4-l7-order-3",
          "type": "order",
          "phrase": "b2u4-l7-cumulative-3",
          "tokens": [
            "本子",
            "一本",
            "和",
            "筆",
            "兩枝",
            "買了",
            "她",
            "最後"
          ]
        },
        {
          "id": "b2u4-l7-audio-meaning-3",
          "type": "listen",
          "char": "餓",
          "audioText": "最後她買了兩枝筆和一本本子。",
          "semanticAnswer": true,
          "options": [
            "Finally she bought two pens and one notebook.",
            "Finally she bought two notebooks and one pen.",
            "Finally she bought one pen and two notebooks."
          ],
          "answer": "Finally she bought two pens and one notebook.",
          "explanation": "The full utterance means: Finally she bought two pens and one notebook."
        },
        {
          "id": "b2u4-l7-understand-3",
          "type": "select",
          "prompt": "What does 最後她買了兩枝筆和一本本子。 mean?",
          "options": [
            "Finally she bought two pens and one notebook.",
            "Finally she bought two notebooks and one pen.",
            "Finally she bought one pen and two notebooks."
          ],
          "answer": "Finally she bought two pens and one notebook.",
          "explanation": "Finally she bought two pens and one notebook."
        },
        {
          "id": "b2u4-l7-vocab-1",
          "type": "select",
          "prompt": "In Lesson 1, what does 餓 mean?",
          "options": [
            "hungry",
            "thirsty",
            "full"
          ],
          "answer": "hungry",
          "explanation": "覺得有點餓 means “feel a little hungry,” a reason to eat noodles."
        },
        {
          "id": "b2u4-l7-vocab-2",
          "type": "select",
          "prompt": "In Lesson 1, what does 麵店 mean?",
          "options": [
            "noodle shop",
            "stationery shop",
            "bank"
          ],
          "answer": "noodle shop",
          "explanation": "They eat 牛肉麵 in a 麵店; this names a noodle restaurant."
        },
        {
          "id": "b2u4-l7-vocab-3",
          "type": "select",
          "prompt": "In Lesson 1, what does 一邊 mean?",
          "options": [
            "one side; in 一邊…一邊…, while",
            "first, then",
            "either…or"
          ],
          "answer": "one side; in 一邊…一邊…, while",
          "explanation": "Repeat 一邊 before each action to say both actions occur at the same time."
        },
        {
          "id": "b2u4-l7-vocab-4",
          "type": "select",
          "prompt": "In Lesson 1, what does 離 mean?",
          "options": [
            "from; at a distance from",
            "toward",
            "inside"
          ],
          "answer": "from; at a distance from",
          "explanation": "A 離 B 很近 describes the distance between A and B; negate 近/遠, not 離."
        },
        {
          "id": "b2u4-l7-vocab-5",
          "type": "select",
          "prompt": "In Lesson 1, what does 背包 mean?",
          "options": [
            "backpack",
            "notebook",
            "wallet"
          ],
          "answer": "backpack",
          "explanation": "A 背包 is a bag worn on the back; the walker in the story wants to buy one."
        },
        {
          "id": "b2u4-l7-vocab-6",
          "type": "select",
          "prompt": "In Lesson 1, what does 正好 mean?",
          "options": [
            "just; happen to",
            "far too late",
            "not yet"
          ],
          "answer": "just; happen to",
          "explanation": "正好想買 means happen to want to buy one at that moment."
        },
        {
          "id": "b2u4-l7-vocab-7",
          "type": "select",
          "prompt": "In Lesson 1, what does 筆 mean?",
          "options": [
            "pen; writing instrument",
            "a backpack",
            "a receipt"
          ],
          "answer": "pen; writing instrument",
          "explanation": "筆 is the noun “pen”; it needs a classifier when counted."
        },
        {
          "id": "b2u4-l7-vocab-8",
          "type": "select",
          "prompt": "In Lesson 1, what does 枝 mean?",
          "options": [
            "measure word for pens",
            "a pencil case",
            "a notebook"
          ],
          "answer": "measure word for pens",
          "explanation": "兩枝筆 counts two pens; 枝 is a classifier, not the noun “pen.”"
        },
        {
          "id": "b2u4-l7-vocab-9",
          "type": "select",
          "prompt": "In Lesson 1, what does 本子 mean?",
          "options": [
            "notebook",
            "a pen",
            "a street map"
          ],
          "answer": "notebook",
          "explanation": "一本本子 is one notebook; 本 is the earlier Book 1 classifier."
        },
        {
          "id": "b2u4-l7-vocab-10",
          "type": "select",
          "prompt": "In Lesson 1, what does 最後 mean?",
          "options": [
            "finally; in the end",
            "at first",
            "at the same time"
          ],
          "answer": "finally; in the end",
          "explanation": "最後 tells what happened at the end of the shopping trip."
        },
        {
          "id": "b2u4-l7-vocab-11",
          "type": "select",
          "prompt": "In Lesson 1, what does 師大路上 mean?",
          "options": [
            "on Shida Road",
            "inside NTNU",
            "at the post office"
          ],
          "answer": "on Shida Road",
          "explanation": "A place 師大路上 is on Shida Road, the shopping street in the reading."
        },
        {
          "id": "b2u4-l7-book2-cumulative-1",
          "type": "select",
          "prompt": "從這裡往前走。 Where do you start?",
          "options": [
            "Here.",
            "At the post office.",
            "At the noodle shop."
          ],
          "answer": "Here.",
          "explanation": "The sentence or source situation means: Here."
        },
        {
          "id": "b2u4-l7-book2-cumulative-2",
          "type": "select",
          "prompt": "過了第二個紅綠燈，就看見師大了。 Which landmark comes first?",
          "options": [
            "The second traffic light.",
            "The noodle shop.",
            "The post office."
          ],
          "answer": "The second traffic light.",
          "explanation": "The sentence or source situation means: The second traffic light."
        },
        {
          "id": "b2u4-l7-book2-cumulative-3",
          "type": "select",
          "prompt": "Besides a 超商, where can you withdraw cash in the dialogue?",
          "options": [
            "郵局",
            "麵店",
            "路口"
          ],
          "answer": "郵局",
          "explanation": "The sentence or source situation means: 郵局"
        },
        {
          "id": "b2u4-l7-book2-cumulative-4",
          "type": "select",
          "prompt": "師大聽起來不遠。 What impression does the route give?",
          "options": [
            "NTNU does not sound far.",
            "NTNU has already been reached.",
            "NTNU is closed."
          ],
          "answer": "NTNU does not sound far.",
          "explanation": "The sentence or source situation means: NTNU does not sound far."
        },
        {
          "id": "b2u4-l7-book2-cumulative-5",
          "type": "select",
          "prompt": "看著地圖往前走 describes what?",
          "options": [
            "Looking at the map continuously while walking.",
            "Putting the map away before walking.",
            "Downloading a new map tomorrow."
          ],
          "answer": "Looking at the map continuously while walking.",
          "explanation": "The sentence or source situation means: Looking at the map continuously while walking."
        },
        {
          "id": "b2u4-l7-listen-1",
          "type": "listen",
          "char": "餓",
          "options": [
            "餓",
            "離",
            "背"
          ],
          "answer": "餓",
          "explanation": "The audio says 餓, pronounced è."
        },
        {
          "id": "b2u4-l7-listen-2",
          "type": "listen",
          "char": "離",
          "options": [
            "離",
            "餓",
            "背"
          ],
          "answer": "離",
          "explanation": "The audio says 離, pronounced lí."
        },
        {
          "id": "b2u4-l7-listen-3",
          "type": "listen",
          "char": "背",
          "options": [
            "背",
            "餓",
            "離"
          ],
          "answer": "背",
          "explanation": "The audio says 背, pronounced bēi."
        },
        {
          "id": "b2u4-l7-listen-4",
          "type": "listen",
          "char": "正",
          "options": [
            "正",
            "餓",
            "離"
          ],
          "answer": "正",
          "explanation": "The audio says 正, pronounced zhèng."
        },
        {
          "id": "b2u4-l7-recall-1",
          "type": "memory",
          "char": "餓"
        },
        {
          "id": "b2u4-l7-recall-2",
          "type": "memory",
          "char": "離"
        },
        {
          "id": "b2u4-l7-recall-3",
          "type": "memory",
          "char": "背"
        },
        {
          "id": "b2u4-l7-recall-4",
          "type": "memory",
          "char": "正"
        },
        {
          "id": "b2u4-l7-recall-5",
          "type": "memory",
          "char": "筆"
        },
        {
          "id": "b2u4-l7-recall-6",
          "type": "memory",
          "char": "枝"
        },
        {
          "id": "b2u4-l7-grammar-1",
          "type": "select",
          "prompt": "In 我一邊吃麵，一邊看地圖。, what is the meaning?",
          "options": [
            "I eat noodles while looking at the map.",
            "The two places or actions are unrelated.",
            "This sentence gives someone’s name."
          ],
          "answer": "I eat noodles while looking at the map.",
          "explanation": "Repeat 一邊 before each action that happens at the same time. 不可以 or 不要 can prohibit the two-action combination; 一邊…一邊… is not “first, then.”"
        },
        {
          "id": "b2u4-l7-grammar-2",
          "type": "select",
          "prompt": "In 郵局離學校很近。, what is the meaning?",
          "options": [
            "The post office is close to the school.",
            "The two places or actions are unrelated.",
            "This sentence gives someone’s name."
          ],
          "answer": "The post office is close to the school.",
          "explanation": "離 marks the reference point for distance. Say 離學校不遠 or 離學校很近. Do not negate 離 directly (*不離學校遠). Ask 遠不遠 or 是不是很遠."
        }
      ]
    }
  ],
  "newVocabulary": [
    {
      "text": "餓",
      "pinyin": "è",
      "meaning": "hungry",
      "lessonId": "b2u4-l1-lesson",
      "core": true,
      "note": "覺得有點餓 means “feel a little hungry,” a reason to eat noodles."
    },
    {
      "text": "麵店",
      "pinyin": "miàndiàn",
      "meaning": "noodle shop",
      "lessonId": "b2u4-l1-lesson",
      "core": true,
      "note": "They eat 牛肉麵 in a 麵店; this names a noodle restaurant."
    },
    {
      "text": "一邊",
      "pinyin": "yìbiān",
      "meaning": "one side; in 一邊…一邊…, while",
      "lessonId": "b2u4-l2-lesson",
      "core": true,
      "note": "Repeat 一邊 before each action to say both actions occur at the same time."
    },
    {
      "text": "離",
      "pinyin": "lí",
      "meaning": "from; at a distance from",
      "lessonId": "b2u4-l3-lesson",
      "core": true,
      "note": "A 離 B 很近 describes the distance between A and B; negate 近/遠, not 離."
    },
    {
      "text": "背包",
      "pinyin": "bēibāo",
      "meaning": "backpack",
      "lessonId": "b2u4-l4-lesson",
      "core": true,
      "note": "A 背包 is a bag worn on the back; the walker in the story wants to buy one."
    },
    {
      "text": "正好",
      "pinyin": "zhènghǎo",
      "meaning": "just; happen to",
      "lessonId": "b2u4-l4-lesson",
      "core": true,
      "note": "正好想買 means happen to want to buy one at that moment."
    },
    {
      "text": "筆",
      "pinyin": "bǐ",
      "meaning": "pen; writing instrument",
      "lessonId": "b2u4-l5-lesson",
      "core": true,
      "note": "筆 is the noun “pen”; it needs a classifier when counted."
    },
    {
      "text": "枝",
      "pinyin": "zhī",
      "meaning": "measure word for pens",
      "lessonId": "b2u4-l5-lesson",
      "core": true,
      "note": "兩枝筆 counts two pens; 枝 is a classifier, not the noun “pen.”"
    },
    {
      "text": "本子",
      "pinyin": "běnzi",
      "meaning": "notebook",
      "lessonId": "b2u4-l5-lesson",
      "core": true,
      "note": "一本本子 is one notebook; 本 is the earlier Book 1 classifier."
    },
    {
      "text": "最後",
      "pinyin": "zuìhòu",
      "meaning": "finally; in the end",
      "lessonId": "b2u4-l6-lesson",
      "core": true,
      "note": "最後 tells what happened at the end of the shopping trip."
    },
    {
      "text": "師大路上",
      "pinyin": "Shīdà Lù shàng",
      "meaning": "on Shida Road",
      "lessonId": "b2u4-l6-lesson",
      "core": true,
      "note": "A place 師大路上 is on Shida Road, the shopping street in the reading."
    }
  ],
  "reviewVocabulary": [
    "師大",
    "路口",
    "紅綠燈",
    "超商",
    "郵局",
    "聽起來",
    "地圖",
    "著"
  ],
  "newCharacters": [
    "餓",
    "離",
    "背",
    "正",
    "筆",
    "枝"
  ],
  "reviewCharacters": [],
  "characters": {
    "餓": {
      "hanzi": "餓",
      "pinyin": "è",
      "zhuyin": "ㄜˋ",
      "meaning": "hungry",
      "strokes": 15,
      "note": "餓 tells how the walkers feel before eating noodles.",
      "memory": "The eight-stroke 飠 food radical sits left of 我: I need food.",
      "parts": [
        {
          "label": "飠",
          "name": "food radical",
          "role": "Character component",
          "description": "In 餓, write 飠 (food radical) as the first 8 strokes; The eight-stroke 飠 food radical sits left of 我: I need food.",
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
          "label": "我",
          "name": "right component",
          "role": "Character component",
          "description": "In 餓, write 我 (right component) as the following 7 strokes; The eight-stroke 飠 food radical sits left of 我: I need food.",
          "strokes": [
            8,
            9,
            10,
            11,
            12,
            13,
            14
          ]
        }
      ],
      "layout": "side",
      "example": {
        "text": "餓了",
        "pinyin": "è le",
        "meaning": "hungry"
      },
      "practiceBuild": true
    },
    "離": {
      "hanzi": "離",
      "pinyin": "lí",
      "zhuyin": "ㄌㄧˊ",
      "meaning": "distance from",
      "strokes": 19,
      "note": "離 links two places in 學校離郵局很近.",
      "memory": "The eleven-stroke 离 is on the left; finish the bird-shaped 隹 on the right.",
      "parts": [
        {
          "label": "离",
          "name": "left component",
          "role": "Character component",
          "description": "In 離, write 离 (left component) as the first 11 strokes; The eleven-stroke 离 is on the left; finish the bird-shaped 隹 on the right.",
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
            10
          ]
        },
        {
          "label": "隹",
          "name": "right component",
          "role": "Character component",
          "description": "In 離, write 隹 (right component) as the following 8 strokes; The eleven-stroke 离 is on the left; finish the bird-shaped 隹 on the right.",
          "strokes": [
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18
          ]
        }
      ],
      "layout": "side",
      "example": {
        "text": "離學校很近",
        "pinyin": "lí xuéxiào hěn jìn",
        "meaning": "close to school"
      },
      "practiceBuild": true
    },
    "背": {
      "hanzi": "背",
      "pinyin": "bēi",
      "zhuyin": "ㄅㄟ",
      "meaning": "carry on the back",
      "strokes": 9,
      "note": "背包 is a backpack worn on your back.",
      "memory": "Five strokes of 北 sit on top of four-stroke 月.",
      "parts": [
        {
          "label": "北",
          "name": "upper component",
          "role": "Character component",
          "description": "In 背, write 北 (upper component) as the first 5 strokes; Five strokes of 北 sit on top of four-stroke 月.",
          "strokes": [
            0,
            1,
            2,
            3,
            4
          ]
        },
        {
          "label": "月",
          "name": "lower component",
          "role": "Character component",
          "description": "In 背, write 月 (lower component) as the following 4 strokes; Five strokes of 北 sit on top of four-stroke 月.",
          "strokes": [
            5,
            6,
            7,
            8
          ]
        }
      ],
      "layout": "stack",
      "example": {
        "text": "背包",
        "pinyin": "bēibāo",
        "meaning": "backpack"
      },
      "practiceBuild": true
    },
    "正": {
      "hanzi": "正",
      "pinyin": "zhèng",
      "zhuyin": "ㄓㄥˋ",
      "meaning": "just; exactly",
      "strokes": 5,
      "note": "正好 means “just right” or “happen to.”",
      "memory": "One horizontal stroke sits over four-stroke 止; keep the central vertical straight.",
      "parts": [
        {
          "label": "一",
          "name": "top line",
          "role": "Character component",
          "description": "In 正, write 一 (top line) as the first 1 stroke; One horizontal stroke sits over four-stroke 止; keep the central vertical straight.",
          "strokes": [
            0
          ]
        },
        {
          "label": "止",
          "name": "lower component",
          "role": "Character component",
          "description": "In 正, write 止 (lower component) as the following 4 strokes; One horizontal stroke sits over four-stroke 止; keep the central vertical straight.",
          "strokes": [
            1,
            2,
            3,
            4
          ]
        }
      ],
      "layout": "stack",
      "example": {
        "text": "正好",
        "pinyin": "zhènghǎo",
        "meaning": "just right"
      },
      "practiceBuild": true
    },
    "筆": {
      "hanzi": "筆",
      "pinyin": "bǐ",
      "zhuyin": "ㄅㄧˇ",
      "meaning": "pen",
      "strokes": 12,
      "note": "筆 is a pen in 兩枝筆.",
      "memory": "The bamboo top ⺮ has six strokes, and the writing hand 聿 has six below.",
      "parts": [
        {
          "label": "⺮",
          "name": "bamboo top",
          "role": "Character component",
          "description": "In 筆, write ⺮ (bamboo top) as the first 6 strokes; The bamboo top ⺮ has six strokes, and the writing hand 聿 has six below.",
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
          "label": "聿",
          "name": "writing component",
          "role": "Character component",
          "description": "In 筆, write 聿 (writing component) as the following 6 strokes; The bamboo top ⺮ has six strokes, and the writing hand 聿 has six below.",
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
      "layout": "stack",
      "example": {
        "text": "一枝筆",
        "pinyin": "yì zhī bǐ",
        "meaning": "a pen"
      },
      "practiceBuild": true
    },
    "枝": {
      "hanzi": "枝",
      "pinyin": "zhī",
      "zhuyin": "ㄓ",
      "meaning": "branch; pen classifier",
      "strokes": 8,
      "note": "枝 counts long thin items such as pens in 兩枝筆.",
      "memory": "The four-stroke 木 is on the left and four-stroke 支 on the right.",
      "parts": [
        {
          "label": "木",
          "name": "wood radical",
          "role": "Character component",
          "description": "In 枝, write 木 (wood radical) as the first 4 strokes; The four-stroke 木 is on the left and four-stroke 支 on the right.",
          "strokes": [
            0,
            1,
            2,
            3
          ]
        },
        {
          "label": "支",
          "name": "right component",
          "role": "Character component",
          "description": "In 枝, write 支 (right component) as the following 4 strokes; The four-stroke 木 is on the left and four-stroke 支 on the right.",
          "strokes": [
            4,
            5,
            6,
            7
          ]
        }
      ],
      "layout": "side",
      "example": {
        "text": "兩枝筆",
        "pinyin": "liǎng zhī bǐ",
        "meaning": "two pens"
      },
      "practiceBuild": true
    }
  },
  "grammarRules": {
    "b2u4-l2-simultaneous": {
      "id": "b2u4-l2-simultaneous",
      "title": "Two actions at the same time",
      "pattern": "一邊 + action A，一邊 + action B",
      "explanation": "Repeat 一邊 before each action that happens at the same time. 不可以 or 不要 can prohibit the two-action combination; 一邊…一邊… is not “first, then.”",
      "examples": [
        {
          "text": "我一邊吃麵，一邊看地圖。",
          "pinyin": "Wǒ yìbiān chī miàn, yìbiān kàn dìtú.",
          "meaning": "I eat noodles while looking at the map."
        },
        {
          "text": "不要一邊走路，一邊看手機。",
          "pinyin": "Bú yào yìbiān zǒulù, yìbiān kàn shǒujī.",
          "meaning": "Do not look at your phone while walking."
        }
      ],
      "remember": "Both actions overlap; keep both 一邊 parts."
    },
    "b2u4-l3-distance": {
      "id": "b2u4-l3-distance",
      "title": "Distance between two places: 離",
      "pattern": "place A + 離 + place B + distance (遠/近)",
      "explanation": "離 marks the reference point for distance. Say 離學校不遠 or 離學校很近. Do not negate 離 directly (*不離學校遠). Ask 遠不遠 or 是不是很遠.",
      "examples": [
        {
          "text": "郵局離學校很近。",
          "pinyin": "Yóujú lí xuéxiào hěn jìn.",
          "meaning": "The post office is close to the school."
        },
        {
          "text": "麵店離學校遠不遠？",
          "pinyin": "Miàndiàn lí xuéxiào yuǎn bu yuǎn?",
          "meaning": "Is the noodle shop far from school?"
        }
      ],
      "remember": "Negate or question 遠/近, not 離."
    }
  },
  "grammarIntroductions": [
    {
      "id": "b2u4-l2-simultaneous",
      "kind": "rule",
      "ref": "b2u4-l2-simultaneous",
      "lessonId": "b2u4-l2-lesson",
      "stepId": "b2u4-l2-g-simultaneous-explain"
    },
    {
      "id": "b2u4-l3-distance",
      "kind": "rule",
      "ref": "b2u4-l3-distance",
      "lessonId": "b2u4-l3-lesson",
      "stepId": "b2u4-l3-g-distance-explain"
    }
  ],
  "reviewGrammar": [
    "b2u1-l4-from-toward",
    "b2u2-l4-evaluative",
    "b2u3-l3-ongoing"
  ],
  "phrases": {
    "b2u4-l1-word-1": {
      "text": "餓",
      "pinyin": "è",
      "meaning": "hungry",
      "note": "覺得有點餓 means “feel a little hungry,” a reason to eat noodles.",
      "tokens": [
        "餓"
      ],
      "practice": false
    },
    "b2u4-l1-word-2": {
      "text": "麵店",
      "pinyin": "miàndiàn",
      "meaning": "noodle shop",
      "note": "They eat 牛肉麵 in a 麵店; this names a noodle restaurant.",
      "tokens": [
        "麵店"
      ],
      "practice": false
    },
    "b2u4-l2-word-1": {
      "text": "一邊",
      "pinyin": "yìbiān",
      "meaning": "one side; in 一邊…一邊…, while",
      "note": "Repeat 一邊 before each action to say both actions occur at the same time.",
      "tokens": [
        "一邊"
      ],
      "practice": false
    },
    "b2u4-l2-model": {
      "text": "他們一邊吃麵，一邊看地圖。",
      "pinyin": "Tāmen yìbiān chī miàn, yìbiān kàn dìtú.",
      "meaning": "They eat noodles while looking at the map.",
      "note": "Rebuild this complete source-aligned message from its words.",
      "tokens": [
        "他們",
        "一邊",
        "吃麵",
        "一邊",
        "看",
        "地圖"
      ],
      "practice": true
    },
    "b2u4-l3-word-1": {
      "text": "離",
      "pinyin": "lí",
      "meaning": "from; at a distance from",
      "note": "A 離 B 很近 describes the distance between A and B; negate 近/遠, not 離.",
      "tokens": [
        "離"
      ],
      "practice": false
    },
    "b2u4-l3-model": {
      "text": "他們一邊吃麵，一邊看地圖。",
      "pinyin": "Tāmen yìbiān chī miàn, yìbiān kàn dìtú.",
      "meaning": "They eat noodles while looking at the map.",
      "note": "Rebuild this complete source-aligned message from its words.",
      "tokens": [
        "他們",
        "一邊",
        "吃麵",
        "一邊",
        "看",
        "地圖"
      ],
      "practice": true
    },
    "b2u4-l4-word-1": {
      "text": "背包",
      "pinyin": "bēibāo",
      "meaning": "backpack",
      "note": "A 背包 is a bag worn on the back; the walker in the story wants to buy one.",
      "tokens": [
        "背包"
      ],
      "practice": false
    },
    "b2u4-l4-word-2": {
      "text": "正好",
      "pinyin": "zhènghǎo",
      "meaning": "just; happen to",
      "note": "正好想買 means happen to want to buy one at that moment.",
      "tokens": [
        "正好"
      ],
      "practice": false
    },
    "b2u4-l4-model": {
      "text": "麵店離學校不遠。",
      "pinyin": "Miàndiàn lí xuéxiào bù yuǎn.",
      "meaning": "The noodle shop is not far from school.",
      "note": "Rebuild this complete source-aligned message from its words.",
      "tokens": [
        "麵店",
        "離",
        "學校",
        "不遠"
      ],
      "practice": true
    },
    "b2u4-l5-word-1": {
      "text": "筆",
      "pinyin": "bǐ",
      "meaning": "pen; writing instrument",
      "note": "筆 is the noun “pen”; it needs a classifier when counted.",
      "tokens": [
        "筆"
      ],
      "practice": false
    },
    "b2u4-l5-word-2": {
      "text": "枝",
      "pinyin": "zhī",
      "meaning": "measure word for pens",
      "note": "兩枝筆 counts two pens; 枝 is a classifier, not the noun “pen.”",
      "tokens": [
        "枝"
      ],
      "practice": false
    },
    "b2u4-l5-word-3": {
      "text": "本子",
      "pinyin": "běnzi",
      "meaning": "notebook",
      "note": "一本本子 is one notebook; 本 is the earlier Book 1 classifier.",
      "tokens": [
        "本子"
      ],
      "practice": false
    },
    "b2u4-l5-model": {
      "text": "麵店離學校不遠。",
      "pinyin": "Miàndiàn lí xuéxiào bù yuǎn.",
      "meaning": "The noodle shop is not far from school.",
      "note": "Rebuild this complete source-aligned message from its words.",
      "tokens": [
        "麵店",
        "離",
        "學校",
        "不遠"
      ],
      "practice": true
    },
    "b2u4-l6-word-1": {
      "text": "最後",
      "pinyin": "zuìhòu",
      "meaning": "finally; in the end",
      "note": "最後 tells what happened at the end of the shopping trip.",
      "tokens": [
        "最後"
      ],
      "practice": false
    },
    "b2u4-l6-word-2": {
      "text": "師大路上",
      "pinyin": "Shīdà Lù shàng",
      "meaning": "on Shida Road",
      "note": "A place 師大路上 is on Shida Road, the shopping street in the reading.",
      "tokens": [
        "師大路上"
      ],
      "practice": false
    },
    "b2u4-l6-model": {
      "text": "最後她買了兩枝筆和一本本子。",
      "pinyin": "Zuìhòu tā mǎi le liǎng zhī bǐ hé yì běn běnzi.",
      "meaning": "Finally she bought two pens and one notebook.",
      "note": "Rebuild this complete source-aligned message from its words.",
      "tokens": [
        "最後",
        "她",
        "買了",
        "兩枝",
        "筆",
        "和",
        "一本",
        "本子"
      ],
      "practice": true
    },
    "b2u4-l7-cumulative-1": {
      "text": "他們一邊吃麵，一邊看地圖。",
      "pinyin": "Tāmen yìbiān chī miàn, yìbiān kàn dìtú.",
      "meaning": "They eat noodles while looking at the map.",
      "note": "Use the full sentence, not just a matching keyword.",
      "tokens": [
        "他們",
        "一邊",
        "吃麵",
        "一邊",
        "看",
        "地圖"
      ],
      "practice": true
    },
    "b2u4-l7-cumulative-2": {
      "text": "麵店離學校不遠。",
      "pinyin": "Miàndiàn lí xuéxiào bù yuǎn.",
      "meaning": "The noodle shop is not far from school.",
      "note": "Use the full sentence, not just a matching keyword.",
      "tokens": [
        "麵店",
        "離",
        "學校",
        "不遠"
      ],
      "practice": true
    },
    "b2u4-l7-cumulative-3": {
      "text": "最後她買了兩枝筆和一本本子。",
      "pinyin": "Zuìhòu tā mǎi le liǎng zhī bǐ hé yì běn běnzi.",
      "meaning": "Finally she bought two pens and one notebook.",
      "note": "Use the full sentence, not just a matching keyword.",
      "tokens": [
        "最後",
        "她",
        "買了",
        "兩枝",
        "筆",
        "和",
        "一本",
        "本子"
      ],
      "practice": true
    }
  },
  "revisionStepIds": [
    "b2u4-l7-book2-cumulative-1",
    "b2u4-l7-book2-cumulative-2",
    "b2u4-l7-book2-cumulative-3",
    "b2u4-l7-book2-cumulative-4",
    "b2u4-l7-book2-cumulative-5"
  ]
};

export default unit;
