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
