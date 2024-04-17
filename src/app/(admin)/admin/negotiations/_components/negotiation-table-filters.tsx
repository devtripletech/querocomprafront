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

const orderFiltersSchema = z.object({
  name: z.string().optional(),
})

type OrderFiltersSchema = z.infer<typeof orderFiltersSchema>

export function NegotiationTableFilters() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const name = searchParams.get("name")

  const { register, handleSubmit, control, reset } =
    useForm<OrderFiltersSchema>({
      resolver: zodResolver(orderFiltersSchema),
      defaultValues: {
        name: name ?? "",
      },
    })

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

  function handleFilter({ name }: OrderFiltersSchema) {
    if (name) {
      router.push(
        `${pathname}?${createQueryString({
          name: name,
          page: null,
        })}`
      )
    } else {
      router.push(
        `${pathname}?${createQueryString({
          name: null,
          page: null,
        })}`
      )
    }
  }

  function handleClearFilters() {
    router.push(
      `${pathname}?${createQueryString({
        name: null,
        page: null,
      })}`
    )

    reset({
      name: "",
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
