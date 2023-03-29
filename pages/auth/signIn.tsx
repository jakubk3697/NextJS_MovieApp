import { NextPage } from "next";
import { EventHandler, FormEvent, useState } from "react";
import Link from "next/link";
import firebase from '@/firebase/clientApp';
import { useSession } from "next-auth/react";

const SignIn: NextPage = (props): JSX.Element => {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const { data: session } = useSession();

  
  console.log("session", session);
  
  

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Sign in with Firebase Authentication
      const authResult = await firebase.auth().signInWithEmailAndPassword(userInfo.email, userInfo.password);

      // Access the user object and uid here
      const user = authResult.user;
      console.log("Sign-in successful:", user);
    } catch (error) {
      // Handle sign-in errors
      console.error("Sign-in error:", error);
    }
  };

  return (
    <div className="bg-gray-100 flex flex-col justify-center max-w-md mx-auto py-6 px-6 lg:px-8">
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <h1 className="text-center font-bold text-2 xl text-black">
          Sign In
        </h1>
        <input
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          value={userInfo.email}
          onChange={({ target }) =>
            setUserInfo({ ...userInfo, email: target.value})
          }
          type="email"
          placeholder="Email address"
        />
        <input
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          value={userInfo.password}
          onChange={({ target }) =>
            setUserInfo({ ...userInfo, password: target.value })
          }
          type="password"
          placeholder="Password"
        />
        <input
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-900 focus:outline-none cursor-pointer focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          type="submit"
          value="Login"
        />
      </form>
      <p className="text-black mt-3">Do not have a account? <Link href="/auth/signUp" className="text-red-600 hover:opacity-90 cursor-pointer">Sign up</Link></p>
    </div>
  );
};

export default SignIn;