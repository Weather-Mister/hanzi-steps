import {DurableObject} from 'cloudflare:workers';
import type {Env} from './contracts';
import {deliverScheduledPush} from './push';
// Only the Worker can reach this object. Clients have a read-only WebSocket;
// client messages cannot publish fabricated progress updates or touch D1.
export class WidgetEvents extends DurableObject<Env>{
 async fetch(request:Request){
  const path=new URL(request.url).pathname;
  if(path==='/push'&&request.method==='POST'){
   const {endpoint,now}=await request.json() as {endpoint:string;now:number};
   return Response.json(await deliverScheduledPush(this.env,endpoint,now));
  }
  if(path==='/connect'&&request.headers.get('upgrade')?.toLowerCase()==='websocket'){
   const pair=new WebSocketPair(),[client,server]=Object.values(pair);
   this.ctx.acceptWebSocket(server);
   return new Response(null,{status:101,webSocket:client});
  }
  if(path==='/publish'&&request.method==='POST'){
   const {account}=await request.json() as {account:string};
   const message=JSON.stringify({event:'progress',topic:'hanzi-progress:'+account,payload:{}});
   for(const socket of this.ctx.getWebSockets()){try{socket.send(message);}catch{socket.close(1011,'Reconnect');}}
   return new Response(null,{status:204});
  }
  return new Response('Not found',{status:404});
 }
 webSocketMessage(socket:WebSocket,message:string|ArrayBuffer){
  if(message==='ping')socket.send('pong');
 }
 webSocketClose(socket:WebSocket,code:number){socket.close(code,'');}
 webSocketError(socket:WebSocket){socket.close(1011,'Reconnect');}
}
