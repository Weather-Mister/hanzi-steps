import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {fileURLToPath} from 'node:url';
const local=(path:string)=>fileURLToPath(new URL(path,import.meta.url));
export default defineConfig({
 base:'/hanzi-steps/',
 plugins:[react()],
 resolve:{alias:[
  {find:'./progress-transport',replacement:local('./pages/progress-transport.ts')},
  {find:'@',replacement:local('./')},
 ]},
 build:{outDir:'dist-pages',emptyOutDir:true},
 server:{host:'0.0.0.0'},
});
