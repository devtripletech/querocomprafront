import * as z from "zod"

export const updateCPFSchema = z.object({
  cpf: z.string().min(1, {
    message: "Por favor insira um endereço de e-mail válido",
  }),
  reasonForChange: z.string().min(1, {
    message: "Por favor informe o motivo da alteração",
  }),
})

export const updateEmailSchema = z.object({
  email: z.string().email({
    message: "Por favor insira um endereço de e-mail válido",
  }),
  reasonForChange: z.string().min(1, {
    message: "Por favor informe o motivo da alteração",
  }),
})

export const updatePasswordSchema = z
  .object({
    password: z.string().min(4, {
      message: "Senha deve ter no mínimo 4 caracteres",
    }),
    newPassword: z.string().min(4, {
      message: "Nova senha deve ter no mínimo 4 caracteres",
    }),
    confirmPassword: z.string().min(1, {
      message: "Confirmação de senha é obrigatória",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Senhas não conferem",
    path: ["confirmPassword"],
  })
