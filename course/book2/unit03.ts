import type {UnitData} from '../schema.ts';

const unit:UnitData = {
  "schemaVersion": 1,
  "bookId": "book-2",
  "order": 3,
  "unit": {
    "id": "book-2-unit-3",
    "number": 3,
    "displayNumber": 3,
    "theme": "indigo",
    "bookReference": "A Course in Contemporary Chinese, Book 2, Lesson 1, pp. 2–14",
    "label": "Reading a map",
    "title": "Walk with a Map",
    "description": "Follow the reading: a map, ongoing actions, shops, and alleys.",
    "chars": [
      "著",
      "品",
      "巷"
    ],
    "lessonIds": [
      "b2u3-l1-lesson",
      "b2u3-l2-lesson",
      "b2u3-l3-lesson",
      "b2u3-l4-lesson",
      "b2u3-l5-lesson",
      "b2u3-l6-lesson",
      "b2u3-l7-lesson"
    ],
    "banner": {
      "text": "地圖",
      "pinyin": "dìtú"
    },
    "goal": {
      "text": "他們看著地圖，經過兩個巷子。",
      "pinyin": "Tāmen kànzhe dìtú, jīngguò liǎng ge xiàngzi.",
      "meaning": "They keep looking at the map and pass two alleys."
    },
    "grammarIds": [
      "b2u3-l3-ongoing"
    ]
  },
  "reviewLessonId": "b2u3-l7-lesson",
  "lessons": [
    {
      "id": "b2u3-l1-lesson",
      "title": "Get the map",
      "subtitle": "Download a map onto the phone.",
      "chars": [],
      "minutes": "8–12 min",
      "unitId": "book-2-unit-3",
      "steps": [
        {
          "id": "b2u3-l1-w1-explain",
          "type": "phrase",
          "phrase": "b2u3-l1-word-1"
        },
        {
          "id": "b2u3-l1-w1-meaning",
          "type": "select",
          "prompt": "In this route or shopping story, what does 下載 mean?",
          "options": [
            "download",
            "delete a map",
            "borrow a book"
          ],
          "answer": "download",
          "explanation": "下載地圖 means save a map onto a phone; 載 here is zài."
        },
        {
          "id": "b2u3-l1-w2-explain",
          "type": "phrase",
          "phrase": "b2u3-l1-word-2"
        },
        {
          "id": "b2u3-l1-w2-meaning",
          "type": "select",
          "prompt": "In this route or shopping story, what does 地圖 mean?",
          "options": [
            "map",
            "photo album",
            "notebook"
          ],
          "answer": "map",
          "explanation": "地圖 shows roads and places; it helps you find your way while walking."
        },
        {
          "id": "b2u3-l1-application",
          "type": "select",
          "prompt": "下載地圖 means to do what?",
          "options": [
            "Download a map.",
            "Buy a notebook.",
            "Walk through an alley."
          ],
          "answer": "Download a map.",
          "explanation": "In this context, Download a map."
        }
      ]
    },
    {
      "id": "b2u3-l2-lesson",
      "title": "Is it useful?",
      "subtitle": "Evaluate whether a map works well.",
      "chars": [],
      "minutes": "8–12 min",
      "unitId": "book-2-unit-3",
      "steps": [
        {
          "id": "b2u3-l2-w1-explain",
          "type": "phrase",
          "phrase": "b2u3-l2-word-1"
        },
        {
          "id": "b2u3-l2-w1-meaning",
          "type": "select",
          "prompt": "In this route or shopping story, what does 好用 mean?",
          "options": [
            "handy; easy to use",
            "delicious",
            "beautiful"
          ],
          "answer": "handy; easy to use",
          "explanation": "地圖好用嗎？ evaluates usability, not whether it tastes good."
        },
        {
          "id": "b2u3-l2-model-explain",
          "type": "phrase",
          "phrase": "b2u3-l2-model"
        },
        {
          "id": "b2u3-l2-model-order",
          "type": "order",
          "phrase": "b2u3-l2-model",
          "tokens": [
            "地圖",
            "一張",
            "了",
            "下載",
            "我"
          ]
        },
        {
          "id": "b2u3-l2-transfer",
          "type": "select",
          "prompt": "Interpret the full message: 我下載了一張地圖。",
          "options": [
            "I downloaded a map.",
            "The traveler is turning in the opposite direction.",
            "The traveler has reached a different destination."
          ],
          "answer": "I downloaded a map.",
          "explanation": "The complete message says: I downloaded a map."
        },
        {
          "id": "b2u3-l2-application",
          "type": "select",
          "prompt": "地圖好用。 What is being evaluated?",
          "options": [
            "The map is handy.",
            "The map is too far away.",
            "The map is lost."
          ],
          "answer": "The map is handy.",
          "explanation": "In this context, The map is handy."
        }
      ]
    },
    {
      "id": "b2u3-l3-lesson",
      "title": "Keep looking",
      "subtitle": "Use 著 for a continuing action or state.",
      "chars": [
        "著"
      ],
      "minutes": "8–12 min",
      "unitId": "book-2-unit-3",
      "steps": [
        {
          "id": "b2u3-l3-w1-explain",
          "type": "phrase",
          "phrase": "b2u3-l3-word-1"
        },
        {
          "id": "b2u3-l3-char-著-intro",
          "type": "intro",
          "char": "著"
        },
        {
          "id": "b2u3-l3-char-著-trace",
          "type": "trace",
          "char": "著"
        },
        {
          "id": "b2u3-l3-char-著-build",
          "type": "build",
          "char": "著"
        },
        {
          "id": "b2u3-l3-char-著-complete",
          "type": "complete",
          "char": "著"
        },
        {
          "id": "b2u3-l3-char-著-memory",
          "type": "memory",
          "char": "著"
        },
        {
          "id": "b2u3-l3-w1-meaning",
          "type": "select",
          "prompt": "In this route or shopping story, what does 著 mean?",
          "options": [
            "ongoing action/state marker",
            "completed-action particle",
            "plural suffix"
          ],
          "answer": "ongoing action/state marker",
          "explanation": "看著地圖 means the looking continues; 著 zhe is neutral tone, not the aspect 了."
        },
        {
          "id": "b2u3-l3-g-ongoing-explain",
          "type": "grammar",
          "grammar": "b2u3-l3-ongoing"
        },
        {
          "id": "b2u3-l3-g-ongoing-check",
          "type": "select",
          "prompt": "他看著地圖。 — what does the whole sentence mean?",
          "options": [
            "He keeps looking at the map.",
            "He has finished looking at the map.",
            "He will buy a map tomorrow."
          ],
          "answer": "He keeps looking at the map.",
          "explanation": "著 zhe follows an action verb and describes an ongoing state or continuing action. 沒 can negate this pattern; 了 instead presents a completed change. 看著地圖 means keeping your eyes on the map."
        },
        {
          "id": "b2u3-l3-model-explain",
          "type": "phrase",
          "phrase": "b2u3-l3-model"
        },
        {
          "id": "b2u3-l3-model-order",
          "type": "order",
          "phrase": "b2u3-l3-model",
          "tokens": [
            "地圖",
            "一張",
            "了",
            "下載",
            "我"
          ]
        },
        {
          "id": "b2u3-l3-transfer",
          "type": "select",
          "prompt": "Interpret the full message: 我下載了一張地圖。",
          "options": [
            "I downloaded a map.",
            "The traveler is turning in the opposite direction.",
            "The traveler has reached a different destination."
          ],
          "answer": "I downloaded a map.",
          "explanation": "The complete message says: I downloaded a map."
        },
        {
          "id": "b2u3-l3-application",
          "type": "select",
          "prompt": "看著地圖。 Is the looking presented as continuing or finished?",
          "options": [
            "Continuing.",
            "Finished and no longer relevant.",
            "Only planned for tomorrow."
          ],
          "answer": "Continuing.",
          "explanation": "In this context, Continuing."
        }
      ]
    },
    {
      "id": "b2u3-l4-lesson",
      "title": "Goods on the street",
      "subtitle": "Recognize daily necessities in the reading.",
      "chars": [
        "品"
      ],
      "minutes": "8–12 min",
      "unitId": "book-2-unit-3",
      "steps": [
        {
          "id": "b2u3-l4-w1-explain",
          "type": "phrase",
          "phrase": "b2u3-l4-word-1"
        },
        {
          "id": "b2u3-l4-char-品-intro",
          "type": "intro",
          "char": "品"
        },
        {
          "id": "b2u3-l4-char-品-trace",
          "type": "trace",
          "char": "品"
        },
        {
          "id": "b2u3-l4-char-品-build",
          "type": "build",
          "char": "品"
        },
        {
          "id": "b2u3-l4-char-品-complete",
          "type": "complete",
          "char": "品"
        },
        {
          "id": "b2u3-l4-char-品-memory",
          "type": "memory",
          "char": "品"
        },
        {
          "id": "b2u3-l4-w1-meaning",
          "type": "select",
          "prompt": "In this route or shopping story, what does 日用品 mean?",
          "options": [
            "daily necessities",
            "electronic maps",
            "snacks only"
          ],
          "answer": "daily necessities",
          "explanation": "日用品 are things used in daily life, sold in a shop in the reading."
        },
        {
          "id": "b2u3-l4-model-explain",
          "type": "phrase",
          "phrase": "b2u3-l4-model"
        },
        {
          "id": "b2u3-l4-model-order",
          "type": "order",
          "phrase": "b2u3-l4-model",
          "tokens": [
            "走",
            "往前",
            "地圖",
            "看著",
            "他"
          ]
        },
        {
          "id": "b2u3-l4-transfer",
          "type": "select",
          "prompt": "Interpret the full message: 他看著地圖往前走。",
          "options": [
            "He keeps looking at the map as he walks forward.",
            "The traveler is turning in the opposite direction.",
            "The traveler has reached a different destination."
          ],
          "answer": "He keeps looking at the map as he walks forward.",
          "explanation": "The complete message says: He keeps looking at the map as he walks forward."
        },
        {
          "id": "b2u3-l4-application",
          "type": "select",
          "prompt": "Which shop category means daily necessities?",
          "options": [
            "日用品",
            "地圖",
            "紅綠燈"
          ],
          "answer": "日用品",
          "explanation": "In this context, 日用品"
        }
      ]
    },
    {
      "id": "b2u3-l5-lesson",
      "title": "Past the alleys",
      "subtitle": "Pass a small lane on foot.",
      "chars": [
        "巷"
      ],
      "minutes": "8–12 min",
      "unitId": "book-2-unit-3",
      "steps": [
        {
          "id": "b2u3-l5-w1-explain",
          "type": "phrase",
          "phrase": "b2u3-l5-word-1"
        },
        {
          "id": "b2u3-l5-char-巷-intro",
          "type": "intro",
          "char": "巷"
        },
        {
          "id": "b2u3-l5-char-巷-trace",
          "type": "trace",
          "char": "巷"
        },
        {
          "id": "b2u3-l5-char-巷-build",
          "type": "build",
          "char": "巷"
        },
        {
          "id": "b2u3-l5-char-巷-complete",
          "type": "complete",
          "char": "巷"
        },
        {
          "id": "b2u3-l5-char-巷-memory",
          "type": "memory",
          "char": "巷"
        },
        {
          "id": "b2u3-l5-w1-meaning",
          "type": "select",
          "prompt": "In this route or shopping story, what does 巷子 mean?",
          "options": [
            "alley; lane",
            "main highway",
            "traffic light"
          ],
          "answer": "alley; lane",
          "explanation": "The small 巷子 leads off the street; 巷子 is a narrow lane."
        },
        {
          "id": "b2u3-l5-w2-explain",
          "type": "phrase",
          "phrase": "b2u3-l5-word-2"
        },
        {
          "id": "b2u3-l5-w2-meaning",
          "type": "select",
          "prompt": "In this route or shopping story, what does 經過 mean?",
          "options": [
            "pass by; go past",
            "stop inside",
            "leave before"
          ],
          "answer": "pass by; go past",
          "explanation": "經過兩個巷子 means passing two alleys on the way, not entering them."
        },
        {
          "id": "b2u3-l5-model-explain",
          "type": "phrase",
          "phrase": "b2u3-l5-model"
        },
        {
          "id": "b2u3-l5-model-order",
          "type": "order",
          "phrase": "b2u3-l5-model",
          "tokens": [
            "走",
            "往前",
            "地圖",
            "看著",
            "他"
          ]
        },
        {
          "id": "b2u3-l5-transfer",
          "type": "select",
          "prompt": "Interpret the full message: 他看著地圖往前走。",
          "options": [
            "He keeps looking at the map as he walks forward.",
            "The traveler is turning in the opposite direction.",
            "The traveler has reached a different destination."
          ],
          "answer": "He keeps looking at the map as he walks forward.",
          "explanation": "The complete message says: He keeps looking at the map as he walks forward."
        },
        {
          "id": "b2u3-l5-application",
          "type": "select",
          "prompt": "經過兩個巷子。 What happened?",
          "options": [
            "We passed two alleys.",
            "We bought two backpacks.",
            "We withdrew cash."
          ],
          "answer": "We passed two alleys.",
          "explanation": "In this context, We passed two alleys."
        }
      ]
    },
    {
      "id": "b2u3-l6-lesson",
      "title": "Notice a place",
      "subtitle": "Describe finding a store on the map.",
      "chars": [],
      "minutes": "8–12 min",
      "unitId": "book-2-unit-3",
      "steps": [
        {
          "id": "b2u3-l6-w1-explain",
          "type": "phrase",
          "phrase": "b2u3-l6-word-1"
        },
        {
          "id": "b2u3-l6-w1-meaning",
          "type": "select",
          "prompt": "In this route or shopping story, what does 發現 mean?",
          "options": [
            "discover; notice",
            "forget",
            "choose between"
          ],
          "answer": "discover; notice",
          "explanation": "看著地圖時發現一家店 means noticing a shop while studying the map."
        },
        {
          "id": "b2u3-l6-model-explain",
          "type": "phrase",
          "phrase": "b2u3-l6-model"
        },
        {
          "id": "b2u3-l6-model-order",
          "type": "order",
          "phrase": "b2u3-l6-model",
          "tokens": [
            "巷子",
            "兩個",
            "經過",
            "我們"
          ]
        },
        {
          "id": "b2u3-l6-transfer",
          "type": "select",
          "prompt": "Interpret the full message: 我們經過兩個巷子。",
          "options": [
            "We passed two alleys.",
            "The traveler is turning in the opposite direction.",
            "The traveler has reached a different destination."
          ],
          "answer": "We passed two alleys.",
          "explanation": "The complete message says: We passed two alleys."
        },
        {
          "id": "b2u3-l6-application",
          "type": "select",
          "prompt": "發現一家店 means what?",
          "options": [
            "Notice a shop.",
            "Turn a shop left.",
            "Close a shop."
          ],
          "answer": "Notice a shop.",
          "explanation": "In this context, Notice a shop."
        }
      ]
    },
    {
      "id": "b2u3-l7-lesson",
      "title": "Review: Lesson 1 in use",
      "subtitle": "Apply the words, characters, and grammar in complete contexts.",
      "chars": [
        "著",
        "品",
        "巷"
      ],
      "minutes": "12–18 min",
      "unitId": "book-2-unit-3",
      "review": true,
      "steps": [
        {
          "id": "b2u3-l7-source-1",
          "type": "phrase",
          "phrase": "b2u3-l7-cumulative-1"
        },
        {
          "id": "b2u3-l7-order-1",
          "type": "order",
          "phrase": "b2u3-l7-cumulative-1",
          "tokens": [
            "地圖",
            "一張",
            "了",
            "下載",
            "我"
          ]
        },
        {
          "id": "b2u3-l7-audio-meaning-1",
          "type": "listen",
          "char": "著",
          "audioText": "我下載了一張地圖。",
          "semanticAnswer": true,
          "options": [
            "I downloaded a map.",
            "I uploaded a map from the phone.",
            "I bought a paper map."
          ],
          "answer": "I downloaded a map.",
          "explanation": "The full utterance means: I downloaded a map."
        },
        {
          "id": "b2u3-l7-understand-1",
          "type": "select",
          "prompt": "What does 我下載了一張地圖。 mean?",
          "options": [
            "I downloaded a map.",
            "I uploaded a map from the phone.",
            "I bought a paper map."
          ],
          "answer": "I downloaded a map.",
          "explanation": "I downloaded a map."
        },
        {
          "id": "b2u3-l7-source-2",
          "type": "phrase",
          "phrase": "b2u3-l7-cumulative-2"
        },
        {
          "id": "b2u3-l7-order-2",
          "type": "order",
          "phrase": "b2u3-l7-cumulative-2",
          "tokens": [
            "走",
            "往前",
            "地圖",
            "看著",
            "他"
          ]
        },
        {
          "id": "b2u3-l7-audio-meaning-2",
          "type": "listen",
          "char": "著",
          "audioText": "他看著地圖往前走。",
          "semanticAnswer": true,
          "options": [
            "He keeps looking at the map as he walks forward.",
            "He finished looking at the map before walking.",
            "He walks forward without looking at the map."
          ],
          "answer": "He keeps looking at the map as he walks forward.",
          "explanation": "The full utterance means: He keeps looking at the map as he walks forward."
        },
        {
          "id": "b2u3-l7-understand-2",
          "type": "select",
          "prompt": "What does 他看著地圖往前走。 mean?",
          "options": [
            "He keeps looking at the map as he walks forward.",
            "He finished looking at the map before walking.",
            "He walks forward without looking at the map."
          ],
          "answer": "He keeps looking at the map as he walks forward.",
          "explanation": "He keeps looking at the map as he walks forward."
        },
        {
          "id": "b2u3-l7-source-3",
          "type": "phrase",
          "phrase": "b2u3-l7-cumulative-3"
        },
        {
          "id": "b2u3-l7-order-3",
          "type": "order",
          "phrase": "b2u3-l7-cumulative-3",
          "tokens": [
            "巷子",
            "兩個",
            "經過",
            "我們"
          ]
        },
        {
          "id": "b2u3-l7-audio-meaning-3",
          "type": "listen",
          "char": "著",
          "audioText": "我們經過兩個巷子。",
          "semanticAnswer": true,
          "options": [
            "We passed two alleys.",
            "We turned into the second alley.",
            "We stopped at the first alley."
          ],
          "answer": "We passed two alleys.",
          "explanation": "The full utterance means: We passed two alleys."
        },
        {
          "id": "b2u3-l7-understand-3",
          "type": "select",
          "prompt": "What does 我們經過兩個巷子。 mean?",
          "options": [
            "We passed two alleys.",
            "We turned into the second alley.",
            "We stopped at the first alley."
          ],
          "answer": "We passed two alleys.",
          "explanation": "We passed two alleys."
        },
        {
          "id": "b2u3-l7-vocab-1",
          "type": "select",
          "prompt": "In Lesson 1, what does 下載 mean?",
          "options": [
            "download",
            "delete a map",
            "borrow a book"
          ],
          "answer": "download",
          "explanation": "下載地圖 means save a map onto a phone; 載 here is zài."
        },
        {
          "id": "b2u3-l7-vocab-2",
          "type": "select",
          "prompt": "In Lesson 1, what does 地圖 mean?",
          "options": [
            "map",
            "photo album",
            "notebook"
          ],
          "answer": "map",
          "explanation": "地圖 shows roads and places; it helps you find your way while walking."
        },
        {
          "id": "b2u3-l7-vocab-3",
          "type": "select",
          "prompt": "In Lesson 1, what does 好用 mean?",
          "options": [
            "handy; easy to use",
            "delicious",
            "beautiful"
          ],
          "answer": "handy; easy to use",
          "explanation": "地圖好用嗎？ evaluates usability, not whether it tastes good."
        },
        {
          "id": "b2u3-l7-vocab-4",
          "type": "select",
          "prompt": "In Lesson 1, what does 著 mean?",
          "options": [
            "ongoing action/state marker",
            "completed-action particle",
            "plural suffix"
          ],
          "answer": "ongoing action/state marker",
          "explanation": "看著地圖 means the looking continues; 著 zhe is neutral tone, not the aspect 了."
        },
        {
          "id": "b2u3-l7-vocab-5",
          "type": "select",
          "prompt": "In Lesson 1, what does 日用品 mean?",
          "options": [
            "daily necessities",
            "electronic maps",
            "snacks only"
          ],
          "answer": "daily necessities",
          "explanation": "日用品 are things used in daily life, sold in a shop in the reading."
        },
        {
          "id": "b2u3-l7-vocab-6",
          "type": "select",
          "prompt": "In Lesson 1, what does 巷子 mean?",
          "options": [
            "alley; lane",
            "main highway",
            "traffic light"
          ],
          "answer": "alley; lane",
          "explanation": "The small 巷子 leads off the street; 巷子 is a narrow lane."
        },
        {
          "id": "b2u3-l7-vocab-7",
          "type": "select",
          "prompt": "In Lesson 1, what does 經過 mean?",
          "options": [
            "pass by; go past",
            "stop inside",
            "leave before"
          ],
          "answer": "pass by; go past",
          "explanation": "經過兩個巷子 means passing two alleys on the way, not entering them."
        },
        {
          "id": "b2u3-l7-vocab-8",
          "type": "select",
          "prompt": "In Lesson 1, what does 發現 mean?",
          "options": [
            "discover; notice",
            "forget",
            "choose between"
          ],
          "answer": "discover; notice",
          "explanation": "看著地圖時發現一家店 means noticing a shop while studying the map."
        },
        {
          "id": "b2u3-l7-listen-1",
          "type": "listen",
          "char": "著",
          "options": [
            "著",
            "品",
            "巷"
          ],
          "answer": "著",
          "explanation": "The audio says 著, pronounced zhe."
        },
        {
          "id": "b2u3-l7-listen-2",
          "type": "listen",
          "char": "品",
          "options": [
            "品",
            "著",
            "巷"
          ],
          "answer": "品",
          "explanation": "The audio says 品, pronounced pǐn."
        },
        {
          "id": "b2u3-l7-listen-3",
          "type": "listen",
          "char": "巷",
          "options": [
            "巷",
            "著",
            "品"
          ],
          "answer": "巷",
          "explanation": "The audio says 巷, pronounced xiàng."
        },
        {
          "id": "b2u3-l7-recall-1",
          "type": "memory",
          "char": "著"
        },
        {
          "id": "b2u3-l7-recall-2",
          "type": "memory",
          "char": "品"
        },
        {
          "id": "b2u3-l7-recall-3",
          "type": "memory",
          "char": "巷"
        },
        {
          "id": "b2u3-l7-grammar-1",
          "type": "select",
          "prompt": "In 他看著地圖。, what is the meaning?",
          "options": [
            "He keeps looking at the map.",
            "The two places or actions are unrelated.",
            "This sentence gives someone’s name."
          ],
          "answer": "He keeps looking at the map.",
          "explanation": "著 zhe follows an action verb and describes an ongoing state or continuing action. 沒 can negate this pattern; 了 instead presents a completed change. 看著地圖 means keeping your eyes on the map."
        }
      ]
    }
  ],
  "newVocabulary": [
    {
      "text": "下載",
      "pinyin": "xiàzài",
      "meaning": "download",
      "lessonId": "b2u3-l1-lesson",
      "core": true,
      "note": "下載地圖 means save a map onto a phone; 載 here is zài."
    },
    {
      "text": "地圖",
      "pinyin": "dìtú",
      "meaning": "map",
      "lessonId": "b2u3-l1-lesson",
      "core": true,
      "note": "地圖 shows roads and places; it helps you find your way while walking."
    },
    {
      "text": "好用",
      "pinyin": "hǎoyòng",
      "meaning": "handy; easy to use",
      "lessonId": "b2u3-l2-lesson",
      "core": true,
      "note": "地圖好用嗎？ evaluates usability, not whether it tastes good."
    },
    {
      "text": "著",
      "pinyin": "zhe",
      "meaning": "ongoing action/state marker",
      "lessonId": "b2u3-l3-lesson",
      "core": true,
      "note": "看著地圖 means the looking continues; 著 zhe is neutral tone, not the aspect 了."
    },
    {
      "text": "日用品",
      "pinyin": "rìyòngpǐn",
      "meaning": "daily necessities",
      "lessonId": "b2u3-l4-lesson",
      "core": true,
      "note": "日用品 are things used in daily life, sold in a shop in the reading."
    },
    {
      "text": "巷子",
      "pinyin": "xiàngzi",
      "meaning": "alley; lane",
      "lessonId": "b2u3-l5-lesson",
      "core": true,
      "note": "The small 巷子 leads off the street; 巷子 is a narrow lane."
    },
    {
      "text": "經過",
      "pinyin": "jīngguò",
      "meaning": "pass by; go past",
      "lessonId": "b2u3-l5-lesson",
      "core": true,
      "note": "經過兩個巷子 means passing two alleys on the way, not entering them."
    },
    {
      "text": "發現",
      "pinyin": "fāxiàn",
      "meaning": "discover; notice",
      "lessonId": "b2u3-l6-lesson",
      "core": true,
      "note": "看著地圖時發現一家店 means noticing a shop while studying the map."
    }
  ],
  "reviewVocabulary": [],
  "newCharacters": [
    "著",
    "品",
    "巷"
  ],
  "reviewCharacters": [],
  "characters": {
    "著": {
      "hanzi": "著",
      "pinyin": "zhe",
      "zhuyin": "˙ㄓㄜ",
      "meaning": "ongoing marker",
      "strokes": 11,
      "note": "In 看著, 著 marks an action or state continuing.",
      "memory": "Write the grass top 艹 before the lower 者; this word is pronounced neutral-tone zhe.",
      "parts": [
        {
          "label": "艹",
          "name": "grass top",
          "role": "Character component",
          "description": "In 著, write 艹 (grass top) as the first 3 strokes; Write the grass top 艹 before the lower 者; this word is pronounced neutral-tone zhe.",
          "strokes": [
            0,
            1,
            2
          ]
        },
        {
          "label": "者",
          "name": "lower component",
          "role": "Character component",
          "description": "In 著, write 者 (lower component) as the following 8 strokes; Write the grass top 艹 before the lower 者; this word is pronounced neutral-tone zhe.",
          "strokes": [
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10
          ]
        }
      ],
      "layout": "stack",
      "example": {
        "text": "看著",
        "pinyin": "kànzhe",
        "meaning": "keep looking"
      },
      "practiceBuild": true
    },
    "品": {
      "hanzi": "品",
      "pinyin": "pǐn",
      "zhuyin": "ㄆㄧㄣˇ",
      "meaning": "goods; articles",
      "strokes": 9,
      "note": "品 is the goods in 日用品.",
      "memory": "The single 口 above two 口 below makes three mouths in a triangular arrangement.",
      "parts": [
        {
          "label": "口",
          "name": "top mouth",
          "role": "Character component",
          "description": "In 品, write 口 (top mouth) as the first 3 strokes; The single 口 above two 口 below makes three mouths in a triangular arrangement.",
          "strokes": [
            0,
            1,
            2
          ]
        },
        {
          "label": "吅",
          "name": "two lower mouths",
          "role": "Character component",
          "description": "In 品, write 吅 (two lower mouths) as the following 6 strokes; The single 口 above two 口 below makes three mouths in a triangular arrangement.",
          "strokes": [
            3,
            4,
            5,
            6,
            7,
            8
          ]
        }
      ],
      "layout": "stack",
      "example": {
        "text": "日用品",
        "pinyin": "rìyòngpǐn",
        "meaning": "daily necessities"
      },
      "practiceBuild": true
    },
    "巷": {
      "hanzi": "巷",
      "pinyin": "xiàng",
      "zhuyin": "ㄒㄧㄤˋ",
      "meaning": "alley",
      "strokes": 9,
      "note": "巷 names the narrow lane in 巷子.",
      "memory": "The six-stroke 共 sits over the three-stroke lower enclosure 己.",
      "parts": [
        {
          "label": "共",
          "name": "upper element",
          "role": "Character component",
          "description": "In 巷, write 共 (upper element) as the first 6 strokes; The six-stroke 共 sits over the three-stroke lower enclosure 己.",
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
          "label": "己",
          "name": "lower enclosure",
          "role": "Character component",
          "description": "In 巷, write 己 (lower enclosure) as the following 3 strokes; The six-stroke 共 sits over the three-stroke lower enclosure 己.",
          "strokes": [
            6,
            7,
            8
          ]
        }
      ],
      "layout": "stack",
      "example": {
        "text": "巷子",
        "pinyin": "xiàngzi",
        "meaning": "alley"
      },
      "practiceBuild": true
    }
  },
  "grammarRules": {
    "b2u3-l3-ongoing": {
      "id": "b2u3-l3-ongoing",
      "title": "Keep an action or state going: 著",
      "pattern": "verb + 著 + object/context",
      "explanation": "著 zhe follows an action verb and describes an ongoing state or continuing action. 沒 can negate this pattern; 了 instead presents a completed change. 看著地圖 means keeping your eyes on the map.",
      "examples": [
        {
          "text": "他看著地圖。",
          "pinyin": "Tā kànzhe dìtú.",
          "meaning": "He keeps looking at the map."
        },
        {
          "text": "他看著我。",
          "pinyin": "Tā kànzhe wǒ.",
          "meaning": "He keeps looking at me."
        }
      ],
      "remember": "著 is neutral-tone zhe after the verb; it does not mean the action has ended."
    }
  },
  "grammarIntroductions": [
    {
      "id": "b2u3-l3-ongoing",
      "kind": "rule",
      "ref": "b2u3-l3-ongoing",
      "lessonId": "b2u3-l3-lesson",
      "stepId": "b2u3-l3-g-ongoing-explain"
    }
  ],
  "reviewGrammar": [],
  "phrases": {
    "b2u3-l1-word-1": {
      "text": "下載",
      "pinyin": "xiàzài",
      "meaning": "download",
      "note": "下載地圖 means save a map onto a phone; 載 here is zài.",
      "tokens": [
        "下載"
      ],
      "practice": false
    },
    "b2u3-l1-word-2": {
      "text": "地圖",
      "pinyin": "dìtú",
      "meaning": "map",
      "note": "地圖 shows roads and places; it helps you find your way while walking.",
      "tokens": [
        "地圖"
      ],
      "practice": false
    },
    "b2u3-l2-word-1": {
      "text": "好用",
      "pinyin": "hǎoyòng",
      "meaning": "handy; easy to use",
      "note": "地圖好用嗎？ evaluates usability, not whether it tastes good.",
      "tokens": [
        "好用"
      ],
      "practice": false
    },
    "b2u3-l2-model": {
      "text": "我下載了一張地圖。",
      "pinyin": "Wǒ xiàzài le yì zhāng dìtú.",
      "meaning": "I downloaded a map.",
      "note": "Rebuild this complete source-aligned message from its words.",
      "tokens": [
        "我",
        "下載",
        "了",
        "一張",
        "地圖"
      ],
      "practice": true
    },
    "b2u3-l3-word-1": {
      "text": "著",
      "pinyin": "zhe",
      "meaning": "ongoing action/state marker",
      "note": "看著地圖 means the looking continues; 著 zhe is neutral tone, not the aspect 了.",
      "tokens": [
        "著"
      ],
      "practice": false
    },
    "b2u3-l3-model": {
      "text": "我下載了一張地圖。",
      "pinyin": "Wǒ xiàzài le yì zhāng dìtú.",
      "meaning": "I downloaded a map.",
      "note": "Rebuild this complete source-aligned message from its words.",
      "tokens": [
        "我",
        "下載",
        "了",
        "一張",
        "地圖"
      ],
      "practice": true
    },
    "b2u3-l4-word-1": {
      "text": "日用品",
      "pinyin": "rìyòngpǐn",
      "meaning": "daily necessities",
      "note": "日用品 are things used in daily life, sold in a shop in the reading.",
      "tokens": [
        "日用品"
      ],
      "practice": false
    },
    "b2u3-l4-model": {
      "text": "他看著地圖往前走。",
      "pinyin": "Tā kànzhe dìtú wǎng qián zǒu.",
      "meaning": "He keeps looking at the map as he walks forward.",
      "note": "Rebuild this complete source-aligned message from its words.",
      "tokens": [
        "他",
        "看著",
        "地圖",
        "往前",
        "走"
      ],
      "practice": true
    },
    "b2u3-l5-word-1": {
      "text": "巷子",
      "pinyin": "xiàngzi",
      "meaning": "alley; lane",
      "note": "The small 巷子 leads off the street; 巷子 is a narrow lane.",
      "tokens": [
        "巷子"
      ],
      "practice": false
    },
    "b2u3-l5-word-2": {
      "text": "經過",
      "pinyin": "jīngguò",
      "meaning": "pass by; go past",
      "note": "經過兩個巷子 means passing two alleys on the way, not entering them.",
      "tokens": [
        "經過"
      ],
      "practice": false
    },
    "b2u3-l5-model": {
      "text": "他看著地圖往前走。",
      "pinyin": "Tā kànzhe dìtú wǎng qián zǒu.",
      "meaning": "He keeps looking at the map as he walks forward.",
      "note": "Rebuild this complete source-aligned message from its words.",
      "tokens": [
        "他",
        "看著",
        "地圖",
        "往前",
        "走"
      ],
      "practice": true
    },
    "b2u3-l6-word-1": {
      "text": "發現",
      "pinyin": "fāxiàn",
      "meaning": "discover; notice",
      "note": "看著地圖時發現一家店 means noticing a shop while studying the map.",
      "tokens": [
        "發現"
      ],
      "practice": false
    },
    "b2u3-l6-model": {
      "text": "我們經過兩個巷子。",
      "pinyin": "Wǒmen jīngguò liǎng ge xiàngzi.",
      "meaning": "We passed two alleys.",
      "note": "Rebuild this complete source-aligned message from its words.",
      "tokens": [
        "我們",
        "經過",
        "兩個",
        "巷子"
      ],
      "practice": true
    },
    "b2u3-l7-cumulative-1": {
      "text": "我下載了一張地圖。",
      "pinyin": "Wǒ xiàzài le yì zhāng dìtú.",
      "meaning": "I downloaded a map.",
      "note": "Use the full sentence, not just a matching keyword.",
      "tokens": [
        "我",
        "下載",
        "了",
        "一張",
        "地圖"
      ],
      "practice": true
    },
    "b2u3-l7-cumulative-2": {
      "text": "他看著地圖往前走。",
      "pinyin": "Tā kànzhe dìtú wǎng qián zǒu.",
      "meaning": "He keeps looking at the map as he walks forward.",
      "note": "Use the full sentence, not just a matching keyword.",
      "tokens": [
        "他",
        "看著",
        "地圖",
        "往前",
        "走"
      ],
      "practice": true
    },
    "b2u3-l7-cumulative-3": {
      "text": "我們經過兩個巷子。",
      "pinyin": "Wǒmen jīngguò liǎng ge xiàngzi.",
      "meaning": "We passed two alleys.",
      "note": "Use the full sentence, not just a matching keyword.",
      "tokens": [
        "我們",
        "經過",
        "兩個",
        "巷子"
      ],
      "practice": true
    }
  },
  "revisionStepIds": []
};

export default unit;
