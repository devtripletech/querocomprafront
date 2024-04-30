import * as z from "zod"

export const createProductSchema = z.object({
  id_usuario: z.string(),
  id_categoria: z.string().optional(),
  negociado: z.string().optional(),
  valor: z
    .preprocess(
      (a) => parseFloat(z.string().parse(a)),
      z.number({
        invalid_type_error: "Price must be Number",
      })
    )
    .optional(),
  nome: z.string(),
  descricao: z.string().optional(),
  images: z
    .unknown()
    .refine((val) => {
      if (!Array.isArray(val)) return false
      if (val.some((file) => !(file instanceof File))) return false
      return true
    }, "Must be an array of File")
    .optional()
    .nullable()
    .default(null),
})

export const productSchema = z.object({
  id_produto: z.string().optional(),
  id_categoria: z
    .string({
      required_error: "A categoria é obrigatória",
      invalid_type_error: "Categoria obrigatória",
    })
    .min(1, {
      message: "A categoria é obrigatório",
    }),
  nome: z.string().min(1, {
    message: "O nome é obrigatório",
  }),
  link_ref: z.string().max(700).url().optional(),
  img_01: z.string().optional(),
  img_02: z.string().optional(),
  img_03: z.string().optional(),
  ativo: z.number().optional(),
  data_cadastrou: z.string().optional(),
  negociado: z.number().optional(),
  valor: z.coerce.number().gte(1, { message: "O valor é obrigatório" }),
  qtde: z.coerce.number().gte(1, { message: "A Qtd deve ser maior que 1" }),
  id_tipo: z.number().optional(),
  descricao: z.string().optional(),
  images: z
    .unknown()
    .refine((val) => {
      if (!Array.isArray(val)) return false
      if (val.some((file) => !(file instanceof File))) return false
      return true
    }, "Must be an array of File")
    .optional()
    .nullable()
    .default(null),
})

const productTransactionSchema = z.object({
  count: z.number(),
  produtos: z.array(productSchema),
})

export type ProductTransaction = z.infer<typeof productTransactionSchema>

export const filterProductsSchema = z.object({
  query: z.string(),
})

export const getProductSchema = z.object({
  id: z.number(),
  storeId: z.number(),
})

export const getProductInventorySchema = z.object({
  id: z.number(),
})

export type Product = z.infer<typeof productSchema>

export const getProductsSchema = z.object({
  limit: z.number().default(10),
  offset: z.number().default(0),
  categories: z.string().optional().nullable(),
  sort: z.string().optional().nullable(),
})
