import { z } from "zod"

const negotiationSchema = z.object({
  id_negocio: z.string(),
  id_user_interesse: z.string(),
  id_status_negocio: z.number(),
  id_produto: z.string(),
  data_cadastrou: z.string(),
  id_user: z.string(),
  email: z.string(),
  nome: z.string(),
  usuario_part: z.string(),
})
export type Negotiation = z.infer<typeof negotiationSchema>

const messageSchema = z.object({
  id: z.string(),
  userName: z.string(),
  content: z.string(),
})
export type Message = z.infer<typeof messageSchema>

export const sendMessageSchema = z.object({
  id_user_mensagem: z.string(),
  id_negociacao: z.string(),
  mensagem: z
    .string()
    .min(1, {
      message: "Digite algo para enviar a mensagem",
    })
    .max(100, { message: "Sua mensagem não pode passar de 20 caracteres" }),
})
