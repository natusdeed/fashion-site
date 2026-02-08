import type { NextAuthConfig } from "next-auth";

/**
 * Edge-compatible auth config for middleware. Must NOT import Prisma or any
 * Node.js-only modules — middleware runs in Edge Runtime.
 * Full auth with Prisma/Credentials lives in auth.ts for API routes.
 */
export default {
  providers: [], // Required by NextAuth; actual providers are in auth.ts
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/login",
    error: "/auth/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
