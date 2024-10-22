import { env } from "@/env.mjs"
import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials")
        }
        const { email, password } = credentials as {
          email: string
          password: string
        }

        const res = await fetch(`${env.API_URL}/login`, {
          method: "POST",
          body: JSON.stringify({
            password,
            email,
          }),
          headers: { "Content-Type": "application/json" },
        })
        const data = await res.json()

        const user = {
          id: data?.id_user,
          id_user: data?.id_user,
          uservalido: data?.uservalido,
          accessToken: data?.token,
          role: data?.role,
          status: data?.status,
          name: data?.name,
          email: data?.email,
        }

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
          id_user: token?.id_user,
          uservalido: token?.uservalido,
          accessToken: token?.accessToken,
          status: token?.status,
          role: token?.role,
          name: token?.name,
          email: token?.email,
          // Key: token.randomKey,
        },
      }
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any
        return {
          // ...token,
          id_user: u?.id_user,
          uservalido: u?.uservalido,
          accessToken: u?.accessToken,
          status: u?.status,
          role: u?.role,
          name: u?.name,
          email: u?.email,
          // Key: u.randomKey,
        }
      }
      return token
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
}
