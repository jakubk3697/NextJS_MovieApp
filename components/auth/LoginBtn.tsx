import { useSession, signIn, signOut } from "next-auth/react";

/**
 * @description Uses session to determine if user is logged in or not and show proper button to sign in or sign out
 * @returns button to sign in or sign out depending on session
 */
export default function LoginBtn() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session?.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}