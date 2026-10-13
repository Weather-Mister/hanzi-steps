import {generateKeyPairSync,randomBytes,publicEncrypt,privateDecrypt,createCipheriv,createDecipheriv,createHash,createPublicKey,constants} from 'node:crypto';
import {readFileSync,writeFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
const algorithm='hanzi-rsa-oaep-sha256-aes-256-gcm-v1';
export const digest=value=>createHash('sha256').update(value).digest('hex');
export function createTransferKey(databaseId,workerUrl){
 const pair=generateKeyPairSync('rsa',{modulusLength:3072,publicKeyEncoding:{type:'spki',format:'pem'},privateKeyEncoding:{type:'pkcs8',format:'pem'}});
 const manifest={algorithm,databaseId,workerUrl,keyId:digest(pair.publicKey),publicKey:pair.publicKey};
 return {manifest,privateKey:pair.privateKey};
}
function aad(manifest){return Buffer.from(JSON.stringify([algorithm,manifest.databaseId,manifest.workerUrl,manifest.keyId]));}
export function sealTransfer(payload,manifest){
 if(manifest.algorithm!==algorithm||digest(manifest.publicKey)!==manifest.keyId)throw new Error('Invalid transfer manifest.');
 const key=randomBytes(32),iv=randomBytes(12);
 const cipher=createCipheriv('aes-256-gcm',key,iv);cipher.setAAD(aad(manifest));
 const encrypted=Buffer.concat([cipher.update(JSON.stringify(payload)),cipher.final()]);
 const sealedKey=publicEncrypt({key:manifest.publicKey,padding:constants.RSA_PKCS1_OAEP_PADDING,oaepHash:'sha256'},key);
 return {algorithm,databaseId:manifest.databaseId,workerUrl:manifest.workerUrl,keyId:manifest.keyId,iv:iv.toString('base64'),tag:cipher.getAuthTag().toString('base64'),sealedKey:sealedKey.toString('base64'),ciphertext:encrypted.toString('base64')};
}
export function openTransfer(envelope,privateKey,manifest){
 try{
  for(const field of ['algorithm','databaseId','workerUrl','keyId'])if(envelope[field]!==manifest[field])throw new Error();
  if(digest(createPublicKey(privateKey).export({type:'spki',format:'pem'}))!==manifest.keyId)throw new Error();
  const key=privateDecrypt({key:privateKey,padding:constants.RSA_PKCS1_OAEP_PADDING,oaepHash:'sha256'},Buffer.from(envelope.sealedKey,'base64'));
  const decipher=createDecipheriv('aes-256-gcm',key,Buffer.from(envelope.iv,'base64'));decipher.setAAD(aad(manifest));decipher.setAuthTag(Buffer.from(envelope.tag,'base64'));
  return JSON.parse(Buffer.concat([decipher.update(Buffer.from(envelope.ciphertext,'base64')),decipher.final()]).toString('utf8'));
 }catch{throw new Error('Encrypted transfer authentication failed.');}
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const [input,manifestFile,output]=process.argv.slice(2);
 if(!input||!manifestFile||!output)throw new Error('Usage: node scripts/cloudflare-sealed-transfer.mjs PRIVATE.json PUBLIC-MANIFEST.json ENCRYPTED.json');
 const envelope=sealTransfer(JSON.parse(readFileSync(input,'utf8')),JSON.parse(readFileSync(manifestFile,'utf8')));
 writeFileSync(output,JSON.stringify(envelope)+'\n',{mode:0o600});console.log('Encrypted migration bundle prepared.');
}
