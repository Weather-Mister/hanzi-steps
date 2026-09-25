import type {UnitData} from '../schema.ts';

const unit:UnitData = {
  "schemaVersion": 1,
  "bookId": "book-2",
  "order": 1,
  "unit": {
    "id": "book-2-unit-1",
    "number": 6,
    "displayNumber": 1,
    "theme": "cyan",
    "label": "Asking directions",
    "title": "Which way to Shida?",
    "description": "Ask the way, go straight, and turn at an intersection.",
    "chars": [
      "問",
      "走",
      "怎",
      "到",
      "師",
      "從",
      "往",
      "前",
      "直",
      "左",
      "右",
      "轉",
      "路",
      "口"
    ],
    "lessonIds": [
      "b2-ask",
      "b2-destination",
      "b2-from-toward",
      "b2-straight",
      "b2-turn",
      "b2-intersection",
      "b2-review"
    ],
    "banner": {
      "text": "走",
      "pinyin": "zǒu"
    },
    "goal": {
      "text": "請問，到師大怎麼走？",
      "pinyin": "qǐng wèn, dào Shīdà zěnme zǒu?",
      "meaning": "Excuse me, how do I get to NTNU?"
    },
    "grammarIds": [
      "b2-ask",
      "b2-destination",
      "b2-from-toward",
      "b2-straight",
      "b2-turn",
      "b2-intersection"
    ],
    "bookReference": "Book 2 · Lesson 1, part 1: asking directions (pp. 2–9)"
  },
  "reviewLessonId": "b2-review",
  "lessons": [
    {
      "id": "b2-ask",
      "title": "Excuse me, how do I get there?",
      "subtitle": "A polite question and three new characters",
      "chars": [
        "問",
        "走",
        "怎"
      ],
      "minutes": "7–9 min",
      "steps": [
        {
          "type": "intro",
          "char": "問",
          "id": "b2-char-問-0"
        },
        {
          "type": "trace",
          "char": "問",
          "id": "b2-char-問-1"
        },
        {
          "type": "build",
          "char": "問",
          "id": "b2-char-問-2"
        },
        {
          "type": "complete",
          "char": "問",
          "id": "b2-char-問-3"
        },
        {
          "type": "memory",
          "char": "問",
          "id": "b2-char-問-4"
        },
        {
          "type": "intro",
          "char": "走",
          "id": "b2-char-走-0"
        },
        {
          "type": "trace",
          "char": "走",
          "id": "b2-char-走-1"
        },
        {
          "type": "build",
          "char": "走",
          "id": "b2-char-走-2"
        },
        {
          "type": "complete",
          "char": "走",
          "id": "b2-char-走-3"
        },
        {
          "type": "memory",
          "char": "走",
          "id": "b2-char-走-4"
        },
        {
          "type": "intro",
          "char": "怎",
          "id": "b2-char-怎-0"
        },
        {
          "type": "trace",
          "char": "怎",
          "id": "b2-char-怎-1"
        },
        {
          "type": "build",
          "char": "怎",
          "id": "b2-char-怎-2"
        },
        {
          "type": "complete",
          "char": "怎",
          "id": "b2-char-怎-3"
        },
        {
          "type": "memory",
          "char": "怎",
          "id": "b2-char-怎-4"
        },
        {
          "type": "grammar",
          "grammar": "b2-ask",
          "id": "b2-ask-0"
        },
        {
          "type": "phrase",
          "phrase": "b2-ask",
          "id": "b2-ask-1"
        },
        {
          "type": "order",
          "phrase": "b2-ask",
          "tokens": [
            "走",
            "怎麼",
            "請問",
            "嗎"
          ],
          "id": "b2-ask-2"
        },
        {
          "type": "select",
          "prompt": "Which word asks “how”?",
          "options": [
            "怎麼",
            "什麼",
            "哪裡"
          ],
          "answer": "怎麼",
          "explanation": "怎麼 asks how. 什麼 asks what; 哪裡 asks where.",
          "grammarIds": [
            "b2-ask"
          ],
          "id": "b2-ask-3"
        },
        {
          "type": "listen",
          "char": "走",
          "options": [
            "走",
            "問",
            "怎",
            "請"
          ],
          "answer": "走",
          "explanation": "走 is zǒu: walk or go.",
          "id": "b2-ask-4"
        }
      ]
    },
    {
      "id": "b2-destination",
      "title": "How do I get to Shida?",
      "subtitle": "Put your destination into the question",
      "chars": [
        "到",
        "師"
      ],
      "minutes": "5–7 min",
      "steps": [
        {
          "type": "intro",
          "char": "到",
          "id": "b2-char-到-0"
        },
        {
          "type": "trace",
          "char": "到",
          "id": "b2-char-到-1"
        },
        {
          "type": "build",
          "char": "到",
          "id": "b2-char-到-2"
        },
        {
          "type": "complete",
          "char": "到",
          "id": "b2-char-到-3"
        },
        {
          "type": "memory",
          "char": "到",
          "id": "b2-char-到-4"
        },
        {
          "type": "intro",
          "char": "師",
          "id": "b2-char-師-0"
        },
        {
          "type": "trace",
          "char": "師",
          "id": "b2-char-師-1"
        },
        {
          "type": "build",
          "char": "師",
          "id": "b2-char-師-2"
        },
        {
          "type": "complete",
          "char": "師",
          "id": "b2-char-師-3"
        },
        {
          "type": "memory",
          "char": "師",
          "id": "b2-char-師-4"
        },
        {
          "type": "grammar",
          "grammar": "b2-destination",
          "id": "b2-destination-0"
        },
        {
          "type": "phrase",
          "phrase": "b2-destination",
          "id": "b2-destination-1"
        },
        {
          "type": "order",
          "phrase": "b2-destination",
          "tokens": [
            "怎麼",
            "師大",
            "請問",
            "走",
            "到",
            "嗎"
          ],
          "id": "b2-destination-2"
        },
        {
          "type": "select",
          "prompt": "In this lesson, which university is 師大?",
          "options": [
            "National Taiwan Normal University (NTNU)",
            "National Taiwan University (NTU)",
            "Any university"
          ],
          "answer": "National Taiwan Normal University (NTNU)",
          "explanation": "The book uses 師大 for NTNU, also called Shida.",
          "grammarIds": [
            "b2-destination"
          ],
          "id": "b2-destination-3"
        },
        {
          "type": "select",
          "prompt": "Fill the blank: 請問，__ 師大怎麼走？",
          "options": [
            "到",
            "是",
            "有"
          ],
          "answer": "到",
          "explanation": "到 introduces the destination before 怎麼走.",
          "grammarIds": [
            "b2-destination"
          ],
          "id": "b2-destination-4"
        },
        {
          "type": "listen",
          "char": "到",
          "options": [
            "到",
            "師",
            "問",
            "走"
          ],
          "answer": "到",
          "explanation": "到 is dào, with a falling fourth tone.",
          "id": "b2-destination-5"
        }
      ]
    },
    {
      "id": "b2-from-toward",
      "title": "From here, toward there",
      "subtitle": "Starting points and directions",
      "chars": [
        "從",
        "往"
      ],
      "minutes": "5–7 min",
      "steps": [
        {
          "type": "intro",
          "char": "從",
          "id": "b2-char-從-0"
        },
        {
          "type": "trace",
          "char": "從",
          "id": "b2-char-從-1"
        },
        {
          "type": "build",
          "char": "從",
          "id": "b2-char-從-2"
        },
        {
          "type": "complete",
          "char": "從",
          "id": "b2-char-從-3"
        },
        {
          "type": "memory",
          "char": "從",
          "id": "b2-char-從-4"
        },
        {
          "type": "intro",
          "char": "往",
          "id": "b2-char-往-0"
        },
        {
          "type": "trace",
          "char": "往",
          "id": "b2-char-往-1"
        },
        {
          "type": "build",
          "char": "往",
          "id": "b2-char-往-2"
        },
        {
          "type": "complete",
          "char": "往",
          "id": "b2-char-往-3"
        },
        {
          "type": "memory",
          "char": "往",
          "id": "b2-char-往-4"
        },
        {
          "type": "grammar",
          "grammar": "b2-from-toward",
          "id": "b2-from-toward-0"
        },
        {
          "type": "phrase",
          "phrase": "b2-from",
          "id": "b2-from-toward-1"
        },
        {
          "type": "order",
          "phrase": "b2-from",
          "tokens": [
            "走",
            "那裡",
            "往",
            "這裡",
            "從",
            "是"
          ],
          "id": "b2-from-toward-2"
        },
        {
          "type": "select",
          "prompt": "In 從這裡往那裡走, where do you start?",
          "options": [
            "這裡",
            "那裡"
          ],
          "answer": "這裡",
          "explanation": "The starting point follows 從.",
          "grammarIds": [
            "b2-from-toward"
          ],
          "id": "b2-from-toward-3"
        },
        {
          "type": "order",
          "phrase": "b2-toward",
          "tokens": [
            "走",
            "往",
            "那裡",
            "從"
          ],
          "id": "b2-from-toward-4"
        },
        {
          "type": "parts",
          "char": "往",
          "prompt": "Which component appears on the left of both 從 and 往?",
          "options": [
            "彳",
            "口",
            "心"
          ],
          "answer": "彳",
          "explanation": "Both share the three-stroke 彳 component.",
          "id": "b2-from-toward-5"
        }
      ]
    },
    {
      "id": "b2-straight",
      "title": "Keep going straight",
      "subtitle": "Give a simple forward direction",
      "chars": [
        "前",
        "直"
      ],
      "minutes": "5–7 min",
      "steps": [
        {
          "type": "intro",
          "char": "前",
          "id": "b2-char-前-0"
        },
        {
          "type": "trace",
          "char": "前",
          "id": "b2-char-前-1"
        },
        {
          "type": "build",
          "char": "前",
          "id": "b2-char-前-2"
        },
        {
          "type": "complete",
          "char": "前",
          "id": "b2-char-前-3"
        },
        {
          "type": "memory",
          "char": "前",
          "id": "b2-char-前-4"
        },
        {
          "type": "intro",
          "char": "直",
          "id": "b2-char-直-0"
        },
        {
          "type": "trace",
          "char": "直",
          "id": "b2-char-直-1"
        },
        {
          "type": "build",
          "char": "直",
          "id": "b2-char-直-2"
        },
        {
          "type": "complete",
          "char": "直",
          "id": "b2-char-直-3"
        },
        {
          "type": "memory",
          "char": "直",
          "id": "b2-char-直-4"
        },
        {
          "type": "grammar",
          "grammar": "b2-straight",
          "id": "b2-straight-0"
        },
        {
          "type": "phrase",
          "phrase": "b2-straight",
          "id": "b2-straight-1"
        },
        {
          "type": "order",
          "phrase": "b2-forward",
          "tokens": [
            "走",
            "一直",
            "前",
            "往",
            "到"
          ],
          "id": "b2-straight-2"
        },
        {
          "type": "select",
          "prompt": "What does 一直 mean in 往前一直走？",
          "options": [
            "Keep going straight",
            "Turn around",
            "You have arrived"
          ],
          "answer": "Keep going straight",
          "explanation": "In this directions context, 一直 tells you to continue straight on.",
          "grammarIds": [
            "b2-straight"
          ],
          "id": "b2-straight-3"
        },
        {
          "type": "order",
          "phrase": "b2-straight",
          "tokens": [
            "一直",
            "從",
            "走",
            "前",
            "這裡",
            "往"
          ],
          "id": "b2-straight-4"
        },
        {
          "type": "listen",
          "char": "直",
          "options": [
            "直",
            "前",
            "從",
            "往"
          ],
          "answer": "直",
          "explanation": "直 is zhí, with a rising second tone.",
          "id": "b2-straight-5"
        }
      ]
    },
    {
      "id": "b2-turn",
      "title": "Turn left, turn right",
      "subtitle": "Choose the direction you need",
      "chars": [
        "左",
        "右",
        "轉"
      ],
      "minutes": "7–9 min",
      "steps": [
        {
          "type": "intro",
          "char": "左",
          "id": "b2-char-左-0"
        },
        {
          "type": "trace",
          "char": "左",
          "id": "b2-char-左-1"
        },
        {
          "type": "build",
          "char": "左",
          "id": "b2-char-左-2"
        },
        {
          "type": "complete",
          "char": "左",
          "id": "b2-char-左-3"
        },
        {
          "type": "memory",
          "char": "左",
          "id": "b2-char-左-4"
        },
        {
          "type": "intro",
          "char": "右",
          "id": "b2-char-右-0"
        },
        {
          "type": "trace",
          "char": "右",
          "id": "b2-char-右-1"
        },
        {
          "type": "build",
          "char": "右",
          "id": "b2-char-右-2"
        },
        {
          "type": "complete",
          "char": "右",
          "id": "b2-char-右-3"
        },
        {
          "type": "memory",
          "char": "右",
          "id": "b2-char-右-4"
        },
        {
          "type": "intro",
          "char": "轉",
          "id": "b2-char-轉-0"
        },
        {
          "type": "trace",
          "char": "轉",
          "id": "b2-char-轉-1"
        },
        {
          "type": "build",
          "char": "轉",
          "id": "b2-char-轉-2"
        },
        {
          "type": "complete",
          "char": "轉",
          "id": "b2-char-轉-3"
        },
        {
          "type": "memory",
          "char": "轉",
          "id": "b2-char-轉-4"
        },
        {
          "type": "grammar",
          "grammar": "b2-turn",
          "id": "b2-turn-0"
        },
        {
          "type": "phrase",
          "phrase": "b2-left",
          "id": "b2-turn-1"
        },
        {
          "type": "phrase",
          "phrase": "b2-right",
          "id": "b2-turn-2"
        },
        {
          "type": "select",
          "prompt": "You want someone to turn right. Which instruction fits?",
          "options": [
            "請右轉。",
            "請左轉。",
            "往前一直走。"
          ],
          "answer": "請右轉。",
          "explanation": "右 is right, 左 is left. 轉 means turn.",
          "grammarIds": [
            "b2-turn"
          ],
          "id": "b2-turn-3"
        },
        {
          "type": "order",
          "phrase": "b2-left",
          "tokens": [
            "右轉",
            "請",
            "左轉"
          ],
          "id": "b2-turn-4"
        },
        {
          "type": "parts",
          "char": "右",
          "prompt": "Which lower shape distinguishes 右 from 左?",
          "options": [
            "口",
            "工",
            "心"
          ],
          "answer": "口",
          "explanation": "右 has 口 below; 左 has 工.",
          "id": "b2-turn-5"
        }
      ]
    },
    {
      "id": "b2-intersection",
      "title": "At this intersection",
      "subtitle": "Say where to turn or start",
      "chars": [
        "路",
        "口"
      ],
      "minutes": "5–7 min",
      "steps": [
        {
          "type": "intro",
          "char": "路",
          "id": "b2-char-路-0"
        },
        {
          "type": "trace",
          "char": "路",
          "id": "b2-char-路-1"
        },
        {
          "type": "build",
          "char": "路",
          "id": "b2-char-路-2"
        },
        {
          "type": "complete",
          "char": "路",
          "id": "b2-char-路-3"
        },
        {
          "type": "memory",
          "char": "路",
          "id": "b2-char-路-4"
        },
        {
          "type": "intro",
          "char": "口",
          "id": "b2-char-口-0"
        },
        {
          "type": "trace",
          "char": "口",
          "id": "b2-char-口-1"
        },
        {
          "type": "select",
          "char": "口",
          "prompt": "Which character means “mouth; opening”?",
          "answer": "口",
          "options": [
            "口",
            "我",
            "是",
            "好"
          ],
          "explanation": "口 (kǒu) means mouth; opening.",
          "id": "b2-char-口-2"
        },
        {
          "type": "complete",
          "char": "口",
          "id": "b2-char-口-3"
        },
        {
          "type": "memory",
          "char": "口",
          "id": "b2-char-口-4"
        },
        {
          "type": "grammar",
          "grammar": "b2-intersection",
          "id": "b2-intersection-0"
        },
        {
          "type": "phrase",
          "phrase": "b2-intersection",
          "id": "b2-intersection-1"
        },
        {
          "type": "order",
          "phrase": "b2-intersection",
          "tokens": [
            "右轉",
            "這",
            "路口",
            "個",
            "在",
            "從"
          ],
          "id": "b2-intersection-2"
        },
        {
          "type": "select",
          "prompt": "Which measure word fits 這 __ 路口？",
          "options": [
            "個",
            "本",
            "的"
          ],
          "answer": "個",
          "explanation": "Use 個 for an intersection: 這個路口.",
          "grammarIds": [
            "b2-intersection"
          ],
          "id": "b2-intersection-3"
        },
        {
          "type": "phrase",
          "phrase": "b2-junction-from",
          "id": "b2-intersection-4"
        },
        {
          "type": "order",
          "phrase": "b2-junction-from",
          "tokens": [
            "路口",
            "走",
            "從",
            "個",
            "前",
            "這",
            "往"
          ],
          "id": "b2-intersection-5"
        }
      ]
    },
    {
      "id": "b2-review",
      "title": "Unit 1 review",
      "subtitle": "Ask the way and give simple directions",
      "chars": [
        "問",
        "走",
        "怎",
        "到",
        "師",
        "從",
        "往",
        "前",
        "直",
        "左",
        "右",
        "轉",
        "路",
        "口"
      ],
      "minutes": "7–9 min",
      "steps": [
        {
          "type": "match",
          "chars": [
            "從",
            "往",
            "左",
            "右"
          ],
          "id": "b2-review-0"
        },
        {
          "type": "build",
          "char": "問",
          "id": "b2-review-1"
        },
        {
          "type": "build",
          "char": "轉",
          "id": "b2-review-2"
        },
        {
          "type": "memory",
          "char": "走",
          "id": "b2-review-3"
        },
        {
          "type": "memory",
          "char": "從",
          "id": "b2-review-4"
        },
        {
          "type": "memory",
          "char": "路",
          "id": "b2-review-5"
        },
        {
          "type": "memory",
          "char": "轉",
          "id": "b2-review-6"
        },
        {
          "type": "order",
          "phrase": "b2-destination",
          "tokens": [
            "走",
            "到",
            "請問",
            "師大",
            "怎麼",
            "嗎"
          ],
          "id": "b2-review-7"
        },
        {
          "type": "order",
          "phrase": "b2-straight",
          "tokens": [
            "前",
            "走",
            "往",
            "一直",
            "這裡",
            "從"
          ],
          "id": "b2-review-8"
        },
        {
          "type": "order",
          "phrase": "b2-right",
          "tokens": [
            "左轉",
            "請",
            "右轉"
          ],
          "id": "b2-review-9"
        },
        {
          "type": "order",
          "phrase": "b2-intersection",
          "tokens": [
            "路口",
            "在",
            "右轉",
            "個",
            "這",
            "從"
          ],
          "id": "b2-review-10"
        },
        {
          "type": "select",
          "prompt": "Which word marks the starting point in a direction?",
          "options": [
            "從",
            "往",
            "到"
          ],
          "answer": "從",
          "explanation": "從 marks the start. 往 marks direction; 到 can introduce the destination.",
          "grammarIds": [
            "b2-from-toward",
            "b2-destination"
          ],
          "id": "b2-review-11"
        },
        {
          "type": "listen",
          "char": "轉",
          "options": [
            "轉",
            "直",
            "路",
            "口"
          ],
          "answer": "轉",
          "explanation": "轉 is zhuǎn here: turn, with the third tone.",
          "id": "b2-review-12"
        }
      ]
    }
  ],
  "newVocabulary": [
    {
      "text": "走",
      "pinyin": "zǒu",
      "meaning": "walk; go",
      "lessonId": "b2-ask",
      "core": false
    },
    {
      "text": "師大",
      "pinyin": "Shīdà",
      "meaning": "NTNU (National Taiwan Normal University)",
      "lessonId": "b2-destination",
      "core": false
    },
    {
      "text": "前",
      "pinyin": "qián",
      "meaning": "front; forward",
      "lessonId": "b2-straight",
      "core": false
    },
    {
      "text": "左",
      "pinyin": "zuǒ",
      "meaning": "left",
      "lessonId": "b2-turn",
      "core": false
    },
    {
      "text": "右",
      "pinyin": "yòu",
      "meaning": "right",
      "lessonId": "b2-turn",
      "core": false
    },
    {
      "text": "轉",
      "pinyin": "zhuǎn",
      "meaning": "turn (change direction)",
      "lessonId": "b2-turn",
      "core": false
    },
    {
      "text": "左轉",
      "pinyin": "zuǒ zhuǎn",
      "meaning": "turn left",
      "lessonId": "b2-turn",
      "core": false
    },
    {
      "text": "右轉",
      "pinyin": "yòu zhuǎn",
      "meaning": "turn right",
      "lessonId": "b2-turn",
      "core": false
    },
    {
      "text": "路",
      "pinyin": "lù",
      "meaning": "road",
      "lessonId": "b2-intersection",
      "core": false
    },
    {
      "text": "路口",
      "pinyin": "lùkǒu",
      "meaning": "intersection",
      "lessonId": "b2-intersection",
      "core": false
    }
  ],
  "reviewVocabulary": [
    "怎麼",
    "這裡",
    "那裡",
    "請",
    "在",
    "這",
    "個",
    "嗎",
    "什麼",
    "哪裡",
    "是",
    "有",
    "我",
    "好",
    "本",
    "的",
    "請問",
    "到",
    "從",
    "往",
    "一直"
  ],
  "newCharacters": [
    "轉"
  ],
  "reviewCharacters": [
    "問",
    "走",
    "怎",
    "到",
    "師",
    "從",
    "往",
    "前",
    "直",
    "左",
    "右",
    "路",
    "口"
  ],
  "characters": {
    "轉": {
      "hanzi": "轉",
      "pinyin": "zhuǎn",
      "zhuyin": "ㄓㄨㄢˇ",
      "meaning": "turn",
      "strokes": 18,
      "layout": "side",
      "note": "For changing direction use third-tone zhuǎn.",
      "memory": "Remember 轉 as 車 + 專: a lined vehicle shape beside a denser right block ending in 寸.",
      "parts": [
        {
          "label": "車",
          "name": "vehicle component",
          "role": "Visual component",
          "description": "車 forms the left side, with a central vertical passing through its box and horizontal lines.",
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
          "label": "專",
          "name": "right part",
          "role": "Visual component",
          "description": "專 fills the right side; notice the compact upper block and the 寸 shape with a hook and dot below.",
          "strokes": [
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
      "example": {
        "text": "右轉",
        "pinyin": "yòu zhuǎn",
        "meaning": "turn right"
      }
    }
  },
  "grammarRules": {
    "b2-ask": {
      "id": "b2-ask",
      "title": "Ask for directions politely",
      "pattern": "請問，…怎麼走？",
      "explanation": "請問 means excuse me or may I ask. 怎麼 means how; 走 means walk or go. When the destination is understood, 請問，怎麼走？ asks how to get there. These are useful foundation words used in Book 2’s opening dialogue.",
      "examples": [
        {
          "text": "請問，怎麼走？",
          "pinyin": "qǐng wèn, zěnme zǒu?",
          "meaning": "Excuse me, how do I get there?"
        }
      ],
      "remember": "怎麼 already asks for information, so do not add 嗎. Learn 怎麼 as one word.",
      "words": [
        "請問",
        "怎麼",
        "走"
      ]
    },
    "b2-destination": {
      "id": "b2-destination",
      "title": "Name your destination",
      "pattern": "請問，到 + place + 怎麼走？",
      "explanation": "到 introduces the place you want to reach in this question. 師大 (Shīdà) is the abbreviation used here for National Taiwan Normal University, NTNU. It is a different university from NTU.",
      "examples": [
        {
          "text": "請問，到師大怎麼走？",
          "pinyin": "qǐng wèn, dào Shīdà zěnme zǒu?",
          "meaning": "Excuse me, how do I get to NTNU?"
        }
      ],
      "remember": "Put the destination after 到 and before 怎麼走. This is language practice, not a route from your current location.",
      "words": [
        "到",
        "師大"
      ]
    },
    "b2-from-toward": {
      "id": "b2-from-toward",
      "title": "From here, toward there",
      "pattern": "從 + starting point + 往 + direction + 走",
      "explanation": "從 marks where movement starts. 往 marks its direction. Put both before the movement verb 走. In 從這裡往那裡走, 這裡 is the starting point and 那裡 is where you head.",
      "examples": [
        {
          "text": "從這裡往那裡走。",
          "pinyin": "cóng zhèlǐ wǎng nàlǐ zǒu",
          "meaning": "Walk from here toward there."
        },
        {
          "text": "往那裡走。",
          "pinyin": "wǎng nàlǐ zǒu",
          "meaning": "Walk toward there."
        }
      ],
      "remember": "You can leave out 從 + starting point when it is clear from context. 往 gives a direction; it does not by itself say you have arrived.",
      "words": [
        "從",
        "往"
      ]
    },
    "b2-straight": {
      "id": "b2-straight",
      "title": "Keep going straight",
      "pattern": "往前 + 一直 + 走",
      "explanation": "前 means front or forward. 往前走 means walk forward. Add 一直 to tell someone to keep going straight in these directions. Keep 一直 before 走.",
      "examples": [
        {
          "text": "往前一直走。",
          "pinyin": "wǎng qián yìzhí zǒu",
          "meaning": "Keep going straight ahead."
        },
        {
          "text": "從這裡往前一直走。",
          "pinyin": "cóng zhèlǐ wǎng qián yìzhí zǒu",
          "meaning": "Keep going straight ahead from here."
        }
      ],
      "remember": "一直 can express continuation in other contexts. Here it means straight on. 一 is pronounced yì before the second tone of 直.",
      "words": [
        "前",
        "一直"
      ]
    },
    "b2-turn": {
      "id": "b2-turn",
      "title": "Turn left or right",
      "pattern": "左轉 / 右轉",
      "explanation": "左 means left and 右 means right. Put either one before 轉 (zhuǎn, turn): 左轉 means turn left, and 右轉 means turn right. You can use 請 to make the instruction polite.",
      "examples": [
        {
          "text": "請左轉。",
          "pinyin": "qǐng zuǒ zhuǎn",
          "meaning": "Please turn left."
        },
        {
          "text": "請右轉。",
          "pinyin": "qǐng yòu zhuǎn",
          "meaning": "Please turn right."
        }
      ],
      "remember": "Use third-tone zhuǎn for changing direction. Left and right are from the viewpoint of the person following the instructions.",
      "words": [
        "左",
        "右",
        "轉",
        "左轉",
        "右轉"
      ]
    },
    "b2-intersection": {
      "id": "b2-intersection",
      "title": "At this intersection",
      "pattern": "這 + 個 + 路口 / 在 + place + action",
      "explanation": "路 means road. 路口 is one word meaning intersection. Use 個 when pointing to an intersection: 這個路口. To say where an action happens, place 在 + location before the action: 在這個路口右轉.",
      "examples": [
        {
          "text": "在這個路口右轉。",
          "pinyin": "zài zhè ge lùkǒu yòu zhuǎn",
          "meaning": "Turn right at this intersection."
        },
        {
          "text": "從這個路口往前走。",
          "pinyin": "cóng zhè ge lùkǒu wǎng qián zǒu",
          "meaning": "Walk forward from this intersection."
        }
      ],
      "remember": "在 marks where you turn; 從 marks where you start moving. Keep 個 in 這個路口.",
      "words": [
        "路",
        "路口"
      ]
    }
  },
  "grammarIntroductions": [
    {
      "id": "b2-ask",
      "kind": "rule",
      "ref": "b2-ask",
      "lessonId": "b2-ask",
      "stepId": "b2-ask-0"
    },
    {
      "id": "b2-destination",
      "kind": "rule",
      "ref": "b2-destination",
      "lessonId": "b2-destination",
      "stepId": "b2-destination-0"
    },
    {
      "id": "b2-from-toward",
      "kind": "rule",
      "ref": "b2-from-toward",
      "lessonId": "b2-from-toward",
      "stepId": "b2-from-toward-0"
    },
    {
      "id": "b2-straight",
      "kind": "rule",
      "ref": "b2-straight",
      "lessonId": "b2-straight",
      "stepId": "b2-straight-0"
    },
    {
      "id": "b2-turn",
      "kind": "rule",
      "ref": "b2-turn",
      "lessonId": "b2-turn",
      "stepId": "b2-turn-0"
    },
    {
      "id": "b2-intersection",
      "kind": "rule",
      "ref": "b2-intersection",
      "lessonId": "b2-intersection",
      "stepId": "b2-intersection-0"
    }
  ],
  "reviewGrammar": [],
  "phrases": {
    "b2-ask": {
      "text": "請問，怎麼走？",
      "pinyin": "qǐng wèn, zěnme zǒu?",
      "meaning": "Excuse me, how do I get there?",
      "note": "The destination is understood. 請問 politely introduces the question.",
      "tokens": [
        "請問",
        "怎麼",
        "走"
      ],
      "grammarIds": [
        "b2-ask"
      ]
    },
    "b2-destination": {
      "text": "請問，到師大怎麼走？",
      "pinyin": "qǐng wèn, dào Shīdà zěnme zǒu?",
      "meaning": "Excuse me, how do I get to NTNU?",
      "note": "Name the destination after 到. 師大 is NTNU.",
      "tokens": [
        "請問",
        "到",
        "師大",
        "怎麼",
        "走"
      ],
      "grammarIds": [
        "b2-ask",
        "b2-destination"
      ]
    },
    "b2-from": {
      "text": "從這裡往那裡走。",
      "pinyin": "cóng zhèlǐ wǎng nàlǐ zǒu",
      "meaning": "Walk from here toward there.",
      "note": "從 introduces the starting point; 往 introduces the direction.",
      "tokens": [
        "從",
        "這裡",
        "往",
        "那裡",
        "走"
      ],
      "grammarIds": [
        "b2-from-toward"
      ]
    },
    "b2-toward": {
      "text": "往那裡走。",
      "pinyin": "wǎng nàlǐ zǒu",
      "meaning": "Walk toward there.",
      "note": "The starting point can be omitted when it is clear.",
      "tokens": [
        "往",
        "那裡",
        "走"
      ],
      "grammarIds": [
        "b2-from-toward"
      ]
    },
    "b2-straight": {
      "text": "從這裡往前一直走。",
      "pinyin": "cóng zhèlǐ wǎng qián yìzhí zǒu",
      "meaning": "Keep going straight ahead from here.",
      "note": "一直 comes before 走. It means straight on in this directions context.",
      "tokens": [
        "從",
        "這裡",
        "往",
        "前",
        "一直",
        "走"
      ],
      "grammarIds": [
        "b2-from-toward",
        "b2-straight"
      ]
    },
    "b2-forward": {
      "text": "往前一直走。",
      "pinyin": "wǎng qián yìzhí zǒu",
      "meaning": "Keep going straight ahead.",
      "note": "往前 gives the direction. 一直 says to continue straight.",
      "tokens": [
        "往",
        "前",
        "一直",
        "走"
      ],
      "grammarIds": [
        "b2-straight"
      ]
    },
    "b2-left": {
      "text": "請左轉。",
      "pinyin": "qǐng zuǒ zhuǎn",
      "meaning": "Please turn left.",
      "note": "Left is 左. 轉 has third tone here.",
      "tokens": [
        "請",
        "左轉"
      ],
      "grammarIds": [
        "b2-turn"
      ]
    },
    "b2-right": {
      "text": "請右轉。",
      "pinyin": "qǐng yòu zhuǎn",
      "meaning": "Please turn right.",
      "note": "Right is 右. 請 makes the instruction polite.",
      "tokens": [
        "請",
        "右轉"
      ],
      "grammarIds": [
        "b2-turn"
      ]
    },
    "b2-intersection": {
      "text": "在這個路口右轉。",
      "pinyin": "zài zhè ge lùkǒu yòu zhuǎn",
      "meaning": "Turn right at this intersection.",
      "note": "在 + location comes before the action. Use 個 with 路口.",
      "tokens": [
        "在",
        "這",
        "個",
        "路口",
        "右轉"
      ],
      "grammarIds": [
        "b2-intersection",
        "b2-turn"
      ]
    },
    "b2-junction-from": {
      "text": "從這個路口往前走。",
      "pinyin": "cóng zhè ge lùkǒu wǎng qián zǒu",
      "meaning": "Walk forward from this intersection.",
      "note": "從 marks the starting point, while 往前 gives the direction.",
      "tokens": [
        "從",
        "這",
        "個",
        "路口",
        "往",
        "前",
        "走"
      ],
      "grammarIds": [
        "b2-intersection",
        "b2-straight",
        "b2-from-toward"
      ]
    }
  },
  "revisionStepIds": []
};
export default unit;
