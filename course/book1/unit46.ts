import type {UnitData} from '../schema.ts';

const unit:UnitData = {
  "schemaVersion": 1,
  "bookId": "book-1",
  "order": 46,
  "unit": {
    "id": "unit-46",
    "number": 46,
    "theme": "cyan",
    "bookReference": "Lesson 15 Dialogue I continuation, Grammar I–II, and Activity IV.",
    "label": "Diagnosis & treatment",
    "title": "Diagnosis, Medicine, and Treatment",
    "description": "Identify illness, discuss medicine and recovery, and use introductory 把.",
    "chars": [
      "感",
      "冒",
      "藥",
      "局",
      "拿",
      "把",
      "休",
      "息",
      "睡"
    ],
    "lessonIds": [
      "u46-cold",
      "u46-nonspecific",
      "u46-medicine",
      "u46-ba",
      "u46-recover",
      "u46-doctor-visit",
      "u46-review"
    ],
    "banner": {
      "text": "請問我得吃藥嗎？",
      "pinyin": "Qǐngwèn wǒ děi chī yào ma?"
    },
    "goal": {
      "text": "回去把藥吃了，多喝水，多休息。",
      "pinyin": "Huíqù bǎ yào chī le, duō hē shuǐ, duō xiūxí.",
      "meaning": "Go back and take the medicine, drink more water, and rest more."
    },
    "grammarIds": [
      "u46-noncommittal-question-words",
      "u46-ba-disposal"
    ]
  },
  "reviewLessonId": "u46-review",
  "lessons": [
    {
      "id": "u46-cold",
      "title": "It Is a Cold",
      "subtitle": "Identify the illness as a cold.",
      "chars": [
        "感",
        "冒"
      ],
      "minutes": "11–17 min",
      "unitId": "unit-46",
      "review": false,
      "steps": [
        {
          "id": "u46-cold-感-read",
          "type": "phrase",
          "phrase": "u46-感-read"
        },
        {
          "id": "u46-cold-感-intro",
          "type": "intro",
          "char": "感"
        },
        {
          "id": "u46-cold-感-trace",
          "type": "trace",
          "char": "感"
        },
        {
          "id": "u46-cold-感-build",
          "type": "build",
          "char": "感"
        },
        {
          "id": "u46-cold-感-complete",
          "type": "complete",
          "char": "感"
        },
        {
          "id": "u46-cold-感-memory",
          "type": "memory",
          "char": "感"
        },
        {
          "id": "u46-cold-冒-read",
          "type": "phrase",
          "phrase": "u46-冒-read"
        },
        {
          "id": "u46-cold-冒-intro",
          "type": "intro",
          "char": "冒"
        },
        {
          "id": "u46-cold-冒-trace",
          "type": "trace",
          "char": "冒"
        },
        {
          "id": "u46-cold-冒-build",
          "type": "build",
          "char": "冒"
        },
        {
          "id": "u46-cold-冒-complete",
          "type": "complete",
          "char": "冒"
        },
        {
          "id": "u46-cold-冒-memory",
          "type": "memory",
          "char": "冒"
        },
        {
          "id": "u46-cold-lex-explain",
          "type": "phrase",
          "phrase": "u46-cold-lex"
        },
        {
          "id": "u46-cold-s1",
          "type": "select",
          "prompt": "感冒 means…",
          "options": [
            "have a cold",
            "have a fever",
            "be inflamed"
          ],
          "answer": "have a cold",
          "explanation": "感冒 gǎnmào means to have/catch a cold."
        },
        {
          "id": "u46-cold-u45",
          "type": "phrase",
          "phrase": "u45-fever-basic"
        },
        {
          "id": "u46-cold-p1",
          "type": "phrase",
          "phrase": "u46-cold-source"
        },
        {
          "id": "u46-cold-s2",
          "type": "select",
          "prompt": "Which sentence identifies the illness as a cold?",
          "options": [
            "我有一點發燒，是感冒。",
            "我一直流鼻水。",
            "喉嚨有一點發炎。"
          ],
          "answer": "我有一點發燒，是感冒。",
          "explanation": "是感冒 identifies the illness as a cold."
        },
        {
          "id": "u46-cold-l1",
          "type": "listen",
          "char": "感",
          "audioText": "我有一點發燒，是感冒。",
          "prompt": "What diagnosis do you hear?",
          "options": [
            "感冒",
            "發炎",
            "胃口很差"
          ],
          "answer": "感冒",
          "explanation": "The diagnosis is 感冒."
        }
      ]
    },
    {
      "id": "u46-nonspecific",
      "title": "Not Anything Specific",
      "subtitle": "Add the non-interrogative 幾 sense and G001.",
      "chars": [],
      "minutes": "11–17 min",
      "unitId": "unit-46",
      "review": false,
      "steps": [
        {
          "id": "u46-ji-explain",
          "type": "phrase",
          "phrase": "u46-ji-expansion"
        },
        {
          "id": "u46-ji-s1",
          "type": "select",
          "prompt": "Which use of 幾 is the new Lesson-15 sense?",
          "options": [
            "幾 = a few/several in a statement",
            "幾 = only the question “how many?”",
            "幾 = all/every"
          ],
          "answer": "幾 = a few/several in a statement",
          "explanation": "Unit 46 adds the non-interrogative few/several sense."
        },
        {
          "id": "u46-noncommittal-question-words",
          "type": "grammar",
          "grammar": "u46-noncommittal-question-words"
        },
        {
          "id": "u46-g1-s1",
          "type": "select",
          "prompt": "Under the Lesson-15 G001 rule, which sentence is a negative non-specific declarative?",
          "options": [
            "我沒買什麼東西。",
            "你想買什麼東西？",
            "什麼東西都很好吃。"
          ],
          "answer": "我沒買什麼東西。",
          "explanation": "G001 uses a question word inside a negative declarative without requiring 都/也.",
          "grammarIds": [
            "u46-noncommittal-question-words"
          ]
        },
        {
          "id": "u46-g1-s2",
          "type": "select",
          "prompt": "What restriction does the source give for G001 statements?",
          "options": [
            "They are always negative.",
            "They always require 都.",
            "They must be questions."
          ],
          "answer": "They are always negative.",
          "explanation": "The textbook states the non-committal statements are always negative."
        },
        {
          "id": "u46-g1-s3",
          "type": "select",
          "prompt": "Which sentence is the earlier Unit-40 totality pattern rather than G001?",
          "options": [
            "什麼東西都不想吃。",
            "我沒買什麼東西。",
            "我沒去哪裡。"
          ],
          "answer": "什麼東西都不想吃。",
          "explanation": "都 marks the earlier totality pattern."
        },
        {
          "id": "u46-g1-p1",
          "type": "phrase",
          "phrase": "u46-g1-order"
        },
        {
          "id": "u46-g1-s4",
          "type": "select",
          "prompt": "Why is 沒有什麼關係 relevant to G001?",
          "options": [
            "什麼 appears in a negative non-specific statement",
            "什麼 asks a literal information question",
            "都 makes the sentence totality"
          ],
          "answer": "什麼 appears in a negative non-specific statement",
          "explanation": "沒有 supplies the negative environment required by the source rule."
        },
        {
          "id": "u46-g1-o1",
          "type": "order",
          "phrase": "u46-g1-order",
          "tokens": [
            "我沒買",
            "什麼東西"
          ]
        }
      ]
    },
    {
      "id": "u46-medicine",
      "title": "Medicine and the Pharmacy",
      "subtitle": "Talk about medicine, pharmacy actions, and modal 得.",
      "chars": [
        "藥",
        "局",
        "拿"
      ],
      "minutes": "11–17 min",
      "unitId": "unit-46",
      "review": false,
      "steps": [
        {
          "id": "u46-med-藥-read",
          "type": "phrase",
          "phrase": "u46-藥-read"
        },
        {
          "id": "u46-medicine-藥-intro",
          "type": "intro",
          "char": "藥"
        },
        {
          "id": "u46-medicine-藥-trace",
          "type": "trace",
          "char": "藥"
        },
        {
          "id": "u46-medicine-藥-build",
          "type": "build",
          "char": "藥"
        },
        {
          "id": "u46-medicine-藥-complete",
          "type": "complete",
          "char": "藥"
        },
        {
          "id": "u46-medicine-藥-memory",
          "type": "memory",
          "char": "藥"
        },
        {
          "id": "u46-med-局-read",
          "type": "phrase",
          "phrase": "u46-局-read"
        },
        {
          "id": "u46-medicine-局-intro",
          "type": "intro",
          "char": "局"
        },
        {
          "id": "u46-medicine-局-trace",
          "type": "trace",
          "char": "局"
        },
        {
          "id": "u46-medicine-局-build",
          "type": "build",
          "char": "局"
        },
        {
          "id": "u46-medicine-局-complete",
          "type": "complete",
          "char": "局"
        },
        {
          "id": "u46-medicine-局-memory",
          "type": "memory",
          "char": "局"
        },
        {
          "id": "u46-med-拿-read",
          "type": "phrase",
          "phrase": "u46-拿-read"
        },
        {
          "id": "u46-medicine-拿-intro",
          "type": "intro",
          "char": "拿"
        },
        {
          "id": "u46-medicine-拿-trace",
          "type": "trace",
          "char": "拿"
        },
        {
          "id": "u46-medicine-拿-build",
          "type": "build",
          "char": "拿"
        },
        {
          "id": "u46-medicine-拿-complete",
          "type": "complete",
          "char": "拿"
        },
        {
          "id": "u46-medicine-拿-memory",
          "type": "memory",
          "char": "拿"
        },
        {
          "id": "u46-medicine-lex-explain",
          "type": "phrase",
          "phrase": "u46-medicine-lex"
        },
        {
          "id": "u46-med-s1",
          "type": "select",
          "prompt": "藥 means…",
          "options": [
            "medicine",
            "water",
            "insurance"
          ],
          "answer": "medicine",
          "explanation": "藥 means medicine."
        },
        {
          "id": "u46-med-s2",
          "type": "select",
          "prompt": "藥局 means…",
          "options": [
            "pharmacy",
            "health center",
            "hospital room"
          ],
          "answer": "pharmacy",
          "explanation": "藥局 means pharmacy."
        },
        {
          "id": "u46-med-s3",
          "type": "select",
          "prompt": "拿 means…",
          "options": [
            "get",
            "rest",
            "vomit"
          ],
          "answer": "get",
          "explanation": "拿 means get."
        },
        {
          "id": "u46-modal-dei-explain",
          "type": "phrase",
          "phrase": "u46-modal-dei"
        },
        {
          "id": "u46-dei-s1",
          "type": "select",
          "prompt": "In 我得吃藥, 得 is pronounced and understood as…",
          "options": [
            "děi — must/have to",
            "de — complement marker",
            "dé — obtain"
          ],
          "answer": "děi — must/have to",
          "explanation": "This is modal 得, new support in Lesson 15."
        },
        {
          "id": "u46-med-p1",
          "type": "phrase",
          "phrase": "u46-medicine-question"
        },
        {
          "id": "u46-dei-s2",
          "type": "select",
          "prompt": "Which translation matches 請問我得吃藥嗎？",
          "options": [
            "Do I have to take medicine?",
            "Did I take medicine well?",
            "How many medicines did I buy?"
          ],
          "answer": "Do I have to take medicine?",
          "explanation": "得 děi expresses necessity."
        },
        {
          "id": "u46-med-p2",
          "type": "phrase",
          "phrase": "u46-pharmacy-source"
        },
        {
          "id": "u46-med-l1",
          "type": "listen",
          "char": "藥",
          "audioText": "你到藥局去拿藥。",
          "prompt": "Where should the person go?",
          "options": [
            "藥局",
            "學校",
            "家"
          ],
          "answer": "藥局",
          "explanation": "The instruction says to go to the pharmacy to get medicine."
        },
        {
          "id": "u46-med-o1",
          "type": "order",
          "phrase": "u46-pharmacy-source",
          "tokens": [
            "你",
            "到藥局去",
            "拿藥"
          ]
        }
      ]
    },
    {
      "id": "u46-ba",
      "title": "The 把 Construction",
      "subtitle": "Use source-accurate introductory 把.",
      "chars": [
        "把"
      ],
      "minutes": "11–17 min",
      "unitId": "unit-46",
      "review": false,
      "steps": [
        {
          "id": "u46-ba-把-read",
          "type": "phrase",
          "phrase": "u46-把-read"
        },
        {
          "id": "u46-ba-把-intro",
          "type": "intro",
          "char": "把"
        },
        {
          "id": "u46-ba-把-trace",
          "type": "trace",
          "char": "把"
        },
        {
          "id": "u46-ba-把-build",
          "type": "build",
          "char": "把"
        },
        {
          "id": "u46-ba-把-complete",
          "type": "complete",
          "char": "把"
        },
        {
          "id": "u46-ba-把-memory",
          "type": "memory",
          "char": "把"
        },
        {
          "id": "u46-ba-lex-explain",
          "type": "phrase",
          "phrase": "u46-ba-lex"
        },
        {
          "id": "u46-ba-v1",
          "type": "select",
          "prompt": "別 means…",
          "options": [
            "don't (imperative)",
            "a few",
            "must"
          ],
          "answer": "don't (imperative)",
          "explanation": "別 bié is imperative negation."
        },
        {
          "id": "u46-ba-disposal",
          "type": "grammar",
          "grammar": "u46-ba-disposal"
        },
        {
          "id": "u46-g2-s1",
          "type": "select",
          "prompt": "Under the textbook's introductory 把 pattern, which sentence follows the source model?",
          "options": [
            "我把這個小籠包吃了。",
            "我想把一支手機賣了。",
            "我把中文學了。"
          ],
          "answer": "我把這個小籠包吃了。",
          "explanation": "The model uses a definite/referential object and an allowed outward action.",
          "grammarIds": [
            "u46-ba-disposal"
          ]
        },
        {
          "id": "u46-g2-s2",
          "type": "select",
          "prompt": "Which verb is source-compatible as the bare action verb in this introductory 把 pattern?",
          "options": [
            "吃",
            "買",
            "學"
          ],
          "answer": "吃",
          "explanation": "The source models outward actions such as 吃/喝/寫/賣."
        },
        {
          "id": "u46-g2-s3",
          "type": "select",
          "prompt": "Where does 沒 go in a negative 把 sentence under this source pattern?",
          "options": [
            "before 把",
            "between 把 and the object",
            "after the final 了"
          ],
          "answer": "before 把",
          "explanation": "Negation precedes 把."
        },
        {
          "id": "u46-g2-s4",
          "type": "select",
          "prompt": "Which imperative follows the source negation order?",
          "options": [
            "別把我的藥吃了。",
            "把別我的藥吃了。",
            "把我的藥別吃了。"
          ],
          "answer": "別把我的藥吃了。",
          "explanation": "別 comes before 把."
        },
        {
          "id": "u46-g2-s5",
          "type": "select",
          "prompt": "Which is a source-style 把 question?",
          "options": [
            "你把功課寫了沒有？",
            "你把不把功課寫了？",
            "你功課把寫了嗎？"
          ],
          "answer": "你把功課寫了沒有？",
          "explanation": "The source uses 了沒有 or 是不是 questions."
        },
        {
          "id": "u46-g2-s6",
          "type": "select",
          "prompt": "Why does the Unit-39 “negation removes verbal 了” rule not erase the final 了 in the source model 我沒把豬腳麵線吃了？",
          "options": [
            "This lesson is treating that 了 as sentence-final in the introductory 把 pattern.",
            "Negation never affects any 了.",
            "把 automatically means past tense."
          ],
          "answer": "This lesson is treating that 了 as sentence-final in the introductory 把 pattern.",
          "explanation": "The source explicitly contrasts this with prior verbal-了."
        },
        {
          "id": "u46-ba-l1",
          "type": "listen",
          "char": "把",
          "audioText": "別把我的藥吃了。",
          "prompt": "Which word gives the negative command?",
          "options": [
            "別",
            "把",
            "藥"
          ],
          "answer": "別",
          "explanation": "別 means “don't.”",
          "semanticAnswer": true
        },
        {
          "id": "u46-ba-o1",
          "type": "order",
          "phrase": "u46-ba-lex",
          "tokens": [
            "別",
            "把我的藥",
            "吃了"
          ]
        }
      ]
    },
    {
      "id": "u46-recover",
      "title": "Rest and Recover",
      "subtitle": "Give basic recovery advice.",
      "chars": [
        "休",
        "息",
        "睡"
      ],
      "minutes": "11–17 min",
      "unitId": "unit-46",
      "review": false,
      "steps": [
        {
          "id": "u46-rec-休-read",
          "type": "phrase",
          "phrase": "u46-休-read"
        },
        {
          "id": "u46-recover-休-intro",
          "type": "intro",
          "char": "休"
        },
        {
          "id": "u46-recover-休-trace",
          "type": "trace",
          "char": "休"
        },
        {
          "id": "u46-recover-休-build",
          "type": "build",
          "char": "休"
        },
        {
          "id": "u46-recover-休-complete",
          "type": "complete",
          "char": "休"
        },
        {
          "id": "u46-recover-休-memory",
          "type": "memory",
          "char": "休"
        },
        {
          "id": "u46-rec-息-read",
          "type": "phrase",
          "phrase": "u46-息-read"
        },
        {
          "id": "u46-recover-息-intro",
          "type": "intro",
          "char": "息"
        },
        {
          "id": "u46-recover-息-trace",
          "type": "trace",
          "char": "息"
        },
        {
          "id": "u46-recover-息-build",
          "type": "build",
          "char": "息"
        },
        {
          "id": "u46-recover-息-complete",
          "type": "complete",
          "char": "息"
        },
        {
          "id": "u46-recover-息-memory",
          "type": "memory",
          "char": "息"
        },
        {
          "id": "u46-rec-睡-read",
          "type": "phrase",
          "phrase": "u46-睡-read"
        },
        {
          "id": "u46-recover-睡-intro",
          "type": "intro",
          "char": "睡"
        },
        {
          "id": "u46-recover-睡-trace",
          "type": "trace",
          "char": "睡"
        },
        {
          "id": "u46-recover-睡-build",
          "type": "build",
          "char": "睡"
        },
        {
          "id": "u46-recover-睡-complete",
          "type": "complete",
          "char": "睡"
        },
        {
          "id": "u46-recover-睡-memory",
          "type": "memory",
          "char": "睡"
        },
        {
          "id": "u46-recover-lex-explain",
          "type": "phrase",
          "phrase": "u46-recover-lex"
        },
        {
          "id": "u46-rec-s1",
          "type": "select",
          "prompt": "水 means…",
          "options": [
            "water",
            "medicine",
            "soup"
          ],
          "answer": "water",
          "explanation": "水 means water."
        },
        {
          "id": "u46-rec-s2",
          "type": "select",
          "prompt": "休息 means…",
          "options": [
            "rest",
            "get medicine",
            "vomit"
          ],
          "answer": "rest",
          "explanation": "休息 means rest."
        },
        {
          "id": "u46-rec-s3",
          "type": "select",
          "prompt": "睡覺 means…",
          "options": [
            "sleep",
            "feel/think",
            "see a doctor"
          ],
          "answer": "sleep",
          "explanation": "睡覺 is shuìjiào; 覺 is read jiào here."
        },
        {
          "id": "u46-rec-s4",
          "type": "select",
          "prompt": "早一點 means…",
          "options": [
            "a bit earlier",
            "much later",
            "a few times"
          ],
          "answer": "a bit earlier",
          "explanation": "早一點 means a bit earlier."
        },
        {
          "id": "u46-rec-x007",
          "type": "phrase",
          "phrase": "u46-recovery-source"
        },
        {
          "id": "u46-rec-s5",
          "type": "select",
          "prompt": "In 多休息, 多 expresses…",
          "options": [
            "advice to rest more",
            "a comparison with another person",
            "a question about quantity"
          ],
          "answer": "advice to rest more",
          "explanation": "Lesson 15 extends prior 多 + V into health advice."
        },
        {
          "id": "u46-rec-p1",
          "type": "phrase",
          "phrase": "u46-recovery-source"
        },
        {
          "id": "u46-rec-s6",
          "type": "select",
          "prompt": "Which advice tells the patient to sleep a little earlier?",
          "options": [
            "早一點睡覺",
            "多喝水",
            "把藥吃了"
          ],
          "answer": "早一點睡覺",
          "explanation": "早一點 modifies the sleep time."
        },
        {
          "id": "u46-rec-l1",
          "type": "listen",
          "char": "休",
          "audioText": "多喝水，多休息，早一點睡覺。",
          "prompt": "Which three kinds of advice do you hear?",
          "options": [
            "drink more water, rest more, sleep earlier",
            "buy medicine, go home, eat less",
            "vomit, sleep, compare"
          ],
          "answer": "drink more water, rest more, sleep earlier",
          "explanation": "These are the three advice phrases in the audio.",
          "semanticAnswer": true
        }
      ]
    },
    {
      "id": "u46-doctor-visit",
      "title": "The Doctor Visit",
      "subtitle": "Integrate D1T06–D1T12 and source Activity IV.",
      "chars": [],
      "minutes": "11–17 min",
      "unitId": "unit-46",
      "review": false,
      "steps": [
        {
          "id": "u46-visit-p1",
          "type": "phrase",
          "phrase": "u46-d1t06-fixed"
        },
        {
          "id": "u46-visit-p2",
          "type": "phrase",
          "phrase": "u46-g1-source"
        },
        {
          "id": "u46-visit-p3",
          "type": "phrase",
          "phrase": "u46-medicine-question"
        },
        {
          "id": "u46-visit-p4",
          "type": "phrase",
          "phrase": "u46-pharmacy-source"
        },
        {
          "id": "u46-visit-p5",
          "type": "phrase",
          "phrase": "u46-doctor-recovery-question"
        },
        {
          "id": "u46-visit-p6",
          "type": "phrase",
          "phrase": "u46-recovery-source"
        },
        {
          "id": "u46-nin-explain",
          "type": "phrase",
          "phrase": "u46-honorific-nin"
        },
        {
          "id": "u46-nin-s1",
          "type": "select",
          "prompt": "In 謝謝您, 您 is…",
          "options": [
            "a polite form of “you”",
            "a word for doctor",
            "the disposal marker"
          ],
          "answer": "a polite form of “you”",
          "explanation": "您 nín is polite “you.” It remains support-only."
        },
        {
          "id": "u46-visit-p7",
          "type": "phrase",
          "phrase": "u46-thanks-nin"
        },
        {
          "id": "u46-a004-review-support",
          "type": "phrase",
          "phrase": "u46-a004-1"
        },
        {
          "id": "u46-a004-sorry",
          "type": "phrase",
          "phrase": "u46-a004-support-sorry"
        },
        {
          "id": "u46-a004-p1",
          "type": "phrase",
          "phrase": "u46-a004-1"
        },
        {
          "id": "u46-a004-o1",
          "type": "order",
          "phrase": "u46-a004-1",
          "tokens": [
            "加油",
            "我們今天一定要",
            "把這50個小籠包",
            "吃了"
          ]
        },
        {
          "id": "u46-a004-r1",
          "type": "phrase",
          "phrase": "u46-a004-response-1"
        }
        {
          "id": "u46-a004-p2",
          "type": "phrase",
          "phrase": "u46-a004-2"
        },
        {
          "id": "u46-a004-o2",
          "type": "order",
          "phrase": "u46-a004-2",
          "tokens": [
            "要是你",
            "把今天的功課寫了",
            "就可以去打籃球"
          ]
        },
        {
          "id": "u46-a004-r2",
          "type": "phrase",
          "phrase": "u46-a004-response-2"
        }
        {
          "id": "u46-a004-p3",
          "type": "phrase",
          "phrase": "u46-a004-3"
        },
        {
          "id": "u46-a004-o3",
          "type": "order",
          "phrase": "u46-a004-3",
          "tokens": [
            "誰",
            "把我的西瓜",
            "吃了"
          ]
        },
        {
          "id": "u46-a004-r3",
          "type": "phrase",
          "phrase": "u46-a004-response-3"
        }
        {
          "id": "u46-a004-s1",
          "type": "select",
          "prompt": "What do all three Activity-IV source outcomes practice?",
          "options": [
            "doing something with/to a salient object using 把",
            "question-word totality with 都",
            "action comparison with 得"
          ],
          "answer": "doing something with/to a salient object using 把",
          "explanation": "A004 is the source transfer for G002."
        },
        {
          "id": "u46-visit-l1",
          "type": "listen",
          "char": "藥",
          "audioText": "請問我得吃藥嗎？",
          "prompt": "What is the patient asking?",
          "options": [
            "whether they have to take medicine",
            "where their head hurts",
            "how many hours they slept"
          ],
          "answer": "whether they have to take medicine",
          "explanation": "得 děi expresses necessity.",
          "semanticAnswer": true
        }
      ]
    },
    {
      "id": "u46-review",
      "title": "Unit 46 Review",
      "subtitle": "Retrieve medicine, advice, G001/G002, and Unit-45 symptoms.",
      "chars": [
        "感",
        "冒",
        "藥",
        "局",
        "拿",
        "把",
        "休",
        "息",
        "睡"
      ],
      "minutes": "18–22 min",
      "unitId": "unit-46",
      "review": true,
      "steps": [
        {
          "id": "u46-review-l1",
          "type": "listen",
          "char": "藥",
          "audioText": "請問我得吃藥嗎？",
          "prompt": "Which meaning of 得 is heard?",
          "options": [
            "must/have to",
            "performance complement marker",
            "to obtain"
          ],
          "answer": "must/have to",
          "explanation": "This is modal 得 děi, meaning must/have to.",
          "semanticAnswer": true
        },
        {
          "id": "u46-review-l2",
          "type": "listen",
          "char": "局",
          "audioText": "你到藥局去拿藥。",
          "prompt": "Which place is named?",
          "options": [
            "藥局",
            "學校",
            "家"
          ],
          "answer": "藥局",
          "explanation": "The audio names the pharmacy."
        },
        {
          "id": "u46-review-l3",
          "type": "listen",
          "char": "休",
          "audioText": "多喝水，多休息，早一點睡覺。",
          "prompt": "Which item is NOT part of the advice?",
          "options": [
            "去買房子",
            "多休息",
            "早一點睡覺"
          ],
          "answer": "去買房子",
          "explanation": "The complete advice is to drink more water, rest more, and sleep earlier.",
          "semanticAnswer": true
        },
        {
          "id": "u46-review-感",
          "type": "complete",
          "char": "感"
        },
        {
          "id": "u46-review-冒",
          "type": "complete",
          "char": "冒"
        },
        {
          "id": "u46-review-藥",
          "type": "complete",
          "char": "藥"
        },
        {
          "id": "u46-review-局",
          "type": "complete",
          "char": "局"
        },
        {
          "id": "u46-review-拿",
          "type": "complete",
          "char": "拿"
        },
        {
          "id": "u46-review-把",
          "type": "complete",
          "char": "把"
        },
        {
          "id": "u46-review-休",
          "type": "complete",
          "char": "休"
        },
        {
          "id": "u46-review-息",
          "type": "complete",
          "char": "息"
        },
        {
          "id": "u46-review-睡",
          "type": "complete",
          "char": "睡"
        },
        {
          "id": "u46-review-v1",
          "type": "select",
          "prompt": "感冒 means…",
          "options": [
            "have a cold",
            "have a fever",
            "be inflamed"
          ],
          "answer": "have a cold",
          "explanation": "感冒 means have a cold."
        },
        {
          "id": "u46-review-v2",
          "type": "select",
          "prompt": "藥 means…",
          "options": [
            "medicine",
            "water",
            "insurance"
          ],
          "answer": "medicine",
          "explanation": "藥 means medicine."
        },
        {
          "id": "u46-review-v3",
          "type": "select",
          "prompt": "藥局 means…",
          "options": [
            "pharmacy",
            "health center",
            "home"
          ],
          "answer": "pharmacy",
          "explanation": "藥局 means pharmacy."
        },
        {
          "id": "u46-review-v4",
          "type": "select",
          "prompt": "拿 means…",
          "options": [
            "get",
            "rest",
            "vomit"
          ],
          "answer": "get",
          "explanation": "拿 means get."
        },
        {
          "id": "u46-review-v5",
          "type": "select",
          "prompt": "把 means…",
          "options": [
            "disposal marker",
            "comparison marker",
            "question particle"
          ],
          "answer": "disposal marker",
          "explanation": "把 is the disposal marker."
        },
        {
          "id": "u46-review-v6",
          "type": "select",
          "prompt": "別 means…",
          "options": [
            "don't (imperative)",
            "a few",
            "best"
          ],
          "answer": "don't (imperative)",
          "explanation": "別 means don't."
        },
        {
          "id": "u46-review-v7",
          "type": "select",
          "prompt": "水 means…",
          "options": [
            "water",
            "medicine",
            "soup"
          ],
          "answer": "water",
          "explanation": "水 means water."
        },
        {
          "id": "u46-review-v8",
          "type": "select",
          "prompt": "休息 means…",
          "options": [
            "rest",
            "sleep",
            "go home"
          ],
          "answer": "rest",
          "explanation": "休息 means rest."
        },
        {
          "id": "u46-review-v9",
          "type": "select",
          "prompt": "Which pronunciation/meaning matches 睡覺?",
          "options": [
            "shuìjiào — sleep",
            "shuìjué — think",
            "shuìjiǎo — pharmacy"
          ],
          "answer": "shuìjiào — sleep",
          "explanation": "覺 is jiào in 睡覺."
        },
        {
          "id": "u46-review-v10",
          "type": "select",
          "prompt": "早一點 means…",
          "options": [
            "a bit earlier",
            "much later",
            "a few times"
          ],
          "answer": "a bit earlier",
          "explanation": "早一點 means a bit earlier."
        },
        {
          "id": "u46-review-exp1",
          "type": "select",
          "prompt": "Which is the Lesson-15 expansion of 幾?",
          "options": [
            "a few/several in a statement",
            "only the question “how many?”",
            "all/every"
          ],
          "answer": "a few/several in a statement",
          "explanation": "The new sense is taught locally without duplicate Search/Mega ownership."
        },
        {
          "id": "u46-review-g1",
          "type": "select",
          "prompt": "Which sentence is G001 rather than Unit-40 totality?",
          "options": [
            "我沒買什麼東西。",
            "什麼東西都不想吃。",
            "你想買什麼？"
          ],
          "answer": "我沒買什麼東西。",
          "explanation": "G001 is a negative non-specific declarative.",
          "grammarIds": [
            "u46-noncommittal-question-words"
          ]
        },
        {
          "id": "u46-review-g1b",
          "type": "select",
          "prompt": "What is mandatory in the source G001 rule?",
          "options": [
            "negation",
            "都",
            "a question mark"
          ],
          "answer": "negation",
          "explanation": "The source says these statements are always negative."
        },
        {
          "id": "u46-review-g2",
          "type": "select",
          "prompt": "Which source-introductory 把 sentence uses an allowed outward action?",
          "options": [
            "我把這個小籠包吃了。",
            "我把中文學了。",
            "我把這支手機買了。"
          ],
          "answer": "我把這個小籠包吃了。",
          "explanation": "吃 is outward/transitive here."
        },
        {
          "id": "u46-review-g2neg",
          "type": "select",
          "prompt": "Which has correct source negation order?",
          "options": [
            "別把我的藥吃了。",
            "把別我的藥吃了。",
            "把我的藥別吃了。"
          ],
          "answer": "別把我的藥吃了。",
          "explanation": "別 precedes 把."
        },
        {
          "id": "u46-review-g2q",
          "type": "select",
          "prompt": "Which is a source-supported 把 question?",
          "options": [
            "你是不是把機車賣了？",
            "你把不把機車賣了？",
            "是不是你機車把賣了？"
          ],
          "answer": "你是不是把機車賣了？",
          "explanation": "是不是 is a source-supported question route."
        },
        {
          "id": "u46-review-de",
          "type": "select",
          "prompt": "Which pairing is correct?",
          "options": [
            "得 děi + V = must; V 得 de + state = performance complement",
            "得 de + V = must; 得 děi always marks comparison",
            "得 has only one Lesson-15 reading"
          ],
          "answer": "得 děi + V = must; V 得 de + state = performance complement",
          "explanation": "Modal 得 and complement 得 are distinct."
        },
        {
          "id": "u46-review-a004-1",
          "type": "order",
          "phrase": "u46-a004-1",
          "tokens": [
            "加油",
            "我們今天一定要",
            "把這50個小籠包",
            "吃了"
          ]
        },
        {
          "id": "u46-review-a004-2",
          "type": "order",
          "phrase": "u46-a004-2",
          "tokens": [
            "要是你",
            "把今天的功課寫了",
            "就可以去打籃球"
          ]
        },
        {
          "id": "u46-review-a004-3",
          "type": "order",
          "phrase": "u46-a004-3",
          "tokens": [
            "誰",
            "把我的西瓜",
            "吃了"
          ]
        },
        {
          "id": "u46-review-u45-1",
          "type": "select",
          "prompt": "Which pair describes a runny nose and poor appetite?",
          "options": [
            "一直流鼻水／胃口很差",
            "多休息／藥局",
            "發炎／感冒"
          ],
          "answer": "一直流鼻水／胃口很差",
          "explanation": "This retrieves Unit-45 symptom language."
        },
        {
          "id": "u46-review-u45-2",
          "type": "select",
          "prompt": "Which is the Unit-45 duration exchange?",
          "options": [
            "大概多久了？／已經四、五天了。",
            "得吃藥嗎？／去藥局。",
            "哪裡不舒服？／把藥吃了。"
          ],
          "answer": "大概多久了？／已經四、五天了。",
          "explanation": "This is delayed X004 retrieval."
        }
      ]
    }
  ],
  "newVocabulary": [
    {
      "text": "感冒",
      "pinyin": "gǎnmào",
      "meaning": "to have a cold",
      "lessonId": "u46-cold",
      "core": false
    },
    {
      "text": "藥",
      "pinyin": "yào",
      "meaning": "medicine",
      "lessonId": "u46-medicine",
      "core": false
    },
    {
      "text": "藥局",
      "pinyin": "yàojú",
      "meaning": "pharmacy",
      "lessonId": "u46-medicine",
      "core": false
    },
    {
      "text": "拿",
      "pinyin": "ná",
      "meaning": "to get",
      "lessonId": "u46-medicine",
      "core": false
    },
    {
      "text": "把",
      "pinyin": "bǎ",
      "meaning": "disposal marker",
      "lessonId": "u46-ba",
      "core": false
    },
    {
      "text": "別",
      "pinyin": "bié",
      "meaning": "don't (imperative)",
      "lessonId": "u46-ba",
      "core": false
    },
    {
      "text": "水",
      "pinyin": "shuǐ",
      "meaning": "water",
      "lessonId": "u46-recover",
      "core": false
    },
    {
      "text": "休息",
      "pinyin": "xiūxí",
      "meaning": "to rest",
      "lessonId": "u46-recover",
      "core": false
    },
    {
      "text": "睡覺",
      "pinyin": "shuìjiào",
      "meaning": "to sleep",
      "lessonId": "u46-recover",
      "core": false
    },
    {
      "text": "早一點",
      "pinyin": "zǎo yìdiǎn",
      "meaning": "a bit earlier",
      "lessonId": "u46-recover",
      "core": false
    }
  ],
  "reviewVocabulary": [],
  "newCharacters": [
    "感",
    "冒",
    "藥",
    "局",
    "拿",
    "把",
    "休",
    "息",
    "睡"
  ],
  "reviewCharacters": [],
  "characters": {
    "感": {
      "hanzi": "感",
      "pinyin": "gǎn",
      "zhuyin": "ㄍㄢˇ",
      "meaning": "feel; sense",
      "strokes": 13,
      "note": "感 is formally introduced here in 感冒.",
      "memory": "Connect the 13-stroke traditional shape 感 with 感冒 while practicing it.",
      "parts": [
        {
          "label": "感",
          "name": "complete form",
          "role": "Whole-character structure",
          "description": "The complete 感 form used in 感冒; this stroke group covers the whole character.",
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
            11,
            12
          ]
        }
      ],
      "layout": "whole",
      "example": {
        "text": "感冒",
        "pinyin": "gǎnmào",
        "meaning": "have a cold"
      }
    },
    "冒": {
      "hanzi": "冒",
      "pinyin": "mào",
      "zhuyin": "ㄇㄠˋ",
      "meaning": "emit; risk; in 感冒",
      "strokes": 9,
      "note": "冒 is formally introduced here in 感冒.",
      "memory": "Connect the 9-stroke traditional shape 冒 with 感冒 while practicing it.",
      "parts": [
        {
          "label": "冒",
          "name": "complete form",
          "role": "Whole-character structure",
          "description": "The complete 冒 form used in 感冒; this stroke group covers the whole character.",
          "strokes": [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8
          ]
        }
      ],
      "layout": "whole",
      "example": {
        "text": "感冒",
        "pinyin": "gǎnmào",
        "meaning": "have a cold"
      }
    },
    "藥": {
      "hanzi": "藥",
      "pinyin": "yào",
      "zhuyin": "ㄧㄠˋ",
      "meaning": "medicine",
      "strokes": 19,
      "note": "藥 is formally introduced here in 藥.",
      "memory": "Connect the 19-stroke traditional shape 藥 with 藥 while practicing it.",
      "parts": [
        {
          "label": "藥",
          "name": "complete form",
          "role": "Whole-character structure",
          "description": "The complete 藥 form used in 藥; this stroke group covers the whole character.",
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
      "layout": "whole",
      "example": {
        "text": "藥",
        "pinyin": "yào",
        "meaning": "medicine"
      }
    },
    "局": {
      "hanzi": "局",
      "pinyin": "jú",
      "zhuyin": "ㄐㄩˊ",
      "meaning": "office; bureau; in 藥局",
      "strokes": 7,
      "note": "局 is formally introduced here in 藥局.",
      "memory": "Connect the 7-stroke traditional shape 局 with 藥局 while practicing it.",
      "parts": [
        {
          "label": "局",
          "name": "complete form",
          "role": "Whole-character structure",
          "description": "The complete 局 form used in 藥局; this stroke group covers the whole character.",
          "strokes": [
            0,
            1,
            2,
            3,
            4,
            5,
            6
          ]
        }
      ],
      "layout": "whole",
      "example": {
        "text": "藥局",
        "pinyin": "yàojú",
        "meaning": "pharmacy"
      }
    },
    "拿": {
      "hanzi": "拿",
      "pinyin": "ná",
      "zhuyin": "ㄋㄚˊ",
      "meaning": "take; get",
      "strokes": 10,
      "note": "拿 is formally introduced here in 拿藥.",
      "memory": "Connect the 10-stroke traditional shape 拿 with 拿藥 while practicing it.",
      "parts": [
        {
          "label": "拿",
          "name": "complete form",
          "role": "Whole-character structure",
          "description": "The complete 拿 form used in 拿藥; this stroke group covers the whole character.",
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
      "layout": "whole",
      "example": {
        "text": "拿藥",
        "pinyin": "ná yào",
        "meaning": "get medicine"
      }
    },
    "把": {
      "hanzi": "把",
      "pinyin": "bǎ",
      "zhuyin": "ㄅㄚˇ",
      "meaning": "disposal marker",
      "strokes": 7,
      "note": "把 is formally introduced here in 把藥吃了.",
      "memory": "Connect the 7-stroke traditional shape 把 with 把藥吃了 while practicing it.",
      "parts": [
        {
          "label": "把",
          "name": "complete form",
          "role": "Whole-character structure",
          "description": "The complete 把 form used in 把藥吃了; this stroke group covers the whole character.",
          "strokes": [
            0,
            1,
            2,
            3,
            4,
            5,
            6
          ]
        }
      ],
      "layout": "whole",
      "example": {
        "text": "把藥吃了",
        "pinyin": "bǎ yào chī le",
        "meaning": "take the medicine"
      }
    },
    "休": {
      "hanzi": "休",
      "pinyin": "xiū",
      "zhuyin": "ㄒㄧㄡ",
      "meaning": "rest",
      "strokes": 6,
      "note": "休 is formally introduced here in 休息.",
      "memory": "Connect the 6-stroke traditional shape 休 with 休息 while practicing it.",
      "parts": [
        {
          "label": "休",
          "name": "complete form",
          "role": "Whole-character structure",
          "description": "The complete 休 form used in 休息; this stroke group covers the whole character.",
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
      "layout": "whole",
      "example": {
        "text": "休息",
        "pinyin": "xiūxí",
        "meaning": "rest"
      }
    },
    "息": {
      "hanzi": "息",
      "pinyin": "xí",
      "zhuyin": "ㄒㄧˊ",
      "meaning": "rest; breath",
      "strokes": 10,
      "note": "息 is formally introduced here in 休息.",
      "memory": "Connect the 10-stroke traditional shape 息 with 休息 while practicing it.",
      "parts": [
        {
          "label": "息",
          "name": "complete form",
          "role": "Whole-character structure",
          "description": "The complete 息 form used in 休息; this stroke group covers the whole character.",
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
      "layout": "whole",
      "example": {
        "text": "休息",
        "pinyin": "xiūxí",
        "meaning": "rest"
      }
    },
    "睡": {
      "hanzi": "睡",
      "pinyin": "shuì",
      "zhuyin": "ㄕㄨㄟˋ",
      "meaning": "sleep",
      "strokes": 13,
      "note": "睡 is formally introduced here in 睡覺.",
      "memory": "Connect the 13-stroke traditional shape 睡 with 睡覺 while practicing it.",
      "parts": [
        {
          "label": "睡",
          "name": "complete form",
          "role": "Whole-character structure",
          "description": "The complete 睡 form used in 睡覺; this stroke group covers the whole character.",
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
            11,
            12
          ]
        }
      ],
      "layout": "whole",
      "example": {
        "text": "睡覺",
        "pinyin": "shuìjiào",
        "meaning": "sleep"
      }
    }
  },
  "grammarRules": {
    "u46-noncommittal-question-words": {
      "id": "u46-noncommittal-question-words",
      "title": "Negative, non-specific question words",
      "pattern": "NEG + clause containing 什麼 / 多少 / 幾 / 哪裡 / 誰 / 什麼時候",
      "explanation": "In Lesson 15, a question word inside a declarative sentence can avoid a specific commitment. The source rule is always negative and is not the Unit-40 都/也 totality pattern.",
      "examples": [
        {
          "text": "我沒買什麼東西。",
          "pinyin": "Wǒ méi mǎi shénme dōngxi.",
          "meaning": "I didn't buy anything in particular."
        },
        {
          "text": "我沒去哪裡。",
          "pinyin": "Wǒ méi qù nǎlǐ.",
          "meaning": "I didn't go anywhere in particular."
        },
        {
          "text": "她沒有幾個朋友。",
          "pinyin": "Tā méiyǒu jǐ ge péngyǒu.",
          "meaning": "She has only a few friends."
        }
      ],
      "remember": "G001 is negative. Do not add 都/也 merely because a question word appears."
    },
    "u46-ba-disposal": {
      "id": "u46-ba-disposal",
      "title": "Introductory 把 disposal",
      "pattern": "把 + definite/referential object + bare outward-transitive action verb + sentence-final 了",
      "explanation": "Use 把 for what is done to a salient object. At this introductory source boundary, favor definite/referential objects and outward actions such as 吃、喝、寫、賣; source-rejected inward verbs include 買、學. 沒/別 precede 把. Questions use 了沒有 or 是不是.",
      "examples": [
        {
          "text": "我把這個小籠包吃了。",
          "pinyin": "Wǒ bǎ zhège xiǎolóngbāo chī le.",
          "meaning": "I ate this xiaolongbao."
        },
        {
          "text": "別把我的藥吃了。",
          "pinyin": "Bié bǎ wǒ de yào chī le.",
          "meaning": "Don't take my medicine."
        },
        {
          "text": "你把功課寫了沒有？",
          "pinyin": "Nǐ bǎ gōngkè xiě le méiyǒu?",
          "meaning": "Did you finish the homework?"
        }
      ],
      "remember": "Specific object + outward action + source final-了 pattern; 沒/別 before 把."
    }
  },
  "grammarIntroductions": [
    {
      "id": "u46-noncommittal-question-words",
      "kind": "rule",
      "ref": "u46-noncommittal-question-words",
      "lessonId": "u46-nonspecific",
      "stepId": "u46-noncommittal-question-words"
    },
    {
      "id": "u46-ba-disposal",
      "kind": "rule",
      "ref": "u46-ba-disposal",
      "lessonId": "u46-ba",
      "stepId": "u46-ba-disposal"
    }
  ],
  "reviewGrammar": [],
  "phrases": {
    "u46-cold-lex": {
      "text": "感冒",
      "pinyin": "gǎnmào",
      "meaning": "to have/catch a cold",
      "note": "Meaning-first lexical explanation.",
      "tokens": [
        "感冒"
      ]
    },
    "u46-medicine-lex": {
      "text": "藥／藥局／拿",
      "pinyin": "yào / yàojú / ná",
      "meaning": "medicine / pharmacy / get",
      "note": "Meaning-first lexical explanation.",
      "tokens": [
        "藥／藥局／拿"
      ]
    },
    "u46-ba-lex": {
      "text": "別把我的藥吃了。",
      "pinyin": "Bié bǎ wǒ de yào chī le.",
      "meaning": "Don't take my medicine.",
      "note": "Meaning-first explanation: 把 bǎ is the disposal marker; 別 bié gives the negative command.",
      "tokens": [
        "別",
        "把我的藥",
        "吃了"
      ]
    },
    "u46-recover-lex": {
      "text": "水／休息／睡覺／早一點",
      "pinyin": "shuǐ / xiūxí / shuìjiào / zǎo yìdiǎn",
      "meaning": "water / rest / sleep / a bit earlier",
      "note": "Meaning-first lexical explanation; 覺 is jiào in 睡覺.",
      "tokens": [
        "水／休息／睡覺／早一點"
      ]
    },
    "u46-cold-source": {
      "text": "我有一點發燒，是感冒。",
      "pinyin": "Wǒ yǒu yìdiǎn fāshāo, shì gǎnmào.",
      "meaning": "I have a slight fever; it is a cold.",
      "note": "",
      "tokens": [
        "我有一點發燒，是感冒。"
      ]
    },
    "u46-d1t06-fixed": {
      "text": "請問我生的是什麼病？",
      "pinyin": "Qǐngwèn wǒ shēng de shì shénme bìng?",
      "meaning": "May I ask what illness I have?",
      "note": "Fixed source chunk; does not teach G007.",
      "tokens": [
        "請問我生的是什麼病？"
      ]
    },
    "u46-ji-expansion": {
      "text": "她沒有幾個朋友。",
      "pinyin": "Tā méiyǒu jǐ ge péngyǒu.",
      "meaning": "She does not have many friends / has only a few friends.",
      "note": "幾 jǐ was introduced in Unit 7 as the question word “how many?”. In Lesson 15, the same word also means “a few / several” in a statement or other non-question context. This is a semantic expansion of the Unit-7 word, not new vocabulary.",
      "tokens": [
        "她沒有",
        "幾個朋友"
      ]
    },
    "u46-g1-source": {
      "text": "沒有什麼關係。",
      "pinyin": "Méiyǒu shénme guānxi.",
      "meaning": "It's nothing serious / It doesn't matter much.",
      "note": "Contextual G001 source use.",
      "tokens": [
        "沒有什麼關係。"
      ]
    },
    "u46-modal-dei": {
      "text": "得 + V",
      "pinyin": "děi + V",
      "meaning": "must / have to + V",
      "note": "NEW support; distinct from complement 得 de.",
      "tokens": [
        "得 + V"
      ]
    },
    "u46-medicine-question": {
      "text": "請問我得吃藥嗎？",
      "pinyin": "Qǐngwèn wǒ děi chī yào ma?",
      "meaning": "Do I have to take medicine?",
      "note": "",
      "tokens": [
        "請問我得吃藥嗎？"
      ]
    },
    "u46-pharmacy-source": {
      "text": "你到藥局去拿藥。",
      "pinyin": "Nǐ dào yàojú qù ná yào.",
      "meaning": "Go to the pharmacy to get medicine.",
      "note": "",
      "tokens": [
        "你",
        "到藥局去",
        "拿藥"
      ]
    },
    "u46-recovery-source": {
      "text": "回去把藥吃了，多喝水，多休息，早一點睡覺，很快就會好。",
      "pinyin": "Huíqù bǎ yào chī le, duō hē shuǐ, duō xiūxí, zǎo yìdiǎn shuìjiào, hěn kuài jiù huì hǎo.",
      "meaning": "Go back and take the medicine, drink more water, rest more, go to sleep a bit earlier, and you'll get better soon.",
      "note": "G002 + health advice.",
      "tokens": [
        "回去把藥吃了，多喝水，多休息，早一點睡覺，很快就會好。"
      ]
    },
    "u46-honorific-nin": {
      "text": "您",
      "pinyin": "nín",
      "meaning": "polite “you”",
      "note": "Support only; no canonical vocabulary, Search/Mega, or handwriting ownership.",
      "tokens": [
        "您"
      ]
    },
    "u46-thanks-nin": {
      "text": "好的，謝謝您。",
      "pinyin": "Hǎo de, xièxie nín.",
      "meaning": "Okay, thank you.",
      "note": "Source honorific register; 您 remains support-only.",
      "tokens": [
        "好的",
        "謝謝您"
      ],
      "practice": false
    },
    "u46-a004-support-sorry": {
      "text": "對不起",
      "pinyin": "duìbuqǐ",
      "meaning": "sorry",
      "note": "Support only; also explain 不知道 before task 3.",
      "tokens": [
        "對不起"
      ],
      "practice": false
    },
    "u46-a004-response-1": {
      "text": "好的，沒有問題。",
      "pinyin": "Hǎo de, méiyǒu wèntí.",
      "meaning": "Okay, no problem.",
      "note": "Frozen A004 response outcome; learner-visible source transfer only.",
      "tokens": [
        "好的，沒有問題。"
      ],
      "practice": false
    },
    "u46-a004-response-2": {
      "text": "太好了。",
      "pinyin": "Tài hǎo le.",
      "meaning": "Great!",
      "note": "Frozen A004 response outcome; learner-visible source transfer only.",
      "tokens": [
        "太好了。"
      ],
      "practice": false
    },
    "u46-a004-response-3": {
      "text": "對不起，我不知道是你的。",
      "pinyin": "Duìbuqǐ, wǒ bù zhīdào shì nǐ de.",
      "meaning": "Sorry, I didn't know it was yours.",
      "note": "Frozen A004 response outcome; learner-visible source transfer only. 對不起 remains support-only.",
      "tokens": [
        "對不起，我不知道是你的。"
      ],
      "practice": false
    },
    "u46-a004-1": {
      "text": "加油！我們今天一定要把這50個小籠包吃了。",
      "pinyin": "Jiāyóu! Wǒmen jīntiān yídìng yào bǎ zhè wǔshí ge xiǎolóngbāo chī le.",
      "meaning": "Come on! We definitely have to eat these 50 xiaolongbao today.",
      "note": "",
      "tokens": [
        "加油",
        "我們今天一定要",
        "把這50個小籠包",
        "吃了"
      ],
      "grammarIds": [
        "u46-ba-disposal"
      ]
    },
    "u46-a004-2": {
      "text": "要是你把今天的功課寫了，就可以去打籃球。",
      "pinyin": "Yàoshi nǐ bǎ jīntiān de gōngkè xiě le, jiù kěyǐ qù dǎ lánqiú.",
      "meaning": "If you finish today's homework, then you can go play basketball.",
      "note": "",
      "tokens": [
        "要是你",
        "把今天的功課寫了",
        "就可以去打籃球"
      ],
      "grammarIds": [
        "u46-ba-disposal"
      ]
    },
    "u46-a004-3": {
      "text": "誰把我的西瓜吃了？",
      "pinyin": "Shéi bǎ wǒ de xīguā chī le?",
      "meaning": "Who ate my watermelon?",
      "note": "",
      "tokens": [
        "誰",
        "把我的西瓜",
        "吃了"
      ],
      "grammarIds": [
        "u46-ba-disposal"
      ]
    },
    "u46-感-read": {
      "text": "感",
      "pinyin": "gǎn",
      "meaning": "feel; sense",
      "note": "Recognition/read card.",
      "tokens": [
        "感"
      ]
    },
    "u46-冒-read": {
      "text": "冒",
      "pinyin": "mào",
      "meaning": "emit; risk; in 感冒",
      "note": "Recognition/read card.",
      "tokens": [
        "冒"
      ]
    },
    "u46-藥-read": {
      "text": "藥",
      "pinyin": "yào",
      "meaning": "medicine",
      "note": "Recognition/read card.",
      "tokens": [
        "藥"
      ]
    },
    "u46-局-read": {
      "text": "局",
      "pinyin": "jú",
      "meaning": "office; bureau; in 藥局",
      "note": "Recognition/read card.",
      "tokens": [
        "局"
      ]
    },
    "u46-拿-read": {
      "text": "拿",
      "pinyin": "ná",
      "meaning": "take; get",
      "note": "Recognition/read card.",
      "tokens": [
        "拿"
      ]
    },
    "u46-把-read": {
      "text": "把",
      "pinyin": "bǎ",
      "meaning": "disposal marker",
      "note": "Recognition/read card.",
      "tokens": [
        "把"
      ]
    },
    "u46-休-read": {
      "text": "休",
      "pinyin": "xiū",
      "meaning": "rest",
      "note": "Recognition/read card.",
      "tokens": [
        "休"
      ]
    },
    "u46-息-read": {
      "text": "息",
      "pinyin": "xí",
      "meaning": "rest; breath",
      "note": "Recognition/read card.",
      "tokens": [
        "息"
      ]
    },
    "u46-睡-read": {
      "text": "睡",
      "pinyin": "shuì",
      "meaning": "sleep",
      "note": "Recognition/read card.",
      "tokens": [
        "睡"
      ]
    },
    "u46-g1-order": {
      "text": "我沒買什麼東西。",
      "pinyin": "Wǒ méi mǎi shénme dōngxi.",
      "meaning": "I didn't buy anything in particular.",
      "note": "",
      "tokens": [
        "我沒買",
        "什麼東西"
      ],
      "grammarIds": [
        "u46-noncommittal-question-words"
      ]
    },
    "u46-doctor-recovery-question": {
      "text": "請問我的病什麼時候會好？",
      "pinyin": "Qǐngwèn wǒ de bìng shénme shíhou huì hǎo?",
      "meaning": "May I ask when my illness will get better?",
      "note": "",
      "tokens": [
        "請問我的病什麼時候會好？"
      ]
    }
  },
  "revisionStepIds": []
};
export default unit;
