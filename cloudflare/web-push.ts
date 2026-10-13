// RFC 8291 single-record aes128gcm and RFC 8292 VAPID, using Workers Web Crypto.
// No Node HTTP client, private signing key in source, or push relay is required.
import {ApiError} from './contracts';
const encoder=new TextEncoder();
export const encode64=(value:Uint8Array)=>btoa(String.fromCharCode(...value)).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
export function decode64(value:string){return Uint8Array.from(atob(value.replace(/-/g,'+').replace(/_/g,'/')),char=>char.charCodeAt(0));}
const bytes=(value:Uint8Array)=>value as Uint8Array<ArrayBuffer>;
const concat=(...parts:Uint8Array[])=>{const out=new Uint8Array(parts.reduce((sum,x)=>sum+x.length,0));let at=0;for(const part of parts){out.set(part,at);at+=part.length;}return out;};
async function hkdf(key:Uint8Array,salt:Uint8Array,info:Uint8Array,length:number){
 const material=await crypto.subtle.importKey('raw',bytes(key),'HKDF',false,['deriveBits']);
 return new Uint8Array(await crypto.subtle.deriveBits({name:'HKDF',hash:'SHA-256',salt:bytes(salt),info:bytes(info)},material,length*8));
}
export function validateEndpoint(endpoint:unknown):string{
 if(typeof endpoint!=='string'||endpoint.length<20||endpoint.length>2048)throw new ApiError('Invalid push subscription.');
 let url:URL;try{url=new URL(endpoint)}catch{throw new ApiError('Invalid push subscription.');}
 const hosts=['fcm.googleapis.com','updates.push.services.mozilla.com','web.push.apple.com'];
 const windows=url.hostname.endsWith('.notify.windows.com');
 if(url.protocol!=='https:'||url.username||url.password||url.port||url.hash||(!hosts.includes(url.hostname)&&!windows))
  throw new ApiError('Unsupported push service.');
 return endpoint;
}
export async function encryptedBody(payload:string,recipientKey:string,authSecret:string){
 const plain=encoder.encode(payload);
 if(plain.length>3993)throw new ApiError('Notification is too large.');
 const ua=decode64(recipientKey),auth=decode64(authSecret);
 if(ua.length!==65||ua[0]!==4||auth.length!==16)throw new ApiError('Invalid push encryption keys.');
 const pair=await crypto.subtle.generateKey({name:'ECDH',namedCurve:'P-256'},true,['deriveBits']) as CryptoKeyPair;
 const as=new Uint8Array(await crypto.subtle.exportKey('raw',pair.publicKey) as ArrayBuffer);
 const recipient=await crypto.subtle.importKey('raw',bytes(ua),{name:'ECDH',namedCurve:'P-256'},false,[]);
 const shared=new Uint8Array(await crypto.subtle.deriveBits({name:'ECDH',public:recipient} as Parameters<typeof crypto.subtle.deriveBits>[0],pair.privateKey,256));
 const ikm=await hkdf(shared,auth,concat(encoder.encode('WebPush: info\0'),ua,as),32);
 const salt=crypto.getRandomValues(new Uint8Array(16));
 const cek=await hkdf(ikm,salt,encoder.encode('Content-Encoding: aes128gcm\0'),16);
 const nonce=await hkdf(ikm,salt,encoder.encode('Content-Encoding: nonce\0'),12);
 const key=await crypto.subtle.importKey('raw',bytes(cek),'AES-GCM',false,['encrypt']);
 const encrypted=new Uint8Array(await crypto.subtle.encrypt({name:'AES-GCM',iv:bytes(nonce)},key,bytes(concat(plain,new Uint8Array([2])))));
 const rs=new Uint8Array(4);new DataView(rs.buffer).setUint32(0,4096);
 return concat(salt,rs,new Uint8Array([as.length]),as,encrypted);
}
export async function vapidAuthorization(endpoint:string,publicKey:string,privateKey:string,subject:string,now=Date.now()){
 const pub=decode64(publicKey),priv=decode64(privateKey);
 if(pub.length!==65||pub[0]!==4||priv.length!==32||!/^mailto:|^https:\/\//.test(subject))throw new Error('Invalid VAPID configuration');
 const key=await crypto.subtle.importKey('jwk',{kty:'EC',crv:'P-256',x:encode64(pub.slice(1,33)),y:encode64(pub.slice(33)),d:encode64(priv),ext:true},{name:'ECDSA',namedCurve:'P-256'},false,['sign']);
 const header=encode64(encoder.encode(JSON.stringify({typ:'JWT',alg:'ES256'})));
 const payload=encode64(encoder.encode(JSON.stringify({aud:new URL(endpoint).origin,exp:Math.floor(now/1000)+12*60*60,sub:subject})));
 const unsigned=header+'.'+payload;
 const sig=new Uint8Array(await crypto.subtle.sign({name:'ECDSA',hash:'SHA-256'},key,encoder.encode(unsigned)));
 return `vapid t=${unsigned}.${encode64(sig)}, k=${publicKey}`;
}
export class PushError extends Error {statusCode:number;constructor(status:number){super('Push delivery failed');this.statusCode=status;}}
export async function sendPush(target:{endpoint:string;p256dh:string;auth:string},payload:string,config:{publicKey:string;privateKey:string;subject:string},ttl=21600,urgency='normal'){
 validateEndpoint(target.endpoint);
 const [body,authorization]=await Promise.all([encryptedBody(payload,target.p256dh,target.auth),vapidAuthorization(target.endpoint,config.publicKey,config.privateKey,config.subject)]);
 const response=await fetch(target.endpoint,{method:'POST',headers:{Authorization:authorization,'Content-Encoding':'aes128gcm','Content-Type':'application/octet-stream',TTL:String(ttl),Urgency:urgency},body:bytes(body),redirect:'manual',signal:AbortSignal.timeout(10000)});
 if(!response.ok)throw new PushError(response.status);
}
