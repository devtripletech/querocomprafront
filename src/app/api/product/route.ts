import { Product } from "@/lib/validations/product"
import { z } from "zod"

export async function POST(req: Request) {
  const input = (await req.json()) as Product

  const body = new FormData()
  // body.append("id_usuario", String(input.id_usuario))
  // body.append("id_categoria", "0")
  // body.append("negociado", "0")
  // body.append("valor", String(input.valor))
  // body.append("nome", String(input.nome))

  try {
    const res = await fetch(
      `http://apptnote.eastus.cloudapp.azure.com:3333/produto/`,
      {
        method: "POST",

        // headers: {
        //   "Content-Type": "form-data",
        //   // Authorization: `Bearer ${token}`,
        // },
        body,
        mode: "no-cors",
      }
    )

    return new Response(null, { status: res.status })
  } catch (err) {
    console.error(err)

    if (err instanceof z.ZodError) {
      return new Response(err.message, { status: 422 })
    }

    if (err instanceof Error) {
      return new Response(err.message, { status: 500 })
    }

    return new Response("Algo deu errado!", { status: 500 })
  }
}
