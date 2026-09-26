import type {UnitData} from '../schema.ts';

const unit:UnitData = {
  "schemaVersion": 1,
  "bookId": "book-1",
  "order": 47,
  "unit": {
    "id": "unit-47",
    "number": 47,
    "theme": "orange",
    "bookReference": "Lesson 15 Dialogue II opening, Grammar III, and Activity V.",
    "label": "Stomach trouble & help",
    "title": "Stomach Trouble and Getting Help",
    "description": "Describe stomach trouble, offer or decline help, and sequence a completed event with 就.",
    "chars": [
      "臉",
      "肚",
      "吐",
      "陪",
      "健",
      "康",
      "保",
      "險"
    ],
    "lessonIds": [
      "u47-whats-wrong",
      "u47-stomach",
      "u47-vle-jiu",
      "u47-accompany",
      "u47-health-center",
      "u47-refuse-help",
      "u47-review"
    ],
    "banner": {
      "text": "你怎麼了？",
      "pinyin": "Nǐ zěnme le?"
    },
    "goal": {
      "text": "我陪你去看病，好不好？",
      "pinyin": "Wǒ péi nǐ qù kànbìng, hǎo bu hǎo?",
      "meaning": "I'll go with you to see a doctor, okay?"
    },
    "grammarIds": [
      "u47-vle-jiu"
    ]
  },
  "reviewLessonId": "u47-review",
  "lessons": [
    {
      "id": "u47-whats-wrong",
      "title": "What Is Wrong?",
      "subtitle": "Use a concern question and describe someone's complexion.",
      "chars": [
        "臉"
      ],
      "minutes": "11–17 min",
      "unitId": "unit-47",
      "review": false,
      "steps": [
        {
          "id": "u47-what-臉-read",
          "type": "phrase",
          "phrase": "u47-臉-read"
        },
        {
          "id": "u47-whats-wrong-臉-intro",
          "type": "intro",
          "char": "臉"
        },
        {
          "id": "u47-whats-wrong-臉-trace",
          "type": "trace",
          "char": "臉"
        },
        {
          "id": "u47-whats-wrong-臉-build",
          "type": "build",
          "char": "臉"
        },
        {
          "id": "u47-whats-wrong-臉-complete",
          "type": "complete",
          "char": "臉"
        },
        {
          "id": "u47-whats-wrong-臉-memory",
          "type": "memory",
          "char": "臉"
        },
        {
          "id": "u47-p001-explain",
          "type": "phrase",
          "phrase": "u47-whats-wrong-source"
        },
        {
          "id": "u47-what-lex-explain",
          "type": "phrase",
          "phrase": "u47-what-lex"
        },
        {
          "id": "u47-what-s1",
          "type": "select",
          "prompt": "怎麼了 means…",
          "options": [
            "What's wrong?",
            "How many?",
            "How long?"
          ],
          "answer": "What's wrong?",
          "explanation": "怎麼了 is the Lesson-15 condition inquiry."
        },
        {
          "id": "u47-what-s2",
          "type": "select",
          "prompt": "臉色 means…",
          "options": [
            "facial complexion / color",
            "appetite",
            "health insurance"
          ],
          "answer": "facial complexion / color",
          "explanation": "臉色 refers to the look/color of someone's face."
        },
        {
          "id": "u47-what-s3",
          "type": "select",
          "prompt": "難看 means…",
          "options": [
            "not to look good",
            "healthy",
            "several times"
          ],
          "answer": "not to look good",
          "explanation": "難看 describes looking bad here."
        },
        {
          "id": "u47-what-p1",
          "type": "phrase",
          "phrase": "u47-whats-wrong-source"
        },
        {
          "id": "u47-what-s4",
          "type": "select",
          "prompt": "Why does 你怎麼了？ fit this scene?",
          "options": [
            "It asks with concern about the person's condition.",
            "It asks how many times something happened.",
            "It compares two people's health."
          ],
          "answer": "It asks with concern about the person's condition.",
          "explanation": "That is P001's pragmatic function."
        },
        {
          "id": "u47-what-l1",
          "type": "listen",
          "char": "臉",
          "audioText": "你怎麼了？臉色這麼難看。",
          "prompt": "What observation follows the concern question?",
          "options": [
            "the person's complexion looks bad",
            "the person slept eight hours",
            "the person has insurance"
          ],
          "answer": "the person's complexion looks bad",
          "explanation": "臉色這麼難看 describes the person's appearance.",
          "semanticAnswer": true
        }
      ]
    },
    {
      "id": "u47-stomach",
      "title": "Stomach Trouble",
      "subtitle": "Describe stomach discomfort and repeated vomiting.",
      "chars": [
        "肚",
        "吐"
      ],
      "minutes": "11–17 min",
      "unitId": "unit-47",
      "review": false,
      "steps": [
        {
          "id": "u47-stomach-肚-read",
          "type": "phrase",
          "phrase": "u47-肚-read"
        },
        {
          "id": "u47-stomach-肚-intro",
          "type": "intro",
          "char": "肚"
        },
        {
          "id": "u47-stomach-肚-trace",
          "type": "trace",
          "char": "肚"
        },
        {
          "id": "u47-stomach-肚-build",
          "type": "build",
          "char": "肚"
        },
        {
          "id": "u47-stomach-肚-complete",
          "type": "complete",
          "char": "肚"
        },
        {
          "id": "u47-stomach-肚-memory",
          "type": "memory",
          "char": "肚"
        },
        {
          "id": "u47-stomach-吐-read",
          "type": "phrase",
          "phrase": "u47-吐-read"
        },
        {
          "id": "u47-stomach-吐-intro",
          "type": "intro",
          "char": "吐"
        },
        {
          "id": "u47-stomach-吐-trace",
          "type": "trace",
          "char": "吐"
        },
        {
          "id": "u47-stomach-吐-build",
          "type": "build",
          "char": "吐"
        },
        {
          "id": "u47-stomach-吐-complete",
          "type": "complete",
          "char": "吐"
        },
        {
          "id": "u47-stomach-吐-memory",
          "type": "memory",
          "char": "吐"
        },
        {
          "id": "u47-stomach-lex-explain",
          "type": "phrase",
          "phrase": "u47-stomach-lex"
        },
        {
          "id": "u47-stomach-s1",
          "type": "select",
          "prompt": "肚子 means…",
          "options": [
            "stomach/abdomen",
            "throat",
            "head"
          ],
          "answer": "stomach/abdomen",
          "explanation": "肚子 means stomach/abdomen."
        },
        {
          "id": "u47-stomach-s2",
          "type": "select",
          "prompt": "吐 means…",
          "options": [
            "vomit",
            "rest",
            "accompany"
          ],
          "answer": "vomit",
          "explanation": "吐 means vomit."
        },
        {
          "id": "u47-stomach-s3",
          "type": "select",
          "prompt": "次 means…",
          "options": [
            "occurrence counter",
            "packet counter",
            "hour"
          ],
          "answer": "occurrence counter",
          "explanation": "次 counts occurrences."
        },
        {
          "id": "u47-stomach-ji-review",
          "type": "phrase",
          "phrase": "u47-several-times"
        },
        {
          "id": "u47-stomach-x008",
          "type": "phrase",
          "phrase": "u47-several-times"
        },
        {
          "id": "u47-stomach-s4",
          "type": "select",
          "prompt": "In 好幾次, 幾 means…",
          "options": [
            "a few/several",
            "how many?",
            "all"
          ],
          "answer": "a few/several",
          "explanation": "This directly retrieves the Unit-46 semantic expansion."
        },
        {
          "id": "u47-stomach-p1",
          "type": "phrase",
          "phrase": "u47-stomach-basic"
        },
        {
          "id": "u47-stomach-p2",
          "type": "phrase",
          "phrase": "u47-several-times"
        },
        {
          "id": "u47-stomach-s5",
          "type": "select",
          "prompt": "Which says “vomited several times”?",
          "options": [
            "吐了好幾次。",
            "吐了幾次？",
            "吐了一次。"
          ],
          "answer": "吐了好幾次。",
          "explanation": "好幾次 is a statement meaning several times."
        },
        {
          "id": "u47-stomach-l1",
          "type": "listen",
          "char": "吐",
          "audioText": "肚子很不舒服，還吐了好幾次。",
          "prompt": "Which two problems do you hear?",
          "options": [
            "stomach discomfort and repeated vomiting",
            "a cold and poor appetite",
            "head pain and throat inflammation"
          ],
          "answer": "stomach discomfort and repeated vomiting",
          "explanation": "The audio combines 肚子很不舒服 with 吐了好幾次.",
          "semanticAnswer": true
        }
      ]
    },
    {
      "id": "u47-vle-jiu",
      "title": "Right After Doing It",
      "subtitle": "Sequence a completed event and its immediate result.",
      "chars": [],
      "minutes": "11–17 min",
      "unitId": "unit-47",
      "review": false,
      "steps": [
        {
          "id": "u47-g3-review",
          "type": "phrase",
          "phrase": "u47-g3-prereq-review"
        },
        {
          "id": "u47-vle-jiu",
          "type": "grammar",
          "grammar": "u47-vle-jiu"
        },
        {
          "id": "u47-g3-s1",
          "type": "select",
          "prompt": "Which sentence means “After taking medicine, he immediately went to sleep”?",
          "options": [
            "他吃了藥就睡覺。",
            "他一吃了藥以後，就睡覺。",
            "他吃藥幾次？"
          ],
          "answer": "他吃了藥就睡覺。",
          "explanation": "V了…就… marks completed event 1 followed immediately by event 2.",
          "grammarIds": [
            "u47-vle-jiu"
          ]
        },
        {
          "id": "u47-g3-s2",
          "type": "select",
          "prompt": "Which version is source-compatible with 以後?",
          "options": [
            "他吃了藥以後，就睡覺。",
            "他一吃了藥以後，就睡覺。",
            "他吃藥不吃藥就睡覺。"
          ],
          "answer": "他吃了藥以後，就睡覺。",
          "explanation": "G003 allows 以後."
        },
        {
          "id": "u47-g3-s3",
          "type": "select",
          "prompt": "How should G003 normally form a question in this lesson?",
          "options": [
            "with 嗎 or 是不是",
            "with an ordinary A-not-A of the first verb",
            "with 都"
          ],
          "answer": "with 嗎 or 是不是",
          "explanation": "The source says ordinary A-not-A is unavailable."
        },
        {
          "id": "u47-g3-s4",
          "type": "select",
          "prompt": "Which contrast is correct?",
          "options": [
            "一…就… favors a short first verbal phrase; V了…就… can take a fuller completed first event",
            "V了…就… cannot use 以後",
            "一…就… requires a completed-action 了"
          ],
          "answer": "一…就… favors a short first verbal phrase; V了…就… can take a fuller completed first event",
          "explanation": "This is the source-required contrast."
        },
        {
          "id": "u47-g3-p1",
          "type": "phrase",
          "phrase": "u47-d2t02-full"
        },
        {
          "id": "u47-g3-s5",
          "type": "select",
          "prompt": "In 吃了東西就吐, what is the first completed event?",
          "options": [
            "吃了東西",
            "就吐",
            "好幾次"
          ],
          "answer": "吃了東西",
          "explanation": "The first event is eating something; vomiting follows."
        },
        {
          "id": "u47-g3-l1",
          "type": "listen",
          "char": "吐",
          "audioText": "吃了東西就吐。",
          "prompt": "What happened right after eating?",
          "options": [
            "vomiting",
            "sleeping",
            "going to a pharmacy"
          ],
          "answer": "vomiting",
          "explanation": "就 introduces the immediate next event.",
          "semanticAnswer": true
        },
        {
          "id": "u47-g3-o1",
          "type": "order",
          "phrase": "u47-g3-order",
          "tokens": [
            "他吃了藥以後",
            "就睡覺"
          ]
        }
      ]
    },
    {
      "id": "u47-accompany",
      "title": "I Will Go With You",
      "subtitle": "Offer to accompany someone to see a doctor.",
      "chars": [
        "陪"
      ],
      "minutes": "11–17 min",
      "unitId": "unit-47",
      "review": false,
      "steps": [
        {
          "id": "u47-acc-陪-read",
          "type": "phrase",
          "phrase": "u47-陪-read"
        },
        {
          "id": "u47-accompany-陪-intro",
          "type": "intro",
          "char": "陪"
        },
        {
          "id": "u47-accompany-陪-trace",
          "type": "trace",
          "char": "陪"
        },
        {
          "id": "u47-accompany-陪-build",
          "type": "build",
          "char": "陪"
        },
        {
          "id": "u47-accompany-陪-complete",
          "type": "complete",
          "char": "陪"
        },
        {
          "id": "u47-accompany-陪-memory",
          "type": "memory",
          "char": "陪"
        },
        {
          "id": "u47-accompany-lex-explain",
          "type": "phrase",
          "phrase": "u47-accompany-lex"
        },
        {
          "id": "u47-acc-s1",
          "type": "select",
          "prompt": "陪 means…",
          "options": [
            "accompany",
            "vomit",
            "insure"
          ],
          "answer": "accompany",
          "explanation": "陪 means accompany."
        },
        {
          "id": "u47-acc-s2",
          "type": "select",
          "prompt": "看病 means…",
          "options": [
            "see a doctor",
            "have a cold",
            "take medicine"
          ],
          "answer": "see a doctor",
          "explanation": "看病 means see a doctor."
        },
        {
          "id": "u47-acc-p003",
          "type": "phrase",
          "phrase": "u47-accompany-source"
        },
        {
          "id": "u47-acc-p1",
          "type": "phrase",
          "phrase": "u47-accompany-source"
        },
        {
          "id": "u47-acc-s3",
          "type": "select",
          "prompt": "What is the speaker offering to do?",
          "options": [
            "accompany the person to see a doctor",
            "buy insurance for the person",
            "compare how long they slept"
          ],
          "answer": "accompany the person to see a doctor",
          "explanation": "陪你去看病 is an offer of help."
        },
        {
          "id": "u47-acc-s4",
          "type": "select",
          "prompt": "What does 好不好 do here?",
          "options": [
            "checks whether the listener agrees to the helpful proposal",
            "asks how many times",
            "marks a comparison"
          ],
          "answer": "checks whether the listener agrees to the helpful proposal",
          "explanation": "This retrieves the earlier proposal/agreement use."
        },
        {
          "id": "u47-acc-l1",
          "type": "listen",
          "char": "陪",
          "audioText": "我陪你去看病，好不好？",
          "prompt": "Which helpful action do you hear?",
          "options": [
            "陪你去看病",
            "把藥吃了",
            "多休息"
          ],
          "answer": "陪你去看病",
          "explanation": "The offer is to accompany the listener to see a doctor."
        },
        {
          "id": "u47-acc-o1",
          "type": "order",
          "phrase": "u47-accompany-source",
          "tokens": [
            "你這麼不舒服",
            "我陪你",
            "去看病",
            "好不好"
          ]
        }
      ]
    },
    {
      "id": "u47-health-center",
      "title": "Health Insurance and the Health Center",
      "subtitle": "Politely decline help and discuss insurance/health-center options.",
      "chars": [
        "健",
        "康",
        "保",
        "險"
      ],
      "minutes": "11–17 min",
      "unitId": "unit-47",
      "review": false,
      "steps": [
        {
          "id": "u47-refusal-explain",
          "type": "phrase",
          "phrase": "u47-refusal"
        },
        {
          "id": "u47-health-s1",
          "type": "select",
          "prompt": "不用 了 is best understood here as…",
          "options": [
            "No need / It's not necessary.",
            "Don't use it.",
            "I used it already."
          ],
          "answer": "No need / It's not necessary.",
          "explanation": "This is the source refusal function."
        },
        {
          "id": "u47-health-健-read",
          "type": "phrase",
          "phrase": "u47-健-read"
        },
        {
          "id": "u47-health-center-健-intro",
          "type": "intro",
          "char": "健"
        },
        {
          "id": "u47-health-center-健-trace",
          "type": "trace",
          "char": "健"
        },
        {
          "id": "u47-health-center-健-build",
          "type": "build",
          "char": "健"
        },
        {
          "id": "u47-health-center-健-complete",
          "type": "complete",
          "char": "健"
        },
        {
          "id": "u47-health-center-健-memory",
          "type": "memory",
          "char": "健"
        },
        {
          "id": "u47-health-康-read",
          "type": "phrase",
          "phrase": "u47-康-read"
        },
        {
          "id": "u47-health-center-康-intro",
          "type": "intro",
          "char": "康"
        },
        {
          "id": "u47-health-center-康-trace",
          "type": "trace",
          "char": "康"
        },
        {
          "id": "u47-health-center-康-build",
          "type": "build",
          "char": "康"
        },
        {
          "id": "u47-health-center-康-complete",
          "type": "complete",
          "char": "康"
        },
        {
          "id": "u47-health-center-康-memory",
          "type": "memory",
          "char": "康"
        },
        {
          "id": "u47-health-保-read",
          "type": "phrase",
          "phrase": "u47-保-read"
        },
        {
          "id": "u47-health-center-保-intro",
          "type": "intro",
          "char": "保"
        },
        {
          "id": "u47-health-center-保-trace",
          "type": "trace",
          "char": "保"
        },
        {
          "id": "u47-health-center-保-build",
          "type": "build",
          "char": "保"
        },
        {
          "id": "u47-health-center-保-complete",
          "type": "complete",
          "char": "保"
        },
        {
          "id": "u47-health-center-保-memory",
          "type": "memory",
          "char": "保"
        },
        {
          "id": "u47-health-險-read",
          "type": "phrase",
          "phrase": "u47-險-read"
        },
        {
          "id": "u47-health-center-險-intro",
          "type": "intro",
          "char": "險"
        },
        {
          "id": "u47-health-center-險-trace",
          "type": "trace",
          "char": "險"
        },
        {
          "id": "u47-health-center-險-build",
          "type": "build",
          "char": "險"
        },
        {
          "id": "u47-health-center-險-complete",
          "type": "complete",
          "char": "險"
        },
        {
          "id": "u47-health-center-險-memory",
          "type": "memory",
          "char": "險"
        },
        {
          "id": "u47-health-lex-explain",
          "type": "phrase",
          "phrase": "u47-health-lex"
        },
        {
          "id": "u47-health-s2",
          "type": "select",
          "prompt": "健康 means…",
          "options": [
            "health",
            "medicine",
            "concern"
          ],
          "answer": "health",
          "explanation": "健康 means health."
        },
        {
          "id": "u47-health-s3",
          "type": "select",
          "prompt": "保險 means…",
          "options": [
            "insurance",
            "pharmacy",
            "condition"
          ],
          "answer": "insurance",
          "explanation": "保險 means insurance."
        },
        {
          "id": "u47-health-s4",
          "type": "select",
          "prompt": "健康中心 means…",
          "options": [
            "health center",
            "pharmacy",
            "home"
          ],
          "answer": "health center",
          "explanation": "健康中心 means health center."
        },
        {
          "id": "u47-health-p1",
          "type": "phrase",
          "phrase": "u47-refusal"
        },
        {
          "id": "u47-health-p2",
          "type": "phrase",
          "phrase": "u47-insurance-source"
        },
        {
          "id": "u47-health-p3",
          "type": "phrase",
          "phrase": "u47-health-center-source"
        },
        {
          "id": "u47-x010-explain",
          "type": "phrase",
          "phrase": "u47-polite-staff"
        },
        {
          "id": "u47-health-p4",
          "type": "phrase",
          "phrase": "u47-polite-staff"
        },
        {
          "id": "u47-health-s5",
          "type": "select",
          "prompt": "In 對學生也很客氣, who receives the politeness?",
          "options": [
            "students",
            "medicine",
            "the health center"
          ],
          "answer": "students",
          "explanation": "對 + person marks the person toward whom someone is polite."
        },
        {
          "id": "u47-x011-explain",
          "type": "phrase",
          "phrase": "u47-pharmacy-enough"
        },
        {
          "id": "u47-health-p5",
          "type": "phrase",
          "phrase": "u47-pharmacy-enough"
        },
        {
          "id": "u47-health-s6",
          "type": "select",
          "prompt": "What does 買藥就好了 express here?",
          "options": [
            "buying medicine will be enough",
            "buy medicine immediately after vomiting",
            "medicine is better than insurance"
          ],
          "answer": "buying medicine will be enough",
          "explanation": "This is X011's contextual extension."
        },
        {
          "id": "u47-health-l1",
          "type": "listen",
          "char": "保",
          "audioText": "我在臺灣沒有健康保險。",
          "prompt": "What does the speaker say they do not have?",
          "options": [
            "健康保險",
            "藥",
            "胃口"
          ],
          "answer": "健康保險",
          "explanation": "The sentence says the speaker has no health insurance."
        }
      ]
    },
    {
      "id": "u47-refuse-help",
      "title": "Health Check-In",
      "subtitle": "Integrate Dialogue II and complete the four-question health call.",
      "chars": [],
      "minutes": "11–17 min",
      "unitId": "unit-47",
      "review": false,
      "steps": [
        {
          "id": "u47-refuse-p1",
          "type": "phrase",
          "phrase": "u47-confirm-doctor"
        },
        {
          "id": "u47-integrated",
          "type": "phrase",
          "phrase": "u47-d2t02-full"
        },
        {
          "id": "u47-integrated-s1",
          "type": "select",
          "prompt": "Which sequence best matches the episode?",
          "options": [
            "notice bad complexion → hear stomach/vomiting symptoms → offer to accompany → help is declined → suggest health center → pharmacy preferred",
            "ask duration → compare rent → read a prescription → discuss weather",
            "buy medicine → ask about typhoons → compare actions → refuse food"
          ],
          "answer": "notice bad complexion → hear stomach/vomiting symptoms → offer to accompany → help is declined → suggest health center → pharmacy preferred",
          "explanation": "This is the D2T01–D2T07 communicative arc."
        },
        {
          "id": "u47-a005-p1",
          "type": "phrase",
          "phrase": "u47-a005-scenario"
        },
        {
          "id": "u47-a005-s1",
          "type": "select",
          "prompt": "Which question asks where the person feels unwell?",
          "options": [
            "哪裡不舒服？",
            "有沒有發燒？",
            "胃口怎麼樣？"
          ],
          "answer": "哪裡不舒服？",
          "explanation": "This is one of the four required health-condition questions."
        },
        {
          "id": "u47-a005-s2",
          "type": "select",
          "prompt": "Which question checks for fever?",
          "options": [
            "有沒有發燒？",
            "喉嚨怎麼樣？",
            "哪裡不舒服？"
          ],
          "answer": "有沒有發燒？",
          "explanation": "發燒 is the fever vocabulary from Unit 45."
        },
        {
          "id": "u47-a005-s3",
          "type": "select",
          "prompt": "Which question checks the throat?",
          "options": [
            "喉嚨怎麼樣？",
            "胃口怎麼樣？",
            "有沒有發燒？"
          ],
          "answer": "喉嚨怎麼樣？",
          "explanation": "This asks about the throat condition."
        },
        {
          "id": "u47-a005-s4",
          "type": "select",
          "prompt": "Which question checks appetite?",
          "options": [
            "胃口怎麼樣？",
            "喉嚨怎麼樣？",
            "哪裡不舒服？"
          ],
          "answer": "胃口怎麼樣？",
          "explanation": "This asks about appetite."
        },
        {
          "id": "u47-a005-o1",
          "type": "order",
          "phrase": "u47-a005-scenario",
          "tokens": [
            "哪裡不舒服",
            "有沒有發燒"
          ]
        },
        {
          "id": "u47-a005-l1",
          "type": "listen",
          "char": "臉",
          "audioText": "你真的不去看病嗎？",
          "prompt": "What is being confirmed?",
          "options": [
            "that the person really will not see a doctor",
            "that the person has insurance",
            "that the person slept several hours"
          ],
          "answer": "that the person really will not see a doctor",
          "explanation": "The question confirms refusal to go see a doctor.",
          "semanticAnswer": true
        }
      ]
    },
    {
      "id": "u47-review",
      "title": "Unit 47 Review",
      "subtitle": "Retrieve stomach trouble, help/refusal, G003, and prior-unit health language.",
      "chars": [
        "臉",
        "肚",
        "吐",
        "陪",
        "健",
        "康",
        "保",
        "險"
      ],
      "minutes": "18–22 min",
      "unitId": "unit-47",
      "review": true,
      "steps": [
        {
          "id": "u47-review-l1",
          "type": "listen",
          "char": "臉",
          "audioText": "你怎麼了？臉色這麼難看。",
          "prompt": "What concern is expressed?",
          "options": [
            "the person's condition/appearance",
            "the price of medicine",
            "travel time"
          ],
          "answer": "the person's condition/appearance",
          "explanation": "怎麼了 + 臉色這麼難看 is a health concern.",
          "semanticAnswer": true
        },
        {
          "id": "u47-review-l2",
          "type": "listen",
          "char": "吐",
          "audioText": "還吐了好幾次。",
          "prompt": "How often?",
          "options": [
            "several times",
            "one time",
            "for several hours"
          ],
          "answer": "several times",
          "explanation": "好幾次 means several times.",
          "semanticAnswer": true
        },
        {
          "id": "u47-review-l3",
          "type": "listen",
          "char": "陪",
          "audioText": "我陪你去看病，好不好？",
          "prompt": "What is being offered?",
          "options": [
            "accompanying the person to see a doctor",
            "buying insurance",
            "reading a prescription"
          ],
          "answer": "accompanying the person to see a doctor",
          "explanation": "陪你去看病 is the offer.",
          "semanticAnswer": true
        },
        {
          "id": "u47-review-臉",
          "type": "complete",
          "char": "臉"
        },
        {
          "id": "u47-review-肚",
          "type": "complete",
          "char": "肚"
        },
        {
          "id": "u47-review-吐",
          "type": "complete",
          "char": "吐"
        },
        {
          "id": "u47-review-陪",
          "type": "complete",
          "char": "陪"
        },
        {
          "id": "u47-review-健",
          "type": "complete",
          "char": "健"
        },
        {
          "id": "u47-review-康",
          "type": "complete",
          "char": "康"
        },
        {
          "id": "u47-review-保",
          "type": "complete",
          "char": "保"
        },
        {
          "id": "u47-review-險",
          "type": "complete",
          "char": "險"
        },
        {
          "id": "u47-review-v1",
          "type": "select",
          "prompt": "怎麼了 means…",
          "options": [
            "What's wrong?",
            "how many?",
            "how long?"
          ],
          "answer": "What's wrong?",
          "explanation": "怎麼了 means What's wrong?"
        },
        {
          "id": "u47-review-v2",
          "type": "select",
          "prompt": "臉色 means…",
          "options": [
            "complexion",
            "appetite",
            "medicine"
          ],
          "answer": "complexion",
          "explanation": "臉色 means complexion."
        },
        {
          "id": "u47-review-v3",
          "type": "select",
          "prompt": "難看 means…",
          "options": [
            "look bad",
            "healthy",
            "oily"
          ],
          "answer": "look bad",
          "explanation": "難看 means look bad."
        },
        {
          "id": "u47-review-v4",
          "type": "select",
          "prompt": "肚子 means…",
          "options": [
            "stomach/abdomen",
            "throat",
            "head"
          ],
          "answer": "stomach/abdomen",
          "explanation": "肚子 means stomach/abdomen."
        },
        {
          "id": "u47-review-v5",
          "type": "select",
          "prompt": "吐 means…",
          "options": [
            "vomit",
            "rest",
            "accompany"
          ],
          "answer": "vomit",
          "explanation": "吐 means vomit."
        },
        {
          "id": "u47-review-v6",
          "type": "select",
          "prompt": "次 means…",
          "options": [
            "occurrence counter",
            "packet counter",
            "hour"
          ],
          "answer": "occurrence counter",
          "explanation": "次 counts occurrences."
        },
        {
          "id": "u47-review-v7",
          "type": "select",
          "prompt": "陪 means…",
          "options": [
            "accompany",
            "compare",
            "recover"
          ],
          "answer": "accompany",
          "explanation": "陪 means accompany."
        },
        {
          "id": "u47-review-v8",
          "type": "select",
          "prompt": "看病 means…",
          "options": [
            "see a doctor",
            "have a cold",
            "be inflamed"
          ],
          "answer": "see a doctor",
          "explanation": "看病 means see a doctor."
        },
        {
          "id": "u47-review-v9",
          "type": "select",
          "prompt": "不用了 means…",
          "options": [
            "no need",
            "don't use",
            "already used"
          ],
          "answer": "no need",
          "explanation": "不用了 means no need."
        },
        {
          "id": "u47-review-v10",
          "type": "select",
          "prompt": "健康 means…",
          "options": [
            "health",
            "insurance",
            "concern"
          ],
          "answer": "health",
          "explanation": "健康 means health."
        },
        {
          "id": "u47-review-v11",
          "type": "select",
          "prompt": "保險 means…",
          "options": [
            "insurance",
            "pharmacy",
            "illness"
          ],
          "answer": "insurance",
          "explanation": "保險 means insurance."
        },
        {
          "id": "u47-review-v12",
          "type": "select",
          "prompt": "健康中心 means…",
          "options": [
            "health center",
            "pharmacy",
            "hospital worker"
          ],
          "answer": "health center",
          "explanation": "健康中心 means health center."
        },
        {
          "id": "u47-review-g3",
          "type": "select",
          "prompt": "Which sentence uses V了…就… correctly?",
          "options": [
            "他吃了藥就睡覺。",
            "他一吃了藥以後，就睡覺。",
            "他吃藥不吃藥就睡覺。"
          ],
          "answer": "他吃了藥就睡覺。",
          "explanation": "G003 links a completed first event to an immediate next event.",
          "grammarIds": [
            "u47-vle-jiu"
          ]
        },
        {
          "id": "u47-review-g3contrast",
          "type": "select",
          "prompt": "Which statement about G003 is correct?",
          "options": [
            "It may use 以後 and does not use ordinary A-not-A.",
            "It cannot use 以後.",
            "It is identical to 一…就… in every restriction."
          ],
          "answer": "It may use 以後 and does not use ordinary A-not-A.",
          "explanation": "Both points are source-required."
        },
        {
          "id": "u47-review-ji",
          "type": "select",
          "prompt": "In 好幾次, 幾 means…",
          "options": [
            "a few/several",
            "how many?",
            "all"
          ],
          "answer": "a few/several",
          "explanation": "This is delayed retrieval of the Unit-46 expansion."
        },
        {
          "id": "u47-review-refuse",
          "type": "select",
          "prompt": "Which politely declines the offer 我陪你去看病，好不好？",
          "options": [
            "不用了。",
            "好不好？",
            "怎麼了？"
          ],
          "answer": "不用了。",
          "explanation": "不用了 is the Lesson-15 refusal phrase."
        },
        {
          "id": "u47-review-a005-1",
          "type": "select",
          "prompt": "Which question asks where the person feels unwell?",
          "options": [
            "哪裡不舒服？",
            "有沒有發燒？",
            "胃口怎麼樣？"
          ],
          "answer": "哪裡不舒服？",
          "explanation": "This is one of the four source questions."
        },
        {
          "id": "u47-review-a005-2",
          "type": "select",
          "prompt": "Which question checks for fever?",
          "options": [
            "有沒有發燒？",
            "喉嚨怎麼樣？",
            "哪裡不舒服？"
          ],
          "answer": "有沒有發燒？",
          "explanation": "This checks fever."
        },
        {
          "id": "u47-review-a005-3",
          "type": "select",
          "prompt": "Which question checks the throat?",
          "options": [
            "喉嚨怎麼樣？",
            "胃口怎麼樣？",
            "有沒有發燒？"
          ],
          "answer": "喉嚨怎麼樣？",
          "explanation": "This checks the throat."
        },
        {
          "id": "u47-review-a005-4",
          "type": "select",
          "prompt": "Which question checks appetite?",
          "options": [
            "胃口怎麼樣？",
            "喉嚨怎麼樣？",
            "哪裡不舒服？"
          ],
          "answer": "胃口怎麼樣？",
          "explanation": "This checks appetite."
        },
        {
          "id": "u47-review-cum1",
          "type": "select",
          "prompt": "Which Unit-45 exchange asks duration of symptoms?",
          "options": [
            "大概多久了？／已經四、五天了。",
            "怎麼了？／不用了。",
            "得吃藥嗎？／好不好？"
          ],
          "answer": "大概多久了？／已經四、五天了。",
          "explanation": "Delayed symptom-duration retrieval."
        },
        {
          "id": "u47-review-cum2",
          "type": "select",
          "prompt": "Which Unit-46 item means “must/have to”?",
          "options": [
            "得 děi + V",
            "得 de after a verb",
            "幾 jǐ question only"
          ],
          "answer": "得 děi + V",
          "explanation": "Modal 得 remains distinct from complement 得."
        },
        {
          "id": "u47-review-cum3",
          "type": "select",
          "prompt": "Which is a valid source-style negative 把 order?",
          "options": [
            "別把我的藥吃了。",
            "把別我的藥吃了。",
            "把我的藥別吃了。"
          ],
          "answer": "別把我的藥吃了。",
          "explanation": "Delayed G002 retrieval."
        }
      ]
    }
  ],
  "newVocabulary": [
    {
      "text": "怎麼了",
      "pinyin": "zěnme le",
      "meaning": "What's wrong?",
      "lessonId": "u47-whats-wrong",
      "core": false
    },
    {
      "text": "臉色",
      "pinyin": "liǎnsè",
      "meaning": "facial complexion / color",
      "lessonId": "u47-whats-wrong",
      "core": false
    },
    {
      "text": "難看",
      "pinyin": "nánkàn",
      "meaning": "not to look good",
      "lessonId": "u47-whats-wrong",
      "core": false
    },
    {
      "text": "肚子",
      "pinyin": "dùzi",
      "meaning": "stomach; abdomen",
      "lessonId": "u47-stomach",
      "core": false
    },
    {
      "text": "吐",
      "pinyin": "tù",
      "meaning": "to vomit",
      "lessonId": "u47-stomach",
      "core": false
    },
    {
      "text": "次",
      "pinyin": "cì",
      "meaning": "measure word for occurrences",
      "lessonId": "u47-stomach",
      "core": false
    },
    {
      "text": "陪",
      "pinyin": "péi",
      "meaning": "accompany",
      "lessonId": "u47-accompany",
      "core": false
    },
    {
      "text": "看病",
      "pinyin": "kànbìng",
      "meaning": "see a doctor",
      "lessonId": "u47-accompany",
      "core": false
    },
    {
      "text": "不用了",
      "pinyin": "búyòng le",
      "meaning": "no need / it's not necessary",
      "lessonId": "u47-health-center",
      "core": false
    },
    {
      "text": "健康",
      "pinyin": "jiànkāng",
      "meaning": "health",
      "lessonId": "u47-health-center",
      "core": false
    },
    {
      "text": "保險",
      "pinyin": "bǎoxiǎn",
      "meaning": "insurance",
      "lessonId": "u47-health-center",
      "core": false
    },
    {
      "text": "健康中心",
      "pinyin": "jiànkāng zhōngxīn",
      "meaning": "health center",
      "lessonId": "u47-health-center",
      "core": false
    }
  ],
  "reviewVocabulary": [],
  "newCharacters": [
    "臉",
    "肚",
    "吐",
    "陪",
    "健",
    "康",
    "保",
    "險"
  ],
  "reviewCharacters": [],
  "characters": {
    "臉": {
      "hanzi": "臉",
      "pinyin": "liǎn",
      "zhuyin": "ㄌㄧㄢˇ",
      "meaning": "face",
      "strokes": 17,
      "note": "臉 is formally introduced here in 臉色.",
      "memory": "Link the complete 17-stroke traditional form 臉 to 臉色.",
      "parts": [
        {
          "label": "臉",
          "name": "complete form",
          "role": "Whole-character structure",
          "description": "Practice the full 臉 form used in 臉色; this group covers all of its strokes.",
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
            16
          ]
        }
      ],
      "layout": "whole",
      "example": {
        "text": "臉色",
        "pinyin": "liǎnsè",
        "meaning": "complexion"
      }
    },
    "肚": {
      "hanzi": "肚",
      "pinyin": "dù",
      "zhuyin": "ㄉㄨˋ",
      "meaning": "belly; abdomen",
      "strokes": 7,
      "note": "肚 is formally introduced here in 肚子.",
      "memory": "Link the complete 7-stroke traditional form 肚 to 肚子.",
      "parts": [
        {
          "label": "肚",
          "name": "complete form",
          "role": "Whole-character structure",
          "description": "Practice the full 肚 form used in 肚子; this group covers all of its strokes.",
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
        "text": "肚子",
        "pinyin": "dùzi",
        "meaning": "stomach; abdomen"
      }
    },
    "吐": {
      "hanzi": "吐",
      "pinyin": "tù",
      "zhuyin": "ㄊㄨˋ",
      "meaning": "vomit",
      "strokes": 6,
      "note": "吐 is formally introduced here in 吐.",
      "memory": "Link the complete 6-stroke traditional form 吐 to 吐.",
      "parts": [
        {
          "label": "吐",
          "name": "complete form",
          "role": "Whole-character structure",
          "description": "Practice the full 吐 form used in 吐; this group covers all of its strokes.",
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
        "text": "吐",
        "pinyin": "tù",
        "meaning": "vomit"
      }
    },
    "陪": {
      "hanzi": "陪",
      "pinyin": "péi",
      "zhuyin": "ㄆㄟˊ",
      "meaning": "accompany",
      "strokes": 10,
      "note": "陪 is formally introduced here in 陪你去看病.",
      "memory": "Link the complete 10-stroke traditional form 陪 to 陪你去看病.",
      "parts": [
        {
          "label": "陪",
          "name": "complete form",
          "role": "Whole-character structure",
          "description": "Practice the full 陪 form used in 陪你去看病; this group covers all of its strokes.",
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
        "text": "陪你去看病",
        "pinyin": "péi nǐ qù kànbìng",
        "meaning": "accompany you to see a doctor"
      }
    },
    "健": {
      "hanzi": "健",
      "pinyin": "jiàn",
      "zhuyin": "ㄐㄧㄢˋ",
      "meaning": "healthy; strong",
      "strokes": 10,
      "note": "健 is formally introduced here in 健康.",
      "memory": "Link the complete 10-stroke traditional form 健 to 健康.",
      "parts": [
        {
          "label": "健",
          "name": "complete form",
          "role": "Whole-character structure",
          "description": "Practice the full 健 form used in 健康; this group covers all of its strokes.",
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
        "text": "健康",
        "pinyin": "jiànkāng",
        "meaning": "health"
      }
    },
    "康": {
      "hanzi": "康",
      "pinyin": "kāng",
      "zhuyin": "ㄎㄤ",
      "meaning": "healthy; well",
      "strokes": 11,
      "note": "康 is formally introduced here in 健康.",
      "memory": "Link the complete 11-stroke traditional form 康 to 健康.",
      "parts": [
        {
          "label": "康",
          "name": "complete form",
          "role": "Whole-character structure",
          "description": "Practice the full 康 form used in 健康; this group covers all of its strokes.",
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
        }
      ],
      "layout": "whole",
      "example": {
        "text": "健康",
        "pinyin": "jiànkāng",
        "meaning": "health"
      }
    },
    "保": {
      "hanzi": "保",
      "pinyin": "bǎo",
      "zhuyin": "ㄅㄠˇ",
      "meaning": "protect; insure",
      "strokes": 9,
      "note": "保 is formally introduced here in 保險.",
      "memory": "Link the complete 9-stroke traditional form 保 to 保險.",
      "parts": [
        {
          "label": "保",
          "name": "complete form",
          "role": "Whole-character structure",
          "description": "Practice the full 保 form used in 保險; this group covers all of its strokes.",
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
        "text": "保險",
        "pinyin": "bǎoxiǎn",
        "meaning": "insurance"
      }
    },
    "險": {
      "hanzi": "險",
      "pinyin": "xiǎn",
      "zhuyin": "ㄒㄧㄢˇ",
      "meaning": "risk; insurance component",
      "strokes": 15,
      "note": "險 is formally introduced here in 保險.",
      "memory": "Link the complete 15-stroke traditional form 險 to 保險.",
      "parts": [
        {
          "label": "險",
          "name": "complete form",
          "role": "Whole-character structure",
          "description": "Practice the full 險 form used in 保險; this group covers all of its strokes.",
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
            14
          ]
        }
      ],
      "layout": "whole",
      "example": {
        "text": "保險",
        "pinyin": "bǎoxiǎn",
        "meaning": "insurance"
      }
    }
  },
  "grammarRules": {
    "u47-vle-jiu": {
      "id": "u47-vle-jiu",
      "title": "V了…就… — do B right after completing A",
      "pattern": "[event 1 V了…] + 就 + [event 2]",
      "explanation": "Event 2 follows immediately or very soon after completion of event 1. G003 can use 以後, contrasts with prior 一…就…, and uses 嗎/是不是 rather than an ordinary A-not-A route.",
      "examples": [
        {
          "text": "他吃了藥就睡覺。",
          "pinyin": "Tā chī le yào jiù shuìjiào.",
          "meaning": "After taking medicine, he went right to sleep."
        },
        {
          "text": "他吃了藥以後，就睡覺。",
          "pinyin": "Tā chī le yào yǐhòu, jiù shuìjiào.",
          "meaning": "After taking medicine, he went to sleep."
        },
        {
          "text": "妹妹喝了熱湯，就不覺得冷了。",
          "pinyin": "Mèimei hē le rè tāng, jiù bù juéde lěng le.",
          "meaning": "After younger sister drank hot soup, she no longer felt cold."
        }
      ],
      "remember": "Completed first event + 就 + next event; 以後 is compatible; ordinary A-not-A is not the question route."
    }
  },
  "grammarIntroductions": [
    {
      "id": "u47-vle-jiu",
      "kind": "rule",
      "ref": "u47-vle-jiu",
      "lessonId": "u47-vle-jiu",
      "stepId": "u47-vle-jiu"
    }
  ],
  "reviewGrammar": [],
  "phrases": {
    "u47-what-lex": {
      "text": "怎麼了／臉色／難看",
      "pinyin": "zěnme le / liǎnsè / nánkàn",
      "meaning": "What's wrong? / complexion / look bad",
      "note": "Meaning-first lexical explanation.",
      "tokens": [
        "怎麼了／臉色／難看"
      ]
    },
    "u47-stomach-lex": {
      "text": "肚子／吐／次",
      "pinyin": "dùzi / tù / cì",
      "meaning": "stomach; abdomen / vomit / occurrence counter",
      "note": "Meaning-first lexical explanation.",
      "tokens": [
        "肚子／吐／次"
      ]
    },
    "u47-accompany-lex": {
      "text": "陪／看病",
      "pinyin": "péi / kànbìng",
      "meaning": "accompany / see a doctor",
      "note": "Meaning-first lexical explanation.",
      "tokens": [
        "陪／看病"
      ]
    },
    "u47-health-lex": {
      "text": "健康／保險／健康中心",
      "pinyin": "jiànkāng / bǎoxiǎn / jiànkāng zhōngxīn",
      "meaning": "health / insurance / health center",
      "note": "Meaning-first lexical explanation.",
      "tokens": [
        "健康／保險／健康中心"
      ]
    },
    "u47-whats-wrong-source": {
      "text": "你怎麼了？臉色這麼難看。",
      "pinyin": "Nǐ zěnme le? Liǎnsè zhème nánkàn.",
      "meaning": "What's wrong? Your complexion looks so bad.",
      "note": "P001 concern/condition use.",
      "tokens": [
        "你怎麼了？臉色這麼難看。"
      ]
    },
    "u47-stomach-basic": {
      "text": "昨天晚上肚子很不舒服。",
      "pinyin": "Zuótiān wǎnshang dùzi hěn bù shūfu.",
      "meaning": "My stomach felt very unwell last night.",
      "note": "",
      "tokens": [
        "昨天晚上肚子很不舒服。"
      ]
    },
    "u47-several-times": {
      "text": "吐了好幾次。",
      "pinyin": "Tù le hǎo jǐ cì.",
      "meaning": "Vomited several times.",
      "note": "Requires the Unit-46 幾 expansion.",
      "tokens": [
        "吐了好幾次。"
      ]
    },
    "u47-g3-prereq-review": {
      "text": "吃了藥。／一吃藥就睡覺。／吃藥以後睡覺。",
      "pinyin": "Chī le yào. / Yì chī yào jiù shuìjiào. / Chī yào yǐhòu shuìjiào.",
      "meaning": "Review: completed action with 了 / as soon as...then... / after...",
      "note": "REVIEW only: Unit 39 completed-action 了; Unit 38 一…就…; Unit 36 以後. The new G003 V了…就… pattern is taught next.",
      "tokens": [
        "吃了藥。",
        "一吃藥就睡覺。",
        "吃藥以後睡覺。"
      ],
      "practice": false
    },
    "u47-d2t02-full": {
      "text": "昨天晚上肚子很不舒服，吃了東西就吐，還吐了好幾次。",
      "pinyin": "Zuótiān wǎnshang dùzi hěn bù shūfu, chī le dōngxi jiù tù, hái tù le hǎo jǐ cì.",
      "meaning": "My stomach felt very unwell last night; after eating, I vomited, and I vomited several times.",
      "note": "Shown only after G003.",
      "tokens": [
        "昨天晚上肚子很不舒服，吃了東西就吐，還吐了好幾次。"
      ]
    },
    "u47-accompany-source": {
      "text": "你這麼不舒服，我陪你去看病，好不好？",
      "pinyin": "Nǐ zhème bù shūfu, wǒ péi nǐ qù kànbìng, hǎo bu hǎo?",
      "meaning": "You feel this unwell; I'll go with you to see a doctor, okay?",
      "note": "",
      "tokens": [
        "你這麼不舒服",
        "我陪你",
        "去看病",
        "好不好"
      ]
    },
    "u47-refusal": {
      "text": "不用了。",
      "pinyin": "Búyòng le.",
      "meaning": "No need / It's not necessary.",
      "note": "P002 polite refusal.",
      "tokens": [
        "不用了。"
      ]
    },
    "u47-insurance-source": {
      "text": "我在臺灣沒有健康保險。",
      "pinyin": "Wǒ zài Táiwān méiyǒu jiànkāng bǎoxiǎn.",
      "meaning": "I don't have health insurance in Taiwan.",
      "note": "",
      "tokens": [
        "我在臺灣沒有健康保險。"
      ]
    },
    "u47-health-center-source": {
      "text": "我陪你去學校的健康中心。",
      "pinyin": "Wǒ péi nǐ qù xuéxiào de jiànkāng zhōngxīn.",
      "meaning": "I'll accompany you to the school's health center.",
      "note": "",
      "tokens": [
        "我陪你去學校的健康中心。"
      ]
    },
    "u47-polite-staff": {
      "text": "那裡的醫生很好，對學生也很客氣。",
      "pinyin": "Nàlǐ de yīshēng hěn hǎo, duì xuéshēng yě hěn kèqi.",
      "meaning": "The doctors there are very good and are also very polite to students.",
      "note": "X010: 對 + person + 很客氣.",
      "tokens": [
        "那裡的醫生很好，對學生也很客氣。"
      ]
    },
    "u47-pharmacy-enough": {
      "text": "我想去藥局買藥就好了。",
      "pinyin": "Wǒ xiǎng qù yàojú mǎi yào jiù hǎo le.",
      "meaning": "I think just going to the pharmacy to buy medicine will be enough.",
      "note": "X011: V + 就好了 here means that doing the action will be enough.",
      "tokens": [
        "我想去藥局買藥就好了。"
      ]
    },
    "u47-confirm-doctor": {
      "text": "你真的不去看病嗎？",
      "pinyin": "Nǐ zhēnde bù qù kànbìng ma?",
      "meaning": "Are you really not going to see a doctor?",
      "note": "",
      "tokens": [
        "你真的不去看病嗎？"
      ]
    },
    "u47-a005-scenario": {
      "text": "哪裡不舒服？有沒有發燒？",
      "pinyin": "Nǎlǐ bù shūfu? Yǒu méiyǒu fāshāo?",
      "meaning": "Rúyù is sick at home. Call and ask four source questions: 哪裡不舒服？有沒有發燒？喉嚨怎麼樣？胃口怎麼樣？",
      "note": "Source Activity V scenario; the contextual proper name is romanized so its untaught name glyph is not exposed.",
      "tokens": [
        "哪裡不舒服",
        "有沒有發燒"
      ]
    },
    "u47-臉-read": {
      "text": "臉",
      "pinyin": "liǎn",
      "meaning": "face",
      "note": "Recognition/read card.",
      "tokens": [
        "臉"
      ]
    },
    "u47-肚-read": {
      "text": "肚",
      "pinyin": "dù",
      "meaning": "belly; abdomen",
      "note": "Recognition/read card.",
      "tokens": [
        "肚"
      ]
    },
    "u47-吐-read": {
      "text": "吐",
      "pinyin": "tù",
      "meaning": "vomit",
      "note": "Recognition/read card.",
      "tokens": [
        "吐"
      ]
    },
    "u47-陪-read": {
      "text": "陪",
      "pinyin": "péi",
      "meaning": "accompany",
      "note": "Recognition/read card.",
      "tokens": [
        "陪"
      ]
    },
    "u47-健-read": {
      "text": "健",
      "pinyin": "jiàn",
      "meaning": "healthy; strong",
      "note": "Recognition/read card.",
      "tokens": [
        "健"
      ]
    },
    "u47-康-read": {
      "text": "康",
      "pinyin": "kāng",
      "meaning": "healthy; well",
      "note": "Recognition/read card.",
      "tokens": [
        "康"
      ]
    },
    "u47-保-read": {
      "text": "保",
      "pinyin": "bǎo",
      "meaning": "protect; insure",
      "note": "Recognition/read card.",
      "tokens": [
        "保"
      ]
    },
    "u47-險-read": {
      "text": "險",
      "pinyin": "xiǎn",
      "meaning": "risk; insurance component",
      "note": "Recognition/read card.",
      "tokens": [
        "險"
      ]
    },
    "u47-g3-order": {
      "text": "他吃了藥以後，就睡覺。",
      "pinyin": "Tā chī le yào yǐhòu, jiù shuìjiào.",
      "meaning": "After taking medicine, he went to sleep.",
      "note": "",
      "tokens": [
        "他吃了藥以後",
        "就睡覺"
      ],
      "grammarIds": [
        "u47-vle-jiu"
      ]
    }
  },
  "revisionStepIds": []
};
export default unit;
