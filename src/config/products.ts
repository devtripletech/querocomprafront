import { type Option } from "@/types"
import { MixIcon } from "@radix-ui/react-icons"

import { Icons } from "@/components/icons"

export interface StoredFile {
  id: string
  name: string
  url: string
}

export const sortOptions = [
  { label: "Data: crescente", value: "data_cadastrou.asc" },
  {
    label: "Data: decrescente",
    value: "data_cadastrou.desc",
  },
  {
    label: "Alfabeto: A para Z",
    value: "nome.asc",
  },
  {
    label: "Alfabeto: Z para A",
    value: "nome.desc",
  },
]
