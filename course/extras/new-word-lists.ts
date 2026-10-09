import {supplementaryCharacterInfo} from './new-character-info.ts';
import {extraCharacterInfo} from './character-info.ts';
import type {ExtraWord} from './units.ts';
// Optional Taiwan vocabulary. These are supplementary lists, not new textbook
// introductions; overlapping core words retain their original owning lessons.
function glyphNote(glyph:string,text:string){
 const readings:Record<string,Record<string,string>>={'高麗菜':{'麗':'lí'},'紅蘿蔔':{'蔔':'bo (neutral tone)'},'白蘿蔔':{'蔔':'bo (neutral tone)'},'茄子':{'子':'zi (neutral tone)'},'蘑菇':{'菇':'gu (neutral tone)'},'睡覺':{'覺':'jiào'},'聽音樂':{'樂':'yuè'}};
 const info=supplementaryCharacterInfo[glyph]||extraCharacterInfo[glyph];
 return glyph+'：'+info.meaning+'. '+(readings[text]?.[glyph]?'Read it as '+readings[text][glyph]+' in '+text+'.':'Recognize its shape inside '+text+'; learn the complete expression.');
}
type Vegetable=[string,string,string,string,string,string,string,string,string,string[]];
const vegetables:Vegetable[]=[
 ['veg-cabbage','高麗菜','gāolícài','cabbage','顆','kē','一顆高麗菜','yì kē gāolícài','A whole cabbage head. 高麗菜 is the common Taiwan name. 個 is also natural for a whole head.',['個']],
 ['veg-bokchoy','青江菜','qīngjiāngcài','bok choy','棵','kē','一棵青江菜','yì kē qīngjiāngcài','The picture shows one whole plant, including its joined stems. 棵 counts that plant; 青江白菜 is another name.',['株']],
 ['veg-spinach','菠菜','bōcài','spinach','把','bǎ','一把菠菜','yì bǎ bōcài','The picture shows a tied bunch. 把 counts a handful or bunch, not one leaf.',['束']],
 ['veg-water-spinach','空心菜','kōngxīncài','water spinach','把','bǎ','一把空心菜','yì bǎ kōngxīncài','The picture shows a tied bunch of long stems and narrow leaves. 空心 refers to its hollow stems.',['束']],
 ['veg-cauliflower','花椰菜','huāyécài','cauliflower','顆','kē','一顆花椰菜','yì kē huāyécài','Here 花椰菜 names the white cauliflower head. 青花菜 names green broccoli. 個 can also count a whole head.',['個']],
 ['veg-broccoli','青花菜','qīnghuācài','broccoli','顆','kē','一顆青花菜','yì kē qīnghuācài','青花菜 is broccoli; 青花椰菜 also occurs. Count the whole green head in this picture.',['個']],
 ['veg-carrot','紅蘿蔔','hóngluóbo','carrot','根','gēn','一根紅蘿蔔','yì gēn hóngluóbo','A whole carrot. 根 highlights its long shape. 蔔 has neutral tone in 蘿蔔.',['條','個']],
 ['veg-daikon','白蘿蔔','báiluóbo','daikon radish','根','gēn','一根白蘿蔔','yì gēn báiluóbo','A whole white radish, also called 菜頭 in Taiwan. 根 counts the long root.',['條','個']],
 ['veg-potato','馬鈴薯','mǎlíngshǔ','potato','個','ge','一個馬鈴薯','yí ge mǎlíngshǔ','馬鈴薯 is potato. 地瓜 is sweet potato; they are different foods.',['顆']],
 ['veg-sweet-potato','地瓜','dìguā','sweet potato','條','tiáo','一條地瓜','yì tiáo dìguā','地瓜 is the common Taiwan word for sweet potato. 條 highlights its long shape; 個 and 根 also occur.',['個','根']],
 ['veg-onion','洋蔥','yángcōng','onion','顆','kē','一顆洋蔥','yì kē yángcōng','A whole onion bulb. 個 is also natural; sliced onion is a different counting context.',['個']],
 ['veg-corn','玉米','yùmǐ','corn','根','gēn','一根玉米','yì gēn yùmǐ','Here the picture and phrase mean one ear of corn. 根 counts the ear; individual kernels use a different phrase.',['條']],
 ['veg-cucumber','小黃瓜','xiǎohuángguā','cucumber','條','tiáo','一條小黃瓜','yì tiáo xiǎohuángguā','A common Taiwan name for cucumber. The whole vegetable is long; 根 and 個 can also occur.',['根','個']],
 ['veg-eggplant','茄子','qiézi','eggplant','條','tiáo','一條茄子','yì tiáo qiézi','The picture shows a long eggplant. 條 counts this long shape; 個 can also count an eggplant. 子 is neutral tone.',['個']],
 ['veg-tomato','番茄','fānqié','tomato','顆','kē','一顆番茄','yì kē fānqié','Count one whole tomato. 個 is also natural. It is used as a vegetable in cooking, although botanically it is a fruit.',['個']],
 ['veg-pepper','青椒','qīngjiāo','green bell pepper','個','ge','一個青椒','yí ge qīngjiāo','A green bell pepper, rather than a thin hot chili pepper. 顆 can also count the whole pepper.',['顆']],
 ['veg-pumpkin','南瓜','nánguā','pumpkin','個','ge','一個南瓜','yí ge nánguā','Count a whole pumpkin here. Pieces use 塊 instead; 顆 is also possible for a whole pumpkin.',['顆']],
 ['veg-mushroom','蘑菇','mógu','mushroom','朵','duǒ','一朵蘑菇','yì duǒ mógu','One whole mushroom. 朵 highlights its cap shape; 個 is also natural. 菇 is neutral tone in this everyday word.',['個']],
 ['veg-garlic','蒜頭','suàntóu','garlic bulb','顆','kē','一顆蒜頭','yì kē suàntóu','Here the picture shows one whole garlic bulb. Individual cloves use 瓣; do not confuse a bulb with a clove.',['個']],
 ['veg-ginger','薑','jiāng','ginger','塊','kuài','一塊薑','yí kuài jiāng','The picture shows one irregular piece of ginger. 塊 counts the piece; it does not count slices.',[]],
];
export const vegetableWords:ExtraWord[]=vegetables.map(([id,text,pinyin,meaning,measure,measurePinyin,counted,countedPinyin,note,acceptedMeasures])=>({id,text,pinyin,meaning,measure,measurePinyin,counted,countedPinyin,note,acceptedMeasures,category:'vegetables',glyphNotes:Array.from(text).map(c=>glyphNote(c,text))}));
type Entry=[string,string,string,string,string];
const countries:Entry[]=[
 ['country-taiwan','台灣','Táiwān','Taiwan','台灣 is the everyday written place name; 臺灣 is also used. Learn the name as a whole.'],
 ['country-china','中國','Zhōngguó','China','國 means country. Keep the full name 中國; it does not mean the Chinese language.'],
 ['country-japan','日本','Rìběn','Japan','日本 is Japan; 日本人 means a Japanese person.'],
 ['country-korea','韓國','Hánguó','South Korea','韓國 normally names South Korea in everyday Taiwan usage. It is not a name for North Korea.'],
 ['country-usa','美國','Měiguó','United States','美國 is the United States; 美國人 means an American person.'],
 ['country-canada','加拿大','Jiānádà','Canada','A transliterated name. Learn all three characters together.'],
 ['country-uk','英國','Yīngguó','United Kingdom','英國 is commonly used for the United Kingdom. England more specifically is 英格蘭.'],
 ['country-france','法國','Fǎguó','France','法國 is France; 法國人 means a French person.'],
 ['country-germany','德國','Déguó','Germany','德國 is Germany; 德國人 means a German person.'],
 ['country-italy','義大利','Yìdàlì','Italy','義大利 is the standard Taiwan name. 意大利 is another regional spelling.'],
 ['country-spain','西班牙','Xībānyá','Spain','A transliterated name. Learn the whole word; do not translate its characters literally.'],
 ['country-turkey','土耳其','Tǔěrqí','Türkiye; Turkey','土耳其 names Türkiye. Its last syllable is qí, with second tone.'],
 ['country-greece','希臘','Xīlà','Greece','Keep the Traditional character 臘. Learn the name as a whole.'],
 ['country-australia','澳洲','Àozhōu','Australia','澳洲 is the common Taiwan name for Australia; 澳大利亞 is also used. 澳洲 here is not all of Oceania.'],
 ['country-new-zealand','紐西蘭','Niǔxīlán','New Zealand','紐西蘭 is the standard Taiwan name. 新西蘭 is another regional name.'],
 ['country-india','印度','Yìndù','India','印度 is India. 印尼 names Indonesia, a different country.'],
 ['country-thailand','泰國','Tàiguó','Thailand','泰國 is Thailand. Contrast 泰 with 台 in 台灣.'],
 ['country-vietnam','越南','Yuènán','Vietnam','越南 is Vietnam; the full name identifies the country.'],
 ['country-singapore','新加坡','Xīnjiāpō','Singapore','新加坡 is Singapore. Learn all three characters together.'],
 ['country-malaysia','馬來西亞','Mǎláixīyà','Malaysia','The four-character name is one word; do not shorten it to 馬來 in these exercises.'],
];
const actions:Entry[]=[
 ['action-walk','走路','zǒulù','walk','走路 means walk or travel on foot. 路 means road; keep the complete action expression.'],
 ['action-run','跑步','pǎobù','run; jog','跑步 means run or jog. It is a verb–object expression; do not count it with a noun measure word.'],
 ['action-sleep','睡覺','shuìjiào','sleep','覺 is jiào in 睡覺. In other words, such as 覺得, it has a different reading.'],
 ['action-get-up','起床','qǐchuáng','get out of bed','起床 means get up from bed, rather than simply become awake. 床 is bed.'],
 ['action-eat','吃飯','chīfàn','eat a meal','吃飯 means eat or have a meal; it does not require that the meal contain rice.'],
 ['action-drink','喝水','hēshuǐ','drink water','喝 is drink; 水 is water. The drink follows the verb.'],
 ['action-shower','洗澡','xǐzǎo','bathe; take a shower','洗澡 covers bathing or showering. It does not specify a bathtub.'],
 ['action-wash-hands','洗手','xǐshǒu','wash your hands','手 means hand; 洗手 is wash your hands. Contrast it with 洗澡, bathing.'],
 ['action-brush-teeth','刷牙','shuāyá','brush your teeth','刷 means brush; 牙 means tooth or teeth. Mandarin does not add an English-style plural ending.'],
 ['action-read','看書','kànshū','read a book','看 + 書 means read books. 看 is not pronounced kān in this expression.'],
 ['action-write','寫字','xiězì','write characters','寫 is write; 字 means a written character. This expression refers to writing.'],
 ['action-listen','聽音樂','tīng yīnyuè','listen to music','聽 means listen. Read 樂 as yuè in 音樂, unlike lè in 芭樂.'],
 ['action-talk','說話','shuōhuà','talk; speak','說話 means talk or speak. It does not specify which language is spoken.'],
 ['action-sing','唱歌','chànggē','sing','唱 is sing; 歌 is song. Keep the full action expression 唱歌.'],
 ['action-dance','跳舞','tiàowǔ','dance','跳舞 means dance; 跳 by itself can mean jump.'],
 ['action-swim','游泳','yóuyǒng','swim','Use 游泳 for swimming. Keep 游, rather than 遊, in this word.'],
 ['action-cycle','騎腳踏車','qí jiǎotàchē','ride a bicycle','腳踏車 is a common Taiwan word for bicycle. 騎 is used for riding it; 開車 means driving a car.'],
 ['action-drive','開車','kāichē','drive a car','開車 means drive a vehicle, here a car. Riding a bicycle is 騎腳踏車.'],
 ['action-cook','做飯','zuòfàn','cook a meal','做飯 means prepare or cook a meal. 煮飯 can specifically refer to cooking rice or, in context, making a meal.'],
 ['action-rest','休息','xiūxí','rest','The Taiwan dictionary reading is xiūxí. Resting does not necessarily mean sleeping.'],
];
function entries(rows:Entry[],category:'countries'|'actions'):ExtraWord[]{return rows.map(([id,text,pinyin,meaning,note])=>({id,text,pinyin,meaning,note,category,measure:'',measurePinyin:'',counted:'',countedPinyin:'',glyphNotes:Array.from(text).map(c=>glyphNote(c,text))}));}
export const countryWords=entries(countries,'countries');
export const actionWords=entries(actions,'actions');
