import { type Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { env } from "@/env.mjs"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { SignUpForm } from "@/components/forms/signup-form"
import { Shell } from "@/components/shells/shell"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Sign Up",
  description: "Sign up for an account",
}

export default async function SignUpPage() {
  // const user = await currentUser()
  // if (user) redirect("/")

  return (
    <Shell className="max-w-lg">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Inscrever-se</CardTitle>
          {/* <CardDescription>
            Choose your preferred sign up method
          </CardDescription> */}
        </CardHeader>
        <CardContent className="grid gap-4">
          <SignUpForm />
        </CardContent>
        <CardFooter>
          <div className="text-sm text-muted-foreground">
            Já tem uma conta?{" "}
            <Link
              aria-label="Entrar"
              href="/signin"
              className="text-primary underline-offset-4 transition-colors hover:underline"
            >
              Entrar
            </Link>
          </div>
        </CardFooter>
      </Card>
    </Shell>
  )
}
