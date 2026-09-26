import type {UnitData} from '../schema.ts';

const unit:UnitData = {
  "schemaVersion": 1,
  "bookId": "book-1",
  "order": 45,
  "unit": {
    "id": "unit-45",
    "number": 45,
    "theme": "rose",
    "bookReference": "Lesson 15 Dialogue I, symptom vocabulary, health inquiry, and duration integration.",
    "label": "Symptoms & feeling sick",
    "title": "Symptoms and Feeling Sick",
    "description": "Ask about discomfort, describe symptoms, and say how long a condition has lasted.",
    "chars": [
      "醫",
      "直",
      "流",
      "鼻",
      "痛",
      "胃",
      "喉",
      "嚨",
      "發",
      "炎",
      "病",
      "燒"
    ],
    "lessonIds": [
      "u45-doctor",
      "u45-runny-nose",
      "u45-head-appetite",
      "u45-throat",
      "u45-sick-fever",
      "u45-how-long",
      "u45-review"
    ],
    "banner": {
      "text": "哪裡不舒服？",
      "pinyin": "Nǎlǐ bù shūfu?"
    },
    "goal": {
      "text": "我一直流鼻水，頭很痛，胃口很差。",
      "pinyin": "Wǒ yìzhí liú bíshuǐ, tóu hěn tòng, wèikǒu hěn chā.",
      "meaning": "I have a runny nose, my head hurts, and my appetite is poor."
    },
    "grammarIds": []
  },
  "reviewLessonId": "u45-review",
  "lessons": [
    {
      "id": "u45-doctor",
      "title": "At the Doctor",
      "subtitle": "Ask where someone feels unwell.",
      "chars": [
        "醫"
      ],
      "minutes": "11–16 min",
      "unitId": "unit-45",
      "review": false,
      "steps": [
        {
          "id": "u45-doctor-醫-read",
          "type": "phrase",
          "phrase": "u45-doctor-醫-read"
        },
        {
          "id": "u45-doctor-醫-intro",
          "type": "intro",
          "char": "醫"
        },
        {
          "id": "u45-doctor-醫-trace",
          "type": "trace",
          "char": "醫"
        },
        {
          "id": "u45-doctor-醫-build",
          "type": "build",
          "char": "醫"
        },
        {
          "id": "u45-doctor-醫-complete",
          "type": "complete",
          "char": "醫"
        },
        {
          "id": "u45-doctor-醫-memory",
          "type": "memory",
          "char": "醫"
        },
        {
          "id": "u45-doctor-lex-explain",
          "type": "phrase",
          "phrase": "u45-doctor-lex"
        },
        {
          "id": "u45-doctor-s1",
          "type": "select",
          "prompt": "醫生 means…",
          "options": [
            "doctor",
            "pharmacy",
            "medicine"
          ],
          "answer": "doctor",
          "explanation": "醫生 yīshēng means “doctor.”"
        },
        {
          "id": "u45-doctor-p1",
          "type": "phrase",
          "phrase": "u45-health-inquiry"
        },
        {
          "id": "u45-doctor-s2",
          "type": "select",
          "prompt": "Which question asks where someone feels unwell?",
          "options": [
            "哪裡不舒服？",
            "哪裡下雨？",
            "你去哪裡？"
          ],
          "answer": "哪裡不舒服？",
          "explanation": "哪裡不舒服？ is the Lesson-15 health inquiry."
        },
        {
          "id": "u45-doctor-l1",
          "type": "listen",
          "char": "醫",
          "audioText": "你哪裡不舒服？",
          "prompt": "What is the speaker asking about?",
          "options": [
            "where the person feels unwell",
            "where the person lives",
            "what the weather is like"
          ],
          "answer": "where the person feels unwell",
          "explanation": "The question asks about the location of discomfort.",
          "semanticAnswer": true
        },
        {
          "id": "u45-doctor-o1",
          "type": "order",
          "phrase": "u45-health-inquiry",
          "tokens": [
            "哪裡",
            "不舒服"
          ]
        }
      ]
    },
    {
      "id": "u45-runny-nose",
      "title": "A Runny Nose",
      "subtitle": "Describe a continuing runny-nose symptom.",
      "chars": [
        "直",
        "流",
        "鼻"
      ],
      "minutes": "11–16 min",
      "unitId": "unit-45",
      "review": false,
      "steps": [
        {
          "id": "u45-runny-nose-直-read",
          "type": "phrase",
          "phrase": "u45-runny-nose-直-read"
        },
        {
          "id": "u45-runny-nose-直-intro",
          "type": "intro",
          "char": "直"
        },
        {
          "id": "u45-runny-nose-直-trace",
          "type": "trace",
          "char": "直"
        },
        {
          "id": "u45-runny-nose-直-build",
          "type": "build",
          "char": "直"
        },
        {
          "id": "u45-runny-nose-直-complete",
          "type": "complete",
          "char": "直"
        },
        {
          "id": "u45-runny-nose-直-memory",
          "type": "memory",
          "char": "直"
        },
        {
          "id": "u45-runny-nose-流-read",
          "type": "phrase",
          "phrase": "u45-runny-nose-流-read"
        },
        {
          "id": "u45-runny-nose-流-intro",
          "type": "intro",
          "char": "流"
        },
        {
          "id": "u45-runny-nose-流-trace",
          "type": "trace",
          "char": "流"
        },
        {
          "id": "u45-runny-nose-流-build",
          "type": "build",
          "char": "流"
        },
        {
          "id": "u45-runny-nose-流-complete",
          "type": "complete",
          "char": "流"
        },
        {
          "id": "u45-runny-nose-流-memory",
          "type": "memory",
          "char": "流"
        },
        {
          "id": "u45-runny-nose-鼻-read",
          "type": "phrase",
          "phrase": "u45-runny-nose-鼻-read"
        },
        {
          "id": "u45-runny-nose-鼻-intro",
          "type": "intro",
          "char": "鼻"
        },
        {
          "id": "u45-runny-nose-鼻-trace",
          "type": "trace",
          "char": "鼻"
        },
        {
          "id": "u45-runny-nose-鼻-build",
          "type": "build",
          "char": "鼻"
        },
        {
          "id": "u45-runny-nose-鼻-complete",
          "type": "complete",
          "char": "鼻"
        },
        {
          "id": "u45-runny-nose-鼻-memory",
          "type": "memory",
          "char": "鼻"
        },
        {
          "id": "u45-runny-lex-explain",
          "type": "phrase",
          "phrase": "u45-runny-lex"
        },
        {
          "id": "u45-runny-s1",
          "type": "select",
          "prompt": "一直 means…",
          "options": [
            "continuously",
            "only once",
            "a little"
          ],
          "answer": "continuously",
          "explanation": "一直 describes something continuing without interruption in this symptom report."
        },
        {
          "id": "u45-runny-s2",
          "type": "select",
          "prompt": "流 means…",
          "options": [
            "to flow",
            "to rest",
            "to hurt"
          ],
          "answer": "to flow",
          "explanation": "流 liú means “to flow.”"
        },
        {
          "id": "u45-runny-s3",
          "type": "select",
          "prompt": "鼻水 means…",
          "options": [
            "a runny nose / nasal mucus",
            "a sore throat",
            "a fever"
          ],
          "answer": "a runny nose / nasal mucus",
          "explanation": "鼻水 bíshuǐ is nasal mucus; 流鼻水 describes having a runny nose."
        },
        {
          "id": "u45-runny-p1",
          "type": "phrase",
          "phrase": "u45-runny-source"
        },
        {
          "id": "u45-runny-l1",
          "type": "listen",
          "char": "鼻",
          "audioText": "我一直流鼻水。",
          "prompt": "Which symptom do you hear?",
          "options": [
            "流鼻水",
            "不舒服",
            "醫生"
          ],
          "answer": "流鼻水",
          "explanation": "The audio says the speaker continuously has a runny nose."
        },
        {
          "id": "u45-runny-o1",
          "type": "order",
          "phrase": "u45-runny-source",
          "tokens": [
            "我",
            "一直",
            "流鼻水"
          ]
        }
      ]
    },
    {
      "id": "u45-head-appetite",
      "title": "Head and Appetite",
      "subtitle": "Describe head pain and poor appetite.",
      "chars": [
        "痛",
        "胃"
      ],
      "minutes": "11–16 min",
      "unitId": "unit-45",
      "review": false,
      "steps": [
        {
          "id": "u45-head-note",
          "type": "phrase",
          "phrase": "u45-head-lex"
        },
        {
          "id": "u45-head-appetite-痛-read",
          "type": "phrase",
          "phrase": "u45-head-appetite-痛-read"
        },
        {
          "id": "u45-head-appetite-痛-intro",
          "type": "intro",
          "char": "痛"
        },
        {
          "id": "u45-head-appetite-痛-trace",
          "type": "trace",
          "char": "痛"
        },
        {
          "id": "u45-head-appetite-痛-build",
          "type": "build",
          "char": "痛"
        },
        {
          "id": "u45-head-appetite-痛-complete",
          "type": "complete",
          "char": "痛"
        },
        {
          "id": "u45-head-appetite-痛-memory",
          "type": "memory",
          "char": "痛"
        },
        {
          "id": "u45-head-appetite-胃-read",
          "type": "phrase",
          "phrase": "u45-head-appetite-胃-read"
        },
        {
          "id": "u45-head-appetite-胃-intro",
          "type": "intro",
          "char": "胃"
        },
        {
          "id": "u45-head-appetite-胃-trace",
          "type": "trace",
          "char": "胃"
        },
        {
          "id": "u45-head-appetite-胃-build",
          "type": "build",
          "char": "胃"
        },
        {
          "id": "u45-head-appetite-胃-complete",
          "type": "complete",
          "char": "胃"
        },
        {
          "id": "u45-head-appetite-胃-memory",
          "type": "memory",
          "char": "胃"
        },
        {
          "id": "u45-head-lex-explain",
          "type": "phrase",
          "phrase": "u45-head-lex"
        },
        {
          "id": "u45-head-s1",
          "type": "select",
          "prompt": "頭 means…",
          "options": [
            "head",
            "throat",
            "stomach/appetite"
          ],
          "answer": "head",
          "explanation": "頭 tóu means “head.”"
        },
        {
          "id": "u45-head-s2",
          "type": "select",
          "prompt": "痛 means…",
          "options": [
            "painful / hurts",
            "healthy",
            "oily"
          ],
          "answer": "painful / hurts",
          "explanation": "痛 tòng describes pain."
        },
        {
          "id": "u45-head-s3",
          "type": "select",
          "prompt": "胃口 means…",
          "options": [
            "appetite",
            "head",
            "medicine"
          ],
          "answer": "appetite",
          "explanation": "胃口 wèikǒu means “appetite.”"
        },
        {
          "id": "u45-head-pronunciation",
          "type": "phrase",
          "phrase": "u45-head-lex"
        },
        {
          "id": "u45-head-s4",
          "type": "select",
          "prompt": "In 胃口很差, 差 is pronounced…",
          "options": [
            "chā",
            "chà",
            "chāi"
          ],
          "answer": "chā",
          "explanation": "The Lesson-15 source gives 差 chā for “poor/bad” in this expression."
        },
        {
          "id": "u45-head-p1",
          "type": "phrase",
          "phrase": "u45-head-appetite-source"
        },
        {
          "id": "u45-head-s5",
          "type": "select",
          "prompt": "Which sentence says the speaker's appetite is poor?",
          "options": [
            "胃口很差。",
            "頭很痛。",
            "我一直流鼻水。"
          ],
          "answer": "胃口很差。",
          "explanation": "胃口很差 means “the appetite is poor.”"
        },
        {
          "id": "u45-head-p2",
          "type": "phrase",
          "phrase": "u45-totality-review"
        },
        {
          "id": "u45-head-s6",
          "type": "select",
          "prompt": "In 什麼東西都不想吃, what does 什麼東西…都 express?",
          "options": [
            "totality under negation: not wanting to eat anything",
            "a question asking which food the person wants",
            "a duration question"
          ],
          "answer": "totality under negation: not wanting to eat anything",
          "explanation": "This retrieves the earlier question-word + 都 pattern; G001 is not taught until Unit 46."
        }
      ]
    },
    {
      "id": "u45-throat",
      "title": "Throat and Inflammation",
      "subtitle": "Describe a slightly inflamed throat.",
      "chars": [
        "喉",
        "嚨",
        "發",
        "炎"
      ],
      "minutes": "11–16 min",
      "unitId": "unit-45",
      "review": false,
      "steps": [
        {
          "id": "u45-throat-喉-read",
          "type": "phrase",
          "phrase": "u45-throat-喉-read"
        },
        {
          "id": "u45-throat-喉-intro",
          "type": "intro",
          "char": "喉"
        },
        {
          "id": "u45-throat-喉-trace",
          "type": "trace",
          "char": "喉"
        },
        {
          "id": "u45-throat-喉-build",
          "type": "build",
          "char": "喉"
        },
        {
          "id": "u45-throat-喉-complete",
          "type": "complete",
          "char": "喉"
        },
        {
          "id": "u45-throat-喉-memory",
          "type": "memory",
          "char": "喉"
        },
        {
          "id": "u45-throat-嚨-read",
          "type": "phrase",
          "phrase": "u45-throat-嚨-read"
        },
        {
          "id": "u45-throat-嚨-intro",
          "type": "intro",
          "char": "嚨"
        },
        {
          "id": "u45-throat-嚨-trace",
          "type": "trace",
          "char": "嚨"
        },
        {
          "id": "u45-throat-嚨-build",
          "type": "build",
          "char": "嚨"
        },
        {
          "id": "u45-throat-嚨-complete",
          "type": "complete",
          "char": "嚨"
        },
        {
          "id": "u45-throat-嚨-memory",
          "type": "memory",
          "char": "嚨"
        },
        {
          "id": "u45-throat-發-read",
          "type": "phrase",
          "phrase": "u45-throat-發-read"
        },
        {
          "id": "u45-throat-發-intro",
          "type": "intro",
          "char": "發"
        },
        {
          "id": "u45-throat-發-trace",
          "type": "trace",
          "char": "發"
        },
        {
          "id": "u45-throat-發-build",
          "type": "build",
          "char": "發"
        },
        {
          "id": "u45-throat-發-complete",
          "type": "complete",
          "char": "發"
        },
        {
          "id": "u45-throat-發-memory",
          "type": "memory",
          "char": "發"
        },
        {
          "id": "u45-throat-炎-read",
          "type": "phrase",
          "phrase": "u45-throat-炎-read"
        },
        {
          "id": "u45-throat-炎-intro",
          "type": "intro",
          "char": "炎"
        },
        {
          "id": "u45-throat-炎-trace",
          "type": "trace",
          "char": "炎"
        },
        {
          "id": "u45-throat-炎-build",
          "type": "build",
          "char": "炎"
        },
        {
          "id": "u45-throat-炎-complete",
          "type": "complete",
          "char": "炎"
        },
        {
          "id": "u45-throat-炎-memory",
          "type": "memory",
          "char": "炎"
        },
        {
          "id": "u45-throat-lex-explain",
          "type": "phrase",
          "phrase": "u45-throat-lex"
        },
        {
          "id": "u45-throat-s1",
          "type": "select",
          "prompt": "喉嚨 means…",
          "options": [
            "throat",
            "appetite",
            "head"
          ],
          "answer": "throat",
          "explanation": "喉嚨 hóulóng means “throat.”"
        },
        {
          "id": "u45-throat-s2",
          "type": "select",
          "prompt": "發炎 means…",
          "options": [
            "to be inflamed",
            "to have a fever",
            "to rest"
          ],
          "answer": "to be inflamed",
          "explanation": "發炎 fāyán means “to be inflamed.”"
        },
        {
          "id": "u45-throat-review-card",
          "type": "phrase",
          "phrase": "u45-throat-source"
        },
        {
          "id": "u45-throat-p1",
          "type": "phrase",
          "phrase": "u45-throat-source"
        },
        {
          "id": "u45-throat-s3",
          "type": "select",
          "prompt": "Which best matches 喉嚨有一點發炎？",
          "options": [
            "The throat is a little inflamed.",
            "The throat is much better.",
            "The throat has been sore for four days."
          ],
          "answer": "The throat is a little inflamed.",
          "explanation": "有一點 gives a slight degree here."
        },
        {
          "id": "u45-throat-l1",
          "type": "listen",
          "char": "喉",
          "audioText": "喉嚨有一點發炎。",
          "prompt": "What body part do you hear?",
          "options": [
            "喉嚨",
            "頭",
            "胃口"
          ],
          "answer": "喉嚨",
          "explanation": "The audio describes the throat."
        },
        {
          "id": "u45-throat-o1",
          "type": "order",
          "phrase": "u45-throat-source",
          "tokens": [
            "喉嚨",
            "有一點",
            "發炎"
          ]
        }
      ]
    },
    {
      "id": "u45-sick-fever",
      "title": "Sick and Feverish",
      "subtitle": "Report illness and a slight fever.",
      "chars": [
        "病",
        "燒"
      ],
      "minutes": "11–16 min",
      "unitId": "unit-45",
      "review": false,
      "steps": [
        {
          "id": "u45-sick-fever-病-read",
          "type": "phrase",
          "phrase": "u45-sick-fever-病-read"
        },
        {
          "id": "u45-sick-fever-病-intro",
          "type": "intro",
          "char": "病"
        },
        {
          "id": "u45-sick-fever-病-trace",
          "type": "trace",
          "char": "病"
        },
        {
          "id": "u45-sick-fever-病-build",
          "type": "build",
          "char": "病"
        },
        {
          "id": "u45-sick-fever-病-complete",
          "type": "complete",
          "char": "病"
        },
        {
          "id": "u45-sick-fever-病-memory",
          "type": "memory",
          "char": "病"
        },
        {
          "id": "u45-sick-fever-燒-read",
          "type": "phrase",
          "phrase": "u45-sick-fever-燒-read"
        },
        {
          "id": "u45-sick-fever-燒-intro",
          "type": "intro",
          "char": "燒"
        },
        {
          "id": "u45-sick-fever-燒-trace",
          "type": "trace",
          "char": "燒"
        },
        {
          "id": "u45-sick-fever-燒-build",
          "type": "build",
          "char": "燒"
        },
        {
          "id": "u45-sick-fever-燒-complete",
          "type": "complete",
          "char": "燒"
        },
        {
          "id": "u45-sick-fever-燒-memory",
          "type": "memory",
          "char": "燒"
        },
        {
          "id": "u45-sick-lex-explain",
          "type": "phrase",
          "phrase": "u45-sick-lex"
        },
        {
          "id": "u45-sick-s1",
          "type": "select",
          "prompt": "生病 means…",
          "options": [
            "to be/fall sick",
            "to see a doctor",
            "to recover"
          ],
          "answer": "to be/fall sick",
          "explanation": "生病 shēngbìng means “to fall ill / be sick.”"
        },
        {
          "id": "u45-sick-p1",
          "type": "phrase",
          "phrase": "u45-sick-basic"
        },
        {
          "id": "u45-sick-s2",
          "type": "select",
          "prompt": "發燒 means…",
          "options": [
            "to have a fever",
            "to have a runny nose",
            "to have a good appetite"
          ],
          "answer": "to have a fever",
          "explanation": "發燒 fāshāo means “to have a fever.”"
        },
        {
          "id": "u45-sick-p2",
          "type": "phrase",
          "phrase": "u45-fever-basic"
        },
        {
          "id": "u45-sick-s3",
          "type": "select",
          "prompt": "Which sentence reports a fever?",
          "options": [
            "我有一點發燒。",
            "我一直流鼻水。",
            "胃口很差。"
          ],
          "answer": "我有一點發燒。",
          "explanation": "發燒 is the fever expression."
        },
        {
          "id": "u45-sick-l1",
          "type": "listen",
          "char": "病",
          "audioText": "我生病了，還有一點發燒。",
          "prompt": "Which two ideas are stated?",
          "options": [
            "being sick and having a slight fever",
            "having a good appetite and resting",
            "going to a pharmacy and taking medicine"
          ],
          "answer": "being sick and having a slight fever",
          "explanation": "生病 and 發燒 are both present.",
          "semanticAnswer": true
        },
        {
          "id": "u45-sick-safety",
          "type": "phrase",
          "phrase": "u45-sick-basic"
        }
      ]
    },
    {
      "id": "u45-how-long",
      "title": "How Long Has It Been?",
      "subtitle": "Integrate symptom duration and the first five source dialogue turns.",
      "chars": [],
      "minutes": "11–16 min",
      "unitId": "unit-45",
      "review": false,
      "steps": [
        {
          "id": "u45-duration-explain",
          "type": "phrase",
          "phrase": "u45-duration-question"
        },
        {
          "id": "u45-duration-p1",
          "type": "phrase",
          "phrase": "u45-duration-question"
        },
        {
          "id": "u45-duration-p2",
          "type": "phrase",
          "phrase": "u45-duration-answer"
        },
        {
          "id": "u45-duration-s1",
          "type": "select",
          "prompt": "Which question asks about how long a current condition has lasted?",
          "options": [
            "大概多久了？",
            "哪裡不舒服？",
            "什麼東西都不想吃？"
          ],
          "answer": "大概多久了？",
          "explanation": "多久 asks duration; the final 了 fits the current-condition context."
        },
        {
          "id": "u45-duration-s2",
          "type": "select",
          "prompt": "Which answer fits 大概多久了？",
          "options": [
            "已經四、五天了。",
            "喉嚨有一點發炎。",
            "我一直流鼻水。"
          ],
          "answer": "已經四、五天了。",
          "explanation": "The answer gives the duration up to now."
        },
        {
          "id": "u45-duration-p3",
          "type": "phrase",
          "phrase": "u45-dialogue-1-5"
        },
        {
          "id": "u45-duration-l1",
          "type": "listen",
          "char": "直",
          "audioText": "大概多久了？已經四、五天了。",
          "prompt": "What information is being exchanged?",
          "options": [
            "duration of the condition",
            "where the pharmacy is",
            "how much medicine costs"
          ],
          "answer": "duration of the condition",
          "explanation": "The question and answer concern how long the condition has lasted.",
          "semanticAnswer": true
        },
        {
          "id": "u45-duration-o1",
          "type": "order",
          "phrase": "u45-duration-answer",
          "tokens": [
            "已經",
            "四、五天",
            "了"
          ]
        },
        {
          "id": "u45-dialogue-s1",
          "type": "select",
          "prompt": "Which sequence best matches the doctor visit so far?",
          "options": [
            "ask where it hurts → describe symptoms → ask duration → examine throat",
            "compare rent → ask duration → buy medicine → discuss weather",
            "ask about insurance → reject help → examine throat → compare actions"
          ],
          "answer": "ask where it hurts → describe symptoms → ask duration → examine throat",
          "explanation": "That is the D1T01–D1T05 communicative arc."
        }
      ]
    },
    {
      "id": "u45-review",
      "title": "Unit 45 Review",
      "subtitle": "Retrieve symptoms, handwriting, health inquiry, and duration.",
      "chars": [
        "醫",
        "直",
        "流",
        "鼻",
        "痛",
        "胃",
        "喉",
        "嚨",
        "發",
        "炎",
        "病",
        "燒"
      ],
      "minutes": "18–22 min",
      "unitId": "unit-45",
      "review": true,
      "steps": [
        {
          "id": "u45-review-l1",
          "type": "listen",
          "char": "鼻",
          "audioText": "我一直流鼻水。",
          "prompt": "Which symptom do you hear?",
          "options": [
            "流鼻水",
            "發燒",
            "胃口很好"
          ],
          "answer": "流鼻水",
          "explanation": "流鼻水 is the runny-nose symptom."
        },
        {
          "id": "u45-review-l2",
          "type": "listen",
          "char": "痛",
          "audioText": "頭很痛，胃口很差。",
          "prompt": "Which two problems are mentioned?",
          "options": [
            "head pain and poor appetite",
            "throat inflammation and fever",
            "medicine and rest"
          ],
          "answer": "head pain and poor appetite",
          "explanation": "頭很痛 + 胃口很差.",
          "semanticAnswer": true
        },
        {
          "id": "u45-review-l3",
          "type": "listen",
          "char": "喉",
          "audioText": "喉嚨有一點發炎。",
          "prompt": "What is slightly inflamed?",
          "options": [
            "喉嚨",
            "頭",
            "鼻水"
          ],
          "answer": "喉嚨",
          "explanation": "The audio names the throat."
        },
        {
          "id": "u45-review-醫",
          "type": "complete",
          "char": "醫"
        },
        {
          "id": "u45-review-直",
          "type": "complete",
          "char": "直"
        },
        {
          "id": "u45-review-流",
          "type": "complete",
          "char": "流"
        },
        {
          "id": "u45-review-鼻",
          "type": "complete",
          "char": "鼻"
        },
        {
          "id": "u45-review-痛",
          "type": "complete",
          "char": "痛"
        },
        {
          "id": "u45-review-胃",
          "type": "complete",
          "char": "胃"
        },
        {
          "id": "u45-review-喉",
          "type": "complete",
          "char": "喉"
        },
        {
          "id": "u45-review-嚨",
          "type": "complete",
          "char": "嚨"
        },
        {
          "id": "u45-review-發",
          "type": "complete",
          "char": "發"
        },
        {
          "id": "u45-review-炎",
          "type": "complete",
          "char": "炎"
        },
        {
          "id": "u45-review-病",
          "type": "complete",
          "char": "病"
        },
        {
          "id": "u45-review-燒",
          "type": "complete",
          "char": "燒"
        },
        {
          "id": "u45-review-v1",
          "type": "select",
          "prompt": "醫生 means…",
          "options": [
            "doctor",
            "patient",
            "pharmacy"
          ],
          "answer": "doctor",
          "explanation": "醫生 means doctor."
        },
        {
          "id": "u45-review-v2",
          "type": "select",
          "prompt": "一直 means…",
          "options": [
            "continuously",
            "once",
            "immediately after"
          ],
          "answer": "continuously",
          "explanation": "一直 means continuously."
        },
        {
          "id": "u45-review-v3",
          "type": "select",
          "prompt": "流 means…",
          "options": [
            "flow",
            "rest",
            "sleep"
          ],
          "answer": "flow",
          "explanation": "流 means flow."
        },
        {
          "id": "u45-review-v4",
          "type": "select",
          "prompt": "鼻水 means…",
          "options": [
            "runny nose",
            "sore throat",
            "appetite"
          ],
          "answer": "runny nose",
          "explanation": "鼻水 means runny nose."
        },
        {
          "id": "u45-review-v5",
          "type": "select",
          "prompt": "頭 means…",
          "options": [
            "head",
            "throat",
            "stomach"
          ],
          "answer": "head",
          "explanation": "頭 means head."
        },
        {
          "id": "u45-review-v6",
          "type": "select",
          "prompt": "痛 means…",
          "options": [
            "painful",
            "healthy",
            "oily"
          ],
          "answer": "painful",
          "explanation": "痛 means painful."
        },
        {
          "id": "u45-review-v7",
          "type": "select",
          "prompt": "胃口 means…",
          "options": [
            "appetite",
            "medicine",
            "insurance"
          ],
          "answer": "appetite",
          "explanation": "胃口 means appetite."
        },
        {
          "id": "u45-review-v8",
          "type": "select",
          "prompt": "Which reading/meaning pair is correct for Lesson-15 差?",
          "options": [
            "chā — poor/bad",
            "chà — several",
            "chāi — doctor"
          ],
          "answer": "chā — poor/bad",
          "explanation": "胃口很差 uses chā."
        },
        {
          "id": "u45-review-v9",
          "type": "select",
          "prompt": "喉嚨 means…",
          "options": [
            "throat",
            "head",
            "fever"
          ],
          "answer": "throat",
          "explanation": "喉嚨 means throat."
        },
        {
          "id": "u45-review-v10",
          "type": "select",
          "prompt": "發炎 means…",
          "options": [
            "be inflamed",
            "have a fever",
            "vomit"
          ],
          "answer": "be inflamed",
          "explanation": "發炎 means be inflamed."
        },
        {
          "id": "u45-review-v11",
          "type": "select",
          "prompt": "生病 means…",
          "options": [
            "be sick",
            "see a doctor",
            "go home"
          ],
          "answer": "be sick",
          "explanation": "生病 means be sick."
        },
        {
          "id": "u45-review-v12",
          "type": "select",
          "prompt": "發燒 means…",
          "options": [
            "have a fever",
            "be inflamed",
            "have poor appetite"
          ],
          "answer": "have a fever",
          "explanation": "發燒 means have a fever."
        },
        {
          "id": "u45-review-f1",
          "type": "select",
          "prompt": "Which question starts a health check by asking where the discomfort is?",
          "options": [
            "哪裡不舒服？",
            "大概多久了？",
            "什麼東西都不想吃？"
          ],
          "answer": "哪裡不舒服？",
          "explanation": "This retrieves F001/X002."
        },
        {
          "id": "u45-review-f2",
          "type": "select",
          "prompt": "Which pair forms a natural duration exchange?",
          "options": [
            "大概多久了？／已經四、五天了。",
            "哪裡不舒服？／大概多久了。",
            "胃口怎麼樣？／我一直。"
          ],
          "answer": "大概多久了？／已經四、五天了。",
          "explanation": "X004 integrates the question and duration-to-now answer."
        },
        {
          "id": "u45-review-f3",
          "type": "select",
          "prompt": "Which sentence uses the earlier Unit-40 question-word + 都 totality pattern?",
          "options": [
            "什麼東西都不想吃。",
            "我一直流鼻水。",
            "胃口很差。"
          ],
          "answer": "什麼東西都不想吃。",
          "explanation": "什麼東西 + 都 expresses the earlier totality pattern under negation."
        },
        {
          "id": "u45-review-o1",
          "type": "order",
          "phrase": "u45-head-appetite-source",
          "tokens": [
            "頭很痛",
            "胃口很差"
          ]
        },
        {
          "id": "u45-review-o2",
          "type": "order",
          "phrase": "u45-throat-source",
          "tokens": [
            "喉嚨",
            "有一點",
            "發炎"
          ]
        }
      ]
    }
  ],
  "newVocabulary": [
    {
      "text": "醫生",
      "pinyin": "yīshēng",
      "meaning": "doctor",
      "lessonId": "u45-doctor",
      "core": false
    },
    {
      "text": "一直",
      "pinyin": "yìzhí",
      "meaning": "continuously; all the way",
      "lessonId": "u45-runny-nose",
      "core": false
    },
    {
      "text": "流",
      "pinyin": "liú",
      "meaning": "to flow",
      "lessonId": "u45-runny-nose",
      "core": false
    },
    {
      "text": "鼻水",
      "pinyin": "bíshuǐ",
      "meaning": "nasal mucus; a runny nose",
      "lessonId": "u45-runny-nose",
      "core": false
    },
    {
      "text": "頭",
      "pinyin": "tóu",
      "meaning": "head",
      "lessonId": "u45-head-appetite",
      "core": false
    },
    {
      "text": "痛",
      "pinyin": "tòng",
      "meaning": "painful; hurts",
      "lessonId": "u45-head-appetite",
      "core": false
    },
    {
      "text": "胃口",
      "pinyin": "wèikǒu",
      "meaning": "appetite",
      "lessonId": "u45-head-appetite",
      "core": false
    },
    {
      "text": "差",
      "pinyin": "chā",
      "meaning": "poor; bad",
      "lessonId": "u45-head-appetite",
      "core": false
    },
    {
      "text": "喉嚨",
      "pinyin": "hóulóng",
      "meaning": "throat",
      "lessonId": "u45-throat",
      "core": false
    },
    {
      "text": "發炎",
      "pinyin": "fāyán",
      "meaning": "to be inflamed",
      "lessonId": "u45-throat",
      "core": false
    },
    {
      "text": "生病",
      "pinyin": "shēngbìng",
      "meaning": "to fall ill / be sick",
      "lessonId": "u45-sick-fever",
      "core": false
    },
    {
      "text": "發燒",
      "pinyin": "fāshāo",
      "meaning": "to have a fever",
      "lessonId": "u45-sick-fever",
      "core": false
    }
  ],
  "reviewVocabulary": [],
  "newCharacters": [
    "醫",
    "直",
    "流",
    "鼻",
    "痛",
    "胃",
    "喉",
    "嚨",
    "發",
    "炎",
    "病",
    "燒"
  ],
  "reviewCharacters": [],
  "characters": {
    "醫": {
      "hanzi": "醫",
      "pinyin": "yī",
      "zhuyin": "ㄧ",
      "meaning": "medical; medicine",
      "strokes": 18,
      "note": "醫 is the character taught here for medical; medicine; notice its full traditional form before writing it independently.",
      "memory": "For 醫, keep the complete 18-stroke traditional shape together and connect it to 醫生.",
      "parts": [
        {
          "label": "醫",
          "name": "complete form",
          "role": "Whole-character structure",
          "description": "Practice the complete 醫 shape as used in 醫生; this group accounts for every stroke in this character.",
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
            17
          ]
        }
      ],
      "layout": "whole",
      "example": {
        "text": "醫生",
        "pinyin": "yīshēng",
        "meaning": "doctor"
      }
    },
    "直": {
      "hanzi": "直",
      "pinyin": "zhí",
      "zhuyin": "ㄓˊ",
      "meaning": "straight; continuous",
      "strokes": 8,
      "note": "直 is the character taught here for straight; continuous; notice its full traditional form before writing it independently.",
      "memory": "For 直, keep the complete 8-stroke traditional shape together and connect it to 一直.",
      "parts": [
        {
          "label": "直",
          "name": "complete form",
          "role": "Whole-character structure",
          "description": "Practice the complete 直 shape as used in 一直; this group accounts for every stroke in this character.",
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
      "layout": "whole",
      "example": {
        "text": "一直",
        "pinyin": "yìzhí",
        "meaning": "continuously; all the way"
      }
    },
    "流": {
      "hanzi": "流",
      "pinyin": "liú",
      "zhuyin": "ㄌㄧㄡˊ",
      "meaning": "flow",
      "strokes": 10,
      "note": "流 is the character taught here for flow; notice its full traditional form before writing it independently.",
      "memory": "For 流, keep the complete 10-stroke traditional shape together and connect it to 流鼻水.",
      "parts": [
        {
          "label": "流",
          "name": "complete form",
          "role": "Whole-character structure",
          "description": "Practice the complete 流 shape as used in 流鼻水; this group accounts for every stroke in this character.",
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
        "text": "流鼻水",
        "pinyin": "liú bíshuǐ",
        "meaning": "have a runny nose"
      }
    },
    "鼻": {
      "hanzi": "鼻",
      "pinyin": "bí",
      "zhuyin": "ㄅㄧˊ",
      "meaning": "nose",
      "strokes": 14,
      "note": "鼻 is the character taught here for nose; notice its full traditional form before writing it independently.",
      "memory": "For 鼻, keep the complete 14-stroke traditional shape together and connect it to 鼻水.",
      "parts": [
        {
          "label": "鼻",
          "name": "complete form",
          "role": "Whole-character structure",
          "description": "Practice the complete 鼻 shape as used in 鼻水; this group accounts for every stroke in this character.",
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
            13
          ]
        }
      ],
      "layout": "whole",
      "example": {
        "text": "鼻水",
        "pinyin": "bíshuǐ",
        "meaning": "nasal mucus; runny nose"
      }
    },
    "痛": {
      "hanzi": "痛",
      "pinyin": "tòng",
      "zhuyin": "ㄊㄨㄥˋ",
      "meaning": "painful; hurt",
      "strokes": 12,
      "note": "痛 is the character taught here for painful; hurt; notice its full traditional form before writing it independently.",
      "memory": "For 痛, keep the complete 12-stroke traditional shape together and connect it to 頭很痛.",
      "parts": [
        {
          "label": "痛",
          "name": "complete form",
          "role": "Whole-character structure",
          "description": "Practice the complete 痛 shape as used in 頭很痛; this group accounts for every stroke in this character.",
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
      "layout": "whole",
      "example": {
        "text": "頭很痛",
        "pinyin": "tóu hěn tòng",
        "meaning": "the head hurts"
      }
    },
    "胃": {
      "hanzi": "胃",
      "pinyin": "wèi",
      "zhuyin": "ㄨㄟˋ",
      "meaning": "stomach",
      "strokes": 9,
      "note": "胃 is the character taught here for stomach; notice its full traditional form before writing it independently.",
      "memory": "For 胃, keep the complete 9-stroke traditional shape together and connect it to 胃口.",
      "parts": [
        {
          "label": "胃",
          "name": "complete form",
          "role": "Whole-character structure",
          "description": "Practice the complete 胃 shape as used in 胃口; this group accounts for every stroke in this character.",
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
        "text": "胃口",
        "pinyin": "wèikǒu",
        "meaning": "appetite"
      }
    },
    "喉": {
      "hanzi": "喉",
      "pinyin": "hóu",
      "zhuyin": "ㄏㄡˊ",
      "meaning": "throat component",
      "strokes": 12,
      "note": "喉 is the character taught here for throat component; notice its full traditional form before writing it independently.",
      "memory": "For 喉, keep the complete 12-stroke traditional shape together and connect it to 喉嚨.",
      "parts": [
        {
          "label": "喉",
          "name": "complete form",
          "role": "Whole-character structure",
          "description": "Practice the complete 喉 shape as used in 喉嚨; this group accounts for every stroke in this character.",
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
      "layout": "whole",
      "example": {
        "text": "喉嚨",
        "pinyin": "hóulóng",
        "meaning": "throat"
      }
    },
    "嚨": {
      "hanzi": "嚨",
      "pinyin": "lóng",
      "zhuyin": "ㄌㄨㄥˊ",
      "meaning": "throat component",
      "strokes": 19,
      "note": "嚨 is the character taught here for throat component; notice its full traditional form before writing it independently.",
      "memory": "For 嚨, keep the complete 19-stroke traditional shape together and connect it to 喉嚨.",
      "parts": [
        {
          "label": "嚨",
          "name": "complete form",
          "role": "Whole-character structure",
          "description": "Practice the complete 嚨 shape as used in 喉嚨; this group accounts for every stroke in this character.",
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
        "text": "喉嚨",
        "pinyin": "hóulóng",
        "meaning": "throat"
      }
    },
    "發": {
      "hanzi": "發",
      "pinyin": "fā",
      "zhuyin": "ㄈㄚ",
      "meaning": "emit; develop",
      "strokes": 12,
      "note": "發 is the character taught here for emit; develop; notice its full traditional form before writing it independently.",
      "memory": "For 發, keep the complete 12-stroke traditional shape together and connect it to 發炎.",
      "parts": [
        {
          "label": "發",
          "name": "complete form",
          "role": "Whole-character structure",
          "description": "Practice the complete 發 shape as used in 發炎; this group accounts for every stroke in this character.",
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
      "layout": "whole",
      "example": {
        "text": "發炎",
        "pinyin": "fāyán",
        "meaning": "be inflamed"
      }
    },
    "炎": {
      "hanzi": "炎",
      "pinyin": "yán",
      "zhuyin": "ㄧㄢˊ",
      "meaning": "inflammation",
      "strokes": 8,
      "note": "炎 is the character taught here for inflammation; notice its full traditional form before writing it independently.",
      "memory": "For 炎, keep the complete 8-stroke traditional shape together and connect it to 發炎.",
      "parts": [
        {
          "label": "炎",
          "name": "complete form",
          "role": "Whole-character structure",
          "description": "Practice the complete 炎 shape as used in 發炎; this group accounts for every stroke in this character.",
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
      "layout": "whole",
      "example": {
        "text": "發炎",
        "pinyin": "fāyán",
        "meaning": "be inflamed"
      }
    },
    "病": {
      "hanzi": "病",
      "pinyin": "bìng",
      "zhuyin": "ㄅㄧㄥˋ",
      "meaning": "illness; sick",
      "strokes": 10,
      "note": "病 is the character taught here for illness; sick; notice its full traditional form before writing it independently.",
      "memory": "For 病, keep the complete 10-stroke traditional shape together and connect it to 生病.",
      "parts": [
        {
          "label": "病",
          "name": "complete form",
          "role": "Whole-character structure",
          "description": "Practice the complete 病 shape as used in 生病; this group accounts for every stroke in this character.",
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
        "text": "生病",
        "pinyin": "shēngbìng",
        "meaning": "be sick"
      }
    },
    "燒": {
      "hanzi": "燒",
      "pinyin": "shāo",
      "zhuyin": "ㄕㄠ",
      "meaning": "burn; fever component",
      "strokes": 16,
      "note": "燒 is the character taught here for burn; fever component; notice its full traditional form before writing it independently.",
      "memory": "For 燒, keep the complete 16-stroke traditional shape together and connect it to 發燒.",
      "parts": [
        {
          "label": "燒",
          "name": "complete form",
          "role": "Whole-character structure",
          "description": "Practice the complete 燒 shape as used in 發燒; this group accounts for every stroke in this character.",
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
            15
          ]
        }
      ],
      "layout": "whole",
      "example": {
        "text": "發燒",
        "pinyin": "fāshāo",
        "meaning": "have a fever"
      }
    }
  },
  "grammarRules": {},
  "grammarIntroductions": [],
  "reviewGrammar": [],
  "phrases": {
    "u45-doctor-醫-read": {
      "text": "醫",
      "pinyin": "yī",
      "meaning": "medical; seen in 醫生",
      "note": "Recognition/read card.",
      "tokens": [
        "醫"
      ]
    },
    "u45-runny-nose-直-read": {
      "text": "直",
      "pinyin": "zhí",
      "meaning": "straight; in 一直 yìzhí",
      "note": "Recognition/read card.",
      "tokens": [
        "直"
      ]
    },
    "u45-runny-nose-流-read": {
      "text": "流",
      "pinyin": "liú",
      "meaning": "to flow",
      "note": "Recognition/read card.",
      "tokens": [
        "流"
      ]
    },
    "u45-runny-nose-鼻-read": {
      "text": "鼻",
      "pinyin": "bí",
      "meaning": "nose; in 鼻水",
      "note": "Recognition/read card.",
      "tokens": [
        "鼻"
      ]
    },
    "u45-head-appetite-痛-read": {
      "text": "痛",
      "pinyin": "tòng",
      "meaning": "painful; hurts",
      "note": "Recognition/read card.",
      "tokens": [
        "痛"
      ]
    },
    "u45-head-appetite-胃-read": {
      "text": "胃",
      "pinyin": "wèi",
      "meaning": "stomach; in 胃口",
      "note": "Recognition/read card.",
      "tokens": [
        "胃"
      ]
    },
    "u45-throat-喉-read": {
      "text": "喉",
      "pinyin": "hóu",
      "meaning": "part of 喉嚨",
      "note": "Recognition/read card.",
      "tokens": [
        "喉"
      ]
    },
    "u45-throat-嚨-read": {
      "text": "嚨",
      "pinyin": "lóng",
      "meaning": "part of 喉嚨",
      "note": "Recognition/read card.",
      "tokens": [
        "嚨"
      ]
    },
    "u45-throat-發-read": {
      "text": "發",
      "pinyin": "fā",
      "meaning": "seen in 發炎 / 發燒",
      "note": "Recognition/read card.",
      "tokens": [
        "發"
      ]
    },
    "u45-throat-炎-read": {
      "text": "炎",
      "pinyin": "yán",
      "meaning": "inflammation; in 發炎",
      "note": "Recognition/read card.",
      "tokens": [
        "炎"
      ]
    },
    "u45-sick-fever-病-read": {
      "text": "病",
      "pinyin": "bìng",
      "meaning": "illness; sick",
      "note": "Recognition/read card.",
      "tokens": [
        "病"
      ]
    },
    "u45-sick-fever-燒-read": {
      "text": "燒",
      "pinyin": "shāo",
      "meaning": "burn; in 發燒",
      "note": "Recognition/read card.",
      "tokens": [
        "燒"
      ]
    },
    "u45-doctor-lex": {
      "text": "醫生",
      "pinyin": "yīshēng",
      "meaning": "doctor",
      "note": "Meaning-first lexical explanation.",
      "tokens": [
        "醫生"
      ]
    },
    "u45-runny-lex": {
      "text": "一直／流／鼻水",
      "pinyin": "yìzhí / liú / bíshuǐ",
      "meaning": "continuously; all the way / flow / nasal mucus; runny nose",
      "note": "Meaning-first lexical explanation.",
      "tokens": [
        "一直／流／鼻水"
      ]
    },
    "u45-head-lex": {
      "text": "頭／痛／胃口／差",
      "pinyin": "tóu / tòng / wèikǒu / chā",
      "meaning": "head / painful; hurts / appetite / poor; bad",
      "note": "Meaning-first lexical explanation; 差 is chā in 胃口很差.",
      "tokens": [
        "頭／痛／胃口／差"
      ]
    },
    "u45-throat-lex": {
      "text": "喉嚨／發炎",
      "pinyin": "hóulóng / fāyán",
      "meaning": "throat / be inflamed",
      "note": "Meaning-first lexical explanation.",
      "tokens": [
        "喉嚨／發炎"
      ]
    },
    "u45-sick-lex": {
      "text": "生病／發燒",
      "pinyin": "shēngbìng / fāshāo",
      "meaning": "be sick / have a fever",
      "note": "Meaning-first lexical explanation; lexical use only.",
      "tokens": [
        "生病／發燒"
      ]
    },
    "u45-health-inquiry": {
      "text": "哪裡不舒服？",
      "pinyin": "Nǎlǐ bù shūfu?",
      "meaning": "Where do you feel unwell?",
      "note": "Health-condition use of known 哪裡 + 不舒服.",
      "tokens": [
        "哪裡",
        "不舒服"
      ]
    },
    "u45-runny-source": {
      "text": "我一直流鼻水。",
      "pinyin": "Wǒ yìzhí liú bíshuǐ.",
      "meaning": "I have continuously had a runny nose.",
      "note": "",
      "tokens": [
        "我",
        "一直",
        "流鼻水"
      ]
    },
    "u45-head-appetite-source": {
      "text": "頭很痛，胃口很差。",
      "pinyin": "Tóu hěn tòng, wèikǒu hěn chā.",
      "meaning": "My head hurts, and my appetite is poor.",
      "note": "",
      "tokens": [
        "頭很痛",
        "胃口很差"
      ]
    },
    "u45-totality-review": {
      "text": "什麼東西都不想吃。",
      "pinyin": "Shénme dōngxi dōu bù xiǎng chī.",
      "meaning": "I don't want to eat anything.",
      "note": "Review of Unit-40 question-word + 都 totality.",
      "tokens": [
        "什麼東西都不想吃。"
      ]
    },
    "u45-duration-question": {
      "text": "大概多久了？",
      "pinyin": "Dàgài duōjiǔ le?",
      "meaning": "About how long has it been?",
      "note": "Symptom-duration integration.",
      "tokens": [
        "大概多久了？"
      ]
    },
    "u45-duration-answer": {
      "text": "已經四、五天了。",
      "pinyin": "Yǐjīng sì, wǔ tiān le.",
      "meaning": "It has already been four or five days.",
      "note": "",
      "tokens": [
        "已經",
        "四、五天",
        "了"
      ]
    },
    "u45-throat-source": {
      "text": "喉嚨有一點發炎。",
      "pinyin": "Hóulóng yǒu yìdiǎn fāyán.",
      "meaning": "The throat is a little inflamed.",
      "note": "有一點 + state is review language.",
      "tokens": [
        "喉嚨",
        "有一點",
        "發炎"
      ]
    },
    "u45-sick-basic": {
      "text": "我生病了。",
      "pinyin": "Wǒ shēngbìng le.",
      "meaning": "I am sick.",
      "note": "Lexical use only; no productive separable-verb splitting yet.",
      "tokens": [
        "我生病了。"
      ]
    },
    "u45-fever-basic": {
      "text": "我有一點發燒。",
      "pinyin": "Wǒ yǒu yìdiǎn fāshāo.",
      "meaning": "I have a slight fever.",
      "note": "",
      "tokens": [
        "我有一點發燒。"
      ]
    },
    "u45-dialogue-1-5": {
      "text": "醫生：你哪裡不舒服？\n病人：我一直流鼻水，頭很痛，胃口很差。什麼東西都不想吃。\n醫生：大概多久了？\n病人：已經四、五天了。\n醫生：我看看你的喉嚨。喉嚨有一點發炎。",
      "pinyin": "Yīshēng: Nǐ nǎlǐ bù shūfu?\nBìngrén: Wǒ yìzhí liú bíshuǐ, tóu hěn tòng, wèikǒu hěn chā. Shénme dōngxi dōu bù xiǎng chī.\nYīshēng: Dàgài duōjiǔ le?\nBìngrén: Yǐjīng sì, wǔ tiān le.\nYīshēng: Wǒ kànkan nǐ de hóulóng. Hóulóng yǒu yìdiǎn fāyán.",
      "meaning": "Adapted source doctor-patient exchange, D1T01–D1T05.",
      "note": "Direct address is normalized to 你; source name glyphs are not required.",
      "tokens": [
        "醫生：你哪裡不舒服？\n病人：我一直流鼻水，頭很痛，胃口很差。什麼東西都不想吃。\n醫生：大概多久了？\n病人：已經四、五天了。\n醫生：我看看你的喉嚨。喉嚨有一點發炎。"
      ]
    }
  },
  "revisionStepIds": []
};
export default unit;
