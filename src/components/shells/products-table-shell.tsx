"use client"

import * as React from "react"
import Link from "next/link"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { type ColumnDef } from "@tanstack/react-table"
import { toast } from "sonner"

import { catchError, formatDate, formatPrice } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { deleteProductAction } from "@/app/_actions/product"
import { Product } from "@/lib/validations/product"
import { Category } from "@/lib/validations/category"

interface ProductsTableShellProps<TData, TValue> {
  transaction: Product[]
  categories: Category[]
}

export function ProductsTableShell<TData, TValue>({
  transaction,
  categories,
}: ProductsTableShellProps<TData, TValue>) {
  const [isPending, startTransition] = React.useTransition()
  const [selectedRowIds, setSelectedRowIds] = React.useState<number[]>([])

  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo<ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: "nome",
        header: ({ column }) => (
          <DataTableColumnHeader
            className="w-[180px]"
            column={column}
            title="Nome"
          />
        ),
      },
      {
        accessorKey: "id_categoria",
        header: ({ column }) => (
          <DataTableColumnHeader
            className="w-[64px]"
            column={column}
            title="Categoria"
          />
        ),
        cell: ({ cell }) => {
          return cell.getValue() === "0"
            ? "sem categoria"
            : categories.find(
                (c) => c.ID_Categoria.toString() === cell.getValue()
              )?.Descricao
        },
      },
      {
        accessorKey: "valor",
        header: ({ column }) => (
          <DataTableColumnHeader
            className="w-[64px]"
            column={column}
            title="Valor"
          />
        ),
        cell: ({ cell }) => formatPrice(cell.getValue() as number),
      },
      {
        accessorKey: "qtde",
        header: ({ column }) => (
          <DataTableColumnHeader
            className="w-[64px]"
            column={column}
            title="quant."
          />
        ),
        cell: ({ cell }) => cell.getValue(),
      },

      {
        id: "actions",
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                aria-label="Open menu"
                variant="ghost"
                className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
              >
                <DotsHorizontalIcon className="h-4 w-4" aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/products/${row.original.id_produto}`}>
                  Editar
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/product/${row.original.id_produto}`}>
                  Visualizar
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  // startTransition(() => {
                  //   row.toggleSelected(false)
                  //   toast.promise(
                  //     deleteProductAction({
                  //       id: Number(row.original.id_produto),
                  //       storeId,
                  //     }),
                  //     {
                  //       loading: "Deleting...",
                  //       success: () => "Product deleted successfully.",
                  //       error: (err: unknown) => catchError(err),
                  //     }
                  //   )
                  // })
                }}
                disabled={isPending}
              >
                Deletar
                <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [categories, isPending]
  )

  function deleteSelectedRows() {
    // toast.promise(
    //   Promise.all(
    //     selectedRowIds.map((id) =>
    //       deleteProductAction({
    //         id,
    //         storeId,
    //       })
    //     )
    //   ),
    //   {
    //     loading: "Deleting...",
    //     success: () => {
    //       setSelectedRowIds([])
    //       return "Products deleted successfully."
    //     },
    //     error: (err: unknown) => {
    //       setSelectedRowIds([])
    //       return catchError(err)
    //     },
    //   }
    // )
  }

  return <DataTable columns={columns} data={transaction} />
}
