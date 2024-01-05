"use server"

import { unstable_noStore as noStore, revalidatePath } from "next/cache"

import { faker } from "@faker-js/faker"

import { z } from "zod"

import { getSubcategories, productTags } from "@/config/products"
import {
  Product,
  createProductSchema,
  getProductSchema,
  getProductsSchema,
  productSchema,
} from "@/lib/validations/product"

import { notFound, redirect } from "next/navigation"

export const listProductsAction = async (): Promise<Product[]> => {
  try {
    noStore()
    const res = await fetch(
      `http://apptnote.eastus.cloudapp.azure.com:3333/produto`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
      }
    )
    if (res.status === 401 || res.status === 400) redirect("/signin")

    const items = await res.json()

    if (items?.error) throw new Error(items?.error)

    // const count = items.length

    return items.resultado
  } catch (err) {
    console.error(err)
    throw err instanceof Error
      ? err.message
      : err instanceof z.ZodError
      ? err.issues.map((issue) => issue.message).join("\n")
      : new Error("Unknown error.")
  }
}

export const getProductByIdAction = async (
  productId: string
): Promise<Product> => {
  try {
    noStore()
    const res = await fetch(
      `http://apptnote.eastus.cloudapp.azure.com:3333/produto/${productId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
      }
    )
    if (res.status === 401 || res.status === 400) redirect("/signin")

    const item = await res.json()

    if (item?.error) throw new Error(item?.error)

    // const count = items.length

    return item.resultado
  } catch (err) {
    console.error(err)
    throw err instanceof Error
      ? err.message
      : err instanceof z.ZodError
      ? err.issues.map((issue) => issue.message).join("\n")
      : new Error("Unknown error.")
  }
}

const extendedProductSchema = productSchema.extend({
  images: z
    .array(z.object({ id: z.string(), name: z.string(), url: z.string() }))
    .nullable(),
})

export async function addProductAction(
  rawInput: z.infer<typeof productSchema>
) {
  // const input = extendedProductSchema.parse(rawInput)

  // const productWithSameName = {} as any

  // if (productWithSameName) {
  //   throw new Error("Product name already taken.")
  // }
  // const body = new FormData()
  // body.append("id_usuario", String(rawInput.id_usuario))
  // body.append("id_categoria", "0")
  // body.append("negociado", "0")
  // body.append("valor", String(rawInput.valor))
  // body.append("nome", String(rawInput.nome))
  // body.append("file", rawInput.images[0])
  // body.append("file2", rawInput.images[0])
  // body.append("file3", rawInput.images[0])

  revalidatePath("/dashboard/products")
  // if (response.status === 401 || response.status === 400) redirect("/signin")

  //await response.json()

  // await db.insert(products).values({
  //   ...input,
  //   storeId: input.storeId,
  //   images: input.images,
  // })

  revalidatePath(`/dashboard/products.`)
}

const extendedProductSchemaWithId = extendedProductSchema.extend({
  id_produto: z.number(),
})

export async function updateProductAction(
  input: z.infer<typeof extendedProductSchema>
) {
  if (!input.id_produto) {
    notFound()
  }
  const product = await getProductByIdAction(input.id_produto)

  if (!product) {
    throw new Error("Produto não encontrado.")
  }

  const res = await fetch(
    `http://apptnote.eastus.cloudapp.azure.com:3333/produto/${input.id_produto}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id_usuario: input.id_usuario,
        id_categoria: "",
        negociado: "",
        valor: input.valor,
        nome: input.valor,
        file: "",
        file2: "",
        file3: "",
      }),
    }
  )
  if (res.status === 401 || res.status === 400) redirect("/signin")

  revalidatePath(`/dashboard/products/${input.id_produto}`)
}

export async function deleteProductAction(
  rawInput: z.infer<typeof getProductSchema>
) {
  const input = getProductSchema.parse(rawInput)

  const product = {} as any

  if (!product) {
    throw new Error("Product not found.")
  }

  // await db.delete(products).where(eq(products.id, input.id))

  revalidatePath(`/dashboard/stores/${input.storeId}/products`)
}
