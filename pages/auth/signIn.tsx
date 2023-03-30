import { NextPage } from "next";
import { FormEvent, useRef } from "react";
import firebase from '@/firebase/clientApp';
import SignForm from "@/components/authentication/SignForm";

/**
 * @description Sign In page component to sign in with Firebase Authentication. 
 * It uses Firebase Authentication to sign in with email and password.
 * @returns JSX.Element - Sign In page component to sign in with Firebase Authentication
 */
const SignIn: NextPage = (): JSX.Element => {
  const emailRef = useRef<HTMLInputElement>("" as any);
  const passwordRef = useRef<HTMLInputElement>("" as any);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailValue = emailRef.current.value;
    const passwordValue = passwordRef.current.value;

    try {
      // Sign in with Firebase Authentication
      const authResult = await firebase.auth().signInWithEmailAndPassword(emailValue, passwordValue);

      /**
       * @todo add function to set user in context
       * @todo add function to redirect to home page
       * @todo add function to show greeting message
       */
      const user = authResult.user;
    } catch (error) {
      // Handle sign-in errors
      console.error("Sign-in error:", error);
    }
  };

  return (
    <SignForm
      handleSubmit={handleSubmit}
      title="Sign In"
      emailRef={emailRef}
      passwordRef={passwordRef}
      redirectTitle="Sign Up"
      redirectText="Don't have an account?"
      redirectRoute="/auth/signUp"
    />
  );
};

export default SignIn;