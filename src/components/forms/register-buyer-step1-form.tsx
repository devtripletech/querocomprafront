"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import type { z } from "zod"
import { useMask } from "@react-input/mask"
import { catchError } from "@/lib/utils"
import { registerBuyerStep1Schema } from "@/lib/validations/auth"
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
import { createUserAccountAction, userExistsAction } from "@/app/_actions/user"
import { ChevronRight } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import Link from "next/link"

type Inputs = z.infer<typeof registerBuyerStep1Schema>

export function RegisterBuyerStep1Form() {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()
  const [step, setStep] = React.useState<string>("step1")

  const inputPhoneRef = useMask({
    mask: "(__) _ ____-____",
    replacement: { _: /\d/ },
  })
  const inputCEPRef = useMask({
    mask: "_____-___",
    replacement: { _: /\d/ },
  })
  const inputCPFRef = useMask({
    mask: "___.___.___-__",
    replacement: { _: /\d/ },
  })

  const form = useForm<Inputs>({
    mode: "onChange",
    resolver: zodResolver(registerBuyerStep1Schema),
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      cpf: "",
      telefone: "",
      cep: "",
      rua: "",
      numero: "",
      bairro: "",
      cidade: "",
      uf: "",
    },
  })

  function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        await createUserAccountAction(data)
        router.push("/cadastro/concluido")
      } catch (err) {
        catchError(err)
      }
    })
  }

  return (
    <>
      <Form {...form}>
        <form
          autoComplete="off"
          className="grid gap-3"
          onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
        >
          <div className="text-base font-medium text-center  mb-2">
            Preencha os campos abaixo
          </div>

          {step === "step1" ? (
            <>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        placeholder="Sobrenome"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Gênero" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="feminino">Feminino</SelectItem>
                        <SelectItem value="masculino ">Masculino </SelectItem>
                      </SelectContent>
                    </Select>
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
                      <Input
                        placeholder="Email"
                        autoComplete="off"
                        {...field}
                      />
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
                      <PasswordInput
                        placeholder="Senha"
                        autoComplete="off"
                        {...field}
                      />
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
                      <PasswordInput
                        autoComplete="password"
                        placeholder="Repita sua senha"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                onClick={async () => {
                  const isStep1Valid = await form.trigger([
                    "name",
                    "lastName",
                    "gender",
                    "email",
                    "password",
                    "confirmPassword",
                  ])

                  if (isStep1Valid) {
                    try {
                      const userExists = await userExistsAction(
                        form.getValues("email")
                      )

                      if (userExists) {
                        form.setError("email", {
                          type: "manual",
                          message: "Este email já está registrado.",
                        })
                        toast.error("O email já está registrado.")
                        return
                      } else {
                        form.resetField("cpf")
                        form.resetField("telefone")
                        form.resetField("cep")
                        setStep("step2")
                      }
                    } catch (error) {
                      catchError(error)
                    }
                  } else {
                    toast.error(
                      "Preencha os campos corretamente antes de continuar"
                    )
                  }
                }}
                className="mt-2"
                type="button"
                disabled={isPending}
              >
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
            </>
          ) : (
            <>
              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        ref={inputCPFRef}
                        placeholder="CPF"
                        value={field.value}
                        onChange={field.onChange}
                      />
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
                        <Input
                          ref={inputPhoneRef}
                          placeholder="Telefone"
                          value={field.value ?? ""}
                          onChange={field.onChange}
                        />
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
                        <Input
                          ref={inputCEPRef}
                          placeholder="CEP"
                          value={field.value ?? ""}
                          onChange={field.onChange}
                        />
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
                        <Input
                          autoComplete="off"
                          placeholder="Rua"
                          {...field}
                        />
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
                        <Input
                          autoComplete="off"
                          placeholder="Número"
                          {...field}
                        />
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
                        <Input
                          autoComplete="off"
                          placeholder="Bairro"
                          {...field}
                        />
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
                        <Input
                          autoComplete="off"
                          placeholder="Cidade"
                          {...field}
                        />
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
                        <Input autoComplete="off" placeholder="UF" {...field} />
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
                Finalizar
                <ChevronRight className="h-5" />
                <span className="sr-only">Finalizar</span>
              </Button>
            </>
          )}
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
