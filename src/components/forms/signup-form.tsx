"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import type { z } from "zod"

import { catchClerkError } from "@/lib/utils"
import { createUserSchema } from "@/lib/validations/auth"
import { Button } from "@/components/ui/button"
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
import { createUserAccountAction } from "@/app/_actions/user"
import { signIn } from "next-auth/react"

type Inputs = z.infer<typeof createUserSchema>

export function SignUpForm() {
  const router = useRouter()
  // const { isLoaded, signUp } = useSignUp()
  const [isLoaded, setIsLoaded] = React.useState(false)
  const [isPending, startTransition] = React.useTransition()

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(data: Inputs) {
    // if (!isLoaded) return

    startTransition(async () => {
      try {
        const res = await createUserAccountAction(data)
        router.push("/")
        toast.message("Cadastro", {
          description: res.msg,
        })
        signIn("Credentials", {
          email: data.email,
          password: data.password,
        })
      } catch (err) {
        catchClerkError(err)
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
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
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <PasswordInput placeholder="**********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar senha</FormLabel>
              <FormControl>
                <PasswordInput placeholder="**********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {isPending && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Continue
          <span className="sr-only">Continue to email verification page</span>
        </Button>
      </form>
    </Form>
  )
}
