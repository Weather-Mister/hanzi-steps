import {cloudflareClient} from './cloudflare-client';
const url=(import.meta.env.VITE_HANZI_API_URL||'').replace(/\/$/,'');
if(!url)throw new Error('Cloudflare backend URL is missing.');
export const backend=cloudflareClient(url);
