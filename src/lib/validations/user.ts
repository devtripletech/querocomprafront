import * as z from "zod"

export const userSchema = z.object({
  email: z
    .string()
    .email({
      message: "Por favor insira um endereço de e-mail válido",
    })
    .optional(),
  nome: z.string().min(1, {
    message: "O nome é obrigatório",
  }),
  telefone: z.string().min(1, {
    message: "O telefone é obrigatório",
  }),
  celular: z.string().min(1, {
    message: "O celular é obrigatório",
  }),
  endereco: z.string().min(1, {
    message: "O endereço é obrigatório",
  }),
  complemento: z.string().optional(),
  cep: z.string().min(1, {
    message: "O cep é obrigatório",
  }),
  cpf: z.string().min(1, {
    message: "O cpf é obrigatório",
  }),
  uf: z.string().min(1, {
    message: "O uf é obrigatório",
  }),
  cidade: z.string().min(1, {
    message: "A cidade é obrigatório",
  }),
  bairro: z.string().min(1, {
    message: "O bairro é obrigatório",
  }),
  numero: z.coerce.number().min(1, {
    message: "O numero é obrigatório",
  }),
})
export type User = z.infer<typeof userSchema>

export const getUserSchema = z.object({
  status: z.boolean(),
  uservalido: z.boolean(),
  resultado: z.object({
    email: z
      .string()
      .email({
        message: "Por favor insira um endereço de e-mail válido",
      })
      .optional(),
    nome: z.string().min(1, {
      message: "O nome é obrigatório",
    }),
    telefone: z.string().min(1, {
      message: "O telefone é obrigatório",
    }),
    celular: z.string().min(1, {
      message: "O telefone é obrigatório",
    }),
    endereco: z.string().min(1, {
      message: "O endereço é obrigatório",
    }),
    complemento: z.string().min(1, {
      message: "O complemento é obrigatório",
    }),
    cep: z.string().min(1, {
      message: "O cep é obrigatório",
    }),
    cpf: z.string().min(1, {
      message: "O cpf é obrigatório",
    }),
    id_user: z.number(),
    uf: z.string().min(1, {
      message: "O cpf é obrigatório",
    }),
    cidade: z.string().min(1, {
      message: "A cidade é obrigatório",
    }),
    bairro: z.string().min(1, {
      message: "O bairro é obrigatório",
    }),
    numero: z.coerce.number().min(1, {
      message: "O numero é obrigatório",
    }),
  }),
})
export type GetUser = z.infer<typeof getUserSchema>
