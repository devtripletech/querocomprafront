"use client"

import * as React from "react"
import Image from "next/image"

import { type FileWithPreview } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
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
import { Textarea } from "@/components/ui/textarea"
import { FileDialog } from "@/components/file-dialog"
import { Icons } from "@/components/icons"
import { Zoom } from "@/components/zoom-image"
import { addProductAction } from "@/app/_actions/product"
import { revalidatePath } from "next/cache"
import { useRouter } from "next/navigation"
import { resolve, resolve6 } from "dns"
import { createCategorySchema } from "@/lib/validations/category"
import { addCategoryAction } from "@/app/_actions/categories"

interface AddCategoryFormProps {
  userId: number
}

type Inputs = z.infer<typeof createCategorySchema>

export function AddCategoryForm({ userId }: AddCategoryFormProps) {
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      descricao: "",
    },
  })

  function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        await addCategoryAction(data)
        toast.success("Categoria criada com sucesso!")
      } catch (e) {
        console.log(e)
        toast.error("Não foi possível criar a categoria")
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-2xl gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="descricao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Nome da categoria aqui." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="descricao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type product description here."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <Button
          onClick={() => void form.trigger(["descricao"])}
          className="w-fit"
          disabled={isPending}
        >
          {isPending && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Adicionar Categoria
          <span className="sr-only">Add Product</span>
        </Button>
      </form>
    </Form>
  )
}
