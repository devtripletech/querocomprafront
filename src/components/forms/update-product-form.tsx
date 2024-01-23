"use client"

import * as React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

import { zodResolver } from "@hookform/resolvers/zod"
import { generateReactHelpers } from "@uploadthing/react/hooks"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { type z } from "zod"

import { catchError, isArrayOfFile } from "@/lib/utils"
import { Product, productSchema } from "@/lib/validations/product"
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
import { updateProductAction } from "@/app/_actions/product"
import type { OurFileRouter } from "@/app/api/uploadthing/core"
import { FileWithPreview } from "@/types"
import { Category } from "@/lib/validations/category"

interface UpdateProductFormProps {
  product: Product
  categories: Category[]
}

type Inputs = z.infer<typeof productSchema>

const { useUploadThing } = generateReactHelpers<OurFileRouter>()

export function UpdateProductForm({
  product,
  categories,
}: UpdateProductFormProps) {
  const router = useRouter()
  const [files, setFiles] = React.useState<FileWithPreview[] | null>(null)
  const [isPending, startTransition] = React.useTransition()

  const { isUploading, startUpload } = useUploadThing("productImage")

  const form = useForm<Inputs>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      nome: product.nome ?? "",
      id_categoria: product.id_categoria ?? "",
      descricao: product.descricao ?? "",
      valor: product.valor ?? "",
      images: [],
    },
  })

  function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        // await checkProductAction({
        //   name: data.name,
        //   id: product.id,
        // })

        const images = isArrayOfFile(data.images)
          ? await startUpload(data.images).then((res) => {
              const formattedImages = res?.map((image) => ({
                id: image.key,
                name: image.key.split("_")[1] ?? image.key,
                url: image.url,
              }))
              return formattedImages ?? null
            })
          : null

        // await updateProductAction({
        //   ...data,
        //   storeId: product.storeId,
        //   id: product.id,
        //   images: images,
        // })

        toast.success("Product updated successfully.")
        setFiles(null)
      } catch (err) {
        catchError(err)
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-2xl gap-5"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormItem>
          <FormLabel>Nome</FormLabel>
          <FormControl>
            <Input
              aria-invalid={!!form.formState.errors.nome}
              placeholder="Digite o nome do produto aqui."
              {...form.register("nome")}
              defaultValue={product.nome}
            />
          </FormControl>
          <UncontrolledFormMessage
            message={form.formState.errors.nome?.message}
          />
        </FormItem>
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
        <FormItem>
          <FormLabel>Descrição</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Digite a descrição do produto aqui."
              {...form.register("descricao")}
            />
          </FormControl>
          <UncontrolledFormMessage
            message={form.formState.errors.descricao?.message}
          />
        </FormItem>

        <div className="flex flex-col items-start gap-6 sm:flex-row">
          <FormItem className="w-full">
            <FormLabel>Valor</FormLabel>
            <FormControl>
              <Input
                type="number"
                inputMode="numeric"
                placeholder="Digite o preço do produto aqui."
                {...form.register("valor")}
              />
            </FormControl>
            <UncontrolledFormMessage
              message={form.formState.errors.valor?.message}
            />
          </FormItem>
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
        <div className="flex space-x-2">
          <Button disabled={isPending}>
            {isPending && (
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Atualizar produto
            <span className="sr-only">Atualizar produto</span>
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              startTransition(async () => {
                void form.trigger(["nome", "valor"])
                // await deleteProductAction({
                //   storeId: product.storeId,
                //   id: product.id,
                // })
                // router.push(`/dashboard/stores/${product.storeId}/products`)
              })
            }}
            disabled={isPending}
          >
            {isPending && (
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Excluir produto
            <span className="sr-only">Excluir produto</span>
          </Button>
        </div>
      </form>
    </Form>
  )
}
