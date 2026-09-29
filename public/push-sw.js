self.addEventListener('push',event=>{
 let payload={};
 try{payload=event.data?event.data.json():{}}catch{payload={body:event.data?.text()||''}}
 const title=payload.title||'Hanzi Steps';
 const options={
  body:payload.body||'A little Chinese is waiting for you.',
  tag:payload.tag||'hanzi-steps',
  icon:new URL('pwa-v3-192.png',self.registration.scope).href,
  badge:new URL('pwa-v3-192.png',self.registration.scope).href,
  data:payload.data||{url:'./'},
 };
 event.waitUntil(self.registration.showNotification(title,options));
});

self.addEventListener('notificationclick',event=>{
 event.notification.close();
 const target=new URL(event.notification.data?.url||'./',self.registration.scope).href;
 event.waitUntil((async()=>{
  const windows=await self.clients.matchAll({type:'window',includeUncontrolled:true});
  for(const client of windows){
   if('focus' in client){
    if('navigate' in client)await client.navigate(target);
    return client.focus();
   }
  }
  return self.clients.openWindow(target);
 })());
});
