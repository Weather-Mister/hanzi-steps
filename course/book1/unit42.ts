import type {UnitData} from '../schema.ts';

const unit:UnitData = {
  "schemaVersion": 1,
  "bookId": "book-1",
  "order": 42,
  "unit": {
    "id": "unit-42",
    "number": 42,
    "theme": "blue",
    "bookReference": "Lesson 14 Dialogue I turns 1–5, weather/seasons vocabulary, Activities I and V, and weather-question support.",
    "label": "Weather & four seasons",
    "title": "Weather and the Four Seasons",
    "description": "Describe weather, name all four seasons, ask whether it snows or rains, and explain seasonal preferences.",
    "chars": [
      "冷",
      "滑",
      "雪",
      "春",
      "冬",
      "夏",
      "秋",
      "雨"
    ],
    "lessonIds": [
      "u42-weather",
      "u42-snow",
      "u42-spring-winter",
      "u42-summer-autumn",
      "u42-rain",
      "u42-seasons",
      "u42-review"
    ],
    "banner": {
      "text": "天氣很冷",
      "pinyin": "Tiānqì hěn lěng"
    },
    "goal": {
      "text": "因為我怕冷，所以我比較喜歡春天。",
      "pinyin": "Yīnwèi wǒ pà lěng, suǒyǐ wǒ bǐjiào xǐhuān chūntiān.",
      "meaning": "Because I dislike the cold, I prefer spring."
    },
    "grammarIds": []
  },
  "reviewLessonId": "u42-review",
  "lessons": [
    {
      "id": "u42-weather",
      "title": "Weather Outside",
      "subtitle": "Read and compare basic weather.",
      "chars": [
        "冷"
      ],
      "minutes": "10–13 min",
      "unitId": "unit-42",
      "review": false,
      "steps": [
        {
          "id": "u42-weather-冷-intro",
          "type": "intro",
          "char": "冷"
        },
        {
          "id": "u42-weather-冷-trace",
          "type": "trace",
          "char": "冷"
        },
        {
          "id": "u42-weather-冷-build",
          "type": "build",
          "char": "冷"
        },
        {
          "id": "u42-weather-冷-complete",
          "type": "complete",
          "char": "冷"
        },
        {
          "id": "u42-weather-冷-memory",
          "type": "memory",
          "char": "冷"
        },
        {
          "id": "u42-weather-p1",
          "type": "phrase",
          "phrase": "u42-weather-cold"
        },
        {
          "id": "u42-weather-p2",
          "type": "phrase",
          "phrase": "u42-weather-source"
        },
        {
          "id": "u42-weather-s1",
          "type": "select",
          "prompt": "天氣 means…",
          "options": [
            "weather",
            "season",
            "news"
          ],
          "answer": "weather",
          "explanation": "天氣 means weather."
        },
        {
          "id": "u42-weather-s2",
          "type": "select",
          "prompt": "冷 means…",
          "options": [
            "cold",
            "wet",
            "windy"
          ],
          "answer": "cold",
          "explanation": "冷 describes cold temperature."
        },
        {
          "id": "u42-weather-s3",
          "type": "select",
          "prompt": "風 means…",
          "options": [
            "wind",
            "rain",
            "snow"
          ],
          "answer": "wind",
          "explanation": "風 is wind."
        },
        {
          "id": "u42-weather-s4",
          "type": "select",
          "prompt": "Which sentence says today is colder than yesterday?",
          "options": [
            "今天比昨天冷。",
            "今天跟昨天一樣冷。",
            "昨天比今天冷。"
          ],
          "answer": "今天比昨天冷。",
          "explanation": "A 比 B + property compares A as more of that property than B."
        },
        {
          "id": "u42-weather-l1",
          "type": "listen",
          "audioText": "天氣很冷。",
          "prompt": "Listen for the weather word.",
          "options": [
            "天氣",
            "風景",
            "國家"
          ],
          "answer": "天氣",
          "explanation": "The audio begins with 天氣.",
          "char": "冷"
        },
        {
          "id": "u42-weather-o1",
          "type": "order",
          "phrase": "u42-weather-source",
          "tokens": [
            "外面風那麼大",
            "我覺得",
            "今天比昨天冷"
          ]
        }
      ]
    },
    {
      "id": "u42-snow",
      "title": "Snow and Skiing",
      "subtitle": "Talk about snow and skiing.",
      "chars": [
        "滑",
        "雪"
      ],
      "minutes": "12–15 min",
      "unitId": "unit-42",
      "review": false,
      "steps": [
        {
          "id": "u42-snow-滑-intro",
          "type": "intro",
          "char": "滑"
        },
        {
          "id": "u42-snow-滑-trace",
          "type": "trace",
          "char": "滑"
        },
        {
          "id": "u42-snow-滑-build",
          "type": "build",
          "char": "滑"
        },
        {
          "id": "u42-snow-滑-complete",
          "type": "complete",
          "char": "滑"
        },
        {
          "id": "u42-snow-滑-memory",
          "type": "memory",
          "char": "滑"
        },
        {
          "id": "u42-snow-雪-intro",
          "type": "intro",
          "char": "雪"
        },
        {
          "id": "u42-snow-雪-trace",
          "type": "trace",
          "char": "雪"
        },
        {
          "id": "u42-snow-雪-build",
          "type": "build",
          "char": "雪"
        },
        {
          "id": "u42-snow-雪-complete",
          "type": "complete",
          "char": "雪"
        },
        {
          "id": "u42-snow-雪-memory",
          "type": "memory",
          "char": "雪"
        },
        {
          "id": "u42-snow-p1",
          "type": "phrase",
          "phrase": "u42-snow-mountain"
        },
        {
          "id": "u42-snow-p2",
          "type": "phrase",
          "phrase": "u42-snow-when"
        },
        {
          "id": "u42-snow-s1",
          "type": "select",
          "prompt": "滑雪 means…",
          "options": [
            "to ski",
            "to rain",
            "to walk slowly"
          ],
          "answer": "to ski",
          "explanation": "滑雪 means to ski."
        },
        {
          "id": "u42-snow-s2",
          "type": "select",
          "prompt": "下雪 means…",
          "options": [
            "to snow",
            "to rain",
            "to stop"
          ],
          "answer": "to snow",
          "explanation": "下雪 means to snow."
        },
        {
          "id": "u42-snow-p3",
          "type": "phrase",
          "phrase": "u42-snow-guess"
        },
        {
          "id": "u42-snow-s3",
          "type": "select",
          "prompt": "In 開始下雪了吧？, what is the speaker doing?",
          "options": [
            "making a likely guess and seeking confirmation",
            "giving a command to ski",
            "asking how long it snowed"
          ],
          "answer": "making a likely guess and seeking confirmation",
          "explanation": "This is the already-taught inferential/guessing use of 吧."
        },
        {
          "id": "u42-snow-l1",
          "type": "listen",
          "audioText": "下雪的時候，我常去山上滑雪。",
          "prompt": "Which activity do you hear?",
          "options": [
            "滑雪",
            "打網球",
            "上網"
          ],
          "answer": "滑雪",
          "explanation": "The sentence says the speaker often goes skiing.",
          "char": "滑"
        },
        {
          "id": "u42-snow-o1",
          "type": "order",
          "phrase": "u42-snow-when",
          "tokens": [
            "下雪的時候",
            "我常去山上滑雪"
          ]
        }
      ]
    },
    {
      "id": "u42-spring-winter",
      "title": "Spring and Winter",
      "subtitle": "Describe spring and winter preferences.",
      "chars": [
        "春",
        "冬"
      ],
      "minutes": "12–15 min",
      "unitId": "unit-42",
      "review": false,
      "steps": [
        {
          "id": "u42-spring-winter-春-intro",
          "type": "intro",
          "char": "春"
        },
        {
          "id": "u42-spring-winter-春-trace",
          "type": "trace",
          "char": "春"
        },
        {
          "id": "u42-spring-winter-春-build",
          "type": "build",
          "char": "春"
        },
        {
          "id": "u42-spring-winter-春-complete",
          "type": "complete",
          "char": "春"
        },
        {
          "id": "u42-spring-winter-春-memory",
          "type": "memory",
          "char": "春"
        },
        {
          "id": "u42-spring-winter-冬-intro",
          "type": "intro",
          "char": "冬"
        },
        {
          "id": "u42-spring-winter-冬-trace",
          "type": "trace",
          "char": "冬"
        },
        {
          "id": "u42-spring-winter-冬-build",
          "type": "build",
          "char": "冬"
        },
        {
          "id": "u42-spring-winter-冬-complete",
          "type": "complete",
          "char": "冬"
        },
        {
          "id": "u42-spring-winter-冬-memory",
          "type": "memory",
          "char": "冬"
        },
        {
          "id": "u42-spring-winter-p1",
          "type": "phrase",
          "phrase": "u42-spring-source"
        },
        {
          "id": "u42-spring-winter-p2",
          "type": "phrase",
          "phrase": "u42-spring-comfort"
        },
        {
          "id": "u42-spring-s1",
          "type": "select",
          "prompt": "春天 means…",
          "options": [
            "spring",
            "summer",
            "winter"
          ],
          "answer": "spring",
          "explanation": "春天 is spring."
        },
        {
          "id": "u42-winter-s1",
          "type": "select",
          "prompt": "冬天 means…",
          "options": [
            "winter",
            "autumn",
            "spring"
          ],
          "answer": "winter",
          "explanation": "冬天 is winter."
        },
        {
          "id": "u42-spring-winter-p3",
          "type": "phrase",
          "phrase": "u42-winter-source"
        },
        {
          "id": "u42-spring-s2",
          "type": "select",
          "prompt": "Why does the source speaker prefer spring?",
          "options": [
            "because the speaker is sensitive to cold",
            "because the speaker prefers cold winter weather",
            "because the speaker goes skiing every spring"
          ],
          "answer": "because the speaker is sensitive to cold",
          "explanation": "我怕冷 gives the reason for preferring spring."
        },
        {
          "id": "u42-spring-l1",
          "type": "listen",
          "audioText": "我比較喜歡春天。",
          "prompt": "Which season is preferred?",
          "options": [
            "春天",
            "冬天",
            "秋天"
          ],
          "answer": "春天",
          "explanation": "The audio says 春天, “spring.”",
          "char": "春"
        },
        {
          "id": "u42-spring-o1",
          "type": "order",
          "phrase": "u42-spring-source",
          "tokens": [
            "我怕冷",
            "我比較喜歡春天"
          ]
        }
      ]
    },
    {
      "id": "u42-summer-autumn",
      "title": "Summer and Autumn",
      "subtitle": "Complete the four-season set.",
      "chars": [
        "夏",
        "秋"
      ],
      "minutes": "11–14 min",
      "unitId": "unit-42",
      "review": false,
      "steps": [
        {
          "id": "u42-summer-autumn-夏-intro",
          "type": "intro",
          "char": "夏"
        },
        {
          "id": "u42-summer-autumn-夏-trace",
          "type": "trace",
          "char": "夏"
        },
        {
          "id": "u42-summer-autumn-夏-build",
          "type": "build",
          "char": "夏"
        },
        {
          "id": "u42-summer-autumn-夏-complete",
          "type": "complete",
          "char": "夏"
        },
        {
          "id": "u42-summer-autumn-夏-memory",
          "type": "memory",
          "char": "夏"
        },
        {
          "id": "u42-summer-autumn-秋-intro",
          "type": "intro",
          "char": "秋"
        },
        {
          "id": "u42-summer-autumn-秋-trace",
          "type": "trace",
          "char": "秋"
        },
        {
          "id": "u42-summer-autumn-秋-build",
          "type": "build",
          "char": "秋"
        },
        {
          "id": "u42-summer-autumn-秋-complete",
          "type": "complete",
          "char": "秋"
        },
        {
          "id": "u42-summer-autumn-秋-memory",
          "type": "memory",
          "char": "秋"
        },
        {
          "id": "u42-summer-autumn-p1",
          "type": "phrase",
          "phrase": "u42-four-seasons"
        },
        {
          "id": "u42-summer-s1",
          "type": "select",
          "prompt": "夏天 means…",
          "options": [
            "summer",
            "autumn",
            "winter"
          ],
          "answer": "summer",
          "explanation": "夏天 is summer."
        },
        {
          "id": "u42-autumn-s1",
          "type": "select",
          "prompt": "秋天 means…",
          "options": [
            "autumn",
            "spring",
            "summer"
          ],
          "answer": "autumn",
          "explanation": "秋天 is autumn."
        },
        {
          "id": "u42-summer-autumn-p2",
          "type": "phrase",
          "phrase": "u42-season-most"
        },
        {
          "id": "u42-season-s1",
          "type": "select",
          "prompt": "Which season does the model like least?",
          "options": [
            "冬天",
            "秋天",
            "春天"
          ],
          "answer": "冬天",
          "explanation": "最不喜歡冬天 means “like winter the least.”"
        },
        {
          "id": "u42-season-l1",
          "type": "listen",
          "audioText": "春天、夏天、秋天、冬天。",
          "prompt": "Which season word do you hear?",
          "options": [
            "春天",
            "天氣",
            "水果"
          ],
          "answer": "春天",
          "explanation": "The audio includes 春天 in the four-season sequence.",
          "char": "春"
        },
        {
          "id": "u42-season-o1",
          "type": "order",
          "phrase": "u42-season-most",
          "tokens": [
            "我最喜歡秋天",
            "最不喜歡冬天"
          ]
        }
      ]
    },
    {
      "id": "u42-rain",
      "title": "Rain and Weather Questions",
      "subtitle": "Ask whether it snows and how often it rains.",
      "chars": [
        "雨"
      ],
      "minutes": "12–15 min",
      "unitId": "unit-42",
      "review": false,
      "steps": [
        {
          "id": "u42-rain-雨-intro",
          "type": "intro",
          "char": "雨"
        },
        {
          "id": "u42-rain-雨-trace",
          "type": "trace",
          "char": "雨"
        },
        {
          "id": "u42-rain-雨-build",
          "type": "build",
          "char": "雨"
        },
        {
          "id": "u42-rain-雨-complete",
          "type": "complete",
          "char": "雨"
        },
        {
          "id": "u42-rain-雨-memory",
          "type": "memory",
          "char": "雨"
        },
        {
          "id": "u42-rain-p1",
          "type": "phrase",
          "phrase": "u42-rain-basic"
        },
        {
          "id": "u42-rain-s1",
          "type": "select",
          "prompt": "雨 means…",
          "options": [
            "rain",
            "wind",
            "snow"
          ],
          "answer": "rain",
          "explanation": "雨 is rain."
        },
        {
          "id": "u42-rain-s2",
          "type": "select",
          "prompt": "下雨 means…",
          "options": [
            "to rain",
            "to snow",
            "to ski"
          ],
          "answer": "to rain",
          "explanation": "下雨 means to rain."
        },
        {
          "id": "u42-rain-p2",
          "type": "phrase",
          "phrase": "u42-q-snow"
        },
        {
          "id": "u42-rain-p3",
          "type": "phrase",
          "phrase": "u42-q-rain"
        },
        {
          "id": "u42-rain-s3",
          "type": "select",
          "prompt": "Which asks whether it snows in Taiwan?",
          "options": [
            "臺灣會不會下雪？",
            "臺灣常不常下雨？",
            "臺灣下雪的時候？"
          ],
          "answer": "臺灣會不會下雪？",
          "explanation": "會不會 asks whether the event occurs."
        },
        {
          "id": "u42-rain-s4",
          "type": "select",
          "prompt": "Which asks “Does it often rain here?”",
          "options": [
            "這裡常不常下雨？",
            "這裡會不會滑雪？",
            "這裡比昨天冷？"
          ],
          "answer": "這裡常不常下雨？",
          "explanation": "常不常 asks about frequency."
        },
        {
          "id": "u42-rain-l1",
          "type": "listen",
          "audioText": "夏天常下雨。",
          "prompt": "What weather event do you hear?",
          "options": [
            "下雨",
            "下雪",
            "滑雪"
          ],
          "answer": "下雨",
          "explanation": "The audio says it often rains in summer.",
          "char": "雨"
        },
        {
          "id": "u42-rain-o1",
          "type": "order",
          "phrase": "u42-q-rain",
          "tokens": [
            "這裡",
            "常不常下雨"
          ]
        }
      ]
    },
    {
      "id": "u42-seasons",
      "title": "My Seasons and Summer",
      "subtitle": "Use weather and seasons in source-style transfer.",
      "chars": [],
      "minutes": "12–15 min",
      "unitId": "unit-42",
      "review": false,
      "steps": [
        {
          "id": "u42-seasons-p1",
          "type": "phrase",
          "phrase": "u42-home-country-model"
        },
        {
          "id": "u42-seasons-home",
          "type": "select",
          "prompt": "What is the first part of the source Four Seasons task?",
          "options": [
            "describe the climate where you are from",
            "name only your favorite season",
            "describe only Taiwan's summer weather"
          ],
          "answer": "describe the climate where you are from",
          "explanation": "B1L14-A001 begins with the learner's home-country climate."
        },
        {
          "id": "u42-seasons-p2",
          "type": "phrase",
          "phrase": "u42-season-reason"
        },
        {
          "id": "u42-seasons-s1",
          "type": "select",
          "prompt": "Which answer gives both a season preference and a reason?",
          "options": [
            "因為我怕冷，所以我比較喜歡春天。",
            "春天、夏天、秋天、冬天。",
            "今天比昨天冷。"
          ],
          "answer": "因為我怕冷，所以我比較喜歡春天。",
          "explanation": "The sentence states a preference and explains why."
        },
        {
          "id": "u42-seasons-s2",
          "type": "select",
          "prompt": "For the source “Four Seasons” task, which pair must you identify?",
          "options": [
            "your most- and least-liked seasons",
            "only your favorite season",
            "the seasons with the most and least rain"
          ],
          "answer": "your most- and least-liked seasons",
          "explanation": "A001 explicitly asks for most/least preferred seasons plus reasons."
        },
        {
          "id": "u42-seasons-p3",
          "type": "phrase",
          "phrase": "u42-summer-model"
        },
        {
          "id": "u42-summer-s2",
          "type": "select",
          "prompt": "Which statement describes Taiwan summer weather?",
          "options": [
            "臺灣夏天天氣很熱。",
            "臺灣夏天天氣很冷。",
            "臺灣冬天天氣很熱。"
          ],
          "answer": "臺灣夏天天氣很熱。",
          "explanation": "This is a weather statement about summer."
        },
        {
          "id": "u42-seasons-p4",
          "type": "phrase",
          "phrase": "u42-summer-write"
        },
        {
          "id": "u42-summer-s3",
          "type": "select",
          "prompt": "What must the source “Summer in Taiwan” transfer include?",
          "options": [
            "summer weather plus distinctive features, common fruit/food, and common activities",
            "summer weather and one season name only",
            "common fruit/food only, without weather or activities"
          ],
          "answer": "summer weather plus distinctive features, common fruit/food, and common activities",
          "explanation": "These are the source A005 fields."
        },
        {
          "id": "u42-summer-s4",
          "type": "select",
          "prompt": "After discussing the summer findings, what does the source task ask you to do?",
          "options": [
            "write the findings in Chinese",
            "only discuss them orally",
            "write only the names of the four seasons"
          ],
          "answer": "write the findings in Chinese",
          "explanation": "A005 explicitly requires writing the findings in Chinese."
        },
        {
          "id": "u42-seasons-o1",
          "type": "order",
          "phrase": "u42-season-reason",
          "tokens": [
            "因為我怕冷",
            "所以我比較喜歡春天"
          ]
        }
      ]
    },
    {
      "id": "u42-review",
      "title": "Unit 42 Review",
      "subtitle": "Retrieve weather, seasons, handwriting, and weather questions.",
      "chars": [
        "冷",
        "滑",
        "雪",
        "春",
        "冬",
        "夏",
        "秋",
        "雨"
      ],
      "minutes": "20–24 min",
      "unitId": "unit-42",
      "review": true,
      "steps": [
        {
          "id": "u42-review-l1",
          "type": "listen",
          "audioText": "天氣很冷。",
          "prompt": "Listen for “weather.”",
          "options": [
            "天氣",
            "風景",
            "國家"
          ],
          "answer": "天氣",
          "explanation": "天氣 means weather.",
          "char": "冷"
        },
        {
          "id": "u42-review-l2",
          "type": "listen",
          "audioText": "下雪的時候，我常去山上滑雪。",
          "prompt": "Which activity do you hear?",
          "options": [
            "滑雪",
            "打網球",
            "上網"
          ],
          "answer": "滑雪",
          "explanation": "The speaker says 滑雪.",
          "char": "滑"
        },
        {
          "id": "u42-review-l3",
          "type": "listen",
          "audioText": "這裡常不常下雨？",
          "prompt": "Which question pattern do you hear?",
          "options": [
            "常不常",
            "會不會",
            "有沒有"
          ],
          "answer": "常不常",
          "explanation": "The audio uses 常不常 to ask about frequency.",
          "char": "雨"
        },
        {
          "id": "u42-review-cold",
          "type": "complete",
          "char": "冷"
        },
        {
          "id": "u42-review-hua",
          "type": "complete",
          "char": "滑"
        },
        {
          "id": "u42-review-xue",
          "type": "complete",
          "char": "雪"
        },
        {
          "id": "u42-review-chun",
          "type": "complete",
          "char": "春"
        },
        {
          "id": "u42-review-dong",
          "type": "complete",
          "char": "冬"
        },
        {
          "id": "u42-review-xia",
          "type": "complete",
          "char": "夏"
        },
        {
          "id": "u42-review-qiu",
          "type": "complete",
          "char": "秋"
        },
        {
          "id": "u42-review-yu",
          "type": "complete",
          "char": "雨"
        },
        {
          "id": "u42-review-v1",
          "type": "select",
          "prompt": "天氣 means…",
          "options": [
            "weather",
            "season",
            "news"
          ],
          "answer": "weather",
          "explanation": "天氣 means weather."
        },
        {
          "id": "u42-review-v2",
          "type": "select",
          "prompt": "冷 means…",
          "options": [
            "cold",
            "wet",
            "fast"
          ],
          "answer": "cold",
          "explanation": "冷 means cold."
        },
        {
          "id": "u42-review-v3",
          "type": "select",
          "prompt": "風 means…",
          "options": [
            "wind",
            "snow",
            "umbrella"
          ],
          "answer": "wind",
          "explanation": "風 means wind."
        },
        {
          "id": "u42-review-v4",
          "type": "select",
          "prompt": "滑雪 means…",
          "options": [
            "to ski",
            "to rain",
            "to stop"
          ],
          "answer": "to ski",
          "explanation": "滑雪 means to ski."
        },
        {
          "id": "u42-review-v5",
          "type": "select",
          "prompt": "下雪 means…",
          "options": [
            "to snow",
            "to ski",
            "to rain"
          ],
          "answer": "to snow",
          "explanation": "下雪 means to snow."
        },
        {
          "id": "u42-review-v6",
          "type": "select",
          "prompt": "春天 means…",
          "options": [
            "spring",
            "autumn",
            "winter"
          ],
          "answer": "spring",
          "explanation": "春天 means spring."
        },
        {
          "id": "u42-review-v7",
          "type": "select",
          "prompt": "冬天 means…",
          "options": [
            "winter",
            "summer",
            "spring"
          ],
          "answer": "winter",
          "explanation": "冬天 means winter."
        },
        {
          "id": "u42-review-v8",
          "type": "select",
          "prompt": "夏天 means…",
          "options": [
            "summer",
            "winter",
            "autumn"
          ],
          "answer": "summer",
          "explanation": "夏天 means summer."
        },
        {
          "id": "u42-review-v9",
          "type": "select",
          "prompt": "秋天 means…",
          "options": [
            "autumn",
            "spring",
            "summer"
          ],
          "answer": "autumn",
          "explanation": "秋天 means autumn."
        },
        {
          "id": "u42-review-v10",
          "type": "select",
          "prompt": "雨 means…",
          "options": [
            "rain",
            "wind",
            "snow"
          ],
          "answer": "rain",
          "explanation": "雨 means rain."
        },
        {
          "id": "u42-review-v11",
          "type": "select",
          "prompt": "下雨 means…",
          "options": [
            "to rain",
            "to snow",
            "to ski"
          ],
          "answer": "to rain",
          "explanation": "下雨 means to rain."
        },
        {
          "id": "u42-review-q1",
          "type": "select",
          "prompt": "Which asks whether it snows?",
          "options": [
            "會不會下雪？",
            "常不常下雨？",
            "下雪的時候？"
          ],
          "answer": "會不會下雪？",
          "explanation": "會不會 asks whether the event occurs."
        },
        {
          "id": "u42-review-q2",
          "type": "select",
          "prompt": "Which asks whether rain is frequent?",
          "options": [
            "常不常下雨？",
            "會不會下雪？",
            "下雨了嗎？"
          ],
          "answer": "常不常下雨？",
          "explanation": "常不常 asks about frequency."
        },
        {
          "id": "u42-review-t1",
          "type": "select",
          "prompt": "Which answer best completes the Four Seasons source task?",
          "options": [
            "state a most/least preferred season and give a reason",
            "state only one preferred season with no reason",
            "list all four seasons without a preference"
          ],
          "answer": "state a most/least preferred season and give a reason",
          "explanation": "B1L14-A001 requires preference plus reasons."
        }
      ]
    }
  ],
  "newVocabulary": [
    {
      "text": "天氣",
      "pinyin": "tiānqì",
      "meaning": "weather",
      "lessonId": "u42-weather",
      "core": true
    },
    {
      "text": "冷",
      "pinyin": "lěng",
      "meaning": "cold",
      "lessonId": "u42-weather",
      "core": true
    },
    {
      "text": "風",
      "pinyin": "fēng",
      "meaning": "wind",
      "lessonId": "u42-weather",
      "core": true
    },
    {
      "text": "滑雪",
      "pinyin": "huáxuě",
      "meaning": "to ski",
      "lessonId": "u42-snow",
      "core": true
    },
    {
      "text": "下雪",
      "pinyin": "xiàxuě",
      "meaning": "to snow",
      "lessonId": "u42-snow",
      "core": true
    },
    {
      "text": "春天",
      "pinyin": "chūntiān",
      "meaning": "spring",
      "lessonId": "u42-spring-winter",
      "core": true
    },
    {
      "text": "冬天",
      "pinyin": "dōngtiān",
      "meaning": "winter",
      "lessonId": "u42-spring-winter",
      "core": true
    },
    {
      "text": "夏天",
      "pinyin": "xiàtiān",
      "meaning": "summer",
      "lessonId": "u42-summer-autumn",
      "core": true
    },
    {
      "text": "秋天",
      "pinyin": "qiūntiān",
      "meaning": "autumn",
      "lessonId": "u42-summer-autumn",
      "core": true
    },
    {
      "text": "雨",
      "pinyin": "yǔ",
      "meaning": "rain",
      "lessonId": "u42-rain",
      "core": true
    },
    {
      "text": "下雨",
      "pinyin": "xiàyǔ",
      "meaning": "to rain",
      "lessonId": "u42-rain",
      "core": true
    }
  ],
  "reviewVocabulary": [
    "比較",
    "怕",
    "喜歡",
    "最",
    "會",
    "常",
    "因為",
    "所以",
    "特別",
    "臺灣",
    "舒服",
    "國家"
  ],
  "newCharacters": [
    "冷",
    "滑",
    "雪",
    "春",
    "冬",
    "夏",
    "秋",
    "雨"
  ],
  "reviewCharacters": [],
  "characters": {
    "冷": {
      "hanzi": "冷",
      "pinyin": "lěng",
      "zhuyin": "ㄌㄥˇ",
      "meaning": "cold",
      "strokes": 7,
      "note": "冷 is first taught in Unit 42 through 天氣很冷.",
      "memory": "Connect 冷 with 天氣很冷 (the weather is cold) while writing its 7 strokes in order.",
      "parts": [
        {
          "label": "冷",
          "name": "冷 whole form",
          "role": "Whole character",
          "description": "Write all 7 strokes of 冷 in standard order and connect the shape to 天氣很冷.",
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
        "text": "天氣很冷",
        "pinyin": "tiānqì hěn lěng",
        "meaning": "the weather is cold"
      }
    },
    "滑": {
      "hanzi": "滑",
      "pinyin": "huá",
      "zhuyin": "ㄏㄨㄚˊ",
      "meaning": "glide; ski component",
      "strokes": 12,
      "note": "滑 is first taught in Unit 42 through 滑雪.",
      "memory": "Connect 滑 with 滑雪 (to ski) while writing its 12 strokes in order.",
      "parts": [
        {
          "label": "滑",
          "name": "滑 whole form",
          "role": "Whole character",
          "description": "Write all 12 strokes of 滑 in standard order and connect the shape to 滑雪.",
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
        "text": "滑雪",
        "pinyin": "huáxuě",
        "meaning": "to ski"
      }
    },
    "雪": {
      "hanzi": "雪",
      "pinyin": "xuě",
      "zhuyin": "ㄒㄩㄝˇ",
      "meaning": "snow",
      "strokes": 11,
      "note": "雪 is first taught in Unit 42 through 下雪.",
      "memory": "Connect 雪 with 下雪 (to snow) while writing its 11 strokes in order.",
      "parts": [
        {
          "label": "雪",
          "name": "雪 whole form",
          "role": "Whole character",
          "description": "Write all 11 strokes of 雪 in standard order and connect the shape to 下雪.",
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
        "text": "下雪",
        "pinyin": "xiàxuě",
        "meaning": "to snow"
      }
    },
    "春": {
      "hanzi": "春",
      "pinyin": "chūn",
      "zhuyin": "ㄔㄨㄣ",
      "meaning": "spring",
      "strokes": 9,
      "note": "春 is first taught in Unit 42 through 春天.",
      "memory": "Connect 春 with 春天 (spring) while writing its 9 strokes in order.",
      "parts": [
        {
          "label": "春",
          "name": "春 whole form",
          "role": "Whole character",
          "description": "Write all 9 strokes of 春 in standard order and connect the shape to 春天.",
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
        "text": "春天",
        "pinyin": "chūntiān",
        "meaning": "spring"
      }
    },
    "冬": {
      "hanzi": "冬",
      "pinyin": "dōng",
      "zhuyin": "ㄉㄨㄥ",
      "meaning": "winter",
      "strokes": 5,
      "note": "冬 is first taught in Unit 42 through 冬天.",
      "memory": "Connect 冬 with 冬天 (winter) while writing its 5 strokes in order.",
      "parts": [
        {
          "label": "冬",
          "name": "冬 whole form",
          "role": "Whole character",
          "description": "Write all 5 strokes of 冬 in standard order and connect the shape to 冬天.",
          "strokes": [
            0,
            1,
            2,
            3,
            4
          ]
        }
      ],
      "layout": "whole",
      "example": {
        "text": "冬天",
        "pinyin": "dōngtiān",
        "meaning": "winter"
      }
    },
    "夏": {
      "hanzi": "夏",
      "pinyin": "xià",
      "zhuyin": "ㄒㄧㄚˋ",
      "meaning": "summer",
      "strokes": 10,
      "note": "夏 is first taught in Unit 42 through 夏天.",
      "memory": "Connect 夏 with 夏天 (summer) while writing its 10 strokes in order.",
      "parts": [
        {
          "label": "夏",
          "name": "夏 whole form",
          "role": "Whole character",
          "description": "Write all 10 strokes of 夏 in standard order and connect the shape to 夏天.",
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
        "text": "夏天",
        "pinyin": "xiàtiān",
        "meaning": "summer"
      }
    },
    "秋": {
      "hanzi": "秋",
      "pinyin": "qiū",
      "zhuyin": "ㄑㄧㄡ",
      "meaning": "autumn",
      "strokes": 9,
      "note": "秋 is first taught in Unit 42 through 秋天.",
      "memory": "Connect 秋 with 秋天 (autumn) while writing its 9 strokes in order.",
      "parts": [
        {
          "label": "秋",
          "name": "秋 whole form",
          "role": "Whole character",
          "description": "Write all 9 strokes of 秋 in standard order and connect the shape to 秋天.",
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
        "text": "秋天",
        "pinyin": "qiūtiān",
        "meaning": "autumn"
      }
    },
    "雨": {
      "hanzi": "雨",
      "pinyin": "yǔ",
      "zhuyin": "ㄩˇ",
      "meaning": "rain",
      "strokes": 8,
      "note": "雨 is first taught in Unit 42 through 下雨.",
      "memory": "Connect 雨 with 下雨 (to rain) while writing its 8 strokes in order.",
      "parts": [
        {
          "label": "雨",
          "name": "雨 whole form",
          "role": "Whole character",
          "description": "Write all 8 strokes of 雨 in standard order and connect the shape to 下雨.",
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
        "text": "下雨",
        "pinyin": "xiàyǔ",
        "meaning": "to rain"
      }
    }
  },
  "grammarRules": {},
  "grammarIntroductions": [],
  "reviewGrammar": [
    "u25-bi-comparison",
    "u24-bijiao",
    "u27-de-shihou",
    "u30-ba-guess",
    "u31-yinwei-suoyi"
  ],
  "phrases": {
    "u42-weather-cold": {
      "text": "天氣很冷。",
      "pinyin": "Tiānqì hěn lěng.",
      "meaning": "The weather is cold.",
      "note": "天氣 is weather; 冷 describes cold conditions.",
      "tokens": [
        "天氣",
        "很冷"
      ]
    },
    "u42-weather-source": {
      "text": "外面風那麼大，我覺得今天比昨天冷。",
      "pinyin": "Wàimiàn fēng nàme dà, wǒ juéde jīntiān bǐ zuótiān lěng.",
      "meaning": "The wind outside is so strong; I think today is colder than yesterday.",
      "note": "This preserves the safe first clause of B1L14-D1T01. 比 is prior review.",
      "tokens": [
        "外面風那麼大",
        "我覺得",
        "今天比昨天冷"
      ]
    },
    "u42-snow-mountain": {
      "text": "很高的山會下雪。",
      "pinyin": "Hěn gāo de shān huì xiàxuě.",
      "meaning": "It can snow on very high mountains.",
      "note": "Learner-safe preservation of the weather claim in B1L14-D1T02 without requiring 玉山 or 美國.",
      "tokens": [
        "很高的山",
        "會下雪"
      ]
    },
    "u42-snow-when": {
      "text": "下雪的時候，我常去山上滑雪。",
      "pinyin": "Xiàxuě de shíhou, wǒ cháng qù shānshàng huáxuě.",
      "meaning": "When it snows, I often go skiing in the mountains.",
      "note": "Source B1L14-D1T03; …的時候 is review.",
      "tokens": [
        "下雪的時候",
        "我常去山上滑雪"
      ]
    },
    "u42-snow-guess": {
      "text": "開始下雪了吧？",
      "pinyin": "Kāishǐ xiàxuě le ba?",
      "meaning": "It has probably started snowing, right?",
      "note": "Review the inferential/guessing 吧 already taught earlier; no new particle rule.",
      "tokens": [
        "開始下雪了吧"
      ]
    },
    "u42-spring-source": {
      "text": "我怕冷。我比較喜歡春天。",
      "pinyin": "Wǒ pà lěng. Wǒ bǐjiào xǐhuān chūntiān.",
      "meaning": "I'm sensitive to the cold. I prefer spring.",
      "note": "Source B1L14-D1T04.",
      "tokens": [
        "我怕冷",
        "我比較喜歡春天"
      ]
    },
    "u42-spring-comfort": {
      "text": "春天不錯，天氣很舒服。",
      "pinyin": "Chūntiān búcuò, tiānqì hěn shūfu.",
      "meaning": "Spring is nice; the weather is comfortable.",
      "note": "Exact B1L14-D1T05; all support is already known.",
      "tokens": [
        "春天不錯",
        "天氣很舒服"
      ]
    },
    "u42-winter-source": {
      "text": "冬天太冷了。",
      "pinyin": "Dōngtiān tài lěng le.",
      "meaning": "Winter is too cold.",
      "note": "Source-supported seasonal comment; 太…了 is review.",
      "tokens": [
        "冬天",
        "太冷了"
      ]
    },
    "u42-four-seasons": {
      "text": "春天、夏天、秋天、冬天。",
      "pinyin": "Chūntiān, xiàtiān, qiūtiān, dōngtiān.",
      "meaning": "spring, summer, autumn, winter",
      "note": "The complete four-season set.",
      "tokens": [
        "春天",
        "夏天",
        "秋天",
        "冬天"
      ]
    },
    "u42-season-most": {
      "text": "我最喜歡秋天，最不喜歡冬天。",
      "pinyin": "Wǒ zuì xǐhuān qiūtiān, zuì bù xǐhuān dōngtiān.",
      "meaning": "I like autumn the most and winter the least.",
      "note": "Uses prior 最 to support the source A001 most/least preference task.",
      "tokens": [
        "我最喜歡秋天",
        "最不喜歡冬天"
      ]
    },
    "u42-rain-basic": {
      "text": "夏天常下雨。",
      "pinyin": "Xiàtiān cháng xiàyǔ.",
      "meaning": "It often rains in summer.",
      "note": "Weather-frequency model using known 常.",
      "tokens": [
        "夏天",
        "常下雨"
      ]
    },
    "u42-q-snow": {
      "text": "臺灣會不會下雪？",
      "pinyin": "Táiwān huì bú huì xiàxuě?",
      "meaning": "Does it snow in Taiwan?",
      "note": "會不會 is the A-not-A form of 會. Here it asks whether the weather event occurs. This explanation must appear before assessment.",
      "tokens": [
        "臺灣",
        "會不會下雪"
      ]
    },
    "u42-q-rain": {
      "text": "這裡常不常下雨？",
      "pinyin": "Zhèlǐ cháng bù cháng xiàyǔ?",
      "meaning": "Does it often rain here?",
      "note": "常不常 is the A-not-A form of 常. This explanation must appear before assessment.",
      "tokens": [
        "這裡",
        "常不常下雨"
      ]
    },
    "u42-home-country-model": {
      "text": "我的國家夏天很熱，冬天很冷。",
      "pinyin": "Wǒ de guójiā xiàtiān hěn rè, dōngtiān hěn lěng.",
      "meaning": "In my country, summers are hot and winters are cold.",
      "note": "Model for the source A001 home-country climate description using already-known 國家.",
      "tokens": [
        "我的國家",
        "夏天很熱",
        "冬天很冷"
      ]
    },
    "u42-season-reason": {
      "text": "因為我怕冷，所以我比較喜歡春天。",
      "pinyin": "Yīnwèi wǒ pà lěng, suǒyǐ wǒ bǐjiào xǐhuān chūntiān.",
      "meaning": "Because I dislike the cold, I prefer spring.",
      "note": "Source A001 transfer using prior 因為…所以….",
      "tokens": [
        "因為我怕冷",
        "所以我比較喜歡春天"
      ]
    },
    "u42-summer-model": {
      "text": "臺灣夏天天氣很熱。",
      "pinyin": "Táiwān xiàtiān tiānqì hěn rè.",
      "meaning": "Taiwan's summer weather is hot.",
      "note": "Source A005 weather model.",
      "tokens": [
        "臺灣夏天",
        "天氣很熱"
      ]
    },
    "u42-summer-write": {
      "text": "夏天我常吃水果，也常出去玩。",
      "pinyin": "Xiàtiān wǒ cháng chī shuǐguǒ, yě cháng chūqù wán.",
      "meaning": "In summer I often eat fruit and also often go out.",
      "note": "Source-transfer instruction: discuss summer weather, one distinctive feature, common fruit/food, and a common activity; then write your findings in Chinese on paper. This card is a model, not the only acceptable content.",
      "tokens": [
        "夏天",
        "我常吃水果",
        "也常出去玩"
      ]
    }
  },
  "revisionStepIds": [
    "u42-weather-s4",
    "u42-snow-s3",
    "u42-seasons-s1",
    "u42-review-q1",
    "u42-review-q2"
  ]
};
export default unit;
