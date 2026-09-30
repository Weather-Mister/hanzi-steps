import type {SentenceRef} from '../materials/schema.ts';
/** Reviewed meaning-to-example links. No canonical declarations. Unreviewed
 * historical reference senses remain stored, but are not shown in course cards.
 * The fixture pins each referenced sense so array edits cannot change its meaning. */
export type CharacterSenseGate={char:string;sense:number;exampleRef:SentenceRef};
export const characterSenseGates:CharacterSenseGate[]=[
 {char:'好',sense:0,exampleRef:{kind:'phrase',id:'u15-tasty-bun'}},
 {char:'上',sense:2,exampleRef:{kind:'phrase',id:'u18-at-class'}},
 {char:'上',sense:3,exampleRef:{kind:'phrase',id:'u31-hotel'}},
 {char:'下',sense:1,exampleRef:{kind:'phrase',id:'u22-just-class'}},
 {char:'下',sense:2,exampleRef:{kind:'phrase',id:'u42-rain-basic'}},
 {char:'了',sense:0,exampleRef:{kind:'phrase',id:'u39-le-positive'}},
 {char:'了',sense:1,exampleRef:{kind:'phrase',id:'u31-now-like'}},
 {char:'了',sense:2,exampleRef:{kind:'phrase',id:'u43-duration-now-source'}},
 {char:'得',sense:0,exampleRef:{kind:'phrase',id:'u16-making-desserts-well'}},
 {char:'在',sense:0,exampleRef:{kind:'phrase',id:'u22-writing'}},
 {char:'幾',sense:0,exampleRef:{kind:'phrase',id:'u46-ji-expansion'}},
 {char:'跟',sense:0,exampleRef:{kind:'phrase',id:'u48-gen-recipient'}},
 {char:'課',sense:0,exampleRef:{kind:'phrase',id:'u22-calligraphy'}},
 {char:'邊',sense:0,exampleRef:{kind:'phrase',id:'b2u4-l2-model'}},
];
