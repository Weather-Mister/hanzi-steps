import type {Session} from './curriculum';

// The original Sites build retains its transport. Pages replaces only this
// module, leaving checkpoint queues, lesson state, and rendering shared.
export function progressRequest(method:'GET'|'PUT', _account:string, body:Session|undefined, signal:AbortSignal){
 return fetch('/api/progress',{method,signal,credentials:'same-origin',headers:body?{'Content-Type':'application/json'}:undefined,body:body?JSON.stringify(body):undefined});
}
