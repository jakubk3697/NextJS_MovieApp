import { NextPage } from "next";
import { FormEventHandler } from "react";
import Link from "next/link";
import { addUser } from "@/components/authentication/addUser";
import { useRef } from "react";
import SignForm from "@/components/authentication/SignForm";

/**
 * @description Sign Up page
 * @returns JSX.Element - Sign Up page component with form to register user account in Firebase Authentication and firestore database
 */
const SignUp: NextPage = (): JSX.Element => {
  const emailRef = useRef<HTMLInputElement>("" as any);
  const passwordRef = useRef<HTMLInputElement>("" as any);
  /**
   * @todo add function  to set role
   */
  const roleRef = useRef<string>("loggedUser" as any); 

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const emailValue = emailRef.current.value;
    const usernameValue = emailValue?.slice(0, emailValue.indexOf("@"));
    const passwordValue = passwordRef.current.value;
    const roleValue = roleRef.current;
  
    const res = await addUser(usernameValue, emailValue, passwordValue, roleValue);
  };
 
  return (
   <SignForm
      handleSubmit={handleSubmit}
      title="Sign Up"
      emailRef={emailRef}
      passwordRef={passwordRef}
      redirectTitle="Sign In"
      redirectText="Already have an account?"
      redirectRoute="/auth/signIn"
   />
  );
};

export default SignUp;