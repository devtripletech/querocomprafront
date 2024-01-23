import { z } from "zod"

export const categorySchema = z.object({
  ID_Categoria: z.number(),
  Descricao: z.string(),
  Ativo: z.number(),
  data_cadastrou: z.string(),
})

export const createCategorySchema = z.object({
  descricao: z.string(),
})
export type Category = z.infer<typeof categorySchema>
