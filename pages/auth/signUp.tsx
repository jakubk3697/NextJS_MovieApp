import { NextPage } from "next";
import { FormEventHandler } from "react";
import { useRef, useState } from "react";
import SignForm from "@/components/authentication/SignForm";
import { useRouter } from "next/router";

/**
 * @description Sign Up page
 * @returns JSX.Element - Sign Up page component with form to register user account in Firebase Authentication and firestore database
 */
const SignUp: NextPage = (): JSX.Element => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();
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

    try {
      const response = await fetch('/api/post/users/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: usernameValue,
          email: emailValue,
          password: passwordValue,
          role: roleValue,
        }),
      });

      if (response.ok) {
        console.log('User created successfully');
        router.push('/auth/signIn');
      } else {
        const data = await response.json();
        setErrorMessage(data.error);
      }
    } catch (error) {
      console.error('Error creating user:', error);
      setErrorMessage('An unexpected error occurred.');
    }
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
      errorMessage={errorMessage}
   />
  );
};

export default SignUp;