import * as z from "zod"

export const authSchema = z.object({
  email: z.string().email({
    message: "Por favor insira um endereço de e-mail válido",
  }),
  password: z
    .string()
    .min(8, {
      message: "A senha deve ter pelo menos 8 caracteres",
    })
    .max(100),
})

export const createUserSchema = z
  .object({
    email: authSchema.shape.email,
    password: authSchema.shape.password,
    confirmPassword: authSchema.shape.password,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não combinam",
    path: ["confirmPassword"],
  })

export const verifyEmailSchema = z.object({
  code: z
    .string()
    .min(6, {
      message: "O código de verificação deve ter 6 caracteres",
    })
    .max(6),
})

export const checkEmailSchema = z.object({
  email: authSchema.shape.email,
})

export const resetPasswordSchema = z
  .object({
    password: authSchema.shape.password,
    confirmPassword: authSchema.shape.password,
    code: verifyEmailSchema.shape.code,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não combinam",
    path: ["confirmPassword"],
  })

export const userPrivateMetadataSchema = z.object({
  role: z.enum(["user", "admin", "super_admin"]),
  stripePriceId: z.string().optional().nullable(),
  stripeSubscriptionId: z.string().optional().nullable(),
  stripeCustomerId: z.string().optional().nullable(),
  stripeCurrentPeriodEnd: z.string().optional().nullable(),
})

export const userPayloadSchema = z.object({
  role: z.number(),
  email: z.string(),
})
export type UserPayload = z.infer<typeof userPayloadSchema>
