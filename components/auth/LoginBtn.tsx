import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginBtn() {
  const { data: session, status } = useSession();

  return (
    <div>
      {status === 'unauthenticated' ? (
        <button
        className="bg-green-700 text-sm text-white tracking-wider py-2 px-3 rounded-lg hover:opacity-95"
        onClick={() => signIn()}
      >
        Sign in
      </button> 
      ) : 
      (
        <button
        className="bg-green-800 text-sm text-white tracking-wirder py-2 px-3 rounded-lg hover:opacity-95"
        onClick={() => signOut()}
      >
        Sign out
      </button>
      )}
    </div>
  );
}
