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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
        <CardHeader className="space-y-1"></CardHeader>
        <CardContent className="grid gap-4">
          <Tabs defaultValue="comprador">
            <div className="flex items-center justify-center">
              <TabsList className="grid w-[230px] grid-cols-2">
                <TabsTrigger value="comprador">Comprador</TabsTrigger>
                <TabsTrigger value="vendedor">Vendedor</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="comprador">
              <SignUpForm />
            </TabsContent>

            <TabsContent value="vendedor"></TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </Shell>
  )
}
