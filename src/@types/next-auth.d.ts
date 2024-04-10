import NextAuth from "next-auth"

declare module "next-auth" {
  export interface User {
    id: string
    id_user: number
    uservalido: number
    accessToken: string
    status: boolean
    role: number
  }

  interface Session {
    user: User
  }
}
