import {getChatGPTUser} from '@/app/chatgpt-auth';

/** Server-only identity for progress and its temporary browser draft queue. */
export async function getProgressUserKey(): Promise<string | null> {
  const user = await getChatGPTUser();
  const email = user?.email.trim().toLowerCase();
  if (!email) return null;

  // This Site's dispatcher currently forwards authenticated email, but no user ID.
  // Use the starter's verified identity consistently, even if an optional ID is
  // added later. Never accept an identity from the checkpoint body or a cookie.
  // Hashing keeps the email out of the client props and progress records.
  const digest = await crypto.subtle.digest(
    'SHA-256', new TextEncoder().encode(`hanzi-steps/progress/v1:${email}`),
  );
  return `account-v1-${Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, '0')).join('')}`;
}
