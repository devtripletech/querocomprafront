import * as z from "zod"

export const authSchema = z.object({
  email: z.string().email({
    message: "Por favor insira um endereço de e-mail válido",
  }),
  password: z
    .string()
    .min(3, {
      message: "A senha deve ter pelo menos 3 caracteres",
    })
    .max(100),
})

export const createUserSchema = z
  .object({
    name: z.string(),
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

export const updatePasswordSchema = z
  .object({
    id_user: z.coerce.number(),
    password: authSchema.shape.password,
    newPassword: authSchema.shape.password,
    confirmPassword: authSchema.shape.password,
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Senhas não combinam",
    path: ["confirmPassword"],
  })

export const userPayloadSchema = z.object({
  id: z.string(),
  id_user: z.number(),
  uservalido: z.number(),
  accessToken: z.string(),
  status: z.boolean(),
  name: z.string(),
  email: z.string(),
})
export type UserPayload = z.infer<typeof userPayloadSchema>
