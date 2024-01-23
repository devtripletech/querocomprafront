import * as z from "zod"

export const searchParamsSchema = z.object({
  page: z.string().default("1"),
  per_page: z.string().default("20"),
})

export const productsSearchParamsSchema = searchParamsSchema.extend({
  sort: z.string().optional().default("data_cadastrou.desc"),
  categories: z.string().optional(),
})

export const dashboardProductsSearchParamsSchema = searchParamsSchema.extend({
  sort: z.string().optional().default("data_cadastrou.desc"),
  name: z.string().optional(),
  category: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
})
