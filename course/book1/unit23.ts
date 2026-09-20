import type {UnitData} from '../schema.ts';

// Textbook-aligned Lesson 8 method questions; examples are original unless noted by structure.
const unit:UnitData = {
  "schemaVersion": 1,
  "bookId": "book-1",
  "order": 23,
  "unit": {
    "id": "unit-23",
    "number": 23,
    "theme": "teal",
    "label": "Method questions & familiar actions",
    "title": "How Do You Do It?",
    "description": "2 new words/forms. Ask how an action is done and distinguish 怎麼 from 怎麼樣.",
    "chars": [],
    "lessonIds": ["u23-method","u23-do","u23-play","u23-contrast","u23-word-order","u23-transfer","u23-review"],
    "banner": {"text":"這個怎麼做？","pinyin":"Zhè ge zěnme zuò?"},
    "goal": {"text":"你怎麼學中文？","pinyin":"Nǐ zěnme xué Zhōngwén?","meaning":"How do you study Chinese?"},
    "grammarIds": ["u23-how-zenme","u23-how-vs-zenmeyang"],
    "bookReference": "A Course in Contemporary Chinese 1 · Lesson 8, pp. 160–175. 怎麼 grammar and communicative practice; original Hanzi Steps examples."
  },
  "reviewLessonId":"u23-review",
  "lessons":[
    {"id":"u23-method","title":"Ask How","subtitle":"Use 怎麼 before an action to ask about method.","chars":[],"minutes":"7–9 min","unitId":"unit-23","review":false,"steps":[
      {"id":"u23-method-01","type":"grammar","grammar":"u23-how-zenme"},{"id":"u23-method-02","type":"phrase","phrase":"u23-how-study"},{"id":"u23-method-03","type":"order","phrase":"u23-how-study","tokens":["中文","學","怎麼","你"]},{"id":"u23-method-04","type":"phrase","phrase":"u23-how-go"},{"id":"u23-method-05","type":"order","phrase":"u23-how-go","tokens":["學校","去","怎麼","你"]},{"id":"u23-method-06","type":"select","prompt":"Which asks how someone studies Chinese?","options":["你怎麼學中文？","你中文怎麼樣？"],"answer":"你怎麼學中文？","explanation":"怎麼 modifies the action 學.","grammarIds":["u23-how-zenme"]},{"id":"u23-method-07","type":"select","prompt":"Where does 怎麼 normally go?","options":["before the action verb","after the object","at the very end"],"answer":"before the action verb","explanation":"In this use, 怎麼 is an adverb before the action.","grammarIds":["u23-how-zenme"]}]},
    {"id":"u23-do","title":"How Do You Do This?","subtitle":"Apply 怎麼 to familiar actions.","chars":[],"minutes":"7–9 min","unitId":"unit-23","review":false,"steps":[
      {"id":"u23-do-01","type":"phrase","phrase":"u23-how-do"},{"id":"u23-do-02","type":"order","phrase":"u23-how-do","tokens":["做","怎麼","這個"]},{"id":"u23-do-03","type":"phrase","phrase":"u23-how-sing"},{"id":"u23-do-04","type":"order","phrase":"u23-how-sing","tokens":["唱","怎麼","這個歌"]},{"id":"u23-do-05","type":"select","prompt":"Choose the natural method question.","options":["這個怎麼做？","這個做怎麼？"],"answer":"這個怎麼做？","explanation":"怎麼 belongs before 做.","grammarIds":["u23-how-zenme"]},{"id":"u23-do-06","type":"select","prompt":"Which question asks for a way to sing the song?","options":["這個歌怎麼唱？","這個歌怎麼樣？"],"answer":"這個歌怎麼唱？","explanation":"唱 is the action whose method is being asked.","grammarIds":["u23-how-zenme"]}]},
    {"id":"u23-play","title":"Play & Have Fun","subtitle":"Use 玩 as an action and ask how it is done.","chars":[],"minutes":"6–8 min","unitId":"unit-23","review":false,"steps":[
      {"id":"u23-play-01","type":"phrase","phrase":"u23-how-play"},{"id":"u23-play-02","type":"order","phrase":"u23-how-play","tokens":["玩","怎麼","這個"]},{"id":"u23-play-03","type":"select","prompt":"Which new word is the action “to play; have fun”?","options":["玩","好玩","怎麼"],"answer":"玩","explanation":"玩 is the action verb; 好玩 means fun/enjoyable."},{"id":"u23-play-04","type":"select","prompt":"Which means “How do you play this?”","options":["這個怎麼玩？","這個玩怎麼？"],"answer":"這個怎麼玩？","explanation":"Method 怎麼 precedes 玩.","grammarIds":["u23-how-zenme"]},{"id":"u23-play-05","type":"phrase","phrase":"u23-how-study"},{"id":"u23-play-06","type":"select","prompt":"In 你怎麼學中文？ what is being asked?","options":["the method of studying","an opinion of Chinese"],"answer":"the method of studying","explanation":"怎麼 asks how the action is carried out.","grammarIds":["u23-how-zenme"]}]},
    {"id":"u23-contrast","title":"怎麼 or 怎麼樣?","subtitle":"Separate method questions from opinion questions.","chars":[],"minutes":"8–10 min","unitId":"unit-23","review":false,"steps":[
      {"id":"u23-contrast-01","type":"grammar","grammar":"u23-how-vs-zenmeyang"},{"id":"u23-contrast-02","type":"phrase","phrase":"u23-how-is"},{"id":"u23-contrast-03","type":"order","phrase":"u23-how-is","tokens":["怎麼樣","這個"]},{"id":"u23-contrast-04","type":"phrase","phrase":"u23-food-opinion"},{"id":"u23-contrast-05","type":"phrase","phrase":"u23-food-method"},{"id":"u23-contrast-06","type":"select","prompt":"You want an opinion about a dish. Ask:","options":["這個菜怎麼樣？","這個菜怎麼做？"],"answer":"這個菜怎麼樣？","explanation":"怎麼樣 asks “How is it?/What do you think?”","grammarIds":["u23-how-vs-zenmeyang"]},{"id":"u23-contrast-07","type":"select","prompt":"You want the cooking method. Ask:","options":["這個菜怎麼做？","這個菜怎麼樣？"],"answer":"這個菜怎麼做？","explanation":"怎麼 + 做 asks how it is made.","grammarIds":["u23-how-zenme","u23-how-vs-zenmeyang"]}]},
    {"id":"u23-word-order","title":"Keep the Action After 怎麼","subtitle":"Build clean method questions with familiar vocabulary.","chars":[],"minutes":"7–9 min","unitId":"unit-23","review":false,"steps":[
      {"id":"u23-word-order-01","type":"phrase","phrase":"u23-how-go"},{"id":"u23-word-order-02","type":"order","phrase":"u23-how-go","tokens":["學校","去","怎麼","你"]},{"id":"u23-word-order-03","type":"phrase","phrase":"u23-food-method"},{"id":"u23-word-order-04","type":"order","phrase":"u23-food-method","tokens":["做","怎麼","這個菜"]},{"id":"u23-word-order-05","type":"select","prompt":"Choose the correct order.","options":["你怎麼去學校？","你去怎麼學校？"],"answer":"你怎麼去學校？","explanation":"怎麼 goes before the action phrase 去學校.","grammarIds":["u23-how-zenme"]},{"id":"u23-word-order-06","type":"select","prompt":"Choose the correct order.","options":["這個菜怎麼做？","這個怎麼菜做？"],"answer":"這個菜怎麼做？","explanation":"The topic/object can come first; 怎麼 stays before 做.","grammarIds":["u23-how-zenme"]}]},
    {"id":"u23-transfer","title":"Method or Evaluation?","subtitle":"Decide what kind of information the speaker wants.","chars":[],"minutes":"7–9 min","unitId":"unit-23","review":false,"steps":[
      {"id":"u23-transfer-01","type":"phrase","phrase":"u23-how-sing"},{"id":"u23-transfer-02","type":"phrase","phrase":"u23-how-is"},{"id":"u23-transfer-03","type":"select","prompt":"Which question expects instructions or a method?","options":["這個怎麼做？","這個怎麼樣？"],"answer":"這個怎麼做？","explanation":"怎麼 + action asks how to do it.","grammarIds":["u23-how-vs-zenmeyang"]},{"id":"u23-transfer-04","type":"select","prompt":"Which question expects an opinion?","options":["這個怎麼樣？","這個怎麼玩？"],"answer":"這個怎麼樣？","explanation":"怎麼樣 is a state-verb expression asking for evaluation.","grammarIds":["u23-how-vs-zenmeyang"]},{"id":"u23-transfer-05","type":"order","phrase":"u23-how-sing","tokens":["唱","怎麼","這個歌"]},{"id":"u23-transfer-06","type":"order","phrase":"u23-how-is","tokens":["怎麼樣","這個"]}]},
    {"id":"u23-review","title":"Unit 23 Review","subtitle":"Ask how an action is done and keep 怎麼 distinct from 怎麼樣.","chars":[],"minutes":"8–10 min","unitId":"unit-23","review":true,"steps":[
      {"id":"u23-review-01","type":"phrase","phrase":"u23-how-study"},{"id":"u23-review-02","type":"order","phrase":"u23-how-study","tokens":["中文","學","怎麼","你"]},{"id":"u23-review-03","type":"phrase","phrase":"u23-food-method"},{"id":"u23-review-04","type":"order","phrase":"u23-food-method","tokens":["做","怎麼","這個菜"]},{"id":"u23-review-05","type":"select","prompt":"Method question:","options":["你怎麼學中文？","中文怎麼樣？"],"answer":"你怎麼學中文？","explanation":"怎麼 modifies 學.","grammarIds":["u23-how-zenme"]},{"id":"u23-review-06","type":"select","prompt":"Opinion question:","options":["這個菜怎麼樣？","這個菜怎麼做？"],"answer":"這個菜怎麼樣？","explanation":"怎麼樣 asks for an evaluation.","grammarIds":["u23-how-vs-zenmeyang"]},{"id":"u23-review-07","type":"select","prompt":"Complete: 這個___玩？","options":["怎麼","怎麼樣"],"answer":"怎麼","explanation":"An action follows, so use 怎麼.","grammarIds":["u23-how-zenme"]},{"id":"u23-review-08","type":"phrase","phrase":"u23-how-play"}]}
  ],
  "newVocabulary":[{"text":"怎麼","pinyin":"zěnme","meaning":"how; in what way","lessonId":"u23-method","core":true},{"text":"玩","pinyin":"wán","meaning":"to play; have fun","lessonId":"u23-play","core":true}],
  "reviewVocabulary":["你","我","這","個","做","唱歌","學","中文","去","學校","怎麼樣","菜","好玩"],
  "newCharacters":[],"reviewCharacters":[],"characters":{},
  "grammarRules":{
    "u23-how-zenme":{"id":"u23-how-zenme","title":"Ask how with 怎麼","pattern":"Subject / Topic + 怎麼 + Action?","explanation":"怎麼 is a question adverb used to ask the way or method an action is carried out. Put it before the action verb or action phrase. The textbook contrasts this with 怎麼樣, which asks for an evaluation.","examples":[{"text":"你怎麼學中文？","pinyin":"Nǐ zěnme xué Zhōngwén?","meaning":"How do you study Chinese?"},{"text":"這個菜怎麼做？","pinyin":"Zhè ge cài zěnme zuò?","meaning":"How is this dish made?"}],"remember":"If you can answer with a method or procedure, use 怎麼 before the action.","words":["怎麼"]},
    "u23-how-vs-zenmeyang":{"id":"u23-how-vs-zenmeyang","title":"怎麼 is not 怎麼樣","pattern":"怎麼 + Action?  vs.  Topic + 怎麼樣?","explanation":"怎麼 asks how to perform an action. 怎麼樣 is a state-verb expression asking how something is or what someone thinks of it. They are not interchangeable.","examples":[{"text":"這個菜怎麼做？","pinyin":"Zhè ge cài zěnme zuò?","meaning":"How is this dish made?"},{"text":"這個菜怎麼樣？","pinyin":"Zhè ge cài zěnmeyàng?","meaning":"How is this dish? / What do you think of it?"}],"remember":"Action after the blank → 怎麼. Evaluation of the topic → 怎麼樣.","words":["怎麼","怎麼樣"]}
  },
  "grammarIntroductions":[{"id":"u23-how-zenme","kind":"rule","ref":"u23-how-zenme","lessonId":"u23-method","stepId":"u23-method-01"},{"id":"u23-how-vs-zenmeyang","kind":"rule","ref":"u23-how-vs-zenmeyang","lessonId":"u23-contrast","stepId":"u23-contrast-01"}],
  "reviewGrammar":[],
  "phrases":{
    "u23-how-study":{"text":"你怎麼學中文？","pinyin":"Nǐ zěnme xué Zhōngwén?","meaning":"How do you study Chinese?","note":"怎麼 asks about the method or way an action is done.","tokens":["你","怎麼","學","中文"],"grammarIds":["u23-how-zenme"]},
    "u23-how-go":{"text":"你怎麼去學校？","pinyin":"Nǐ zěnme qù xuéxiào?","meaning":"How do you go to school?","note":"怎麼 comes before the action phrase 去學校.","tokens":["你","怎麼","去","學校"],"grammarIds":["u23-how-zenme"]},
    "u23-how-do":{"text":"這個怎麼做？","pinyin":"Zhè ge zěnme zuò?","meaning":"How do you do/make this?","note":"Use 怎麼 immediately before the action you are asking how to perform.","tokens":["這個","怎麼","做"],"grammarIds":["u23-how-zenme"]},
    "u23-how-sing":{"text":"這個歌怎麼唱？","pinyin":"Zhè ge gē zěnme chàng?","meaning":"How do you sing this song?","note":"The thing being discussed comes first; 怎麼 asks how to carry out 唱.","tokens":["這個歌","怎麼","唱"],"grammarIds":["u23-how-zenme"]},
    "u23-how-play":{"text":"這個怎麼玩？","pinyin":"Zhè ge zěnme wán?","meaning":"How do you play/use this for fun?","note":"玩 is an action verb; 怎麼 asks for the way to do it.","tokens":["這個","怎麼","玩"],"grammarIds":["u23-how-zenme"]},
    "u23-how-is":{"text":"這個怎麼樣？","pinyin":"Zhè ge zěnmeyàng?","meaning":"How is this? / What do you think of this?","note":"怎麼樣 asks for an evaluation, not a method.","tokens":["這個","怎麼樣"],"grammarIds":["u23-how-vs-zenmeyang"]},
    "u23-food-opinion":{"text":"這個菜怎麼樣？","pinyin":"Zhè ge cài zěnmeyàng?","meaning":"How is this dish?","note":"Use 怎麼樣 when you want an opinion about the dish.","tokens":["這個菜","怎麼樣"],"grammarIds":["u23-how-vs-zenmeyang"]},
    "u23-food-method":{"text":"這個菜怎麼做？","pinyin":"Zhè ge cài zěnme zuò?","meaning":"How is this dish made?","note":"Use 怎麼 when asking about the method of making the dish.","tokens":["這個菜","怎麼","做"],"grammarIds":["u23-how-zenme","u23-how-vs-zenmeyang"]}
  },
  "revisionStepIds":["u23-contrast-02","u23-contrast-04","u23-review-06"]
};

export default unit;
