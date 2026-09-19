import {getProgressUserKey} from '@/lib/progress-user';
import {getChatGPTUser} from '@/app/chatgpt-auth';
import {AccountPanel} from './account-panel';
import {LearningApp} from '@/components/learning-app';
export const dynamic='force-dynamic';
export default async function Home(){
 const user=await getChatGPTUser();
 const signInPanel=<AccountPanel user={null}/>;
 const accountPanel=<AccountPanel user={user}/>;
 return <LearningApp key={user?.email||'signed-out'} userKey={(await getProgressUserKey())||'signed-out'} accountPanel={accountPanel} signInPanel={signInPanel}/>;
}
