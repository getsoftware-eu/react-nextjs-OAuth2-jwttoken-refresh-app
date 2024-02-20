import NextAuth, { AuthOptions, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

const MINUTE = 60;
const HOUR = 60 * MINUTE;

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied

        const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
        });
        const user = await res.json();

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  session: {
    maxAge: 8 * HOUR, // 8 hours
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user, session }) {
      console.log("jwt callback ", { token, user, session  });

      // if (user) {
      //     token.accessToken = user.accessToken;
      //     token.refreshToken = user.refreshToken;
      //     token.accessTokenExpires = user.accessTokenExpires;
      //     // token.role = user.role;
      //     token.id = user.id;
      //     token.name = user.name;
      //     token.email = user.email;
      //     // token.jwt = user.jwt;
      // }
      
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      console.log("session callback ", { token, user, session });

      session.user = token as any;

      // session.user.id = token.id;
      // session.user.accessToken = token.accessToken;
      // session.user.refreshToken = token.refreshToken;
      // session.user.name = token.name;
      // session.user.email = token.email;
      
      return session;
    },
  },
};
export default NextAuth(authOptions);
