import type {UnitData} from '../schema.ts';

const unit:UnitData = {
  "schemaVersion": 1,
  "bookId": "book-1",
  "order": 21,
  "unit": {
    "id": "unit-21",
    "number": 21,
    "theme": "cyan",
    "label": "Gentle actions, appointments & clock time",
    "title": "Making Plans by the Clock",
    "description": "11 new words and forms. Soften requests, make an appointment, tell exact time, and say when you are free.",
    "chars": [
      "唱",
      "歌",
      "見",
      "分",
      "午",
      "時",
      "候",
      "從",
      "空",
      "次",
      "題",
      "對"
    ],
    "lessonIds": [
      "u21-soften",
      "u21-karaoke",
      "u21-clock",
      "u21-time-place",
      "u21-from-to",
      "u21-conversation",
      "u21-review"
    ],
    "banner": {
      "text": "後天晚上七點見面。",
      "pinyin": "Hòutiān wǎnshàng qī diǎn jiànmiàn."
    },
    "goal": {
      "text": "你什麼時候有空？",
      "pinyin": "Nǐ shénme shíhou yǒu kòng?",
      "meaning": "When are you free?"
    },
    "grammarIds": [
      "u21-softened-action",
      "u21-not-the-case",
      "u21-clock-time",
      "u21-time-before-place",
      "u21-from-to-time"
    ],
    "bookReference": "A Course in Contemporary Chinese 1 · Lesson 6, pp. 116–118; Lesson 7, pp. 130–145. Original examples and exercises."
  },
  "reviewLessonId": "u21-review",
  "lessons": [
    {
      "id": "u21-soften",
      "title": "Say It More Gently",
      "subtitle": "Finish Lesson 6 with softened actions and corrective 不是.",
      "chars": [],
      "minutes": "7–9 min",
      "unitId": "unit-21",
      "review": false,
      "steps": [
        {
          "id": "u21-soften-01",
          "type": "grammar",
          "grammar": "u21-softened-action"
        },
        {
          "id": "u21-soften-02",
          "type": "phrase",
          "phrase": "u21-soft-look"
        },
        {
          "id": "u21-soften-03",
          "type": "order",
          "phrase": "u21-soft-look",
          "tokens": [
            "書",
            "看看",
            "我",
            "想"
          ]
        },
        {
          "id": "u21-soften-04",
          "type": "phrase",
          "phrase": "u21-soft-help"
        },
        {
          "id": "u21-soften-05",
          "type": "order",
          "phrase": "u21-soft-help",
          "tokens": [
            "我",
            "請你",
            "幫幫"
          ]
        },
        {
          "id": "u21-soften-06",
          "type": "select",
          "prompt": "Which version makes the request sound lighter? ",
          "options": [
            "請你幫幫我。",
            "請你幫我幫我。"
          ],
          "answer": "請你幫幫我。",
          "explanation": "Repeat the action verb itself: 幫幫. The object stays outside the repetition.",
          "grammarIds": [
            "u21-softened-action"
          ]
        },
        {
          "id": "u21-soften-07",
          "type": "grammar",
          "grammar": "u21-not-the-case"
        },
        {
          "id": "u21-soften-08",
          "type": "phrase",
          "phrase": "u21-not-claim"
        },
        {
          "id": "u21-soften-09",
          "type": "order",
          "phrase": "u21-not-claim",
          "tokens": [
            "上課",
            "我",
            "不想",
            "不是",
            "去",
            "要",
            "我今天"
          ]
        },
        {
          "id": "u21-soften-10",
          "type": "select",
          "prompt": "Someone assumes you do not want to go. Which opening corrects that assumption? ",
          "options": [
            "我不是不想去…",
            "我不想去…"
          ],
          "answer": "我不是不想去…",
          "explanation": "不是不… means “it is not that I do not…”, and prepares a correction.",
          "grammarIds": [
            "u21-not-the-case"
          ]
        }
      ]
    },
    {
      "id": "u21-karaoke",
      "title": "Meet at KTV",
      "subtitle": "Sing, meet friends, and read Taiwan’s KTV shorthand.",
      "chars": [
        "唱",
        "歌",
        "見"
      ],
      "minutes": "9–12 min",
      "unitId": "unit-21",
      "review": false,
      "steps": [
        {
          "id": "u21-karaoke-唱-intro",
          "type": "intro",
          "char": "唱"
        },
        {
          "id": "u21-karaoke-唱-trace",
          "type": "trace",
          "char": "唱"
        },
        {
          "id": "u21-karaoke-唱-build",
          "type": "build",
          "char": "唱"
        },
        {
          "id": "u21-karaoke-唱-complete",
          "type": "complete",
          "char": "唱"
        },
        {
          "id": "u21-karaoke-唱-memory",
          "type": "memory",
          "char": "唱"
        },
        {
          "id": "u21-karaoke-歌-intro",
          "type": "intro",
          "char": "歌"
        },
        {
          "id": "u21-karaoke-歌-trace",
          "type": "trace",
          "char": "歌"
        },
        {
          "id": "u21-karaoke-歌-build",
          "type": "build",
          "char": "歌"
        },
        {
          "id": "u21-karaoke-歌-complete",
          "type": "complete",
          "char": "歌"
        },
        {
          "id": "u21-karaoke-歌-memory",
          "type": "memory",
          "char": "歌"
        },
        {
          "id": "u21-karaoke-見-intro",
          "type": "intro",
          "char": "見"
        },
        {
          "id": "u21-karaoke-見-trace",
          "type": "trace",
          "char": "見"
        },
        {
          "id": "u21-karaoke-見-build",
          "type": "build",
          "char": "見"
        },
        {
          "id": "u21-karaoke-見-complete",
          "type": "complete",
          "char": "見"
        },
        {
          "id": "u21-karaoke-見-memory",
          "type": "memory",
          "char": "見"
        },
        {
          "id": "u21-karaoke-phrase-1",
          "type": "phrase",
          "phrase": "u21-ktv"
        },
        {
          "id": "u21-karaoke-order-1",
          "type": "order",
          "phrase": "u21-ktv",
          "tokens": [
            "吧",
            "唱歌",
            "我們",
            "KTV",
            "去"
          ]
        },
        {
          "id": "u21-karaoke-phrase-2",
          "type": "phrase",
          "phrase": "u21-meet"
        },
        {
          "id": "u21-karaoke-order-2",
          "type": "order",
          "phrase": "u21-meet",
          "tokens": [
            "見面",
            "後天",
            "我",
            "和朋友"
          ]
        },
        {
          "id": "u21-karaoke-select-1",
          "type": "select",
          "prompt": "Which word means “to meet” in this lesson?",
          "options": [
            "見面",
            "唱歌",
            "朋友"
          ],
          "answer": "見面",
          "explanation": "見面 means to meet; 唱歌 means to sing."
        },
        {
          "id": "u21-karaoke-listen-唱",
          "type": "listen",
          "char": "唱",
          "prompt": "Listen and choose the character you hear.",
          "options": [
            "唱",
            "歌",
            "見",
            "分"
          ],
          "answer": "唱",
          "explanation": "唱 is chàng, the verb in 唱歌."
        },
        {
          "id": "u21-karaoke-listen-見",
          "type": "listen",
          "char": "見",
          "prompt": "Listen and choose the character you hear.",
          "options": [
            "見",
            "唱",
            "朋",
            "歌"
          ],
          "answer": "見",
          "explanation": "見 is jiàn, the first character of 見面."
        }
      ]
    },
    {
      "id": "u21-clock",
      "title": "Meet at 9:20",
      "subtitle": "Read exact clock times with 點 and 分.",
      "chars": [
        "分"
      ],
      "minutes": "7–9 min",
      "unitId": "unit-21",
      "review": false,
      "steps": [
        {
          "id": "u21-clock-01",
          "type": "grammar",
          "grammar": "u21-clock-time"
        },
        {
          "id": "u21-clock-分-intro",
          "type": "intro",
          "char": "分"
        },
        {
          "id": "u21-clock-分-trace",
          "type": "trace",
          "char": "分"
        },
        {
          "id": "u21-clock-分-build",
          "type": "build",
          "char": "分"
        },
        {
          "id": "u21-clock-分-complete",
          "type": "complete",
          "char": "分"
        },
        {
          "id": "u21-clock-分-memory",
          "type": "memory",
          "char": "分"
        },
        {
          "id": "u21-clock-phrase-1",
          "type": "phrase",
          "phrase": "u21-nine-twenty"
        },
        {
          "id": "u21-clock-order-1",
          "type": "order",
          "phrase": "u21-nine-twenty",
          "tokens": [
            "二十分",
            "見面",
            "我們",
            "九點"
          ]
        },
        {
          "id": "u21-clock-select-1",
          "type": "select",
          "prompt": "What time is 九點二十分?",
          "options": [
            "9:20",
            "9:02",
            "20:09"
          ],
          "answer": "9:20",
          "explanation": "九點 gives the hour and 二十分 gives twenty minutes.",
          "grammarIds": [
            "u21-clock-time"
          ]
        },
        {
          "id": "u21-clock-select-2",
          "type": "select",
          "prompt": "In 九點, what does 點 mean here?",
          "options": [
            "o’clock / hour marker",
            "to order food",
            "a cup"
          ],
          "answer": "o’clock / hour marker",
          "explanation": "The same written 點 has a clock-time use here.",
          "grammarIds": [
            "u21-clock-time"
          ]
        },
        {
          "id": "u21-clock-listen-分",
          "type": "listen",
          "char": "分",
          "prompt": "Listen and choose the character you hear.",
          "options": [
            "分",
            "見",
            "午",
            "唱"
          ],
          "answer": "分",
          "explanation": "分 is fēn, minute in clock time."
        }
      ]
    },
    {
      "id": "u21-time-place",
      "title": "When and Where",
      "subtitle": "Put time before place and ask when something happens.",
      "chars": [
        "午",
        "時",
        "候"
      ],
      "minutes": "9–12 min",
      "unitId": "unit-21",
      "review": false,
      "steps": [
        {
          "id": "u21-time-place-01",
          "type": "grammar",
          "grammar": "u21-time-before-place"
        },
        {
          "id": "u21-time-place-午-intro",
          "type": "intro",
          "char": "午"
        },
        {
          "id": "u21-time-place-午-trace",
          "type": "trace",
          "char": "午"
        },
        {
          "id": "u21-time-place-午-build",
          "type": "build",
          "char": "午"
        },
        {
          "id": "u21-time-place-午-complete",
          "type": "complete",
          "char": "午"
        },
        {
          "id": "u21-time-place-午-memory",
          "type": "memory",
          "char": "午"
        },
        {
          "id": "u21-time-place-時-intro",
          "type": "intro",
          "char": "時"
        },
        {
          "id": "u21-time-place-時-trace",
          "type": "trace",
          "char": "時"
        },
        {
          "id": "u21-time-place-時-build",
          "type": "build",
          "char": "時"
        },
        {
          "id": "u21-time-place-時-complete",
          "type": "complete",
          "char": "時"
        },
        {
          "id": "u21-time-place-時-memory",
          "type": "memory",
          "char": "時"
        },
        {
          "id": "u21-time-place-候-intro",
          "type": "intro",
          "char": "候"
        },
        {
          "id": "u21-time-place-候-trace",
          "type": "trace",
          "char": "候"
        },
        {
          "id": "u21-time-place-候-build",
          "type": "build",
          "char": "候"
        },
        {
          "id": "u21-time-place-候-complete",
          "type": "complete",
          "char": "候"
        },
        {
          "id": "u21-time-place-候-memory",
          "type": "memory",
          "char": "候"
        },
        {
          "id": "u21-time-place-phrase-1",
          "type": "phrase",
          "phrase": "u21-noon"
        },
        {
          "id": "u21-time-place-order-1",
          "type": "order",
          "phrase": "u21-noon",
          "tokens": [
            "吃飯",
            "在餐廳",
            "中午",
            "我"
          ]
        },
        {
          "id": "u21-time-place-phrase-2",
          "type": "phrase",
          "phrase": "u21-time-place"
        },
        {
          "id": "u21-time-place-order-2",
          "type": "order",
          "phrase": "u21-time-place",
          "tokens": [
            "見面",
            "後天晚上",
            "我們",
            "在學校"
          ]
        },
        {
          "id": "u21-time-place-select-1",
          "type": "select",
          "prompt": "Which order follows the textbook pattern?",
          "options": [
            "我後天晚上在學校見面。",
            "我在學校見面後天晚上。"
          ],
          "answer": "我後天晚上在學校見面。",
          "explanation": "Time comes before place, and both come before the event.",
          "grammarIds": [
            "u21-time-before-place"
          ]
        },
        {
          "id": "u21-time-place-listen-午",
          "type": "listen",
          "char": "午",
          "prompt": "Listen and choose the character you hear.",
          "options": [
            "午",
            "時",
            "候",
            "分"
          ],
          "answer": "午",
          "explanation": "午 is wǔ, the noon character in 中午."
        },
        {
          "id": "u21-time-place-listen-時",
          "type": "listen",
          "char": "時",
          "prompt": "Listen and choose the character you hear.",
          "options": [
            "時",
            "候",
            "午",
            "見"
          ],
          "answer": "時",
          "explanation": "時 is shí, the first character of 時候."
        }
      ]
    },
    {
      "id": "u21-from-to",
      "title": "From Morning to Noon",
      "subtitle": "Frame a time range and say when you are free.",
      "chars": [
        "從",
        "空"
      ],
      "minutes": "8–11 min",
      "unitId": "unit-21",
      "review": false,
      "steps": [
        {
          "id": "u21-from-to-01",
          "type": "grammar",
          "grammar": "u21-from-to-time"
        },
        {
          "id": "u21-from-to-從-intro",
          "type": "intro",
          "char": "從"
        },
        {
          "id": "u21-from-to-從-trace",
          "type": "trace",
          "char": "從"
        },
        {
          "id": "u21-from-to-從-build",
          "type": "build",
          "char": "從"
        },
        {
          "id": "u21-from-to-從-complete",
          "type": "complete",
          "char": "從"
        },
        {
          "id": "u21-from-to-從-memory",
          "type": "memory",
          "char": "從"
        },
        {
          "id": "u21-from-to-空-intro",
          "type": "intro",
          "char": "空"
        },
        {
          "id": "u21-from-to-空-trace",
          "type": "trace",
          "char": "空"
        },
        {
          "id": "u21-from-to-空-build",
          "type": "build",
          "char": "空"
        },
        {
          "id": "u21-from-to-空-complete",
          "type": "complete",
          "char": "空"
        },
        {
          "id": "u21-from-to-空-memory",
          "type": "memory",
          "char": "空"
        },
        {
          "id": "u21-from-to-phrase-1",
          "type": "phrase",
          "phrase": "u21-range"
        },
        {
          "id": "u21-from-to-order-1",
          "type": "order",
          "phrase": "u21-range",
          "tokens": [
            "我",
            "中午",
            "有空",
            "從",
            "都",
            "早上七點",
            "到"
          ]
        },
        {
          "id": "u21-from-to-phrase-2",
          "type": "phrase",
          "phrase": "u21-when-free"
        },
        {
          "id": "u21-from-to-order-2",
          "type": "order",
          "phrase": "u21-when-free",
          "tokens": [
            "有空",
            "你",
            "什麼時候"
          ]
        },
        {
          "id": "u21-from-to-select-1",
          "type": "select",
          "prompt": "In 從早上七點到中午, which word marks the starting point?",
          "options": [
            "從",
            "到",
            "中午"
          ],
          "answer": "從",
          "explanation": "從 marks the start; 到 marks the endpoint.",
          "grammarIds": [
            "u21-from-to-time"
          ]
        },
        {
          "id": "u21-from-to-select-2",
          "type": "select",
          "prompt": "Which means “to be free / have available time”?",
          "options": [
            "有空",
            "沒有",
            "有問題"
          ],
          "answer": "有空",
          "explanation": "有空 literally has 空 and means to be free or available."
        },
        {
          "id": "u21-from-to-listen-從",
          "type": "listen",
          "char": "從",
          "prompt": "Listen and choose the character you hear.",
          "options": [
            "從",
            "到",
            "空",
            "午"
          ],
          "answer": "從",
          "explanation": "從 is cóng, from."
        },
        {
          "id": "u21-from-to-listen-空",
          "type": "listen",
          "char": "空",
          "prompt": "Listen and choose the character you hear.",
          "options": [
            "空",
            "從",
            "時",
            "次"
          ],
          "answer": "空",
          "explanation": "空 is kòng in 有空."
        }
      ]
    },
    {
      "id": "u21-conversation",
      "title": "Keep the Plan Moving",
      "subtitle": "Use next time, no problem, and by the way naturally.",
      "chars": [
        "次",
        "題",
        "對"
      ],
      "minutes": "9–12 min",
      "unitId": "unit-21",
      "review": false,
      "steps": [
        {
          "id": "u21-conversation-次-intro",
          "type": "intro",
          "char": "次"
        },
        {
          "id": "u21-conversation-次-trace",
          "type": "trace",
          "char": "次"
        },
        {
          "id": "u21-conversation-次-build",
          "type": "build",
          "char": "次"
        },
        {
          "id": "u21-conversation-次-complete",
          "type": "complete",
          "char": "次"
        },
        {
          "id": "u21-conversation-次-memory",
          "type": "memory",
          "char": "次"
        },
        {
          "id": "u21-conversation-題-intro",
          "type": "intro",
          "char": "題"
        },
        {
          "id": "u21-conversation-題-trace",
          "type": "trace",
          "char": "題"
        },
        {
          "id": "u21-conversation-題-build",
          "type": "build",
          "char": "題"
        },
        {
          "id": "u21-conversation-題-complete",
          "type": "complete",
          "char": "題"
        },
        {
          "id": "u21-conversation-題-memory",
          "type": "memory",
          "char": "題"
        },
        {
          "id": "u21-conversation-對-intro",
          "type": "intro",
          "char": "對"
        },
        {
          "id": "u21-conversation-對-trace",
          "type": "trace",
          "char": "對"
        },
        {
          "id": "u21-conversation-對-build",
          "type": "build",
          "char": "對"
        },
        {
          "id": "u21-conversation-對-complete",
          "type": "complete",
          "char": "對"
        },
        {
          "id": "u21-conversation-對-memory",
          "type": "memory",
          "char": "對"
        },
        {
          "id": "u21-conversation-phrase-1",
          "type": "phrase",
          "phrase": "u21-next-time"
        },
        {
          "id": "u21-conversation-order-1",
          "type": "order",
          "phrase": "u21-next-time",
          "tokens": [
            "去",
            "下次",
            "吧",
            "一起"
          ]
        },
        {
          "id": "u21-conversation-phrase-2",
          "type": "phrase",
          "phrase": "u21-no-problem"
        },
        {
          "id": "u21-conversation-order-2",
          "type": "order",
          "phrase": "u21-no-problem",
          "tokens": [
            "有空",
            "沒問題",
            "我",
            "後天"
          ]
        },
        {
          "id": "u21-conversation-phrase-3",
          "type": "phrase",
          "phrase": "u21-by-way"
        },
        {
          "id": "u21-conversation-order-3",
          "type": "order",
          "phrase": "u21-by-way",
          "tokens": [
            "什麼時候",
            "對了",
            "你",
            "有空"
          ]
        },
        {
          "id": "u21-conversation-select-1",
          "type": "select",
          "prompt": "Which phrase means “next time”?",
          "options": [
            "下次",
            "後天",
            "中午"
          ],
          "answer": "下次",
          "explanation": "下次 refers to the next occasion."
        },
        {
          "id": "u21-conversation-select-2",
          "type": "select",
          "prompt": "Which response means “No problem”?",
          "options": [
            "沒問題",
            "對了",
            "有空"
          ],
          "answer": "沒問題",
          "explanation": "沒問題 is the set response “No problem.”"
        },
        {
          "id": "u21-conversation-select-3",
          "type": "select",
          "prompt": "Which phrase is used like “By the way…” when remembering another point?",
          "options": [
            "對了",
            "沒問題",
            "下次"
          ],
          "answer": "對了",
          "explanation": "對了 can shift to a newly remembered topic."
        },
        {
          "id": "u21-conversation-listen-次",
          "type": "listen",
          "char": "次",
          "prompt": "Listen and choose the character you hear.",
          "options": [
            "次",
            "題",
            "對",
            "分"
          ],
          "answer": "次",
          "explanation": "次 is cì, the occurrence counter in 下次."
        },
        {
          "id": "u21-conversation-listen-題",
          "type": "listen",
          "char": "題",
          "prompt": "Listen and choose the character you hear.",
          "options": [
            "題",
            "對",
            "次",
            "時"
          ],
          "answer": "題",
          "explanation": "題 is tí, the second character of 問題."
        },
        {
          "id": "u21-conversation-listen-對",
          "type": "listen",
          "char": "對",
          "prompt": "Listen and choose the character you hear.",
          "options": [
            "對",
            "題",
            "見",
            "空"
          ],
          "answer": "對",
          "explanation": "對 is duì, first character of 對了."
        }
      ]
    },
    {
      "id": "u21-review",
      "title": "Unit 21 Review",
      "subtitle": "Appointments, clock time, ranges, and gentle corrections.",
      "chars": [
        "唱",
        "歌",
        "見",
        "分",
        "午",
        "時",
        "候",
        "從",
        "空",
        "次",
        "題",
        "對"
      ],
      "minutes": "8–11 min",
      "unitId": "unit-21",
      "review": true,
      "steps": [
        {
          "id": "u21-review-01",
          "type": "match",
          "chars": [
            "唱",
            "見",
            "分",
            "午"
          ]
        },
        {
          "id": "u21-review-02",
          "type": "match",
          "chars": [
            "時",
            "從",
            "空",
            "對"
          ]
        },
        {
          "id": "u21-review-03",
          "type": "build",
          "char": "歌"
        },
        {
          "id": "u21-review-04",
          "type": "build",
          "char": "題"
        },
        {
          "id": "u21-review-05",
          "type": "memory",
          "char": "從"
        },
        {
          "id": "u21-review-06",
          "type": "memory",
          "char": "候"
        },
        {
          "id": "u21-review-07",
          "type": "order",
          "phrase": "u21-nine-twenty",
          "tokens": [
            "九點",
            "見面",
            "二十分",
            "我們"
          ]
        },
        {
          "id": "u21-review-08",
          "type": "order",
          "phrase": "u21-range",
          "tokens": [
            "到",
            "有空",
            "我",
            "早上七點",
            "都",
            "從",
            "中午"
          ]
        },
        {
          "id": "u21-review-09",
          "type": "order",
          "phrase": "u21-by-way",
          "tokens": [
            "你",
            "有空",
            "對了",
            "什麼時候"
          ]
        },
        {
          "id": "u21-review-10",
          "type": "select",
          "prompt": "Which sentence places time before place?",
          "options": [
            "我們後天晚上在學校見面。",
            "我們在學校見面後天晚上。"
          ],
          "answer": "我們後天晚上在學校見面。",
          "explanation": "Use Time → Place → Event.",
          "grammarIds": [
            "u21-time-before-place"
          ]
        },
        {
          "id": "u21-review-11",
          "type": "select",
          "prompt": "Which construction means “from A to B”?",
          "options": [
            "從 A 到 B",
            "到 A 從 B",
            "A 從 到 B"
          ],
          "answer": "從 A 到 B",
          "explanation": "從 marks the start and 到 the endpoint.",
          "grammarIds": [
            "u21-from-to-time"
          ]
        },
        {
          "id": "u21-review-12",
          "type": "select",
          "prompt": "Which sentence uses softened verb reduplication correctly?",
          "options": [
            "我想看看書。",
            "我想看書看書。"
          ],
          "answer": "我想看看書。",
          "explanation": "Repeat the action verb, not the verb-object phrase.",
          "grammarIds": [
            "u21-softened-action"
          ]
        },
        {
          "id": "u21-review-13",
          "type": "select",
          "prompt": "Which opening means “It is not that I don’t want to go…”?",
          "options": [
            "我不是不想去…",
            "我不想去…"
          ],
          "answer": "我不是不想去…",
          "explanation": "不是不… rejects the negative assumption.",
          "grammarIds": [
            "u21-not-the-case"
          ]
        },
        {
          "id": "u21-review-14",
          "type": "listen",
          "char": "唱",
          "prompt": "Listen and choose the character you hear.",
          "options": [
            "唱",
            "歌",
            "見",
            "分"
          ],
          "answer": "唱",
          "explanation": "唱 is chàng."
        },
        {
          "id": "u21-review-15",
          "type": "listen",
          "char": "時",
          "prompt": "Listen and choose the character you hear.",
          "options": [
            "時",
            "候",
            "次",
            "對"
          ],
          "answer": "時",
          "explanation": "時 is shí."
        },
        {
          "id": "u21-review-16",
          "type": "listen",
          "char": "從",
          "prompt": "Listen and choose the character you hear.",
          "options": [
            "從",
            "空",
            "午",
            "分"
          ],
          "answer": "從",
          "explanation": "從 is cóng."
        },
        {
          "id": "u21-review-17",
          "type": "listen",
          "char": "題",
          "prompt": "Listen and choose the character you hear.",
          "options": [
            "題",
            "對",
            "見",
            "歌"
          ],
          "answer": "題",
          "explanation": "題 is tí."
        },
        {
          "id": "u21-review-18",
          "type": "phrase",
          "phrase": "u21-no-problem"
        }
      ]
    }
  ],
  "newVocabulary": [
    {
      "text": "唱歌",
      "pinyin": "chànggē",
      "meaning": "to sing",
      "lessonId": "u21-karaoke",
      "core": true,
      "note": "A separable verb in the textbook."
    },
    {
      "text": "見面",
      "pinyin": "jiànmiàn",
      "meaning": "to meet",
      "lessonId": "u21-karaoke",
      "core": true,
      "note": "A separable verb in the textbook."
    },
    {
      "text": "分",
      "pinyin": "fēn",
      "meaning": "minute",
      "lessonId": "u21-clock",
      "core": true
    },
    {
      "text": "中午",
      "pinyin": "zhōngwǔ",
      "meaning": "noon",
      "lessonId": "u21-time-place",
      "core": true
    },
    {
      "text": "時候",
      "pinyin": "shíhou",
      "meaning": "time; when (in 什麼時候)",
      "lessonId": "u21-time-place",
      "core": true
    },
    {
      "text": "從",
      "pinyin": "cóng",
      "meaning": "from",
      "lessonId": "u21-from-to",
      "core": true
    },
    {
      "text": "後天",
      "pinyin": "hòutiān",
      "meaning": "the day after tomorrow",
      "lessonId": "u21-from-to",
      "core": true
    },
    {
      "text": "有空",
      "pinyin": "yǒu kòng",
      "meaning": "to be free; have available time",
      "lessonId": "u21-from-to",
      "core": true
    },
    {
      "text": "下次",
      "pinyin": "xià cì",
      "meaning": "next time",
      "lessonId": "u21-conversation",
      "core": true
    },
    {
      "text": "沒問題",
      "pinyin": "méi wèntí",
      "meaning": "no problem",
      "lessonId": "u21-conversation",
      "core": true
    },
    {
      "text": "對了",
      "pinyin": "duìle",
      "meaning": "by the way; oh, right",
      "lessonId": "u21-conversation",
      "core": true
    }
  ],
  "reviewVocabulary": [
    "你",
    "我",
    "我們",
    "朋友",
    "早上",
    "晚上",
    "七",
    "九",
    "十",
    "二",
    "學校",
    "圖書館",
    "宿舍",
    "餐廳",
    "去",
    "來",
    "看",
    "聽",
    "想",
    "吃飯",
    "一起",
    "可以",
    "請",
    "找",
    "到",
    "現在",
    "很",
    "喜歡",
    "不",
    "上課",
    "家",
    "吧",
    "都"
  ],
  "newCharacters": [
    "唱",
    "歌",
    "見",
    "分",
    "午",
    "時",
    "候",
    "從",
    "空",
    "次",
    "題",
    "對"
  ],
  "reviewCharacters": [],
  "characters": {
    "唱": {
      "hanzi": "唱",
      "pinyin": "chàng",
      "zhuyin": "ㄔㄤˋ",
      "meaning": "sing",
      "strokes": 11,
      "note": "唱 is the action verb in 唱歌, “to sing.” It is fourth-tone chàng.",
      "memory": "A small 口 on the left faces a stacked 昌 on the right: picture a mouth producing song.",
      "parts": [
        {
          "label": "口",
          "name": "mouth component",
          "role": "Meaning cue",
          "description": "The three-stroke 口 sits tightly on the left and cues an action done with the mouth.",
          "strokes": [
            0,
            1,
            2
          ]
        },
        {
          "label": "昌",
          "name": "right sound block",
          "role": "Sound/shape component",
          "description": "The right side is two 日-like boxes stacked vertically; keep both compact and aligned.",
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
      "layout": "side",
      "example": {
        "text": "唱歌",
        "pinyin": "chànggē",
        "meaning": "to sing"
      }
    },
    "歌": {
      "hanzi": "歌",
      "pinyin": "gē",
      "zhuyin": "ㄍㄜ",
      "meaning": "song",
      "strokes": 14,
      "note": "歌 is first-tone gē. In 唱歌, it names song while 唱 supplies the action.",
      "memory": "The repeated square-and-hook shapes of 哥 stand beside 欠, whose final strokes open outward like a singer taking a breath.",
      "parts": [
        {
          "label": "哥",
          "name": "left block",
          "role": "Sound/shape component",
          "description": "The first ten strokes build the dense 哥 block on the left, with two 口-like sections and hooks.",
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
        },
        {
          "label": "欠",
          "name": "right component",
          "role": "Visual component",
          "description": "The last four strokes form 欠 on the right, ending with the long right-falling stroke.",
          "strokes": [
            10,
            11,
            12,
            13
          ]
        }
      ],
      "layout": "side",
      "example": {
        "text": "唱歌",
        "pinyin": "chànggē",
        "meaning": "to sing"
      }
    },
    "見": {
      "hanzi": "見",
      "pinyin": "jiàn",
      "zhuyin": "ㄐㄧㄢˋ",
      "meaning": "see; meet",
      "strokes": 7,
      "note": "見 is fourth-tone jiàn. In 見面 it contributes the idea of seeing or meeting someone.",
      "memory": "A five-stroke 目 eye stands above two 儿-like legs: an eye that goes out to see.",
      "parts": [
        {
          "label": "目",
          "name": "eye component",
          "role": "Meaning cue",
          "description": "The first five strokes form 目, a tall eye-shaped box with two inner horizontals.",
          "strokes": [
            0,
            1,
            2,
            3,
            4
          ]
        },
        {
          "label": "儿",
          "name": "lower legs",
          "role": "Visual component",
          "description": "The final two strokes spread below the eye; the last one bends and extends to the right.",
          "strokes": [
            5,
            6
          ]
        }
      ],
      "layout": "stack",
      "example": {
        "text": "見面",
        "pinyin": "jiànmiàn",
        "meaning": "to meet"
      }
    },
    "分": {
      "hanzi": "分",
      "pinyin": "fēn",
      "zhuyin": "ㄈㄣ",
      "meaning": "minute",
      "strokes": 4,
      "note": "分 is first-tone fēn when it counts minutes in clock time, as in 二十分.",
      "memory": "八 opens at the top over 刀 below; the four strokes divide the character into two clear parts.",
      "parts": [
        {
          "label": "八",
          "name": "top split",
          "role": "Visual component",
          "description": "Two short spreading strokes form 八 at the top.",
          "strokes": [
            0,
            1
          ]
        },
        {
          "label": "刀",
          "name": "lower knife",
          "role": "Visual component",
          "description": "The last two strokes form 刀 underneath, with the second stroke sweeping down-left.",
          "strokes": [
            2,
            3
          ]
        }
      ],
      "layout": "stack",
      "example": {
        "text": "二十分",
        "pinyin": "èrshí fēn",
        "meaning": "twenty minutes"
      }
    },
    "從": {
      "hanzi": "從",
      "pinyin": "cóng",
      "zhuyin": "ㄘㄨㄥˊ",
      "meaning": "from",
      "strokes": 11,
      "note": "從 is second-tone cóng. It marks a starting point before 到 introduces the endpoint.",
      "memory": "A narrow 彳 steps along the left while the right side stacks two person-like shapes above the finishing foot strokes.",
      "parts": [
        {
          "label": "彳",
          "name": "step component",
          "role": "Movement cue",
          "description": "The first three strokes form the narrow 彳 along the left edge.",
          "strokes": [
            0,
            1,
            2
          ]
        },
        {
          "label": "right",
          "name": "right group",
          "role": "Visual component",
          "description": "The remaining eight strokes build two person-like upper shapes and the lower movement strokes, ending with a long rightward sweep.",
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
      "layout": "side",
      "example": {
        "text": "從早上到中午",
        "pinyin": "cóng zǎoshàng dào zhōngwǔ",
        "meaning": "from morning to noon"
      }
    },
    "午": {
      "hanzi": "午",
      "pinyin": "wǔ",
      "zhuyin": "ㄨˇ",
      "meaning": "noon",
      "strokes": 4,
      "note": "午 is third-tone wǔ. In 中午 it refers to noon or midday.",
      "memory": "A short slant leads into two horizontals crossed by one vertical; keep the lower horizontal longer.",
      "parts": [
        {
          "label": "丿",
          "name": "top slant",
          "role": "Visual cue",
          "description": "Begin with the short left-falling stroke at the upper left.",
          "strokes": [
            0
          ]
        },
        {
          "label": "十",
          "name": "crossed lower group",
          "role": "Visual component",
          "description": "The remaining three strokes form two horizontal bars crossed by the final vertical.",
          "strokes": [
            1,
            2,
            3
          ]
        }
      ],
      "layout": "stack",
      "example": {
        "text": "中午",
        "pinyin": "zhōngwǔ",
        "meaning": "noon"
      }
    },
    "時": {
      "hanzi": "時",
      "pinyin": "shí",
      "zhuyin": "ㄕˊ",
      "meaning": "time",
      "strokes": 10,
      "note": "時 is second-tone shí. It appears in 時候, a common way to talk about when something happens.",
      "memory": "日 on the left is the sun/time cue; 寺 fills the right side with 土 above 寸.",
      "parts": [
        {
          "label": "日",
          "name": "sun component",
          "role": "Time cue",
          "description": "The first four strokes make the narrow 日 on the left.",
          "strokes": [
            0,
            1,
            2,
            3
          ]
        },
        {
          "label": "寺",
          "name": "right component",
          "role": "Sound/shape component",
          "description": "The last six strokes form 寺 on the right, with a compact upper cross and 寸-like base.",
          "strokes": [
            4,
            5,
            6,
            7,
            8,
            9
          ]
        }
      ],
      "layout": "side",
      "example": {
        "text": "時候",
        "pinyin": "shíhou",
        "meaning": "time; when"
      }
    },
    "候": {
      "hanzi": "候",
      "pinyin": "hòu",
      "zhuyin": "ㄏㄡˋ",
      "meaning": "time; wait",
      "strokes": 10,
      "note": "候 is fourth-tone hòu in 時候. The word 時候 is used in questions such as 什麼時候 “when.”",
      "memory": "A slim 亻 person stands at the left of a taller right block; keep the right side narrow enough to balance the person.",
      "parts": [
        {
          "label": "亻",
          "name": "person component",
          "role": "Visual component",
          "description": "The first two strokes form the narrow person radical on the left.",
          "strokes": [
            0,
            1
          ]
        },
        {
          "label": "侯",
          "name": "right block",
          "role": "Sound/shape component",
          "description": "The last eight strokes form the compact right block, with a short vertical near the top and the long final right-falling stroke at the bottom.",
          "strokes": [
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
      "layout": "side",
      "example": {
        "text": "什麼時候",
        "pinyin": "shénme shíhou",
        "meaning": "when"
      }
    },
    "空": {
      "hanzi": "空",
      "pinyin": "kòng",
      "zhuyin": "ㄎㄨㄥˋ",
      "meaning": "free; unoccupied",
      "strokes": 8,
      "note": "空 is fourth-tone kòng in 有空, meaning to be free or have available time.",
      "memory": "穴 opens like a roofed space above 工: picture an empty space under a roof.",
      "parts": [
        {
          "label": "穴",
          "name": "cave/space component",
          "role": "Meaning cue",
          "description": "The first five strokes form 穴, a roof with two small strokes opening underneath.",
          "strokes": [
            0,
            1,
            2,
            3,
            4
          ]
        },
        {
          "label": "工",
          "name": "lower component",
          "role": "Visual component",
          "description": "The final three strokes form 工, centered under the upper space.",
          "strokes": [
            5,
            6,
            7
          ]
        }
      ],
      "layout": "stack",
      "example": {
        "text": "有空",
        "pinyin": "yǒu kòng",
        "meaning": "to be free"
      }
    },
    "次": {
      "hanzi": "次",
      "pinyin": "cì",
      "zhuyin": "ㄘˋ",
      "meaning": "time; occurrence",
      "strokes": 6,
      "note": "次 is fourth-tone cì. In 下次 it means the next time or next occasion.",
      "memory": "Two small strokes on the left sit beside 欠 on the right; the final stroke of 欠 opens far to the right.",
      "parts": [
        {
          "label": "冫",
          "name": "two-dot left side",
          "role": "Visual component",
          "description": "The first two strokes are a dot and rising stroke on the left.",
          "strokes": [
            0,
            1
          ]
        },
        {
          "label": "欠",
          "name": "right component",
          "role": "Visual component",
          "description": "The last four strokes form 欠, finishing with the long right-falling stroke.",
          "strokes": [
            2,
            3,
            4,
            5
          ]
        }
      ],
      "layout": "side",
      "example": {
        "text": "下次",
        "pinyin": "xià cì",
        "meaning": "next time"
      }
    },
    "題": {
      "hanzi": "題",
      "pinyin": "tí",
      "zhuyin": "ㄊㄧˊ",
      "meaning": "question; topic",
      "strokes": 18,
      "note": "題 is second-tone tí. In 問題 it means a question or problem; 沒問題 means “no problem.”",
      "memory": "是 fills the left side while the traditional 頁 head/page component forms the right side.",
      "parts": [
        {
          "label": "是",
          "name": "left component",
          "role": "Sound/shape component",
          "description": "The first nine strokes form 是, beginning with 日 and ending in the sweeping lower strokes.",
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
          "label": "頁",
          "name": "head/page component",
          "role": "Meaning/shape component",
          "description": "The last nine strokes form traditional 頁 on the right, with a boxed middle and two closing lower strokes.",
          "strokes": [
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
      "layout": "side",
      "example": {
        "text": "沒問題",
        "pinyin": "méi wèntí",
        "meaning": "no problem"
      }
    },
    "對": {
      "hanzi": "對",
      "pinyin": "duì",
      "zhuyin": "ㄉㄨㄟˋ",
      "meaning": "correct; toward",
      "strokes": 14,
      "note": "對 is fourth-tone duì. In 對了, it is a conversational cue meaning “by the way” or “oh, right.”",
      "memory": "A dense vertical left block balances 寸 on the lower right; keep the final dot of 寸 distinct.",
      "parts": [
        {
          "label": "丵",
          "name": "left block",
          "role": "Visual component",
          "description": "The first eleven strokes form the dense left and central structure, with paired short strokes at the top and a vertical spine.",
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
          "label": "寸",
          "name": "right-lower component",
          "role": "Visual component",
          "description": "The final three strokes form 寸: a horizontal-hook structure followed by the small dot.",
          "strokes": [
            11,
            12,
            13
          ]
        }
      ],
      "layout": "side",
      "example": {
        "text": "對了",
        "pinyin": "duìle",
        "meaning": "by the way"
      }
    }
  },
  "grammarRules": {
    "u21-softened-action": {
      "id": "u21-softened-action",
      "title": "Soften an action with V-(一)-V",
      "pattern": "V(-一-)V",
      "explanation": "Repeating a mainly monosyllabic action verb presents the action as small, brief or tentative. In requests and suggestions it also makes the tone more moderate. When the verb has an object, repeat the verb, not the object: 看看書, not 看書看書.",
      "examples": [
        {
          "text": "我想看看書。",
          "pinyin": "Wǒ xiǎng kànkan shū.",
          "meaning": "I want to read a little."
        },
        {
          "text": "請你幫幫我。",
          "pinyin": "Qǐng nǐ bāngbang wǒ.",
          "meaning": "Please help me a bit."
        },
        {
          "text": "我想一想。",
          "pinyin": "Wǒ xiǎng yì xiǎng.",
          "meaning": "Let me think about it."
        }
      ],
      "remember": "Use this mainly with action verbs. V一V and VV have the same softening idea; do not reduplicate every verb automatically.",
      "words": [
        "看",
        "想",
        "做",
        "買",
        "教",
        "幫"
      ]
    },
    "u21-not-the-case": {
      "id": "u21-not-the-case",
      "title": "Correct an assumption with 不是",
      "pattern": "不是 + [claimed or assumed information]",
      "explanation": "不是 can reject a whole claim or assumption, not just identify a noun. It says “it is not the case that…”. It can even come before a negative clause: 不是不… means “it is not that I do not…”, usually before a correction or explanation.",
      "examples": [
        {
          "text": "他不是在樓下，他在二樓。",
          "pinyin": "Tā bú shì zài lóuxià, tā zài èr lóu.",
          "meaning": "It is not the case that he is downstairs; he is on the second floor."
        },
        {
          "text": "我不是不想去，我今天要上課。",
          "pinyin": "Wǒ bú shì bù xiǎng qù, wǒ jīntiān yào shàngkè.",
          "meaning": "It is not that I do not want to go; I have class today."
        }
      ],
      "remember": "Regular 不 negates a verb or state. 不是 here rejects what someone has said, assumed or contrasted.",
      "words": [
        "不是",
        "不"
      ]
    },
    "u21-clock-time": {
      "id": "u21-clock-time",
      "title": "Tell clock time with 點 and 分",
      "pattern": "number + 點 (+ number + 分)",
      "explanation": "Use 點 after the hour and 分 after minutes. The character 點 was learned earlier as “to order”; in clock time it is the measure for the hour. 分 here means minute. Put the hour before the minutes.",
      "examples": [
        {
          "text": "九點二十分",
          "pinyin": "jiǔ diǎn èrshí fēn",
          "meaning": "9:20"
        },
        {
          "text": "晚上七點",
          "pinyin": "wǎnshàng qī diǎn",
          "meaning": "7:00 in the evening"
        }
      ],
      "remember": "Clock time is a time-when expression: 九點二十分, not 二十分九點.",
      "words": [
        "點",
        "分"
      ]
    },
    "u21-time-before-place": {
      "id": "u21-time-before-place",
      "title": "Put time before place",
      "pattern": "Subject + Time + Place + Event",
      "explanation": "When both time and place are stated, Chinese normally places the time before the place, and both come before the event. The subject may come before the time or immediately after it. This follows the textbook’s Time + Place + Event order.",
      "examples": [
        {
          "text": "我們後天晚上在學校見面。",
          "pinyin": "Wǒmen hòutiān wǎnshàng zài xuéxiào jiànmiàn.",
          "meaning": "We will meet at school the evening after tomorrow."
        },
        {
          "text": "我中午在餐廳吃飯。",
          "pinyin": "Wǒ zhōngwǔ zài cāntīng chīfàn.",
          "meaning": "I eat lunch at the restaurant at noon."
        }
      ],
      "remember": "Think: WHEN → WHERE → WHAT HAPPENS. Do not put a time expression at the end just because English can.",
      "words": [
        "中午",
        "後天",
        "時候"
      ]
    },
    "u21-from-to-time": {
      "id": "u21-from-to-time",
      "title": "Mark a range with 從…到…",
      "pattern": "從 + A + 到 + B",
      "explanation": "從 marks the starting point and 到 marks the endpoint. A and B may be times or places. In this unit, use the pattern especially to frame a time range, such as from morning to noon.",
      "examples": [
        {
          "text": "從早上七點到中午，我都有空。",
          "pinyin": "Cóng zǎoshàng qī diǎn dào zhōngwǔ, wǒ dōu yǒu kòng.",
          "meaning": "I am free from 7 in the morning until noon."
        },
        {
          "text": "從圖書館到宿舍不遠。",
          "pinyin": "Cóng túshūguǎn dào sùshè bù yuǎn.",
          "meaning": "It is not far from the library to the dorm."
        }
      ],
      "remember": "從 = start; 到 = end. Keep the two endpoints in their real order.",
      "words": [
        "從",
        "到"
      ]
    }
  },
  "grammarIntroductions": [
    {
      "id": "u21-softened-action",
      "kind": "rule",
      "ref": "u21-softened-action",
      "lessonId": "u21-soften",
      "stepId": "u21-soften-01"
    },
    {
      "id": "u21-not-the-case",
      "kind": "rule",
      "ref": "u21-not-the-case",
      "lessonId": "u21-soften",
      "stepId": "u21-soften-07"
    },
    {
      "id": "u21-clock-time",
      "kind": "rule",
      "ref": "u21-clock-time",
      "lessonId": "u21-clock",
      "stepId": "u21-clock-01"
    },
    {
      "id": "u21-time-before-place",
      "kind": "rule",
      "ref": "u21-time-before-place",
      "lessonId": "u21-time-place",
      "stepId": "u21-time-place-01"
    },
    {
      "id": "u21-from-to-time",
      "kind": "rule",
      "ref": "u21-from-to-time",
      "lessonId": "u21-from-to",
      "stepId": "u21-from-to-01"
    }
  ],
  "reviewGrammar": [],
  "phrases": {
    "u21-soft-look": {
      "text": "我想看看書。",
      "pinyin": "Wǒ xiǎng kànkan shū.",
      "meaning": "I want to read a little.",
      "note": "The repeated 看 makes the action feel light or brief.",
      "tokens": [
        "我",
        "想",
        "看看",
        "書"
      ],
      "grammarIds": [
        "u21-softened-action"
      ]
    },
    "u21-soft-help": {
      "text": "請你幫幫我。",
      "pinyin": "Qǐng nǐ bāngbang wǒ.",
      "meaning": "Please help me a bit.",
      "note": "幫幫 softens the request.",
      "tokens": [
        "請你",
        "幫幫",
        "我"
      ],
      "grammarIds": [
        "u21-softened-action"
      ]
    },
    "u21-not-claim": {
      "text": "我不是不想去，我今天要上課。",
      "pinyin": "Wǒ bú shì bù xiǎng qù, wǒ jīntiān yào shàngkè.",
      "meaning": "It is not that I do not want to go; I have class today.",
      "note": "不是不… rejects the assumption that the speaker does not want to go.",
      "tokens": [
        "我",
        "不是",
        "不想",
        "去",
        "我今天",
        "要",
        "上課"
      ],
      "grammarIds": [
        "u21-not-the-case"
      ]
    },
    "u21-ktv": {
      "text": "我們去KTV唱歌吧！",
      "pinyin": "Wǒmen qù KTV chànggē ba!",
      "meaning": "Let’s go sing at KTV!",
      "note": "KTV is the common Taiwan term for a karaoke venue; the textbook lists it as a noun.",
      "tokens": [
        "我們",
        "去",
        "KTV",
        "唱歌",
        "吧"
      ]
    },
    "u21-meet": {
      "text": "我後天和朋友見面。",
      "pinyin": "Wǒ hòutiān hé péngyǒu jiànmiàn.",
      "meaning": "I will meet a friend the day after tomorrow.",
      "note": "見面 is a separable verb meaning to meet.",
      "tokens": [
        "我",
        "後天",
        "和朋友",
        "見面"
      ]
    },
    "u21-nine-twenty": {
      "text": "我們九點二十分見面。",
      "pinyin": "Wǒmen jiǔ diǎn èrshí fēn jiànmiàn.",
      "meaning": "We meet at 9:20.",
      "note": "Hour first, then minutes.",
      "tokens": [
        "我們",
        "九點",
        "二十分",
        "見面"
      ],
      "grammarIds": [
        "u21-clock-time"
      ]
    },
    "u21-noon": {
      "text": "我中午在餐廳吃飯。",
      "pinyin": "Wǒ zhōngwǔ zài cāntīng chīfàn.",
      "meaning": "I eat at the restaurant at noon.",
      "note": "中午 is the time, so it comes before the place.",
      "tokens": [
        "我",
        "中午",
        "在餐廳",
        "吃飯"
      ],
      "grammarIds": [
        "u21-time-before-place"
      ]
    },
    "u21-time-place": {
      "text": "我們後天晚上在學校見面。",
      "pinyin": "Wǒmen hòutiān wǎnshàng zài xuéxiào jiànmiàn.",
      "meaning": "We will meet at school the evening after tomorrow.",
      "note": "Time comes before place.",
      "tokens": [
        "我們",
        "後天晚上",
        "在學校",
        "見面"
      ],
      "grammarIds": [
        "u21-time-before-place"
      ]
    },
    "u21-range": {
      "text": "從早上七點到中午，我都有空。",
      "pinyin": "Cóng zǎoshàng qī diǎn dào zhōngwǔ, wǒ dōu yǒu kòng.",
      "meaning": "I am free from 7 in the morning until noon.",
      "note": "從 introduces the start; 到 introduces the end.",
      "tokens": [
        "從",
        "早上七點",
        "到",
        "中午",
        "我",
        "都",
        "有空"
      ],
      "grammarIds": [
        "u21-from-to-time"
      ]
    },
    "u21-when-free": {
      "text": "你什麼時候有空？",
      "pinyin": "Nǐ shénme shíhou yǒu kòng?",
      "meaning": "When are you free?",
      "note": "什麼時候 is the standard beginner question for “when.”",
      "tokens": [
        "你",
        "什麼時候",
        "有空"
      ]
    },
    "u21-next-time": {
      "text": "下次一起去吧！",
      "pinyin": "Xià cì yìqǐ qù ba!",
      "meaning": "Let’s go together next time!",
      "note": "下次 means the next occasion.",
      "tokens": [
        "下次",
        "一起",
        "去",
        "吧"
      ]
    },
    "u21-no-problem": {
      "text": "沒問題，我後天有空。",
      "pinyin": "Méi wèntí, wǒ hòutiān yǒu kòng.",
      "meaning": "No problem; I am free the day after tomorrow.",
      "note": "沒問題 is a common response meaning “no problem.”",
      "tokens": [
        "沒問題",
        "我",
        "後天",
        "有空"
      ]
    },
    "u21-by-way": {
      "text": "對了，你什麼時候有空？",
      "pinyin": "Duìle, nǐ shénme shíhou yǒu kòng?",
      "meaning": "By the way, when are you free?",
      "note": "對了 shifts the conversation to something the speaker has just remembered.",
      "tokens": [
        "對了",
        "你",
        "什麼時候",
        "有空"
      ]
    }
  },
  "revisionStepIds": [
    "u21-review-01",
    "u21-review-02",
    "u21-review-03",
    "u21-review-04",
    "u21-review-05",
    "u21-review-06",
    "u21-review-07",
    "u21-review-08",
    "u21-review-09",
    "u21-review-10",
    "u21-review-11",
    "u21-review-12",
    "u21-review-13",
    "u21-review-14",
    "u21-review-15",
    "u21-review-16",
    "u21-review-17",
    "u21-review-18"
  ]
};
export default unit;
