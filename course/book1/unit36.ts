import type {UnitData} from '../schema.ts';

const unit:UnitData = {
  "schemaVersion": 1,
  "bookId": "book-1",
  "order": 36,
  "unit": {
    "id": "unit-36",
    "number": 36,
    "theme": "orange",
    "label": "Work, after-events & easy/hard actions",
    "title": "Is That Job Easy to Find?",
    "description": "Complete Lesson 12 with Dialogue II: work and business, returning home, Event + 以後, finding a job, trying, and the special 好/難 + verb patterns.",
    "chars": [
      "工",
      "作",
      "試",
      "難"
    ],
    "lessonIds": [
      "u36-work",
      "u36-business",
      "u36-after",
      "u36-job",
      "u36-try",
      "u36-hard",
      "u36-review"
    ],
    "banner": {
      "text": "這樣的工作在你們國家好找嗎",
      "pinyin": "Zhèyàng de gōngzuò zài nǐmen guójiā hǎo zhǎo ma"
    },
    "goal": {
      "text": "我回國以後，也想找個有機會說中文的工作。",
      "pinyin": "Wǒ huíguó yǐhòu, yě xiǎng zhǎo ge yǒu jīhuì shuō Zhōngwén de gōngzuò.",
      "meaning": "After I go back home, I would also like to find a job with opportunities to speak Chinese."
    },
    "grammarIds": [
      "u36-yihou-after",
      "u36-hao-nan-verb"
    ],
    "bookReference": "A Course in Contemporary Chinese 1 · Lesson 12 「你在臺灣學多久的中文？」 Dialogue II / Vocabulary II (printed pp. 249–251), Grammar III 以後 (printed pp. 255–257), and Grammar IV 好/難 + verbs (printed pp. 257–259). This unit completes Lesson 12. Unit 35 already taught standalone 以後 'in the future'; this unit adds Event/Time + 以後 'after/later' and the source 好/難 + verb distinctions."
  },
  "reviewLessonId": "u36-review",
  "lessons": [
    {
      "id": "u36-work",
      "title": "When Did You Come to Work?",
      "subtitle": "Learn 工作 and 去年 while retrieving the past-event 是…的 question from Unit 35.",
      "chars": [
        "工",
        "作"
      ],
      "minutes": "12–15 min",
      "unitId": "unit-36",
      "review": false,
      "steps": [
        {
          "id": "u36-work-工-intro",
          "type": "intro",
          "char": "工"
        },
        {
          "id": "u36-work-工-trace",
          "type": "trace",
          "char": "工"
        },
        {
          "id": "u36-work-工-build",
          "type": "build",
          "char": "工"
        },
        {
          "id": "u36-work-工-complete",
          "type": "complete",
          "char": "工"
        },
        {
          "id": "u36-work-工-memory",
          "type": "memory",
          "char": "工"
        },
        {
          "id": "u36-work-作-intro",
          "type": "intro",
          "char": "作"
        },
        {
          "id": "u36-work-作-trace",
          "type": "trace",
          "char": "作"
        },
        {
          "id": "u36-work-作-build",
          "type": "build",
          "char": "作"
        },
        {
          "id": "u36-work-作-complete",
          "type": "complete",
          "char": "作"
        },
        {
          "id": "u36-work-作-memory",
          "type": "memory",
          "char": "作"
        },
        {
          "id": "u36-work-p1",
          "type": "phrase",
          "phrase": "u36-work-question"
        },
        {
          "id": "u36-work-p2",
          "type": "phrase",
          "phrase": "u36-last-year"
        },
        {
          "id": "u36-work-s1",
          "type": "select",
          "prompt": "In 去年，我已經在臺灣工作一年了, what does 工作 mean?",
          "options": [
            "to work",
            "tuition",
            "to return home"
          ],
          "answer": "to work",
          "explanation": "工作 is a verb here: Tianzhong says he has been working in Taiwan.",
          "grammarIds": [
            "u35-shi-de"
          ]
        },
        {
          "id": "u36-work-s2",
          "type": "select",
          "prompt": "Which source word means “last year”?",
          "options": [
            "去年",
            "以後",
            "大概"
          ],
          "answer": "去年",
          "explanation": "去年 means last year."
        },
        {
          "id": "u36-work-s3",
          "type": "select",
          "prompt": "Lesson 12 lists 工作 both as a verb and as a noun. Which pair is correct?",
          "options": [
            "to work / job, work",
            "to study / school",
            "to pay / tuition"
          ],
          "answer": "to work / job, work",
          "explanation": "The same written word 工作 is used in Dialogue II both for the activity 'to work' and for a job/work."
        }
      ]
    },
    {
      "id": "u36-business",
      "title": "Doing Business in Taiwan",
      "subtitle": "Use 生意 in 做生意 and understand why the company wants its staff to speak Chinese.",
      "chars": [],
      "minutes": "8–10 min",
      "unitId": "unit-36",
      "review": false,
      "steps": [
        {
          "id": "u36-business-p1",
          "type": "phrase",
          "phrase": "u36-business"
        },
        {
          "id": "u36-business-p2",
          "type": "phrase",
          "phrase": "u36-boss"
        },
        {
          "id": "u36-business-s1",
          "type": "select",
          "prompt": "What does 生意 mean in 做生意?",
          "options": [
            "business",
            "tuition",
            "language center"
          ],
          "answer": "business",
          "explanation": "做生意 means to do business; 生意 is the new noun 'business'."
        },
        {
          "id": "u36-business-s2",
          "type": "select",
          "prompt": "Why does Tianzhong's company want the staff to speak Chinese?",
          "options": [
            "The company does business with Taiwanese people.",
            "The company is a language school.",
            "The staff are all university students."
          ],
          "answer": "The company does business with Taiwanese people.",
          "explanation": "The dialogue says 因為我們公司跟臺灣人做生意, so the business relationship motivates the language study."
        },
        {
          "id": "u36-business-s3",
          "type": "select",
          "prompt": "Which word in 老闆希望我們都會說中文 means “boss”?",
          "options": [
            "老闆",
            "公司",
            "生意"
          ],
          "answer": "老闆",
          "explanation": "老闆 is review vocabulary from an earlier unit; here it means the boss."
        }
      ]
    },
    {
      "id": "u36-after",
      "title": "After You Go Home",
      "subtitle": "Learn Event/Time + 以後 'after/later' and contrast it with Unit 35's standalone 以後 'in the future'.",
      "chars": [],
      "minutes": "9–12 min",
      "unitId": "unit-36",
      "review": false,
      "steps": [
        {
          "id": "u36-after-g1",
          "type": "grammar",
          "grammar": "u36-yihou-after"
        },
        {
          "id": "u36-after-p1",
          "type": "phrase",
          "phrase": "u36-after-home"
        },
        {
          "id": "u36-after-p2",
          "type": "phrase",
          "phrase": "u36-after-taiwan"
        },
        {
          "id": "u36-after-p3",
          "type": "phrase",
          "phrase": "u36-after-class"
        },
        {
          "id": "u36-after-s1",
          "type": "select",
          "prompt": "What does 回國以後 mean?",
          "options": [
            "after returning home",
            "before returning home",
            "in the country"
          ],
          "answer": "after returning home",
          "explanation": "With an event before it, 以後 means 'after': 回國 + 以後.",
          "grammarIds": [
            "u36-yihou-after"
          ]
        },
        {
          "id": "u36-after-s2",
          "type": "select",
          "prompt": "Where does 以後 go when it means 'after an event'?",
          "options": [
            "after the event phrase",
            "before the event phrase",
            "only at the very end of the whole sentence"
          ],
          "answer": "after the event phrase",
          "explanation": "The anchor comes first: 回國以後, 來臺灣以後, 下課以後.",
          "grammarIds": [
            "u36-yihou-after"
          ]
        },
        {
          "id": "u36-after-s3",
          "type": "select",
          "prompt": "Which use of 以後 was already taught in Unit 35?",
          "options": [
            "standalone 以後 = in the future",
            "Event + 以後 = before an event",
            "以後 = yesterday"
          ],
          "answer": "standalone 以後 = in the future",
          "explanation": "Unit 35 taught 以後 as a standalone future time word. This unit adds the post-event 'after/later' use.",
          "grammarIds": [
            "u36-yihou-after"
          ]
        }
      ]
    },
    {
      "id": "u36-job",
      "title": "Is That Kind of Job Easy to Find?",
      "subtitle": "Learn 這樣 and 國家, then distinguish the special 好/難 + verb meanings.",
      "chars": [],
      "minutes": "9–12 min",
      "unitId": "unit-36",
      "review": false,
      "steps": [
        {
          "id": "u36-job-g1",
          "type": "grammar",
          "grammar": "u36-hao-nan-verb"
        },
        {
          "id": "u36-job-p1",
          "type": "phrase",
          "phrase": "u36-job-question"
        },
        {
          "id": "u36-job-p2",
          "type": "phrase",
          "phrase": "u36-good-job"
        },
        {
          "id": "u36-job-s1",
          "type": "select",
          "prompt": "What does 這樣的工作 mean?",
          "options": [
            "this kind of job",
            "last year's job",
            "the boss's company"
          ],
          "answer": "this kind of job",
          "explanation": "這樣 means 'this kind (of)' or 'like this'; 的 links it to 工作."
        },
        {
          "id": "u36-job-s2",
          "type": "select",
          "prompt": "In 好找, what does 好 mean?",
          "options": [
            "easy to",
            "good-looking",
            "already"
          ],
          "answer": "easy to",
          "explanation": "With an action verb such as 找, 好 means 'easy to do': 好找 = easy to find.",
          "grammarIds": [
            "u36-hao-nan-verb"
          ]
        },
        {
          "id": "u36-job-s3",
          "type": "select",
          "prompt": "Which source word means “country”?",
          "options": [
            "國家",
            "公司",
            "生意"
          ],
          "answer": "國家",
          "explanation": "國家 is the source noun for country."
        },
        {
          "id": "u36-job-s4",
          "type": "select",
          "prompt": "Which sentence uses the perception-verb branch of 好 + verb?",
          "options": [
            "日本菜好吃。",
            "好工作很難找。",
            "這樣的工作在你們國家好找嗎？"
          ],
          "answer": "日本菜好吃。",
          "explanation": "With perception verbs such as 吃/喝/看/聽, the textbook treats forms like 好吃 as single words describing a pleasant perception.",
          "grammarIds": [
            "u36-hao-nan-verb"
          ]
        }
      ]
    },
    {
      "id": "u36-try",
      "title": "Give It a Try",
      "subtitle": "Learn 試 and the source phrase 試試看, while practicing 好不好 + verb questions.",
      "chars": [
        "試"
      ],
      "minutes": "9–11 min",
      "unitId": "unit-36",
      "review": false,
      "steps": [
        {
          "id": "u36-try-試-intro",
          "type": "intro",
          "char": "試"
        },
        {
          "id": "u36-try-試-trace",
          "type": "trace",
          "char": "試"
        },
        {
          "id": "u36-try-試-build",
          "type": "build",
          "char": "試"
        },
        {
          "id": "u36-try-試-complete",
          "type": "complete",
          "char": "試"
        },
        {
          "id": "u36-try-試-memory",
          "type": "memory",
          "char": "試"
        },
        {
          "id": "u36-try-p1",
          "type": "phrase",
          "phrase": "u36-try-it"
        },
        {
          "id": "u36-try-s1",
          "type": "select",
          "prompt": "What does 試 mean?",
          "options": [
            "to try",
            "to wait",
            "to decide"
          ],
          "answer": "to try",
          "explanation": "試 is 'to try'. 試試看 is the source phrase 'give it a try / try and see what happens'."
        },
        {
          "id": "u36-try-s2",
          "type": "select",
          "prompt": "What is 好不好找 asking?",
          "options": [
            "whether it is easy to find",
            "whether it was found yesterday",
            "who will look for it"
          ],
          "answer": "whether it is easy to find",
          "explanation": "好不好 + action verb is an A-not-A question: 好不好找 asks whether something is easy to find.",
          "grammarIds": [
            "u36-hao-nan-verb"
          ]
        },
        {
          "id": "u36-try-o1",
          "type": "order",
          "phrase": "u36-try-it",
          "tokens": [
            "不知道好不好找",
            "我試試看"
          ]
        }
      ]
    },
    {
      "id": "u36-hard",
      "title": "What If It Is Hard to Find?",
      "subtitle": "Learn 難 and 那麼, finish Dialogue II, and practice negatives/questions across both 好/難 + verb branches.",
      "chars": [
        "難"
      ],
      "minutes": "11–14 min",
      "unitId": "unit-36",
      "review": false,
      "steps": [
        {
          "id": "u36-hard-難-intro",
          "type": "intro",
          "char": "難"
        },
        {
          "id": "u36-hard-難-trace",
          "type": "trace",
          "char": "難"
        },
        {
          "id": "u36-hard-難-build",
          "type": "build",
          "char": "難"
        },
        {
          "id": "u36-hard-難-complete",
          "type": "complete",
          "char": "難"
        },
        {
          "id": "u36-hard-難-memory",
          "type": "memory",
          "char": "難"
        },
        {
          "id": "u36-hard-p1",
          "type": "phrase",
          "phrase": "u36-hard-find"
        },
        {
          "id": "u36-hard-p2",
          "type": "phrase",
          "phrase": "u36-then"
        },
        {
          "id": "u36-hard-p3",
          "type": "phrase",
          "phrase": "u36-see-again"
        },
        {
          "id": "u36-hard-p4",
          "type": "phrase",
          "phrase": "u36-not-hard"
        },
        {
          "id": "u36-hard-s1",
          "type": "select",
          "prompt": "What does 難 mean before an action verb?",
          "options": [
            "hard or difficult to",
            "pleasant to",
            "already"
          ],
          "answer": "hard or difficult to",
          "explanation": "難 + action verb means that the action is difficult: 難找 = hard to find, 難學 = hard to learn.",
          "grammarIds": [
            "u36-hao-nan-verb"
          ]
        },
        {
          "id": "u36-hard-s2",
          "type": "select",
          "prompt": "What does 那麼 mean in 那麼我再來臺灣學中文?",
          "options": [
            "then; in that case",
            "that many",
            "last year"
          ],
          "answer": "then; in that case",
          "explanation": "Here 那麼 introduces the consequence or next response: 'then / in that case'."
        },
        {
          "id": "u36-hard-s3",
          "type": "select",
          "prompt": "Which negative follows the textbook pattern?",
          "options": [
            "學校附近便宜的套房不好找。",
            "學校附近便宜的套房好不找。",
            "學校附近便宜的套房沒好找。"
          ],
          "answer": "學校附近便宜的套房不好找。",
          "explanation": "Negation places 不 before the 好/難 + verb predicate: 不好找, 不難學, 不好喝.",
          "grammarIds": [
            "u36-hao-nan-verb"
          ]
        },
        {
          "id": "u36-hard-s4",
          "type": "select",
          "prompt": "Which is a valid A-not-A question from this grammar?",
          "options": [
            "工作好不好找？",
            "工作好找不？",
            "工作沒好找嗎？"
          ],
          "answer": "工作好不好找？",
          "explanation": "The source uses 好不好 + verb and 難不難 + verb as question patterns.",
          "grammarIds": [
            "u36-hao-nan-verb"
          ]
        }
      ]
    },
    {
      "id": "u36-review",
      "title": "Unit 36 Review",
      "subtitle": "Retrieve Dialogue II, both new grammar systems, all eight new lexical items, and the four new characters.",
      "chars": [
        "工",
        "作",
        "試",
        "難"
      ],
      "minutes": "16–20 min",
      "unitId": "unit-36",
      "review": true,
      "steps": [
        {
          "id": "u36-review-l1",
          "type": "listen",
          "audioText": "去年，我已經在臺灣工作一年了。",
          "options": [
            "去年",
            "明年",
            "今年"
          ],
          "answer": "去年",
          "explanation": "去年 means last year."
        },
        {
          "id": "u36-review-l2",
          "type": "listen",
          "audioText": "因為我們公司跟臺灣人做生意。",
          "options": [
            "生意",
            "生日",
            "生病"
          ],
          "answer": "生意",
          "explanation": "生意 means business."
        },
        {
          "id": "u36-review-l3",
          "type": "listen",
          "audioText": "要是難找呢？那麼我再來臺灣學中文。",
          "options": [
            "難找",
            "好找",
            "不錯"
          ],
          "answer": "難找",
          "explanation": "難找 means hard to find."
        },
        {
          "id": "u36-review-v1",
          "type": "select",
          "prompt": "工作 can mean which pair in Lesson 12?",
          "options": [
            "to work / job, work",
            "to travel / ticket",
            "to pay / tuition"
          ],
          "answer": "to work / job, work",
          "explanation": "Vocabulary II lists 工作 twice with verb and noun uses."
        },
        {
          "id": "u36-review-v2",
          "type": "select",
          "prompt": "去年 means…",
          "options": [
            "last year",
            "next year",
            "after class"
          ],
          "answer": "last year",
          "explanation": "去年 is last year."
        },
        {
          "id": "u36-review-v3",
          "type": "select",
          "prompt": "生意 means…",
          "options": [
            "business",
            "grade",
            "scholarship"
          ],
          "answer": "business",
          "explanation": "生意 is business; 做生意 means to do business."
        },
        {
          "id": "u36-review-v4",
          "type": "select",
          "prompt": "這樣 means…",
          "options": [
            "this kind (of); like this",
            "together",
            "approximately"
          ],
          "answer": "this kind (of); like this",
          "explanation": "這樣 describes something as being 'this kind' or 'like this'."
        },
        {
          "id": "u36-review-v5",
          "type": "select",
          "prompt": "國家 means…",
          "options": [
            "country",
            "company",
            "university"
          ],
          "answer": "country",
          "explanation": "國家 means country."
        },
        {
          "id": "u36-review-v6",
          "type": "select",
          "prompt": "試 means…",
          "options": [
            "to try",
            "to hope",
            "to wait"
          ],
          "answer": "to try",
          "explanation": "試 is 'to try'; 試試看 is 'give it a try'."
        },
        {
          "id": "u36-review-v7",
          "type": "select",
          "prompt": "難 before an action verb means…",
          "options": [
            "hard or difficult to",
            "easy to",
            "in the future"
          ],
          "answer": "hard or difficult to",
          "explanation": "難找 is hard to find; 難學 is hard to learn.",
          "grammarIds": [
            "u36-hao-nan-verb"
          ]
        },
        {
          "id": "u36-review-v8",
          "type": "select",
          "prompt": "那麼 in the dialogue means…",
          "options": [
            "then; in that case",
            "so many",
            "there"
          ],
          "answer": "then; in that case",
          "explanation": "那麼 introduces what follows from the situation."
        },
        {
          "id": "u36-review-g1",
          "type": "select",
          "prompt": "Which means 'after returning home'?",
          "options": [
            "回國以後",
            "以後回國",
            "去年回國"
          ],
          "answer": "回國以後",
          "explanation": "Event + 以後 means after that event.",
          "grammarIds": [
            "u36-yihou-after"
          ]
        },
        {
          "id": "u36-review-g2",
          "type": "select",
          "prompt": "Which word order matches Event + 以後?",
          "options": [
            "Event + 以後, then the later event",
            "以後 + Event, then the earlier event"
          ],
          "answer": "Event + 以後, then the later event",
          "explanation": "The source anchor comes first: 回國以後…, 下課以後….",
          "grammarIds": [
            "u36-yihou-after"
          ]
        },
        {
          "id": "u36-review-g3",
          "type": "select",
          "prompt": "How does Unit 35's standalone 以後 differ from 回國以後?",
          "options": [
            "Standalone 以後 means 'in the future'; 回國以後 means 'after returning home'.",
            "They always mean exactly the same thing."
          ],
          "answer": "Standalone 以後 means 'in the future'; 回國以後 means 'after returning home'.",
          "explanation": "Lesson 12 explicitly distinguishes these two functions.",
          "grammarIds": [
            "u36-yihou-after"
          ]
        },
        {
          "id": "u36-review-g4",
          "type": "select",
          "prompt": "What does 好找 mean?",
          "options": [
            "easy to find",
            "good-looking",
            "already found"
          ],
          "answer": "easy to find",
          "explanation": "With an action verb, 好 means easy to do.",
          "grammarIds": [
            "u36-hao-nan-verb"
          ]
        },
        {
          "id": "u36-review-g5",
          "type": "select",
          "prompt": "Which pair belongs to the textbook's perception branch?",
          "options": [
            "好吃 / 難吃",
            "好找 / 難找",
            "好學 / 難學"
          ],
          "answer": "好吃 / 難吃",
          "explanation": "With perception verbs, forms such as 好吃/難吃, 好喝/難喝, 好看/難看, 好聽/難聽 function as perception descriptions.",
          "grammarIds": [
            "u36-hao-nan-verb"
          ]
        },
        {
          "id": "u36-review-g6",
          "type": "select",
          "prompt": "Which negation is correct?",
          "options": [
            "中文不難學。",
            "中文難不學。",
            "中文沒難學。"
          ],
          "answer": "中文不難學。",
          "explanation": "Put 不 before the whole 難 + verb predicate.",
          "grammarIds": [
            "u36-hao-nan-verb"
          ]
        },
        {
          "id": "u36-review-g7",
          "type": "select",
          "prompt": "Which asks whether a job is easy to find?",
          "options": [
            "工作好不好找？",
            "工作好找不找？",
            "工作有沒有找？"
          ],
          "answer": "工作好不好找？",
          "explanation": "Use 好不好 + action verb for the A-not-A question.",
          "grammarIds": [
            "u36-hao-nan-verb"
          ]
        },
        {
          "id": "u36-review-r1",
          "type": "select",
          "prompt": "Which question correctly retrieves Unit 35's 是…的 pattern?",
          "options": [
            "你是什麼時候來臺灣工作的？",
            "你什麼是時候來臺灣工作？"
          ],
          "answer": "你是什麼時候來臺灣工作的？",
          "explanation": "The Dialogue II opening retrieves the past-event focus/question construction.",
          "grammarIds": [
            "u35-shi-de"
          ]
        },
        {
          "id": "u36-review-o1",
          "type": "order",
          "phrase": "u36-after-home",
          "tokens": [
            "我回國以後",
            "也想找個有機會說中文的工作"
          ]
        },
        {
          "id": "u36-review-o2",
          "type": "order",
          "phrase": "u36-job-question",
          "tokens": [
            "不錯",
            "這樣的工作",
            "在你們國家好找嗎"
          ]
        },
        {
          "id": "u36-review-o3",
          "type": "order",
          "phrase": "u36-then",
          "tokens": [
            "那麼",
            "我再來臺灣",
            "學中文"
          ]
        },
        {
          "id": "u36-review-m1",
          "type": "memory",
          "char": "工"
        },
        {
          "id": "u36-review-m2",
          "type": "memory",
          "char": "作"
        },
        {
          "id": "u36-review-m3",
          "type": "memory",
          "char": "試"
        },
        {
          "id": "u36-review-m4",
          "type": "memory",
          "char": "難"
        },
        {
          "id": "u36-review-match",
          "type": "match",
          "chars": [
            "工",
            "作",
            "試",
            "難"
          ]
        }
      ]
    }
  ],
  "newVocabulary": [
    {
      "text": "工作",
      "pinyin": "gōngzuò",
      "meaning": "to work; job, work",
      "lessonId": "u36-work",
      "core": true,
      "note": "Lesson 12 Vocabulary II lists 工作 twice: as an intransitive verb 'to work' and as a noun 'job, work'. Hanzi Steps teaches the written form once and keeps both source uses."
    },
    {
      "text": "去年",
      "pinyin": "qùnián",
      "meaning": "last year",
      "lessonId": "u36-work",
      "core": true
    },
    {
      "text": "生意",
      "pinyin": "shēngyì",
      "meaning": "business",
      "lessonId": "u36-business",
      "core": true,
      "note": "In the dialogue it appears in 做生意 'to do business'; 做 is review vocabulary."
    },
    {
      "text": "這樣",
      "pinyin": "zhèyàng",
      "meaning": "this kind (of); like this",
      "lessonId": "u36-job",
      "core": true
    },
    {
      "text": "國家",
      "pinyin": "guójiā",
      "meaning": "country",
      "lessonId": "u36-job",
      "core": true
    },
    {
      "text": "試",
      "pinyin": "shì",
      "meaning": "to try",
      "lessonId": "u36-try",
      "core": true,
      "note": "The source phrase 試試看 is taught in the lesson as a transparent reduplicated phrase and is not counted as an additional new lexical item."
    },
    {
      "text": "難",
      "pinyin": "nán",
      "meaning": "hard to; difficult to",
      "lessonId": "u36-hard",
      "core": true,
      "note": "Grammar IV gives 難 a special pre-verbal meaning 'hard/difficult to' with action verbs, e.g. 難找."
    },
    {
      "text": "那麼",
      "pinyin": "nàme",
      "meaning": "then; in that case",
      "lessonId": "u36-hard",
      "core": true
    }
  ],
  "reviewVocabulary": [
    "臺灣",
    "已經",
    "公司",
    "替",
    "學費",
    "希望",
    "回國",
    "打算",
    "機會",
    "不錯",
    "找",
    "好",
    "再",
    "見面",
    "做",
    "老闆",
    "覺得",
    "中文",
    "以後",
    "要是",
    "就",
    "太好了",
    "會",
    "跟",
    "人",
    "上網",
    "下課",
    "便宜",
    "套房",
    "咖啡",
    "好吃",
    "好喝",
    "好看",
    "學",
    "寫"
  ],
  "newCharacters": [
    "工",
    "作",
    "試",
    "難"
  ],
  "reviewCharacters": [],
  "characters": {
    "工": {
      "hanzi": "工",
      "pinyin": "gōng",
      "zhuyin": "ㄍㄨㄥ",
      "meaning": "work; labor",
      "strokes": 3,
      "note": "工 is first-tone gōng. It is the first character of 工作, the Lesson 12 word for both 'to work' and 'job/work'.",
      "memory": "A top line, a central vertical, and a longer base make a simple workbench-like 工.",
      "parts": [
        {
          "label": "工",
          "name": "whole 工 form",
          "role": "Whole character",
          "description": "All three strokes form the simple, indivisible learner shape of 工.",
          "strokes": [
            0,
            1,
            2
          ]
        }
      ],
      "layout": "whole",
      "example": {
        "text": "工作",
        "pinyin": "gōngzuò",
        "meaning": "to work; job, work"
      }
    },
    "作": {
      "hanzi": "作",
      "pinyin": "zuò",
      "zhuyin": "ㄗㄨㄛˋ",
      "meaning": "do; make; work",
      "strokes": 7,
      "note": "作 is fourth-tone zuò. In 工作 it combines with 工 to form 'work'; do not confuse it with the already-known 做, which is also pronounced zuò.",
      "memory": "Write the two-stroke person 亻 on the left, then the five-stroke 乍 on the right.",
      "parts": [
        {
          "label": "亻",
          "name": "person component",
          "role": "Left component",
          "description": "The first two strokes form 亻, the person component.",
          "strokes": [
            0,
            1
          ]
        },
        {
          "label": "乍",
          "name": "乍 component",
          "role": "Right component",
          "description": "The final five strokes form 乍 on the right.",
          "strokes": [
            2,
            3,
            4,
            5,
            6
          ]
        }
      ],
      "layout": "side",
      "example": {
        "text": "工作",
        "pinyin": "gōngzuò",
        "meaning": "to work; job, work"
      }
    },
    "試": {
      "hanzi": "試",
      "pinyin": "shì",
      "zhuyin": "ㄕˋ",
      "meaning": "try; test",
      "strokes": 13,
      "note": "試 is fourth-tone shì. The dialogue uses 試 in 試試看, 'give it a try / try and see what happens.'",
      "memory": "Build 言 on the left for speech, then 式 on the right; together they form 試.",
      "parts": [
        {
          "label": "言",
          "name": "speech component",
          "role": "Left component",
          "description": "The first seven strokes form 言 on the left.",
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
          "label": "式",
          "name": "式 component",
          "role": "Right component",
          "description": "The final six strokes form 式 on the right.",
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
      "layout": "side",
      "example": {
        "text": "試試看",
        "pinyin": "shìshi kàn",
        "meaning": "give it a try"
      }
    },
    "難": {
      "hanzi": "難",
      "pinyin": "nán",
      "zhuyin": "ㄋㄢˊ",
      "meaning": "difficult; hard to",
      "strokes": 19,
      "note": "難 is second-tone nán. Before an action verb in Lesson 12, it means 'hard/difficult to': 難找 'hard to find', 難學 'hard to learn'.",
      "memory": "Keep the dense eleven-stroke left component compact, then write the eight-stroke 隹 'short-tailed bird' clearly on the right.",
      "parts": [
        {
          "label": "𦰩",
          "name": "left structural component",
          "role": "Left component",
          "description": "The first eleven strokes form the dense left-side component of 難.",
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
          "name": "short-tailed bird component",
          "role": "Right component",
          "description": "The final eight strokes form 隹 on the right.",
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
        "text": "難找",
        "pinyin": "nán zhǎo",
        "meaning": "hard to find"
      }
    }
  },
  "grammarRules": {
    "u36-yihou-after": {
      "id": "u36-yihou-after",
      "title": "After an event with …以後",
      "pattern": "Event / Time expression + 以後，Later event",
      "explanation": "Lesson 12 gives 以後 two functions. Unit 35 already taught standalone 以後 as a time word meaning 'in the future'. Here, an event or time expression comes before 以後: A + 以後 means 'after A' or 'later than A', and the later event follows. The textbook uses 回國以後, 來臺灣以後, 下課以後, and time expressions such as 半年以後.",
      "examples": [
        {
          "text": "我回國以後，也想找個有機會說中文的工作。",
          "pinyin": "Wǒ huíguó yǐhòu, yě xiǎng zhǎo ge yǒu jīhuì shuō Zhōngwén de gōngzuò.",
          "meaning": "After I go back home, I would also like to find a job with opportunities to speak Chinese."
        },
        {
          "text": "來臺灣以後，我每星期上五天的中文課。",
          "pinyin": "Lái Táiwān yǐhòu, wǒ měi xīngqí shàng wǔ tiān de Zhōngwén kè.",
          "meaning": "After coming to Taiwan, I have Chinese class five days a week."
        },
        {
          "text": "我下課以後，常在圖書館上網。",
          "pinyin": "Wǒ xiàkè yǐhòu, cháng zài túshūguǎn shàngwǎng.",
          "meaning": "After class, I often go online in the library."
        },
        {
          "text": "半年以後，你打算做什麼？",
          "pinyin": "Bàn nián yǐhòu, nǐ dǎsuàn zuò shénme?",
          "meaning": "What do you plan to do half a year later?"
        }
      ],
      "remember": "Put the event or time anchor before 以後: 回國以後 = after returning home. Standalone 以後, already learned in Unit 35, means 'in the future'."
    },
    "u36-hao-nan-verb": {
      "id": "u36-hao-nan-verb",
      "title": "Special meanings of 好 / 難 + verbs",
      "pattern": "好 / 難 + Verb",
      "explanation": "The textbook separates two uses. With perception verbs, forms such as 好吃/難吃, 好喝/難喝, 好看/難看, and 好聽/難聽 are single words describing a pleasant or unpleasant perception. With action verbs, 好 means 'easy to' and 難 means 'hard/difficult to': 好學/難學, 好寫/難寫, 好做/難做, 好找/難找. Degree adverbs such as 很 can modify either type. Negation puts 不 before the whole predicate (不好找, 不難學, 不好喝). Questions can use 嗎 or A-not-A forms such as 好不好找 and 難不難學.",
      "examples": [
        {
          "text": "日本菜好吃也好看。",
          "pinyin": "Rìběn cài hǎochī yě hǎokàn.",
          "meaning": "Japanese food tastes good and also looks good."
        },
        {
          "text": "好工作很難找。",
          "pinyin": "Hǎo gōngzuò hěn nán zhǎo.",
          "meaning": "Good jobs are hard to find."
        },
        {
          "text": "有人覺得中文很難學。",
          "pinyin": "Yǒu rén juéde Zhōngwén hěn nán xué.",
          "meaning": "Some people think Chinese is hard to learn."
        },
        {
          "text": "學校附近便宜的套房不好找。",
          "pinyin": "Xuéxiào fùjìn piányí de tàofáng bù hǎo zhǎo.",
          "meaning": "Cheap suites near the school are not easy to find."
        }
      ],
      "remember": "Perception verb: 好/難 describes how it tastes, sounds, looks, etc. Action verb: 好 = easy to, 難 = hard to. Put 不 before the whole combination; ask 好不好V / 難不難V."
    }
  },
  "grammarIntroductions": [
    {
      "id": "u36-yihou-after-intro",
      "kind": "rule",
      "ref": "u36-yihou-after",
      "lessonId": "u36-after",
      "stepId": "u36-after-g1"
    },
    {
      "id": "u36-hao-nan-verb-intro",
      "kind": "rule",
      "ref": "u36-hao-nan-verb",
      "lessonId": "u36-job",
      "stepId": "u36-job-g1"
    }
  ],
  "reviewGrammar": [
    "u35-shi-de",
    "u29-yaoshi-jiu"
  ],
  "phrases": {
    "u36-work-question": {
      "text": "你是什麼時候來臺灣工作的？",
      "pinyin": "Nǐ shì shénme shíhou lái Táiwān gōngzuò de?",
      "meaning": "When did you come to Taiwan to work?",
      "note": "Dialogue II opens by retrieving the 是…的 past-event question from Unit 35.",
      "tokens": [
        "你是什麼時候",
        "來臺灣工作的"
      ],
      "grammarIds": [
        "u35-shi-de"
      ]
    },
    "u36-last-year": {
      "text": "去年，我已經在臺灣工作一年了。",
      "pinyin": "Qùnián, wǒ yǐjīng zài Táiwān gōngzuò yì nián le.",
      "meaning": "Last year. I have been working in Taiwan for a year.",
      "note": "Source Dialogue II. Treat this as the dialogue's duration-to-date statement; the later formal double-了 grammar is not being introduced here.",
      "tokens": [
        "去年",
        "我已經在臺灣",
        "工作一年了"
      ]
    },
    "u36-business": {
      "text": "因為我們公司跟臺灣人做生意。",
      "pinyin": "Yīnwèi wǒmen gōngsī gēn Táiwānrén zuò shēngyì.",
      "meaning": "Because our company does business with Taiwanese people.",
      "note": "生意 is new; 做 and 因為 are review. 做生意 is a transparent source combination, not an extra new-vocabulary count.",
      "tokens": [
        "因為我們公司",
        "跟臺灣人",
        "做生意"
      ]
    },
    "u36-boss": {
      "text": "老闆希望我們都會說中文。",
      "pinyin": "Lǎobǎn xīwàng wǒmen dōu huì shuō Zhōngwén.",
      "meaning": "My boss wants us all to speak Chinese.",
      "note": "Source Dialogue II; 老闆, 希望, 都, 會, and 中文 are review.",
      "tokens": [
        "老闆希望",
        "我們都會說中文"
      ]
    },
    "u36-after-home": {
      "text": "我回國以後，也想找個有機會說中文的工作。",
      "pinyin": "Wǒ huíguó yǐhòu, yě xiǎng zhǎo ge yǒu jīhuì shuō Zhōngwén de gōngzuò.",
      "meaning": "After I go back home, I would also like to find a job with opportunities to speak Chinese.",
      "note": "Dialogue II source sentence. Here 以後 follows the event 回國 and means 'after returning home'.",
      "tokens": [
        "我回國以後",
        "也想找個有機會說中文的工作"
      ],
      "grammarIds": [
        "u36-yihou-after"
      ]
    },
    "u36-after-taiwan": {
      "text": "來臺灣以後，我每星期上五天的中文課。",
      "pinyin": "Lái Táiwān yǐhòu, wǒ měi xīngqí shàng wǔ tiān de Zhōngwén kè.",
      "meaning": "After coming to Taiwan, I have Chinese class five days a week.",
      "note": "Grammar III source example for Event + 以後.",
      "tokens": [
        "來臺灣以後",
        "我每星期",
        "上五天的中文課"
      ],
      "grammarIds": [
        "u36-yihou-after"
      ]
    },
    "u36-after-class": {
      "text": "我下課以後，常在圖書館上網。",
      "pinyin": "Wǒ xiàkè yǐhòu, cháng zài túshūguǎn shàngwǎng.",
      "meaning": "After class, I often go online in the library.",
      "note": "Grammar III source example for Event + 以後.",
      "tokens": [
        "我下課以後",
        "常在圖書館上網"
      ],
      "grammarIds": [
        "u36-yihou-after"
      ]
    },
    "u36-job-question": {
      "text": "不錯，這樣的工作在你們國家好找嗎？",
      "pinyin": "Búcuò, zhèyàng de gōngzuò zài nǐmen guójiā hǎo zhǎo ma?",
      "meaning": "Not bad. Is this kind of job easy to find in your country?",
      "note": "Dialogue II introduces 這樣、國家 and the action-verb use 好找 'easy to find'.",
      "tokens": [
        "不錯",
        "這樣的工作",
        "在你們國家好找嗎"
      ],
      "grammarIds": [
        "u36-hao-nan-verb"
      ]
    },
    "u36-good-job": {
      "text": "好工作很難找。",
      "pinyin": "Hǎo gōngzuò hěn nán zhǎo.",
      "meaning": "Good jobs are hard to find.",
      "note": "Grammar IV source example: 難 + action verb means 'hard to do'.",
      "tokens": [
        "好工作",
        "很難找"
      ],
      "grammarIds": [
        "u36-hao-nan-verb"
      ]
    },
    "u36-try-it": {
      "text": "不知道好不好找，我試試看。",
      "pinyin": "Bù zhīdào hǎo bù hǎo zhǎo, wǒ shìshi kàn.",
      "meaning": "I don't know whether it is easy to find; I'll give it a try.",
      "note": "Dialogue II source line. 試試看 is the listed source phrase; it is taught as a transparent phrase built from new 試 and known 看.",
      "tokens": [
        "不知道好不好找",
        "我試試看"
      ],
      "grammarIds": [
        "u36-hao-nan-verb"
      ]
    },
    "u36-hard-find": {
      "text": "要是難找呢？",
      "pinyin": "Yàoshi nán zhǎo ne?",
      "meaning": "What if it is hard to find?",
      "note": "Dialogue II. 難 + 找 means 'hard to find'; 要是 is review from the earlier conditional.",
      "tokens": [
        "要是",
        "難找呢"
      ],
      "grammarIds": [
        "u36-hao-nan-verb",
        "u29-yaoshi-jiu"
      ]
    },
    "u36-then": {
      "text": "那麼我再來臺灣學中文。",
      "pinyin": "Nàme wǒ zài lái Táiwān xué Zhōngwén.",
      "meaning": "Then I would come back to Taiwan to study Chinese.",
      "note": "那麼 means 'then / in that case' here; 再 is review and means again.",
      "tokens": [
        "那麼",
        "我再來臺灣",
        "學中文"
      ]
    },
    "u36-see-again": {
      "text": "太好了！那我們就可以再見面了。",
      "pinyin": "Tài hǎo le! Nà wǒmen jiù kěyǐ zài jiànmiàn le.",
      "meaning": "Great! Then we can see each other again.",
      "note": "This completes Dialogue II. 太好了、就、可以、再、見面 are review.",
      "tokens": [
        "太好了",
        "那我們就可以",
        "再見面了"
      ]
    },
    "u36-not-hard": {
      "text": "老師常常說中文不難學。",
      "pinyin": "Lǎoshī chángcháng shuō Zhōngwén bù nán xué.",
      "meaning": "The teacher often says Chinese is not hard to learn.",
      "note": "Grammar IV source negation: 不 comes before 難學.",
      "tokens": [
        "老師常常說",
        "中文不難學"
      ],
      "grammarIds": [
        "u36-hao-nan-verb"
      ]
    }
  },
  "revisionStepIds": [
    "u36-work-p1",
    "u36-business-p2",
    "u36-after-s3",
    "u36-hard-p1",
    "u36-hard-p3",
    "u36-review-r1"
  ]
};
export default unit;
