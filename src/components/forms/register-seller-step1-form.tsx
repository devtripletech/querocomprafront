"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import type { z } from "zod"

import { catchError } from "@/lib/utils"

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
import { ChevronRight } from "lucide-react"

import Link from "next/link"
import { registerSellerStep1Schema } from "@/lib/validations/auth"

type Inputs = z.infer<typeof registerSellerStep1Schema>

export function RegisterSellerStep1Form() {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<Inputs>({
    mode: "onChange",
    resolver: zodResolver(registerSellerStep1Schema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        //const res = await createUserAccountAction(data)
        // router.push("/")
        // toast.message("Cadastro", {
        //   description: res.msg,
        // })
        signIn("Credentials", {
          email: data.email,
          password: data.password,
        })
      } catch (err) {
        catchError(err)
      }
    })
  }

  return (
    <>
      <Form {...form}>
        <form
          className="grid gap-3"
          onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
        >
          <div className="text-base font-medium text-center  mb-2">
            Preencha os campos abaixo
          </div>
          <FormField
            control={form.control}
            name="razaoSocial"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Razão Social" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nomeFantasia"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Nome Fantasia" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PasswordInput placeholder="Repita sua senha" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="mt-2" type="submit" disabled={isPending}>
            {isPending && (
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Continuar
            <ChevronRight className="h-5" />
            <span className="sr-only">Continuar</span>
          </Button>
        </form>
      </Form>

      <div className="text-sm px-8 mt-5">
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
    </>
  )
}
