import type {UnitData} from '../schema.ts';

const unit:UnitData = {
  "schemaVersion": 1,
  "bookId": "book-1",
  "order": 30,
  "unit": {
    "id": "unit-30",
    "number": 30,
    "theme": "rose",
    "label": "Fruit, trying & descriptions",
    "title": "Try It and Describe It",
    "description": "Finish the supported opening of Lesson 10: identify fruit, make a guess, try something tentatively, describe taste subjectively, and talk about photos and clothing.",
    "chars": [
      "紅",
      "瓜",
      "拍",
      "笑",
      "心",
      "穿",
      "衣"
    ],
    "lessonIds": [
      "u30-fruit",
      "u30-guess",
      "u30-try",
      "u30-taste",
      "u30-photo",
      "u30-clothes",
      "u30-review"
    ],
    "banner": {
      "text": "這個水果香香甜甜的。",
      "pinyin": "Zhège shuǐguǒ xiāngxiāng tiántián de."
    },
    "goal": {
      "text": "這是西瓜吧？你吃吃看。",
      "pinyin": "Zhè shì xīguā ba? Nǐ chīchīkàn.",
      "meaning": "This is watermelon, right? Try it and see."
    },
    "grammarIds": [
      "u30-ba-guess",
      "u30-vv-kan",
      "u30-state-redup"
    ],
    "bookReference": "A Course in Contemporary Chinese 1 · Lesson 10 Dialogue I / Vocabulary I (printed pp. 202–204) and Grammar I–II (printed pp. 208–210). 芒果 is explicitly deferred because 芒 does not have verified Taiwan Traditional handwriting geometry in the project's licensed source path."
  },
  "reviewLessonId": "u30-review",
  "lessons": [
    {
      "id": "u30-fruit",
      "title": "Red Watermelon",
      "subtitle": "Name a red fruit and extend 塊 from prices to pieces of food.",
      "chars": [
        "紅",
        "瓜"
      ],
      "minutes": "11–14 min",
      "unitId": "unit-30",
      "review": false,
      "steps": [
        {
          "id": "u30-fruit-紅-intro",
          "type": "intro",
          "char": "紅"
        },
        {
          "id": "u30-fruit-紅-trace",
          "type": "trace",
          "char": "紅"
        },
        {
          "id": "u30-fruit-紅-build",
          "type": "build",
          "char": "紅"
        },
        {
          "id": "u30-fruit-紅-complete",
          "type": "complete",
          "char": "紅"
        },
        {
          "id": "u30-fruit-紅-memory",
          "type": "memory",
          "char": "紅"
        },
        {
          "id": "u30-fruit-瓜-intro",
          "type": "intro",
          "char": "瓜"
        },
        {
          "id": "u30-fruit-瓜-trace",
          "type": "trace",
          "char": "瓜"
        },
        {
          "id": "u30-fruit-瓜-complete",
          "type": "complete",
          "char": "瓜"
        },
        {
          "id": "u30-fruit-瓜-memory",
          "type": "memory",
          "char": "瓜"
        },
        {
          "id": "u30-fruit-p1",
          "type": "phrase",
          "phrase": "u30-red-watermelon"
        },
        {
          "id": "u30-fruit-p2",
          "type": "phrase",
          "phrase": "u30-piece"
        },
        {
          "id": "u30-fruit-s1",
          "type": "select",
          "prompt": "Which word means watermelon?",
          "options": [
            "西瓜",
            "水果",
            "黃色"
          ],
          "answer": "西瓜",
          "explanation": "西瓜 is watermelon; 水果 is the general word fruit."
        },
        {
          "id": "u30-fruit-s2",
          "type": "select",
          "prompt": "In 一塊西瓜, what is 塊 doing?",
          "options": [
            "Counting a piece of food",
            "Naming the color red",
            "Marking a question"
          ],
          "answer": "Counting a piece of food",
          "explanation": "Lesson 10 extends familiar 塊 to a measure word for a piece of food, such as watermelon."
        }
      ]
    },
    {
      "id": "u30-guess",
      "title": "I Think That's Watermelon",
      "subtitle": "Use 吧 for a guess, then confirm it with 對.",
      "chars": [],
      "minutes": "7–9 min",
      "unitId": "unit-30",
      "review": false,
      "steps": [
        {
          "id": "u30-guess-g1",
          "type": "grammar",
          "grammar": "u30-ba-guess"
        },
        {
          "id": "u30-guess-p1",
          "type": "phrase",
          "phrase": "u30-guess"
        },
        {
          "id": "u30-guess-p2",
          "type": "phrase",
          "phrase": "u30-right"
        },
        {
          "id": "u30-guess-s1",
          "type": "select",
          "prompt": "In 這是西瓜吧？, what does 吧 do?",
          "options": [
            "Marks a guess seeking confirmation",
            "Invites someone to travel",
            "Marks a completed action"
          ],
          "answer": "Marks a guess seeking confirmation",
          "explanation": "This is Lesson 10's guessing use of 吧. Earlier you used 吧 to soften suggestions.",
          "grammarIds": [
            "u30-ba-guess"
          ]
        },
        {
          "id": "u30-guess-s2",
          "type": "select",
          "prompt": "Your friend correctly guesses the fruit. Which short response fits?",
          "options": [
            "對",
            "機會",
            "以前"
          ],
          "answer": "對",
          "explanation": "對 means correct/right in this response."
        },
        {
          "id": "u30-guess-o1",
          "type": "order",
          "phrase": "u30-guess",
          "tokens": [
            "這是西瓜",
            "吧"
          ]
        }
      ]
    },
    {
      "id": "u30-try",
      "title": "Try It and See",
      "subtitle": "Use 吃吃看 tentatively, talk about an opportunity, and extend 請 to treating someone.",
      "chars": [],
      "minutes": "9–12 min",
      "unitId": "unit-30",
      "review": false,
      "steps": [
        {
          "id": "u30-try-g1",
          "type": "grammar",
          "grammar": "u30-vv-kan"
        },
        {
          "id": "u30-try-p1",
          "type": "phrase",
          "phrase": "u30-try"
        },
        {
          "id": "u30-try-p2",
          "type": "phrase",
          "phrase": "u30-chance"
        },
        {
          "id": "u30-try-p3",
          "type": "phrase",
          "phrase": "u30-treat"
        },
        {
          "id": "u30-try-s1",
          "type": "select",
          "prompt": "Which expression means 'try tasting it and see'?",
          "options": [
            "吃吃看",
            "吃水果",
            "很好吃"
          ],
          "answer": "吃吃看",
          "explanation": "吃吃看 is the Lesson 10 VV看 pattern.",
          "grammarIds": [
            "u30-vv-kan"
          ]
        },
        {
          "id": "u30-try-s2",
          "type": "select",
          "prompt": "Which follows the Lesson 10 VV看 restriction?",
          "options": [
            "先說水果，再說吃吃看",
            "說吃吃看西瓜",
            "把 看 放在動詞前面"
          ],
          "answer": "先說水果，再說吃吃看",
          "explanation": "Establish the object first, then use 吃吃看. Lesson 10 generally does not put an object after VV看.",
          "grammarIds": [
            "u30-vv-kan"
          ]
        },
        {
          "id": "u30-try-s3",
          "type": "select",
          "prompt": "Which word means an opportunity or chance?",
          "options": [
            "機會",
            "以前",
            "對"
          ],
          "answer": "機會",
          "explanation": "機會 means opportunity/chance."
        },
        {
          "id": "u30-try-s4",
          "type": "select",
          "prompt": "In 我請你吃水果, what does 請 mean?",
          "options": [
            "Treat you to the food",
            "Ask whether it is red",
            "Return to one's country"
          ],
          "answer": "Treat you to the food",
          "explanation": "Lesson 10 extends familiar 請 to 'treat someone to something.'"
        }
      ]
    },
    {
      "id": "u30-taste",
      "title": "Fragrant and Sweet",
      "subtitle": "Use reduplicated state verbs for a subjective impression—and learn the restrictions.",
      "chars": [],
      "minutes": "8–11 min",
      "unitId": "unit-30",
      "review": false,
      "steps": [
        {
          "id": "u30-taste-g1",
          "type": "grammar",
          "grammar": "u30-state-redup"
        },
        {
          "id": "u30-taste-p1",
          "type": "phrase",
          "phrase": "u30-fragrant-sweet"
        },
        {
          "id": "u30-taste-s1",
          "type": "select",
          "prompt": "Which form matches Lesson 10's subjective reduplication pattern?",
          "options": [
            "香香的",
            "很香香的",
            "香香"
          ],
          "answer": "香香的",
          "explanation": "The reduplicated state verb takes 的, and you do not add 很.",
          "grammarIds": [
            "u30-state-redup"
          ]
        },
        {
          "id": "u30-taste-s2",
          "type": "select",
          "prompt": "Which is the textbook-style combination for 'fragrant and sweet'?",
          "options": [
            "香香甜甜的",
            "很香香很甜甜的",
            "香香的甜甜"
          ],
          "answer": "香香甜甜的",
          "explanation": "With two reduplicated state verbs, the first 的 may be omitted and the final 的 remains.",
          "grammarIds": [
            "u30-state-redup"
          ]
        },
        {
          "id": "u30-taste-s3",
          "type": "select",
          "prompt": "Can every state verb be reduplicated this way?",
          "options": [
            "No; Lesson 10 explicitly restricts which state verbs allow it",
            "Yes; every description may be doubled",
            "Only color words may be doubled"
          ],
          "answer": "No; Lesson 10 explicitly restricts which state verbs allow it",
          "explanation": "The textbook permits examples such as 香、甜、高、熱、大 but lists several common state verbs that do not use this pattern.",
          "grammarIds": [
            "u30-state-redup"
          ]
        },
        {
          "id": "u30-taste-o1",
          "type": "order",
          "phrase": "u30-fragrant-sweet",
          "tokens": [
            "這個水果",
            "香香甜甜的"
          ]
        }
      ]
    },
    {
      "id": "u30-photo",
      "title": "Photos and Happy Smiles",
      "subtitle": "Take a photo, smile, and reuse 得 to say how happily someone smiles.",
      "chars": [
        "拍",
        "笑",
        "心"
      ],
      "minutes": "14–18 min",
      "unitId": "unit-30",
      "review": false,
      "steps": [
        {
          "id": "u30-photo-拍-intro",
          "type": "intro",
          "char": "拍"
        },
        {
          "id": "u30-photo-拍-trace",
          "type": "trace",
          "char": "拍"
        },
        {
          "id": "u30-photo-拍-build",
          "type": "build",
          "char": "拍"
        },
        {
          "id": "u30-photo-拍-complete",
          "type": "complete",
          "char": "拍"
        },
        {
          "id": "u30-photo-拍-memory",
          "type": "memory",
          "char": "拍"
        },
        {
          "id": "u30-photo-笑-intro",
          "type": "intro",
          "char": "笑"
        },
        {
          "id": "u30-photo-笑-trace",
          "type": "trace",
          "char": "笑"
        },
        {
          "id": "u30-photo-笑-build",
          "type": "build",
          "char": "笑"
        },
        {
          "id": "u30-photo-笑-complete",
          "type": "complete",
          "char": "笑"
        },
        {
          "id": "u30-photo-笑-memory",
          "type": "memory",
          "char": "笑"
        },
        {
          "id": "u30-photo-心-intro",
          "type": "intro",
          "char": "心"
        },
        {
          "id": "u30-photo-心-trace",
          "type": "trace",
          "char": "心"
        },
        {
          "id": "u30-photo-心-complete",
          "type": "complete",
          "char": "心"
        },
        {
          "id": "u30-photo-心-memory",
          "type": "memory",
          "char": "心"
        },
        {
          "id": "u30-photo-p1",
          "type": "phrase",
          "phrase": "u30-photo"
        },
        {
          "id": "u30-photo-p2",
          "type": "phrase",
          "phrase": "u30-smile"
        },
        {
          "id": "u30-photo-s1",
          "type": "select",
          "prompt": "Which verb belongs with 照片 for 'take a photo'?",
          "options": [
            "拍",
            "笑",
            "穿"
          ],
          "answer": "拍",
          "explanation": "拍照片 means take photos."
        },
        {
          "id": "u30-photo-s2",
          "type": "select",
          "prompt": "Which word means happy or cheerful?",
          "options": [
            "開心",
            "機會",
            "紅色"
          ],
          "answer": "開心",
          "explanation": "開心 means happy/cheerful."
        },
        {
          "id": "u30-photo-s3",
          "type": "select",
          "prompt": "In 我笑得很開心, what is 笑?",
          "options": [
            "The action 'smile/laugh'",
            "The word for clothing",
            "A color"
          ],
          "answer": "The action 'smile/laugh'",
          "explanation": "笑 is the action; 得 introduces the description 很開心.",
          "grammarIds": [
            "u16-performance"
          ]
        }
      ]
    },
    {
      "id": "u30-clothes",
      "title": "What Are You Wearing?",
      "subtitle": "Use 穿 + color + 的 + 衣服 to describe clothing.",
      "chars": [
        "穿",
        "衣"
      ],
      "minutes": "11–14 min",
      "unitId": "unit-30",
      "review": false,
      "steps": [
        {
          "id": "u30-clothes-穿-intro",
          "type": "intro",
          "char": "穿"
        },
        {
          "id": "u30-clothes-穿-trace",
          "type": "trace",
          "char": "穿"
        },
        {
          "id": "u30-clothes-穿-build",
          "type": "build",
          "char": "穿"
        },
        {
          "id": "u30-clothes-穿-complete",
          "type": "complete",
          "char": "穿"
        },
        {
          "id": "u30-clothes-穿-memory",
          "type": "memory",
          "char": "穿"
        },
        {
          "id": "u30-clothes-衣-intro",
          "type": "intro",
          "char": "衣"
        },
        {
          "id": "u30-clothes-衣-trace",
          "type": "trace",
          "char": "衣"
        },
        {
          "id": "u30-clothes-衣-build",
          "type": "build",
          "char": "衣"
        },
        {
          "id": "u30-clothes-衣-complete",
          "type": "complete",
          "char": "衣"
        },
        {
          "id": "u30-clothes-衣-memory",
          "type": "memory",
          "char": "衣"
        },
        {
          "id": "u30-clothes-p1",
          "type": "phrase",
          "phrase": "u30-yellow-clothes"
        },
        {
          "id": "u30-clothes-p2",
          "type": "phrase",
          "phrase": "u30-red-clothes"
        },
        {
          "id": "u30-clothes-s1",
          "type": "select",
          "prompt": "Which verb means 'wear'?",
          "options": [
            "穿",
            "拍",
            "笑"
          ],
          "answer": "穿",
          "explanation": "穿 is the verb for wearing or putting on clothing."
        },
        {
          "id": "u30-clothes-s2",
          "type": "select",
          "prompt": "Which noun means clothes?",
          "options": [
            "衣服",
            "照片",
            "水果"
          ],
          "answer": "衣服",
          "explanation": "衣服 means clothes/clothing."
        },
        {
          "id": "u30-clothes-o1",
          "type": "order",
          "phrase": "u30-red-clothes",
          "tokens": [
            "我朋友",
            "穿紅色的衣服"
          ]
        }
      ]
    },
    {
      "id": "u30-review",
      "title": "Unit 30 Review",
      "subtitle": "Fruit, tentative trying, subjective descriptions, photos, smiles and clothing.",
      "chars": [
        "紅",
        "瓜",
        "拍",
        "笑",
        "心",
        "穿",
        "衣"
      ],
      "minutes": "16–20 min",
      "unitId": "unit-30",
      "review": true,
      "steps": [
        {
          "id": "u30-review-01",
          "type": "listen",
          "char": "紅",
          "options": [
            "紅",
            "瓜",
            "拍",
            "穿"
          ],
          "answer": "紅",
          "explanation": "紅 is hóng, red."
        },
        {
          "id": "u30-review-02",
          "type": "listen",
          "char": "拍",
          "options": [
            "拍",
            "笑",
            "心",
            "衣"
          ],
          "answer": "拍",
          "explanation": "拍 is pāi, as in 拍照片."
        },
        {
          "id": "u30-review-03",
          "type": "listen",
          "char": "穿",
          "options": [
            "穿",
            "紅",
            "瓜",
            "笑"
          ],
          "answer": "穿",
          "explanation": "穿 is chuān, wear."
        },
        {
          "id": "u30-review-04",
          "type": "memory",
          "char": "笑"
        },
        {
          "id": "u30-review-05",
          "type": "parts",
          "char": "紅",
          "prompt": "Which component is on the left of 紅?",
          "options": [
            "糹",
            "工",
            "扌"
          ],
          "answer": "糹",
          "explanation": "紅 has 糹 on the left and 工 on the right."
        },
        {
          "id": "u30-review-06",
          "type": "select",
          "prompt": "Which word means red?",
          "options": [
            "紅色",
            "黃色",
            "西瓜"
          ],
          "answer": "紅色",
          "explanation": "紅色 is red; 黃色 is yellow."
        },
        {
          "id": "u30-review-07",
          "type": "select",
          "prompt": "Which fruit is watermelon?",
          "options": [
            "西瓜",
            "水果",
            "甜"
          ],
          "answer": "西瓜",
          "explanation": "西瓜 is watermelon."
        },
        {
          "id": "u30-review-08",
          "type": "select",
          "prompt": "A guess was correct. Which response means 'Right'?",
          "options": [
            "對",
            "機會",
            "以前"
          ],
          "answer": "對",
          "explanation": "對 means correct/right."
        },
        {
          "id": "u30-review-09",
          "type": "select",
          "prompt": "Which word means opportunity or chance?",
          "options": [
            "機會",
            "開心",
            "照片"
          ],
          "answer": "機會",
          "explanation": "機會 means opportunity/chance."
        },
        {
          "id": "u30-review-10",
          "type": "select",
          "prompt": "Which sentence uses guessing 吧 rather than suggestion 吧?",
          "options": [
            "這是西瓜吧？",
            "我們去夜市吧。",
            "我今天穿紅色的衣服。"
          ],
          "answer": "這是西瓜吧？",
          "explanation": "The speaker is guessing that the fruit is watermelon and seeks confirmation.",
          "grammarIds": [
            "u30-ba-guess"
          ]
        },
        {
          "id": "u30-review-11",
          "type": "select",
          "prompt": "Which expression is the VV看 form 'try tasting it'?",
          "options": [
            "吃吃看",
            "吃水果",
            "看水果"
          ],
          "answer": "吃吃看",
          "explanation": "Reduplicate 吃 and add 看.",
          "grammarIds": [
            "u30-vv-kan"
          ]
        },
        {
          "id": "u30-review-12",
          "type": "select",
          "prompt": "Which follows the Lesson 10 VV看 object restriction?",
          "options": [
            "這個水果很甜，你吃吃看。",
            "你吃吃看西瓜。",
            "你西瓜看吃吃。"
          ],
          "answer": "這個水果很甜，你吃吃看。",
          "explanation": "The fruit is established first; 吃吃看 is not followed by the object.",
          "grammarIds": [
            "u30-vv-kan"
          ]
        },
        {
          "id": "u30-review-13",
          "type": "select",
          "prompt": "Which subjective description follows the Lesson 10 reduplication pattern?",
          "options": [
            "水果香香甜甜的。",
            "水果很香香甜甜的。",
            "水果香香甜甜。"
          ],
          "answer": "水果香香甜甜的。",
          "explanation": "Do not add 很, and keep the final 的.",
          "grammarIds": [
            "u30-state-redup"
          ]
        },
        {
          "id": "u30-review-14",
          "type": "select",
          "prompt": "Which statement about state-verb reduplication is correct?",
          "options": [
            "It is restricted to state verbs that permit the pattern",
            "Every state verb can always be doubled",
            "The doubled form must always use 很"
          ],
          "answer": "It is restricted to state verbs that permit the pattern",
          "explanation": "Lesson 10 explicitly lists allowed and disallowed state verbs.",
          "grammarIds": [
            "u30-state-redup"
          ]
        },
        {
          "id": "u30-review-15",
          "type": "order",
          "phrase": "u30-red-watermelon",
          "tokens": [
            "這個西瓜",
            "是紅色的"
          ]
        },
        {
          "id": "u30-review-16",
          "type": "order",
          "phrase": "u30-try",
          "tokens": [
            "這個水果很甜",
            "你吃吃看"
          ]
        },
        {
          "id": "u30-review-17",
          "type": "select",
          "prompt": "Which verb means take a photo?",
          "options": [
            "拍",
            "穿",
            "笑"
          ],
          "answer": "拍",
          "explanation": "拍照片 means take a photo."
        },
        {
          "id": "u30-review-18",
          "type": "select",
          "prompt": "Which pair correctly matches the feeling words?",
          "options": [
            "笑 = smile/laugh；開心 = happy",
            "笑 = wear；開心 = photo",
            "笑 = red；開心 = chance"
          ],
          "answer": "笑 = smile/laugh；開心 = happy",
          "explanation": "笑 is smile/laugh; 開心 is happy."
        },
        {
          "id": "u30-review-19",
          "type": "select",
          "prompt": "Which sentence means 'My friend is wearing red clothes'?",
          "options": [
            "我朋友穿紅色的衣服。",
            "我朋友拍紅色的照片。",
            "我朋友吃紅色的水果。"
          ],
          "answer": "我朋友穿紅色的衣服。",
          "explanation": "穿 is wear and 衣服 is clothes."
        },
        {
          "id": "u30-review-20",
          "type": "select",
          "prompt": "In 我請你吃水果, what special Lesson 10 sense does 請 have?",
          "options": [
            "Treat someone to food",
            "Guess that something is correct",
            "Wear something"
          ],
          "answer": "Treat someone to food",
          "explanation": "Here 請 means treat someone; this extends the earlier please/invite use."
        },
        {
          "id": "u30-review-21",
          "type": "select",
          "prompt": "Which phrase uses 塊 as a measure word for a piece of food?",
          "options": [
            "一塊西瓜",
            "一個機會",
            "一件衣服"
          ],
          "answer": "一塊西瓜",
          "explanation": "Lesson 10 uses 塊 for a piece of food."
        },
        {
          "id": "u30-review-22",
          "type": "select",
          "prompt": "Which set contains three Unit 30 actions or descriptions?",
          "options": [
            "拍照片、笑得很開心、穿衣服",
            "回國、坐高鐵、買車票",
            "上課、寫書法、打電話"
          ],
          "answer": "拍照片、笑得很開心、穿衣服",
          "explanation": "These combine the new photo, smile/happy, and clothing language from Unit 30."
        }
      ]
    }
  ],
  "newVocabulary": [
    {
      "text": "紅色",
      "pinyin": "hóngsè",
      "meaning": "red; the color red",
      "lessonId": "u30-fruit",
      "core": true
    },
    {
      "text": "西瓜",
      "pinyin": "xīguā",
      "meaning": "watermelon",
      "lessonId": "u30-fruit",
      "core": true
    },
    {
      "text": "對",
      "pinyin": "duì",
      "meaning": "correct; right",
      "lessonId": "u30-guess",
      "core": true,
      "note": "Here 對 is the response 'right/correct'."
    },
    {
      "text": "機會",
      "pinyin": "jīhuì",
      "meaning": "opportunity; chance",
      "lessonId": "u30-try",
      "core": true
    },
    {
      "text": "吃吃看",
      "pinyin": "chīchīkàn",
      "meaning": "try tasting it; have a taste and see",
      "lessonId": "u30-try",
      "core": true,
      "note": "A Lesson 10 VV看 form; do not put the food object after 吃吃看 in this pattern."
    },
    {
      "text": "拍",
      "pinyin": "pāi",
      "meaning": "to take (a picture); to拍",
      "lessonId": "u30-photo",
      "core": true,
      "note": "In Lesson 10, 拍 is used with 照片: 拍照片, take photos."
    },
    {
      "text": "笑",
      "pinyin": "xiào",
      "meaning": "to laugh; to smile",
      "lessonId": "u30-photo",
      "core": true
    },
    {
      "text": "開心",
      "pinyin": "kāixīn",
      "meaning": "happy; cheerful",
      "lessonId": "u30-photo",
      "core": true
    },
    {
      "text": "穿",
      "pinyin": "chuān",
      "meaning": "to wear; put on",
      "lessonId": "u30-clothes",
      "core": true
    },
    {
      "text": "衣服",
      "pinyin": "yīfu",
      "meaning": "clothes; clothing",
      "lessonId": "u30-clothes",
      "core": true
    }
  ],
  "reviewVocabulary": [
    "水果",
    "黃色",
    "給",
    "香",
    "甜",
    "以前",
    "塊",
    "吧",
    "請",
    "照片",
    "朋友",
    "今天",
    "好吃",
    "喜歡",
    "有",
    "想",
    "喝",
    "茶"
  ],
  "newCharacters": [
    "紅",
    "瓜",
    "拍",
    "笑",
    "心",
    "穿",
    "衣"
  ],
  "reviewCharacters": [],
  "characters": {
    "紅": {
      "hanzi": "紅",
      "pinyin": "hóng",
      "zhuyin": "ㄏㄨㄥˊ",
      "meaning": "red",
      "strokes": 9,
      "layout": "side",
      "note": "紅 is second-tone hóng, the color red. In Lesson 10 it combines with 色 to form 紅色.",
      "memory": "A six-stroke 糹 thread side stands on the left; the simple three-stroke 工 sits on the right.",
      "parts": [
        {
          "label": "糹",
          "name": "thread component",
          "role": "Left component",
          "description": "The first six strokes form the narrow 糹 thread component on the left.",
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
          "label": "工",
          "name": "work component",
          "role": "Right component",
          "description": "The final three strokes form 工 on the right: horizontal, vertical, horizontal.",
          "strokes": [
            6,
            7,
            8
          ]
        }
      ],
      "example": {
        "text": "紅色",
        "pinyin": "hóngsè",
        "meaning": "red"
      }
    },
    "瓜": {
      "hanzi": "瓜",
      "pinyin": "guā",
      "zhuyin": "ㄍㄨㄚ",
      "meaning": "melon; gourd",
      "strokes": 5,
      "layout": "whole",
      "note": "瓜 is first-tone guā. In 西瓜, it forms the common word for watermelon.",
      "memory": "瓜 is a compact five-stroke form: two left-falling strokes frame the bent center, a dot sits inside, and the final right-falling stroke opens outward.",
      "parts": [
        {
          "label": "瓜",
          "name": "melon form",
          "role": "Whole-character form",
          "description": "All five strokes interlock in the independent character 瓜; learning the whole five-stroke silhouette is clearer than forcing a false compound split.",
          "strokes": [
            0,
            1,
            2,
            3,
            4
          ]
        }
      ],
      "example": {
        "text": "西瓜",
        "pinyin": "xīguā",
        "meaning": "watermelon"
      }
    },
    "拍": {
      "hanzi": "拍",
      "pinyin": "pāi",
      "zhuyin": "ㄆㄞ",
      "meaning": "take (a picture); pat",
      "strokes": 8,
      "layout": "side",
      "note": "拍 is first-tone pāi. Lesson 10 uses 拍照片, 'take a photo.'",
      "memory": "扌, the hand side, takes three strokes on the left; 白 fills the right with five.",
      "parts": [
        {
          "label": "扌",
          "name": "hand component",
          "role": "Left component",
          "description": "The first three strokes form 扌, linking 拍 to hand actions.",
          "strokes": [
            0,
            1,
            2
          ]
        },
        {
          "label": "白",
          "name": "white component",
          "role": "Right component",
          "description": "The final five strokes form 白 on the right.",
          "strokes": [
            3,
            4,
            5,
            6,
            7
          ]
        }
      ],
      "example": {
        "text": "拍照片",
        "pinyin": "pāi zhàopiàn",
        "meaning": "take photos"
      }
    },
    "笑": {
      "hanzi": "笑",
      "pinyin": "xiào",
      "zhuyin": "ㄒㄧㄠˋ",
      "meaning": "laugh; smile",
      "strokes": 10,
      "layout": "stack",
      "note": "笑 is fourth-tone xiào and means to laugh or smile.",
      "memory": "The six small strokes of 𥫗 form the bamboo top; the four strokes of 夭 spread underneath.",
      "parts": [
        {
          "label": "𥫗",
          "name": "bamboo top",
          "role": "Top component",
          "description": "The first six strokes form the paired bamboo top 𥫗.",
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
          "label": "夭",
          "name": "lower component",
          "role": "Bottom component",
          "description": "The final four strokes form 夭 underneath the bamboo top.",
          "strokes": [
            6,
            7,
            8,
            9
          ]
        }
      ],
      "example": {
        "text": "笑",
        "pinyin": "xiào",
        "meaning": "smile; laugh"
      }
    },
    "心": {
      "hanzi": "心",
      "pinyin": "xīn",
      "zhuyin": "ㄒㄧㄣ",
      "meaning": "heart; mind",
      "strokes": 4,
      "layout": "whole",
      "note": "心 is first-tone xīn. In 開心, the whole word means happy or cheerful.",
      "memory": "心 is a four-stroke heart form: a left-falling stroke, the hooked center, then two separated dots.",
      "parts": [
        {
          "label": "心",
          "name": "heart radical",
          "role": "Whole-character form",
          "description": "The four strokes form the independent heart radical 心, with the hooked center between the left stroke and two dots.",
          "strokes": [
            0,
            1,
            2,
            3
          ]
        }
      ],
      "example": {
        "text": "開心",
        "pinyin": "kāixīn",
        "meaning": "happy"
      }
    },
    "穿": {
      "hanzi": "穿",
      "pinyin": "chuān",
      "zhuyin": "ㄔㄨㄢ",
      "meaning": "wear; put on",
      "strokes": 9,
      "layout": "stack",
      "note": "穿 is first-tone chuān. With clothing, it means to wear or put on.",
      "memory": "穴 makes the five-stroke roof-and-space at the top; 牙 completes the lower four strokes.",
      "parts": [
        {
          "label": "穴",
          "name": "cave component",
          "role": "Top component",
          "description": "The first five strokes form 穴 across the top.",
          "strokes": [
            0,
            1,
            2,
            3,
            4
          ]
        },
        {
          "label": "牙",
          "name": "tooth component",
          "role": "Bottom component",
          "description": "The final four strokes form 牙 below.",
          "strokes": [
            5,
            6,
            7,
            8
          ]
        }
      ],
      "example": {
        "text": "穿衣服",
        "pinyin": "chuān yīfu",
        "meaning": "wear clothes"
      }
    },
    "衣": {
      "hanzi": "衣",
      "pinyin": "yī",
      "zhuyin": "ㄧ",
      "meaning": "clothing; garment",
      "strokes": 6,
      "layout": "stack",
      "note": "衣 is first-tone yī. In 衣服, it supplies the clothing meaning.",
      "memory": "Begin with the two-stroke 亠 top, then open the four lower strokes into the familiar garment shape.",
      "parts": [
        {
          "label": "亠",
          "name": "top component",
          "role": "Top visual group",
          "description": "The first two strokes form the small 亠 top.",
          "strokes": [
            0,
            1
          ]
        },
        {
          "label": "𧘇",
          "name": "garment body",
          "role": "Lower visual group",
          "description": "The final four strokes open beneath the top to form the lower garment body.",
          "strokes": [
            2,
            3,
            4,
            5
          ]
        }
      ],
      "example": {
        "text": "衣服",
        "pinyin": "yīfu",
        "meaning": "clothes"
      }
    }
  },
  "grammarRules": {
    "u30-ba-guess": {
      "id": "u30-ba-guess",
      "title": "Use 吧 to make a guess",
      "pattern": "Statement + 吧？",
      "explanation": "You already know 吧 for a softened suggestion such as 我們去吧. Lesson 10 adds a different use: after a statement, 吧 can show that the speaker is making a guess and asking for confirmation. The guessed information comes before 吧; the particle stays at the end.",
      "examples": [
        {
          "text": "這是西瓜吧？",
          "pinyin": "Zhè shì xīguā ba?",
          "meaning": "This is watermelon, right? / I think this is watermelon?"
        },
        {
          "text": "這個水果很甜吧？",
          "pinyin": "Zhège shuǐguǒ hěn tián ba?",
          "meaning": "This fruit is sweet, right?"
        }
      ],
      "remember": "Suggestion 吧 softens 'let's…'; guessing 吧 follows a statement you think is probably true."
    },
    "u30-vv-kan": {
      "id": "u30-vv-kan",
      "title": "Try an action with VV看",
      "pattern": "monosyllabic action verb + same verb + 看",
      "explanation": "Reduplicate a one-syllable action verb and add 看 to mean 'try doing it and see.' The pattern sounds tentative. Lesson 10 contrasts it with ordinary verb reduplication: VV can take an object, but VV看 generally does not put an object after 看. Establish the thing first, then say 吃吃看, 喝喝看, 聽聽看, and so on.",
      "examples": [
        {
          "text": "這個水果很甜，你吃吃看。",
          "pinyin": "Zhège shuǐguǒ hěn tián, nǐ chīchīkàn.",
          "meaning": "This fruit is sweet; try tasting it."
        },
        {
          "text": "這杯茶很香，你喝喝看。",
          "pinyin": "Zhè bēi chá hěn xiāng, nǐ hēhēkàn.",
          "meaning": "This cup of tea smells good; try drinking it."
        }
      ],
      "remember": "VV看 = try it and see. Do not normally put the object after VV看 in this Lesson 10 pattern.",
      "words": [
        "吃吃看"
      ]
    },
    "u30-state-redup": {
      "id": "u30-state-redup",
      "title": "Give a subjective impression by reduplicating a state verb",
      "pattern": "State verb + state verb + 的",
      "explanation": "Lesson 10 reduplicates certain state verbs to intensify a subjective impression or reaction. The reduplicated form takes 的: 香香的, 甜甜的. Do not add 很 because reduplication already supplies the intensifying effect. With two reduplicated state verbs in sequence, the first 的 can be omitted: 香香甜甜的. This pattern is restricted: the textbook allows examples such as 香, 甜, 高, 熱, 大, but not every state verb, so do not freely reduplicate words such as 美, 矮, 貴, 近, 忙, 新, or 少.",
      "examples": [
        {
          "text": "這個水果香香的。",
          "pinyin": "Zhège shuǐguǒ xiāngxiāng de.",
          "meaning": "This fruit smells nicely fragrant."
        },
        {
          "text": "這個水果香香甜甜的。",
          "pinyin": "Zhège shuǐguǒ xiāngxiāng tiántián de.",
          "meaning": "This fruit is fragrant and sweet."
        }
      ],
      "remember": "Reduplicated state verb + 的 expresses a subjective impression; no 很, and only use state verbs that permit this pattern."
    }
  },
  "grammarIntroductions": [
    {
      "id": "u30-ba-guess",
      "kind": "rule",
      "ref": "u30-ba-guess",
      "lessonId": "u30-guess",
      "stepId": "u30-guess-g1"
    },
    {
      "id": "u30-vv-kan",
      "kind": "rule",
      "ref": "u30-vv-kan",
      "lessonId": "u30-try",
      "stepId": "u30-try-g1"
    },
    {
      "id": "u30-state-redup",
      "kind": "rule",
      "ref": "u30-state-redup",
      "lessonId": "u30-taste",
      "stepId": "u30-taste-g1"
    }
  ],
  "reviewGrammar": [
    "u27-de-shihou",
    "u29-yaoshi-jiu",
    "u16-performance"
  ],
  "phrases": {
    "u30-red-watermelon": {
      "text": "這個西瓜是紅色的。",
      "pinyin": "Zhège xīguā shì hóngsè de.",
      "meaning": "This watermelon is red.",
      "note": "紅色 describes the color; 西瓜 is watermelon.",
      "tokens": [
        "這個西瓜",
        "是紅色的"
      ]
    },
    "u30-piece": {
      "text": "我給你一塊西瓜。",
      "pinyin": "Wǒ gěi nǐ yí kuài xīguā.",
      "meaning": "I'll give you a piece of watermelon.",
      "note": "塊 was learned for prices; Lesson 10 also uses it as a measure word for pieces of food.",
      "tokens": [
        "我",
        "給你",
        "一塊西瓜"
      ]
    },
    "u30-guess": {
      "text": "這是西瓜吧？",
      "pinyin": "Zhè shì xīguā ba?",
      "meaning": "This is watermelon, right?",
      "note": "Here 吧 marks a guess seeking confirmation, not a suggestion.",
      "tokens": [
        "這是西瓜",
        "吧"
      ],
      "grammarIds": [
        "u30-ba-guess"
      ]
    },
    "u30-right": {
      "text": "對，這是西瓜。",
      "pinyin": "Duì, zhè shì xīguā.",
      "meaning": "Right, this is watermelon.",
      "note": "對 is the response 'correct/right.'",
      "tokens": [
        "對",
        "這是西瓜"
      ]
    },
    "u30-try": {
      "text": "這個水果很甜，你吃吃看。",
      "pinyin": "Zhège shuǐguǒ hěn tián, nǐ chīchīkàn.",
      "meaning": "This fruit is sweet; try tasting it.",
      "note": "The object is established before the VV看 expression; 吃吃看 is not followed by another food object.",
      "tokens": [
        "這個水果很甜",
        "你吃吃看"
      ],
      "grammarIds": [
        "u30-vv-kan"
      ]
    },
    "u30-chance": {
      "text": "有機會的時候，我想吃吃看。",
      "pinyin": "Yǒu jīhuì de shíhou, wǒ xiǎng chīchīkàn.",
      "meaning": "When I have a chance, I want to try it.",
      "note": "機會 means opportunity; 的時候 is deliberate review from Unit 27.",
      "tokens": [
        "有機會的時候",
        "我想吃吃看"
      ],
      "grammarIds": [
        "u27-de-shihou",
        "u30-vv-kan"
      ]
    },
    "u30-treat": {
      "text": "我請你吃水果。",
      "pinyin": "Wǒ qǐng nǐ chī shuǐguǒ.",
      "meaning": "I'll treat you to some fruit.",
      "note": "請 was learned as 'please/invite'; Lesson 10 also uses 請 + person + eat/drink to mean treat someone.",
      "tokens": [
        "我",
        "請你",
        "吃水果"
      ]
    },
    "u30-fragrant-sweet": {
      "text": "這個水果香香甜甜的。",
      "pinyin": "Zhège shuǐguǒ xiāngxiāng tiántián de.",
      "meaning": "This fruit is fragrant and sweet.",
      "note": "With two reduplicated state verbs, the first 的 may be omitted.",
      "tokens": [
        "這個水果",
        "香香甜甜的"
      ],
      "grammarIds": [
        "u30-state-redup"
      ]
    },
    "u30-photo": {
      "text": "我拍照片。",
      "pinyin": "Wǒ pāi zhàopiàn.",
      "meaning": "I take photos.",
      "note": "拍照片 is the Lesson 10 photo expression.",
      "tokens": [
        "我",
        "拍照片"
      ]
    },
    "u30-smile": {
      "text": "我笑得很開心。",
      "pinyin": "Wǒ xiào de hěn kāixīn.",
      "meaning": "I smile very happily.",
      "note": "This reuses the earlier verb + 得 + description pattern.",
      "tokens": [
        "我",
        "笑得很開心"
      ],
      "grammarIds": [
        "u16-performance"
      ]
    },
    "u30-yellow-clothes": {
      "text": "我今天穿黃色的衣服。",
      "pinyin": "Wǒ jīntiān chuān huángsè de yīfu.",
      "meaning": "I'm wearing yellow clothes today.",
      "note": "穿 is the verb wear; 衣服 is clothing.",
      "tokens": [
        "我今天",
        "穿黃色的衣服"
      ]
    },
    "u30-red-clothes": {
      "text": "我朋友穿紅色的衣服。",
      "pinyin": "Wǒ péngyǒu chuān hóngsè de yīfu.",
      "meaning": "My friend is wearing red clothes.",
      "note": "A color + 的 can modify 衣服.",
      "tokens": [
        "我朋友",
        "穿紅色的衣服"
      ]
    }
  },
  "revisionStepIds": [
    "u30-try-p2",
    "u30-photo-p2"
  ]
};
export default unit;
