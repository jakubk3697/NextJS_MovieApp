import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'redentials',
      credentials: {
        email: {label: 'Email', type: 'text', placeholder: 'admin@wit.pl'},
        password: {label: 'Password', type: 'password', placeholder: '1234'},
      },
      async authorize(credentials, req) {
        const {email, password} = credentials as {email: string, password: string};
        if(email !== 'admin@wit.pl' || password !== '1234') {
          throw new Error('Invalid email or password');
        }
        return {id: 1, name: 'admin'};

      }
    })
  ],
  pages: {
    signIn: '/auth/signIn',
  }
}
export default NextAuth(authOptions)

