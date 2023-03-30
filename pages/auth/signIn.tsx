import { NextPage } from "next";
import { FormEvent, useRef, useState } from "react";
import SignForm from "@/components/authentication/SignForm";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { extractUserFriendlyMessage } from "@/utils/validation";

/**
 * @description Sign In page component to sign in with Firebase Authentication. 
 * It uses Firebase Authentication to sign in with email and password.
 * @returns JSX.Element - Sign In page component to sign in with Firebase Authentication
 */
const SignIn: NextPage = (): JSX.Element => {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>("" as any);
  const passwordRef = useRef<HTMLInputElement>("" as any);
  const [formError, setFormError] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailValue = emailRef.current.value;
    const passwordValue = passwordRef.current.value;
    
    const result = await signIn("credentials", {
      email: emailValue,
      password: passwordValue,
      redirect: false,
    })
    if(result?.error) {
      setFormError(result.error);
    } else {
      setFormError("");
      router.push("/");
    }
    
  };
  
  const errorMessage = extractUserFriendlyMessage(formError) || "";
  return (
    <SignForm
      handleSubmit={handleSubmit}
      title="Sign In"
      emailRef={emailRef}
      passwordRef={passwordRef}
      redirectTitle="Sign Up"
      redirectText="Don't have an account?"
      redirectRoute="/auth/signUp"
      errorMessage={errorMessage}
    />
  );
};

export default SignIn;