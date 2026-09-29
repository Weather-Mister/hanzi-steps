// Supplementary reference only. Never merge these senses into assessed meanings,
// canonical vocabulary, character ownership, or learner progress.
export type CharacterSense = {
 pinyin:string;
 meaning:string;
 example:{text:string;pinyin:string;meaning:string};
};

export const supplementaryCharacterMeanings:Record<string,CharacterSense[]> = {
  "好": [
    {
      "pinyin": "hǎo",
      "meaning": "easy or pleasant to do (before a verb)",
      "example": {
        "text": "好吃",
        "pinyin": "hǎochī",
        "meaning": "tasty; good to eat"
      }
    },
    {
      "pinyin": "hào",
      "meaning": "to like; be fond of (different tone)",
      "example": {
        "text": "愛好",
        "pinyin": "àihào",
        "meaning": "hobby; interest"
      }
    }
  ],
  "是": [
    {
      "pinyin": "shì",
      "meaning": "yes; that's right (confirming a statement)",
      "example": {
        "text": "是的。",
        "pinyin": "Shì de.",
        "meaning": "Yes, that's right."
      }
    }
  ],
  "生": [
    {
      "pinyin": "shēng",
      "meaning": "raw; uncooked",
      "example": {
        "text": "生魚片",
        "pinyin": "shēngyúpiàn",
        "meaning": "raw fish slices; sashimi"
      }
    },
    {
      "pinyin": "shēng",
      "meaning": "give birth to; produce",
      "example": {
        "text": "生孩子",
        "pinyin": "shēng háizi",
        "meaning": "have a baby"
      }
    },
    {
      "pinyin": "shēng",
      "meaning": "unfamiliar (in compounds)",
      "example": {
        "text": "陌生",
        "pinyin": "mòshēng",
        "meaning": "unfamiliar; strange"
      }
    }
  ],
  "喝": [
    {
      "pinyin": "hè",
      "meaning": "shout (different tone, in compounds)",
      "example": {
        "text": "喝采",
        "pinyin": "hècǎi",
        "meaning": "cheer; applaud"
      }
    }
  ],
  "呢": [
    {
      "pinyin": "ne",
      "meaning": "marks an ongoing situation or adds emphasis",
      "example": {
        "text": "他在睡覺呢。",
        "pinyin": "Tā zài shuìjiào ne.",
        "meaning": "He's sleeping."
      }
    }
  ],
  "的": [
    {
      "pinyin": "de",
      "meaning": "links a description to a noun",
      "example": {
        "text": "好吃的東西",
        "pinyin": "hǎochī de dōngxi",
        "meaning": "tasty things to eat"
      }
    },
    {
      "pinyin": "de",
      "meaning": "stands for an understood noun after a description",
      "example": {
        "text": "我要紅的。",
        "pinyin": "Wǒ yào hóng de.",
        "meaning": "I want the red one."
      }
    },
    {
      "pinyin": "dí",
      "meaning": "truly; indeed (different tone, in 的確)",
      "example": {
        "text": "的確",
        "pinyin": "díquè",
        "meaning": "indeed; certainly"
      }
    }
  ],
  "一": [
    {
      "pinyin": "yī",
      "meaning": "whole; entire (with a time or group)",
      "example": {
        "text": "一天",
        "pinyin": "yì tiān",
        "meaning": "one day; the whole day, depending on context"
      }
    }
  ],
  "沒": [
    {
      "pinyin": "méi",
      "meaning": "did not; have not (before an action)",
      "example": {
        "text": "我沒去。",
        "pinyin": "Wǒ méi qù.",
        "meaning": "I didn't go."
      }
    },
    {
      "pinyin": "mò",
      "meaning": "sink; submerge (different reading)",
      "example": {
        "text": "淹沒",
        "pinyin": "yānmò",
        "meaning": "submerge; flood"
      }
    }
  ],
  "那": [
    {
      "pinyin": "nà",
      "meaning": "then; in that case (at the start of a response)",
      "example": {
        "text": "那我們走吧。",
        "pinyin": "Nà wǒmen zǒu ba.",
        "meaning": "Then let's go."
      }
    }
  ],
  "本": [
    {
      "pinyin": "běn",
      "meaning": "root; foundation (usually in compounds)",
      "example": {
        "text": "基本",
        "pinyin": "jīběn",
        "meaning": "basic; fundamental"
      }
    },
    {
      "pinyin": "běn",
      "meaning": "this; the current (before a time or publication)",
      "example": {
        "text": "本月",
        "pinyin": "běn yuè",
        "meaning": "this month"
      }
    }
  ],
  "大": [
    {
      "pinyin": "dà",
      "meaning": "older; eldest (in family or age comparisons)",
      "example": {
        "text": "大哥",
        "pinyin": "dàgē",
        "meaning": "eldest brother; older brother"
      }
    }
  ],
  "小": [
    {
      "pinyin": "xiǎo",
      "meaning": "young; junior",
      "example": {
        "text": "小孩子",
        "pinyin": "xiǎoháizi",
        "meaning": "young child"
      }
    }
  ],
  "在": [
    {
      "pinyin": "zài",
      "meaning": "action in progress (before a verb)",
      "example": {
        "text": "我在吃飯。",
        "pinyin": "Wǒ zài chīfàn.",
        "meaning": "I'm eating."
      }
    }
  ],
  "都": [
    {
      "pinyin": "dōu",
      "meaning": "already; even (emphatic uses)",
      "example": {
        "text": "都十點了。",
        "pinyin": "Dōu shí diǎn le.",
        "meaning": "It's already ten o'clock."
      }
    },
    {
      "pinyin": "dū",
      "meaning": "capital city (different reading)",
      "example": {
        "text": "首都",
        "pinyin": "shǒudū",
        "meaning": "capital city"
      }
    }
  ],
  "去": [
    {
      "pinyin": "qù",
      "meaning": "away from the speaker (after another verb)",
      "example": {
        "text": "走去",
        "pinyin": "zǒu qù",
        "meaning": "walk over there"
      }
    },
    {
      "pinyin": "qù",
      "meaning": "last; past (in time expressions)",
      "example": {
        "text": "去年",
        "pinyin": "qùnián",
        "meaning": "last year"
      }
    }
  ],
  "來": [
    {
      "pinyin": "lái",
      "meaning": "toward the speaker (after another verb)",
      "example": {
        "text": "進來",
        "pinyin": "jìn lái",
        "meaning": "come in"
      }
    },
    {
      "pinyin": "lái",
      "meaning": "approximately (after a number)",
      "example": {
        "text": "十來個",
        "pinyin": "shí lái ge",
        "meaning": "about ten"
      }
    }
  ],
  "看": [
    {
      "pinyin": "kàn",
      "meaning": "visit; consult a doctor",
      "example": {
        "text": "看朋友；看醫生",
        "pinyin": "kàn péngyǒu; kàn yīshēng",
        "meaning": "visit a friend; see a doctor"
      }
    },
    {
      "pinyin": "kān",
      "meaning": "watch over; guard (different tone)",
      "example": {
        "text": "看門",
        "pinyin": "kān mén",
        "meaning": "guard the door"
      }
    }
  ],
  "和": [
    {
      "pinyin": "hé",
      "meaning": "with; together with",
      "example": {
        "text": "和朋友吃飯",
        "pinyin": "hé péngyǒu chīfàn",
        "meaning": "eat with friends"
      }
    },
    {
      "pinyin": "hé",
      "meaning": "peaceful; harmonious (in compounds)",
      "example": {
        "text": "和平",
        "pinyin": "hépíng",
        "meaning": "peace"
      }
    },
    {
      "pinyin": "hàn",
      "meaning": "and; with (a reading also heard in Taiwan; the primary hé remains valid)",
      "example": {
        "text": "我和你",
        "pinyin": "wǒ hàn nǐ",
        "meaning": "you and me"
      }
    }
  ],
  "中": [
    {
      "pinyin": "zhōng",
      "meaning": "in; during (a place, process or time)",
      "example": {
        "text": "工作中",
        "pinyin": "gōngzuò zhōng",
        "meaning": "at work; working"
      }
    },
    {
      "pinyin": "zhòng",
      "meaning": "hit a target; win (different tone)",
      "example": {
        "text": "中獎",
        "pinyin": "zhòngjiǎng",
        "meaning": "win a prize"
      }
    }
  ],
  "文": [
    {
      "pinyin": "wén",
      "meaning": "text; article (in compounds)",
      "example": {
        "text": "文章",
        "pinyin": "wénzhāng",
        "meaning": "article; written composition"
      }
    }
  ],
  "英": [
    {
      "pinyin": "yīng",
      "meaning": "outstanding; heroic (in compounds)",
      "example": {
        "text": "英雄",
        "pinyin": "yīngxióng",
        "meaning": "hero"
      }
    }
  ],
  "想": [
    {
      "pinyin": "xiǎng",
      "meaning": "miss someone",
      "example": {
        "text": "想你",
        "pinyin": "xiǎng nǐ",
        "meaning": "miss you"
      }
    }
  ],
  "要": [
    {
      "pinyin": "yào",
      "meaning": "need; must; be going to (depending on context)",
      "example": {
        "text": "要下雨了。",
        "pinyin": "Yào xià yǔ le.",
        "meaning": "It's going to rain."
      }
    },
    {
      "pinyin": "yāo",
      "meaning": "request; demand (different tone, in compounds)",
      "example": {
        "text": "要求",
        "pinyin": "yāoqiú",
        "meaning": "request; requirement"
      }
    }
  ],
  "會": [
    {
      "pinyin": "huì",
      "meaning": "will; likely to happen",
      "example": {
        "text": "明天會下雨。",
        "pinyin": "Míngtiān huì xià yǔ.",
        "meaning": "It will probably rain tomorrow."
      }
    },
    {
      "pinyin": "huì",
      "meaning": "meeting; gathering",
      "example": {
        "text": "開會",
        "pinyin": "kāihuì",
        "meaning": "hold or attend a meeting"
      }
    }
  ],
  "家": [
    {
      "pinyin": "jiā",
      "meaning": "specialist (as a suffix)",
      "example": {
        "text": "畫家",
        "pinyin": "huàjiā",
        "meaning": "painter; artist"
      }
    },
    {
      "pinyin": "jiā",
      "meaning": "measure word for businesses or establishments",
      "example": {
        "text": "一家店",
        "pinyin": "yì jiā diàn",
        "meaning": "one shop"
      }
    }
  ],
  "照": [
    {
      "pinyin": "zhào",
      "meaning": "shine; illuminate",
      "example": {
        "text": "照明",
        "pinyin": "zhàomíng",
        "meaning": "lighting; illumination"
      }
    },
    {
      "pinyin": "zhào",
      "meaning": "according to; follow",
      "example": {
        "text": "照這個方法做。",
        "pinyin": "Zhào zhège fāngfǎ zuò.",
        "meaning": "Do it using this method."
      }
    },
    {
      "pinyin": "zhào",
      "meaning": "take a photograph",
      "example": {
        "text": "照相",
        "pinyin": "zhàoxiàng",
        "meaning": "take a photo"
      }
    }
  ],
  "片": [
    {
      "pinyin": "piàn",
      "meaning": "slice; thin piece; measure word for these",
      "example": {
        "text": "一片麵包",
        "pinyin": "yí piàn miànbāo",
        "meaning": "a slice of bread"
      }
    },
    {
      "pinyin": "piàn",
      "meaning": "film; movie (in compounds)",
      "example": {
        "text": "影片",
        "pinyin": "yǐngpiàn",
        "meaning": "film; video"
      }
    }
  ],
  "張": [
    {
      "pinyin": "zhāng",
      "meaning": "open; spread",
      "example": {
        "text": "張開嘴巴",
        "pinyin": "zhāngkāi zuǐba",
        "meaning": "open one's mouth"
      }
    }
  ],
  "幾": [
    {
      "pinyin": "jǐ",
      "meaning": "a few; several (not a question)",
      "example": {
        "text": "幾個朋友",
        "pinyin": "jǐ ge péngyǒu",
        "meaning": "a few friends"
      }
    },
    {
      "pinyin": "jī",
      "meaning": "almost (different tone, in 幾乎)",
      "example": {
        "text": "幾乎",
        "pinyin": "jīhū",
        "meaning": "almost; nearly"
      }
    }
  ],
  "相": [
    {
      "pinyin": "xiāng",
      "meaning": "each other; mutually (different tone)",
      "example": {
        "text": "互相幫忙",
        "pinyin": "hùxiāng bāngmáng",
        "meaning": "help each other"
      }
    },
    {
      "pinyin": "xiàng",
      "meaning": "appearance (as in 長相)",
      "example": {
        "text": "長相",
        "pinyin": "zhǎngxiàng",
        "meaning": "appearance; looks"
      }
    }
  ],
  "末": [
    {
      "pinyin": "mò",
      "meaning": "end; final part",
      "example": {
        "text": "月底、年末",
        "pinyin": "yuèdǐ, niánmò",
        "meaning": "end of the month; end of the year"
      }
    }
  ],
  "打": [
    {
      "pinyin": "dǎ",
      "meaning": "make a call; type; carry out an action (depends on the object)",
      "example": {
        "text": "打電話；打字",
        "pinyin": "dǎ diànhuà; dǎ zì",
        "meaning": "make a phone call; type"
      }
    },
    {
      "pinyin": "dǎ",
      "meaning": "apply a discount",
      "example": {
        "text": "打折",
        "pinyin": "dǎzhé",
        "meaning": "offer a discount"
      }
    }
  ],
  "足": [
    {
      "pinyin": "zú",
      "meaning": "enough; sufficient (often in compounds)",
      "example": {
        "text": "足夠",
        "pinyin": "zúgòu",
        "meaning": "enough; sufficient"
      }
    }
  ],
  "吧": [
    {
      "pinyin": "ba",
      "meaning": "softens a guess or request for agreement",
      "example": {
        "text": "他是老師吧？",
        "pinyin": "Tā shì lǎoshī ba?",
        "meaning": "He's a teacher, isn't he?"
      }
    }
  ],
  "今": [
    {
      "pinyin": "jīn",
      "meaning": "this; current (in time words)",
      "example": {
        "text": "今年",
        "pinyin": "jīnnián",
        "meaning": "this year"
      }
    }
  ],
  "明": [
    {
      "pinyin": "míng",
      "meaning": "bright; clear",
      "example": {
        "text": "明亮；明白",
        "pinyin": "míngliàng; míngbái",
        "meaning": "bright; understand / clear"
      }
    }
  ],
  "玩": [
    {
      "pinyin": "wán",
      "meaning": "play; have fun",
      "example": {
        "text": "玩遊戲",
        "pinyin": "wán yóuxì",
        "meaning": "play games"
      }
    }
  ],
  "起": [
    {
      "pinyin": "qǐ",
      "meaning": "rise; get up; start",
      "example": {
        "text": "起床",
        "pinyin": "qǐchuáng",
        "meaning": "get out of bed"
      }
    },
    {
      "pinyin": "qǐ",
      "meaning": "upward; beginning an action (in complements)",
      "example": {
        "text": "站起來",
        "pinyin": "zhàn qǐlái",
        "meaning": "stand up"
      }
    }
  ],
  "可": [
    {
      "pinyin": "kě",
      "meaning": "may; can; permissible",
      "example": {
        "text": "可不可以？",
        "pinyin": "Kě bù kěyǐ?",
        "meaning": "Is it okay? / May I?"
      }
    }
  ],
  "老": [
    {
      "pinyin": "lǎo",
      "meaning": "always; keeps doing (colloquial)",
      "example": {
        "text": "他老是遲到。",
        "pinyin": "Tā lǎoshì chídào.",
        "meaning": "He is always late."
      }
    }
  ],
  "師": [
    {
      "pinyin": "shī",
      "meaning": "trained professional (in job titles)",
      "example": {
        "text": "工程師",
        "pinyin": "gōngchéngshī",
        "meaning": "engineer"
      }
    }
  ],
  "電": [
    {
      "pinyin": "diàn",
      "meaning": "electricity; electrical (in compounds)",
      "example": {
        "text": "停電",
        "pinyin": "tíngdiàn",
        "meaning": "power outage"
      }
    }
  ],
  "做": [
    {
      "pinyin": "zuò",
      "meaning": "make; prepare",
      "example": {
        "text": "做飯",
        "pinyin": "zuò fàn",
        "meaning": "cook; prepare food"
      }
    }
  ],
  "天": [
    {
      "pinyin": "tiān",
      "meaning": "weather (in compounds); heaven",
      "example": {
        "text": "天氣",
        "pinyin": "tiānqì",
        "meaning": "weather"
      }
    }
  ],
  "覺": [
    {
      "pinyin": "jiào",
      "meaning": "sleep (different reading)",
      "example": {
        "text": "睡覺",
        "pinyin": "shuìjiào",
        "meaning": "sleep"
      }
    },
    {
      "pinyin": "jué",
      "meaning": "perceive; become aware (in compounds)",
      "example": {
        "text": "感覺",
        "pinyin": "gǎnjué",
        "meaning": "feel; feeling"
      }
    }
  ],
  "得": [
    {
      "pinyin": "de",
      "meaning": "links an action to a description of how it is done",
      "example": {
        "text": "說得很好",
        "pinyin": "shuō de hěn hǎo",
        "meaning": "speak very well"
      }
    },
    {
      "pinyin": "de",
      "meaning": "can achieve a result (between a verb and result)",
      "example": {
        "text": "看得懂",
        "pinyin": "kàn de dǒng",
        "meaning": "can understand what one reads"
      }
    },
    {
      "pinyin": "dé",
      "meaning": "get; obtain (different tone)",
      "example": {
        "text": "得到",
        "pinyin": "dédào",
        "meaning": "get; obtain"
      }
    },
    {
      "pinyin": "děi",
      "meaning": "must; have to (different reading)",
      "example": {
        "text": "我得走了。",
        "pinyin": "Wǒ děi zǒu le.",
        "meaning": "I have to go now."
      }
    }
  ],
  "樣": [
    {
      "pinyin": "yàng",
      "meaning": "kind; manner; appearance",
      "example": {
        "text": "一樣；樣子",
        "pinyin": "yíyàng; yàngzi",
        "meaning": "the same; appearance / manner"
      }
    }
  ],
  "以": [
    {
      "pinyin": "yǐ",
      "meaning": "using; by means of (often formal)",
      "example": {
        "text": "以中文回答",
        "pinyin": "yǐ Zhōngwén huídá",
        "meaning": "answer in Chinese"
      }
    },
    {
      "pinyin": "yǐ",
      "meaning": "forms time and boundary expressions (learn the whole word)",
      "example": {
        "text": "以前；以後；以上",
        "pinyin": "yǐqián; yǐhòu; yǐshàng",
        "meaning": "before; afterward; above / more than"
      }
    }
  ],
  "問": [
    {
      "pinyin": "wèn",
      "meaning": "inquire after; greet (in compounds)",
      "example": {
        "text": "問好",
        "pinyin": "wèn hǎo",
        "meaning": "send greetings; say hello"
      }
    }
  ],
  "走": [
    {
      "pinyin": "zǒu",
      "meaning": "leave; depart",
      "example": {
        "text": "我先走。",
        "pinyin": "Wǒ xiān zǒu.",
        "meaning": "I'll leave first."
      }
    }
  ],
  "到": [
    {
      "pinyin": "dào",
      "meaning": "until; up to (an endpoint)",
      "example": {
        "text": "從九點到十點",
        "pinyin": "cóng jiǔ diǎn dào shí diǎn",
        "meaning": "from nine to ten"
      }
    },
    {
      "pinyin": "dào",
      "meaning": "successfully reach a result (after a verb)",
      "example": {
        "text": "找到",
        "pinyin": "zhǎodào",
        "meaning": "find successfully"
      }
    }
  ],
  "前": [
    {
      "pinyin": "qián",
      "meaning": "before; previous",
      "example": {
        "text": "以前；前年",
        "pinyin": "yǐqián; qiánnián",
        "meaning": "before; the year before last"
      }
    }
  ],
  "直": [
    {
      "pinyin": "zhí",
      "meaning": "direct; straight (without a detour)",
      "example": {
        "text": "直接",
        "pinyin": "zhíjiē",
        "meaning": "direct; directly"
      }
    }
  ],
  "轉": [
    {
      "pinyin": "zhuǎn",
      "meaning": "transfer; change",
      "example": {
        "text": "轉車",
        "pinyin": "zhuǎn chē",
        "meaning": "change vehicles; transfer"
      }
    },
    {
      "pinyin": "zhuàn",
      "meaning": "rotate; spin (different tone)",
      "example": {
        "text": "轉一圈",
        "pinyin": "zhuàn yì quān",
        "meaning": "make one full turn"
      }
    }
  ],
  "路": [
    {
      "pinyin": "lù",
      "meaning": "route; bus route",
      "example": {
        "text": "公車路線",
        "pinyin": "gōngchē lùxiàn",
        "meaning": "bus route"
      }
    }
  ],
  "口": [
    {
      "pinyin": "kǒu",
      "meaning": "measure word for people in a household or mouthfuls",
      "example": {
        "text": "三口人",
        "pinyin": "sān kǒu rén",
        "meaning": "three people in a family"
      }
    }
  ],
  "行": [
    {
      "pinyin": "háng",
      "meaning": "line; profession; business (different reading)",
      "example": {
        "text": "銀行；一行字",
        "pinyin": "yínháng; yì háng zì",
        "meaning": "bank; a line of writing"
      }
    },
    {
      "pinyin": "xíng",
      "meaning": "walk; travel (in compounds)",
      "example": {
        "text": "行人",
        "pinyin": "xíngrén",
        "meaning": "pedestrian"
      }
    }
  ],
  "超": [
    {
      "pinyin": "chāo",
      "meaning": "exceed; super- (colloquial intensifier)",
      "example": {
        "text": "超好吃",
        "pinyin": "chāo hǎochī",
        "meaning": "super tasty"
      }
    }
  ],
  "近": [
    {
      "pinyin": "jìn",
      "meaning": "recent; close to an amount",
      "example": {
        "text": "最近",
        "pinyin": "zuìjìn",
        "meaning": "recently; lately"
      }
    }
  ],
  "離": [
    {
      "pinyin": "lí",
      "meaning": "leave; depart from",
      "example": {
        "text": "離開",
        "pinyin": "líkāi",
        "meaning": "leave"
      }
    }
  ],
  "漂": [
    {
      "pinyin": "piāo",
      "meaning": "float; drift (different tone)",
      "example": {
        "text": "漂浮",
        "pinyin": "piāofú",
        "meaning": "float"
      }
    },
    {
      "pinyin": "piǎo",
      "meaning": "bleach; rinse (different tone)",
      "example": {
        "text": "漂白",
        "pinyin": "piǎobái",
        "meaning": "bleach; whiten"
      }
    }
  ],
  "子": [
    {
      "pinyin": "zǐ",
      "meaning": "child; son (in compounds)",
      "example": {
        "text": "子女",
        "pinyin": "zǐnǚ",
        "meaning": "children; sons and daughters"
      }
    },
    {
      "pinyin": "zi",
      "meaning": "neutral-tone noun ending",
      "example": {
        "text": "桌子",
        "pinyin": "zhuōzi",
        "meaning": "table (子 is a suffix here)"
      }
    }
  ],
  "還": [
    {
      "pinyin": "hái",
      "meaning": "still; yet",
      "example": {
        "text": "他還在家。",
        "pinyin": "Tā hái zài jiā.",
        "meaning": "He's still at home."
      }
    },
    {
      "pinyin": "hái",
      "meaning": "also; in addition; even more",
      "example": {
        "text": "還有一個。",
        "pinyin": "Hái yǒu yí ge.",
        "meaning": "There is one more."
      }
    },
    {
      "pinyin": "huán",
      "meaning": "return; give back; repay (different reading)",
      "example": {
        "text": "還書",
        "pinyin": "huán shū",
        "meaning": "return a book"
      }
    }
  ],
  "樂": [
    {
      "pinyin": "lè",
      "meaning": "happy; pleasure (different reading)",
      "example": {
        "text": "快樂",
        "pinyin": "kuàilè",
        "meaning": "happy"
      }
    }
  ],
  "運": [
    {
      "pinyin": "yùn",
      "meaning": "transport; carry",
      "example": {
        "text": "運送",
        "pinyin": "yùnsòng",
        "meaning": "transport; deliver"
      }
    },
    {
      "pinyin": "yùn",
      "meaning": "luck; fortune",
      "example": {
        "text": "運氣",
        "pinyin": "yùnqì",
        "meaning": "luck"
      }
    }
  ],
  "動": [
    {
      "pinyin": "dòng",
      "meaning": "move; act; touch or disturb",
      "example": {
        "text": "不要動。",
        "pinyin": "Bú yào dòng.",
        "meaning": "Don't move."
      }
    }
  ],
  "網": [
    {
      "pinyin": "wǎng",
      "meaning": "network; internet",
      "example": {
        "text": "上網",
        "pinyin": "shàngwǎng",
        "meaning": "go online"
      }
    }
  ],
  "早": [
    {
      "pinyin": "zǎo",
      "meaning": "early",
      "example": {
        "text": "太早了。",
        "pinyin": "Tài zǎo le.",
        "meaning": "It's too early."
      }
    }
  ],
  "上": [
    {
      "pinyin": "shàng",
      "meaning": "on; above; upper",
      "example": {
        "text": "桌上",
        "pinyin": "zhuō shàng",
        "meaning": "on the table"
      }
    },
    {
      "pinyin": "shàng",
      "meaning": "go up; board",
      "example": {
        "text": "上樓；上車",
        "pinyin": "shàng lóu; shàng chē",
        "meaning": "go upstairs; get on a vehicle"
      }
    },
    {
      "pinyin": "shàng",
      "meaning": "attend; start a scheduled activity",
      "example": {
        "text": "上課；上班",
        "pinyin": "shàng kè; shàng bān",
        "meaning": "attend class; go to work"
      }
    },
    {
      "pinyin": "shàng",
      "meaning": "previous; last (before a time expression)",
      "example": {
        "text": "上個月",
        "pinyin": "shàng ge yuè",
        "meaning": "last month"
      }
    },
    {
      "pinyin": "shàng",
      "meaning": "attach or complete an action (as a complement)",
      "example": {
        "text": "關上門",
        "pinyin": "guān shàng mén",
        "meaning": "close the door"
      }
    }
  ],
  "晚": [
    {
      "pinyin": "wǎn",
      "meaning": "late",
      "example": {
        "text": "太晚了。",
        "pinyin": "Tài wǎn le.",
        "meaning": "It's too late."
      }
    }
  ],
  "吃": [
    {
      "pinyin": "chī",
      "meaning": "take medicine; experience something (in expressions)",
      "example": {
        "text": "吃藥；吃苦",
        "pinyin": "chī yào; chī kǔ",
        "meaning": "take medicine; endure hardship"
      }
    }
  ],
  "飯": [
    {
      "pinyin": "fàn",
      "meaning": "cooked rice; a meal (not only dinner)",
      "example": {
        "text": "白飯；吃飯",
        "pinyin": "báifàn; chīfàn",
        "meaning": "plain cooked rice; eat a meal"
      }
    }
  ],
  "菜": [
    {
      "pinyin": "cài",
      "meaning": "vegetable; greens",
      "example": {
        "text": "青菜",
        "pinyin": "qīngcài",
        "meaning": "green vegetables"
      }
    }
  ],
  "越": [
    {
      "pinyin": "yuè",
      "meaning": "increasingly; the more… the more…",
      "example": {
        "text": "越來越好",
        "pinyin": "yuè lái yuè hǎo",
        "meaning": "getting better and better"
      }
    },
    {
      "pinyin": "yuè",
      "meaning": "cross; go beyond",
      "example": {
        "text": "越過",
        "pinyin": "yuèguò",
        "meaning": "cross over"
      }
    }
  ],
  "南": [
    {
      "pinyin": "nán",
      "meaning": "south",
      "example": {
        "text": "南方",
        "pinyin": "nánfāng",
        "meaning": "the south"
      }
    }
  ],
  "熱": [
    {
      "pinyin": "rè",
      "meaning": "enthusiastic; popular (in compounds)",
      "example": {
        "text": "熱情；熱門",
        "pinyin": "rèqíng; rèmén",
        "meaning": "enthusiastic; popular"
      }
    }
  ],
  "帶": [
    {
      "pinyin": "dài",
      "meaning": "bring; take along; lead",
      "example": {
        "text": "帶朋友去",
        "pinyin": "dài péngyǒu qù",
        "meaning": "take a friend along"
      }
    },
    {
      "pinyin": "dài",
      "meaning": "belt; band; strip",
      "example": {
        "text": "皮帶",
        "pinyin": "pídài",
        "meaning": "belt"
      }
    }
  ],
  "塊": [
    {
      "pinyin": "kuài",
      "meaning": "piece; chunk; measure word for pieces",
      "example": {
        "text": "一塊蛋糕",
        "pinyin": "yí kuài dàngāo",
        "meaning": "a piece of cake"
      }
    }
  ],
  "多": [
    {
      "pinyin": "duō",
      "meaning": "many; much; more",
      "example": {
        "text": "很多人",
        "pinyin": "hěn duō rén",
        "meaning": "many people"
      }
    },
    {
      "pinyin": "duō",
      "meaning": "over; more than (after a number)",
      "example": {
        "text": "十多個",
        "pinyin": "shí duō ge",
        "meaning": "more than ten"
      }
    }
  ],
  "少": [
    {
      "pinyin": "shǎo",
      "meaning": "few; little; less",
      "example": {
        "text": "人很少。",
        "pinyin": "Rén hěn shǎo.",
        "meaning": "There are few people."
      }
    },
    {
      "pinyin": "shào",
      "meaning": "young (different tone, in compounds)",
      "example": {
        "text": "少年",
        "pinyin": "shàonián",
        "meaning": "youth; teenager"
      }
    }
  ],
  "共": [
    {
      "pinyin": "gòng",
      "meaning": "shared; together",
      "example": {
        "text": "共同",
        "pinyin": "gòngtóng",
        "meaning": "common; shared; together"
      }
    }
  ],
  "包": [
    {
      "pinyin": "bāo",
      "meaning": "bag; package; measure word for packages",
      "example": {
        "text": "一包茶",
        "pinyin": "yì bāo chá",
        "meaning": "a packet of tea"
      }
    },
    {
      "pinyin": "bāo",
      "meaning": "wrap; include",
      "example": {
        "text": "包起來；包括",
        "pinyin": "bāo qǐlái; bāokuò",
        "meaning": "wrap up; include"
      }
    }
  ],
  "幫": [
    {
      "pinyin": "bāng",
      "meaning": "help; assist",
      "example": {
        "text": "幫忙",
        "pinyin": "bāngmáng",
        "meaning": "help out"
      }
    }
  ],
  "微": [
    {
      "pinyin": "wéi",
      "meaning": "tiny; slight (in compounds)",
      "example": {
        "text": "微笑",
        "pinyin": "wéixiào",
        "meaning": "smile (literally a slight smile)"
      }
    }
  ],
  "手": [
    {
      "pinyin": "shǒu",
      "meaning": "person skilled in an activity (suffix)",
      "example": {
        "text": "歌手",
        "pinyin": "gēshǒu",
        "meaning": "singer"
      }
    }
  ],
  "機": [
    {
      "pinyin": "jī",
      "meaning": "opportunity (in compounds)",
      "example": {
        "text": "機會",
        "pinyin": "jīhuì",
        "meaning": "opportunity; chance"
      }
    }
  ],
  "支": [
    {
      "pinyin": "zhī",
      "meaning": "support (in compounds); classifier for slender objects",
      "example": {
        "text": "支持；一支筆",
        "pinyin": "zhīchí; yì zhī bǐ",
        "meaning": "support; one pen"
      }
    }
  ],
  "便": [
    {
      "pinyin": "biàn",
      "meaning": "convenient; convenient opportunity (different reading)",
      "example": {
        "text": "方便",
        "pinyin": "fāngbiàn",
        "meaning": "convenient"
      }
    }
  ],
  "宜": [
    {
      "pinyin": "yí",
      "meaning": "suitable; appropriate (in compounds)",
      "example": {
        "text": "適宜",
        "pinyin": "shìyí",
        "meaning": "suitable"
      }
    }
  ],
  "種": [
    {
      "pinyin": "zhòng",
      "meaning": "plant; grow (different tone)",
      "example": {
        "text": "種花",
        "pinyin": "zhòng huā",
        "meaning": "grow flowers"
      }
    }
  ],
  "了": [
    {
      "pinyin": "le",
      "meaning": "completed action (after a verb); not a general past-tense ending",
      "example": {
        "text": "我買了一本書。",
        "pinyin": "Wǒ mǎi le yì běn shū.",
        "meaning": "I bought a book."
      }
    },
    {
      "pinyin": "le",
      "meaning": "a new or changed situation (sentence-final)",
      "example": {
        "text": "下雨了。",
        "pinyin": "Xià yǔ le.",
        "meaning": "It has started raining."
      }
    },
    {
      "pinyin": "le",
      "meaning": "continuing up to now (with a duration and context)",
      "example": {
        "text": "我住這裡三年了。",
        "pinyin": "Wǒ zhù zhèlǐ sān nián le.",
        "meaning": "I've lived here for three years now."
      }
    },
    {
      "pinyin": "liǎo",
      "meaning": "understand (different reading, in compounds)",
      "example": {
        "text": "了解",
        "pinyin": "liǎojiě",
        "meaning": "understand"
      }
    },
    {
      "pinyin": "liǎo",
      "meaning": "manage to finish or do (in potential complements)",
      "example": {
        "text": "吃不了",
        "pinyin": "chī bù liǎo",
        "meaning": "cannot eat it all; cannot manage to eat it"
      }
    }
  ],
  "為": [
    {
      "pinyin": "wèi",
      "meaning": "for; for the sake of",
      "example": {
        "text": "為你",
        "pinyin": "wèi nǐ",
        "meaning": "for you"
      }
    },
    {
      "pinyin": "wéi",
      "meaning": "be; act as; become (different tone, often in compounds)",
      "example": {
        "text": "成為",
        "pinyin": "chéngwéi",
        "meaning": "become"
      }
    }
  ],
  "真": [
    {
      "pinyin": "zhēn",
      "meaning": "real; genuine",
      "example": {
        "text": "真的嗎？",
        "pinyin": "Zhēn de ma?",
        "meaning": "Really? / Is that true?"
      }
    }
  ],
  "名": [
    {
      "pinyin": "míng",
      "meaning": "measure word for people (more formal)",
      "example": {
        "text": "一名學生",
        "pinyin": "yì míng xuéshēng",
        "meaning": "one student"
      }
    }
  ],
  "點": [
    {
      "pinyin": "diǎn",
      "meaning": "point; dot; a little",
      "example": {
        "text": "一點水",
        "pinyin": "yì diǎn shuǐ",
        "meaning": "a little water"
      }
    },
    {
      "pinyin": "diǎn",
      "meaning": "o'clock (after a number)",
      "example": {
        "text": "三點",
        "pinyin": "sān diǎn",
        "meaning": "three o'clock"
      }
    },
    {
      "pinyin": "diǎn",
      "meaning": "click; tap; light or ignite",
      "example": {
        "text": "點一下",
        "pinyin": "diǎn yí xià",
        "meaning": "tap once"
      }
    }
  ],
  "怕": [
    {
      "pinyin": "pà",
      "meaning": "be afraid that; worry that",
      "example": {
        "text": "我怕會下雨。",
        "pinyin": "Wǒ pà huì xià yǔ.",
        "meaning": "I'm worried it will rain."
      }
    }
  ],
  "所": [
    {
      "pinyin": "suǒ",
      "meaning": "place; institution (usually in compounds)",
      "example": {
        "text": "廁所",
        "pinyin": "cèsuǒ",
        "meaning": "toilet; restroom"
      }
    },
    {
      "pinyin": "suǒ",
      "meaning": "measure word for schools and institutions",
      "example": {
        "text": "一所學校",
        "pinyin": "yì suǒ xuéxiào",
        "meaning": "one school"
      }
    }
  ],
  "自": [
    {
      "pinyin": "zì",
      "meaning": "from; since",
      "example": {
        "text": "來自臺灣",
        "pinyin": "láizì Táiwān",
        "meaning": "come from Taiwan"
      }
    }
  ],
  "甜": [
    {
      "pinyin": "tián",
      "meaning": "sweet-tasting; sweet or pleasant",
      "example": {
        "text": "很甜",
        "pinyin": "hěn tián",
        "meaning": "very sweet"
      }
    }
  ],
  "教": [
    {
      "pinyin": "jiào",
      "meaning": "teaching; religion (different tone, in compounds)",
      "example": {
        "text": "教育",
        "pinyin": "jiàoyù",
        "meaning": "education"
      }
    }
  ],
  "籠": [
    {
      "pinyin": "lóng",
      "meaning": "cage",
      "example": {
        "text": "鳥籠",
        "pinyin": "niǎolóng",
        "meaning": "birdcage"
      }
    }
  ],
  "腐": [
    {
      "pinyin": "fǔ",
      "meaning": "rot; decay (in compounds)",
      "example": {
        "text": "腐爛",
        "pinyin": "fǔlàn",
        "meaning": "rot; decay"
      }
    }
  ],
  "知": [
    {
      "pinyin": "zhī",
      "meaning": "know; knowledge (in compounds)",
      "example": {
        "text": "知識",
        "pinyin": "zhīshì",
        "meaning": "knowledge"
      }
    }
  ],
  "道": [
    {
      "pinyin": "dào",
      "meaning": "measure word for questions or dishes",
      "example": {
        "text": "一道題；一道菜",
        "pinyin": "yí dào tí; yí dào cài",
        "meaning": "one question; one dish"
      }
    }
  ],
  "定": [
    {
      "pinyin": "dìng",
      "meaning": "decide; settle",
      "example": {
        "text": "決定",
        "pinyin": "juédìng",
        "meaning": "decide; decision"
      }
    }
  ],
  "現": [
    {
      "pinyin": "xiàn",
      "meaning": "appear; show up (in compounds)",
      "example": {
        "text": "出現",
        "pinyin": "chūxiàn",
        "meaning": "appear"
      }
    }
  ],
  "風": [
    {
      "pinyin": "fēng",
      "meaning": "style; manner (in compounds)",
      "example": {
        "text": "風格",
        "pinyin": "fēnggé",
        "meaning": "style"
      }
    }
  ],
  "美": [
    {
      "pinyin": "měi",
      "meaning": "America / American (abbreviation in compounds)",
      "example": {
        "text": "美國",
        "pinyin": "Měiguó",
        "meaning": "the United States"
      }
    }
  ],
  "地": [
    {
      "pinyin": "dì",
      "meaning": "land; earth; place",
      "example": {
        "text": "地上",
        "pinyin": "dì shàng",
        "meaning": "on the ground"
      }
    },
    {
      "pinyin": "de",
      "meaning": "links a description to an action (neutral tone)",
      "example": {
        "text": "慢慢地走",
        "pinyin": "mànmàn de zǒu",
        "meaning": "walk slowly"
      }
    }
  ],
  "方": [
    {
      "pinyin": "fāng",
      "meaning": "square",
      "example": {
        "text": "正方形",
        "pinyin": "zhèngfāngxíng",
        "meaning": "square shape"
      }
    },
    {
      "pinyin": "fāng",
      "meaning": "method; side or party (in compounds)",
      "example": {
        "text": "方法；雙方",
        "pinyin": "fāngfǎ; shuāngfāng",
        "meaning": "method; both sides"
      }
    }
  ],
  "面": [
    {
      "pinyin": "miàn",
      "meaning": "face; surface",
      "example": {
        "text": "見面；表面",
        "pinyin": "jiànmiàn; biǎomiàn",
        "meaning": "meet; surface"
      }
    }
  ],
  "圖": [
    {
      "pinyin": "tú",
      "meaning": "map; diagram",
      "example": {
        "text": "地圖",
        "pinyin": "dìtú",
        "meaning": "map"
      }
    }
  ],
  "找": [
    {
      "pinyin": "zhǎo",
      "meaning": "give change (money)",
      "example": {
        "text": "找你十塊。",
        "pinyin": "Zhǎo nǐ shí kuài.",
        "meaning": "Here's ten dollars in change."
      }
    }
  ],
  "下": [
    {
      "pinyin": "xià",
      "meaning": "down; descend; get off",
      "example": {
        "text": "下樓；下車",
        "pinyin": "xià lóu; xià chē",
        "meaning": "go downstairs; get off a vehicle"
      }
    },
    {
      "pinyin": "xià",
      "meaning": "finish class or work",
      "example": {
        "text": "下課；下班",
        "pinyin": "xià kè; xià bān",
        "meaning": "finish class; get off work"
      }
    },
    {
      "pinyin": "xià",
      "meaning": "fall (rain or snow)",
      "example": {
        "text": "下雨",
        "pinyin": "xià yǔ",
        "meaning": "rain; to rain"
      }
    },
    {
      "pinyin": "xià",
      "meaning": "a time or brief action (after a verb/number)",
      "example": {
        "text": "看一下",
        "pinyin": "kàn yí xià",
        "meaning": "take a quick look"
      }
    }
  ],
  "分": [
    {
      "pinyin": "fēn",
      "meaning": "divide; separate",
      "example": {
        "text": "分開",
        "pinyin": "fēnkāi",
        "meaning": "separate"
      }
    },
    {
      "pinyin": "fēn",
      "meaning": "point; score unit",
      "example": {
        "text": "九十分",
        "pinyin": "jiǔshí fēn",
        "meaning": "ninety points"
      }
    },
    {
      "pinyin": "fèn",
      "meaning": "share; part (different tone)",
      "example": {
        "text": "身分",
        "pinyin": "shēnfèn",
        "meaning": "identity; status"
      }
    }
  ],
  "候": [
    {
      "pinyin": "hòu",
      "meaning": "wait; await",
      "example": {
        "text": "等候",
        "pinyin": "děnghòu",
        "meaning": "wait for"
      }
    }
  ],
  "空": [
    {
      "pinyin": "kōng",
      "meaning": "empty; sky or air (different tone)",
      "example": {
        "text": "空杯子；天空",
        "pinyin": "kōng bēizi; tiānkōng",
        "meaning": "empty cup; sky"
      }
    }
  ],
  "次": [
    {
      "pinyin": "cì",
      "meaning": "next; secondary",
      "example": {
        "text": "下次；其次",
        "pinyin": "xià cì; qícì",
        "meaning": "next time; next / secondly"
      }
    }
  ],
  "對": [
    {
      "pinyin": "duì",
      "meaning": "pair; measure word for pairs",
      "example": {
        "text": "一對朋友",
        "pinyin": "yí duì péngyǒu",
        "meaning": "a pair of friends"
      }
    },
    {
      "pinyin": "duì",
      "meaning": "to; toward; concerning",
      "example": {
        "text": "對我很好",
        "pinyin": "duì wǒ hěn hǎo",
        "meaning": "treat me very well"
      }
    }
  ],
  "比": [
    {
      "pinyin": "bǐ",
      "meaning": "than (comparison marker)",
      "example": {
        "text": "比我高",
        "pinyin": "bǐ wǒ gāo",
        "meaning": "taller than me"
      }
    }
  ],
  "結": [
    {
      "pinyin": "jié",
      "meaning": "form; conclude (in compounds)",
      "example": {
        "text": "結果；結婚",
        "pinyin": "jiéguǒ; jiéhūn",
        "meaning": "result; get married"
      }
    }
  ],
  "束": [
    {
      "pinyin": "shù",
      "meaning": "measure word for bunches",
      "example": {
        "text": "一束花",
        "pinyin": "yí shù huā",
        "meaning": "a bouquet of flowers"
      }
    }
  ],
  "開": [
    {
      "pinyin": "kāi",
      "meaning": "drive; operate",
      "example": {
        "text": "開車",
        "pinyin": "kāi chē",
        "meaning": "drive a car"
      }
    },
    {
      "pinyin": "kāi",
      "meaning": "switch on; turn on",
      "example": {
        "text": "開燈",
        "pinyin": "kāi dēng",
        "meaning": "turn on the light"
      }
    },
    {
      "pinyin": "kāi",
      "meaning": "hold a meeting; run a business",
      "example": {
        "text": "開會；開店",
        "pinyin": "kāi huì; kāi diàn",
        "meaning": "hold a meeting; run a shop"
      }
    }
  ],
  "等": [
    {
      "pinyin": "děng",
      "meaning": "and so on; etc.",
      "example": {
        "text": "茶、咖啡等",
        "pinyin": "chá, kāfēi děng",
        "meaning": "tea, coffee, and so on"
      }
    },
    {
      "pinyin": "děng",
      "meaning": "equal; level or grade (in compounds)",
      "example": {
        "text": "等於",
        "pinyin": "děngyú",
        "meaning": "equal to"
      }
    }
  ],
  "事": [
    {
      "pinyin": "shì",
      "meaning": "event; affair; problem",
      "example": {
        "text": "沒事。",
        "pinyin": "Méi shì.",
        "meaning": "Nothing's wrong. / It's okay."
      }
    }
  ],
  "火": [
    {
      "pinyin": "huǒ",
      "meaning": "anger; become angry (in compounds)",
      "example": {
        "text": "發火",
        "pinyin": "fāhuǒ",
        "meaning": "lose one's temper"
      }
    }
  ],
  "跟": [
    {
      "pinyin": "gēn",
      "meaning": "to (a person addressed)",
      "example": {
        "text": "跟他說",
        "pinyin": "gēn tā shuō",
        "meaning": "say it to him; tell him"
      }
    },
    {
      "pinyin": "gēn",
      "meaning": "heel (in compounds)",
      "example": {
        "text": "腳跟",
        "pinyin": "jiǎogēn",
        "meaning": "heel"
      }
    }
  ],
  "快": [
    {
      "pinyin": "kuài",
      "meaning": "soon; almost",
      "example": {
        "text": "快到了。",
        "pinyin": "Kuài dào le.",
        "meaning": "Almost there."
      }
    },
    {
      "pinyin": "kuài",
      "meaning": "happy; pleasant (in compounds)",
      "example": {
        "text": "快樂",
        "pinyin": "kuàilè",
        "meaning": "happy"
      }
    }
  ],
  "服": [
    {
      "pinyin": "fú",
      "meaning": "take medicine; comply with or be convinced",
      "example": {
        "text": "服藥；不服",
        "pinyin": "fú yào; bù fú",
        "meaning": "take medicine; not accept / be unconvinced"
      }
    }
  ],
  "參": [
    {
      "pinyin": "shēn",
      "meaning": "ginseng (different reading)",
      "example": {
        "text": "人參",
        "pinyin": "rénshēn",
        "meaning": "ginseng"
      }
    }
  ],
  "觀": [
    {
      "pinyin": "guān",
      "meaning": "view; outlook (in compounds)",
      "example": {
        "text": "觀點",
        "pinyin": "guāndiǎn",
        "meaning": "viewpoint"
      }
    }
  ],
  "載": [
    {
      "pinyin": "zǎi",
      "meaning": "record; year (different tone, in compounds)",
      "example": {
        "text": "記載",
        "pinyin": "jìzǎi",
        "meaning": "record; written account"
      }
    }
  ],
  "公": [
    {
      "pinyin": "gōng",
      "meaning": "fair; impartial (in compounds)",
      "example": {
        "text": "公平",
        "pinyin": "gōngpíng",
        "meaning": "fair; fairness"
      }
    },
    {
      "pinyin": "gōng",
      "meaning": "male (for animals)",
      "example": {
        "text": "公貓",
        "pinyin": "gōng māo",
        "meaning": "male cat"
      }
    }
  ],
  "計": [
    {
      "pinyin": "jì",
      "meaning": "plan; calculate (in compounds)",
      "example": {
        "text": "計畫；計算",
        "pinyin": "jìhuà; jìsuàn",
        "meaning": "plan; calculate"
      }
    }
  ],
  "差": [
    {
      "pinyin": "chà",
      "meaning": "poor; bad",
      "example": {
        "text": "很差",
        "pinyin": "hěn chà",
        "meaning": "very poor; very bad"
      }
    },
    {
      "pinyin": "chā",
      "meaning": "difference (different tone, in compounds)",
      "example": {
        "text": "差別",
        "pinyin": "chābié",
        "meaning": "difference"
      }
    },
    {
      "pinyin": "chāi",
      "meaning": "an assignment; official business (different reading)",
      "example": {
        "text": "出差",
        "pinyin": "chūchāi",
        "meaning": "go on a business trip"
      }
    }
  ],
  "代": [
    {
      "pinyin": "dài",
      "meaning": "replace; act on behalf of",
      "example": {
        "text": "代替",
        "pinyin": "dàitì",
        "meaning": "replace; substitute for"
      }
    }
  ],
  "假": [
    {
      "pinyin": "jiǎ",
      "meaning": "fake; false (different tone)",
      "example": {
        "text": "假的",
        "pinyin": "jiǎ de",
        "meaning": "fake; not real"
      }
    }
  ],
  "放": [
    {
      "pinyin": "fàng",
      "meaning": "put down; let go; allow",
      "example": {
        "text": "放在這裡",
        "pinyin": "fàng zài zhèlǐ",
        "meaning": "put it here"
      }
    }
  ],
  "回": [
    {
      "pinyin": "huí",
      "meaning": "reply; respond",
      "example": {
        "text": "回答",
        "pinyin": "huídá",
        "meaning": "answer; respond"
      }
    },
    {
      "pinyin": "huí",
      "meaning": "time; occurrence (measure word)",
      "example": {
        "text": "一回事",
        "pinyin": "yì huí shì",
        "meaning": "one matter; one and the same thing"
      }
    }
  ],
  "出": [
    {
      "pinyin": "chū",
      "meaning": "produce; publish; bring out",
      "example": {
        "text": "出版",
        "pinyin": "chūbǎn",
        "meaning": "publish"
      }
    }
  ],
  "算": [
    {
      "pinyin": "suàn",
      "meaning": "count as; be considered",
      "example": {
        "text": "算便宜。",
        "pinyin": "Suàn piányí.",
        "meaning": "That counts as inexpensive."
      }
    }
  ],
  "功": [
    {
      "pinyin": "gōng",
      "meaning": "merit; success (in compounds)",
      "example": {
        "text": "成功",
        "pinyin": "chénggōng",
        "meaning": "succeed; success"
      }
    }
  ],
  "應": [
    {
      "pinyin": "yìng",
      "meaning": "respond; agree (different tone)",
      "example": {
        "text": "回應；答應",
        "pinyin": "huíyìng; dāyìng",
        "meaning": "respond; agree / promise"
      }
    }
  ],
  "該": [
    {
      "pinyin": "gāi",
      "meaning": "be someone's turn; ought to",
      "example": {
        "text": "該你了。",
        "pinyin": "Gāi nǐ le.",
        "meaning": "It's your turn."
      }
    }
  ],
  "別": [
    {
      "pinyin": "bié",
      "meaning": "don't (before a verb)",
      "example": {
        "text": "別走。",
        "pinyin": "Bié zǒu.",
        "meaning": "Don't leave."
      }
    }
  ],
  "頭": [
    {
      "pinyin": "tóu",
      "meaning": "beginning; head; leader",
      "example": {
        "text": "開頭",
        "pinyin": "kāitóu",
        "meaning": "beginning"
      }
    },
    {
      "pinyin": "tóu",
      "meaning": "measure word for large animals",
      "example": {
        "text": "一頭牛",
        "pinyin": "yì tóu niú",
        "meaning": "one cow"
      }
    }
  ],
  "非": [
    {
      "pinyin": "fēi",
      "meaning": "must (in 非…不可)",
      "example": {
        "text": "非去不可",
        "pinyin": "fēi qù bù kě",
        "meaning": "must go"
      }
    }
  ],
  "站": [
    {
      "pinyin": "zhàn",
      "meaning": "stand",
      "example": {
        "text": "站起來",
        "pinyin": "zhàn qǐlái",
        "meaning": "stand up"
      }
    }
  ],
  "號": [
    {
      "pinyin": "hào",
      "meaning": "number; size; label",
      "example": {
        "text": "電話號碼",
        "pinyin": "diànhuà hàomǎ",
        "meaning": "telephone number"
      }
    },
    {
      "pinyin": "háo",
      "meaning": "wail; howl (different tone)",
      "example": {
        "text": "號哭",
        "pinyin": "háokū",
        "meaning": "wail; cry loudly"
      }
    }
  ],
  "就": [
    {
      "pinyin": "jiù",
      "meaning": "as early as; already (earlier than expected)",
      "example": {
        "text": "他六點就來了。",
        "pinyin": "Tā liù diǎn jiù lái le.",
        "meaning": "He came as early as six."
      }
    },
    {
      "pinyin": "jiù",
      "meaning": "only; just (restricting an amount or choice)",
      "example": {
        "text": "就一個。",
        "pinyin": "Jiù yí ge.",
        "meaning": "Just one."
      }
    },
    {
      "pinyin": "jiù",
      "meaning": "immediately; then (linking closely following actions)",
      "example": {
        "text": "吃了就走。",
        "pinyin": "Chī le jiù zǒu.",
        "meaning": "Leave right after eating."
      }
    }
  ],
  "色": [
    {
      "pinyin": "sè",
      "meaning": "appearance; complexion (in compounds)",
      "example": {
        "text": "臉色",
        "pinyin": "liǎnsè",
        "meaning": "facial color; complexion"
      }
    }
  ],
  "給": [
    {
      "pinyin": "gěi",
      "meaning": "to (recipient of an action)",
      "example": {
        "text": "打電話給我",
        "pinyin": "dǎ diànhuà gěi wǒ",
        "meaning": "call me"
      }
    }
  ],
  "紅": [
    {
      "pinyin": "hóng",
      "meaning": "popular; famous",
      "example": {
        "text": "很紅的歌手",
        "pinyin": "hěn hóng de gēshǒu",
        "meaning": "a very popular singer"
      }
    }
  ],
  "穿": [
    {
      "pinyin": "chuān",
      "meaning": "pass through; pierce",
      "example": {
        "text": "穿過",
        "pinyin": "chuānguò",
        "meaning": "pass through"
      }
    }
  ],
  "住": [
    {
      "pinyin": "zhù",
      "meaning": "hold firmly; stay fixed (after a verb)",
      "example": {
        "text": "記住",
        "pinyin": "jìzhù",
        "meaning": "remember firmly; keep in mind"
      }
    }
  ],
  "乾": [
    {
      "pinyin": "gān",
      "meaning": "dry out; use up (in compounds)",
      "example": {
        "text": "喝乾",
        "pinyin": "hē gān",
        "meaning": "drink dry; drink it all"
      }
    }
  ],
  "淨": [
    {
      "pinyin": "jìng",
      "meaning": "net; remaining after deductions",
      "example": {
        "text": "淨重",
        "pinyin": "jìngzhòng",
        "meaning": "net weight"
      }
    }
  ],
  "間": [
    {
      "pinyin": "jiān",
      "meaning": "between; among; space or time",
      "example": {
        "text": "中間；時間",
        "pinyin": "zhōngjiān; shíjiān",
        "meaning": "middle; time"
      }
    },
    {
      "pinyin": "jiàn",
      "meaning": "gap; interval (different tone, in compounds)",
      "example": {
        "text": "間隔",
        "pinyin": "jiàngé",
        "meaning": "interval; space between"
      }
    }
  ],
  "套": [
    {
      "pinyin": "tào",
      "meaning": "measure word for sets; put over or around",
      "example": {
        "text": "一套衣服",
        "pinyin": "yí tào yīfu",
        "meaning": "a set of clothes"
      }
    }
  ],
  "進": [
    {
      "pinyin": "jìn",
      "meaning": "advance; improve (in compounds)",
      "example": {
        "text": "進步",
        "pinyin": "jìnbù",
        "meaning": "improve; progress"
      }
    }
  ],
  "收": [
    {
      "pinyin": "shōu",
      "meaning": "put away; gather in",
      "example": {
        "text": "收起來",
        "pinyin": "shōu qǐlái",
        "meaning": "put away"
      }
    }
  ],
  "經": [
    {
      "pinyin": "jīng",
      "meaning": "experience; manage (in compounds)",
      "example": {
        "text": "經驗；經營",
        "pinyin": "jīngyàn; jīngyíng",
        "meaning": "experience; manage / run a business"
      }
    }
  ],
  "像": [
    {
      "pinyin": "xiàng",
      "meaning": "image; statue (noun, often in compounds)",
      "example": {
        "text": "影像",
        "pinyin": "yǐngxiàng",
        "meaning": "image; visual recording"
      }
    }
  ],
  "裝": [
    {
      "pinyin": "zhuāng",
      "meaning": "pack; fill",
      "example": {
        "text": "裝水",
        "pinyin": "zhuāng shuǐ",
        "meaning": "fill with water"
      }
    },
    {
      "pinyin": "zhuāng",
      "meaning": "pretend",
      "example": {
        "text": "裝忙",
        "pinyin": "zhuāng máng",
        "meaning": "pretend to be busy"
      }
    }
  ],
  "過": [
    {
      "pinyin": "guò",
      "meaning": "past experience (after a verb)",
      "example": {
        "text": "我去過臺灣。",
        "pinyin": "Wǒ qù guò Táiwān.",
        "meaning": "I've been to Taiwan."
      }
    },
    {
      "pinyin": "guò",
      "meaning": "cross; pass; spend time",
      "example": {
        "text": "過馬路；過年",
        "pinyin": "guò mǎlù; guò nián",
        "meaning": "cross the road; celebrate the New Year"
      }
    },
    {
      "pinyin": "guò",
      "meaning": "too; excessively (in compounds)",
      "example": {
        "text": "過多",
        "pinyin": "guò duō",
        "meaning": "too many; excessive"
      }
    }
  ],
  "關": [
    {
      "pinyin": "guān",
      "meaning": "close; switch off",
      "example": {
        "text": "關門；關燈",
        "pinyin": "guān mén; guān dēng",
        "meaning": "close the door; turn off the light"
      }
    },
    {
      "pinyin": "guān",
      "meaning": "pass; checkpoint; stage",
      "example": {
        "text": "過關",
        "pinyin": "guò guān",
        "meaning": "pass a checkpoint or challenge"
      }
    }
  ],
  "臺": [
    {
      "pinyin": "tái",
      "meaning": "measure word for machines and vehicles",
      "example": {
        "text": "一臺電腦",
        "pinyin": "yì tái diànnǎo",
        "meaning": "one computer"
      }
    }
  ],
  "畫": [
    {
      "pinyin": "huà",
      "meaning": "picture; painting (noun)",
      "example": {
        "text": "一幅畫",
        "pinyin": "yì fú huà",
        "meaning": "a painting"
      }
    }
  ],
  "成": [
    {
      "pinyin": "chéng",
      "meaning": "succeed; become",
      "example": {
        "text": "成功；變成",
        "pinyin": "chénggōng; biànchéng",
        "meaning": "succeed; turn into"
      }
    }
  ],
  "費": [
    {
      "pinyin": "fèi",
      "meaning": "cost; expend",
      "example": {
        "text": "費時間",
        "pinyin": "fèi shíjiān",
        "meaning": "take time; be time-consuming"
      }
    }
  ],
  "望": [
    {
      "pinyin": "wàng",
      "meaning": "look toward; gaze",
      "example": {
        "text": "望著窗外",
        "pinyin": "wàng zhe chuāng wài",
        "meaning": "look out of the window"
      }
    }
  ],
  "累": [
    {
      "pinyin": "lěi",
      "meaning": "accumulate (different tone, in compounds)",
      "example": {
        "text": "累積",
        "pinyin": "lěijī",
        "meaning": "accumulate"
      }
    }
  ],
  "油": [
    {
      "pinyin": "yóu",
      "meaning": "gasoline; fuel",
      "example": {
        "text": "加油",
        "pinyin": "jiā yóu",
        "meaning": "refuel (also used as encouragement)"
      }
    }
  ],
  "難": [
    {
      "pinyin": "nàn",
      "meaning": "disaster; adversity (different tone)",
      "example": {
        "text": "災難",
        "pinyin": "zāinàn",
        "meaning": "disaster"
      }
    }
  ],
  "當": [
    {
      "pinyin": "dāng",
      "meaning": "when; at the time of",
      "example": {
        "text": "當時",
        "pinyin": "dāngshí",
        "meaning": "at that time"
      }
    },
    {
      "pinyin": "dàng",
      "meaning": "appropriate; treat as (different tone)",
      "example": {
        "text": "適當；當作",
        "pinyin": "shìdàng; dàngzuò",
        "meaning": "appropriate; regard as"
      }
    }
  ],
  "交": [
    {
      "pinyin": "jiāo",
      "meaning": "make friends; pay or hand in",
      "example": {
        "text": "交朋友；交作業",
        "pinyin": "jiāo péngyǒu; jiāo zuòyè",
        "meaning": "make friends; hand in homework"
      }
    }
  ],
  "氣": [
    {
      "pinyin": "qì",
      "meaning": "anger; mood (in compounds)",
      "example": {
        "text": "生氣",
        "pinyin": "shēngqì",
        "meaning": "be angry"
      }
    }
  ],
  "門": [
    {
      "pinyin": "mén",
      "meaning": "measure word for courses or skills",
      "example": {
        "text": "一門課",
        "pinyin": "yì mén kè",
        "meaning": "one course"
      }
    }
  ],
  "傳": [
    {
      "pinyin": "zhuàn",
      "meaning": "biography (different reading)",
      "example": {
        "text": "自傳",
        "pinyin": "zìzhuàn",
        "meaning": "autobiography"
      }
    }
  ],
  "輕": [
    {
      "pinyin": "qīng",
      "meaning": "gentle; slight; not serious",
      "example": {
        "text": "輕輕地",
        "pinyin": "qīngqīng de",
        "meaning": "gently"
      }
    }
  ],
  "部": [
    {
      "pinyin": "bù",
      "meaning": "measure word for films and some machines",
      "example": {
        "text": "一部電影",
        "pinyin": "yí bù diànyǐng",
        "meaning": "one film"
      }
    }
  ],
  "冷": [
    {
      "pinyin": "lěng",
      "meaning": "unfriendly; unpopular or little-known (in compounds)",
      "example": {
        "text": "冷淡；冷門",
        "pinyin": "lěngdàn; lěngmén",
        "meaning": "indifferent; unpopular / niche"
      }
    }
  ],
  "聞": [
    {
      "pinyin": "wén",
      "meaning": "smell; sniff",
      "example": {
        "text": "聞一下",
        "pinyin": "wén yí xià",
        "meaning": "have a sniff"
      }
    }
  ],
  "更": [
    {
      "pinyin": "gēng",
      "meaning": "change; replace (different tone, in compounds)",
      "example": {
        "text": "更改",
        "pinyin": "gēnggǎi",
        "meaning": "change; alter"
      }
    }
  ],
  "發": [
    {
      "pinyin": "fā",
      "meaning": "send; issue",
      "example": {
        "text": "發訊息",
        "pinyin": "fā xùnxí",
        "meaning": "send a message"
      }
    },
    {
      "pinyin": "fā",
      "meaning": "happen; discover (in compounds)",
      "example": {
        "text": "發生；發現",
        "pinyin": "fāshēng; fāxiàn",
        "meaning": "happen; discover"
      }
    }
  ],
  "燒": [
    {
      "pinyin": "shāo",
      "meaning": "cook by heating",
      "example": {
        "text": "燒水",
        "pinyin": "shāo shuǐ",
        "meaning": "heat / boil water"
      }
    }
  ],
  "冒": [
    {
      "pinyin": "mào",
      "meaning": "emerge; emit",
      "example": {
        "text": "冒煙",
        "pinyin": "mào yān",
        "meaning": "give off smoke"
      }
    },
    {
      "pinyin": "mào",
      "meaning": "risk; brave",
      "example": {
        "text": "冒險",
        "pinyin": "màoxiǎn",
        "meaning": "take a risk; adventure"
      }
    }
  ],
  "局": [
    {
      "pinyin": "jú",
      "meaning": "game; round (measure word)",
      "example": {
        "text": "一局比賽",
        "pinyin": "yì jú bǐsài",
        "meaning": "one game / round of a match"
      }
    }
  ],
  "把": [
    {
      "pinyin": "bǎ",
      "meaning": "measure word for handled objects and handfuls",
      "example": {
        "text": "一把傘",
        "pinyin": "yì bǎ sǎn",
        "meaning": "one umbrella"
      }
    },
    {
      "pinyin": "bǎ",
      "meaning": "grasp; hold (often in compounds)",
      "example": {
        "text": "把握",
        "pinyin": "bǎwò",
        "meaning": "grasp; confidence / certainty"
      }
    }
  ],
  "息": [
    {
      "pinyin": "xí",
      "meaning": "news; information; interest on money (in compounds)",
      "example": {
        "text": "消息；利息",
        "pinyin": "xiāoxí; lìxí",
        "meaning": "news; interest"
      }
    }
  ],
  "吐": [
    {
      "pinyin": "tǔ",
      "meaning": "spit out; stick out (different tone)",
      "example": {
        "text": "吐舌頭",
        "pinyin": "tǔ shétou",
        "meaning": "stick out one's tongue"
      }
    }
  ],
  "冰": [
    {
      "pinyin": "bīng",
      "meaning": "chill; put in the fridge (common Taiwan usage)",
      "example": {
        "text": "把水冰起來。",
        "pinyin": "Bǎ shuǐ bīng qǐlái.",
        "meaning": "Put the water in the fridge to chill."
      }
    }
  ],
  "迷": [
    {
      "pinyin": "mí",
      "meaning": "fan; enthusiast",
      "example": {
        "text": "球迷",
        "pinyin": "qiúmí",
        "meaning": "sports fan"
      }
    },
    {
      "pinyin": "mí",
      "meaning": "be fascinated by",
      "example": {
        "text": "迷上音樂",
        "pinyin": "mí shàng yīnyuè",
        "meaning": "become fascinated with music"
      }
    }
  ],
  "平": [
    {
      "pinyin": "píng",
      "meaning": "flat; even; equal",
      "example": {
        "text": "公平；平地",
        "pinyin": "gōngpíng; píngdì",
        "meaning": "fair; flat ground"
      }
    }
  ],
  "段": [
    {
      "pinyin": "duàn",
      "meaning": "measure word for stretches of time, text or road",
      "example": {
        "text": "一段時間",
        "pinyin": "yí duàn shíjiān",
        "meaning": "a period of time"
      }
    }
  ],
  "告": [
    {
      "pinyin": "gào",
      "meaning": "accuse; sue (in legal contexts)",
      "example": {
        "text": "告他",
        "pinyin": "gào tā",
        "meaning": "sue him; report him"
      }
    }
  ],
  "訴": [
    {
      "pinyin": "sù",
      "meaning": "complain; appeal (in compounds)",
      "example": {
        "text": "投訴",
        "pinyin": "tóusù",
        "meaning": "make a complaint"
      }
    }
  ],
  "提": [
    {
      "pinyin": "tí",
      "meaning": "mention; bring up",
      "example": {
        "text": "提問題",
        "pinyin": "tí wèntí",
        "meaning": "raise a question"
      }
    }
  ],
  "款": [
    {
      "pinyin": "kuǎn",
      "meaning": "style; model (measure word)",
      "example": {
        "text": "這款手機",
        "pinyin": "zhè kuǎn shǒujī",
        "meaning": "this model of phone"
      }
    }
  ],
  "著": [
    {
      "pinyin": "zháo",
      "meaning": "reach a result or state (different reading)",
      "example": {
        "text": "睡著",
        "pinyin": "shuìzháo",
        "meaning": "fall asleep"
      }
    },
    {
      "pinyin": "zhuó",
      "meaning": "wear; touch upon (different reading, in compounds)",
      "example": {
        "text": "穿著",
        "pinyin": "chuānzhuó",
        "meaning": "attire; clothing (as a noun)"
      }
    },
    {
      "pinyin": "zhù",
      "meaning": "write; work of writing; notable (different reading)",
      "example": {
        "text": "著作；著名",
        "pinyin": "zhùzuò; zhùmíng",
        "meaning": "written work; famous"
      }
    }
  ],
  "品": [
    {
      "pinyin": "pǐn",
      "meaning": "taste; sample",
      "example": {
        "text": "品茶",
        "pinyin": "pǐn chá",
        "meaning": "taste tea"
      }
    }
  ],
  "背": [
    {
      "pinyin": "bèi",
      "meaning": "back (body part); behind (different tone)",
      "example": {
        "text": "背後",
        "pinyin": "bèi hòu",
        "meaning": "behind; at the back"
      }
    },
    {
      "pinyin": "bèi",
      "meaning": "memorize; recite (different tone)",
      "example": {
        "text": "背課文",
        "pinyin": "bèi kèwén",
        "meaning": "memorize / recite a lesson text"
      }
    }
  ],
  "正": [
    {
      "pinyin": "zhèng",
      "meaning": "correct; upright",
      "example": {
        "text": "正確",
        "pinyin": "zhèngquè",
        "meaning": "correct; accurate"
      }
    },
    {
      "pinyin": "zhèng",
      "meaning": "in the middle of doing (before a verb)",
      "example": {
        "text": "正在吃飯",
        "pinyin": "zhèngzài chīfàn",
        "meaning": "be eating right now"
      }
    }
  ],
  "筆": [
    {
      "pinyin": "bǐ",
      "meaning": "measure word for sums of money or transactions",
      "example": {
        "text": "一筆錢",
        "pinyin": "yì bǐ qián",
        "meaning": "a sum of money"
      }
    }
  ],
  "學": [
    {
      "pinyin": "xué",
      "meaning": "imitate; learn from someone",
      "example": {
        "text": "學他說話",
        "pinyin": "xué tā shuōhuà",
        "meaning": "imitate the way he talks"
      }
    }
  ],
  "謝": [
    {
      "pinyin": "xiè",
      "meaning": "wither; fade (in compounds)",
      "example": {
        "text": "凋謝",
        "pinyin": "diāoxiè",
        "meaning": "wither (of flowers)"
      }
    }
  ],
  "書": [
    {
      "pinyin": "shū",
      "meaning": "write (in compounds); written document",
      "example": {
        "text": "書寫；證書",
        "pinyin": "shūxiě; zhèngshū",
        "meaning": "write; certificate"
      }
    }
  ],
  "說": [
    {
      "pinyin": "shuì",
      "meaning": "persuade (different reading, in a fixed compound)",
      "example": {
        "text": "遊說",
        "pinyin": "yóushuì",
        "meaning": "lobby; try to persuade"
      }
    }
  ],
  "房": [
    {
      "pinyin": "fáng",
      "meaning": "room; building",
      "example": {
        "text": "房間；廚房",
        "pinyin": "fángjiān; chúfáng",
        "meaning": "room; kitchen"
      }
    }
  ],
  "常": [
    {
      "pinyin": "cháng",
      "meaning": "usual; normal; regular",
      "example": {
        "text": "正常",
        "pinyin": "zhèngcháng",
        "meaning": "normal"
      }
    }
  ],
  "啊": [
    {
      "pinyin": "a",
      "meaning": "expresses realization, surprise, or emphasis",
      "example": {
        "text": "原來是你啊！",
        "pinyin": "Yuánlái shì nǐ a!",
        "meaning": "Oh, it's you!"
      }
    }
  ],
  "從": [
    {
      "pinyin": "cóng",
      "meaning": "follow; comply with (often in compounds)",
      "example": {
        "text": "服從",
        "pinyin": "fúcóng",
        "meaning": "obey; comply with"
      }
    }
  ],
  "亮": [
    {
      "pinyin": "liàng",
      "meaning": "shine; light up",
      "example": {
        "text": "燈亮了。",
        "pinyin": "Dēng liàng le.",
        "meaning": "The light came on."
      }
    }
  ],
  "用": [
    {
      "pinyin": "yòng",
      "meaning": "need (in 不用); spend or use up",
      "example": {
        "text": "不用去。",
        "pinyin": "Bú yòng qù.",
        "meaning": "No need to go."
      }
    }
  ],
  "零": [
    {
      "pinyin": "líng",
      "meaning": "small or scattered amounts (in compounds)",
      "example": {
        "text": "零錢",
        "pinyin": "língqián",
        "meaning": "small change"
      }
    }
  ],
  "貴": [
    {
      "pinyin": "guì",
      "meaning": "valuable; honored (polite address)",
      "example": {
        "text": "貴姓",
        "pinyin": "guìxìng",
        "meaning": "your surname (polite)"
      }
    }
  ],
  "錯": [
    {
      "pinyin": "cuò",
      "meaning": "miss; pass by without catching (in compounds)",
      "example": {
        "text": "錯過",
        "pinyin": "cuòguò",
        "meaning": "miss an opportunity, event, or connection"
      }
    }
  ],
  "校": [
    {
      "pinyin": "jiào",
      "meaning": "check; proofread (different reading)",
      "example": {
        "text": "校對",
        "pinyin": "jiàoduì",
        "meaning": "proofread; check against an original"
      }
    }
  ],
  "課": [
    {
      "pinyin": "kè",
      "meaning": "lesson; course",
      "example": {
        "text": "中文課",
        "pinyin": "Zhōngwén kè",
        "meaning": "Chinese class / course"
      }
    }
  ],
  "邊": [
    {
      "pinyin": "biān",
      "meaning": "while doing (in 一邊…一邊…)",
      "example": {
        "text": "一邊吃一邊看",
        "pinyin": "yìbiān chī yìbiān kàn",
        "meaning": "watch while eating"
      }
    }
  ],
  "見": [
    {
      "pinyin": "jiàn",
      "meaning": "meet; opinion in compounds",
      "example": {
        "text": "見面；意見",
        "pinyin": "jiànmiàn; yìjiàn",
        "meaning": "meet; opinion"
      }
    }
  ],
  "剛": [
    {
      "pinyin": "gāng",
      "meaning": "hard; firm (in compounds)",
      "example": {
        "text": "剛強",
        "pinyin": "gāngqiáng",
        "meaning": "strong-willed; firm"
      }
    }
  ],
  "意": [
    {
      "pinyin": "yì",
      "meaning": "intention; wish",
      "example": {
        "text": "同意",
        "pinyin": "tóngyì",
        "meaning": "agree; consent"
      }
    }
  ],
  "思": [
    {
      "pinyin": "sī",
      "meaning": "miss; long for (in compounds)",
      "example": {
        "text": "思念",
        "pinyin": "sīniàn",
        "meaning": "miss; long for"
      }
    }
  ],
  "慢": [
    {
      "pinyin": "màn",
      "meaning": "take care; take one's time (in polite expressions)",
      "example": {
        "text": "慢走",
        "pinyin": "màn zǒu",
        "meaning": "take care on your way (a farewell)"
      }
    }
  ],
  "高": [
    {
      "pinyin": "gāo",
      "meaning": "high in level, amount or degree",
      "example": {
        "text": "高價",
        "pinyin": "gāojià",
        "meaning": "high price"
      }
    }
  ],
  "同": [
    {
      "pinyin": "tóng",
      "meaning": "with; shared (in compounds)",
      "example": {
        "text": "同學",
        "pinyin": "tóngxué",
        "meaning": "classmate; fellow student"
      }
    }
  ],
  "日": [
    {
      "pinyin": "rì",
      "meaning": "sun; daytime",
      "example": {
        "text": "日出",
        "pinyin": "rìchū",
        "meaning": "sunrise"
      }
    }
  ],
  "利": [
    {
      "pinyin": "lì",
      "meaning": "sharp; profit (in compounds)",
      "example": {
        "text": "鋒利；利潤",
        "pinyin": "fēnglì; lìrùn",
        "meaning": "sharp; profit"
      }
    }
  ],
  "水": [
    {
      "pinyin": "shuǐ",
      "meaning": "liquid; juice (in some compounds)",
      "example": {
        "text": "藥水",
        "pinyin": "yàoshuǐ",
        "meaning": "liquid medicine"
      }
    }
  ],
  "香": [
    {
      "pinyin": "xiāng",
      "meaning": "incense (noun)",
      "example": {
        "text": "燒香",
        "pinyin": "shāo xiāng",
        "meaning": "burn incense"
      }
    }
  ],
  "租": [
    {
      "pinyin": "zū",
      "meaning": "rent out; rent payment (context determines direction)",
      "example": {
        "text": "出租；房租",
        "pinyin": "chūzū; fángzū",
        "meaning": "rent out; housing rent"
      }
    }
  ],
  "戶": [
    {
      "pinyin": "hù",
      "meaning": "measure word for households",
      "example": {
        "text": "三戶人家",
        "pinyin": "sān hù rénjiā",
        "meaning": "three households"
      }
    }
  ],
  "客": [
    {
      "pinyin": "kè",
      "meaning": "customer; passenger (in compounds)",
      "example": {
        "text": "顧客；乘客",
        "pinyin": "gùkè; chéngkè",
        "meaning": "customer; passenger"
      }
    }
  ],
  "話": [
    {
      "pinyin": "huà",
      "meaning": "language or dialect (in compounds)",
      "example": {
        "text": "臺灣話",
        "pinyin": "Táiwān huà",
        "meaning": "Taiwanese (language)"
      }
    }
  ],
  "線": [
    {
      "pinyin": "xiàn",
      "meaning": "thread; route",
      "example": {
        "text": "毛線；路線",
        "pinyin": "máoxiàn; lùxiàn",
        "meaning": "yarn; route"
      }
    }
  ],
  "記": [
    {
      "pinyin": "jì",
      "meaning": "write down; make a note",
      "example": {
        "text": "記筆記",
        "pinyin": "jì bǐjì",
        "meaning": "take notes"
      }
    }
  ],
  "統": [
    {
      "pinyin": "tǒng",
      "meaning": "unite; together (in compounds)",
      "example": {
        "text": "統一",
        "pinyin": "tǒngyī",
        "meaning": "unify; make uniform"
      }
    }
  ],
  "滑": [
    {
      "pinyin": "huá",
      "meaning": "slippery; slide",
      "example": {
        "text": "地很滑。",
        "pinyin": "Dì hěn huá.",
        "meaning": "The ground is slippery."
      }
    }
  ],
  "流": [
    {
      "pinyin": "liú",
      "meaning": "style or trend; circulate (in compounds)",
      "example": {
        "text": "流行",
        "pinyin": "liúxíng",
        "meaning": "popular; in fashion"
      }
    }
  ],
  "休": [
    {
      "pinyin": "xiū",
      "meaning": "take time off; stop an activity",
      "example": {
        "text": "休假",
        "pinyin": "xiūjià",
        "meaning": "take leave; have time off"
      }
    }
  ],
  "保": [
    {
      "pinyin": "bǎo",
      "meaning": "keep; guarantee (in compounds)",
      "example": {
        "text": "保持；保證",
        "pinyin": "bǎochí; bǎozhèng",
        "meaning": "maintain; guarantee"
      }
    }
  ],
  "險": [
    {
      "pinyin": "xiǎn",
      "meaning": "dangerous; nearly (in compounds)",
      "example": {
        "text": "危險；險些",
        "pinyin": "wéixiǎn; xiǎnxiē",
        "meaning": "dangerous; almost (usually something bad)"
      }
    }
  ],
  "什": [
    {
      "pinyin": "shí",
      "meaning": "assorted; mixed (different reading, in compounds)",
      "example": {
        "text": "什錦麵",
        "pinyin": "shíjǐn miàn",
        "meaning": "noodles with assorted toppings"
      }
    }
  ]
};

export function characterMeanings(hanzi:string):CharacterSense[]{
 return supplementaryCharacterMeanings[hanzi] ?? [];
}
