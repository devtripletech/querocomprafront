import { Search } from "lucide-react"
import { Button } from "../ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { Negotiation } from "@/lib/validations/negotiation"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { NegotiationTableRow } from "./negotiation-table-row"

interface NegotiationTableProps {
  items: Negotiation[]
}

export function NegotiationTable({ items }: NegotiationTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead className="w-[140px]">Identificador</TableHead>
          <TableHead className="w-[340px]">Produto</TableHead>
          <TableHead className="w-[180px]">Realizado há</TableHead>
          <TableHead className="w-[140px]">Status</TableHead>
          <TableHead>Interessado</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items ? (
          items.map((item: Negotiation, i: number) => (
            <NegotiationTableRow data={item} key={i} />
          ))
        ) : (
          <span></span>
        )}
      </TableBody>
    </Table>
  )
}
