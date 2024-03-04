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
  categories: Category[]
}

type Inputs = z.infer<typeof productSchema>

export function AddProductForm({ categories }: AddProductFormProps) {
  const router = useRouter()
  const [files, setFiles] = React.useState<FileWithPreview[] | null>(null)

  const [isUploading, setUploading] = React.useState(false)
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      nome: "",
      negociado: 0,
      descricao: "",
      valor: 0,
      images: [],
      img_01: "",
      img_02: "",
      img_03: "",
      link_ref: "",
      qtde: 0,
    },
  })

  function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        if (isArrayOfFile(data.images)) {
          setUploading(true)

          for (let i = 1; i <= data.images.length; i++) {
            const image = data.images[i - 1]

            const body = new FormData()
            body.append("file", image)
            const res = await fetch(`/api/upload`, {
              method: "POST",
              body,
            })
            const resultUploaded = await res.json()
            if (resultUploaded.error) {
              toast.error(resultUploaded.error)
              return
            }
            eval(`data.img_0${i} = '${resultUploaded.image.url}'`)
          }

          const {
            nome,
            valor,
            descricao,
            negociado,
            id_categoria,
            img_01,
            img_02,
            img_03,
            link_ref,
            qtde,
          } = data
          const resultProduct = await addProductAction({
            nome,
            valor,
            descricao,
            negociado,
            id_categoria,
            img_01,
            img_02,
            img_03,
            link_ref,
            qtde,
          })
          if (resultProduct.error) {
            toast.error(resultProduct.error)
            return
          }

          toast.success("Produto adicionado com sucesso.")
          setUploading(false)
          router.push("/dashboard/products")
        } else {
          await addProductAction({
            ...data,
            images: null,
          })
          toast.success("Produto adicionado com sucesso.")
          router.push("/dashboard/products")
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
                      <SelectValue
                        placeholder={field.value ?? "Sem categoria"}
                      />
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
        <FormField
          control={form.control}
          name="link_ref"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Link de referência</FormLabel>
              <FormControl>
                <Input
                  placeholder="Adicione um link de referência do produto aqui."
                  value={field.value}
                  onChange={field.onChange}
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
                    type="number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="qtde"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Quantidade</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Adicione o quantidade do produto aqui."
                    value={field.value}
                    onChange={field.onChange}
                    type="number"
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
