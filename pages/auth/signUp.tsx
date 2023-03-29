import { NextPage } from "next";
import { FormEventHandler, useState } from "react";
import Link from "next/link";
import { addUser } from "@/components/authentication/addUser";

const SignUp: NextPage = (props): JSX.Element => {
  const [userInfo, setUserInfo] = useState({ username: "", email: "", password: "", role: "" });

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    // validate your userinfo
    e.preventDefault();
    const res = await addUser(userInfo.username, userInfo.email, userInfo.password, userInfo.role);

    console.log(userInfo);
  };

  const setUserNameAndEmail = (email: string) => {
    const username = email.slice(0, email.indexOf("@"));
    setUserInfo({ ...userInfo, email, username });
  }
 
  return (
    <div className="bg-gray-100 flex flex-col justify-center max-w-md mx-auto py-6 px-6 lg:px-8">
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <h1 className="text-center font-bold text-2 xl text-black">
          Sign Up
        </h1>
        <input
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          value={userInfo.email}
          onChange={({ target }) =>
            setUserNameAndEmail(target.value)
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
          value="Register"
        />
      </form>
      <p className="text-black mt-3">Already have an account? <Link href={'/auth/signIn'} className="text-red-600 hover:opacity-90 cursor-pointer">Sign up</Link></p>
    </div>
  );
};

export default SignUp;