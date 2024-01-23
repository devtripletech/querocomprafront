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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Category } from "@/lib/validations/category"

interface AddProductFormProps {
  userId: number
  categories: Category[]
}

type Inputs = z.infer<typeof productSchema>

export function AddProductForm({ userId, categories }: AddProductFormProps) {
  const router = useRouter()
  const [files, setFiles] = React.useState<FileWithPreview[] | null>(null)

  const [isUploading, setUploading] = React.useState(false)
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      nome: "",
      id_usuario: userId,
      descricao: "",
      valor: 0,
      images: [],
    },
  })

  function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        if (isArrayOfFile(data.images)) {
          setUploading(true)
          const body = new FormData()
          body.append("id_usuario", String(data.id_usuario))
          body.append("id_categoria", String(data.id_categoria))
          body.append("negociado", "0")
          body.append("valor", String(data.valor))
          body.append("nome", String(data.nome))
          body.append("descricao", String(data.descricao))
          body.append("file", data.images[0])
          body.append("file2", data.images[0])
          body.append("file3", data.images[0])
          const response = await fetch(
            `http://apptnote.eastus.cloudapp.azure.com:3333/produto/`,
            {
              method: "POST",
              mode: "no-cors",
              body,
            }
          )

          // revalidatePath("/dashboard/products")
          // revalidatePath("/")
          toast.success("Produto adicionado com sucesso!")
          setUploading(false)
          router.push("/dashboard/products")
        } else {
          await addProductAction({
            ...data,
            images: null,
          })

          toast.success("Product added successfully.")
        }
      } catch (e) {
        console.log(e)
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
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Nome do produto aqui." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col items-start gap-6 sm:flex-row">
          <FormField
            control={form.control}
            name="id_categoria"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Category</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={(value: typeof field.value) =>
                    field.onChange(value)
                  }
                >
                  <FormControl>
                    <SelectTrigger className="capitalize">
                      <SelectValue placeholder={field.value} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      {Object.values(categories).map((option) => (
                        <SelectItem
                          key={option.ID_Categoria}
                          value={String(option.ID_Categoria)}
                          className="capitalize"
                        >
                          {option.Descricao}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
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
        />

        <div className="flex flex-col items-start gap-6 sm:flex-row">
          <FormField
            control={form.control}
            name="valor"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Valor</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Adicione o valor do produto aqui."
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormItem className="flex w-full flex-col gap-1.5">
          <FormLabel>Images</FormLabel>
          {files?.length ? (
            <div className="flex items-center gap-2">
              {files.map((file, i) => (
                <Zoom key={i}>
                  <Image
                    src={file.preview}
                    alt={file.name}
                    className="h-20 w-20 shrink-0 rounded-md object-cover object-center"
                    width={80}
                    height={80}
                  />
                </Zoom>
              ))}
            </div>
          ) : null}
          <FormControl>
            <FileDialog
              setValue={form.setValue}
              name="images"
              maxFiles={3}
              maxSize={1024 * 1024 * 4}
              files={files}
              setFiles={setFiles}
              isUploading={isUploading}
              disabled={isPending}
            />
          </FormControl>
          <UncontrolledFormMessage
            message={form.formState.errors.images?.message}
          />
        </FormItem>
        <Button
          onClick={() => void form.trigger(["nome", "descricao", "valor"])}
          className="w-fit"
          disabled={isPending}
        >
          {isPending && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Adicionar Produto
          <span className="sr-only">Add Product</span>
        </Button>
      </form>
    </Form>
  )
}
