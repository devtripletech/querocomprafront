"use client"
import { Search } from "lucide-react"
import { Button } from "../ui/button"
import { TableCell, TableRow } from "../ui/table"
import { Negotiation } from "@/lib/validations/negotiation"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useRouter } from "next/navigation"

interface NegotiationTableRowProps {
  data: Negotiation
}

export function NegotiationTableRow({ data }: NegotiationTableRowProps) {
  const router = useRouter()
  return (
    <TableRow>
      <TableCell>
        <Button
          variant="outline"
          size="xs"
          onClick={() =>
            router.push(`/dashboard/negotiation/${data.id_negocio}`)
          }
        >
          <Search className="h-3 w-3" />
          <span className="sr-only">ir para as mensagens</span>
        </Button>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {data.id_negocio}
      </TableCell>
      <TableCell className="text-muted-foreground whitespace-normal ">
        {data.nome}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(new Date(data.data_cadastrou), {
          locale: ptBR,
          addSuffix: true,
        })}
      </TableCell>
      <TableCell>
        <div className="mt-1 flex items-center gap-x-1.5">
          <div className="flex-none rounded-full bg-emerald-500/20 p-1">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </div>
          <p className="text-xs leading-5 text-gray-500">Em negociação</p>
        </div>
      </TableCell>
    </TableRow>
  )
}
