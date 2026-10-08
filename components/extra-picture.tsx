'use client';
import type {ReactNode} from 'react';
import {extraWord} from '../course/extras/units';

// Small local illustrations: stable on every device, available offline, and
// visually distinguishable without translated labels or remote image services.
export function ExtraPicture({id,label,className=''}:{id:string;label?:string;className?:string}){
 let art:ReactNode;
 const leaf=<path d="M58 28Q71 9 88 19Q78 38 58 28" fill="#4c8466"/>;
 switch(id){
  case 'tshirt':art=<><path d="M42 28L25 36L12 60L32 68L39 54V100H82V54L90 68L109 60L96 36L79 28Q60 42 42 28Z" fill="#628cc1"/><path d="M42 28Q60 48 79 28" fill="none"/></>;break;
  case 'shirt':art=<><path d="M40 24L26 32L19 94L34 98L42 56V106H80V56L87 98L102 94L95 32L80 24Z" fill="#d9e6df"/><path d="M42 24L60 43L79 24L72 51L60 43L49 51Z" fill="#fff"/><path d="M60 43V106M70 63H78V77H70Z" fill="none"/>{[59,75,91].map(y=><circle key={y} cx="61" cy={y} r="2" fill="#3d5360" stroke="none"/>)}</>;break;
  case 'jacket':art=<><path d="M43 23L26 33L13 95L32 101L43 58V108H79V58L90 101L108 95L95 33L77 23Z" fill="#cc9272"/><path d="M44 23L61 49L77 23M61 49V108M43 83L54 75M79 83L68 75" fill="none"/><path d="M47 25L61 35L74 25" fill="none" strokeWidth="5"/></>;break;
  case 'sweater':art=<><path d="M43 26L26 36L13 95L29 103L42 59V104H81V59L92 103L108 95L96 36L80 26Q62 38 43 26Z" fill="#a189b8"/>{[63,76,89,100].map(y=><path key={y} d={`M43 ${y}H80`} stroke="#cec1da" strokeWidth="3"/>)}<path d="M46 27Q61 40 78 27" fill="none" strokeWidth="5"/></>;break;
  case 'trousers':art=<><path d="M36 20H85L82 106H64L61 58L57 106H38Z" fill="#526982"/><path d="M37 31H83M61 31V58M38 32L50 43M83 32L72 43" fill="none"/></>;break;
  case 'skirt':art=<><path d="M42 29H78L98 101H22Z" fill="#c08596"/><path d="M42 29V39H78V29M49 39L43 99M71 39L77 99M60 39V99" fill="none" stroke="#8e5b70"/></>;break;
  case 'dress':art=<><path d="M42 16L35 23L40 58L18 107H104L81 58L86 23L79 16Q61 35 42 16Z" fill="#719c91"/><path d="M42 16Q61 42 79 16M40 58H81" fill="none"/><path d="M45 71L38 100M77 71L85 100" fill="none" stroke="#b6d4c7"/></>;break;
  case 'shoes':art=<>{[0,31].map((dy,i)=><g key={i} transform={`translate(0 ${dy})`}><path d="M22 39L40 30L60 47L92 56Q105 62 98 76H24Q13 72 15 60Z" fill="#b98b70"/><path d="M16 71H99M44 40L54 37M51 45L61 43M59 50L69 48" fill="none" stroke="#f4ece1" strokeWidth="4"/></g>)}</>;break;
  case 'socks':art=<>{[0,42].map((dx,i)=><g key={i} transform={`translate(${dx} 0)`}><path d="M20 24H48V65L59 79Q69 94 55 102Q43 107 33 92L21 77Z" fill="#e0b379"/><path d="M21 37H48M21 46H48" fill="none" stroke="#fff2d6" strokeWidth="5"/></g>)}</>;break;
  case 'hat':art=<><path d="M29 72Q27 32 61 28Q93 31 91 72Z" fill="#7a91b0"/><path d="M29 69Q62 65 92 69L106 85Q90 100 27 87L12 78Z" fill="#566f93"/><path d="M62 29Q74 47 73 68" fill="none"/><circle cx="61" cy="28" r="4" fill="#526b88"/></>;break;
  case 'apple':art=<><path d="M61 34Q34 19 22 51Q13 79 38 102Q49 111 61 103Q77 114 94 91Q116 50 91 34Q78 25 61 34Z" fill="#cb6159"/><path d="M61 36L64 16" fill="none" stroke="#76583a" strokeWidth="5"/>{leaf}<path d="M32 54Q26 67 32 77" fill="none" stroke="#f4b6a4" strokeWidth="5"/></>;break;
  case 'banana':art=<><path d="M25 30Q42 79 91 68L103 59Q104 89 81 105Q32 105 19 57Z" fill="#e9c967"/><path d="M28 44Q44 93 90 85" fill="none" stroke="#ba9546"/><path d="M23 32L18 22L26 18L33 28M95 65L100 57L108 59" fill="#9a784b"/></>;break;
  case 'orange':art=<><circle cx="61" cy="70" r="38" fill="#df9b51"/><path d="M60 32V21" stroke="#6b7547" strokeWidth="5"/>{leaf}<path d="M31 61Q33 48 44 44" fill="none" stroke="#f2d4a0" strokeWidth="5"/>{[43,62,82].map(x=><circle key={x} cx={x} cy="90" r="1" fill="#ac6b32" stroke="none"/>)}</>;break;
  case 'grapes':art=<><path d="M58 35L64 14M45 30H77" fill="none" stroke="#6d7850" strokeWidth="5"/>{leaf}{[[44,43],[73,43],[30,64],[58,66],[86,64],[44,88],[73,88],[59,109]].map(([x,y])=><circle key={x+'-'+y} cx={x} cy={y} r="14" fill="#8e79a8"/> )}</>;break;
  case 'watermelon':art=<><ellipse cx="61" cy="67" rx="47" ry="38" fill="#8caf72"/>{[31,49,70,89].map(x=><path key={x} d={`M${x} 35Q${x-17} 69 ${x} 101`} fill="none" stroke="#53794d" strokeWidth="6"/>)}</>;break;
  case 'pineapple':art=<><path d="M50 38L32 17L53 26L54 8L66 25L85 11L79 30L98 27L74 46Z" fill="#67905e"/><ellipse cx="61" cy="78" rx="31" ry="36" fill="#d3af5b"/>{[52,68,84,100].map(y=><path key={y} d={`M34 ${y}L85 ${y+12}M35 ${y+12}L86 ${y}`} fill="none" stroke="#a08344" strokeWidth="2"/>)}</>;break;
  case 'mango':art=<><path d="M80 25Q114 51 87 91Q57 126 29 104Q13 75 37 52Q54 31 80 25Z" fill="#e5b467"/><path d="M80 25L83 14" stroke="#7b774c" strokeWidth="5"/><path d="M36 83Q34 98 49 101" fill="none" stroke="#f9ddb1" strokeWidth="5"/></>;break;
  case 'strawberry':art=<><path d="M29 43Q60 28 90 43Q106 69 63 111Q22 85 22 60Z" fill="#cf6b72"/><path d="M60 42L35 28L47 43L28 45L52 53L63 38L79 53L98 40L76 40L83 25Z" fill="#6d965e"/>{[[39,63],[58,64],[79,64],[49,82],[69,82],[61,97]].map(([x,y])=><path key={x+'-'+y} d={`M${x} ${y}l-1 4`} stroke="#ffe0b0" strokeWidth="3"/>)}</>;break;
  case 'pear':art=<><path d="M49 29Q63 18 77 35L81 57Q110 77 90 103Q69 120 41 106Q15 85 40 60Z" fill="#b8bd70"/><path d="M61 30L65 11" stroke="#7b6543" strokeWidth="5"/>{leaf}<path d="M37 78Q32 90 43 97" fill="none" stroke="#e1e2ac" strokeWidth="5"/></>;break;
  case 'papaya':art=<><ellipse cx="61" cy="70" rx="29" ry="46" transform="rotate(23 61 70)" fill="#d9b85c"/><ellipse cx="68" cy="74" rx="22" ry="37" transform="rotate(23 68 74)" fill="#e79255"/><ellipse cx="68" cy="74" rx="9" ry="25" transform="rotate(23 68 74)" fill="#6a5340"/>{[55,68,81,91].map(y=><circle key={y} cx="68" cy={y} r="3" fill="#2e3436" stroke="none"/>)}</>;break;
  default:art=<circle cx="60" cy="60" r="34" fill="#d5ddd9"/>;
 }
 return <svg className={'extra-picture '+className} viewBox="0 0 120 130" role="img" aria-label={label||extraWord(id)?.meaning||id}><g stroke="#455459" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">{art}</g></svg>;
}
