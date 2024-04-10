"use client"
import { useQuery } from "@tanstack/react-query"
import { ArrowRight, Loader2, Search, X } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import React from "react"
import { z } from "zod"

import { UserTableRow } from "./user-table-row"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getUsers } from "@/lib/actions/get-users"
import { Pagination } from "@/components/pagination"

// import { Pagination } from "../pagination"
export function UsersTable() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = React.useTransition()

  const role = searchParams.get("role")

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams?.get("page") ?? "1")

  const { data: result, isFetching: isLoadingData } = useQuery({
    queryKey: ["users", pageIndex, role],
    queryFn: () => getUsers({ pageIndex, role }),
  })

  // Create query string
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

  function handlePagination(pageIndex: number) {
    startTransition(() => {
      router.push(
        `${pathname}?${createQueryString({
          page: Number(pageIndex) + 1,
        })}`
      )
    })
  }

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[64px]"></TableHead>
            <TableHead className="w-[140px]">Nome</TableHead>
            <TableHead className="w-[64px]">E-mail</TableHead>
            <TableHead className="w-[64px]">Perfil</TableHead>
            <TableHead className="w-[64px]">Criado em</TableHead>

            {/* <TableHead>Cliente</TableHead>
            <TableHead className="w-[140px]">Total do pedido</TableHead>
            <TableHead className="w-[164px]"></TableHead>
            <TableHead className="w-[132px]"></TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            result &&
              result.users.length > 0 &&
              result.users.map((user) => {
                return <UserTableRow key={user.id} user={user} />
              })
            // : (
            //   <TableCell
            //     colSpan={5}
            //     className="text-muted-foreground font-medium text-xs text-center"
            //   >
            //     Carregando...
            //   </TableCell>
            // )
          }
        </TableBody>
      </Table>
      {result && (
        <Pagination
          pageIndex={result.meta.pageIndex}
          totalCount={result.meta.totalCount}
          perPage={result.meta.perPage}
          onPageChange={handlePagination}
        />
      )}
    </div>
  )
}
