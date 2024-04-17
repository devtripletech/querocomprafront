import { z } from "zod"

export const userDetailsSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  role: z.number(),
  create_at: z.string(),
  address: z.object({
    id_usuario: z.string(),
    telefone: z.string(),
    celular: z.string(),
    endereco: z.string(),
    complemento: z.string(),
    cep: z.string(),
    cpf: z.string(),
    id_user: z.string(),
    data_cadastrou: z.string(),
    ativo: z.number(),
    bairro: z.string(),
    uf: z.string(),
    cidade: z.string(),
    numero: z.string().nullable(),
  }),
})
export type NegotiationDetailsResponse = z.infer<typeof userDetailsSchema>

export const getMessageSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  body: z.string(),
  createdAt: z.string(),
  isOwn: z.number(),
  img: z.string(),
})
export type GetMessageResponse = z.infer<typeof getMessageSchema>
