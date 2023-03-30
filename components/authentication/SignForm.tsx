import Link from "next/link";
import {SignFormProps} from "@/types";
import { useSession } from "next-auth/react";

/**
 * 
 * @param title title of form 
 * @param emailRef reference to email input from props
 * @param passwordRef reference to password input from props
 * @param redirectTitle title of where user will be redirected to
 * @param redirectText text info for user displayed before redirect link
 * @param redirectRoute route which user will be redirected to
 * @description form component for sign in and sign up pages
 * @returns form component with title, email input, password input, submit button, and redirect link taken from props
 */
const SignForm = ({handleSubmit, title, emailRef, passwordRef, redirectTitle, redirectText, redirectRoute, errorMessage }:SignFormProps): JSX.Element => {
  // const { data: session, status } = useSession();
  // console.log({session});
  // console.log({status});
  
  return (
    <div className="bg-gray-100 flex flex-col justify-center max-w-md mx-auto py-6 px-6 lg:px-8">
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <h1 className="text-center font-bold text-2 xl text-black">
          {title}
        </h1>
        <input
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          ref={emailRef}
          type="email"
          placeholder="Email address"
        />
        <input
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          ref={passwordRef}
          type="password"
          placeholder="Password"
        />
        <input
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-900 focus:outline-none cursor-pointer focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          type="submit"
          value={title}
        />
      </form>
      <p className="text-black mt-3">{redirectText} <Link href={redirectRoute} className="text-red-600 hover:opacity-90 cursor-pointer">{redirectTitle}</Link></p>
      {errorMessage && <p className="text-red-600 mt-3">{errorMessage}</p>}
    </div>
  );
};

export default SignForm;