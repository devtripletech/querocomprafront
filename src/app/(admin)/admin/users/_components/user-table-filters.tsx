"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Search, X } from "lucide-react"
import { Controller, useForm } from "react-hook-form"

import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import React from "react"

const userFiltersSchema = z.object({
  name: z.string().optional(),
  role: z.string().optional(),
  activated: z.string().optional(),
})

type UserFiltersSchema = z.infer<typeof userFiltersSchema>

export function UserTableFilters() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const name = searchParams.get("name")
  const role = searchParams.get("role")
  const activated = searchParams.get("activated")

  const { register, handleSubmit, control, reset } = useForm<UserFiltersSchema>(
    {
      resolver: zodResolver(userFiltersSchema),
      defaultValues: {
        name: name ?? "",
        role: role ?? "all",
        activated: activated ?? "all",
      },
    }
  )

  const createQueryString = React.useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString())

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key)
        } else {
          newSearchParams.set(key, String(value))
        }
      }

      return newSearchParams.toString()
    },
    [searchParams]
  )

  function handleFilter({ name, role, activated }: UserFiltersSchema) {
    router.push(
      `${pathname}?${createQueryString({
        name: name ?? null,
        role: role ?? null,
        activated: activated ?? null,
        page: null,
      })}`
    )
  }

  function handleClearFilters() {
    router.push(
      `${pathname}?${createQueryString({
        name: null,
        role: null,
        activated: null,
        page: null,
      })}`
    )

    reset({
      name: "",
      activated: "all",
      role: "all",
    })
  }

  return (
    <form
      onSubmit={handleSubmit(handleFilter)}
      className="flex items-center gap-2"
    >
      <span className="text-sm font-semibold">Filtro:</span>

      <Input
        placeholder="Nome"
        className="h-8 w-[320px]"
        {...register("name")}
      />

      <Controller
        control={control}
        name="role"
        render={({ field: { name, onChange, value, disabled } }) => {
          return (
            <Select
              name={name}
              onValueChange={onChange}
              value={value}
              disabled={disabled}
            >
              <SelectTrigger className="h-8 w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Perfil</SelectItem>
                <SelectItem value="1">Administrador</SelectItem>
                <SelectItem value="2">Usuário</SelectItem>
              </SelectContent>
            </Select>
          )
        }}
      />

      <Controller
        control={control}
        name="activated"
        render={({ field: { name, onChange, value, disabled } }) => {
          return (
            <Select
              name={name}
              onValueChange={onChange}
              value={value}
              disabled={disabled}
            >
              <SelectTrigger className="h-8 w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos usuários</SelectItem>
                <SelectItem value="1">Habilitado</SelectItem>
                <SelectItem value="2">Desabilitado</SelectItem>
              </SelectContent>
            </Select>
          )
        }}
      />

      <Button variant="secondary" size="xs" type="submit">
        <Search className="mr-2 h-4 w-4" />
        Filtrar resultados
      </Button>
      <Button
        onClick={handleClearFilters}
        variant="outline"
        size="xs"
        type="button"
      >
        <X className="mr-2 h-4 w-4" />
        Remover filtro
      </Button>
    </form>
  )
}
