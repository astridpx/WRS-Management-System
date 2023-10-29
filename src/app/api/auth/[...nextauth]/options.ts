import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { ILogin } from "../../../../../typings";

export const options: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 10 * 60 * 60,
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email:",
          type: "text",
          placeholder: "your-cool-email",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "your-awesome-password",
        },
        role: {
          type: "text",
        },
      },
      async authorize(credentials) {
        const { username, password, isDesktop, deviceName } =
          credentials as any;

        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/login`, {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            username,
            password,
            isDesktop,
            deviceName,
          }),
        });

        const user = await res.json();

        // If no error and we have user data, return it
        if (res?.ok && user?.isAuth) {
          return user?.user;
        } else throw new Error(user?.message);

        // This is where you need to retrieve user data
        // to verify with credentials
        // Docs: https://next-auth.js.org/configuration/providers/credentials
        // const user = { id: "42", email: "john@gmail.com", password: "1234" };

        // if (
        //   credentials?.email === user.email &&
        //   credentials?.password === user.password
        // ) {
        //   console.log(user);

        //   return user;
        // } else {
        //   return null;
        // }
      },
    }),
  ],
  pages: {
    signIn: "/Login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return { ...token, ...user };
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user = token as any;
        // setUser({ ...session.user });
      }
      return session;
    },
  },
};
