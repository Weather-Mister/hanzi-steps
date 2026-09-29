export type NotificationSentence={
 id:string;
 book:1|2;
 unit:number;
 text:string;
};

export const notificationSentences:NotificationSentence[]=[
 {id:'b1u01-a',book:1,unit:1,text:'你是學生嗎？我是學生。'},
 {id:'b1u01-b',book:1,unit:1,text:'你好，我很好，謝謝你。'},
 {id:'b1u02-a',book:1,unit:2,text:'我有一個哥哥，也有一個妹妹。'},
 {id:'b1u02-b',book:1,unit:2,text:'他是我的朋友，她也是。'},
 {id:'b1u03-a',book:1,unit:3,text:'這本書很大，那本書很小。'},
 {id:'b1u03-b',book:1,unit:3,text:'這是你的書嗎？那本是我的。'},
 {id:'b1u04-a',book:1,unit:4,text:'我想看中文書，也想聽中文。'},
 {id:'b1u04-b',book:1,unit:4,text:'你會說中文嗎？我會說一點。'},
 {id:'b1u05-a',book:1,unit:5,text:'我喜歡喝茶，你呢？'},
 {id:'b1u06-a',book:1,unit:6,text:'我家有五個人，大家都很好。'},
 {id:'b1u07-a',book:1,unit:7,text:'我週末常常去游泳。'},
 {id:'b1u08-a',book:1,unit:8,text:'我們明天一起去看電影吧。'},
 {id:'b1u09-a',book:1,unit:9,text:'她喜歡打籃球，也喜歡聽音樂。'},
 {id:'b1u10-a',book:1,unit:10,text:'我早上喝茶，晚上也喝茶。'},
 {id:'b1u11-a',book:1,unit:11,text:'請給我一杯熱茶，我要外帶。'},
 {id:'b1u12-a',book:1,unit:12,text:'這兩杯咖啡一共多少錢？'},
 {id:'b1u13-a',book:1,unit:13,text:'請幫我買三個包子。'},
 {id:'b1u14-a',book:1,unit:14,text:'這支手機太貴了，我不要。'},
 {id:'b1u15-a',book:1,unit:15,text:'我想吃牛肉麵，不想喝湯。'},
 {id:'b1u16-a',book:1,unit:16,text:'這家餐廳的菜很辣，也很好吃。'},
 {id:'b1u17-a',book:1,unit:17,text:'你知道哪一家有好吃的水餃嗎？'},
 {id:'b1u18-a',book:1,unit:18,text:'圖書館在學校裡面。'},
 {id:'b1u19-a',book:1,unit:19,text:'我去朋友家，也去附近的商店。'},
 {id:'b1u20-a',book:1,unit:20,text:'教室在圖書館前面，不在宿舍旁邊。'},
 {id:'b1u21-a',book:1,unit:21,text:'我們下午三點在學校見。'},
 {id:'b1u22-a',book:1,unit:22,text:'我下午兩點上課，四點去運動。'},
 {id:'b1u23-a',book:1,unit:23,text:'我可以先去看看嗎？'},
 {id:'b1u24-a',book:1,unit:24,text:'我跟朋友坐公車去學校。'},
 {id:'b1u25-a',book:1,unit:25,text:'坐捷運比坐公車快。'},
 {id:'b1u26-a',book:1,unit:26,text:'放假的時候，我想去臺南玩。'},
 {id:'b1u27-a',book:1,unit:27,text:'我想在臺南住三天。'},
 {id:'b1u28-a',book:1,unit:28,text:'從臺北坐火車到臺南要兩個小時。'},
 {id:'b1u29-a',book:1,unit:29,text:'要是明天下雨，我們就在家看電影。'},
 {id:'b1u30-a',book:1,unit:30,text:'這個水果甜甜的，你吃吃看。'},
 {id:'b1u31-a',book:1,unit:31,text:'我比較喜歡那個穿藍衣服的人。'},
 {id:'b1u32-a',book:1,unit:32,text:'我想租一個離學校近一點的房子。'},
 {id:'b1u33-a',book:1,unit:33,text:'新房子不大，外面很安靜。'},
 {id:'b1u34-a',book:1,unit:34,text:'我打算先學中文，再找工作。'},
 {id:'b1u35-a',book:1,unit:35,text:'學費是我爸爸幫我付的。'},
 {id:'b1u36-a',book:1,unit:36,text:'這個工作不難找，薪水也不低。'},
 {id:'b1u37-a',book:1,unit:37,text:'明天是她的生日，我想買蛋糕。'},
 {id:'b1u38-a',book:1,unit:38,text:'我下課以後再打電話給你。'},
 {id:'b1u39-a',book:1,unit:39,text:'我已經點了兩碗麵。'},
 {id:'b1u40-a',book:1,unit:40,text:'我們都點了自己喜歡吃的菜。'},
 {id:'b1u41-a',book:1,unit:41,text:'你一到我家，我們就開始吃蛋糕。'},
 {id:'b1u42-a',book:1,unit:42,text:'冬天很冷，我還是比較喜歡夏天。'},
 {id:'b1u43-a',book:1,unit:43,text:'雨下了兩個小時了，快停了吧。'},
 {id:'b1u44-a',book:1,unit:44,text:'今天的風比昨天大，雨也更大。'},
 {id:'b1u45-a',book:1,unit:45,text:'我從早上一直頭痛，現在也不舒服。'},
 {id:'b1u46-a',book:1,unit:46,text:'我吃了藥以後，還是有一點發燒。'},
 {id:'b1u47-a',book:1,unit:47,text:'他肚子很痛，所以先去看醫生。'},
 {id:'b1u48-a',book:1,unit:48,text:'你最好多休息，水也要多喝一點。'},
 {id:'b2u01-a',book:2,unit:1,text:'我好像走錯了，可以請你幫忙嗎？'},
 {id:'b2u01-b',book:2,unit:1,text:'從這裡往前走，到下一個路口左轉。'},
 {id:'b2u01-c',book:2,unit:1,text:'我想去師大，可是我不知道怎麼走。'},
 {id:'b2u02-a',book:2,unit:2,text:'過了第一個紅綠燈，右邊有一家銀行。'},
 {id:'b2u02-b',book:2,unit:2,text:'請告訴我，附近哪裡可以提款？'},
 {id:'b2u02-c',book:2,unit:2,text:'郵局就在前面那一段路的左邊。'},
 {id:'b2u03-a',book:2,unit:3,text:'先往前走兩個路口，然後在第三個路口右轉。'},
 {id:'b2u03-b',book:2,unit:3,text:'我看了一下地圖，才發現走錯路了。'},
 {id:'b2u03-c',book:2,unit:3,text:'過了紅綠燈以後，你就會看到那條巷子。'},
 {id:'b2u04-a',book:2,unit:4,text:'我有一點餓，正好想找一家麵店。'},
 {id:'b2u04-b',book:2,unit:4,text:'我一邊吃麵，一邊看朋友傳來的地圖。'},
 {id:'b2u04-c',book:2,unit:4,text:'那家麵店離學校不遠，走路很方便。'},
 {id:'b2u04-d',book:2,unit:4,text:'我正好想買一個背包和兩枝筆。'}
];

export function sentencesForLevel(book:1|2,unit:number){
 const start=Math.max(1,unit-3);
 const sameBook=notificationSentences.filter(sentence=>sentence.book===book&&sentence.unit>=start&&sentence.unit<=unit);
 if(book===2&&unit===1){
  return [...notificationSentences.filter(sentence=>sentence.book===1&&sentence.unit>=46),...sameBook];
 }
 return sameBook;
}
