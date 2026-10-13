import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {fileURLToPath} from 'node:url';
const cloudflare=Boolean(process.env.VITE_HANZI_API_URL);
const local=(path:string)=>fileURLToPath(new URL(path,import.meta.url));
export default defineConfig({
 base:'/hanzi-steps/',
 plugins:[react()],
 resolve:{alias:[
  {find:'./progress-transport',replacement:local(cloudflare?'./pages/cloudflare-progress.ts':'./pages/progress-transport.ts')},
  ...(cloudflare?[{find:'./backend',replacement:local('./pages/cloudflare-backend.ts')},{find:'@/pages/backend',replacement:local('./pages/cloudflare-backend.ts')}]:[]),
  {find:'@',replacement:local('./')},
 ]},
 build:{outDir:'dist-pages',emptyOutDir:true},
 server:{host:'0.0.0.0'},
});
