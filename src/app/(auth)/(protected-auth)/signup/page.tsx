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
import { currentUser } from "@/app/_actions/user"
import { UserPayload } from "@/lib/validations/auth"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Cadastro",
  description: "",
}

export default async function SignUpPage() {
  const user = (await currentUser()) as unknown as UserPayload

  if (user && user.uservalido === 0) {
    redirect("/dashboard/account/personal")
  }

  return (
    <Shell className="max-w-lg">
      <Card className="border-spacing-0 border-none shadow-none">
        <CardHeader className="space-y-1">
          <CardTitle className="text-base font-medium text-center">
            Preencha os campos abaixo
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <SignUpForm />
        </CardContent>
        <CardFooter>
          <div className="text-sm px-8">
            Ao criar uma conta, eu aceito os{" "}
            <Link
              aria-label="Termos e condições"
              href="/"
              className="text-blue-dark underline-offset-4 transition-colors underline"
            >
              Termos e condições
            </Link>{" "}
            e a{" "}
            <Link
              aria-label="Política de Dados privados."
              href="/"
              className="text-blue-dark underline-offset-4 transition-colors underline"
            >
              Política de Dados privados.
            </Link>
          </div>
        </CardFooter>
      </Card>
    </Shell>
  )
}
