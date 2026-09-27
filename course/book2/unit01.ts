import type {UnitData} from '../schema.ts';

const unit:UnitData = {
  "schemaVersion": 1,
  "bookId": "book-2",
  "order": 1,
  "unit": {
    "id": "book-2-unit-1",
    "number": 1,
    "displayNumber": 1,
    "theme": "cyan",
    "bookReference": "A Course in Contemporary Chinese, Book 2, Lesson 1, pp. 2–14",
    "label": "Asking directions",
    "title": "Lost? Ask the Way",
    "description": "Offer help, ask for a route to NTNU, and turn at an intersection.",
    "chars": [
      "迷",
      "轉"
    ],
    "lessonIds": [
      "b2u1-l1-lesson",
      "b2u1-l2-lesson",
      "b2u1-l3-lesson",
      "b2u1-l4-lesson",
      "b2u1-l5-lesson",
      "b2u1-l6-lesson",
      "b2u1-l7-lesson"
    ],
    "banner": {
      "text": "迷路",
      "pinyin": "mílù"
    },
    "goal": {
      "text": "請問，到師大怎麼走？",
      "pinyin": "Qǐngwèn, dào Shīdà zěnme zǒu?",
      "meaning": "Excuse me, how do I get to NTNU?"
    },
    "grammarIds": [
      "b2u1-l4-from-toward"
    ]
  },
  "reviewLessonId": "b2u1-l7-lesson",
  "lessons": [
    {
      "id": "b2u1-l1-lesson",
      "title": "A passer-by helps",
      "subtitle": "Offer help and describe being lost.",
      "chars": [
        "迷"
      ],
      "minutes": "8–12 min",
      "unitId": "book-2-unit-1",
      "steps": [
        {
          "id": "b2u1-l1-w1-explain",
          "type": "phrase",
          "phrase": "b2u1-l1-word-1"
        },
        {
          "id": "b2u1-l1-w1-meaning",
          "type": "select",
          "prompt": "In this route or shopping story, what does 路人 mean?",
          "options": [
            "passer-by",
            "a traffic light",
            "a road section"
          ],
          "answer": "passer-by",
          "explanation": "路人 is a person on the street who can help with directions."
        },
        {
          "id": "b2u1-l1-w2-explain",
          "type": "phrase",
          "phrase": "b2u1-l1-word-2"
        },
        {
          "id": "b2u1-l1-w2-meaning",
          "type": "select",
          "prompt": "In this route or shopping story, what does 幫忙 mean?",
          "options": [
            "help; do a favor",
            "be lost",
            "turn left"
          ],
          "answer": "help; do a favor",
          "explanation": "需要我幫忙嗎？ is a polite offer: “Do you need my help?”"
        },
        {
          "id": "b2u1-l1-w3-explain",
          "type": "phrase",
          "phrase": "b2u1-l1-word-3"
        },
        {
          "id": "b2u1-l1-char-迷-intro",
          "type": "intro",
          "char": "迷"
        },
        {
          "id": "b2u1-l1-char-迷-trace",
          "type": "trace",
          "char": "迷"
        },
        {
          "id": "b2u1-l1-char-迷-build",
          "type": "build",
          "char": "迷"
        },
        {
          "id": "b2u1-l1-char-迷-complete",
          "type": "complete",
          "char": "迷"
        },
        {
          "id": "b2u1-l1-char-迷-memory",
          "type": "memory",
          "char": "迷"
        },
        {
          "id": "b2u1-l1-w3-meaning",
          "type": "select",
          "prompt": "In this route or shopping story, what does 迷路 mean?",
          "options": [
            "be lost; lose one’s way",
            "know the route",
            "find a shop"
          ],
          "answer": "be lost; lose one’s way",
          "explanation": "我好像迷路了 means “I think I am lost”; 迷路 is a separable verb, not a place."
        },
        {
          "id": "b2u1-l1-application",
          "type": "select",
          "prompt": "我好像迷路了。 What happened?",
          "options": [
            "I seem to have lost my way.",
            "I am helping a passer-by.",
            "I have reached school."
          ],
          "answer": "I seem to have lost my way.",
          "explanation": "In this context, I seem to have lost my way."
        }
      ]
    },
    {
      "id": "b2u1-l2-lesson",
      "title": "Ask the route",
      "subtitle": "Name the destination and use 走 in a directions question.",
      "chars": [],
      "minutes": "8–12 min",
      "unitId": "book-2-unit-1",
      "steps": [
        {
          "id": "b2u1-l2-w1-explain",
          "type": "phrase",
          "phrase": "b2u1-l2-word-1"
        },
        {
          "id": "b2u1-l2-w1-meaning",
          "type": "select",
          "prompt": "In this route or shopping story, what does 師大 mean?",
          "options": [
            "NTNU; Shida (university)",
            "a convenience store",
            "a train station"
          ],
          "answer": "NTNU; Shida (university)",
          "explanation": "師大 is the short name of National Taiwan Normal University, a destination in this lesson."
        },
        {
          "id": "b2u1-l2-w2-explain",
          "type": "phrase",
          "phrase": "b2u1-l2-word-2"
        },
        {
          "id": "b2u1-l2-w2-meaning",
          "type": "select",
          "prompt": "In this route or shopping story, what does 走 mean?",
          "options": [
            "walk; go (toward a destination)",
            "arrive at a destination",
            "ride a bicycle"
          ],
          "answer": "walk; go (toward a destination)",
          "explanation": "到師大怎麼走？ asks which route to take; 走 is the movement, while 到 names the destination."
        },
        {
          "id": "b2u1-l2-model-explain",
          "type": "phrase",
          "phrase": "b2u1-l2-model"
        },
        {
          "id": "b2u1-l2-model-order",
          "type": "order",
          "phrase": "b2u1-l2-model",
          "tokens": [
            "走",
            "怎麼",
            "師大",
            "請問"
          ]
        },
        {
          "id": "b2u1-l2-transfer",
          "type": "select",
          "prompt": "Interpret the full message: 請問，師大怎麼走？",
          "options": [
            "Excuse me, how do I get to NTNU?",
            "The traveler is turning in the opposite direction.",
            "The traveler has reached a different destination."
          ],
          "answer": "Excuse me, how do I get to NTNU?",
          "explanation": "The complete message says: Excuse me, how do I get to NTNU?"
        },
        {
          "id": "b2u1-l2-application",
          "type": "select",
          "prompt": "請問，到師大怎麼走？ What is being asked?",
          "options": [
            "The route to NTNU.",
            "Whether NTNU is open.",
            "The price of a map."
          ],
          "answer": "The route to NTNU.",
          "explanation": "In this context, The route to NTNU."
        }
      ]
    },
    {
      "id": "b2u1-l3-lesson",
      "title": "At the next intersection",
      "subtitle": "Understand 下一個路口.",
      "chars": [],
      "minutes": "8–12 min",
      "unitId": "book-2-unit-1",
      "steps": [
        {
          "id": "b2u1-l3-w1-explain",
          "type": "phrase",
          "phrase": "b2u1-l3-word-1"
        },
        {
          "id": "b2u1-l3-w1-meaning",
          "type": "select",
          "prompt": "In this route or shopping story, what does 下 mean?",
          "options": [
            "next; following (before a measure word)",
            "the previous one",
            "the second one"
          ],
          "answer": "next; following (before a measure word)",
          "explanation": "下一個路口 means “the next intersection”; 下 precedes 一個 here."
        },
        {
          "id": "b2u1-l3-w2-explain",
          "type": "phrase",
          "phrase": "b2u1-l3-word-2"
        },
        {
          "id": "b2u1-l3-w2-meaning",
          "type": "select",
          "prompt": "In this route or shopping story, what does 路口 mean?",
          "options": [
            "intersection",
            "a road number",
            "the end of a road"
          ],
          "answer": "intersection",
          "explanation": "下一個路口 means the next street intersection, where you can turn."
        },
        {
          "id": "b2u1-l3-model-explain",
          "type": "phrase",
          "phrase": "b2u1-l3-model"
        },
        {
          "id": "b2u1-l3-model-order",
          "type": "order",
          "phrase": "b2u1-l3-model",
          "tokens": [
            "走",
            "怎麼",
            "師大",
            "請問"
          ]
        },
        {
          "id": "b2u1-l3-transfer",
          "type": "select",
          "prompt": "Interpret the full message: 請問，師大怎麼走？",
          "options": [
            "Excuse me, how do I get to NTNU?",
            "The traveler is turning in the opposite direction.",
            "The traveler has reached a different destination."
          ],
          "answer": "Excuse me, how do I get to NTNU?",
          "explanation": "The complete message says: Excuse me, how do I get to NTNU?"
        },
        {
          "id": "b2u1-l3-application",
          "type": "select",
          "prompt": "下一個路口在哪裡？ What place is being named?",
          "options": [
            "The next intersection.",
            "The previous school.",
            "The post office."
          ],
          "answer": "The next intersection.",
          "explanation": "In this context, The next intersection."
        }
      ]
    },
    {
      "id": "b2u1-l4-lesson",
      "title": "Go forward",
      "subtitle": "Follow 往前走 from a starting point.",
      "chars": [],
      "minutes": "8–12 min",
      "unitId": "book-2-unit-1",
      "steps": [
        {
          "id": "b2u1-l4-w1-explain",
          "type": "phrase",
          "phrase": "b2u1-l4-word-1"
        },
        {
          "id": "b2u1-l4-w1-meaning",
          "type": "select",
          "prompt": "In this route or shopping story, what does 往前 mean?",
          "options": [
            "go forward; ahead",
            "turn around",
            "go upstairs"
          ],
          "answer": "go forward; ahead",
          "explanation": "往前走 means go forward in the indicated direction; 往 was taught in Book 1."
        },
        {
          "id": "b2u1-l4-g-from-toward-explain",
          "type": "grammar",
          "grammar": "b2u1-l4-from-toward"
        },
        {
          "id": "b2u1-l4-g-from-toward-check",
          "type": "select",
          "prompt": "從這裡往前走。 — what does the whole sentence mean?",
          "options": [
            "Go forward from here.",
            "Start at NTNU and walk back toward here.",
            "Stay at the starting point."
          ],
          "answer": "Go forward from here.",
          "explanation": "從 names the starting point and 往 the direction. If the starting point is understood, omit 從這裡 and say 往前走. For a prohibited direction use 不能往…, and for a question ask 是不是往…."
        },
        {
          "id": "b2u1-l4-model-explain",
          "type": "phrase",
          "phrase": "b2u1-l4-model"
        },
        {
          "id": "b2u1-l4-model-order",
          "type": "order",
          "phrase": "b2u1-l4-model",
          "tokens": [
            "走",
            "往前",
            "這裡",
            "從"
          ]
        },
        {
          "id": "b2u1-l4-transfer",
          "type": "select",
          "prompt": "Interpret the full message: 從這裡往前走。",
          "options": [
            "Walk forward from here.",
            "The traveler is turning in the opposite direction.",
            "The traveler has reached a different destination."
          ],
          "answer": "Walk forward from here.",
          "explanation": "The complete message says: Walk forward from here."
        },
        {
          "id": "b2u1-l4-application",
          "type": "select",
          "prompt": "從這裡往前走。 What is the starting point?",
          "options": [
            "Here.",
            "The next intersection.",
            "NTNU."
          ],
          "answer": "Here.",
          "explanation": "In this context, Here."
        }
      ]
    },
    {
      "id": "b2u1-l5-lesson",
      "title": "Turn right or left",
      "subtitle": "Choose a turn at the intersection.",
      "chars": [
        "轉"
      ],
      "minutes": "8–12 min",
      "unitId": "book-2-unit-1",
      "steps": [
        {
          "id": "b2u1-l5-w1-explain",
          "type": "phrase",
          "phrase": "b2u1-l5-word-1"
        },
        {
          "id": "b2u1-l5-char-轉-intro",
          "type": "intro",
          "char": "轉"
        },
        {
          "id": "b2u1-l5-char-轉-trace",
          "type": "trace",
          "char": "轉"
        },
        {
          "id": "b2u1-l5-char-轉-build",
          "type": "build",
          "char": "轉"
        },
        {
          "id": "b2u1-l5-char-轉-complete",
          "type": "complete",
          "char": "轉"
        },
        {
          "id": "b2u1-l5-char-轉-memory",
          "type": "memory",
          "char": "轉"
        },
        {
          "id": "b2u1-l5-w1-meaning",
          "type": "select",
          "prompt": "In this route or shopping story, what does 右轉 mean?",
          "options": [
            "turn right",
            "turn left",
            "keep going straight"
          ],
          "answer": "turn right",
          "explanation": "At a 路口, 右轉 changes direction to the right; compare 左轉."
        },
        {
          "id": "b2u1-l5-w2-explain",
          "type": "phrase",
          "phrase": "b2u1-l5-word-2"
        },
        {
          "id": "b2u1-l5-w2-meaning",
          "type": "select",
          "prompt": "In this route or shopping story, what does 左轉 mean?",
          "options": [
            "turn left",
            "turn right",
            "cross the road"
          ],
          "answer": "turn left",
          "explanation": "左轉 changes direction to the left. A sign that says 往左轉 points left."
        },
        {
          "id": "b2u1-l5-model-explain",
          "type": "phrase",
          "phrase": "b2u1-l5-model"
        },
        {
          "id": "b2u1-l5-model-order",
          "type": "order",
          "phrase": "b2u1-l5-model",
          "tokens": [
            "走",
            "往前",
            "這裡",
            "從"
          ]
        },
        {
          "id": "b2u1-l5-transfer",
          "type": "select",
          "prompt": "Interpret the full message: 從這裡往前走。",
          "options": [
            "Walk forward from here.",
            "The traveler is turning in the opposite direction.",
            "The traveler has reached a different destination."
          ],
          "answer": "Walk forward from here.",
          "explanation": "The complete message says: Walk forward from here."
        },
        {
          "id": "b2u1-l5-application",
          "type": "select",
          "prompt": "At an intersection, which instruction sends you left?",
          "options": [
            "左轉",
            "右轉",
            "往前走"
          ],
          "answer": "左轉",
          "explanation": "In this context, 左轉"
        }
      ]
    },
    {
      "id": "b2u1-l6-lesson",
      "title": "From here toward the school",
      "subtitle": "Use 從…往… with a clear starting point.",
      "chars": [],
      "minutes": "8–12 min",
      "unitId": "book-2-unit-1",
      "steps": [
        {
          "id": "b2u1-l6-model-explain",
          "type": "phrase",
          "phrase": "b2u1-l6-model"
        },
        {
          "id": "b2u1-l6-model-order",
          "type": "order",
          "phrase": "b2u1-l6-model",
          "tokens": [
            "右轉",
            "路口",
            "一個",
            "下",
            "到"
          ]
        },
        {
          "id": "b2u1-l6-transfer",
          "type": "select",
          "prompt": "Interpret the full message: 到下一個路口右轉。",
          "options": [
            "Turn right at the next intersection.",
            "The traveler is turning in the opposite direction.",
            "The traveler has reached a different destination."
          ],
          "answer": "Turn right at the next intersection.",
          "explanation": "The complete message says: Turn right at the next intersection."
        },
        {
          "id": "b2u1-l6-application",
          "type": "select",
          "prompt": "從這裡往前走。 Which part gives the direction?",
          "options": [
            "往前",
            "從這裡",
            "走"
          ],
          "answer": "往前",
          "explanation": "In this context, 往前"
        },
        {
          "id": "b2u1-l6-route-listen",
          "type": "listen",
          "char": "轉",
          "audioText": "到下一個路口右轉。",
          "semanticAnswer": true,
          "options": [
            "Turn right at the next intersection.",
            "Turn left at the next intersection.",
            "Go straight through the second intersection."
          ],
          "answer": "Turn right at the next intersection.",
          "explanation": "下一個路口 is the next intersection; 右轉 means turn right."
        },
        {
          "id": "b2u1-l6-route-transfer",
          "type": "select",
          "prompt": "你從這裡往前走，到路口左轉。 Which route matches both directions?",
          "options": [
            "Start here, go forward, then turn left at the intersection.",
            "Start at the intersection, then turn right toward here.",
            "Stay here until the traffic light changes."
          ],
          "answer": "Start here, go forward, then turn left at the intersection.",
          "explanation": "從這裡 is the starting point, 往前 the first movement, and 左轉 the final turn."
        }
      ]
    },
    {
      "id": "b2u1-l7-lesson",
      "title": "Review: Lesson 1 in use",
      "subtitle": "Apply the words, characters, and grammar in complete contexts.",
      "chars": [
        "迷",
        "轉"
      ],
      "minutes": "12–18 min",
      "unitId": "book-2-unit-1",
      "review": true,
      "steps": [
        {
          "id": "b2u1-l7-source-1",
          "type": "phrase",
          "phrase": "b2u1-l7-cumulative-1"
        },
        {
          "id": "b2u1-l7-order-1",
          "type": "order",
          "phrase": "b2u1-l7-cumulative-1",
          "tokens": [
            "走",
            "怎麼",
            "師大",
            "請問"
          ]
        },
        {
          "id": "b2u1-l7-audio-meaning-1",
          "type": "listen",
          "char": "迷",
          "audioText": "請問，師大怎麼走？",
          "semanticAnswer": true,
          "options": [
            "Excuse me, how do I get to NTNU?",
            "The speaker asks how to get to the post office.",
            "The speaker says they have already reached NTNU."
          ],
          "answer": "Excuse me, how do I get to NTNU?",
          "explanation": "The full utterance means: Excuse me, how do I get to NTNU?"
        },
        {
          "id": "b2u1-l7-understand-1",
          "type": "select",
          "prompt": "What does 請問，師大怎麼走？ mean?",
          "options": [
            "Excuse me, how do I get to NTNU?",
            "The speaker asks how to get to the post office.",
            "The speaker says they have already reached NTNU."
          ],
          "answer": "Excuse me, how do I get to NTNU?",
          "explanation": "Excuse me, how do I get to NTNU?"
        },
        {
          "id": "b2u1-l7-source-2",
          "type": "phrase",
          "phrase": "b2u1-l7-cumulative-2"
        },
        {
          "id": "b2u1-l7-order-2",
          "type": "order",
          "phrase": "b2u1-l7-cumulative-2",
          "tokens": [
            "走",
            "往前",
            "這裡",
            "從"
          ]
        },
        {
          "id": "b2u1-l7-audio-meaning-2",
          "type": "listen",
          "char": "迷",
          "audioText": "從這裡往前走。",
          "semanticAnswer": true,
          "options": [
            "Walk forward from here.",
            "Turn left from here.",
            "Return to the previous intersection."
          ],
          "answer": "Walk forward from here.",
          "explanation": "The full utterance means: Walk forward from here."
        },
        {
          "id": "b2u1-l7-understand-2",
          "type": "select",
          "prompt": "What does 從這裡往前走。 mean?",
          "options": [
            "Walk forward from here.",
            "Turn left from here.",
            "Return to the previous intersection."
          ],
          "answer": "Walk forward from here.",
          "explanation": "Walk forward from here."
        },
        {
          "id": "b2u1-l7-source-3",
          "type": "phrase",
          "phrase": "b2u1-l7-cumulative-3"
        },
        {
          "id": "b2u1-l7-order-3",
          "type": "order",
          "phrase": "b2u1-l7-cumulative-3",
          "tokens": [
            "右轉",
            "路口",
            "一個",
            "下",
            "到"
          ]
        },
        {
          "id": "b2u1-l7-audio-meaning-3",
          "type": "listen",
          "char": "迷",
          "audioText": "到下一個路口右轉。",
          "semanticAnswer": true,
          "options": [
            "Turn right at the next intersection.",
            "Turn left at the next intersection.",
            "Turn right at the second intersection."
          ],
          "answer": "Turn right at the next intersection.",
          "explanation": "The full utterance means: Turn right at the next intersection."
        },
        {
          "id": "b2u1-l7-understand-3",
          "type": "select",
          "prompt": "What does 到下一個路口右轉。 mean?",
          "options": [
            "Turn right at the next intersection.",
            "Turn left at the next intersection.",
            "Turn right at the second intersection."
          ],
          "answer": "Turn right at the next intersection.",
          "explanation": "Turn right at the next intersection."
        },
        {
          "id": "b2u1-l7-vocab-1",
          "type": "select",
          "prompt": "In Lesson 1, what does 路人 mean?",
          "options": [
            "passer-by",
            "a traffic light",
            "a road section"
          ],
          "answer": "passer-by",
          "explanation": "路人 is a person on the street who can help with directions."
        },
        {
          "id": "b2u1-l7-vocab-2",
          "type": "select",
          "prompt": "In Lesson 1, what does 幫忙 mean?",
          "options": [
            "help; do a favor",
            "be lost",
            "turn left"
          ],
          "answer": "help; do a favor",
          "explanation": "需要我幫忙嗎？ is a polite offer: “Do you need my help?”"
        },
        {
          "id": "b2u1-l7-vocab-3",
          "type": "select",
          "prompt": "In Lesson 1, what does 迷路 mean?",
          "options": [
            "be lost; lose one’s way",
            "know the route",
            "find a shop"
          ],
          "answer": "be lost; lose one’s way",
          "explanation": "我好像迷路了 means “I think I am lost”; 迷路 is a separable verb, not a place."
        },
        {
          "id": "b2u1-l7-vocab-4",
          "type": "select",
          "prompt": "In Lesson 1, what does 師大 mean?",
          "options": [
            "NTNU; Shida (university)",
            "a convenience store",
            "a train station"
          ],
          "answer": "NTNU; Shida (university)",
          "explanation": "師大 is the short name of National Taiwan Normal University, a destination in this lesson."
        },
        {
          "id": "b2u1-l7-vocab-5",
          "type": "select",
          "prompt": "In Lesson 1, what does 走 mean?",
          "options": [
            "walk; go (toward a destination)",
            "arrive at a destination",
            "ride a bicycle"
          ],
          "answer": "walk; go (toward a destination)",
          "explanation": "到師大怎麼走？ asks which route to take; 走 is the movement, while 到 names the destination."
        },
        {
          "id": "b2u1-l7-vocab-6",
          "type": "select",
          "prompt": "In Lesson 1, what does 下 mean?",
          "options": [
            "next; following (before a measure word)",
            "the previous one",
            "the second one"
          ],
          "answer": "next; following (before a measure word)",
          "explanation": "下一個路口 means “the next intersection”; 下 precedes 一個 here."
        },
        {
          "id": "b2u1-l7-vocab-7",
          "type": "select",
          "prompt": "In Lesson 1, what does 路口 mean?",
          "options": [
            "intersection",
            "a road number",
            "the end of a road"
          ],
          "answer": "intersection",
          "explanation": "下一個路口 means the next street intersection, where you can turn."
        },
        {
          "id": "b2u1-l7-vocab-8",
          "type": "select",
          "prompt": "In Lesson 1, what does 往前 mean?",
          "options": [
            "go forward; ahead",
            "turn around",
            "go upstairs"
          ],
          "answer": "go forward; ahead",
          "explanation": "往前走 means go forward in the indicated direction; 往 was taught in Book 1."
        },
        {
          "id": "b2u1-l7-vocab-9",
          "type": "select",
          "prompt": "In Lesson 1, what does 右轉 mean?",
          "options": [
            "turn right",
            "turn left",
            "keep going straight"
          ],
          "answer": "turn right",
          "explanation": "At a 路口, 右轉 changes direction to the right; compare 左轉."
        },
        {
          "id": "b2u1-l7-vocab-10",
          "type": "select",
          "prompt": "In Lesson 1, what does 左轉 mean?",
          "options": [
            "turn left",
            "turn right",
            "cross the road"
          ],
          "answer": "turn left",
          "explanation": "左轉 changes direction to the left. A sign that says 往左轉 points left."
        },
        {
          "id": "b2u1-l7-listen-1",
          "type": "listen",
          "char": "迷",
          "options": [
            "迷",
            "走",
            "路"
          ],
          "answer": "迷",
          "explanation": "The audio says 迷, pronounced mí."
        },
        {
          "id": "b2u1-l7-listen-2",
          "type": "listen",
          "char": "轉",
          "options": [
            "轉",
            "走",
            "路"
          ],
          "answer": "轉",
          "explanation": "The audio says 轉, pronounced zhuǎn."
        },
        {
          "id": "b2u1-l7-recall-1",
          "type": "memory",
          "char": "迷"
        },
        {
          "id": "b2u1-l7-recall-2",
          "type": "memory",
          "char": "轉"
        },
        {
          "id": "b2u1-l7-grammar-1",
          "type": "select",
          "prompt": "In 從這裡往前走。, what is the meaning?",
          "options": [
            "Go forward from here.",
            "The two places or actions are unrelated.",
            "This sentence gives someone’s name."
          ],
          "answer": "Go forward from here.",
          "explanation": "從 names the starting point and 往 the direction. If the starting point is understood, omit 從這裡 and say 往前走. For a prohibited direction use 不能往…, and for a question ask 是不是往…."
        }
      ]
    }
  ],
  "newVocabulary": [
    {
      "text": "路人",
      "pinyin": "lùrén",
      "meaning": "passer-by",
      "lessonId": "b2u1-l1-lesson",
      "core": true,
      "note": "路人 is a person on the street who can help with directions."
    },
    {
      "text": "幫忙",
      "pinyin": "bāngmáng",
      "meaning": "help; do a favor",
      "lessonId": "b2u1-l1-lesson",
      "core": true,
      "note": "需要我幫忙嗎？ is a polite offer: “Do you need my help?”"
    },
    {
      "text": "迷路",
      "pinyin": "mílù",
      "meaning": "be lost; lose one’s way",
      "lessonId": "b2u1-l1-lesson",
      "core": true,
      "note": "我好像迷路了 means “I think I am lost”; 迷路 is a separable verb, not a place."
    },
    {
      "text": "師大",
      "pinyin": "Shīdà",
      "meaning": "NTNU; Shida (university)",
      "lessonId": "b2u1-l2-lesson",
      "core": true,
      "note": "師大 is the short name of National Taiwan Normal University, a destination in this lesson."
    },
    {
      "text": "走",
      "pinyin": "zǒu",
      "meaning": "walk; go (toward a destination)",
      "lessonId": "b2u1-l2-lesson",
      "core": true,
      "note": "到師大怎麼走？ asks which route to take; 走 is the movement, while 到 names the destination."
    },
    {
      "text": "下",
      "pinyin": "xià",
      "meaning": "next; following (before a measure word)",
      "lessonId": "b2u1-l3-lesson",
      "core": true,
      "note": "下一個路口 means “the next intersection”; 下 precedes 一個 here."
    },
    {
      "text": "路口",
      "pinyin": "lùkǒu",
      "meaning": "intersection",
      "lessonId": "b2u1-l3-lesson",
      "core": true,
      "note": "下一個路口 means the next street intersection, where you can turn."
    },
    {
      "text": "往前",
      "pinyin": "wǎng qián",
      "meaning": "go forward; ahead",
      "lessonId": "b2u1-l4-lesson",
      "core": true,
      "note": "往前走 means go forward in the indicated direction; 往 was taught in Book 1."
    },
    {
      "text": "右轉",
      "pinyin": "yòu zhuǎn",
      "meaning": "turn right",
      "lessonId": "b2u1-l5-lesson",
      "core": true,
      "note": "At a 路口, 右轉 changes direction to the right; compare 左轉."
    },
    {
      "text": "左轉",
      "pinyin": "zuǒ zhuǎn",
      "meaning": "turn left",
      "lessonId": "b2u1-l5-lesson",
      "core": true,
      "note": "左轉 changes direction to the left. A sign that says 往左轉 points left."
    }
  ],
  "reviewVocabulary": [],
  "newCharacters": [
    "迷",
    "轉"
  ],
  "reviewCharacters": [],
  "characters": {
    "迷": {
      "hanzi": "迷",
      "pinyin": "mí",
      "zhuyin": "ㄇㄧˊ",
      "meaning": "lost; bewildered",
      "strokes": 10,
      "note": "In 迷路, 迷 describes losing your sense of the route.",
      "memory": "Write 米 first, then let the four strokes of 辶 carry 米 along a wandering path.",
      "parts": [
        {
          "label": "米",
          "name": "rice shape",
          "role": "Character component",
          "description": "In 迷, write 米 (rice shape) as the first 6 strokes; Write 米 first, then let the four strokes of 辶 carry 米 along a wandering path.",
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
          "label": "辶",
          "name": "walking radical",
          "role": "Character component",
          "description": "In 迷, write 辶 (walking radical) as the following 4 strokes; Write 米 first, then let the four strokes of 辶 carry 米 along a wandering path.",
          "strokes": [
            6,
            7,
            8,
            9
          ]
        }
      ],
      "layout": "side",
      "example": {
        "text": "迷路",
        "pinyin": "mílù",
        "meaning": "get lost"
      },
      "practiceBuild": true
    },
    "轉": {
      "hanzi": "轉",
      "pinyin": "zhuǎn",
      "zhuyin": "ㄓㄨㄢˇ",
      "meaning": "turn",
      "strokes": 18,
      "note": "In 左轉 and 右轉, 轉 is a change of direction.",
      "memory": "A 車 on the left turns when the right-side 專 completes the character.",
      "parts": [
        {
          "label": "車",
          "name": "vehicle",
          "role": "Character component",
          "description": "In 轉, write 車 (vehicle) as the first 7 strokes; A 車 on the left turns when the right-side 專 completes the character.",
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
          "name": "right-side sound component",
          "role": "Character component",
          "description": "In 轉, write 專 (right-side sound component) as the following 11 strokes; A 車 on the left turns when the right-side 專 completes the character.",
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
      "layout": "side",
      "example": {
        "text": "右轉",
        "pinyin": "yòu zhuǎn",
        "meaning": "turn right"
      },
      "practiceBuild": true
    }
  },
  "grammarRules": {
    "b2u1-l4-from-toward": {
      "id": "b2u1-l4-from-toward",
      "title": "From a point toward a direction",
      "pattern": "從 + start + 往 + direction + movement",
      "explanation": "從 names the starting point and 往 the direction. If the starting point is understood, omit 從這裡 and say 往前走. For a prohibited direction use 不能往…, and for a question ask 是不是往….",
      "examples": [
        {
          "text": "從這裡往前走。",
          "pinyin": "Cóng zhèlǐ wǎng qián zǒu.",
          "meaning": "Go forward from here."
        },
        {
          "text": "不能從這個路口往前走。",
          "pinyin": "Bù néng cóng zhège lùkǒu wǎng qián zǒu.",
          "meaning": "You cannot go forward from this intersection."
        }
      ],
      "remember": "從 = starting point; 往 = direction; 到 = endpoint."
    }
  },
  "grammarIntroductions": [
    {
      "id": "b2u1-l4-from-toward",
      "kind": "rule",
      "ref": "b2u1-l4-from-toward",
      "lessonId": "b2u1-l4-lesson",
      "stepId": "b2u1-l4-g-from-toward-explain"
    }
  ],
  "reviewGrammar": [],
  "phrases": {
    "b2u1-l1-word-1": {
      "text": "路人",
      "pinyin": "lùrén",
      "meaning": "passer-by",
      "note": "路人 is a person on the street who can help with directions.",
      "tokens": [
        "路人"
      ],
      "practice": false
    },
    "b2u1-l1-word-2": {
      "text": "幫忙",
      "pinyin": "bāngmáng",
      "meaning": "help; do a favor",
      "note": "需要我幫忙嗎？ is a polite offer: “Do you need my help?”",
      "tokens": [
        "幫忙"
      ],
      "practice": false
    },
    "b2u1-l1-word-3": {
      "text": "迷路",
      "pinyin": "mílù",
      "meaning": "be lost; lose one’s way",
      "note": "我好像迷路了 means “I think I am lost”; 迷路 is a separable verb, not a place.",
      "tokens": [
        "迷路"
      ],
      "practice": false
    },
    "b2u1-l2-word-1": {
      "text": "師大",
      "pinyin": "Shīdà",
      "meaning": "NTNU; Shida (university)",
      "note": "師大 is the short name of National Taiwan Normal University, a destination in this lesson.",
      "tokens": [
        "師大"
      ],
      "practice": false
    },
    "b2u1-l2-word-2": {
      "text": "走",
      "pinyin": "zǒu",
      "meaning": "walk; go (toward a destination)",
      "note": "到師大怎麼走？ asks which route to take; 走 is the movement, while 到 names the destination.",
      "tokens": [
        "走"
      ],
      "practice": false
    },
    "b2u1-l2-model": {
      "text": "請問，師大怎麼走？",
      "pinyin": "Qǐngwèn, Shīdà zěnme zǒu?",
      "meaning": "Excuse me, how do I get to NTNU?",
      "note": "Rebuild this complete source-aligned message from its words.",
      "tokens": [
        "請問",
        "師大",
        "怎麼",
        "走"
      ],
      "practice": true
    },
    "b2u1-l3-word-1": {
      "text": "下",
      "pinyin": "xià",
      "meaning": "next; following (before a measure word)",
      "note": "下一個路口 means “the next intersection”; 下 precedes 一個 here.",
      "tokens": [
        "下"
      ],
      "practice": false
    },
    "b2u1-l3-word-2": {
      "text": "路口",
      "pinyin": "lùkǒu",
      "meaning": "intersection",
      "note": "下一個路口 means the next street intersection, where you can turn.",
      "tokens": [
        "路口"
      ],
      "practice": false
    },
    "b2u1-l3-model": {
      "text": "請問，師大怎麼走？",
      "pinyin": "Qǐngwèn, Shīdà zěnme zǒu?",
      "meaning": "Excuse me, how do I get to NTNU?",
      "note": "Rebuild this complete source-aligned message from its words.",
      "tokens": [
        "請問",
        "師大",
        "怎麼",
        "走"
      ],
      "practice": true
    },
    "b2u1-l4-word-1": {
      "text": "往前",
      "pinyin": "wǎng qián",
      "meaning": "go forward; ahead",
      "note": "往前走 means go forward in the indicated direction; 往 was taught in Book 1.",
      "tokens": [
        "往前"
      ],
      "practice": false
    },
    "b2u1-l4-model": {
      "text": "從這裡往前走。",
      "pinyin": "Cóng zhèlǐ wǎng qián zǒu.",
      "meaning": "Walk forward from here.",
      "note": "Rebuild this complete source-aligned message from its words.",
      "tokens": [
        "從",
        "這裡",
        "往前",
        "走"
      ],
      "practice": true
    },
    "b2u1-l5-word-1": {
      "text": "右轉",
      "pinyin": "yòu zhuǎn",
      "meaning": "turn right",
      "note": "At a 路口, 右轉 changes direction to the right; compare 左轉.",
      "tokens": [
        "右轉"
      ],
      "practice": false
    },
    "b2u1-l5-word-2": {
      "text": "左轉",
      "pinyin": "zuǒ zhuǎn",
      "meaning": "turn left",
      "note": "左轉 changes direction to the left. A sign that says 往左轉 points left.",
      "tokens": [
        "左轉"
      ],
      "practice": false
    },
    "b2u1-l5-model": {
      "text": "從這裡往前走。",
      "pinyin": "Cóng zhèlǐ wǎng qián zǒu.",
      "meaning": "Walk forward from here.",
      "note": "Rebuild this complete source-aligned message from its words.",
      "tokens": [
        "從",
        "這裡",
        "往前",
        "走"
      ],
      "practice": true
    },
    "b2u1-l6-model": {
      "text": "到下一個路口右轉。",
      "pinyin": "Dào xià yí ge lùkǒu yòu zhuǎn.",
      "meaning": "Turn right at the next intersection.",
      "note": "Rebuild this complete source-aligned message from its words.",
      "tokens": [
        "到",
        "下",
        "一個",
        "路口",
        "右轉"
      ],
      "practice": true
    },
    "b2u1-l7-cumulative-1": {
      "text": "請問，師大怎麼走？",
      "pinyin": "Qǐngwèn, Shīdà zěnme zǒu?",
      "meaning": "Excuse me, how do I get to NTNU?",
      "note": "Use the full sentence, not just a matching keyword.",
      "tokens": [
        "請問",
        "師大",
        "怎麼",
        "走"
      ],
      "practice": true
    },
    "b2u1-l7-cumulative-2": {
      "text": "從這裡往前走。",
      "pinyin": "Cóng zhèlǐ wǎng qián zǒu.",
      "meaning": "Walk forward from here.",
      "note": "Use the full sentence, not just a matching keyword.",
      "tokens": [
        "從",
        "這裡",
        "往前",
        "走"
      ],
      "practice": true
    },
    "b2u1-l7-cumulative-3": {
      "text": "到下一個路口右轉。",
      "pinyin": "Dào xià yí ge lùkǒu yòu zhuǎn.",
      "meaning": "Turn right at the next intersection.",
      "note": "Use the full sentence, not just a matching keyword.",
      "tokens": [
        "到",
        "下",
        "一個",
        "路口",
        "右轉"
      ],
      "practice": true
    }
  },
  "revisionStepIds": []
};

export default unit;
