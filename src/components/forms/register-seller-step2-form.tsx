"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import type { z } from "zod"

import {
  catchError,
  normalizeCnpjNumber,
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
import { login } from "next-auth/react"
import { ChevronRight } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import Link from "next/link"
import { registerSellerStep2Schema } from "@/lib/validations/auth"

type Inputs = z.infer<typeof registerSellerStep2Schema>

export function RegisterSellerStep2Form() {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<Inputs>({
    mode: "onChange",
    resolver: zodResolver(registerSellerStep2Schema),
    defaultValues: {
      cnpj: "",
      nomeRepresentante: "",
      segmento: "",
      sobreNomeRepresentante: "",
      telefoneComercial: "",
      telefoneSecundario: "",
    },
  })

  function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        // const res = await createUserAccountAction(data)
        // router.push("/")
        // toast.message("Cadastro", {
        //   description: res.msg,
        // })
        // login("Credentials", {
        //   email: data.email,
        //   password: data.password,
        // })
      } catch (err) {
        catchError(err)
      }
    })
  }

  const cnpjValue = form.watch("cnpj")
  const telefoneComercialValue = form.watch("telefoneComercial")
  const telefoneSecundarioValue = form.watch("telefoneSecundario")

  React.useEffect(() => {
    form.setValue("cnpj", normalizeCnpjNumber(cnpjValue))
  }, [cnpjValue, form])

  React.useEffect(() => {
    form.setValue(
      "telefoneComercial",
      normalizePhoneNumber(telefoneComercialValue)
    )
  }, [telefoneComercialValue, form])

  React.useEffect(() => {
    form.setValue(
      "telefoneSecundario",
      normalizePhoneNumber(telefoneSecundarioValue)
    )
  }, [telefoneSecundarioValue, form])

  return (
    <>
      <Form {...form}>
        <form
          className="grid gap-3"
          onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
        >
          <div className="text-base font-medium text-center mb-2">
            Estamos quase terminando, só mais algumas informações.
          </div>
          <FormField
            control={form.control}
            name="segmento"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Segmento" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="feminino">Segmento 1</SelectItem>
                    <SelectItem value="masculino ">Segmento 2</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cnpj"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="CNPJ" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-3">
            <FormField
              control={form.control}
              name="telefoneComercial"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Telefone Comercial" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="telefoneSecundario"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Telefone Secundário" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="nomeRepresentante"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Nome do Representante" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sobreNomeRepresentante"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Sobrenome do Representante" {...field} />
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
