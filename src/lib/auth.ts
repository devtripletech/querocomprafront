import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google"
import { PrismaAdapter } from "./adapters/prisma-adapter"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,

      profile(profile: GoogleProfile) {
        return {
          id: profile.sub,
          name: profile.name,
          username: "",
          email: profile.email,
          avatar_url: profile.picture,
        }
      },
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const res = await fetch("/your/endpoint", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        })
        const user = await res.json()

        // If no error and we have user data, return it
        if (res.ok && user) {
          return user
        }
        // Return null if user data could not be retrieved
        return null
      },
    }),
  ],
  callbacks: {
    session({ session, user, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          accessToken: token.accessToken,
          role: token.role,
          Key: token.randomKey,
        },
      }
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any
        return {
          ...token,
          accessToken: u.accessToken,
          role: u.role,
          Key: u.randomKey,
        }
      }
      return token
    },
  },
  pages: {
    signIn: "/signin",
    error: "/signin",
  },
}
