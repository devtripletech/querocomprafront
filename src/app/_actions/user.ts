"use server"

import { env } from "@/env"
import { authOptions } from "@/lib/auth"
import {
  UserPayload,
  updatePasswordSchema,
  type registerBuyerStep1Schema,
  type registerBuyerStep2Schema,
} from "@/lib/validations/auth"
import { GetUser, userSchema } from "@/lib/validations/user"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"

import { z } from "zod"

export async function currentUser() {
  try {
    const session = await getServerSession(authOptions)

    return session?.user
  } catch (error: any) {
    return null
  }
}

export const updateUserAction = async (input: z.infer<typeof userSchema>) => {
  return getTokenAction().then(async (token) => {
    const res = await fetch(`${env.API_URL}/usuario`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        nome: input.nome,
        telefone: input.telefone,
        celular: input.celular,
        endereco: input.endereco,
        complemento: input.complemento,
        cep: input.cep,
        cpf: input.cpf,
        uf: input.uf,
        cidade: input.cidade,
        bairro: input.bairro,
        numero: input.numero,
      }),
    })

    if (res.status === 401) throw new Error("Não autorizado")

    const data = await res.json()

    if (data?.error) throw new Error(data?.error)

    revalidatePath("/dashboard/account/personal")

    return data
  })
}

export const createUserAction = async (
  input: z.infer<typeof registerBuyerStep2Schema>
) => {
  return getTokenAction().then(async (token) => {
    const res = await fetch(`${env.API_URL}/usuario`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        telefone: input.telefone,
        endereco: input.rua,
        cep: input.cep,
        cpf: input.cpf,
        uf: input.uf,
        cidade: input.cidade,
        bairro: input.bairro,
        numero: input.numero,
      }),
    })

    if (res.status === 401) throw new Error("Não autorizado")

    const data = await res.json()

    if (data?.error) throw new Error(data?.error)

    revalidatePath("/dashboard/account/personal")

    return data
  })
}
export const userExistsAction = async (email: string): Promise<boolean> => {
  console.log(email)
  const response = await fetch(`${env.API_URL}/v2/user/exists/${email}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  console.log(response)
  if (!response.ok) {
    return true
  }

  return false
}

export const createUserAccountAction = async (
  input: z.infer<typeof registerBuyerStep1Schema>
) => {
  const {
    name,
    lastName,
    gender,
    email,
    password,
    cpf,
    telefone,
    cep,
    rua,
    numero,
    bairro,
    cidade,
    uf,
  } = input

  const res = await fetch(`${env.API_URL}/v2/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      lastName,
      gender,
      email,
      password,
      cpf,
      telefone,
      cep,
      rua,
      numero,
      bairro,
      cidade,
      uf,
    }),
  })

  if (!res.ok) {
    const { error } = await res.json()
    console.log(error)
    throw new Error(error.message)
  }

  const data = await res.json()

  return data
}

export const getUserAction = async (userId: number): Promise<GetUser> => {
  return getTokenAction().then(async (token) => {
    const res = await fetch(`${env.API_URL}/usuario/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await res.json()
    return data
  })
}

export const getUsers = async (): Promise<UserPayload[]> => {
  return getTokenAction().then(async (token) => {
    const response = await fetch(`${env.API_URL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) {
      throw new Error("Algo de errado")
    }

    const data = await response.json()
    return data
  })
}

export const getTokenAction = async () => {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return null
    }
    const user = session.user

    return user.accessToken
  } catch (error: any) {
    return null
  }
}

export const updatePasswordAction = async (
  input: z.infer<typeof updatePasswordSchema>
) => {
  return getTokenAction().then(async (token) => {
    const res = await fetch(`${env.API_URL}/userpassword`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        password: input.newPassword,
        password_antigo: input.password,
      }),
    })
    if (res.status === 401) throw new Error("Não autorizado")

    const data = await res.json()

    if (data?.error) throw new Error(data?.error)

    return data
  })
}
