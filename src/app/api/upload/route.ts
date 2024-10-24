import { NextResponse } from "next/server"
import { z } from "zod"
import { env } from "@/env"
import { getTokenAction } from "@/app/_actions/user"

export async function POST(request: Request, response: Response) {
  return getTokenAction().then(async (token) => {
    let data = await request.formData()

    const file: File | null = data.get("file") as unknown as File

    if (!file) {
      return NextResponse.json({ success: false })
    }

    try {
      const body = new FormData()
      body.append("file", file)

      const res = await fetch(`${env.API_URL}/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body,
      })

      const data = await res.json()

      //return new Response(data, { status: 201 })
      return NextResponse.json(data, { status: 201 })
    } catch (err) {
      console.error(err)

      if (err instanceof z.ZodError) {
        return NextResponse.json(err.message, { status: 422 })
      }

      if (err instanceof Error) {
        return NextResponse.json(err.message, { status: 500 })
      }

      return NextResponse.json("Algo deu errado!", { status: 500 })
    }
  })
}
