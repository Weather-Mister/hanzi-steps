// Curated reference vocabulary for character cards.
// These items are reference-only: they do not create curriculum ownership, unlock
// progress, enter practice/Mega, or become assessed material.
//
// Exact matches with course vocabulary intentionally reuse the course pinyin/meaning
// so a common future word (for example 太太 on 太) can be previewed without creating
// a second vocabulary record.
export type CharacterCommonWord={
 text:string;
 pinyin:string;
 meaning:string;
};

export const supplementaryCharacterCommonWords:Record<string,CharacterCommonWord[]> = {
  "太": [
    {
      "text": "太太",
      "pinyin": "tàitai",
      "meaning": "wife; Mrs."
    },
    {
      "text": "太陽",
      "pinyin": "tàiyáng",
      "meaning": "sun"
    },
    {
      "text": "太空",
      "pinyin": "tàikōng",
      "meaning": "outer space"
    },
    {
      "text": "不太",
      "pinyin": "bú tài",
      "meaning": "not very"
    },
    {
      "text": "太好了",
      "pinyin": "tài hǎo le",
      "meaning": "great!; wonderful!"
    }
  ],
  "好": [
    {
      "text": "好吃",
      "pinyin": "hǎochī",
      "meaning": "delicious; good to eat"
    },
    {
      "text": "好看",
      "pinyin": "hǎokàn",
      "meaning": "good-looking; nice to look at"
    },
    {
      "text": "好玩",
      "pinyin": "hǎowán",
      "meaning": "fun; enjoyable"
    },
    {
      "text": "好像",
      "pinyin": "hǎoxiàng",
      "meaning": "seem; appear to be"
    },
    {
      "text": "好久",
      "pinyin": "hǎojiǔ",
      "meaning": "a long time"
    },
    {
      "text": "好好",
      "pinyin": "hǎohǎo",
      "meaning": "properly; carefully; well"
    },
    {
      "text": "好處",
      "pinyin": "hǎochù",
      "meaning": "benefit; advantage"
    }
  ],
  "生": [
    {
      "text": "生活",
      "pinyin": "shēnghuó",
      "meaning": "life; to live"
    },
    {
      "text": "生日",
      "pinyin": "shēngrì",
      "meaning": "birthday"
    },
    {
      "text": "生氣",
      "pinyin": "shēngqì",
      "meaning": "angry; get angry"
    },
    {
      "text": "先生",
      "pinyin": "xiānshēng",
      "meaning": "Mr.; husband"
    },
    {
      "text": "生病",
      "pinyin": "shēngbìng",
      "meaning": "to fall ill / be sick"
    }
  ],
  "人": [
    {
      "text": "大人",
      "pinyin": "dàrén",
      "meaning": "adult"
    },
    {
      "text": "男人",
      "pinyin": "nánrén",
      "meaning": "man"
    },
    {
      "text": "女人",
      "pinyin": "nǚrén",
      "meaning": "woman"
    },
    {
      "text": "人口",
      "pinyin": "rénkǒu",
      "meaning": "population"
    },
    {
      "text": "人家",
      "pinyin": "rénjia",
      "meaning": "other people; someone else"
    }
  ],
  "學": [
    {
      "text": "學習",
      "pinyin": "xuéxí",
      "meaning": "study; learn"
    },
    {
      "text": "學校",
      "pinyin": "xuéxiào",
      "meaning": "school"
    },
    {
      "text": "大學",
      "pinyin": "dàxué",
      "meaning": "university"
    },
    {
      "text": "同學",
      "pinyin": "tóngxué",
      "meaning": "classmate"
    },
    {
      "text": "留學",
      "pinyin": "liúxué",
      "meaning": "study abroad"
    }
  ],
  "書": [
    {
      "text": "書店",
      "pinyin": "shūdiàn",
      "meaning": "bookstore"
    },
    {
      "text": "書包",
      "pinyin": "shūbāo",
      "meaning": "schoolbag"
    },
    {
      "text": "書桌",
      "pinyin": "shūzhuō",
      "meaning": "desk"
    },
    {
      "text": "圖書館",
      "pinyin": "túshūguǎn",
      "meaning": "library"
    },
    {
      "text": "教科書",
      "pinyin": "jiàokēshū",
      "meaning": "textbook"
    }
  ],
  "看": [
    {
      "text": "看電影",
      "pinyin": "kàn diànyǐng",
      "meaning": "watch movies"
    },
    {
      "text": "看見",
      "pinyin": "kànjiàn",
      "meaning": "see; catch sight of"
    },
    {
      "text": "看起來",
      "pinyin": "kànqǐlái",
      "meaning": "look; seem"
    },
    {
      "text": "看法",
      "pinyin": "kànfǎ",
      "meaning": "view; opinion"
    },
    {
      "text": "看病",
      "pinyin": "kànbìng",
      "meaning": "see a doctor"
    }
  ],
  "中": [
    {
      "text": "中文",
      "pinyin": "Zhōngwén",
      "meaning": "Chinese (Mandarin in these lessons)"
    },
    {
      "text": "中午",
      "pinyin": "zhōngwǔ",
      "meaning": "noon"
    },
    {
      "text": "中間",
      "pinyin": "zhōngjiān",
      "meaning": "middle; between"
    },
    {
      "text": "中心",
      "pinyin": "zhōngxīn",
      "meaning": "center"
    },
    {
      "text": "高中",
      "pinyin": "gāozhōng",
      "meaning": "senior high school"
    },
    {
      "text": "中國",
      "pinyin": "Zhōngguó",
      "meaning": "China"
    }
  ],
  "文": [
    {
      "text": "中文",
      "pinyin": "Zhōngwén",
      "meaning": "Chinese (Mandarin in these lessons)"
    },
    {
      "text": "英文",
      "pinyin": "Yīngwén",
      "meaning": "English"
    },
    {
      "text": "文化",
      "pinyin": "wénhuà",
      "meaning": "culture"
    },
    {
      "text": "文章",
      "pinyin": "wénzhāng",
      "meaning": "article; composition"
    },
    {
      "text": "日文",
      "pinyin": "Rìwén",
      "meaning": "Japanese (written/language)"
    },
    {
      "text": "作文",
      "pinyin": "zuòwén",
      "meaning": "composition; essay"
    }
  ],
  "英": [
    {
      "text": "英文",
      "pinyin": "Yīngwén",
      "meaning": "English"
    },
    {
      "text": "英國",
      "pinyin": "Yīngguó",
      "meaning": "United Kingdom; Britain"
    },
    {
      "text": "英語",
      "pinyin": "Yīngyǔ",
      "meaning": "English language"
    },
    {
      "text": "英國人",
      "pinyin": "Yīngguórén",
      "meaning": "British person"
    }
  ],
  "說": [
    {
      "text": "說話",
      "pinyin": "shuōhuà",
      "meaning": "speak; talk"
    },
    {
      "text": "聽說",
      "pinyin": "tīngshuō",
      "meaning": "to hear that; to have heard that"
    },
    {
      "text": "說明",
      "pinyin": "shuōmíng",
      "meaning": "explain; explanation"
    },
    {
      "text": "小說",
      "pinyin": "xiǎoshuō",
      "meaning": "novel; fiction"
    }
  ],
  "聽": [
    {
      "text": "聽說",
      "pinyin": "tīngshuō",
      "meaning": "to hear that; to have heard that"
    },
    {
      "text": "聽見",
      "pinyin": "tīngjiàn",
      "meaning": "hear"
    },
    {
      "text": "聽懂",
      "pinyin": "tīngdǒng",
      "meaning": "understand by listening"
    },
    {
      "text": "好聽",
      "pinyin": "hǎotīng",
      "meaning": "pleasant to hear; sounds good"
    }
  ],
  "想": [
    {
      "text": "想到",
      "pinyin": "xiǎngdào",
      "meaning": "think of; remember"
    },
    {
      "text": "想法",
      "pinyin": "xiǎngfǎ",
      "meaning": "idea; way of thinking"
    },
    {
      "text": "想念",
      "pinyin": "xiǎngniàn",
      "meaning": "miss; think of fondly"
    }
  ],
  "會": [
    {
      "text": "機會",
      "pinyin": "jīhuì",
      "meaning": "opportunity; chance"
    },
    {
      "text": "開會",
      "pinyin": "kāihuì",
      "meaning": "have or attend a meeting"
    },
    {
      "text": "社會",
      "pinyin": "shèhuì",
      "meaning": "society"
    },
    {
      "text": "會議",
      "pinyin": "huìyì",
      "meaning": "meeting; conference"
    }
  ],
  "茶": [
    {
      "text": "紅茶",
      "pinyin": "hóngchá",
      "meaning": "black tea"
    },
    {
      "text": "綠茶",
      "pinyin": "lǜchá",
      "meaning": "green tea"
    },
    {
      "text": "奶茶",
      "pinyin": "nǎichá",
      "meaning": "milk tea"
    },
    {
      "text": "茶葉",
      "pinyin": "cháyè",
      "meaning": "tea leaves"
    },
    {
      "text": "茶杯",
      "pinyin": "chábēi",
      "meaning": "teacup"
    }
  ],
  "請": [
    {
      "text": "請問",
      "pinyin": "qǐng wèn",
      "meaning": "excuse me; may I ask"
    },
    {
      "text": "請假",
      "pinyin": "qǐngjià",
      "meaning": "ask for leave; take time off"
    },
    {
      "text": "請客",
      "pinyin": "qǐngkè",
      "meaning": "treat someone; pay for a meal"
    },
    {
      "text": "邀請",
      "pinyin": "yāoqǐng",
      "meaning": "invite; invitation"
    }
  ],
  "家": [
    {
      "text": "家人",
      "pinyin": "jiārén",
      "meaning": "family members"
    },
    {
      "text": "大家",
      "pinyin": "dàjiā",
      "meaning": "everyone"
    },
    {
      "text": "國家",
      "pinyin": "guójiā",
      "meaning": "country"
    },
    {
      "text": "家庭",
      "pinyin": "jiātíng",
      "meaning": "family; household"
    },
    {
      "text": "搬家",
      "pinyin": "bānjiā",
      "meaning": "move house"
    },
    {
      "text": "回家",
      "pinyin": "huí jiā",
      "meaning": "go home"
    }
  ],
  "照": [
    {
      "text": "照片",
      "pinyin": "zhàopiàn",
      "meaning": "photo"
    },
    {
      "text": "照相",
      "pinyin": "zhàoxiàng",
      "meaning": "take photos"
    },
    {
      "text": "照顧",
      "pinyin": "zhàogù",
      "meaning": "take care of"
    },
    {
      "text": "按照",
      "pinyin": "ànzhào",
      "meaning": "according to; in accordance with"
    }
  ],
  "片": [
    {
      "text": "照片",
      "pinyin": "zhàopiàn",
      "meaning": "photo"
    },
    {
      "text": "影片",
      "pinyin": "yǐngpiàn",
      "meaning": "film; video"
    },
    {
      "text": "一片",
      "pinyin": "yí piàn",
      "meaning": "a slice; a piece"
    },
    {
      "text": "名片",
      "pinyin": "míngpiàn",
      "meaning": "business card"
    }
  ],
  "電": [
    {
      "text": "電影",
      "pinyin": "diànyǐng",
      "meaning": "movie; film"
    },
    {
      "text": "電話",
      "pinyin": "diànhuà",
      "meaning": "telephone"
    },
    {
      "text": "電視",
      "pinyin": "diànshì",
      "meaning": "television; TV"
    },
    {
      "text": "電腦",
      "pinyin": "diànnǎo",
      "meaning": "computer"
    },
    {
      "text": "電梯",
      "pinyin": "diàntī",
      "meaning": "elevator"
    },
    {
      "text": "停電",
      "pinyin": "tíngdiàn",
      "meaning": "power outage"
    }
  ],
  "影": [
    {
      "text": "電影",
      "pinyin": "diànyǐng",
      "meaning": "movie; film"
    },
    {
      "text": "影片",
      "pinyin": "yǐngpiàn",
      "meaning": "film; video"
    },
    {
      "text": "影響",
      "pinyin": "yǐngxiǎng",
      "meaning": "influence; affect"
    },
    {
      "text": "影子",
      "pinyin": "yǐngzi",
      "meaning": "shadow"
    }
  ],
  "做": [
    {
      "text": "做飯",
      "pinyin": "zuòfàn",
      "meaning": "to cook; prepare a meal"
    },
    {
      "text": "做事",
      "pinyin": "zuòshì",
      "meaning": "do things; work"
    },
    {
      "text": "做夢",
      "pinyin": "zuòmèng",
      "meaning": "dream"
    },
    {
      "text": "做菜",
      "pinyin": "zuòcài",
      "meaning": "cook dishes"
    }
  ],
  "天": [
    {
      "text": "今天",
      "pinyin": "jīntiān",
      "meaning": "today"
    },
    {
      "text": "明天",
      "pinyin": "míngtiān",
      "meaning": "tomorrow"
    },
    {
      "text": "天氣",
      "pinyin": "tiānqì",
      "meaning": "weather"
    },
    {
      "text": "天空",
      "pinyin": "tiānkōng",
      "meaning": "sky"
    },
    {
      "text": "天天",
      "pinyin": "tiāntiān",
      "meaning": "every day"
    },
    {
      "text": "白天",
      "pinyin": "báitiān",
      "meaning": "daytime"
    }
  ],
  "明": [
    {
      "text": "明天",
      "pinyin": "míngtiān",
      "meaning": "tomorrow"
    },
    {
      "text": "明年",
      "pinyin": "míngnián",
      "meaning": "next year"
    },
    {
      "text": "明白",
      "pinyin": "míngbái",
      "meaning": "understand; clear"
    },
    {
      "text": "明亮",
      "pinyin": "míngliàng",
      "meaning": "bright"
    }
  ],
  "打": [
    {
      "text": "打籃球",
      "pinyin": "dǎ lánqiú",
      "meaning": "play basketball"
    },
    {
      "text": "打網球",
      "pinyin": "dǎ wǎngqiú",
      "meaning": "play tennis"
    },
    {
      "text": "打電話",
      "pinyin": "dǎ diànhuà",
      "meaning": "make a phone call"
    },
    {
      "text": "打開",
      "pinyin": "dǎkāi",
      "meaning": "open; switch on"
    },
    {
      "text": "打工",
      "pinyin": "dǎgōng",
      "meaning": "work part-time"
    },
    {
      "text": "打掃",
      "pinyin": "dǎsǎo",
      "meaning": "clean; sweep"
    },
    {
      "text": "打字",
      "pinyin": "dǎzì",
      "meaning": "type"
    }
  ],
  "球": [
    {
      "text": "籃球",
      "pinyin": "lánqiú",
      "meaning": "basketball"
    },
    {
      "text": "足球",
      "pinyin": "zúqiú",
      "meaning": "soccer; football"
    },
    {
      "text": "網球",
      "pinyin": "wǎngqiú",
      "meaning": "tennis"
    },
    {
      "text": "球場",
      "pinyin": "qiúchǎng",
      "meaning": "sports court; field"
    },
    {
      "text": "球隊",
      "pinyin": "qiúduì",
      "meaning": "sports team"
    },
    {
      "text": "球員",
      "pinyin": "qiúyuán",
      "meaning": "ball-sport player"
    }
  ],
  "網": [
    {
      "text": "網球",
      "pinyin": "wǎngqiú",
      "meaning": "tennis"
    },
    {
      "text": "上網",
      "pinyin": "shàngwǎng",
      "meaning": "to go online; use the internet"
    },
    {
      "text": "網路",
      "pinyin": "wǎnglù",
      "meaning": "internet; network"
    },
    {
      "text": "網站",
      "pinyin": "wǎngzhàn",
      "meaning": "website"
    },
    {
      "text": "網友",
      "pinyin": "wǎngyǒu",
      "meaning": "online friend"
    }
  ],
  "早": [
    {
      "text": "早上",
      "pinyin": "zǎoshàng",
      "meaning": "morning; in the morning"
    },
    {
      "text": "早安",
      "pinyin": "zǎo'ān",
      "meaning": "good morning"
    },
    {
      "text": "早餐",
      "pinyin": "zǎocān",
      "meaning": "breakfast"
    },
    {
      "text": "早點",
      "pinyin": "zǎodiǎn",
      "meaning": "earlier; a little earlier"
    },
    {
      "text": "早起",
      "pinyin": "zǎoqǐ",
      "meaning": "get up early"
    }
  ],
  "晚": [
    {
      "text": "晚上",
      "pinyin": "wǎnshàng",
      "meaning": "evening; at night"
    },
    {
      "text": "晚飯",
      "pinyin": "wǎnfàn",
      "meaning": "dinner; evening meal"
    },
    {
      "text": "晚安",
      "pinyin": "wǎn'ān",
      "meaning": "good night"
    },
    {
      "text": "晚餐",
      "pinyin": "wǎncān",
      "meaning": "dinner"
    },
    {
      "text": "晚點",
      "pinyin": "wǎndiǎn",
      "meaning": "later; a little later"
    }
  ],
  "吃": [
    {
      "text": "吃飯",
      "pinyin": "chīfàn",
      "meaning": "have a meal; eat"
    },
    {
      "text": "好吃",
      "pinyin": "hǎochī",
      "meaning": "delicious; good to eat"
    },
    {
      "text": "吃飽",
      "pinyin": "chībǎo",
      "meaning": "eat until full"
    },
    {
      "text": "吃藥",
      "pinyin": "chīyào",
      "meaning": "take medicine"
    },
    {
      "text": "吃完",
      "pinyin": "chīwán",
      "meaning": "finish eating"
    }
  ],
  "飯": [
    {
      "text": "晚飯",
      "pinyin": "wǎnfàn",
      "meaning": "dinner; evening meal"
    },
    {
      "text": "吃飯",
      "pinyin": "chīfàn",
      "meaning": "have a meal; eat"
    },
    {
      "text": "白飯",
      "pinyin": "báifàn",
      "meaning": "cooked white rice"
    },
    {
      "text": "飯店",
      "pinyin": "fàndiàn",
      "meaning": "hotel"
    },
    {
      "text": "飯糰",
      "pinyin": "fàntuán",
      "meaning": "rice ball"
    },
    {
      "text": "飯盒",
      "pinyin": "fànhé",
      "meaning": "lunch box; meal box"
    }
  ],
  "菜": [
    {
      "text": "青菜",
      "pinyin": "qīngcài",
      "meaning": "green vegetables"
    },
    {
      "text": "菜單",
      "pinyin": "càidān",
      "meaning": "menu"
    },
    {
      "text": "白菜",
      "pinyin": "báicài",
      "meaning": "Chinese cabbage"
    },
    {
      "text": "買菜",
      "pinyin": "mǎicài",
      "meaning": "buy groceries; shop for food"
    }
  ],
  "熱": [
    {
      "text": "熱水",
      "pinyin": "rèshuǐ",
      "meaning": "hot water"
    },
    {
      "text": "熱門",
      "pinyin": "rèmén",
      "meaning": "popular; in demand"
    },
    {
      "text": "熱茶",
      "pinyin": "rèchá",
      "meaning": "hot tea"
    }
  ],
  "買": [
    {
      "text": "買東西",
      "pinyin": "mǎi dōngxi",
      "meaning": "go shopping; buy things"
    },
    {
      "text": "買票",
      "pinyin": "mǎipiào",
      "meaning": "buy a ticket"
    },
    {
      "text": "買菜",
      "pinyin": "mǎicài",
      "meaning": "buy groceries"
    }
  ],
  "外": [
    {
      "text": "外帶",
      "pinyin": "wàidài",
      "meaning": "to go; takeout"
    },
    {
      "text": "外面",
      "pinyin": "wàimiàn",
      "meaning": "outside; exterior"
    },
    {
      "text": "外國",
      "pinyin": "wàiguó",
      "meaning": "foreign country"
    },
    {
      "text": "國外",
      "pinyin": "guówài",
      "meaning": "abroad; overseas"
    },
    {
      "text": "外國人",
      "pinyin": "wàiguórén",
      "meaning": "foreigner"
    }
  ],
  "內": [
    {
      "text": "內用",
      "pinyin": "nèiyòng",
      "meaning": "for here; dine in"
    },
    {
      "text": "內容",
      "pinyin": "nèiróng",
      "meaning": "content"
    },
    {
      "text": "國內",
      "pinyin": "guónèi",
      "meaning": "domestic; within the country"
    },
    {
      "text": "室內",
      "pinyin": "shìnèi",
      "meaning": "indoors; interior"
    }
  ],
  "用": [
    {
      "text": "內用",
      "pinyin": "nèiyòng",
      "meaning": "for here; dine in"
    },
    {
      "text": "使用",
      "pinyin": "shǐyòng",
      "meaning": "use"
    },
    {
      "text": "有用",
      "pinyin": "yǒuyòng",
      "meaning": "useful"
    },
    {
      "text": "不用",
      "pinyin": "búyòng",
      "meaning": "do not need to; no need"
    }
  ],
  "錢": [
    {
      "text": "零錢",
      "pinyin": "língqián",
      "meaning": "small change"
    },
    {
      "text": "花錢",
      "pinyin": "huāqián",
      "meaning": "spend money"
    },
    {
      "text": "存錢",
      "pinyin": "cúnqián",
      "meaning": "save money"
    },
    {
      "text": "付錢",
      "pinyin": "fùqián",
      "meaning": "pay money"
    }
  ],
  "問": [
    {
      "text": "請問",
      "pinyin": "qǐng wèn",
      "meaning": "excuse me; may I ask"
    },
    {
      "text": "問題",
      "pinyin": "wèntí",
      "meaning": "problem; question"
    },
    {
      "text": "問路",
      "pinyin": "wènlù",
      "meaning": "ask for directions"
    },
    {
      "text": "問好",
      "pinyin": "wènhǎo",
      "meaning": "send greetings; say hello"
    }
  ],
  "包": [
    {
      "text": "包子",
      "pinyin": "bāozi",
      "meaning": "filled steamed bun"
    },
    {
      "text": "小籠包",
      "pinyin": "xiǎolóngbāo",
      "meaning": "xiaolongbao; small steamed dumplings"
    },
    {
      "text": "包包",
      "pinyin": "bāobāo",
      "meaning": "bag; handbag"
    },
    {
      "text": "麵包",
      "pinyin": "miànbāo",
      "meaning": "bread"
    },
    {
      "text": "包裹",
      "pinyin": "bāoguǒ",
      "meaning": "parcel; package"
    },
    {
      "text": "包含",
      "pinyin": "bāohán",
      "meaning": "include; contain"
    }
  ],
  "子": [
    {
      "text": "包子",
      "pinyin": "bāozi",
      "meaning": "filled steamed bun"
    },
    {
      "text": "房子",
      "pinyin": "fángzi",
      "meaning": "house; home"
    },
    {
      "text": "孩子",
      "pinyin": "háizi",
      "meaning": "child"
    },
    {
      "text": "桌子",
      "pinyin": "zhuōzi",
      "meaning": "table"
    },
    {
      "text": "椅子",
      "pinyin": "yǐzi",
      "meaning": "chair"
    },
    {
      "text": "兒子",
      "pinyin": "érzi",
      "meaning": "son"
    }
  ],
  "手": [
    {
      "text": "手機",
      "pinyin": "shǒujī",
      "meaning": "mobile phone"
    },
    {
      "text": "洗手",
      "pinyin": "xǐshǒu",
      "meaning": "wash one's hands"
    },
    {
      "text": "手錶",
      "pinyin": "shǒubiǎo",
      "meaning": "wristwatch"
    },
    {
      "text": "手上",
      "pinyin": "shǒushàng",
      "meaning": "in one's hand; on hand"
    },
    {
      "text": "手工",
      "pinyin": "shǒugōng",
      "meaning": "handmade; handicraft"
    }
  ],
  "機": [
    {
      "text": "手機",
      "pinyin": "shǒujī",
      "meaning": "mobile phone"
    },
    {
      "text": "機會",
      "pinyin": "jīhuì",
      "meaning": "opportunity; chance"
    },
    {
      "text": "飛機",
      "pinyin": "fēijī",
      "meaning": "airplane"
    },
    {
      "text": "洗衣機",
      "pinyin": "xǐyījī",
      "meaning": "washing machine"
    },
    {
      "text": "機場",
      "pinyin": "jīchǎng",
      "meaning": "airport"
    },
    {
      "text": "相機",
      "pinyin": "xiàngjī",
      "meaning": "camera"
    }
  ],
  "新": [
    {
      "text": "新年",
      "pinyin": "xīnnián",
      "meaning": "New Year"
    },
    {
      "text": "新聞",
      "pinyin": "xīnwén",
      "meaning": "news"
    },
    {
      "text": "新手",
      "pinyin": "xīnshǒu",
      "meaning": "beginner; novice"
    },
    {
      "text": "重新",
      "pinyin": "chóngxīn",
      "meaning": "again; anew"
    }
  ],
  "舊": [
    {
      "text": "舊書",
      "pinyin": "jiùshū",
      "meaning": "old or used book"
    },
    {
      "text": "舊衣服",
      "pinyin": "jiù yīfu",
      "meaning": "old clothes"
    },
    {
      "text": "懷舊",
      "pinyin": "huáijiù",
      "meaning": "nostalgic; nostalgia"
    }
  ],
  "名": [
    {
      "text": "有名",
      "pinyin": "yǒumíng",
      "meaning": "famous; well-known"
    },
    {
      "text": "名字",
      "pinyin": "míngzi",
      "meaning": "name"
    },
    {
      "text": "名片",
      "pinyin": "míngpiàn",
      "meaning": "business card"
    },
    {
      "text": "名單",
      "pinyin": "míngdān",
      "meaning": "list of names"
    }
  ],
  "店": [
    {
      "text": "商店",
      "pinyin": "shāngdiàn",
      "meaning": "shop; store"
    },
    {
      "text": "書店",
      "pinyin": "shūdiàn",
      "meaning": "bookstore"
    },
    {
      "text": "飯店",
      "pinyin": "fàndiàn",
      "meaning": "hotel"
    },
    {
      "text": "便利商店",
      "pinyin": "biànlì shāngdiàn",
      "meaning": "convenience store"
    }
  ],
  "點": [
    {
      "text": "甜點",
      "pinyin": "tiándiǎn",
      "meaning": "dessert; sweet dish"
    },
    {
      "text": "一點",
      "pinyin": "yìdiǎn",
      "meaning": "a little; some amount"
    },
    {
      "text": "地點",
      "pinyin": "dìdiǎn",
      "meaning": "location; place"
    },
    {
      "text": "點心",
      "pinyin": "diǎnxīn",
      "meaning": "snack; dim sum"
    },
    {
      "text": "重點",
      "pinyin": "zhòngdiǎn",
      "meaning": "main point; key point"
    },
    {
      "text": "缺點",
      "pinyin": "quēdiǎn",
      "meaning": "shortcoming; drawback"
    }
  ],
  "校": [
    {
      "text": "學校",
      "pinyin": "xuéxiào",
      "meaning": "school"
    },
    {
      "text": "校園",
      "pinyin": "xiàoyuán",
      "meaning": "campus"
    },
    {
      "text": "校長",
      "pinyin": "xiàozhǎng",
      "meaning": "principal; school president"
    },
    {
      "text": "校門",
      "pinyin": "xiàomén",
      "meaning": "school gate"
    }
  ],
  "地": [
    {
      "text": "地方",
      "pinyin": "dìfāng",
      "meaning": "place"
    },
    {
      "text": "地圖",
      "pinyin": "dìtú",
      "meaning": "map"
    },
    {
      "text": "地上",
      "pinyin": "dìshàng",
      "meaning": "on the ground"
    },
    {
      "text": "地下",
      "pinyin": "dìxià",
      "meaning": "underground; basement"
    },
    {
      "text": "地點",
      "pinyin": "dìdiǎn",
      "meaning": "location"
    }
  ],
  "方": [
    {
      "text": "地方",
      "pinyin": "dìfāng",
      "meaning": "place"
    },
    {
      "text": "方便",
      "pinyin": "fāngbiàn",
      "meaning": "convenient"
    },
    {
      "text": "方法",
      "pinyin": "fāngfǎ",
      "meaning": "method; way"
    },
    {
      "text": "方向",
      "pinyin": "fāngxiàng",
      "meaning": "direction"
    },
    {
      "text": "對方",
      "pinyin": "duìfāng",
      "meaning": "the other party; the other person"
    }
  ],
  "圖": [
    {
      "text": "圖書館",
      "pinyin": "túshūguǎn",
      "meaning": "library"
    },
    {
      "text": "地圖",
      "pinyin": "dìtú",
      "meaning": "map"
    },
    {
      "text": "圖片",
      "pinyin": "túpiàn",
      "meaning": "picture; image"
    },
    {
      "text": "圖畫",
      "pinyin": "túhuà",
      "meaning": "drawing; picture"
    }
  ],
  "館": [
    {
      "text": "圖書館",
      "pinyin": "túshūguǎn",
      "meaning": "library"
    },
    {
      "text": "餐館",
      "pinyin": "cānguǎn",
      "meaning": "restaurant"
    },
    {
      "text": "旅館",
      "pinyin": "lǚguǎn",
      "meaning": "hotel; inn"
    },
    {
      "text": "博物館",
      "pinyin": "bówùguǎn",
      "meaning": "museum"
    }
  ],
  "課": [
    {
      "text": "上課",
      "pinyin": "shàngkè",
      "meaning": "to attend class; to have class"
    },
    {
      "text": "下課",
      "pinyin": "xiàkè",
      "meaning": "to finish class; class ends"
    },
    {
      "text": "課本",
      "pinyin": "kèběn",
      "meaning": "textbook"
    },
    {
      "text": "課程",
      "pinyin": "kèchéng",
      "meaning": "course; curriculum"
    }
  ],
  "到": [
    {
      "text": "看到",
      "pinyin": "kàndào",
      "meaning": "see; catch sight of"
    },
    {
      "text": "找到",
      "pinyin": "zhǎodào",
      "meaning": "find"
    },
    {
      "text": "聽到",
      "pinyin": "tīngdào",
      "meaning": "hear"
    },
    {
      "text": "收到",
      "pinyin": "shōudào",
      "meaning": "to receive"
    }
  ],
  "友": [
    {
      "text": "朋友",
      "pinyin": "péngyǒu",
      "meaning": "friend"
    },
    {
      "text": "好友",
      "pinyin": "hǎoyǒu",
      "meaning": "good friend"
    },
    {
      "text": "友好",
      "pinyin": "yǒuhǎo",
      "meaning": "friendly"
    },
    {
      "text": "網友",
      "pinyin": "wǎngyǒu",
      "meaning": "online friend"
    }
  ],
  "樓": [
    {
      "text": "大樓",
      "pinyin": "dàlóu",
      "meaning": "multi-storey building"
    },
    {
      "text": "樓上",
      "pinyin": "lóushàng",
      "meaning": "upstairs"
    },
    {
      "text": "樓下",
      "pinyin": "lóuxià",
      "meaning": "downstairs"
    },
    {
      "text": "一樓",
      "pinyin": "yì lóu",
      "meaning": "first floor"
    }
  ],
  "下": [
    {
      "text": "樓下",
      "pinyin": "lóuxià",
      "meaning": "downstairs"
    },
    {
      "text": "下次",
      "pinyin": "xià cì",
      "meaning": "next time"
    },
    {
      "text": "下課",
      "pinyin": "xiàkè",
      "meaning": "to finish class; class ends"
    },
    {
      "text": "下面",
      "pinyin": "xiàmiàn",
      "meaning": "below; underneath"
    },
    {
      "text": "下班",
      "pinyin": "xiàbān",
      "meaning": "get off work"
    },
    {
      "text": "下車",
      "pinyin": "xiàchē",
      "meaning": "get off a vehicle"
    }
  ],
  "前": [
    {
      "text": "前面",
      "pinyin": "qiánmiàn",
      "meaning": "in front; the front"
    },
    {
      "text": "以前",
      "pinyin": "yǐqián",
      "meaning": "before; in the past"
    },
    {
      "text": "前天",
      "pinyin": "qiántiān",
      "meaning": "the day before yesterday"
    },
    {
      "text": "前年",
      "pinyin": "qiánnián",
      "meaning": "the year before last"
    },
    {
      "text": "前後",
      "pinyin": "qiánhòu",
      "meaning": "before and after; around"
    }
  ],
  "後": [
    {
      "text": "後面",
      "pinyin": "hòumiàn",
      "meaning": "behind; the back"
    },
    {
      "text": "後天",
      "pinyin": "hòutiān",
      "meaning": "the day after tomorrow"
    },
    {
      "text": "以後",
      "pinyin": "yǐhòu",
      "meaning": "in the future"
    },
    {
      "text": "後來",
      "pinyin": "hòulái",
      "meaning": "later; afterwards"
    },
    {
      "text": "前後",
      "pinyin": "qiánhòu",
      "meaning": "before and after; around"
    },
    {
      "text": "後年",
      "pinyin": "hòunián",
      "meaning": "the year after next"
    }
  ],
  "室": [
    {
      "text": "教室",
      "pinyin": "jiàoshì",
      "meaning": "classroom"
    },
    {
      "text": "室內",
      "pinyin": "shìnèi",
      "meaning": "indoors; interior"
    },
    {
      "text": "辦公室",
      "pinyin": "bàngōngshì",
      "meaning": "office"
    }
  ],
  "時": [
    {
      "text": "時候",
      "pinyin": "shíhou",
      "meaning": "time; when (in 什麼時候)"
    },
    {
      "text": "時間",
      "pinyin": "shíjiān",
      "meaning": "time"
    },
    {
      "text": "小時",
      "pinyin": "xiǎoshí",
      "meaning": "hour"
    },
    {
      "text": "有時候",
      "pinyin": "yǒu shíhou",
      "meaning": "sometimes"
    },
    {
      "text": "同時",
      "pinyin": "tóngshí",
      "meaning": "at the same time"
    }
  ],
  "空": [
    {
      "text": "有空",
      "pinyin": "yǒu kòng",
      "meaning": "to be free; have available time"
    },
    {
      "text": "天空",
      "pinyin": "tiānkōng",
      "meaning": "sky"
    },
    {
      "text": "空氣",
      "pinyin": "kōngqì",
      "meaning": "air"
    },
    {
      "text": "空間",
      "pinyin": "kōngjiān",
      "meaning": "space; room"
    },
    {
      "text": "太空",
      "pinyin": "tàikōng",
      "meaning": "outer space"
    }
  ],
  "題": [
    {
      "text": "問題",
      "pinyin": "wèntí",
      "meaning": "problem; question"
    },
    {
      "text": "題目",
      "pinyin": "tímù",
      "meaning": "question; topic; title"
    },
    {
      "text": "主題",
      "pinyin": "zhǔtí",
      "meaning": "theme; topic"
    }
  ],
  "開": [
    {
      "text": "開始",
      "pinyin": "kāishǐ",
      "meaning": "to begin; start"
    },
    {
      "text": "開門",
      "pinyin": "kāimén",
      "meaning": "open the door"
    },
    {
      "text": "開車",
      "pinyin": "kāichē",
      "meaning": "drive"
    },
    {
      "text": "開會",
      "pinyin": "kāihuì",
      "meaning": "have or attend a meeting"
    },
    {
      "text": "開心",
      "pinyin": "kāixīn",
      "meaning": "happy; cheerful"
    },
    {
      "text": "打開",
      "pinyin": "dǎkāi",
      "meaning": "open; switch on"
    }
  ],
  "字": [
    {
      "text": "名字",
      "pinyin": "míngzi",
      "meaning": "name"
    },
    {
      "text": "打字",
      "pinyin": "dǎzì",
      "meaning": "type"
    },
    {
      "text": "漢字",
      "pinyin": "Hànzì",
      "meaning": "Chinese character"
    },
    {
      "text": "字典",
      "pinyin": "zìdiǎn",
      "meaning": "dictionary"
    },
    {
      "text": "寫字",
      "pinyin": "xiě zì",
      "meaning": "to write characters"
    }
  ],
  "事": [
    {
      "text": "事情",
      "pinyin": "shìqing",
      "meaning": "matter; thing"
    },
    {
      "text": "故事",
      "pinyin": "gùshi",
      "meaning": "story"
    },
    {
      "text": "沒事",
      "pinyin": "méishì",
      "meaning": "it's fine; nothing is wrong"
    },
    {
      "text": "有事",
      "pinyin": "yǒu shì",
      "meaning": "to have something to do; be occupied"
    }
  ],
  "意": [
    {
      "text": "意思",
      "pinyin": "yìsi",
      "meaning": "meaning"
    },
    {
      "text": "同意",
      "pinyin": "tóngyì",
      "meaning": "agree; consent"
    },
    {
      "text": "注意",
      "pinyin": "zhùyì",
      "meaning": "pay attention"
    },
    {
      "text": "意見",
      "pinyin": "yìjiàn",
      "meaning": "opinion"
    }
  ],
  "坐": [
    {
      "text": "坐車",
      "pinyin": "zuòchē",
      "meaning": "ride in a vehicle"
    },
    {
      "text": "坐下",
      "pinyin": "zuòxià",
      "meaning": "sit down"
    },
    {
      "text": "坐好",
      "pinyin": "zuòhǎo",
      "meaning": "sit properly; be seated"
    }
  ],
  "車": [
    {
      "text": "火車",
      "pinyin": "huǒchē",
      "meaning": "train"
    },
    {
      "text": "公車",
      "pinyin": "gōngchē",
      "meaning": "bus"
    },
    {
      "text": "計程車",
      "pinyin": "jìchéngchē",
      "meaning": "taxi"
    },
    {
      "text": "汽車",
      "pinyin": "qìchē",
      "meaning": "car"
    },
    {
      "text": "車站",
      "pinyin": "chēzhàn",
      "meaning": "station"
    },
    {
      "text": "開車",
      "pinyin": "kāichē",
      "meaning": "drive"
    },
    {
      "text": "停車",
      "pinyin": "tíngchē",
      "meaning": "park a vehicle"
    },
    {
      "text": "腳踏車",
      "pinyin": "jiǎotàchē",
      "meaning": "bicycle"
    }
  ],
  "快": [
    {
      "text": "快點",
      "pinyin": "kuàidiǎn",
      "meaning": "hurry up; a bit faster"
    },
    {
      "text": "快樂",
      "pinyin": "kuàilè",
      "meaning": "happy"
    },
    {
      "text": "趕快",
      "pinyin": "gǎnkuài",
      "meaning": "hurry; quickly"
    }
  ],
  "高": [
    {
      "text": "高中",
      "pinyin": "gāozhōng",
      "meaning": "senior high school"
    },
    {
      "text": "高興",
      "pinyin": "gāoxìng",
      "meaning": "happy; glad"
    },
    {
      "text": "高鐵",
      "pinyin": "gāotiě",
      "meaning": "High Speed Rail (HSR)"
    },
    {
      "text": "高度",
      "pinyin": "gāodù",
      "meaning": "height; degree"
    }
  ],
  "同": [
    {
      "text": "同學",
      "pinyin": "tóngxué",
      "meaning": "classmate"
    },
    {
      "text": "同時",
      "pinyin": "tóngshí",
      "meaning": "at the same time"
    },
    {
      "text": "同意",
      "pinyin": "tóngyì",
      "meaning": "agree"
    },
    {
      "text": "相同",
      "pinyin": "xiāngtóng",
      "meaning": "same; identical"
    }
  ],
  "公": [
    {
      "text": "公司",
      "pinyin": "gōngsī",
      "meaning": "company"
    },
    {
      "text": "公車",
      "pinyin": "gōngchē",
      "meaning": "bus"
    },
    {
      "text": "公園",
      "pinyin": "gōngyuán",
      "meaning": "park"
    },
    {
      "text": "公共",
      "pinyin": "gōnggòng",
      "meaning": "public; shared"
    }
  ],
  "國": [
    {
      "text": "國家",
      "pinyin": "guójiā",
      "meaning": "country"
    },
    {
      "text": "外國",
      "pinyin": "wàiguó",
      "meaning": "foreign country"
    },
    {
      "text": "國外",
      "pinyin": "guówài",
      "meaning": "abroad"
    },
    {
      "text": "美國",
      "pinyin": "Měiguó",
      "meaning": "United States"
    }
  ],
  "年": [
    {
      "text": "今年",
      "pinyin": "jīnnián",
      "meaning": "this year"
    },
    {
      "text": "明年",
      "pinyin": "míngnián",
      "meaning": "next year"
    },
    {
      "text": "去年",
      "pinyin": "qùnián",
      "meaning": "last year"
    },
    {
      "text": "新年",
      "pinyin": "xīnnián",
      "meaning": "New Year"
    }
  ],
  "日": [
    {
      "text": "生日",
      "pinyin": "shēngrì",
      "meaning": "birthday"
    },
    {
      "text": "日文",
      "pinyin": "Rìwén",
      "meaning": "Japanese (language)"
    },
    {
      "text": "日子",
      "pinyin": "rìzi",
      "meaning": "day; days; life"
    },
    {
      "text": "平日",
      "pinyin": "píngrì",
      "meaning": "weekday; ordinary day"
    }
  ],
  "月": [
    {
      "text": "月份",
      "pinyin": "yuèfèn",
      "meaning": "month"
    },
    {
      "text": "月底",
      "pinyin": "yuèdǐ",
      "meaning": "end of the month"
    },
    {
      "text": "月亮",
      "pinyin": "yuèliang",
      "meaning": "moon"
    },
    {
      "text": "上個月",
      "pinyin": "shàng ge yuè",
      "meaning": "last month"
    }
  ],
  "水": [
    {
      "text": "水果",
      "pinyin": "shuǐguǒ",
      "meaning": "fruit"
    },
    {
      "text": "水杯",
      "pinyin": "shuǐbēi",
      "meaning": "drinking cup"
    },
    {
      "text": "熱水",
      "pinyin": "rèshuǐ",
      "meaning": "hot water"
    },
    {
      "text": "冰水",
      "pinyin": "bīngshuǐ",
      "meaning": "ice water"
    },
    {
      "text": "開水",
      "pinyin": "kāishuǐ",
      "meaning": "boiled water"
    }
  ],
  "心": [
    {
      "text": "小心",
      "pinyin": "xiǎoxīn",
      "meaning": "be careful; take care"
    },
    {
      "text": "開心",
      "pinyin": "kāixīn",
      "meaning": "happy; cheerful"
    },
    {
      "text": "擔心",
      "pinyin": "dānxīn",
      "meaning": "worry"
    },
    {
      "text": "心情",
      "pinyin": "xīnqíng",
      "meaning": "mood"
    },
    {
      "text": "中心",
      "pinyin": "zhōngxīn",
      "meaning": "center"
    }
  ],
  "衣": [
    {
      "text": "衣服",
      "pinyin": "yīfú",
      "meaning": "clothes; clothing"
    },
    {
      "text": "上衣",
      "pinyin": "shàngyī",
      "meaning": "top; upper garment"
    },
    {
      "text": "雨衣",
      "pinyin": "yǔyī",
      "meaning": "raincoat"
    },
    {
      "text": "洗衣機",
      "pinyin": "xǐyījī",
      "meaning": "washing machine"
    }
  ],
  "房": [
    {
      "text": "房子",
      "pinyin": "fángzi",
      "meaning": "house; home"
    },
    {
      "text": "房間",
      "pinyin": "fángjiān",
      "meaning": "room"
    },
    {
      "text": "房租",
      "pinyin": "fángzū",
      "meaning": "rent (payment for a room or house)"
    },
    {
      "text": "房東",
      "pinyin": "fángdōng",
      "meaning": "landlord"
    },
    {
      "text": "租房子",
      "pinyin": "zū fángzi",
      "meaning": "rent a home; rent a room"
    }
  ],
  "客": [
    {
      "text": "客廳",
      "pinyin": "kètīng",
      "meaning": "living room"
    },
    {
      "text": "客人",
      "pinyin": "kèrén",
      "meaning": "guest; customer"
    },
    {
      "text": "客氣",
      "pinyin": "kèqi",
      "meaning": "polite; courteous"
    },
    {
      "text": "旅客",
      "pinyin": "lǚkè",
      "meaning": "traveler; passenger"
    }
  ],
  "路": [
    {
      "text": "路上",
      "pinyin": "lùshàng",
      "meaning": "on the way; on the road"
    },
    {
      "text": "馬路",
      "pinyin": "mǎlù",
      "meaning": "road; street"
    },
    {
      "text": "路口",
      "pinyin": "lùkǒu",
      "meaning": "intersection"
    },
    {
      "text": "路線",
      "pinyin": "lùxiàn",
      "meaning": "route"
    },
    {
      "text": "走路",
      "pinyin": "zǒulù",
      "meaning": "to walk"
    }
  ],
  "話": [
    {
      "text": "電話",
      "pinyin": "diànhuà",
      "meaning": "telephone"
    },
    {
      "text": "說話",
      "pinyin": "shuōhuà",
      "meaning": "speak; talk"
    },
    {
      "text": "笑話",
      "pinyin": "xiàohuà",
      "meaning": "joke"
    },
    {
      "text": "童話",
      "pinyin": "tónghuà",
      "meaning": "fairy tale"
    }
  ],
  "工": [
    {
      "text": "工作",
      "pinyin": "gōngzuò",
      "meaning": "to work; job, work"
    },
    {
      "text": "工人",
      "pinyin": "gōngrén",
      "meaning": "worker"
    },
    {
      "text": "工程",
      "pinyin": "gōngchéng",
      "meaning": "engineering; project"
    },
    {
      "text": "打工",
      "pinyin": "dǎgōng",
      "meaning": "work part-time"
    },
    {
      "text": "人工",
      "pinyin": "réngōng",
      "meaning": "manual; artificial"
    }
  ],
  "作": [
    {
      "text": "工作",
      "pinyin": "gōngzuò",
      "meaning": "to work; job, work"
    },
    {
      "text": "作業",
      "pinyin": "zuòyè",
      "meaning": "homework; assignment"
    },
    {
      "text": "作家",
      "pinyin": "zuòjiā",
      "meaning": "writer; author"
    },
    {
      "text": "作品",
      "pinyin": "zuòpǐn",
      "meaning": "work; piece of work"
    }
  ],
  "師": [
    {
      "text": "老師",
      "pinyin": "lǎoshī",
      "meaning": "teacher"
    },
    {
      "text": "工程師",
      "pinyin": "gōngchéngshī",
      "meaning": "engineer"
    },
    {
      "text": "醫師",
      "pinyin": "yīshī",
      "meaning": "physician; doctor"
    },
    {
      "text": "律師",
      "pinyin": "lǜshī",
      "meaning": "lawyer"
    }
  ],
  "氣": [
    {
      "text": "天氣",
      "pinyin": "tiānqì",
      "meaning": "weather"
    },
    {
      "text": "生氣",
      "pinyin": "shēngqì",
      "meaning": "angry; get angry"
    },
    {
      "text": "客氣",
      "pinyin": "kèqi",
      "meaning": "polite; courteous"
    },
    {
      "text": "空氣",
      "pinyin": "kōngqì",
      "meaning": "air"
    },
    {
      "text": "冷氣",
      "pinyin": "lěngqì",
      "meaning": "air conditioning"
    }
  ],
  "門": [
    {
      "text": "開門",
      "pinyin": "kāimén",
      "meaning": "open the door"
    },
    {
      "text": "關門",
      "pinyin": "guānmén",
      "meaning": "close the door"
    },
    {
      "text": "門口",
      "pinyin": "ménkǒu",
      "meaning": "entrance; doorway; gate"
    },
    {
      "text": "大門",
      "pinyin": "dàmén",
      "meaning": "main entrance"
    },
    {
      "text": "出門",
      "pinyin": "chūmén",
      "meaning": "go out; leave home"
    }
  ],
  "醫": [
    {
      "text": "醫生",
      "pinyin": "yīshēng",
      "meaning": "doctor"
    },
    {
      "text": "醫院",
      "pinyin": "yīyuàn",
      "meaning": "hospital"
    },
    {
      "text": "醫師",
      "pinyin": "yīshī",
      "meaning": "physician; doctor"
    },
    {
      "text": "醫學",
      "pinyin": "yīxué",
      "meaning": "medicine; medical science"
    }
  ],
  "病": [
    {
      "text": "生病",
      "pinyin": "shēngbìng",
      "meaning": "to fall ill / be sick"
    },
    {
      "text": "看病",
      "pinyin": "kànbìng",
      "meaning": "see a doctor"
    },
    {
      "text": "病人",
      "pinyin": "bìngrén",
      "meaning": "patient"
    }
  ],
  "藥": [
    {
      "text": "藥局",
      "pinyin": "yàojú",
      "meaning": "pharmacy"
    },
    {
      "text": "吃藥",
      "pinyin": "chīyào",
      "meaning": "take medicine"
    },
    {
      "text": "藥水",
      "pinyin": "yàoshuǐ",
      "meaning": "liquid medicine"
    },
    {
      "text": "藥袋",
      "pinyin": "yàodài",
      "meaning": "medicine bag; prescription bag"
    }
  ],
  "休": [
    {
      "text": "休息",
      "pinyin": "xiūxí",
      "meaning": "to rest"
    },
    {
      "text": "休假",
      "pinyin": "xiūjià",
      "meaning": "take leave; have time off"
    },
    {
      "text": "午休",
      "pinyin": "wǔxiū",
      "meaning": "lunch break; midday rest"
    },
    {
      "text": "退休",
      "pinyin": "tuìxiū",
      "meaning": "retire"
    }
  ],
  "睡": [
    {
      "text": "睡覺",
      "pinyin": "shuìjiào",
      "meaning": "to sleep"
    },
    {
      "text": "睡著",
      "pinyin": "shuìzháo",
      "meaning": "fall asleep; be asleep"
    },
    {
      "text": "睡眠",
      "pinyin": "shuìmián",
      "meaning": "sleep"
    },
    {
      "text": "午睡",
      "pinyin": "wǔshuì",
      "meaning": "take a nap"
    }
  ],
  "臉": [
    {
      "text": "洗臉",
      "pinyin": "xǐliǎn",
      "meaning": "wash one's face"
    },
    {
      "text": "臉色",
      "pinyin": "liǎnsè",
      "meaning": "facial complexion / color"
    },
    {
      "text": "笑臉",
      "pinyin": "xiàoliǎn",
      "meaning": "smiling face"
    }
  ],
  "頭": [
    {
      "text": "頭髮",
      "pinyin": "tóufǎ",
      "meaning": "hair"
    },
    {
      "text": "頭痛",
      "pinyin": "tóutòng",
      "meaning": "headache"
    },
    {
      "text": "點頭",
      "pinyin": "diǎntóu",
      "meaning": "nod"
    },
    {
      "text": "回頭",
      "pinyin": "huítóu",
      "meaning": "turn around; look back"
    },
    {
      "text": "開頭",
      "pinyin": "kāitóu",
      "meaning": "beginning; start"
    }
  ],
  "腳": [
    {
      "text": "腳踏車",
      "pinyin": "jiǎotàchē",
      "meaning": "bicycle"
    },
    {
      "text": "腳痛",
      "pinyin": "jiǎotòng",
      "meaning": "foot or leg pain"
    },
    {
      "text": "腳步",
      "pinyin": "jiǎobù",
      "meaning": "footstep; pace"
    }
  ],
  "雨": [
    {
      "text": "下雨",
      "pinyin": "xiàyǔ",
      "meaning": "to rain"
    },
    {
      "text": "雨衣",
      "pinyin": "yǔyī",
      "meaning": "raincoat"
    },
    {
      "text": "雨傘",
      "pinyin": "yǔsǎn",
      "meaning": "umbrella"
    },
    {
      "text": "大雨",
      "pinyin": "dàyǔ",
      "meaning": "heavy rain"
    }
  ],
  "風": [
    {
      "text": "風景",
      "pinyin": "fēngjǐng",
      "meaning": "scenery; landscape"
    },
    {
      "text": "颱風",
      "pinyin": "táifēng",
      "meaning": "typhoon"
    },
    {
      "text": "吹風",
      "pinyin": "chuīfēng",
      "meaning": "be exposed to the wind; blow air"
    },
    {
      "text": "大風",
      "pinyin": "dàfēng",
      "meaning": "strong wind"
    }
  ],
  "冷": [
    {
      "text": "冷氣",
      "pinyin": "lěngqì",
      "meaning": "air conditioning"
    },
    {
      "text": "冷水",
      "pinyin": "lěngshuǐ",
      "meaning": "cold water"
    },
    {
      "text": "冰冷",
      "pinyin": "bīnglěng",
      "meaning": "ice-cold"
    }
  ],
  "發": [
    {
      "text": "發燒",
      "pinyin": "fāshāo",
      "meaning": "to have a fever"
    },
    {
      "text": "發現",
      "pinyin": "fāxiàn",
      "meaning": "discover; notice"
    },
    {
      "text": "發生",
      "pinyin": "fāshēng",
      "meaning": "happen; occur"
    },
    {
      "text": "出發",
      "pinyin": "chūfā",
      "meaning": "set out; depart"
    },
    {
      "text": "發音",
      "pinyin": "fāyīn",
      "meaning": "pronounce; pronunciation"
    }
  ],
  "感": [
    {
      "text": "感冒",
      "pinyin": "gǎnmào",
      "meaning": "to have a cold"
    },
    {
      "text": "感覺",
      "pinyin": "gǎnjué",
      "meaning": "feel; feeling"
    },
    {
      "text": "感謝",
      "pinyin": "gǎnxiè",
      "meaning": "thank; appreciate"
    },
    {
      "text": "感情",
      "pinyin": "gǎnqíng",
      "meaning": "feelings; relationship"
    }
  ],
  "保": [
    {
      "text": "保險",
      "pinyin": "bǎoxiǎn",
      "meaning": "insurance"
    },
    {
      "text": "保護",
      "pinyin": "bǎohù",
      "meaning": "protect"
    },
    {
      "text": "保持",
      "pinyin": "bǎochí",
      "meaning": "maintain; keep"
    },
    {
      "text": "保證",
      "pinyin": "bǎozhèng",
      "meaning": "guarantee; promise"
    }
  ],
  "也": [
    {
      "text": "也許",
      "pinyin": "yěxǔ",
      "meaning": "perhaps; maybe"
    },
    {
      "text": "也好",
      "pinyin": "yěhǎo",
      "meaning": "that is fine too; either is fine"
    }
  ],
  "兩": [
    {
      "text": "兩邊",
      "pinyin": "liǎngbiān",
      "meaning": "both sides"
    },
    {
      "text": "兩次",
      "pinyin": "liǎng cì",
      "meaning": "twice"
    },
    {
      "text": "兩個",
      "pinyin": "liǎng ge",
      "meaning": "two people or things"
    }
  ],
  "誰": [
    {
      "text": "誰的",
      "pinyin": "shéi de",
      "meaning": "whose"
    },
    {
      "text": "誰知道",
      "pinyin": "shéi zhīdào",
      "meaning": "who knows"
    }
  ],
  "杯": [
    {
      "text": "杯子",
      "pinyin": "bēizi",
      "meaning": "cup; glass"
    },
    {
      "text": "一杯",
      "pinyin": "yì bēi",
      "meaning": "one cup"
    }
  ],
  "賣": [
    {
      "text": "買賣",
      "pinyin": "mǎimài",
      "meaning": "buying and selling; trade"
    },
    {
      "text": "賣場",
      "pinyin": "màichǎng",
      "meaning": "retail store; sales floor"
    }
  ],
  "能": [
    {
      "text": "可能",
      "pinyin": "kěnéng",
      "meaning": "possible; maybe"
    },
    {
      "text": "能力",
      "pinyin": "nénglì",
      "meaning": "ability; capability"
    },
    {
      "text": "功能",
      "pinyin": "gōngnéng",
      "meaning": "function; feature"
    }
  ],
  "湯": [
    {
      "text": "湯匙",
      "pinyin": "tāngchí",
      "meaning": "spoon"
    },
    {
      "text": "湯麵",
      "pinyin": "tāngmiàn",
      "meaning": "noodles in soup"
    }
  ],
  "碗": [
    {
      "text": "飯碗",
      "pinyin": "fànwǎn",
      "meaning": "rice bowl"
    },
    {
      "text": "一碗",
      "pinyin": "yì wǎn",
      "meaning": "one bowl"
    }
  ],
  "辣": [
    {
      "text": "辣椒",
      "pinyin": "làjiāo",
      "meaning": "chili pepper"
    },
    {
      "text": "麻辣",
      "pinyin": "málà",
      "meaning": "numbing and spicy"
    }
  ],
  "海": [
    {
      "text": "海邊",
      "pinyin": "hǎibiān",
      "meaning": "seaside; coast"
    },
    {
      "text": "海水",
      "pinyin": "hǎishuǐ",
      "meaning": "seawater"
    },
    {
      "text": "海外",
      "pinyin": "hǎiwài",
      "meaning": "overseas"
    }
  ],
  "遠": [
    {
      "text": "永遠",
      "pinyin": "yǒngyuǎn",
      "meaning": "forever; always"
    },
    {
      "text": "遠方",
      "pinyin": "yuǎnfāng",
      "meaning": "a faraway place; the distance"
    }
  ],
  "半": [
    {
      "text": "一半",
      "pinyin": "yíbàn",
      "meaning": "half"
    },
    {
      "text": "半年",
      "pinyin": "bànnián",
      "meaning": "half a year"
    },
    {
      "text": "半天",
      "pinyin": "bàntiān",
      "meaning": "half a day"
    }
  ],
  "騎": [
    {
      "text": "騎車",
      "pinyin": "qí chē",
      "meaning": "ride a bike or scooter"
    },
    {
      "text": "騎腳踏車",
      "pinyin": "qí jiǎotàchē",
      "meaning": "ride a bicycle"
    }
  ],
  "逛": [
    {
      "text": "逛街",
      "pinyin": "guàngjiē",
      "meaning": "go shopping; stroll around shops"
    },
    {
      "text": "逛夜市",
      "pinyin": "guàng yèshì",
      "meaning": "visit a night market"
    }
  ],
  "拍": [
    {
      "text": "拍照",
      "pinyin": "pāizhào",
      "meaning": "take a photo"
    },
    {
      "text": "拍手",
      "pinyin": "pāishǒu",
      "meaning": "clap one's hands"
    }
  ],
  "笑": [
    {
      "text": "微笑",
      "pinyin": "wēixiào",
      "meaning": "smile"
    },
    {
      "text": "笑話",
      "pinyin": "xiàohuà",
      "meaning": "joke"
    },
    {
      "text": "大笑",
      "pinyin": "dàxiào",
      "meaning": "laugh loudly"
    }
  ],
  "男": [
    {
      "text": "男生",
      "pinyin": "nánshēng",
      "meaning": "male student; young man"
    },
    {
      "text": "男朋友",
      "pinyin": "nánpéngyǒu",
      "meaning": "boyfriend"
    },
    {
      "text": "男人",
      "pinyin": "nánrén",
      "meaning": "man"
    }
  ],
  "矮": [
    {
      "text": "矮小",
      "pinyin": "ǎixiǎo",
      "meaning": "short; small in stature"
    }
  ],
  "再": [
    {
      "text": "再見",
      "pinyin": "zàijiàn",
      "meaning": "goodbye"
    },
    {
      "text": "再次",
      "pinyin": "zàicì",
      "meaning": "again; once more"
    },
    {
      "text": "再說",
      "pinyin": "zàishuō",
      "meaning": "talk about it later; besides"
    }
  ],
  "付": [
    {
      "text": "付錢",
      "pinyin": "fùqián",
      "meaning": "pay money"
    },
    {
      "text": "支付",
      "pinyin": "zhīfù",
      "meaning": "pay; payment"
    },
    {
      "text": "付費",
      "pinyin": "fùfèi",
      "meaning": "pay a fee; paid"
    }
  ],
  "先": [
    {
      "text": "先生",
      "pinyin": "xiānsheng",
      "meaning": "Mr.; husband"
    },
    {
      "text": "首先",
      "pinyin": "shǒuxiān",
      "meaning": "first of all"
    },
    {
      "text": "先後",
      "pinyin": "xiānhòu",
      "meaning": "one after another; before and after"
    }
  ],
  "花": [
    {
      "text": "花錢",
      "pinyin": "huāqián",
      "meaning": "spend money"
    },
    {
      "text": "花園",
      "pinyin": "huāyuán",
      "meaning": "garden"
    },
    {
      "text": "花店",
      "pinyin": "huādiàn",
      "meaning": "flower shop"
    },
    {
      "text": "花時間",
      "pinyin": "huā shíjiān",
      "meaning": "spend time"
    }
  ],
  "替": [
    {
      "text": "代替",
      "pinyin": "dàitì",
      "meaning": "replace; take the place of"
    },
    {
      "text": "替你",
      "pinyin": "tì nǐ",
      "meaning": "for you; in your place"
    }
  ],
  "試": [
    {
      "text": "考試",
      "pinyin": "kǎoshì",
      "meaning": "exam; test"
    },
    {
      "text": "試試",
      "pinyin": "shìshi",
      "meaning": "give it a try"
    },
    {
      "text": "試用",
      "pinyin": "shìyòng",
      "meaning": "try out; use on a trial basis"
    }
  ],
  "忘": [
    {
      "text": "忘記",
      "pinyin": "wàngjì",
      "meaning": "forget"
    },
    {
      "text": "難忘",
      "pinyin": "nánwàng",
      "meaning": "unforgettable"
    }
  ],
  "訂": [
    {
      "text": "訂房",
      "pinyin": "dìngfáng",
      "meaning": "book a room"
    },
    {
      "text": "訂票",
      "pinyin": "dìngpiào",
      "meaning": "book a ticket"
    },
    {
      "text": "訂位",
      "pinyin": "dìngwèi",
      "meaning": "reserve a seat or table"
    }
  ],
  "祝": [
    {
      "text": "祝福",
      "pinyin": "zhùfú",
      "meaning": "wish well; blessing"
    },
    {
      "text": "祝你生日快樂",
      "pinyin": "zhù nǐ shēngrì kuàilè",
      "meaning": "happy birthday to you"
    }
  ],
  "只": [
    {
      "text": "只好",
      "pinyin": "zhǐhǎo",
      "meaning": "have no choice but to"
    },
    {
      "text": "只是",
      "pinyin": "zhǐshì",
      "meaning": "only; just; however"
    }
  ],
  "停": [
    {
      "text": "停車",
      "pinyin": "tíngchē",
      "meaning": "park a vehicle"
    },
    {
      "text": "停止",
      "pinyin": "tíngzhǐ",
      "meaning": "stop; cease"
    },
    {
      "text": "停電",
      "pinyin": "tíngdiàn",
      "meaning": "power outage"
    }
  ],
  "傘": [
    {
      "text": "雨傘",
      "pinyin": "yǔsǎn",
      "meaning": "umbrella"
    },
    {
      "text": "撐傘",
      "pinyin": "chēngsǎn",
      "meaning": "hold or use an umbrella"
    }
  ],
  "濕": [
    {
      "text": "濕氣",
      "pinyin": "shīqì",
      "meaning": "humidity; dampness"
    },
    {
      "text": "弄濕",
      "pinyin": "nòngshī",
      "meaning": "get or make wet"
    }
  ],
  "痛": [
    {
      "text": "頭痛",
      "pinyin": "tóutòng",
      "meaning": "headache"
    },
    {
      "text": "肚子痛",
      "pinyin": "dùzi tòng",
      "meaning": "stomachache"
    },
    {
      "text": "痛苦",
      "pinyin": "tòngkǔ",
      "meaning": "painful; suffering"
    }
  ],
  "拿": [
    {
      "text": "拿到",
      "pinyin": "nádào",
      "meaning": "get; obtain"
    },
    {
      "text": "拿走",
      "pinyin": "názǒu",
      "meaning": "take away"
    },
    {
      "text": "拿來",
      "pinyin": "nálái",
      "meaning": "bring here"
    }
  ],
  "陪": [
    {
      "text": "陪同",
      "pinyin": "péitóng",
      "meaning": "accompany"
    },
    {
      "text": "陪你",
      "pinyin": "péi nǐ",
      "meaning": "accompany you"
    },
    {
      "text": "陪伴",
      "pinyin": "péibàn",
      "meaning": "accompany; keep someone company"
    }
  ],
  "不": [
    {
      "text": "不要",
      "pinyin": "bú yào",
      "meaning": "do not want; do not"
    },
    {
      "text": "不知道",
      "pinyin": "bù zhīdào",
      "meaning": "not know"
    },
    {
      "text": "不行",
      "pinyin": "bùxíng",
      "meaning": "won't work; not feasible"
    },
    {
      "text": "不錯",
      "pinyin": "búcuò",
      "meaning": "not bad; pretty good"
    },
    {
      "text": "不用",
      "pinyin": "búyòng",
      "meaning": "do not need to; no need"
    }
  ],
  "上": [
    {
      "text": "上班",
      "pinyin": "shàngbān",
      "meaning": "to go to work"
    },
    {
      "text": "上課",
      "pinyin": "shàngkè",
      "meaning": "to attend class; to have class"
    },
    {
      "text": "上車",
      "pinyin": "shàngchē",
      "meaning": "get on a vehicle"
    },
    {
      "text": "上樓",
      "pinyin": "shànglóu",
      "meaning": "go upstairs"
    },
    {
      "text": "上面",
      "pinyin": "shàngmiàn",
      "meaning": "above; on top"
    },
    {
      "text": "上個月",
      "pinyin": "shàng ge yuè",
      "meaning": "last month"
    }
  ],
  "一": [
    {
      "text": "一起",
      "pinyin": "yìqǐ",
      "meaning": "together"
    },
    {
      "text": "一樣",
      "pinyin": "yíyàng",
      "meaning": "same; alike"
    },
    {
      "text": "一定",
      "pinyin": "yídìng",
      "meaning": "definitely; really must, in 一定要"
    },
    {
      "text": "一點",
      "pinyin": "yìdiǎn",
      "meaning": "a little; some amount"
    },
    {
      "text": "一下",
      "pinyin": "yíxià",
      "meaning": "a moment; a little"
    },
    {
      "text": "一般",
      "pinyin": "yìbān",
      "meaning": "ordinary; generally"
    }
  ],
  "有": [
    {
      "text": "有空",
      "pinyin": "yǒu kòng",
      "meaning": "to be free; have available time"
    },
    {
      "text": "有事",
      "pinyin": "yǒu shì",
      "meaning": "to have something to do; be occupied"
    },
    {
      "text": "有名",
      "pinyin": "yǒumíng",
      "meaning": "famous; well-known"
    },
    {
      "text": "有用",
      "pinyin": "yǒuyòng",
      "meaning": "useful"
    },
    {
      "text": "有時候",
      "pinyin": "yǒu shíhou",
      "meaning": "sometimes"
    },
    {
      "text": "有錢",
      "pinyin": "yǒuqián",
      "meaning": "have money; wealthy"
    }
  ],
  "是": [
    {
      "text": "可是",
      "pinyin": "kěshì",
      "meaning": "but; however"
    },
    {
      "text": "但是",
      "pinyin": "dànshì",
      "meaning": "but; however"
    },
    {
      "text": "還是",
      "pinyin": "háishì",
      "meaning": "or (in a choice question)"
    },
    {
      "text": "就是",
      "pinyin": "jiùshì",
      "meaning": "exactly; just; that is"
    },
    {
      "text": "是不是",
      "pinyin": "shì bú shì",
      "meaning": "is it or not; whether"
    }
  ],
  "大": [
    {
      "text": "大家",
      "pinyin": "dàjiā",
      "meaning": "everyone"
    },
    {
      "text": "大學",
      "pinyin": "dàxué",
      "meaning": "university"
    },
    {
      "text": "大樓",
      "pinyin": "dàlóu",
      "meaning": "multi-storey building"
    },
    {
      "text": "大概",
      "pinyin": "dàgài",
      "meaning": "approximately; probably"
    },
    {
      "text": "大人",
      "pinyin": "dàrén",
      "meaning": "adult"
    },
    {
      "text": "大小",
      "pinyin": "dàxiǎo",
      "meaning": "size"
    }
  ],
  "可": [
    {
      "text": "可以",
      "pinyin": "kěyǐ",
      "meaning": "can (possibility)"
    },
    {
      "text": "可是",
      "pinyin": "kěshì",
      "meaning": "but; however"
    },
    {
      "text": "可能",
      "pinyin": "kěnéng",
      "meaning": "possible; maybe"
    },
    {
      "text": "可愛",
      "pinyin": "kě'ài",
      "meaning": "cute; lovable"
    },
    {
      "text": "可怕",
      "pinyin": "kěpà",
      "meaning": "scary"
    }
  ],
  "面": [
    {
      "text": "裡面",
      "pinyin": "lǐmiàn",
      "meaning": "inside; interior"
    },
    {
      "text": "外面",
      "pinyin": "wàimiàn",
      "meaning": "outside; exterior"
    },
    {
      "text": "前面",
      "pinyin": "qiánmiàn",
      "meaning": "in front; the front"
    },
    {
      "text": "後面",
      "pinyin": "hòumiàn",
      "meaning": "behind; the back"
    },
    {
      "text": "見面",
      "pinyin": "jiànmiàn",
      "meaning": "to meet"
    },
    {
      "text": "對面",
      "pinyin": "duìmiàn",
      "meaning": "opposite; across from"
    }
  ],
  "邊": [
    {
      "text": "旁邊",
      "pinyin": "pángbiān",
      "meaning": "beside; next to"
    },
    {
      "text": "左邊",
      "pinyin": "zuǒbiān",
      "meaning": "left side"
    },
    {
      "text": "右邊",
      "pinyin": "yòubiān",
      "meaning": "right side"
    },
    {
      "text": "那邊",
      "pinyin": "nàbiān",
      "meaning": "over there"
    },
    {
      "text": "海邊",
      "pinyin": "hǎibiān",
      "meaning": "seaside; coast"
    }
  ],
  "這": [
    {
      "text": "這裡",
      "pinyin": "zhèlǐ",
      "meaning": "here"
    },
    {
      "text": "這些",
      "pinyin": "zhèxiē",
      "meaning": "these; these ones"
    },
    {
      "text": "這樣",
      "pinyin": "zhèyàng",
      "meaning": "this kind (of); like this"
    },
    {
      "text": "這次",
      "pinyin": "zhè cì",
      "meaning": "this time"
    },
    {
      "text": "這邊",
      "pinyin": "zhèbiān",
      "meaning": "this side; over here"
    }
  ],
  "裡": [
    {
      "text": "這裡",
      "pinyin": "zhèlǐ",
      "meaning": "here"
    },
    {
      "text": "那裡",
      "pinyin": "nàlǐ",
      "meaning": "there"
    },
    {
      "text": "哪裡",
      "pinyin": "nǎlǐ",
      "meaning": "where"
    },
    {
      "text": "裡面",
      "pinyin": "lǐmiàn",
      "meaning": "inside; interior"
    },
    {
      "text": "家裡",
      "pinyin": "jiālǐ",
      "meaning": "at home; in the home"
    }
  ],
  "小": [
    {
      "text": "小吃",
      "pinyin": "xiǎochī",
      "meaning": "snacks; small local dishes"
    },
    {
      "text": "小籠包",
      "pinyin": "xiǎolóngbāo",
      "meaning": "xiaolongbao; small steamed dumplings"
    },
    {
      "text": "小心",
      "pinyin": "xiǎoxīn",
      "meaning": "be careful; take care"
    },
    {
      "text": "小時",
      "pinyin": "xiǎoshí",
      "meaning": "hour"
    },
    {
      "text": "小孩",
      "pinyin": "xiǎohái",
      "meaning": "child; kid"
    }
  ],
  "多": [
    {
      "text": "多少",
      "pinyin": "duōshǎo",
      "meaning": "how much; how many"
    },
    {
      "text": "很多",
      "pinyin": "hěnduō",
      "meaning": "many; a lot"
    },
    {
      "text": "多久",
      "pinyin": "duōjiǔ",
      "meaning": "how long"
    },
    {
      "text": "差不多",
      "pinyin": "chàbuduō",
      "meaning": "about the same; almost"
    },
    {
      "text": "多一點",
      "pinyin": "duō yìdiǎn",
      "meaning": "a little more"
    }
  ],
  "最": [
    {
      "text": "最近",
      "pinyin": "zuìjìn",
      "meaning": "recently; lately"
    },
    {
      "text": "最後",
      "pinyin": "zuìhòu",
      "meaning": "finally; in the end"
    },
    {
      "text": "最好",
      "pinyin": "zuìhǎo",
      "meaning": "it would be best; should"
    },
    {
      "text": "最重要",
      "pinyin": "zuì zhòngyào",
      "meaning": "most important"
    }
  ],
  "東": [
    {
      "text": "東西",
      "pinyin": "dōngxi",
      "meaning": "things; stuff"
    },
    {
      "text": "房東",
      "pinyin": "fángdōng",
      "meaning": "landlord"
    },
    {
      "text": "東邊",
      "pinyin": "dōngbiān",
      "meaning": "east side"
    },
    {
      "text": "東方",
      "pinyin": "dōngfāng",
      "meaning": "the east; eastern"
    }
  ],
  "西": [
    {
      "text": "東西",
      "pinyin": "dōngxi",
      "meaning": "things; stuff"
    },
    {
      "text": "西瓜",
      "pinyin": "xīguā",
      "meaning": "watermelon"
    },
    {
      "text": "西邊",
      "pinyin": "xībiān",
      "meaning": "west side"
    },
    {
      "text": "西方",
      "pinyin": "xīfāng",
      "meaning": "the west; western"
    }
  ],
  "見": [
    {
      "text": "見面",
      "pinyin": "jiànmiàn",
      "meaning": "to meet"
    },
    {
      "text": "看見",
      "pinyin": "kànjiàn",
      "meaning": "see; catch sight of"
    },
    {
      "text": "再見",
      "pinyin": "zàijiàn",
      "meaning": "goodbye"
    },
    {
      "text": "聽見",
      "pinyin": "tīngjiàn",
      "meaning": "hear"
    },
    {
      "text": "意見",
      "pinyin": "yìjiàn",
      "meaning": "opinion; view"
    }
  ],
  "回": [
    {
      "text": "回家",
      "pinyin": "huí jiā",
      "meaning": "go home"
    },
    {
      "text": "回來",
      "pinyin": "huílái",
      "meaning": "come back; return here"
    },
    {
      "text": "回去",
      "pinyin": "huíqù",
      "meaning": "go back"
    },
    {
      "text": "回國",
      "pinyin": "huíguó",
      "meaning": "to return to one's country"
    },
    {
      "text": "回答",
      "pinyin": "huídá",
      "meaning": "answer; reply"
    }
  ],
  "紅": [
    {
      "text": "紅色",
      "pinyin": "hóngsè",
      "meaning": "red; the color red"
    },
    {
      "text": "紅茶",
      "pinyin": "hóngchá",
      "meaning": "black tea"
    },
    {
      "text": "紅葉",
      "pinyin": "hóngyè",
      "meaning": "red maple leaves"
    },
    {
      "text": "紅綠燈",
      "pinyin": "hónglǜdēng",
      "meaning": "traffic light"
    }
  ],
  "左": [
    {
      "text": "左邊",
      "pinyin": "zuǒbiān",
      "meaning": "left side"
    },
    {
      "text": "左轉",
      "pinyin": "zuǒ zhuǎn",
      "meaning": "turn left"
    },
    {
      "text": "左右",
      "pinyin": "zuǒyòu",
      "meaning": "approximately; around"
    }
  ],
  "右": [
    {
      "text": "右邊",
      "pinyin": "yòubiān",
      "meaning": "right side"
    },
    {
      "text": "右轉",
      "pinyin": "yòu zhuǎn",
      "meaning": "turn right"
    },
    {
      "text": "左右",
      "pinyin": "zuǒyòu",
      "meaning": "approximately; around"
    }
  ],
  "口": [
    {
      "text": "門口",
      "pinyin": "ménkǒu",
      "meaning": "entrance; doorway; gate"
    },
    {
      "text": "路口",
      "pinyin": "lùkǒu",
      "meaning": "intersection"
    },
    {
      "text": "胃口",
      "pinyin": "wèikǒu",
      "meaning": "appetite"
    },
    {
      "text": "人口",
      "pinyin": "rénkǒu",
      "meaning": "population"
    },
    {
      "text": "入口",
      "pinyin": "rùkǒu",
      "meaning": "entrance"
    },
    {
      "text": "出口",
      "pinyin": "chūkǒu",
      "meaning": "exit; export"
    }
  ],
  "樂": [
    {
      "text": "音樂",
      "pinyin": "yīnyuè",
      "meaning": "music"
    },
    {
      "text": "快樂",
      "pinyin": "kuàilè",
      "meaning": "happy"
    },
    {
      "text": "生日快樂",
      "pinyin": "shēngrì kuàilè",
      "meaning": "happy birthday"
    },
    {
      "text": "樂器",
      "pinyin": "yuèqì",
      "meaning": "musical instrument"
    }
  ],
  "去": [
    {
      "text": "出去",
      "pinyin": "chūqù",
      "meaning": "to go out"
    },
    {
      "text": "去年",
      "pinyin": "qùnián",
      "meaning": "last year"
    },
    {
      "text": "回去",
      "pinyin": "huíqù",
      "meaning": "go back"
    },
    {
      "text": "過去",
      "pinyin": "guòqù",
      "meaning": "the past; go over"
    }
  ],
  "來": [
    {
      "text": "回來",
      "pinyin": "huílái",
      "meaning": "come back; return here"
    },
    {
      "text": "後來",
      "pinyin": "hòulái",
      "meaning": "later; afterwards"
    },
    {
      "text": "原來",
      "pinyin": "yuánlái",
      "meaning": "originally; it turns out"
    },
    {
      "text": "出來",
      "pinyin": "chūlái",
      "meaning": "come out"
    },
    {
      "text": "看起來",
      "pinyin": "kànqǐlái",
      "meaning": "look; seem"
    }
  ],
  "要": [
    {
      "text": "需要",
      "pinyin": "xūyào",
      "meaning": "to need"
    },
    {
      "text": "重要",
      "pinyin": "zhòngyào",
      "meaning": "important"
    },
    {
      "text": "主要",
      "pinyin": "zhǔyào",
      "meaning": "main; principal"
    },
    {
      "text": "不要",
      "pinyin": "bú yào",
      "meaning": "do not want; do not"
    }
  ],
  "雪": [
    {
      "text": "下雪",
      "pinyin": "xiàxuě",
      "meaning": "to snow"
    },
    {
      "text": "滑雪",
      "pinyin": "huáxuě",
      "meaning": "to ski"
    },
    {
      "text": "雪人",
      "pinyin": "xuěrén",
      "meaning": "snowman"
    },
    {
      "text": "雪山",
      "pinyin": "xuěshān",
      "meaning": "snow-covered mountain"
    }
  ],
  "女": [
    {
      "text": "女人",
      "pinyin": "nǚrén",
      "meaning": "woman"
    },
    {
      "text": "女生",
      "pinyin": "nǚshēng",
      "meaning": "female student; young woman"
    },
    {
      "text": "女朋友",
      "pinyin": "nǚpéngyou",
      "meaning": "girlfriend"
    },
    {
      "text": "女兒",
      "pinyin": "nǚ'ér",
      "meaning": "daughter"
    }
  ],
  "夜": [
    {
      "text": "夜市",
      "pinyin": "yèshì",
      "meaning": "night market"
    },
    {
      "text": "半夜",
      "pinyin": "bànyè",
      "meaning": "middle of the night"
    },
    {
      "text": "夜晚",
      "pinyin": "yèwǎn",
      "meaning": "night; nighttime"
    },
    {
      "text": "過夜",
      "pinyin": "guòyè",
      "meaning": "stay overnight"
    }
  ],
  "市": [
    {
      "text": "夜市",
      "pinyin": "yèshì",
      "meaning": "night market"
    },
    {
      "text": "市場",
      "pinyin": "shìchǎng",
      "meaning": "market"
    },
    {
      "text": "超市",
      "pinyin": "chāoshì",
      "meaning": "supermarket"
    },
    {
      "text": "市中心",
      "pinyin": "shìzhōngxīn",
      "meaning": "city center"
    }
  ],
  "果": [
    {
      "text": "水果",
      "pinyin": "shuǐguǒ",
      "meaning": "fruit"
    },
    {
      "text": "芒果",
      "pinyin": "mángguǒ",
      "meaning": "mango"
    },
    {
      "text": "如果",
      "pinyin": "rúguǒ",
      "meaning": "if"
    },
    {
      "text": "結果",
      "pinyin": "jiéguǒ",
      "meaning": "result; outcome"
    }
  ],
  "喜": [
    {
      "text": "喜歡",
      "pinyin": "xǐhuān",
      "meaning": "like"
    },
    {
      "text": "喜愛",
      "pinyin": "xǐ'ài",
      "meaning": "like; be fond of"
    },
    {
      "text": "喜事",
      "pinyin": "xǐshì",
      "meaning": "happy occasion"
    }
  ],
  "老": [
    {
      "text": "老師",
      "pinyin": "lǎoshī",
      "meaning": "teacher"
    },
    {
      "text": "老闆",
      "pinyin": "lǎobǎn",
      "meaning": "shop owner; boss"
    },
    {
      "text": "老人",
      "pinyin": "lǎorén",
      "meaning": "elderly person"
    },
    {
      "text": "老家",
      "pinyin": "lǎojiā",
      "meaning": "hometown; family home"
    }
  ],
  "今": [
    {
      "text": "今天",
      "pinyin": "jīntiān",
      "meaning": "today"
    },
    {
      "text": "今年",
      "pinyin": "jīnnián",
      "meaning": "this year"
    },
    {
      "text": "今晚",
      "pinyin": "jīnwǎn",
      "meaning": "tonight"
    }
  ],
  "覺": [
    {
      "text": "覺得",
      "pinyin": "juéde",
      "meaning": "think; feel (an opinion)"
    },
    {
      "text": "睡覺",
      "pinyin": "shuìjiào",
      "meaning": "to sleep"
    },
    {
      "text": "感覺",
      "pinyin": "gǎnjué",
      "meaning": "feel; feeling"
    }
  ],
  "起": [
    {
      "text": "一起",
      "pinyin": "yìqǐ",
      "meaning": "together"
    },
    {
      "text": "起來",
      "pinyin": "qǐlái",
      "meaning": "rise; get up; begin to"
    },
    {
      "text": "起床",
      "pinyin": "qǐchuáng",
      "meaning": "get out of bed"
    },
    {
      "text": "看起來",
      "pinyin": "kànqǐlái",
      "meaning": "look; seem"
    }
  ],
  "音": [
    {
      "text": "音樂",
      "pinyin": "yīnyuè",
      "meaning": "music"
    },
    {
      "text": "聲音",
      "pinyin": "shēngyīn",
      "meaning": "sound; voice"
    },
    {
      "text": "發音",
      "pinyin": "fāyīn",
      "meaning": "pronunciation; pronounce"
    },
    {
      "text": "音量",
      "pinyin": "yīnliàng",
      "meaning": "volume (sound level)"
    }
  ],
  "運": [
    {
      "text": "運動",
      "pinyin": "yùndòng",
      "meaning": "to exercise"
    },
    {
      "text": "捷運",
      "pinyin": "jiéyùn",
      "meaning": "MRT; metro"
    },
    {
      "text": "運氣",
      "pinyin": "yùnqì",
      "meaning": "luck"
    },
    {
      "text": "運送",
      "pinyin": "yùnsòng",
      "meaning": "transport; deliver"
    }
  ],
  "色": [
    {
      "text": "顏色",
      "pinyin": "yánsè",
      "meaning": "color"
    },
    {
      "text": "紅色",
      "pinyin": "hóngsè",
      "meaning": "red; the color red"
    },
    {
      "text": "黃色",
      "pinyin": "huángsè",
      "meaning": "yellow; the color yellow"
    },
    {
      "text": "藍色",
      "pinyin": "lánsè",
      "meaning": "blue; the color blue"
    }
  ],
  "山": [
    {
      "text": "山上",
      "pinyin": "shānshàng",
      "meaning": "on a mountain; in the mountains"
    },
    {
      "text": "山下",
      "pinyin": "shānxià",
      "meaning": "at the foot of a mountain; downhill"
    },
    {
      "text": "高山",
      "pinyin": "gāoshān",
      "meaning": "high mountain"
    },
    {
      "text": "爬山",
      "pinyin": "páshān",
      "meaning": "hike; climb a mountain"
    }
  ],
  "近": [
    {
      "text": "附近",
      "pinyin": "fùjìn",
      "meaning": "nearby; the surrounding area"
    },
    {
      "text": "最近",
      "pinyin": "zuìjìn",
      "meaning": "recently; lately"
    },
    {
      "text": "接近",
      "pinyin": "jiējìn",
      "meaning": "approach; be close to"
    },
    {
      "text": "近來",
      "pinyin": "jìnlái",
      "meaning": "recently"
    }
  ],
  "午": [
    {
      "text": "中午",
      "pinyin": "zhōngwǔ",
      "meaning": "noon"
    },
    {
      "text": "下午",
      "pinyin": "xiàwǔ",
      "meaning": "afternoon"
    },
    {
      "text": "午餐",
      "pinyin": "wǔcān",
      "meaning": "lunch"
    },
    {
      "text": "午休",
      "pinyin": "wǔxiū",
      "meaning": "lunch break; midday rest"
    }
  ],
  "次": [
    {
      "text": "下次",
      "pinyin": "xià cì",
      "meaning": "next time"
    },
    {
      "text": "上次",
      "pinyin": "shàng cì",
      "meaning": "last time"
    },
    {
      "text": "這次",
      "pinyin": "zhè cì",
      "meaning": "this time"
    },
    {
      "text": "一次",
      "pinyin": "yí cì",
      "meaning": "once"
    },
    {
      "text": "每次",
      "pinyin": "měi cì",
      "meaning": "every time"
    }
  ],
  "每": [
    {
      "text": "每天",
      "pinyin": "měitiān",
      "meaning": "every day"
    },
    {
      "text": "每次",
      "pinyin": "měi cì",
      "meaning": "every time"
    },
    {
      "text": "每年",
      "pinyin": "měinián",
      "meaning": "every year"
    },
    {
      "text": "每個",
      "pinyin": "měi ge",
      "meaning": "every; each one"
    }
  ],
  "火": [
    {
      "text": "火車",
      "pinyin": "huǒchē",
      "meaning": "train"
    },
    {
      "text": "火鍋",
      "pinyin": "huǒguō",
      "meaning": "hot pot"
    },
    {
      "text": "火災",
      "pinyin": "huǒzāi",
      "meaning": "fire; fire disaster"
    },
    {
      "text": "生火",
      "pinyin": "shēnghuǒ",
      "meaning": "start a fire"
    }
  ],
  "票": [
    {
      "text": "車票",
      "pinyin": "chēpiào",
      "meaning": "transportation ticket"
    },
    {
      "text": "機票",
      "pinyin": "jīpiào",
      "meaning": "airline ticket"
    },
    {
      "text": "門票",
      "pinyin": "ménpiào",
      "meaning": "admission ticket"
    },
    {
      "text": "買票",
      "pinyin": "mǎipiào",
      "meaning": "buy a ticket"
    }
  ],
  "鐵": [
    {
      "text": "高鐵",
      "pinyin": "gāotiě",
      "meaning": "High Speed Rail (HSR)"
    },
    {
      "text": "鐵路",
      "pinyin": "tiělù",
      "meaning": "railway"
    },
    {
      "text": "鐵門",
      "pinyin": "tiěmén",
      "meaning": "metal gate; iron door"
    }
  ],
  "觀": [
    {
      "text": "參觀",
      "pinyin": "cānguān",
      "meaning": "to visit (an institution or site)"
    },
    {
      "text": "觀光",
      "pinyin": "guānguāng",
      "meaning": "sightseeing; tourism"
    },
    {
      "text": "觀眾",
      "pinyin": "guānzhòng",
      "meaning": "audience; spectator"
    },
    {
      "text": "觀念",
      "pinyin": "guānniàn",
      "meaning": "concept; idea"
    }
  ],
  "程": [
    {
      "text": "計程車",
      "pinyin": "jìchéngchē",
      "meaning": "taxi"
    },
    {
      "text": "課程",
      "pinyin": "kèchéng",
      "meaning": "course; curriculum"
    },
    {
      "text": "工程",
      "pinyin": "gōngchéng",
      "meaning": "engineering; project"
    },
    {
      "text": "程度",
      "pinyin": "chéngdù",
      "meaning": "degree; level"
    }
  ],
  "古": [
    {
      "text": "古代",
      "pinyin": "gǔdài",
      "meaning": "ancient times; ancient"
    },
    {
      "text": "古老",
      "pinyin": "gǔlǎo",
      "meaning": "ancient; old"
    },
    {
      "text": "古蹟",
      "pinyin": "gǔjī",
      "meaning": "historic site; monument"
    },
    {
      "text": "古人",
      "pinyin": "gǔrén",
      "meaning": "people of ancient times"
    }
  ],
  "星": [
    {
      "text": "星期",
      "pinyin": "xīngqí",
      "meaning": "week"
    },
    {
      "text": "星星",
      "pinyin": "xīngxing",
      "meaning": "star"
    },
    {
      "text": "明星",
      "pinyin": "míngxīng",
      "meaning": "celebrity; star"
    }
  ],
  "期": [
    {
      "text": "星期",
      "pinyin": "xīngqí",
      "meaning": "week"
    },
    {
      "text": "日期",
      "pinyin": "rìqí",
      "meaning": "date"
    },
    {
      "text": "學期",
      "pinyin": "xuéqí",
      "meaning": "school term; semester"
    },
    {
      "text": "期待",
      "pinyin": "qídài",
      "meaning": "look forward to; expect"
    }
  ],
  "放": [
    {
      "text": "放假",
      "pinyin": "fàngjià",
      "meaning": "to have a holiday; be on break"
    },
    {
      "text": "放心",
      "pinyin": "fàngxīn",
      "meaning": "feel relieved; rest assured"
    },
    {
      "text": "放下",
      "pinyin": "fàngxià",
      "meaning": "put down; let go"
    },
    {
      "text": "放學",
      "pinyin": "fàngxué",
      "meaning": "school lets out; finish school"
    }
  ],
  "假": [
    {
      "text": "放假",
      "pinyin": "fàngjià",
      "meaning": "to have a holiday; be on break"
    },
    {
      "text": "假日",
      "pinyin": "jiàrì",
      "meaning": "holiday; day off"
    },
    {
      "text": "請假",
      "pinyin": "qǐngjià",
      "meaning": "ask for leave; take time off"
    },
    {
      "text": "暑假",
      "pinyin": "shǔjià",
      "meaning": "summer vacation"
    }
  ],
  "出": [
    {
      "text": "出去",
      "pinyin": "chūqù",
      "meaning": "to go out"
    },
    {
      "text": "出來",
      "pinyin": "chūlái",
      "meaning": "come out"
    },
    {
      "text": "出門",
      "pinyin": "chūmén",
      "meaning": "go out; leave home"
    },
    {
      "text": "出發",
      "pinyin": "chūfā",
      "meaning": "set out; depart"
    },
    {
      "text": "出國",
      "pinyin": "chūguó",
      "meaning": "go abroad"
    }
  ],
  "算": [
    {
      "text": "打算",
      "pinyin": "dǎsuàn",
      "meaning": "to plan; intend to"
    },
    {
      "text": "計算",
      "pinyin": "jìsuàn",
      "meaning": "calculate"
    },
    {
      "text": "算了",
      "pinyin": "suàn le",
      "meaning": "forget it; let it go"
    },
    {
      "text": "算是",
      "pinyin": "suànshì",
      "meaning": "count as; be considered"
    }
  ],
  "功": [
    {
      "text": "功課",
      "pinyin": "gōngkè",
      "meaning": "homework"
    },
    {
      "text": "成功",
      "pinyin": "chénggōng",
      "meaning": "succeed; success"
    },
    {
      "text": "功能",
      "pinyin": "gōngnéng",
      "meaning": "function; feature"
    }
  ],
  "概": [
    {
      "text": "大概",
      "pinyin": "dàgài",
      "meaning": "approximately; probably"
    },
    {
      "text": "概念",
      "pinyin": "gàiniàn",
      "meaning": "concept; idea"
    }
  ],
  "建": [
    {
      "text": "建議",
      "pinyin": "jiànyì",
      "meaning": "suggestion; advice"
    },
    {
      "text": "建築",
      "pinyin": "jiànzhú",
      "meaning": "building; architecture; build"
    },
    {
      "text": "建立",
      "pinyin": "jiànlì",
      "meaning": "establish; set up"
    }
  ],
  "議": [
    {
      "text": "建議",
      "pinyin": "jiànyì",
      "meaning": "suggestion; advice"
    },
    {
      "text": "會議",
      "pinyin": "huìyì",
      "meaning": "meeting; conference"
    },
    {
      "text": "議題",
      "pinyin": "yìtí",
      "meaning": "issue; topic for discussion"
    }
  ],
  "應": [
    {
      "text": "應該",
      "pinyin": "yīnggāi",
      "meaning": "should; ought to"
    },
    {
      "text": "回應",
      "pinyin": "huíyìng",
      "meaning": "respond; response"
    },
    {
      "text": "反應",
      "pinyin": "fǎnyìng",
      "meaning": "reaction; respond"
    },
    {
      "text": "應用",
      "pinyin": "yìngyòng",
      "meaning": "apply; application"
    }
  ],
  "特": [
    {
      "text": "特別",
      "pinyin": "tèbié",
      "meaning": "special; distinctive"
    },
    {
      "text": "特價",
      "pinyin": "tèjià",
      "meaning": "special price; sale price"
    },
    {
      "text": "特色",
      "pinyin": "tèsè",
      "meaning": "distinctive feature; characteristic"
    }
  ],
  "別": [
    {
      "text": "特別",
      "pinyin": "tèbié",
      "meaning": "special; distinctive"
    },
    {
      "text": "別人",
      "pinyin": "biérén",
      "meaning": "other people; someone else"
    },
    {
      "text": "分別",
      "pinyin": "fēnbié",
      "meaning": "separate; respectively"
    },
    {
      "text": "告別",
      "pinyin": "gàobié",
      "meaning": "say goodbye; take leave"
    }
  ],
  "決": [
    {
      "text": "決定",
      "pinyin": "juédìng",
      "meaning": "to decide"
    },
    {
      "text": "解決",
      "pinyin": "jiějué",
      "meaning": "solve; resolve"
    },
    {
      "text": "決心",
      "pinyin": "juéxīn",
      "meaning": "determination; resolve"
    }
  ],
  "鐘": [
    {
      "text": "鐘頭",
      "pinyin": "zhōngtóu",
      "meaning": "hour"
    },
    {
      "text": "鬧鐘",
      "pinyin": "nàozhōng",
      "meaning": "alarm clock"
    },
    {
      "text": "時鐘",
      "pinyin": "shízhōng",
      "meaning": "clock"
    }
  ],
  "非": [
    {
      "text": "非常",
      "pinyin": "fēicháng",
      "meaning": "very; extremely"
    },
    {
      "text": "非法",
      "pinyin": "fēifǎ",
      "meaning": "illegal"
    }
  ],
  "但": [
    {
      "text": "但是",
      "pinyin": "dànshì",
      "meaning": "but; however"
    },
    {
      "text": "不但",
      "pinyin": "búdàn",
      "meaning": "not only"
    }
  ],
  "或": [
    {
      "text": "或是",
      "pinyin": "huòshì",
      "meaning": "or"
    },
    {
      "text": "或者",
      "pinyin": "huòzhě",
      "meaning": "or; perhaps"
    }
  ],
  "利": [
    {
      "text": "便利",
      "pinyin": "biànlì",
      "meaning": "convenient"
    },
    {
      "text": "利用",
      "pinyin": "lìyòng",
      "meaning": "use; make use of"
    },
    {
      "text": "有利",
      "pinyin": "yǒulì",
      "meaning": "beneficial; favorable"
    }
  ],
  "汽": [
    {
      "text": "汽車",
      "pinyin": "qìchē",
      "meaning": "car; automobile"
    },
    {
      "text": "汽水",
      "pinyin": "qìshuǐ",
      "meaning": "soda; soft drink"
    }
  ],
  "就": [
    {
      "text": "就是",
      "pinyin": "jiùshì",
      "meaning": "exactly; just; that is"
    },
    {
      "text": "就業",
      "pinyin": "jiùyè",
      "meaning": "get a job; employment"
    }
  ],
  "貓": [
    {
      "text": "貓空",
      "pinyin": "Māokōng",
      "meaning": "Maokong, a Taipei place known for tea and scenery"
    },
    {
      "text": "貓咪",
      "pinyin": "māomī",
      "meaning": "cat; kitty"
    },
    {
      "text": "小貓",
      "pinyin": "xiǎomāo",
      "meaning": "kitten; small cat"
    }
  ],
  "黃": [
    {
      "text": "黃色",
      "pinyin": "huángsè",
      "meaning": "yellow; the color yellow"
    },
    {
      "text": "黃金",
      "pinyin": "huángjīn",
      "meaning": "gold"
    },
    {
      "text": "蛋黃",
      "pinyin": "dànhuáng",
      "meaning": "egg yolk"
    }
  ],
  "本": [
    {
      "text": "本子",
      "pinyin": "běnzi",
      "meaning": "notebook"
    },
    {
      "text": "本來",
      "pinyin": "běnlái",
      "meaning": "originally; at first"
    },
    {
      "text": "日本",
      "pinyin": "Rìběn",
      "meaning": "Japan"
    },
    {
      "text": "一本",
      "pinyin": "yì běn",
      "meaning": "one volume; one book"
    }
  ],
  "在": [
    {
      "text": "現在",
      "pinyin": "xiànzài",
      "meaning": "now"
    },
    {
      "text": "在家",
      "pinyin": "zài jiā",
      "meaning": "at home"
    },
    {
      "text": "正在",
      "pinyin": "zhèngzài",
      "meaning": "in the process of; currently"
    }
  ],
  "瓜": [
    {
      "text": "西瓜",
      "pinyin": "xīguā",
      "meaning": "watermelon"
    },
    {
      "text": "冬瓜",
      "pinyin": "dōngguā",
      "meaning": "winter melon"
    },
    {
      "text": "南瓜",
      "pinyin": "nánguā",
      "meaning": "pumpkin"
    }
  ],
  "弟": [
    {
      "text": "弟弟",
      "pinyin": "dìdi",
      "meaning": "younger brother"
    },
    {
      "text": "兄弟",
      "pinyin": "xiōngdì",
      "meaning": "brothers; brother"
    }
  ],
  "些": [
    {
      "text": "這些",
      "pinyin": "zhèxiē",
      "meaning": "these; these ones"
    },
    {
      "text": "一些",
      "pinyin": "yìxiē",
      "meaning": "some"
    },
    {
      "text": "有些",
      "pinyin": "yǒuxiē",
      "meaning": "some; somewhat"
    }
  ],
  "乾": [
    {
      "text": "乾淨",
      "pinyin": "gānjìng",
      "meaning": "clean"
    },
    {
      "text": "乾杯",
      "pinyin": "gānbēi",
      "meaning": "cheers; make a toast"
    },
    {
      "text": "乾燥",
      "pinyin": "gānzào",
      "meaning": "dry; arid"
    }
  ],
  "淨": [
    {
      "text": "乾淨",
      "pinyin": "gānjìng",
      "meaning": "clean"
    },
    {
      "text": "清淨",
      "pinyin": "qīngjìng",
      "meaning": "quiet and clean; peaceful"
    }
  ],
  "藍": [
    {
      "text": "藍色",
      "pinyin": "lánsè",
      "meaning": "blue; the color blue"
    },
    {
      "text": "藍天",
      "pinyin": "lántiān",
      "meaning": "blue sky"
    }
  ],
  "往": [
    {
      "text": "往前",
      "pinyin": "wǎng qián",
      "meaning": "go forward; ahead"
    },
    {
      "text": "往後",
      "pinyin": "wǎnghòu",
      "meaning": "backward; from now on"
    },
    {
      "text": "往往",
      "pinyin": "wǎngwǎng",
      "meaning": "often; frequently"
    },
    {
      "text": "前往",
      "pinyin": "qiánwǎng",
      "meaning": "go to; proceed to"
    }
  ],
  "因": [
    {
      "text": "因為",
      "pinyin": "yīnwèi",
      "meaning": "because"
    },
    {
      "text": "原因",
      "pinyin": "yuányīn",
      "meaning": "reason; cause"
    },
    {
      "text": "因此",
      "pinyin": "yīncǐ",
      "meaning": "therefore; as a result"
    }
  ],
  "窗": [
    {
      "text": "窗戶",
      "pinyin": "chuānghù",
      "meaning": "window"
    },
    {
      "text": "窗口",
      "pinyin": "chuāngkǒu",
      "meaning": "window; service counter"
    },
    {
      "text": "車窗",
      "pinyin": "chēchuāng",
      "meaning": "vehicle window"
    }
  ],
  "戶": [
    {
      "text": "窗戶",
      "pinyin": "chuānghù",
      "meaning": "window"
    },
    {
      "text": "住戶",
      "pinyin": "zhùhù",
      "meaning": "resident household"
    },
    {
      "text": "戶口",
      "pinyin": "hùkǒu",
      "meaning": "household registration; registered household"
    },
    {
      "text": "用戶",
      "pinyin": "yònghù",
      "meaning": "user; account holder"
    }
  ],
  "租": [
    {
      "text": "房租",
      "pinyin": "fángzū",
      "meaning": "rent (payment for a room or house)"
    },
    {
      "text": "租房子",
      "pinyin": "zū fángzi",
      "meaning": "rent a home or room"
    },
    {
      "text": "出租",
      "pinyin": "chūzū",
      "meaning": "rent out"
    },
    {
      "text": "租金",
      "pinyin": "zūjīn",
      "meaning": "rent; rental fee"
    }
  ],
  "廚": [
    {
      "text": "廚房",
      "pinyin": "chúfáng",
      "meaning": "kitchen"
    },
    {
      "text": "廚師",
      "pinyin": "chúshī",
      "meaning": "cook; chef"
    }
  ],
  "浴": [
    {
      "text": "浴室",
      "pinyin": "yùshì",
      "meaning": "bathroom"
    },
    {
      "text": "浴巾",
      "pinyin": "yùjīn",
      "meaning": "bath towel"
    },
    {
      "text": "浴缸",
      "pinyin": "yùgāng",
      "meaning": "bathtub"
    }
  ],
  "套": [
    {
      "text": "套房",
      "pinyin": "tàofáng",
      "meaning": "suite; room with a bathroom"
    },
    {
      "text": "一套",
      "pinyin": "yí tào",
      "meaning": "one set"
    },
    {
      "text": "外套",
      "pinyin": "wàitào",
      "meaning": "coat; jacket"
    }
  ],
  "進": [
    {
      "text": "請進",
      "pinyin": "qǐng jìn",
      "meaning": "please come in"
    },
    {
      "text": "進去",
      "pinyin": "jìnqù",
      "meaning": "go in"
    },
    {
      "text": "進來",
      "pinyin": "jìnlái",
      "meaning": "come in"
    },
    {
      "text": "進步",
      "pinyin": "jìnbù",
      "meaning": "make progress; progress"
    }
  ],
  "收": [
    {
      "text": "收到",
      "pinyin": "shōudào",
      "meaning": "to receive"
    },
    {
      "text": "收錢",
      "pinyin": "shōuqián",
      "meaning": "collect money; take payment"
    },
    {
      "text": "收拾",
      "pinyin": "shōushí",
      "meaning": "tidy up; put things away"
    }
  ],
  "習": [
    {
      "text": "習慣",
      "pinyin": "xíguàn",
      "meaning": "to get used to; be accustomed to"
    },
    {
      "text": "學習",
      "pinyin": "xuéxí",
      "meaning": "study; learn"
    },
    {
      "text": "練習",
      "pinyin": "liànxí",
      "meaning": "practice; exercise"
    }
  ],
  "慣": [
    {
      "text": "習慣",
      "pinyin": "xíguàn",
      "meaning": "to get used to; be accustomed to"
    },
    {
      "text": "慣用",
      "pinyin": "guànyòng",
      "meaning": "habitually use; commonly used"
    }
  ],
  "器": [
    {
      "text": "熱水器",
      "pinyin": "rèshuǐqì",
      "meaning": "water heater"
    },
    {
      "text": "樂器",
      "pinyin": "yuèqì",
      "meaning": "musical instrument"
    },
    {
      "text": "機器",
      "pinyin": "jīqì",
      "meaning": "machine"
    },
    {
      "text": "電器",
      "pinyin": "diànqì",
      "meaning": "electrical appliance"
    }
  ],
  "像": [
    {
      "text": "好像",
      "pinyin": "hǎoxiàng",
      "meaning": "seem; appear to be"
    },
    {
      "text": "像是",
      "pinyin": "xiàngshì",
      "meaning": "seem like; be like"
    },
    {
      "text": "不像",
      "pinyin": "búxiàng",
      "meaning": "not look like; unlike"
    }
  ],
  "臺": [
    {
      "text": "臺灣",
      "pinyin": "Táiwān",
      "meaning": "Taiwan"
    },
    {
      "text": "電視臺",
      "pinyin": "diànshìtái",
      "meaning": "television station"
    },
    {
      "text": "陽臺",
      "pinyin": "yángtái",
      "meaning": "balcony"
    }
  ],
  "灣": [
    {
      "text": "臺灣",
      "pinyin": "Táiwān",
      "meaning": "Taiwan"
    },
    {
      "text": "海灣",
      "pinyin": "hǎiwān",
      "meaning": "bay; gulf"
    }
  ],
  "畫": [
    {
      "text": "計畫",
      "pinyin": "jìhuà",
      "meaning": "to plan to"
    },
    {
      "text": "圖畫",
      "pinyin": "túhuà",
      "meaning": "drawing; picture"
    },
    {
      "text": "漫畫",
      "pinyin": "mànhuà",
      "meaning": "comic; manga"
    }
  ],
  "念": [
    {
      "text": "念書",
      "pinyin": "niànshū",
      "meaning": "to study"
    },
    {
      "text": "想念",
      "pinyin": "xiǎngniàn",
      "meaning": "miss; think of fondly"
    },
    {
      "text": "觀念",
      "pinyin": "guānniàn",
      "meaning": "idea; concept"
    },
    {
      "text": "念頭",
      "pinyin": "niàntou",
      "meaning": "thought; idea"
    }
  ],
  "需": [
    {
      "text": "需要",
      "pinyin": "xūyào",
      "meaning": "to need"
    },
    {
      "text": "需求",
      "pinyin": "xūqiú",
      "meaning": "need; demand"
    },
    {
      "text": "必需",
      "pinyin": "bìxū",
      "meaning": "essential; necessary"
    }
  ],
  "獎": [
    {
      "text": "獎學金",
      "pinyin": "jiǎngxuéjīn",
      "meaning": "scholarship"
    },
    {
      "text": "獎金",
      "pinyin": "jiǎngjīn",
      "meaning": "prize money; bonus"
    },
    {
      "text": "得獎",
      "pinyin": "déjiǎng",
      "meaning": "win a prize; receive an award"
    }
  ],
  "金": [
    {
      "text": "獎學金",
      "pinyin": "jiǎngxuéjīn",
      "meaning": "scholarship"
    },
    {
      "text": "黃金",
      "pinyin": "huángjīn",
      "meaning": "gold"
    },
    {
      "text": "現金",
      "pinyin": "xiànjīn",
      "meaning": "cash"
    },
    {
      "text": "金錢",
      "pinyin": "jīnqián",
      "meaning": "money"
    }
  ],
  "績": [
    {
      "text": "成績",
      "pinyin": "chéngjī",
      "meaning": "grades; academic results"
    },
    {
      "text": "業績",
      "pinyin": "yèjī",
      "meaning": "work performance; sales results"
    }
  ],
  "費": [
    {
      "text": "學費",
      "pinyin": "xuéfèi",
      "meaning": "tuition"
    },
    {
      "text": "費用",
      "pinyin": "fèiyòng",
      "meaning": "fee; expense; cost"
    },
    {
      "text": "浪費",
      "pinyin": "làngfèi",
      "meaning": "waste"
    },
    {
      "text": "免費",
      "pinyin": "miǎnfèi",
      "meaning": "free of charge"
    }
  ],
  "司": [
    {
      "text": "公司",
      "pinyin": "gōngsī",
      "meaning": "company"
    },
    {
      "text": "司機",
      "pinyin": "sījī",
      "meaning": "driver"
    }
  ],
  "望": [
    {
      "text": "希望",
      "pinyin": "xīwàng",
      "meaning": "to hope"
    },
    {
      "text": "失望",
      "pinyin": "shīwàng",
      "meaning": "disappointed; disappointment"
    },
    {
      "text": "願望",
      "pinyin": "yuànwàng",
      "meaning": "wish; desire"
    }
  ],
  "班": [
    {
      "text": "上班",
      "pinyin": "shàngbān",
      "meaning": "to go to work"
    },
    {
      "text": "下班",
      "pinyin": "xiàbān",
      "meaning": "get off work"
    },
    {
      "text": "班級",
      "pinyin": "bānjí",
      "meaning": "class; grade group"
    },
    {
      "text": "班上",
      "pinyin": "bānshàng",
      "meaning": "in the class"
    }
  ],
  "加": [
    {
      "text": "加油",
      "pinyin": "jiāyóu",
      "meaning": "keep up the good work"
    },
    {
      "text": "參加",
      "pinyin": "cānjiā",
      "meaning": "participate; join"
    },
    {
      "text": "加入",
      "pinyin": "jiārù",
      "meaning": "join; add in"
    },
    {
      "text": "加上",
      "pinyin": "jiāshàng",
      "meaning": "add; plus"
    }
  ],
  "油": [
    {
      "text": "加油",
      "pinyin": "jiāyóu",
      "meaning": "keep up the good work"
    },
    {
      "text": "汽油",
      "pinyin": "qìyóu",
      "meaning": "gasoline; petrol"
    },
    {
      "text": "油飯",
      "pinyin": "yóufàn",
      "meaning": "Taiwanese-style seasoned glutinous rice"
    }
  ],
  "難": [
    {
      "text": "困難",
      "pinyin": "kùnnán",
      "meaning": "difficult; difficulty"
    },
    {
      "text": "難過",
      "pinyin": "nánguò",
      "meaning": "sad; feel bad"
    },
    {
      "text": "難吃",
      "pinyin": "nánchī",
      "meaning": "not tasty; hard to eat"
    },
    {
      "text": "難看",
      "pinyin": "nánkàn",
      "meaning": "not to look good"
    }
  ],
  "記": [
    {
      "text": "記得",
      "pinyin": "jìde",
      "meaning": "remember"
    },
    {
      "text": "忘記",
      "pinyin": "wàngjì",
      "meaning": "forget"
    },
    {
      "text": "筆記",
      "pinyin": "bǐjì",
      "meaning": "notes; take notes"
    },
    {
      "text": "記住",
      "pinyin": "jìzhù",
      "meaning": "remember; keep in mind"
    }
  ],
  "當": [
    {
      "text": "當然",
      "pinyin": "dāngrán",
      "meaning": "of course; certainly"
    },
    {
      "text": "當時",
      "pinyin": "dāngshí",
      "meaning": "at that time"
    },
    {
      "text": "當天",
      "pinyin": "dāngtiān",
      "meaning": "that day; the same day"
    },
    {
      "text": "當地",
      "pinyin": "dāngdì",
      "meaning": "local; that place"
    }
  ],
  "然": [
    {
      "text": "當然",
      "pinyin": "dāngrán",
      "meaning": "of course; certainly"
    },
    {
      "text": "然後",
      "pinyin": "ránhòu",
      "meaning": "then; afterwards"
    },
    {
      "text": "雖然",
      "pinyin": "suīrán",
      "meaning": "although"
    },
    {
      "text": "自然",
      "pinyin": "zìrán",
      "meaning": "natural; naturally"
    }
  ],
  "交": [
    {
      "text": "交換",
      "pinyin": "jiāohuàn",
      "meaning": "exchange"
    },
    {
      "text": "交通",
      "pinyin": "jiāotōng",
      "meaning": "transportation; traffic"
    },
    {
      "text": "交朋友",
      "pinyin": "jiāo péngyǒu",
      "meaning": "make friends"
    },
    {
      "text": "交作業",
      "pinyin": "jiāo zuòyè",
      "meaning": "hand in homework"
    }
  ],
  "換": [
    {
      "text": "交換",
      "pinyin": "jiāohuàn",
      "meaning": "exchange"
    },
    {
      "text": "換錢",
      "pinyin": "huànqián",
      "meaning": "exchange money; get change"
    },
    {
      "text": "換衣服",
      "pinyin": "huàn yīfú",
      "meaning": "change clothes"
    },
    {
      "text": "更換",
      "pinyin": "gēnghuàn",
      "meaning": "replace; change"
    }
  ],
  "牙": [
    {
      "text": "牙齒",
      "pinyin": "yáchǐ",
      "meaning": "teeth"
    },
    {
      "text": "牙醫",
      "pinyin": "yáyī",
      "meaning": "dentist"
    },
    {
      "text": "牙刷",
      "pinyin": "yáshuā",
      "meaning": "toothbrush"
    }
  ],
  "必": [
    {
      "text": "必須",
      "pinyin": "bìxū",
      "meaning": "must; have to"
    },
    {
      "text": "必要",
      "pinyin": "bìyào",
      "meaning": "necessary"
    },
    {
      "text": "不必",
      "pinyin": "búbì",
      "meaning": "do not need to; need not"
    }
  ],
  "禮": [
    {
      "text": "禮物",
      "pinyin": "lǐwù",
      "meaning": "gift; present"
    },
    {
      "text": "禮貌",
      "pinyin": "lǐmào",
      "meaning": "manners; politeness"
    },
    {
      "text": "禮拜",
      "pinyin": "lǐbài",
      "meaning": "week; Sunday; worship"
    }
  ],
  "物": [
    {
      "text": "禮物",
      "pinyin": "lǐwù",
      "meaning": "gift; present"
    },
    {
      "text": "動物",
      "pinyin": "dòngwù",
      "meaning": "animal"
    },
    {
      "text": "植物",
      "pinyin": "zhíwù",
      "meaning": "plant"
    },
    {
      "text": "物品",
      "pinyin": "wùpǐn",
      "meaning": "item; goods"
    }
  ],
  "豬": [
    {
      "text": "豬肉",
      "pinyin": "zhūròu",
      "meaning": "pork"
    },
    {
      "text": "豬腳",
      "pinyin": "zhūjiǎo",
      "meaning": "pork knuckles"
    }
  ],
  "蛋": [
    {
      "text": "雞蛋",
      "pinyin": "jīdàn",
      "meaning": "egg"
    },
    {
      "text": "蛋糕",
      "pinyin": "dàngāo",
      "meaning": "cake"
    },
    {
      "text": "蛋黃",
      "pinyin": "dànhuáng",
      "meaning": "egg yolk"
    }
  ],
  "傳": [
    {
      "text": "傳統",
      "pinyin": "chuántǒng",
      "meaning": "tradition; custom"
    },
    {
      "text": "傳說",
      "pinyin": "chuánshuō",
      "meaning": "legend; it is said"
    },
    {
      "text": "上傳",
      "pinyin": "shàngchuán",
      "meaning": "upload"
    }
  ],
  "統": [
    {
      "text": "傳統",
      "pinyin": "chuántǒng",
      "meaning": "tradition; custom"
    },
    {
      "text": "系統",
      "pinyin": "xìtǒng",
      "meaning": "system"
    },
    {
      "text": "統一",
      "pinyin": "tǒngyī",
      "meaning": "unify; unified"
    }
  ],
  "輕": [
    {
      "text": "年輕",
      "pinyin": "niánqīng",
      "meaning": "young"
    },
    {
      "text": "輕鬆",
      "pinyin": "qīngsōng",
      "meaning": "relaxed; easy"
    },
    {
      "text": "輕聲",
      "pinyin": "qīngshēng",
      "meaning": "soft voice; quietly"
    }
  ],
  "部": [
    {
      "text": "大部分",
      "pinyin": "dàbùfēn",
      "meaning": "most; most of"
    },
    {
      "text": "部分",
      "pinyin": "bùfèn",
      "meaning": "part; portion"
    },
    {
      "text": "部門",
      "pinyin": "bùmén",
      "meaning": "department"
    },
    {
      "text": "一部",
      "pinyin": "yí bù",
      "meaning": "one (film, machine, etc.)"
    }
  ],
  "糕": [
    {
      "text": "蛋糕",
      "pinyin": "dàngāo",
      "meaning": "cake"
    },
    {
      "text": "年糕",
      "pinyin": "niángāo",
      "meaning": "rice cake"
    }
  ],
  "如": [
    {
      "text": "如果",
      "pinyin": "rúguǒ",
      "meaning": "if"
    },
    {
      "text": "如今",
      "pinyin": "rújīn",
      "meaning": "nowadays; now"
    },
    {
      "text": "比如",
      "pinyin": "bǐrú",
      "meaning": "for example"
    }
  ],
  "春": [
    {
      "text": "春天",
      "pinyin": "chūntiān",
      "meaning": "spring"
    },
    {
      "text": "春節",
      "pinyin": "chūnjié",
      "meaning": "Lunar New Year; Spring Festival"
    }
  ],
  "冬": [
    {
      "text": "冬天",
      "pinyin": "dōngtiān",
      "meaning": "winter"
    },
    {
      "text": "冬瓜",
      "pinyin": "dōngguā",
      "meaning": "winter melon"
    }
  ],
  "夏": [
    {
      "text": "夏天",
      "pinyin": "xiàtiān",
      "meaning": "summer"
    },
    {
      "text": "夏季",
      "pinyin": "xiàjì",
      "meaning": "summer season"
    }
  ],
  "秋": [
    {
      "text": "秋天",
      "pinyin": "qiūntiān",
      "meaning": "autumn"
    },
    {
      "text": "中秋節",
      "pinyin": "Zhōngqiūjié",
      "meaning": "Mid-Autumn Festival"
    }
  ],
  "葉": [
    {
      "text": "紅葉",
      "pinyin": "hóngyè",
      "meaning": "red maple leaves"
    },
    {
      "text": "茶葉",
      "pinyin": "cháyè",
      "meaning": "tea leaves"
    },
    {
      "text": "葉子",
      "pinyin": "yèzi",
      "meaning": "leaf"
    },
    {
      "text": "樹葉",
      "pinyin": "shùyè",
      "meaning": "tree leaf; leaves"
    }
  ],
  "聞": [
    {
      "text": "新聞",
      "pinyin": "xīnwén",
      "meaning": "news"
    },
    {
      "text": "聞到",
      "pinyin": "wéndào",
      "meaning": "smell; catch a smell"
    },
    {
      "text": "聽聞",
      "pinyin": "tīngwén",
      "meaning": "hear of; hear about"
    }
  ],
  "更": [
    {
      "text": "更好",
      "pinyin": "gènghǎo",
      "meaning": "better; even better"
    },
    {
      "text": "更加",
      "pinyin": "gèngjiā",
      "meaning": "even more"
    },
    {
      "text": "更多",
      "pinyin": "gèngduō",
      "meaning": "more; even more"
    }
  ],
  "直": [
    {
      "text": "一直",
      "pinyin": "yìzhí",
      "meaning": "continuously; all the way"
    },
    {
      "text": "直接",
      "pinyin": "zhíjiē",
      "meaning": "direct; directly"
    },
    {
      "text": "直走",
      "pinyin": "zhí zǒu",
      "meaning": "go straight"
    }
  ],
  "流": [
    {
      "text": "流鼻水",
      "pinyin": "liú bíshuǐ",
      "meaning": "have a runny nose"
    },
    {
      "text": "流行",
      "pinyin": "liúxíng",
      "meaning": "popular; in fashion"
    },
    {
      "text": "流汗",
      "pinyin": "liúhàn",
      "meaning": "sweat; perspire"
    }
  ],
  "鼻": [
    {
      "text": "鼻子",
      "pinyin": "bízi",
      "meaning": "nose"
    },
    {
      "text": "鼻水",
      "pinyin": "bíshuǐ",
      "meaning": "nasal mucus; a runny nose"
    },
    {
      "text": "鼻塞",
      "pinyin": "bísè",
      "meaning": "nasal congestion; stuffy nose"
    }
  ],
  "胃": [
    {
      "text": "胃口",
      "pinyin": "wèikǒu",
      "meaning": "appetite"
    },
    {
      "text": "胃痛",
      "pinyin": "wèitòng",
      "meaning": "stomach pain"
    }
  ],
  "炎": [
    {
      "text": "發炎",
      "pinyin": "fāyán",
      "meaning": "to be inflamed"
    },
    {
      "text": "肺炎",
      "pinyin": "fèiyán",
      "meaning": "pneumonia"
    }
  ],
  "冒": [
    {
      "text": "感冒",
      "pinyin": "gǎnmào",
      "meaning": "to have a cold"
    },
    {
      "text": "冒險",
      "pinyin": "màoxiǎn",
      "meaning": "take a risk; adventure"
    }
  ],
  "局": [
    {
      "text": "藥局",
      "pinyin": "yàojú",
      "meaning": "pharmacy"
    },
    {
      "text": "郵局",
      "pinyin": "yóujú",
      "meaning": "post office"
    },
    {
      "text": "警察局",
      "pinyin": "jǐngchájú",
      "meaning": "police station"
    }
  ],
  "把": [
    {
      "text": "把手",
      "pinyin": "bǎshǒu",
      "meaning": "handle; grip"
    }
  ],
  "息": [
    {
      "text": "休息",
      "pinyin": "xiūxí",
      "meaning": "to rest"
    },
    {
      "text": "消息",
      "pinyin": "xiāoxi",
      "meaning": "news; information"
    },
    {
      "text": "利息",
      "pinyin": "lìxí",
      "meaning": "interest (on money)"
    }
  ],
  "肚": [
    {
      "text": "肚子",
      "pinyin": "dùzi",
      "meaning": "stomach; abdomen"
    },
    {
      "text": "肚子痛",
      "pinyin": "dùzi tòng",
      "meaning": "stomachache"
    }
  ],
  "吐": [
    {
      "text": "吐司",
      "pinyin": "tǔsī",
      "meaning": "toast; sliced bread"
    },
    {
      "text": "嘔吐",
      "pinyin": "ǒutù",
      "meaning": "vomit; vomiting"
    }
  ],
  "健": [
    {
      "text": "健康",
      "pinyin": "jiànkāng",
      "meaning": "health"
    },
    {
      "text": "健身",
      "pinyin": "jiànshēn",
      "meaning": "work out; fitness"
    },
    {
      "text": "健保",
      "pinyin": "jiànbǎo",
      "meaning": "health insurance; Taiwan NHI"
    }
  ],
  "康": [
    {
      "text": "健康",
      "pinyin": "jiànkāng",
      "meaning": "health"
    },
    {
      "text": "康復",
      "pinyin": "kāngfù",
      "meaning": "recover; recovery"
    }
  ],
  "險": [
    {
      "text": "保險",
      "pinyin": "bǎoxiǎn",
      "meaning": "insurance"
    },
    {
      "text": "危險",
      "pinyin": "wéixiǎn",
      "meaning": "dangerous; danger"
    },
    {
      "text": "冒險",
      "pinyin": "màoxiǎn",
      "meaning": "take a risk; adventure"
    }
  ],
  "冰": [
    {
      "text": "冰水",
      "pinyin": "bīngshuǐ",
      "meaning": "ice water"
    },
    {
      "text": "冰箱",
      "pinyin": "bīngxiāng",
      "meaning": "refrigerator"
    },
    {
      "text": "冰淇淋",
      "pinyin": "bīngqílín",
      "meaning": "ice cream"
    },
    {
      "text": "冰塊",
      "pinyin": "bīngkuài",
      "meaning": "ice cube"
    }
  ],
  "幫": [
    {
      "text": "幫忙",
      "pinyin": "bāngmáng",
      "meaning": "help; do a favor"
    },
    {
      "text": "幫助",
      "pinyin": "bāngzhù",
      "meaning": "help; assist"
    },
    {
      "text": "幫我",
      "pinyin": "bāng wǒ",
      "meaning": "help me; do something for me"
    }
  ],
  "以": [
    {
      "text": "可以",
      "pinyin": "kěyǐ",
      "meaning": "can (possibility)"
    },
    {
      "text": "所以",
      "pinyin": "suǒyǐ",
      "meaning": "so; therefore"
    },
    {
      "text": "以前",
      "pinyin": "yǐqián",
      "meaning": "before; in the past"
    },
    {
      "text": "以後",
      "pinyin": "yǐhòu",
      "meaning": "in the future"
    },
    {
      "text": "以為",
      "pinyin": "yǐwéi",
      "meaning": "think; mistakenly assume"
    }
  ],
  "沒": [
    {
      "text": "沒有",
      "pinyin": "méiyǒu",
      "meaning": "do not have; there is not / are no"
    },
    {
      "text": "沒問題",
      "pinyin": "méi wèntí",
      "meaning": "no problem"
    },
    {
      "text": "沒關係",
      "pinyin": "méi guānxì",
      "meaning": "no problem; it doesn't matter"
    },
    {
      "text": "沒事",
      "pinyin": "méishì",
      "meaning": "nothing is wrong; be free"
    }
  ],
  "那": [
    {
      "text": "那裡",
      "pinyin": "nàlǐ",
      "meaning": "there"
    },
    {
      "text": "那麼",
      "pinyin": "nàme",
      "meaning": "then; in that case"
    },
    {
      "text": "那邊",
      "pinyin": "nàbiān",
      "meaning": "over there"
    },
    {
      "text": "那個",
      "pinyin": "nà ge",
      "meaning": "that one"
    }
  ],
  "便": [
    {
      "text": "便宜",
      "pinyin": "piányí",
      "meaning": "inexpensive; cheap"
    },
    {
      "text": "方便",
      "pinyin": "fāngbiàn",
      "meaning": "convenient"
    },
    {
      "text": "便利",
      "pinyin": "biànlì",
      "meaning": "convenient"
    }
  ],
  "商": [
    {
      "text": "商店",
      "pinyin": "shāngdiàn",
      "meaning": "shop; store"
    },
    {
      "text": "超商",
      "pinyin": "chāoshāng",
      "meaning": "convenience store (colloquial Taiwan)"
    },
    {
      "text": "商人",
      "pinyin": "shāngrén",
      "meaning": "businessperson; merchant"
    },
    {
      "text": "商業",
      "pinyin": "shāngyè",
      "meaning": "business; commerce"
    }
  ],
  "歡": [
    {
      "text": "喜歡",
      "pinyin": "xǐhuān",
      "meaning": "like"
    },
    {
      "text": "歡迎",
      "pinyin": "huānyíng",
      "meaning": "welcome"
    },
    {
      "text": "歡樂",
      "pinyin": "huānlè",
      "meaning": "joyful; happy"
    }
  ],
  "泳": [
    {
      "text": "游泳",
      "pinyin": "yóuyǒng",
      "meaning": "swim"
    },
    {
      "text": "游泳池",
      "pinyin": "yóuyǒngchí",
      "meaning": "swimming pool"
    },
    {
      "text": "泳衣",
      "pinyin": "yǒngyī",
      "meaning": "swimsuit"
    },
    {
      "text": "泳池",
      "pinyin": "yǒngchí",
      "meaning": "swimming pool"
    }
  ],
  "少": [
    {
      "text": "多少",
      "pinyin": "duōshǎo",
      "meaning": "how much; how many"
    },
    {
      "text": "不少",
      "pinyin": "bù shǎo",
      "meaning": "quite a few; quite a lot"
    },
    {
      "text": "少數",
      "pinyin": "shǎoshù",
      "meaning": "minority; small number"
    },
    {
      "text": "很少",
      "pinyin": "hěn shǎo",
      "meaning": "very little; rarely"
    }
  ],
  "共": [
    {
      "text": "一共",
      "pinyin": "yígòng",
      "meaning": "altogether; in total"
    },
    {
      "text": "公共",
      "pinyin": "gōnggòng",
      "meaning": "public; shared"
    },
    {
      "text": "共同",
      "pinyin": "gòngtóng",
      "meaning": "common; together"
    }
  ],
  "為": [
    {
      "text": "為什麼",
      "pinyin": "wèishénme",
      "meaning": "why"
    },
    {
      "text": "因為",
      "pinyin": "yīnwèi",
      "meaning": "because"
    },
    {
      "text": "認為",
      "pinyin": "rènwéi",
      "meaning": "think; consider"
    },
    {
      "text": "為了",
      "pinyin": "wèile",
      "meaning": "in order to; for the sake of"
    }
  ],
  "麵": [
    {
      "text": "麵店",
      "pinyin": "miàndiàn",
      "meaning": "noodle shop"
    },
    {
      "text": "麵線",
      "pinyin": "miànxiàn",
      "meaning": "extra-fine noodles"
    },
    {
      "text": "牛肉麵",
      "pinyin": "niúròumiàn",
      "meaning": "beef noodle soup"
    },
    {
      "text": "泡麵",
      "pinyin": "pàomiàn",
      "meaning": "instant noodles"
    }
  ],
  "餐": [
    {
      "text": "餐廳",
      "pinyin": "cāntīng",
      "meaning": "restaurant"
    },
    {
      "text": "午餐",
      "pinyin": "wǔcān",
      "meaning": "lunch"
    },
    {
      "text": "早餐",
      "pinyin": "zǎocān",
      "meaning": "breakfast"
    },
    {
      "text": "晚餐",
      "pinyin": "wǎncān",
      "meaning": "dinner"
    }
  ],
  "廳": [
    {
      "text": "餐廳",
      "pinyin": "cāntīng",
      "meaning": "restaurant"
    },
    {
      "text": "客廳",
      "pinyin": "kètīng",
      "meaning": "living room"
    },
    {
      "text": "大廳",
      "pinyin": "dàtīng",
      "meaning": "lobby; main hall"
    }
  ],
  "定": [
    {
      "text": "一定",
      "pinyin": "yídìng",
      "meaning": "definitely; really must, in 一定要"
    },
    {
      "text": "決定",
      "pinyin": "juédìng",
      "meaning": "to decide"
    },
    {
      "text": "確定",
      "pinyin": "quèdìng",
      "meaning": "confirm; certain"
    },
    {
      "text": "定位",
      "pinyin": "dìngwèi",
      "meaning": "position; positioning"
    }
  ],
  "現": [
    {
      "text": "現在",
      "pinyin": "xiànzài",
      "meaning": "now"
    },
    {
      "text": "發現",
      "pinyin": "fāxiàn",
      "meaning": "discover; notice"
    },
    {
      "text": "現金",
      "pinyin": "xiànjīn",
      "meaning": "cash"
    },
    {
      "text": "出現",
      "pinyin": "chūxiàn",
      "meaning": "appear; show up"
    }
  ],
  "朋": [
    {
      "text": "朋友",
      "pinyin": "péngyǒu",
      "meaning": "friend"
    },
    {
      "text": "女朋友",
      "pinyin": "nǚpéngyou",
      "meaning": "girlfriend"
    },
    {
      "text": "男朋友",
      "pinyin": "nánpéngyǒu",
      "meaning": "boyfriend"
    }
  ],
  "比": [
    {
      "text": "比賽",
      "pinyin": "bǐsài",
      "meaning": "game; competition"
    },
    {
      "text": "比較",
      "pinyin": "bǐjiào",
      "meaning": "comparatively; relatively; more"
    },
    {
      "text": "比如",
      "pinyin": "bǐrú",
      "meaning": "for example"
    },
    {
      "text": "比例",
      "pinyin": "bǐlì",
      "meaning": "ratio; proportion"
    }
  ],
  "思": [
    {
      "text": "意思",
      "pinyin": "yìsi",
      "meaning": "meaning"
    },
    {
      "text": "不好意思",
      "pinyin": "bù hǎoyìsi",
      "meaning": "sorry; excuse me"
    },
    {
      "text": "思考",
      "pinyin": "sīkǎo",
      "meaning": "think; consider"
    },
    {
      "text": "思念",
      "pinyin": "sīniàn",
      "meaning": "miss; long for"
    }
  ],
  "服": [
    {
      "text": "舒服",
      "pinyin": "shūfu",
      "meaning": "comfortable"
    },
    {
      "text": "衣服",
      "pinyin": "yīfú",
      "meaning": "clothes; clothing"
    },
    {
      "text": "服務",
      "pinyin": "fúwù",
      "meaning": "service; serve"
    },
    {
      "text": "服裝",
      "pinyin": "fúzhuāng",
      "meaning": "clothing; apparel"
    }
  ],
  "計": [
    {
      "text": "計程車",
      "pinyin": "jìchéngchē",
      "meaning": "taxi"
    },
    {
      "text": "計畫",
      "pinyin": "jìhuà",
      "meaning": "to plan to"
    },
    {
      "text": "計算",
      "pinyin": "jìsuàn",
      "meaning": "calculate"
    },
    {
      "text": "設計",
      "pinyin": "shèjì",
      "meaning": "design"
    }
  ],
  "行": [
    {
      "text": "不行",
      "pinyin": "bùxíng",
      "meaning": "won't work; not feasible"
    },
    {
      "text": "旅行",
      "pinyin": "lǚxíng",
      "meaning": "to travel; take a trip"
    },
    {
      "text": "銀行",
      "pinyin": "yínháng",
      "meaning": "bank"
    },
    {
      "text": "行動",
      "pinyin": "xíngdòng",
      "meaning": "action; move"
    }
  ],
  "旅": [
    {
      "text": "旅行",
      "pinyin": "lǚxíng",
      "meaning": "to travel; take a trip"
    },
    {
      "text": "旅館",
      "pinyin": "lǚguǎn",
      "meaning": "hotel; inn"
    },
    {
      "text": "旅客",
      "pinyin": "lǚkè",
      "meaning": "traveler; passenger"
    },
    {
      "text": "旅遊",
      "pinyin": "lǚyóu",
      "meaning": "travel; tourism"
    }
  ],
  "視": [
    {
      "text": "電視",
      "pinyin": "diànshì",
      "meaning": "television; TV"
    },
    {
      "text": "視力",
      "pinyin": "shìlì",
      "meaning": "eyesight; vision"
    },
    {
      "text": "視訊",
      "pinyin": "shìxùn",
      "meaning": "video communication; video feed"
    },
    {
      "text": "重視",
      "pinyin": "zhòngshì",
      "meaning": "value; take seriously"
    }
  ],
  "久": [
    {
      "text": "多久",
      "pinyin": "duōjiǔ",
      "meaning": "how long"
    },
    {
      "text": "好久不見",
      "pinyin": "hǎojiǔ bújiàn",
      "meaning": "long time no see"
    },
    {
      "text": "很久",
      "pinyin": "hěnjiǔ",
      "meaning": "a long time"
    },
    {
      "text": "長久",
      "pinyin": "chángjiǔ",
      "meaning": "long-lasting; for a long time"
    }
  ],
  "超": [
    {
      "text": "超市",
      "pinyin": "chāoshì",
      "meaning": "supermarket"
    },
    {
      "text": "超商",
      "pinyin": "chāoshāng",
      "meaning": "convenience store (colloquial Taiwan)"
    },
    {
      "text": "超過",
      "pinyin": "chāoguò",
      "meaning": "exceed; more than"
    },
    {
      "text": "超級",
      "pinyin": "chāojí",
      "meaning": "super; extremely"
    }
  ],
  "走": [
    {
      "text": "走路",
      "pinyin": "zǒulù",
      "meaning": "to walk"
    },
    {
      "text": "慢走",
      "pinyin": "màn zǒu",
      "meaning": "Take care / Bye"
    },
    {
      "text": "走開",
      "pinyin": "zǒukāi",
      "meaning": "go away; move aside"
    },
    {
      "text": "走進",
      "pinyin": "zǒujìn",
      "meaning": "walk into"
    }
  ],
  "間": [
    {
      "text": "房間",
      "pinyin": "fángjiān",
      "meaning": "room"
    },
    {
      "text": "時間",
      "pinyin": "shíjiān",
      "meaning": "time"
    },
    {
      "text": "中間",
      "pinyin": "zhōngjiān",
      "meaning": "middle; between"
    },
    {
      "text": "一間",
      "pinyin": "yì jiān",
      "meaning": "one room; one shop"
    }
  ],
  "經": [
    {
      "text": "已經",
      "pinyin": "yǐjīng",
      "meaning": "already"
    },
    {
      "text": "經過",
      "pinyin": "jīngguò",
      "meaning": "pass by; go past"
    },
    {
      "text": "經驗",
      "pinyin": "jīngyàn",
      "meaning": "experience"
    },
    {
      "text": "經常",
      "pinyin": "jīngcháng",
      "meaning": "often; frequently"
    }
  ],
  "過": [
    {
      "text": "不過",
      "pinyin": "búguò",
      "meaning": "however; but"
    },
    {
      "text": "經過",
      "pinyin": "jīngguò",
      "meaning": "pass by; go past"
    },
    {
      "text": "過去",
      "pinyin": "guòqù",
      "meaning": "the past; go over"
    },
    {
      "text": "過年",
      "pinyin": "guònián",
      "meaning": "celebrate the New Year"
    },
    {
      "text": "過來",
      "pinyin": "guòlái",
      "meaning": "come over"
    }
  ],
  "關": [
    {
      "text": "沒關係",
      "pinyin": "méi guānxì",
      "meaning": "no problem; it doesn't matter"
    },
    {
      "text": "關心",
      "pinyin": "guānxīn",
      "meaning": "be concerned about"
    },
    {
      "text": "關門",
      "pinyin": "guānmén",
      "meaning": "close the door"
    },
    {
      "text": "關掉",
      "pinyin": "guāndiào",
      "meaning": "turn off; shut off"
    }
  ],
  "線": [
    {
      "text": "路線",
      "pinyin": "lùxiàn",
      "meaning": "route"
    },
    {
      "text": "麵線",
      "pinyin": "miànxiàn",
      "meaning": "extra-fine noodles"
    },
    {
      "text": "電線",
      "pinyin": "diànxiàn",
      "meaning": "electric wire"
    },
    {
      "text": "上線",
      "pinyin": "shàngxiàn",
      "meaning": "go online; come online"
    }
  ],
  "語": [
    {
      "text": "語言",
      "pinyin": "yǔyán",
      "meaning": "language"
    },
    {
      "text": "英語",
      "pinyin": "Yīngyǔ",
      "meaning": "English language"
    },
    {
      "text": "國語",
      "pinyin": "Guóyǔ",
      "meaning": "Mandarin Chinese"
    },
    {
      "text": "語氣",
      "pinyin": "yǔqì",
      "meaning": "tone of voice; manner of speaking"
    }
  ],
  "言": [
    {
      "text": "語言",
      "pinyin": "yǔyán",
      "meaning": "language"
    },
    {
      "text": "發言",
      "pinyin": "fāyán",
      "meaning": "speak; make a statement"
    },
    {
      "text": "言語",
      "pinyin": "yányǔ",
      "meaning": "speech; words"
    },
    {
      "text": "留言",
      "pinyin": "liúyán",
      "meaning": "leave a message; message"
    }
  ],
  "成": [
    {
      "text": "成績",
      "pinyin": "chéngjī",
      "meaning": "grades; academic results"
    },
    {
      "text": "成功",
      "pinyin": "chénggōng",
      "meaning": "succeed; success"
    },
    {
      "text": "成為",
      "pinyin": "chéngwéi",
      "meaning": "become"
    },
    {
      "text": "完成",
      "pinyin": "wánchéng",
      "meaning": "complete; finish"
    }
  ]
};

export function characterCommonWords(hanzi:string):CharacterCommonWord[]{
 return supplementaryCharacterCommonWords[hanzi] ?? [];
}
