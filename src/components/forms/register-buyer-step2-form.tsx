"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import type { z } from "zod"

import {
  catchError,
  normalizeCepNumber,
  normalizeCpfNumber,
  normalizePhoneNumber,
} from "@/lib/utils"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import Link from "next/link"
import { registerBuyerStep2Schema } from "@/lib/validations/auth"

type Inputs = z.infer<typeof registerBuyerStep2Schema>

export function RegisterBuyerStep2Form() {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<Inputs>({
    mode: "onChange",
    resolver: zodResolver(registerBuyerStep2Schema),
    defaultValues: {},
  })

  function onSubmit(data: Inputs) {
    console.log(data)
    startTransition(async () => {
      try {
        // const res = await createUserAccountAction(data)
        // router.push("/")
        // toast.message("Cadastro", {
        //   description: res.msg,
        // })
        // signIn("Credentials", {
        //   email: data.email,
        //   password: data.password,
        // })
      } catch (err) {
        catchError(err)
      }
    })
  }

  const cpfValue = form.watch("cpf")
  const telefoneValue = form.watch("telefone")
  const cepValue = form.watch("cep")

  React.useEffect(() => {
    form.setValue("cpf", normalizeCpfNumber(cpfValue))
  }, [cpfValue, form])

  React.useEffect(() => {
    form.setValue("cep", normalizeCepNumber(cepValue))
  }, [cepValue, form])

  React.useEffect(() => {
    form.setValue("telefone", normalizePhoneNumber(telefoneValue))
  }, [telefoneValue, form])

  return (
    <>
      <Form {...form}>
        <form
          className="grid gap-3"
          onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
        >
          <div className="text-base font-medium text-center  mb-2">
            Estamos quase terminando, só mais algumas informações.
          </div>
          <FormField
            control={form.control}
            name="cpf"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="CPF" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="telefone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Telefone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cep"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="CEP" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-4 gap-3">
            <FormField
              control={form.control}
              name="rua"
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <FormControl>
                    <Input placeholder="Rua" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="numero"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Número" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-5 gap-3">
            <FormField
              control={form.control}
              name="bairro"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormControl>
                    <Input placeholder="Bairro" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cidade"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormControl>
                    <Input placeholder="Cidade" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="uf"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="UF" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button className="mt-2" type="submit" disabled={isPending}>
            {isPending && (
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Criar conta
            <span className="sr-only">Criar conta</span>
          </Button>
        </form>
      </Form>

      <div className="text-sm px-8 mt-2 text-center m-auto leading-6 w-[400px]">
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
