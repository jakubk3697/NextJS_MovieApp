import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

interface myUser extends User {
  password: string;
}

import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'Username' },
        password: { label: 'Password', type: 'password', placeholder: 'Password' },
      },
      async authorize(credentials, req) {
        if (!credentials || !credentials.username || !credentials.password) {
          throw new Error("Missing credentials");
        }
        
        const db = getFirestore();
        const q = query(collection(db, "users"), where("username", "==", credentials?.username));
        const querySnapshot = await getDocs(q);
        const userDoc = querySnapshot.docs[0];

        if (userDoc) {
          const user = userDoc.data() as myUser;
          
          if (await bcrypt.compare(credentials?.password, user.password)) {
            return user;
          } else {
            throw new Error("Invalid password");
          }
        } else {
          throw new Error("User not found");
        }
      }
    }),
    
  ],
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  pages: {
    signIn: '/auth/signIn',
    signUp: '/auth/signUp',
  }
}

export default NextAuth(authOptions as any)
