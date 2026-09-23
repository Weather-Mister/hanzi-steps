import type {UnitData} from '../schema.ts';

const unit:UnitData = {
  "schemaVersion": 1,
  "bookId": "book-1",
  "order": 33,
  "unit": {
    "id": "unit-33",
    "number": 33,
    "theme": "indigo",
    "label": "Landlords, repairs & natural speech",
    "title": "Settling Into the New Place",
    "description": "Finish Lesson 11 through the landlord phone call: already/getting used to, household problems, repairs and payment, existential subjects with 有, the likelihood use of 會, and natural omission of understood subjects and objects.",
    "chars": [
      "再",
      "喂",
      "收",
      "已",
      "經",
      "習",
      "慣",
      "器",
      "像",
      "裝",
      "過",
      "付",
      "關",
      "係",
      "線"
    ],
    "lessonIds": [
      "u33-call",
      "u33-settled",
      "u33-heater",
      "u33-install",
      "u33-exists",
      "u33-will-omit",
      "u33-review"
    ],
    "banner": {
      "text": "已經習慣了",
      "pinyin": "Yǐjīng xíguàn le"
    },
    "goal": {
      "text": "熱水器的水好像不熱。今天我會去看看。",
      "pinyin": "Rèshuǐqì de shuǐ hǎoxiàng bú rè. Jīntiān wǒ huì qù kànkan.",
      "meaning": "The water from the water heater doesn't seem hot. I'll go take a look today."
    },
    "grammarIds": [
      "u33-existential-you",
      "u33-hui-likelihood",
      "u33-zero-pronoun"
    ],
    "bookReference": "A Course in Contemporary Chinese 1 · Lesson 11 end of Dialogue I, Dialogue II / Vocabulary II (printed pp. 226–229), and Grammar III–V (printed pp. 232–235). 房租 is transparent after 房 + 租; 不好意思 and 那 'then/in that case' are taught through phrase notes instead of inflating the NEW-word count."
  },
  "reviewLessonId": "u33-review",
  "lessons": [
    {
      "id": "u33-call",
      "title": "Call the Landlord",
      "subtitle": "Finish the first rental dialogue and open the phone call with 再, 喂, and 收到.",
      "chars": [
        "再",
        "喂",
        "收"
      ],
      "minutes": "10–13 min",
      "unitId": "unit-33",
      "review": false,
      "steps": [
        {
          "id": "u33-call-再-intro",
          "type": "intro",
          "char": "再"
        },
        {
          "id": "u33-call-再-trace",
          "type": "trace",
          "char": "再"
        },
        {
          "id": "u33-call-再-build",
          "type": "build",
          "char": "再"
        },
        {
          "id": "u33-call-再-complete",
          "type": "complete",
          "char": "再"
        },
        {
          "id": "u33-call-再-memory",
          "type": "memory",
          "char": "再"
        },
        {
          "id": "u33-call-喂-intro",
          "type": "intro",
          "char": "喂"
        },
        {
          "id": "u33-call-喂-trace",
          "type": "trace",
          "char": "喂"
        },
        {
          "id": "u33-call-喂-build",
          "type": "build",
          "char": "喂"
        },
        {
          "id": "u33-call-喂-complete",
          "type": "complete",
          "char": "喂"
        },
        {
          "id": "u33-call-喂-memory",
          "type": "memory",
          "char": "喂"
        },
        {
          "id": "u33-call-收-intro",
          "type": "intro",
          "char": "收"
        },
        {
          "id": "u33-call-收-trace",
          "type": "trace",
          "char": "收"
        },
        {
          "id": "u33-call-收-build",
          "type": "build",
          "char": "收"
        },
        {
          "id": "u33-call-收-complete",
          "type": "complete",
          "char": "收"
        },
        {
          "id": "u33-call-收-memory",
          "type": "memory",
          "char": "收"
        },
        {
          "id": "u33-call-p1",
          "type": "phrase",
          "phrase": "u33-return-call"
        },
        {
          "id": "u33-call-p2",
          "type": "phrase",
          "phrase": "u33-phone"
        },
        {
          "id": "u33-call-p3",
          "type": "phrase",
          "phrase": "u33-received"
        },
        {
          "id": "u33-call-s1",
          "type": "select",
          "prompt": "Which word orders the later action in 'think, then call'?",
          "options": [
            "再",
            "已經",
            "好像"
          ],
          "answer": "再",
          "explanation": "再 introduces the later action."
        }
      ]
    },
    {
      "id": "u33-settled",
      "title": "Already Settled In",
      "subtitle": "Use 已經, 習慣, and 問題 to report how the new place is going.",
      "chars": [
        "已",
        "經",
        "習",
        "慣"
      ],
      "minutes": "11–14 min",
      "unitId": "unit-33",
      "review": false,
      "steps": [
        {
          "id": "u33-settled-已-intro",
          "type": "intro",
          "char": "已"
        },
        {
          "id": "u33-settled-已-trace",
          "type": "trace",
          "char": "已"
        },
        {
          "id": "u33-settled-已-build",
          "type": "build",
          "char": "已"
        },
        {
          "id": "u33-settled-已-complete",
          "type": "complete",
          "char": "已"
        },
        {
          "id": "u33-settled-已-memory",
          "type": "memory",
          "char": "已"
        },
        {
          "id": "u33-settled-經-intro",
          "type": "intro",
          "char": "經"
        },
        {
          "id": "u33-settled-經-trace",
          "type": "trace",
          "char": "經"
        },
        {
          "id": "u33-settled-經-build",
          "type": "build",
          "char": "經"
        },
        {
          "id": "u33-settled-經-complete",
          "type": "complete",
          "char": "經"
        },
        {
          "id": "u33-settled-經-memory",
          "type": "memory",
          "char": "經"
        },
        {
          "id": "u33-settled-習-intro",
          "type": "intro",
          "char": "習"
        },
        {
          "id": "u33-settled-習-trace",
          "type": "trace",
          "char": "習"
        },
        {
          "id": "u33-settled-習-build",
          "type": "build",
          "char": "習"
        },
        {
          "id": "u33-settled-習-complete",
          "type": "complete",
          "char": "習"
        },
        {
          "id": "u33-settled-習-memory",
          "type": "memory",
          "char": "習"
        },
        {
          "id": "u33-settled-慣-intro",
          "type": "intro",
          "char": "慣"
        },
        {
          "id": "u33-settled-慣-trace",
          "type": "trace",
          "char": "慣"
        },
        {
          "id": "u33-settled-慣-build",
          "type": "build",
          "char": "慣"
        },
        {
          "id": "u33-settled-慣-complete",
          "type": "complete",
          "char": "慣"
        },
        {
          "id": "u33-settled-慣-memory",
          "type": "memory",
          "char": "慣"
        },
        {
          "id": "u33-settled-p1",
          "type": "phrase",
          "phrase": "u33-habit"
        },
        {
          "id": "u33-settled-p2",
          "type": "phrase",
          "phrase": "u33-problem"
        },
        {
          "id": "u33-settled-s1",
          "type": "select",
          "prompt": "已經 means…",
          "options": [
            "already",
            "however",
            "apparently"
          ],
          "answer": "already",
          "explanation": "已經 is the adverb 'already'."
        },
        {
          "id": "u33-settled-s2",
          "type": "select",
          "prompt": "習慣 means…",
          "options": [
            "get used to; be accustomed to",
            "install",
            "receive"
          ],
          "answer": "get used to; be accustomed to",
          "explanation": "習慣 is to get used to or be accustomed to something."
        }
      ]
    },
    {
      "id": "u33-heater",
      "title": "The Water Doesn't Seem Hot",
      "subtitle": "Use 熱水器 and the softening expression 好像.",
      "chars": [
        "器",
        "像"
      ],
      "minutes": "9–12 min",
      "unitId": "unit-33",
      "review": false,
      "steps": [
        {
          "id": "u33-heater-器-intro",
          "type": "intro",
          "char": "器"
        },
        {
          "id": "u33-heater-器-trace",
          "type": "trace",
          "char": "器"
        },
        {
          "id": "u33-heater-器-build",
          "type": "build",
          "char": "器"
        },
        {
          "id": "u33-heater-器-complete",
          "type": "complete",
          "char": "器"
        },
        {
          "id": "u33-heater-器-memory",
          "type": "memory",
          "char": "器"
        },
        {
          "id": "u33-heater-像-intro",
          "type": "intro",
          "char": "像"
        },
        {
          "id": "u33-heater-像-trace",
          "type": "trace",
          "char": "像"
        },
        {
          "id": "u33-heater-像-build",
          "type": "build",
          "char": "像"
        },
        {
          "id": "u33-heater-像-complete",
          "type": "complete",
          "char": "像"
        },
        {
          "id": "u33-heater-像-memory",
          "type": "memory",
          "char": "像"
        },
        {
          "id": "u33-heater-p1",
          "type": "phrase",
          "phrase": "u33-heater"
        },
        {
          "id": "u33-heater-s1",
          "type": "select",
          "prompt": "What does 好像 do in the complaint?",
          "options": [
            "softens it to 'seems/apparently'",
            "makes it a command",
            "means already"
          ],
          "answer": "softens it to 'seems/apparently'",
          "explanation": "好像 expresses an appearance or impression and often softens a comment."
        },
        {
          "id": "u33-heater-s2",
          "type": "select",
          "prompt": "Which item is a water heater?",
          "options": [
            "熱水器",
            "有線電視",
            "房租"
          ],
          "answer": "熱水器",
          "explanation": "熱水器 is a water heater."
        }
      ]
    },
    {
      "id": "u33-install",
      "title": "Install It, but Pay Yourself",
      "subtitle": "Ask for cable TV, then use 不過 to introduce the landlord's condition.",
      "chars": [
        "裝",
        "過",
        "付",
        "線"
      ],
      "minutes": "11–14 min",
      "unitId": "unit-33",
      "review": false,
      "steps": [
        {
          "id": "u33-install-裝-intro",
          "type": "intro",
          "char": "裝"
        },
        {
          "id": "u33-install-裝-trace",
          "type": "trace",
          "char": "裝"
        },
        {
          "id": "u33-install-裝-build",
          "type": "build",
          "char": "裝"
        },
        {
          "id": "u33-install-裝-complete",
          "type": "complete",
          "char": "裝"
        },
        {
          "id": "u33-install-裝-memory",
          "type": "memory",
          "char": "裝"
        },
        {
          "id": "u33-install-過-intro",
          "type": "intro",
          "char": "過"
        },
        {
          "id": "u33-install-過-trace",
          "type": "trace",
          "char": "過"
        },
        {
          "id": "u33-install-過-build",
          "type": "build",
          "char": "過"
        },
        {
          "id": "u33-install-過-complete",
          "type": "complete",
          "char": "過"
        },
        {
          "id": "u33-install-過-memory",
          "type": "memory",
          "char": "過"
        },
        {
          "id": "u33-install-付-intro",
          "type": "intro",
          "char": "付"
        },
        {
          "id": "u33-install-付-trace",
          "type": "trace",
          "char": "付"
        },
        {
          "id": "u33-install-付-build",
          "type": "build",
          "char": "付"
        },
        {
          "id": "u33-install-付-complete",
          "type": "complete",
          "char": "付"
        },
        {
          "id": "u33-install-付-memory",
          "type": "memory",
          "char": "付"
        },
        {
          "id": "u33-install-線-intro",
          "type": "intro",
          "char": "線"
        },
        {
          "id": "u33-install-線-trace",
          "type": "trace",
          "char": "線"
        },
        {
          "id": "u33-install-線-build",
          "type": "build",
          "char": "線"
        },
        {
          "id": "u33-install-線-complete",
          "type": "complete",
          "char": "線"
        },
        {
          "id": "u33-install-線-memory",
          "type": "memory",
          "char": "線"
        },
        {
          "id": "u33-install-p1",
          "type": "phrase",
          "phrase": "u33-install"
        },
        {
          "id": "u33-install-p2",
          "type": "phrase",
          "phrase": "u33-pay"
        },
        {
          "id": "u33-install-s1",
          "type": "select",
          "prompt": "Which connector means 'however / but'?",
          "options": [
            "不過",
            "已經",
            "好像"
          ],
          "answer": "不過",
          "explanation": "不過 introduces a contrast."
        },
        {
          "id": "u33-install-s2",
          "type": "select",
          "prompt": "付 means…",
          "options": [
            "pay",
            "install",
            "wait"
          ],
          "answer": "pay",
          "explanation": "付 is to pay."
        }
      ]
    },
    {
      "id": "u33-exists",
      "title": "Someone Lives Here",
      "subtitle": "Respond politely with 沒關係, then learn why an indefinite subject is introduced with 有.",
      "chars": [
        "關",
        "係"
      ],
      "minutes": "9–12 min",
      "unitId": "unit-33",
      "review": false,
      "steps": [
        {
          "id": "u33-exists-關-intro",
          "type": "intro",
          "char": "關"
        },
        {
          "id": "u33-exists-關-trace",
          "type": "trace",
          "char": "關"
        },
        {
          "id": "u33-exists-關-build",
          "type": "build",
          "char": "關"
        },
        {
          "id": "u33-exists-關-complete",
          "type": "complete",
          "char": "關"
        },
        {
          "id": "u33-exists-關-memory",
          "type": "memory",
          "char": "關"
        },
        {
          "id": "u33-exists-係-intro",
          "type": "intro",
          "char": "係"
        },
        {
          "id": "u33-exists-係-trace",
          "type": "trace",
          "char": "係"
        },
        {
          "id": "u33-exists-係-build",
          "type": "build",
          "char": "係"
        },
        {
          "id": "u33-exists-係-complete",
          "type": "complete",
          "char": "係"
        },
        {
          "id": "u33-exists-係-memory",
          "type": "memory",
          "char": "係"
        },
        {
          "id": "u33-exists-p0",
          "type": "phrase",
          "phrase": "u33-sorry"
        },
        {
          "id": "u33-exists-p1",
          "type": "phrase",
          "phrase": "u33-no-problem"
        },
        {
          "id": "u33-exists-g1",
          "type": "grammar",
          "grammar": "u33-existential-you"
        },
        {
          "id": "u33-exists-p2",
          "type": "phrase",
          "phrase": "u33-exist"
        },
        {
          "id": "u33-exists-p3",
          "type": "phrase",
          "phrase": "u33-noexist"
        },
        {
          "id": "u33-exists-p4",
          "type": "phrase",
          "phrase": "u33-location-exist"
        },
        {
          "id": "u33-exists-s1",
          "type": "select",
          "prompt": "How do you negate existential 有 in 'no one lives here'?",
          "options": [
            "沒有人住這裡",
            "不有人住這裡"
          ],
          "answer": "沒有人住這裡",
          "explanation": "Existential 有 is negated with 沒有.",
          "grammarIds": [
            "u33-existential-you"
          ]
        }
      ]
    },
    {
      "id": "u33-will-omit",
      "title": "Will It Happen? Say Only What You Need",
      "subtitle": "Distinguish the two 會 meanings, use 那 as 'then/in that case,' and omit recoverable subjects or objects.",
      "chars": [],
      "minutes": "10–13 min",
      "unitId": "unit-33",
      "review": false,
      "steps": [
        {
          "id": "u33-will-p0",
          "type": "phrase",
          "phrase": "u33-then"
        },
        {
          "id": "u33-will-g1",
          "type": "grammar",
          "grammar": "u33-hui-likelihood"
        },
        {
          "id": "u33-will-p1",
          "type": "phrase",
          "phrase": "u33-will-check"
        },
        {
          "id": "u33-will-s1",
          "type": "select",
          "prompt": "In 明天我會去看看, what kind of 會 is this?",
          "options": [
            "future likelihood / will",
            "acquired skill"
          ],
          "answer": "future likelihood / will",
          "explanation": "The future time expression and event reading point to likelihood.",
          "grammarIds": [
            "u33-hui-likelihood"
          ]
        },
        {
          "id": "u33-will-g2",
          "type": "grammar",
          "grammar": "u33-zero-pronoun"
        },
        {
          "id": "u33-will-p2",
          "type": "phrase",
          "phrase": "u33-omit-subject"
        },
        {
          "id": "u33-will-p3",
          "type": "phrase",
          "phrase": "u33-omit-object"
        },
        {
          "id": "u33-will-s2",
          "type": "select",
          "prompt": "In 朋友給我一個西瓜，我不想吃, what is omitted after 吃?",
          "options": [
            "西瓜",
            "朋友",
            "我"
          ],
          "answer": "西瓜",
          "explanation": "The object 西瓜 was just mentioned and is recoverable.",
          "grammarIds": [
            "u33-zero-pronoun"
          ]
        }
      ]
    },
    {
      "id": "u33-review",
      "title": "Unit 33 Review",
      "subtitle": "Phone calls with the landlord, settling in, problems and repairs, indefinite subjects, two kinds of 會, and natural omission.",
      "chars": [],
      "minutes": "12–16 min",
      "unitId": "unit-33",
      "review": true,
      "steps": [
        {
          "id": "u33-review-p1",
          "type": "phrase",
          "phrase": "u33-return-call"
        },
        {
          "id": "u33-review-p2",
          "type": "phrase",
          "phrase": "u33-received"
        },
        {
          "id": "u33-review-p3",
          "type": "phrase",
          "phrase": "u33-habit"
        },
        {
          "id": "u33-review-p4",
          "type": "phrase",
          "phrase": "u33-problem"
        },
        {
          "id": "u33-review-p5",
          "type": "phrase",
          "phrase": "u33-heater"
        },
        {
          "id": "u33-review-p6",
          "type": "phrase",
          "phrase": "u33-install"
        },
        {
          "id": "u33-review-p7",
          "type": "phrase",
          "phrase": "u33-pay"
        },
        {
          "id": "u33-review-p8",
          "type": "phrase",
          "phrase": "u33-no-problem"
        },
        {
          "id": "u33-review-s1",
          "type": "select",
          "prompt": "Which phone greeting is used here?",
          "options": [
            "喂",
            "再",
            "付"
          ],
          "answer": "喂",
          "explanation": "喂 is the phone greeting."
        },
        {
          "id": "u33-review-s2",
          "type": "select",
          "prompt": "Which word means 'already'?",
          "options": [
            "已經",
            "不過",
            "好像"
          ],
          "answer": "已經",
          "explanation": "已經 means already."
        },
        {
          "id": "u33-review-g1",
          "type": "select",
          "prompt": "Which sentence correctly introduces an indefinite subject?",
          "options": [
            "有人住這裡。",
            "人住這裡。"
          ],
          "answer": "有人住這裡。",
          "explanation": "Use 有 before a new indefinite subject.",
          "grammarIds": [
            "u33-existential-you"
          ]
        },
        {
          "id": "u33-review-g2",
          "type": "select",
          "prompt": "Which 會 is a future-likelihood use?",
          "options": [
            "我明天會去看看。",
            "他會做飯。"
          ],
          "answer": "我明天會去看看。",
          "explanation": "明天 plus a future event gives the likelihood/will reading.",
          "grammarIds": [
            "u33-hui-likelihood"
          ]
        },
        {
          "id": "u33-review-g3",
          "type": "select",
          "prompt": "What is omitted in 我喜歡茶，也喜歡咖啡?",
          "options": [
            "the second subject 我",
            "the object 茶",
            "the verb 喜歡"
          ],
          "answer": "the second subject 我",
          "explanation": "The subject remains the same and is recoverable.",
          "grammarIds": [
            "u33-zero-pronoun"
          ]
        },
        {
          "id": "u33-review-o1",
          "type": "order",
          "phrase": "u33-install",
          "tokens": [
            "裝有線電視嗎",
            "可以幫我"
          ]
        },
        {
          "id": "u33-review-o2",
          "type": "order",
          "phrase": "u33-return-call",
          "tokens": [
            "再打電話給你",
            "我回去想想"
          ]
        },
        {
          "id": "u33-review-l1",
          "type": "listen",
          "char": "像",
          "prompt": "Listen for the softening expression.",
          "audioText": "熱水器的水好像不熱。",
          "options": [
            "好像",
            "已經",
            "不過"
          ],
          "answer": "好像",
          "explanation": "好像 means it seems/apparently."
        },
        {
          "id": "u33-review-l2",
          "type": "listen",
          "char": "收",
          "prompt": "Listen for what has already happened.",
          "audioText": "我已經收到房租了。",
          "options": [
            "收到",
            "習慣",
            "裝"
          ],
          "answer": "收到",
          "explanation": "收到 means receive."
        },
        {
          "id": "u33-review-l3",
          "type": "listen",
          "char": "付",
          "prompt": "Listen for the payment action.",
          "audioText": "不過你要自己付錢。",
          "options": [
            "付",
            "裝",
            "等"
          ],
          "answer": "付",
          "explanation": "付 means pay."
        },
        {
          "id": "u33-review-m1",
          "type": "memory",
          "char": "經"
        },
        {
          "id": "u33-review-m2",
          "type": "memory",
          "char": "關"
        },
        {
          "id": "u33-review-m3",
          "type": "memory",
          "char": "線"
        },
        {
          "id": "u33-review-p9",
          "type": "phrase",
          "phrase": "u33-phone"
        }
      ]
    }
  ],
  "newVocabulary": [
    {
      "text": "再",
      "pinyin": "zài",
      "meaning": "then; again",
      "lessonId": "u33-call",
      "core": true
    },
    {
      "text": "喂",
      "pinyin": "wèi",
      "meaning": "hello (especially on the phone)",
      "lessonId": "u33-call",
      "core": true
    },
    {
      "text": "收到",
      "pinyin": "shōudào",
      "meaning": "to receive",
      "lessonId": "u33-call",
      "core": true
    },
    {
      "text": "已經",
      "pinyin": "yǐjīng",
      "meaning": "already",
      "lessonId": "u33-settled",
      "core": true
    },
    {
      "text": "習慣",
      "pinyin": "xíguàn",
      "meaning": "to get used to; be accustomed to",
      "lessonId": "u33-settled",
      "core": true
    },
    {
      "text": "問題",
      "pinyin": "wèntí",
      "meaning": "problem; question",
      "lessonId": "u33-settled",
      "core": true
    },
    {
      "text": "熱水器",
      "pinyin": "rèshuǐqì",
      "meaning": "water heater",
      "lessonId": "u33-heater",
      "core": true
    },
    {
      "text": "好像",
      "pinyin": "hǎoxiàng",
      "meaning": "seem; appear to be",
      "lessonId": "u33-heater",
      "core": true
    },
    {
      "text": "裝",
      "pinyin": "zhuāng",
      "meaning": "to install",
      "lessonId": "u33-install",
      "core": true
    },
    {
      "text": "不過",
      "pinyin": "búguò",
      "meaning": "however; but",
      "lessonId": "u33-install",
      "core": true
    },
    {
      "text": "付",
      "pinyin": "fù",
      "meaning": "to pay",
      "lessonId": "u33-install",
      "core": true
    },
    {
      "text": "有線電視",
      "pinyin": "yǒuxiàn diànshì",
      "meaning": "cable TV",
      "lessonId": "u33-install",
      "core": true
    },
    {
      "text": "沒關係",
      "pinyin": "méi guānxì",
      "meaning": "no problem; it doesn't matter",
      "lessonId": "u33-exists",
      "core": true
    }
  ],
  "reviewVocabulary": [
    "電話",
    "房東",
    "租",
    "套房",
    "間",
    "來",
    "有",
    "會",
    "等",
    "那"
  ],
  "newCharacters": [
    "再",
    "喂",
    "收",
    "已",
    "經",
    "習",
    "慣",
    "器",
    "像",
    "裝",
    "過",
    "付",
    "關",
    "係",
    "線"
  ],
  "reviewCharacters": [],
  "characters": {
    "再": {
      "hanzi": "再",
      "pinyin": "zài",
      "zhuyin": "ㄗㄞˋ",
      "meaning": "then; again",
      "strokes": 6,
      "layout": "stack",
      "note": "再 is fourth-tone zài. In this lesson it orders a later action: think first, then call.",
      "memory": "A single top bar sits over 冉. The lower frame is crossed by a central vertical and finishes with the long horizontal.",
      "parts": [
        {
          "label": "一",
          "name": "top bar",
          "role": "Top component",
          "description": "Begin with the single horizontal roof.",
          "strokes": [
            0
          ]
        },
        {
          "label": "冉",
          "name": "lower structure",
          "role": "Lower component",
          "description": "The remaining five strokes form 冉 below the roof.",
          "strokes": [
            1,
            2,
            3,
            4,
            5
          ]
        }
      ],
      "example": {
        "text": "再打電話",
        "pinyin": "zài dǎ diànhuà",
        "meaning": "then make a phone call"
      }
    },
    "喂": {
      "hanzi": "喂",
      "pinyin": "wèi",
      "zhuyin": "ㄨㄟˋ",
      "meaning": "hello (especially on the phone)",
      "strokes": 12,
      "layout": "side",
      "note": "喂 is fourth-tone wèi here, the conventional way to answer or address someone on the phone.",
      "memory": "口 is a compact three-stroke block on the left; 畏 fills the taller right side.",
      "parts": [
        {
          "label": "口",
          "name": "mouth component",
          "role": "Left component",
          "description": "The first three strokes form 口.",
          "strokes": [
            0,
            1,
            2
          ]
        },
        {
          "label": "畏",
          "name": "right component",
          "role": "Right component",
          "description": "The final nine strokes form 畏 on the right.",
          "strokes": [
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
      "example": {
        "text": "喂，你好。",
        "pinyin": "Wèi, nǐ hǎo.",
        "meaning": "Hello?"
      }
    },
    "收": {
      "hanzi": "收",
      "pinyin": "shōu",
      "zhuyin": "ㄕㄡ",
      "meaning": "receive; collect",
      "strokes": 6,
      "layout": "side",
      "note": "收 is first-tone shōu. In 收到, it combines with 到 to mean receive.",
      "memory": "The two-stroke left shape stays narrow; 攵 uses four active strokes on the right.",
      "parts": [
        {
          "label": "丩",
          "name": "left shape",
          "role": "Left component",
          "description": "The first two strokes form the narrow left group.",
          "strokes": [
            0,
            1
          ]
        },
        {
          "label": "攵",
          "name": "action component",
          "role": "Right component",
          "description": "The final four strokes form 攵.",
          "strokes": [
            2,
            3,
            4,
            5
          ]
        }
      ],
      "example": {
        "text": "收到",
        "pinyin": "shōudào",
        "meaning": "to receive"
      }
    },
    "已": {
      "hanzi": "已",
      "pinyin": "yǐ",
      "zhuyin": "ㄧˇ",
      "meaning": "already; already in 已經",
      "strokes": 3,
      "layout": "whole",
      "note": "已 is third-tone yǐ. It is the first character of 已經, “already.”",
      "memory": "已 is a compact three-stroke bent shape. Keep the final rising stroke inside the upper bend rather than closing a box.",
      "parts": [
        {
          "label": "已",
          "name": "whole character",
          "role": "Whole character",
          "description": "All three strokes form one compact bent character.",
          "strokes": [
            0,
            1,
            2
          ]
        }
      ],
      "example": {
        "text": "已經",
        "pinyin": "yǐjīng",
        "meaning": "already"
      }
    },
    "經": {
      "hanzi": "經",
      "pinyin": "jīng",
      "zhuyin": "ㄐㄧㄥ",
      "meaning": "pass through; second character of 已經",
      "strokes": 13,
      "layout": "side",
      "note": "經 is first-tone jīng. In 已經 it completes the fixed adverb meaning “already.”",
      "memory": "糹 forms six thread strokes on the left; 巠 forms the seven-stroke right block.",
      "parts": [
        {
          "label": "糹",
          "name": "thread component",
          "role": "Left component",
          "description": "The first six strokes form 糹.",
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
          "label": "巠",
          "name": "right component",
          "role": "Right component",
          "description": "The final seven strokes form 巠.",
          "strokes": [
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
        "text": "已經",
        "pinyin": "yǐjīng",
        "meaning": "already"
      }
    },
    "習": {
      "hanzi": "習",
      "pinyin": "xí",
      "zhuyin": "ㄒㄧˊ",
      "meaning": "practice; get used to",
      "strokes": 11,
      "layout": "stack",
      "note": "習 is second-tone xí. In 習慣 it is part of the verb “to get used to; be accustomed to.”",
      "memory": "羽 forms two wing-like groups across the top; 白 is the five-stroke block underneath.",
      "parts": [
        {
          "label": "羽",
          "name": "feather component",
          "role": "Top component",
          "description": "The first six strokes form 羽.",
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
          "label": "白",
          "name": "white component",
          "role": "Bottom component",
          "description": "The final five strokes form 白.",
          "strokes": [
            6,
            7,
            8,
            9,
            10
          ]
        }
      ],
      "example": {
        "text": "習慣",
        "pinyin": "xíguàn",
        "meaning": "to get used to"
      }
    },
    "慣": {
      "hanzi": "慣",
      "pinyin": "guàn",
      "zhuyin": "ㄍㄨㄢˋ",
      "meaning": "accustomed; second character of 習慣",
      "strokes": 14,
      "layout": "side",
      "note": "慣 is fourth-tone guàn. Learn 習慣 as the complete word “to get used to; be accustomed to.”",
      "memory": "忄 supplies three narrow heart strokes on the left; 貫 fills the denser eleven-stroke right side.",
      "parts": [
        {
          "label": "忄",
          "name": "heart component",
          "role": "Left component",
          "description": "The first three strokes form 忄.",
          "strokes": [
            0,
            1,
            2
          ]
        },
        {
          "label": "貫",
          "name": "right component",
          "role": "Right component",
          "description": "The final eleven strokes form 貫.",
          "strokes": [
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
            13
          ]
        }
      ],
      "example": {
        "text": "習慣",
        "pinyin": "xíguàn",
        "meaning": "to get used to"
      }
    },
    "器": {
      "hanzi": "器",
      "pinyin": "qì",
      "zhuyin": "ㄑㄧˋ",
      "meaning": "device; appliance",
      "strokes": 16,
      "layout": "stack",
      "note": "器 is fourth-tone qì. In 熱水器 it means an appliance or device: a water heater.",
      "memory": "Four 口 boxes surround 犬 in the middle. Keep the top pair and bottom pair balanced around the central four strokes.",
      "parts": [
        {
          "label": "口",
          "name": "upper-left mouth",
          "role": "Top-left component",
          "description": "The first three strokes form the upper-left 口.",
          "strokes": [
            0,
            1,
            2
          ]
        },
        {
          "label": "口",
          "name": "upper-right mouth",
          "role": "Top-right component",
          "description": "The next three strokes form the upper-right 口.",
          "strokes": [
            3,
            4,
            5
          ]
        },
        {
          "label": "犬",
          "name": "central component",
          "role": "Middle component",
          "description": "Four strokes form 犬 in the middle.",
          "strokes": [
            6,
            7,
            8,
            9
          ]
        },
        {
          "label": "口",
          "name": "lower-left mouth",
          "role": "Bottom-left component",
          "description": "The next three strokes form the lower-left 口.",
          "strokes": [
            10,
            11,
            12
          ]
        },
        {
          "label": "口",
          "name": "lower-right mouth",
          "role": "Bottom-right component",
          "description": "The final three strokes form the lower-right 口.",
          "strokes": [
            13,
            14,
            15
          ]
        }
      ],
      "example": {
        "text": "熱水器",
        "pinyin": "rèshuǐqì",
        "meaning": "water heater"
      }
    },
    "像": {
      "hanzi": "像",
      "pinyin": "xiàng",
      "zhuyin": "ㄒㄧㄤˋ",
      "meaning": "seem; resemble",
      "strokes": 13,
      "layout": "side",
      "note": "像 is fourth-tone xiàng. In 好像 it helps express “seem; appear to be,” often softening a comment.",
      "memory": "亻 is the narrow two-stroke person component; 象 fills the eleven-stroke right side.",
      "parts": [
        {
          "label": "亻",
          "name": "person component",
          "role": "Left component",
          "description": "The first two strokes form 亻.",
          "strokes": [
            0,
            1
          ]
        },
        {
          "label": "象",
          "name": "elephant component",
          "role": "Right component",
          "description": "The final eleven strokes form 象.",
          "strokes": [
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
      "example": {
        "text": "好像",
        "pinyin": "hǎoxiàng",
        "meaning": "seem; appear to be"
      }
    },
    "裝": {
      "hanzi": "裝",
      "pinyin": "zhuāng",
      "zhuyin": "ㄓㄨㄤ",
      "meaning": "install; outfit",
      "strokes": 13,
      "layout": "stack",
      "note": "裝 is first-tone zhuāng. In the rental dialogue it is the verb “to install,” as in installing cable TV.",
      "memory": "壯 forms the seven-stroke upper block; 衣 supplies the six lower strokes.",
      "parts": [
        {
          "label": "壯",
          "name": "upper component",
          "role": "Top component",
          "description": "The first seven strokes form 壯.",
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
          "label": "衣",
          "name": "clothing component",
          "role": "Bottom component",
          "description": "The final six strokes form 衣.",
          "strokes": [
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
        "text": "裝有線電視",
        "pinyin": "zhuāng yǒuxiàn diànshì",
        "meaning": "install cable TV"
      }
    },
    "過": {
      "hanzi": "過",
      "pinyin": "guò",
      "zhuyin": "ㄍㄨㄛˋ",
      "meaning": "pass; in 不過 'however'",
      "strokes": 13,
      "layout": "side",
      "note": "過 is fourth-tone guò. Here it appears inside 不過, “however/but”; that use is different from the later direction verb 過 “go past.”",
      "memory": "Build the nine-stroke 咼 first; then add the four-stroke movement component 辶, whose final sweep runs underneath.",
      "parts": [
        {
          "label": "咼",
          "name": "inner component",
          "role": "Inner component",
          "description": "The first nine strokes form 咼.",
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
        },
        {
          "label": "辶",
          "name": "movement component",
          "role": "Wrapping component",
          "description": "The final four strokes form 辶 and sweep under the inner block.",
          "strokes": [
            9,
            10,
            11,
            12
          ]
        }
      ],
      "example": {
        "text": "不過",
        "pinyin": "búguò",
        "meaning": "however; but"
      },
      "layoutLabel": "Wraparound",
      "partOrderLabel": "inner 咼, then wrapping 辶"
    },
    "付": {
      "hanzi": "付",
      "pinyin": "fù",
      "zhuyin": "ㄈㄨˋ",
      "meaning": "pay; hand over",
      "strokes": 5,
      "layout": "side",
      "note": "付 is fourth-tone fù. In this lesson it means to pay money.",
      "memory": "亻 takes two strokes on the left; 寸 uses the final three strokes on the right.",
      "parts": [
        {
          "label": "亻",
          "name": "person component",
          "role": "Left component",
          "description": "The first two strokes form 亻.",
          "strokes": [
            0,
            1
          ]
        },
        {
          "label": "寸",
          "name": "inch component",
          "role": "Right component",
          "description": "The final three strokes form 寸.",
          "strokes": [
            2,
            3,
            4
          ]
        }
      ],
      "example": {
        "text": "付錢",
        "pinyin": "fù qián",
        "meaning": "pay money"
      }
    },
    "關": {
      "hanzi": "關",
      "pinyin": "guān",
      "zhuyin": "ㄍㄨㄢ",
      "meaning": "relation; concern",
      "strokes": 19,
      "layout": "stack",
      "note": "關 is first-tone guān. In 沒關係, the whole expression means “it doesn't matter / no problem.”",
      "memory": "The eight-stroke 門 creates the outer door frame; the remaining eleven strokes form the compact inner structure.",
      "parts": [
        {
          "label": "門",
          "name": "door frame",
          "role": "Outer component",
          "description": "The first eight strokes form 門.",
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
          "label": "inner",
          "name": "inner structure",
          "role": "Inner component",
          "description": "The final eleven strokes fill the space inside the door frame.",
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
            18
          ]
        }
      ],
      "example": {
        "text": "沒關係",
        "pinyin": "méi guānxì",
        "meaning": "no problem; it doesn't matter"
      }
    },
    "係": {
      "hanzi": "係",
      "pinyin": "xì",
      "zhuyin": "ㄒㄧˋ",
      "meaning": "relation; connection",
      "strokes": 9,
      "layout": "side",
      "note": "係 is fourth-tone xì. It is the final character of 沒關係.",
      "memory": "亻 is the two-stroke left component; 系 supplies the seven-stroke right side.",
      "parts": [
        {
          "label": "亻",
          "name": "person component",
          "role": "Left component",
          "description": "The first two strokes form 亻.",
          "strokes": [
            0,
            1
          ]
        },
        {
          "label": "系",
          "name": "thread-related component",
          "role": "Right component",
          "description": "The final seven strokes form 系.",
          "strokes": [
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
      "example": {
        "text": "沒關係",
        "pinyin": "méi guānxì",
        "meaning": "no problem; it doesn't matter"
      }
    },
    "線": {
      "hanzi": "線",
      "pinyin": "xiàn",
      "zhuyin": "ㄒㄧㄢˋ",
      "meaning": "line; cable",
      "strokes": 15,
      "layout": "side",
      "note": "線 is fourth-tone xiàn. In 有線電視 it refers to a cable or wired line.",
      "memory": "糹 makes the six-stroke thread component on the left; 泉 makes the nine-stroke right block.",
      "parts": [
        {
          "label": "糹",
          "name": "thread component",
          "role": "Left component",
          "description": "The first six strokes form 糹.",
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
          "label": "泉",
          "name": "spring component",
          "role": "Right component",
          "description": "The final nine strokes form 泉.",
          "strokes": [
            6,
            7,
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
      "example": {
        "text": "有線電視",
        "pinyin": "yǒuxiàn diànshì",
        "meaning": "cable TV"
      }
    }
  },
  "grammarRules": {
    "u33-existential-you": {
      "id": "u33-existential-you",
      "title": "Introduce an indefinite subject with 有",
      "pattern": "有 + indefinite person / thing + VP",
      "explanation": "When the subject is indefinite—someone, some students, a person not already identified—Lesson 11 introduces it with 有 before describing what it does: 有人住這裡. Negate existential 有 with 沒有: 沒有人住. You can also say location + 有 + NP to set the location as the topic, or 有 + NP + 在 + location to introduce the person/thing first; the existence is similar but the information focus differs.",
      "examples": [
        {
          "text": "有人住這裡。",
          "pinyin": "Yǒu rén zhù zhèlǐ.",
          "meaning": "Someone lives here."
        },
        {
          "text": "有兩個學生來找你。",
          "pinyin": "Yǒu liǎng ge xuéshēng lái zhǎo nǐ.",
          "meaning": "Two students came to look for you."
        },
        {
          "text": "沒有人住這裡。",
          "pinyin": "Méiyǒu rén zhù zhèlǐ.",
          "meaning": "No one lives here."
        },
        {
          "text": "有一個人在這裡。",
          "pinyin": "Yǒu yí ge rén zài zhèlǐ.",
          "meaning": "There is a person here."
        }
      ],
      "remember": "Use 有 to introduce an indefinite subject; use 沒有 for its negative. Do not place a bare new indefinite subject at the front as if it were already known.",
      "words": [
        "有",
        "沒有"
      ]
    },
    "u33-hui-likelihood": {
      "id": "u33-hui-likelihood",
      "title": "會: learned skill or likelihood?",
      "pattern": "會 + VP",
      "explanation": "You already know 會 for an acquired skill: 他會做飯 means he knows how to cook. Lesson 11 adds 會 for likelihood or an expected future event, often with a future time expression: 我明天會去看看. Context tells the two uses apart. The negative 不會 can likewise mean either 'doesn't know how' or 'probably/will not.'",
      "examples": [
        {
          "text": "他會做飯。",
          "pinyin": "Tā huì zuòfàn.",
          "meaning": "He knows how to cook."
        },
        {
          "text": "我明天會去看看。",
          "pinyin": "Wǒ míngtiān huì qù kànkan.",
          "meaning": "I'll go take a look tomorrow."
        },
        {
          "text": "他明天不會來。",
          "pinyin": "Tā míngtiān bú huì lái.",
          "meaning": "He won't / probably won't come tomorrow."
        }
      ],
      "remember": "With a learned activity, 會 can mean know how. With a future event, 會 can mean will / be likely to. Read the whole context.",
      "words": [
        "會"
      ]
    },
    "u33-zero-pronoun": {
      "id": "u33-zero-pronoun",
      "title": "Leave understood subjects and objects unspoken",
      "pattern": "recoverable subject / object → Ø",
      "explanation": "Chinese often omits old information that is already clear from the situation or a previous clause. The omitted element can be a subject or an object. In 我喜歡茶，也喜歡咖啡, the second 我 is understood. In 朋友給我一個西瓜，我不想吃, 西瓜 is the understood object of 吃. Omit only information the listener can reliably recover; keep it when omission would be ambiguous.",
      "examples": [
        {
          "text": "我喜歡茶，也喜歡咖啡。",
          "pinyin": "Wǒ xǐhuān chá, yě xǐhuān kāfēi.",
          "meaning": "I like tea, and I also like coffee."
        },
        {
          "text": "朋友給我一個西瓜，我不想吃。",
          "pinyin": "Péngyǒu gěi wǒ yí ge xīguā, wǒ bù xiǎng chī.",
          "meaning": "A friend gave me a watermelon; I don't want to eat it."
        },
        {
          "text": "這間房間很好，我想租。",
          "pinyin": "Zhè jiān fángjiān hěn hǎo, wǒ xiǎng zū.",
          "meaning": "This room is good; I want to rent it."
        }
      ],
      "remember": "If the listener already knows who or what you mean, Chinese often says less. Do not insert an unnecessary pronoun just because English requires one.",
      "words": []
    }
  },
  "grammarIntroductions": [
    {
      "id": "u33-existential-you",
      "kind": "rule",
      "ref": "u33-existential-you",
      "lessonId": "u33-exists",
      "stepId": "u33-exists-g1"
    },
    {
      "id": "u33-hui-likelihood",
      "kind": "rule",
      "ref": "u33-hui-likelihood",
      "lessonId": "u33-will-omit",
      "stepId": "u33-will-g1"
    },
    {
      "id": "u33-zero-pronoun",
      "kind": "rule",
      "ref": "u33-zero-pronoun",
      "lessonId": "u33-will-omit",
      "stepId": "u33-will-g2"
    },
    {
      "id": "u33-na-then",
      "kind": "phrase-note",
      "ref": "u33-then",
      "lessonId": "u33-will-omit",
      "stepId": "u33-will-p0"
    },
    {
      "id": "u33-buhaoyisi",
      "kind": "phrase-note",
      "ref": "u33-sorry",
      "lessonId": "u33-exists",
      "stepId": "u33-exists-p0"
    }
  ],
  "reviewGrammar": [
    "u2-have",
    "u2-no-have",
    "u4-ability"
  ],
  "phrases": {
    "u33-return-call": {
      "text": "我回去想想，再打電話給你。",
      "pinyin": "Wǒ huíqù xiǎngxiang, zài dǎ diànhuà gěi nǐ.",
      "meaning": "I'll go back and think about it, then call you.",
      "note": "再 orders the later action. 回去 and 打電話 are transparent combinations of previously taught parts.",
      "tokens": [
        "我回去想想",
        "再打電話給你"
      ]
    },
    "u33-phone": {
      "text": "喂，你好。",
      "pinyin": "Wèi, nǐ hǎo.",
      "meaning": "Hello?",
      "note": "喂 is the conventional phone greeting in this context.",
      "tokens": [
        "喂",
        "你好"
      ]
    },
    "u33-received": {
      "text": "我已經收到房租了。",
      "pinyin": "Wǒ yǐjīng shōudào fángzū le.",
      "meaning": "I have already received the rent.",
      "note": "房租 is transparent after 房 and 租; 收到 means receive.",
      "tokens": [
        "我",
        "已經收到",
        "房租了"
      ]
    },
    "u33-habit": {
      "text": "我已經習慣了。",
      "pinyin": "Wǒ yǐjīng xíguàn le.",
      "meaning": "I have already gotten used to it.",
      "note": "習慣 describes becoming accustomed to a situation.",
      "tokens": [
        "我",
        "已經習慣了"
      ]
    },
    "u33-problem": {
      "text": "有一個問題。",
      "pinyin": "Yǒu yí ge wèntí.",
      "meaning": "There is a problem.",
      "note": "問題 is problem or question.",
      "tokens": [
        "有一個",
        "問題"
      ]
    },
    "u33-heater": {
      "text": "熱水器的水好像不熱。",
      "pinyin": "Rèshuǐqì de shuǐ hǎoxiàng bú rè.",
      "meaning": "The water from the water heater doesn't seem hot.",
      "note": "好像 often softens a comment: it seems/apparently.",
      "tokens": [
        "熱水器的水",
        "好像不熱"
      ]
    },
    "u33-will-check": {
      "text": "今天我會去看看。",
      "pinyin": "Jīntiān wǒ huì qù kànkan.",
      "meaning": "I'll go take a look today.",
      "note": "With a future time and action, 會 expresses likelihood/will, not an acquired skill.",
      "tokens": [
        "今天我",
        "會去看看"
      ],
      "grammarIds": [
        "u33-hui-likelihood"
      ]
    },
    "u33-sorry": {
      "text": "不好意思，今天晚上我有事。",
      "pinyin": "Bù hǎoyìsi, jīntiān wǎnshang wǒ yǒu shì.",
      "meaning": "Sorry, I have something to do tonight.",
      "note": "不好意思 is a polite apology/excuse; its characters are already familiar, so it is taught as a pragmatic phrase rather than padded into the NEW-word count.",
      "tokens": [
        "不好意思",
        "今天晚上我有事"
      ]
    },
    "u33-no-problem": {
      "text": "沒關係。",
      "pinyin": "Méi guānxì.",
      "meaning": "No problem.",
      "note": "沒關係 is the standard response meaning it doesn't matter / no problem.",
      "tokens": [
        "沒關係"
      ]
    },
    "u33-then": {
      "text": "那我明天下午兩點到。",
      "pinyin": "Nà wǒ míngtiān xiàwǔ liǎng diǎn dào.",
      "meaning": "Then I'll arrive at two tomorrow afternoon.",
      "note": "Here 那 is the discourse particle 'then / in that case,' extending the earlier word 那 'that.'",
      "tokens": [
        "那",
        "我明天下午兩點到"
      ]
    },
    "u33-install": {
      "text": "可以幫我裝有線電視嗎？",
      "pinyin": "Kěyǐ bāng wǒ zhuāng yǒuxiàn diànshì ma?",
      "meaning": "Can you help me install cable TV?",
      "note": "裝 means install; 有線電視 is cable TV.",
      "tokens": [
        "可以幫我",
        "裝有線電視嗎"
      ]
    },
    "u33-pay": {
      "text": "可以，不過你要自己付錢。",
      "pinyin": "Kěyǐ, búguò nǐ yào zìjǐ fù qián.",
      "meaning": "Yes, but you have to pay for it yourself.",
      "note": "不過 introduces a contrast: however/but. 付 means pay.",
      "tokens": [
        "可以",
        "不過你要自己付錢"
      ]
    },
    "u33-exist": {
      "text": "有人住這裡。",
      "pinyin": "Yǒu rén zhù zhèlǐ.",
      "meaning": "Someone lives here.",
      "note": "有 introduces the indefinite subject 人 before the verb.",
      "tokens": [
        "有人",
        "住這裡"
      ],
      "grammarIds": [
        "u33-existential-you"
      ]
    },
    "u33-noexist": {
      "text": "這間沒有人住。",
      "pinyin": "Zhè jiān méiyǒu rén zhù.",
      "meaning": "No one lives in this room.",
      "note": "Existential 有 is negated with 沒有.",
      "tokens": [
        "這間",
        "沒有人住"
      ],
      "grammarIds": [
        "u33-existential-you"
      ]
    },
    "u33-location-exist": {
      "text": "有一個人在這裡。",
      "pinyin": "Yǒu yí ge rén zài zhèlǐ.",
      "meaning": "There is a person here.",
      "note": "有 + indefinite NP introduces the person before stating the location.",
      "tokens": [
        "有一個人",
        "在這裡"
      ],
      "grammarIds": [
        "u33-existential-you"
      ]
    },
    "u33-omit-subject": {
      "text": "我喜歡茶，也喜歡咖啡。",
      "pinyin": "Wǒ xǐhuān chá, yě xǐhuān kāfēi.",
      "meaning": "I like tea, and I also like coffee.",
      "note": "The second clause omits the understood subject 我.",
      "tokens": [
        "我喜歡茶",
        "也喜歡咖啡"
      ],
      "grammarIds": [
        "u33-zero-pronoun"
      ]
    },
    "u33-omit-object": {
      "text": "朋友給我一個西瓜，我不想吃。",
      "pinyin": "Péngyǒu gěi wǒ yí ge xīguā, wǒ bù xiǎng chī.",
      "meaning": "A friend gave me a watermelon; I don't want to eat it.",
      "note": "The object 西瓜 is recoverable, so the second clause omits it.",
      "tokens": [
        "朋友給我一個西瓜",
        "我不想吃"
      ],
      "grammarIds": [
        "u33-zero-pronoun"
      ]
    }
  },
  "revisionStepIds": [
    "u33-heater-s1",
    "u33-will-s1",
    "u33-will-s2"
  ]
};
export default unit;
