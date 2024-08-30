import * as z from "zod"

export const authSchema = z.object({
  email: z
    .string({
      required_error: "Email é obrigatório",
      invalid_type_error: "O email deve ser uma string",
    })
    .email({
      message: "Por favor insira um endereço de e-mail válido",
    }),
  password: z
    .string({
      required_error: "Senha é obrigatório",
      invalid_type_error: "A senha deve ser uma string",
    })
    .min(8, {
      message: "A senha deve ter pelo menos 8 caracteres",
    })
    .max(100, {
      message: "A senha deve ter no máximo 100 caracteres",
    })
    .regex(/[a-z]/, {
      message: "A senha deve conter pelo menos uma letra minúscula",
    })
    .regex(/[A-Z]/, {
      message: "A senha deve conter pelo menos uma letra maiúscula",
    })
    .regex(/[0-9]/, {
      message: "A senha deve conter pelo menos um número",
    })
    .regex(/[^a-zA-Z0-9]/, {
      message: "A senha deve conter pelo menos um caractere especial",
    }),
})
export const registerBuyerStep1Schema = z
  .object({
    name: z
      .string({
        required_error: "Nome é obrigatório",
        invalid_type_error: "O nome deve ser uma string",
      })
      .min(2, { message: "O nome deve ter no mínimo 2 caracteres" })
      .max(50, { message: "O nome deve ter no máximo 50 caracteres" }),

    lastName: z
      .string({
        required_error: "Sobrenome é obrigatório",
        invalid_type_error: "O sobrenome deve ser uma string",
      })
      .min(2, { message: "O sobrenome deve ter no mínimo 2 caracteres" })
      .max(50, { message: "O sobrenome deve ter no máximo 50 caracteres" }),

    gender: z.string({
      required_error: "Gênero é obrigatório",
      invalid_type_error: "O gênero deve ser uma string",
    }),

    email: authSchema.shape.email,

    password: authSchema.shape.password,

    confirmPassword: authSchema.shape.password,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não combinam",
    path: ["confirmPassword"],
  })

export const registerSellerStep1Schema = z
  .object({
    razaoSocial: z
      .string({
        required_error: "Razão Social é obrigatório",
        invalid_type_error: "O razão social deve ser uma string",
      })
      .min(2, { message: "A razão social deve ter no mínimo 2 caracteres" })
      .max(50, {
        message: "O A razão social deve ter no máximo 50 caracteres",
      }),

    nomeFantasia: z
      .string({
        required_error: "Nome Fantasia é obrigatório",
        invalid_type_error: "O nome fantasia deve ser uma string",
      })
      .min(2, { message: "O nome fantasia deve ter no mínimo 2 caracteres" })
      .max(50, { message: "O nome fantasia deve ter no máximo 50 caracteres" }),

    email: authSchema.shape.email,

    password: authSchema.shape.password,

    confirmPassword: authSchema.shape.password,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não combinam",
    path: ["confirmPassword"],
  })

export const registerSellerStep2Schema = z.object({
  segmento: z.string({
    required_error: "Segmento é obrigatório",
    invalid_type_error: "O segmento deve ser uma string",
  }),
  cnpj: z
    .string({
      required_error: "CNPJ é obrigatório",
      invalid_type_error: "O CNPJ deve ser uma string",
    })
    .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, {
      message: "O CNPJ deve estar no formato XX.XXX.XXX/XXXX-XX",
    }),

  telefoneComercial: z
    .string({
      required_error: "Telefone Comercial é obrigatório",
      invalid_type_error: "O Telefone Comercial deve ser uma string",
    })
    .regex(/^\(?\d{2}\)?\s?\d{4,5}-\d{4}$/, {
      message:
        "O Telefone Comercial deve estar no formato (XX) XXXXX-XXXX ou (XX) XXXX-XXXX",
    }),

  telefoneSecundario: z
    .string({
      required_error: "Telefone Secundário é obrigatório",
      invalid_type_error: "O Telefone Secundário deve ser uma string",
    })
    .regex(/^\(?\d{2}\)?\s?\d{4,5}-\d{4}$/, {
      message:
        "O Telefone Secundário deve estar no formato (XX) XXXXX-XXXX ou (XX) XXXX-XXXX",
    }),

  nomeRepresentante: z
    .string({
      required_error: "Nome do Representante é obrigatório",
      invalid_type_error: "O Nome do Representante deve ser uma string",
    })
    .min(2, {
      message: "O Nome do Representante deve ter no mínimo 2 caracteres",
    })
    .max(50, {
      message: "O Nome do Representante deve ter no máximo 50 caracteres",
    }),
  sobreNomeRepresentante: z
    .string({
      required_error: "Sobrenome do Representante é obrigatório",
      invalid_type_error: "O Sobrenome do Representante deve ser uma string",
    })
    .min(2, {
      message: "O Sobrenome do Representante deve ter no mínimo 2 caracteres",
    })
    .max(50, {
      message: "O Sobrenome do Representante deve ter no máximo 50 caracteres",
    }),
})

export const verifyEmailSchema = z.object({
  code: z
    .string({
      required_error: "Código é obrigatório",
      invalid_type_error: "O código deve ser uma string",
    })
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
