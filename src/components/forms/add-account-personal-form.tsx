"use client"

import * as React from "react"
import Image from "next/image"

import { type FileWithPreview } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { generateReactHelpers } from "@uploadthing/react/hooks"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { type z } from "zod"

import { catchError, isArrayOfFile } from "@/lib/utils"
import { productSchema } from "@/lib/validations/product"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  UncontrolledFormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { FileDialog } from "@/components/file-dialog"
import { Icons } from "@/components/icons"
import { Zoom } from "@/components/zoom-image"
import type { OurFileRouter } from "@/app/api/uploadthing/core"
import { User, userSchema } from "@/lib/validations/user"
import { Label } from "../ui/label"
import { Separator } from "../ui/separator"
import { UserRound } from "lucide-react"
import { createUserAction, getUserAction } from "@/app/_actions/user"
import { useRouter } from "next/navigation"

interface AddAccountPersonalFormProps {
  user?: User
  userId: number
}

type Inputs = z.infer<typeof userSchema>

const { useUploadThing } = generateReactHelpers<OurFileRouter>()

export function AddAccountPersonalForm({
  user,
  userId,
}: AddAccountPersonalFormProps) {
  const [isPending, startTransition] = React.useTransition()
  const router = useRouter()
  const form = useForm<Inputs>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      nome: user?.nome ?? "",
      celular: user?.celular ?? "",
      cep: user?.cep ?? "",
      complemento: user?.complemento ?? "",
      cpf: user?.cpf ?? "",
      endereco: user?.endereco ?? "",
      id_user: userId,
      telefone: user?.telefone ?? "",
      bairro: user?.bairro ?? "",
      cidade: user?.cidade ?? "",
      numero: user?.numero ?? "",
      uf: user?.uf ?? "",
    },
  })

  function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        const res = await createUserAction(data)

        toast.success(res.mensagem)
        router.push("/dashboard/products")
      } catch (err) {
        catchError(err)
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-2xl gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex items-center">
          <UserRound className="mr-2 h-5 w-5" />
          <h2 className="text-xl">Dados pessoais</h2>
        </div>

        <div className="rounded-md border px-6 py-8">
          <div className="grid grid-cols-3 grid-rows-2 gap-4">
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <Input {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CPF</FormLabel>
                    <Input {...field} placeholder="999.999.999-99" />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="telefone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <Input {...field} placeholder="(99) 9999-9999" />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="celular"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Celular</FormLabel>
                    <Input {...field} placeholder="(99) 9 99999-9999" />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <div className="rounded-md border px-6 py-8">
          <h2 className="font-medium">Endereço</h2>
          <Separator className="my-4" />
          <div className="grid grid-cols-5 grid-rows-3 gap-4">
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="cep"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CEP</FormLabel>
                    <Input {...field} placeholder="" />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-3">
              <FormField
                control={form.control}
                name="endereco"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rua</FormLabel>
                    <Input {...field} placeholder="" />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-2">
              <FormField
                control={form.control}
                name="numero"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número</FormLabel>
                    <Input {...field} placeholder="" />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-3">
              <FormField
                control={form.control}
                name="complemento"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Complemento</FormLabel>
                    <Input {...field} placeholder="Casa,Apto etc" />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="bairro"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bairro</FormLabel>
                    <Input {...field} placeholder="" />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="cidade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cidade</FormLabel>
                    <Input {...field} placeholder="" />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="">
              <FormField
                control={form.control}
                name="uf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>UF</FormLabel>
                    <Input {...field} placeholder="" />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            size="lg"
            className="w-min"
            disabled={isPending}
          >
            {isPending && (
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Salvar
          </Button>
        </div>
      </form>
    </Form>
  )
}