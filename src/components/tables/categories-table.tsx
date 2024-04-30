"use client"

import * as React from "react"
import Link from "next/link"
// import { type Product } from "@/db/schema"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table"
import { toast } from "sonner"

// import { deleteProduct, type getCategories } from "@/lib/actions/product"
// import { getErrorMessage } from "@/lib/handle-error"
import { formatDate, formatPrice } from "@/lib/utils"
import { useDataTable } from "@/hooks/use-data-table"
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
import { getCategories } from "@/lib/actions/get-categories"
import { Category } from "@/types"
import { Icons } from "../icons"

type AwaitedCategory = Pick<Category, "id" | "name" | "active" | "createdAt">

interface CategoriesTableProps {
  promise: Promise<{
    data: Category[]
    pageCount: number
  }>
}

export function CategoriesTable({ promise }: CategoriesTableProps) {
  const { data, pageCount } = React.use(promise)

  const [isPending, startTransition] = React.useTransition()
  const [selectedRowIds, setSelectedRowIds] = React.useState<string[]>([])

  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo<ColumnDef<AwaitedCategory, unknown>[]>(
    () => [
      // {
      //   id: "select",
      //   header: ({ table }) => (
      //     <Checkbox
      //       checked={table.getIsAllPageRowsSelected()}
      //       onCheckedChange={(value) => {
      //         table.toggleAllPageRowsSelected(!!value)
      //         setSelectedRowIds((prev) =>
      //           prev.length === data.length ? [] : data.map((row) => row.id)
      //         )
      //       }}
      //       aria-label="Select all"
      //       className="translate-y-[2px]"
      //     />
      //   ),
      //   cell: ({ row }) => (
      //     <Checkbox
      //       checked={row.getIsSelected()}
      //       onCheckedChange={(value) => {
      //         row.toggleSelected(!!value)
      //         setSelectedRowIds((prev) =>
      //           value
      //             ? [...prev, row.original.id]
      //             : prev.filter((id) => id !== row.original.id)
      //         )
      //       }}
      //       aria-label="Select row"
      //       className="translate-y-[2px]"
      //     />
      //   ),
      //   enableSorting: false,
      //   enableHiding: false,
      // },
      {
        accessorKey: "name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Nome" />
        ),
      },
      {
        accessorKey: "active",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Ativo" />
        ),
        cell: ({ cell }) =>
          cell.getValue() ? (
            <Icons.active
              className="h-4 w-4 text-green-400 ml-2"
              aria-hidden="true"
            />
          ) : (
            <Icons.inactive
              className="h-4 w-4 text-red-400 ml-2"
              aria-hidden="true"
            />
          ),
        //formatDate(cell.getValue() as Date),
        enableColumnFilter: false,
      },
      {
        accessorKey: "createdAt",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Criado em" />
        ),
        cell: ({ cell }) => formatDate(cell.getValue() as Date),
        enableColumnFilter: false,
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                aria-label="Open menu"
                variant="ghost"
                className="flex size-8 p-0"
              >
                <DotsHorizontalIcon className="size-4" aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/categories/${row.original.id}`}>
                  Edit
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                // onClick={() => {
                //   startTransition(() => {
                //     row.toggleSelected(false)

                //     toast.promise(
                //       deleteProduct({
                //         id: row.original.id,
                //         storeId,
                //       }),
                //       {
                //         loading: "Deleting...",
                //         success: () => "Product deleted successfully.",
                //         error: (err: unknown) => getErrorMessage(err),
                //       }
                //     )
                //   })
                // }}
                disabled={isPending}
              >
                Delete
                <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [isPending]
  )

  function deleteSelectedRows() {
    // toast.promise(
    //   Promise.all(
    //     selectedRowIds.map((id) =>
    //       deleteProduct({
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
    //       return getErrorMessage(err)
    //     },
    //   }
    // )
  }
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = React.useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  // const { table } = useDataTable({
  //   data,
  //   columns,
  //   pageCount,
  //   filterFields: [
  //     {
  //       value: "name",
  //       label: "Nome",
  //       placeholder: "Busca pelo nome",
  //     },
  //     {
  //       value: "active",
  //       label: "Status",
  //       placeholder: "Busca pelo status",
  //     },
  //   ],
  // })

  return <DataTable table={table} />
}
