export type Env={
 DB:D1Database;
 WIDGET_EVENTS?:DurableObjectNamespace;
 ALLOWED_ORIGINS:string;
 PUSH_ENABLED?:string;
 VAPID_PUBLIC_KEY?:string;
 VAPID_PRIVATE_KEY?:string;
 VAPID_SUBJECT?:string;
};
export type Args=Record<string,unknown>;
export class ApiError extends Error {
 status:number;code:string;
 constructor(message:string,status=400,code='22023'){super(message);this.status=status;this.code=code;}
}
export function object(value:unknown):value is Args{return !!value&&typeof value==='object'&&!Array.isArray(value);}
export function string(value:unknown,min=1,max=1024):value is string{return typeof value==='string'&&value.length>=min&&value.length<=max;}
export const validAccount=(value:unknown):value is string=>typeof value==='string'&&/^account-v1-[a-f0-9]{64}$/.test(value);
export async function resolveAccount(db:D1Database,value:unknown):Promise<string>{
 if(!validAccount(value)||!await db.prepare('SELECT 1 FROM username_accounts WHERE legacy_user_id=?').bind(value).first())
  throw new ApiError('Sign in to sync your progress.',401,'28000');
 return value;
}
export const practiceColumns='item_id AS itemId,mode,attempts,correct,assisted,misses,clean_correct AS cleanCorrect,clean_tracked AS cleanTracked,streak,strength,last_seen AS lastSeen,next_review AS nextReview';
