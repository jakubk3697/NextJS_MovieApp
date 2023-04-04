import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import firebase from "@/firebase/clientApp";
import GitHubProvider from "next-auth/providers/github";

const firestore = firebase.firestore();

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Email and password',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'Email' },
        password: { label: 'Password', type: 'password', placeholder: 'Password' },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Missing credentials");
        }
        try {
          const userCredential = await firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password);
          const user = userCredential.user;
          const userDoc = await firestore.collection("users").doc(user?.uid).get();
          const role = userDoc.data()?.role;

          return {
            id: user?.uid || "",
            email: user?.email || "",
            role,
          };
        } catch (error: any) {
          throw new Error(error.message);
        }
        
      }
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
  
    }),
  ],
  
  session: {
    strategy: 'jwt',
  },
  
  pages: {
    signIn: '/auth/signIn',
    signUp: '/auth/signUp',
  }
}

export default NextAuth(authOptions as any)
