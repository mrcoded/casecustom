import argon2 from "argon2";
import { db } from "@/config/db";
import { User, NextAuthOptions } from "next-auth";

import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "user@email.com" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "*******",
        },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Please provide both email and password.");
          }

          // Find user in the database
          const existingUser = await db.user.findUnique({
            where: { email: credentials.email },
          });

          if (!existingUser) {
            throw new Error("Incorrect email! Please Try again.");
          }

          // Check if password matches
          const isPasswordValid = await argon2.verify(
            existingUser.password,
            credentials.password,
          );

          if (!isPasswordValid) {
            throw new Error("Incorrect password! Please Try again.");
          }

          // Return user data to be included in the JWT
          const user = {
            id: existingUser.id,
            email: existingUser.email,
            name: existingUser.name,
          };

          return user as User;
        } catch (error) {
          // console.log(error);
          if (error instanceof Error && error.message.includes("TURBOPACK")) {
            throw new Error("Internal Server Error");
          }
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          name: token.name,
          email: token.email,
        };
      }
      // console.log("Session: ", session);
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
  },
};
