import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  const { name, username } = await request.json()

  const usernameExists = await prisma.user.findUnique({
    where: { username: username },
  })

  if (usernameExists) {
    return new Response(`Usuário já existe!`, {
      status: 400,
    })
  }

  const user = await prisma.user.create({
    data: { username, name },
  })

  cookies().set("@querocomprar:userId", user.id, {
    maxAge: 60 * 60 * 24 * 7, // 7 dias
    path: "/",
  })

  return new Response(`Usuário ${user.username} foi criado com sucesso!`, {
    status: 201,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  })
}
