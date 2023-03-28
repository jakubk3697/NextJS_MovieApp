import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export const authOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'FirebaseCredentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'admin' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const { username, password } = credentials as { username: string, password: string };
        const db = getFirestore();
        const q = query(collection(db, "users"), where("username", "==", username));
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot);
        const userDoc = querySnapshot.docs[0];

        if (userDoc) {
          const user = userDoc.data();
          if (user.password === password) {
            return user;
          } else {
            throw new Error("Invalid password");
          }
        } else {
          throw new Error("User not found");
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/signIn',
  }
}
export default NextAuth(authOptions)

