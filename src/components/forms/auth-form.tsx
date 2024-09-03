"use client"

import { useRouter, useSearchParams } from "next/navigation"

import { zodResolver } from "@hookform/resolvers/zod"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import type { z } from "zod"

import { cn } from "@/lib/utils"
import { authSchema } from "@/lib/validations/auth"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"
import { PasswordInput } from "@/components/password-input"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { toast } from "sonner"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import { useMounted } from "@/hooks/use-mounted"
import { Skeleton } from "../ui/skeleton"

type Inputs = z.infer<typeof authSchema>

export function AuthForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams && searchParams.get("callbackUrl")

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    signIn("Credentials", {
      ...data,
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          toast.error("usuário ou senha inválido")
        } else {
          router.push(callbackUrl ?? "/dashboard/account")
        }
      })
      .finally(() => setIsLoading(false))
  }

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  return (
    <>
      <Card className="border-spacing-0 border-none shadow-none">
        <CardHeader className="space-y-1">
          <CardTitle className="text-base font-medium text-center">
            Faça o login ou crie a sua conta
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          <Form {...form}>
            <form
              className="grid gap-3"
              onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <PasswordInput placeholder="Senha" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-center">
                <Link
                  aria-label="esqueceu a senha?"
                  href="/esqueceu-a-senha"
                  className="text-base font-medium text-primary underline  transition-colors"
                >
                  esqueceu a senha?
                </Link>
              </div>

              <Button className="mt-2" disabled={isLoading} type="submit">
                {isLoading && (
                  <Icons.spinner
                    className="mr-2 h-4 w-4 animate-spin"
                    aria-hidden="true"
                  />
                )}
                Login
                <span className="sr-only">Login</span>
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  router.push("/cadastro", { scroll: false })
                }}
              >
                Criar conta
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  )
}
