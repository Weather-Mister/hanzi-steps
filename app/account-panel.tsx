import {chatGPTSignInPath,chatGPTSignOutPath,type ChatGPTUser} from './chatgpt-auth';

// Native top-level links let the platform own the entire sign-in round trip,
// including when the learning app is displayed inside an embedded Site view.
export function AccountPanel({user}:{user:ChatGPTUser|null}){
 return user?<section className="account-panel signed-in"><div><strong>Signed in</strong><p className="account-email">{user.email}</p></div><a className="text-button" href={chatGPTSignOutPath('/')} target="_top">Sign out</a></section>:<section className="account-panel"><div><strong>Sign in to save your progress</strong><p>Your practice on this device can sync after you sign in.</p></div><a className="primary-button" href={chatGPTSignInPath('/')} target="_top">Sign in with ChatGPT</a></section>;
}
