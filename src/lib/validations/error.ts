import { z } from "zod"

export const errorSchema = z.object({
  error: z.object({
    status: z.number(),
    message: z.string(),
  }),
})

export type ErrorResponse = z.infer<typeof errorSchema>
