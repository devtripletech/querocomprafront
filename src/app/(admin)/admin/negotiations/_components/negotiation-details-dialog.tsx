"use client"
import { useQuery } from "@tanstack/react-query"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

// import { NegotiationTableStatus } from "../tables/message-table-status"
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getNegotiationDetails } from "@/lib/actions/get-message-details"
import { formatAddress, formatDate } from "@/lib/utils"
import { Icons } from "@/components/icons"

export interface NegotiationDetailsProps {
  negotiation: {
    id: string
    comprador: string
    vendedor: string
    produto: string
    quantidade: number
    valor: number
    inicio: string
    status: number
  }
}
export function NegotiationDetails({ negotiation }: NegotiationDetailsProps) {
  // const { data: message } = useQuery({
  //   queryKey: ["message", messageId],
  //   queryFn: () => getMessageDetails({ messageId }),
  //   enabled: open,
  // })

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Id negociação: {negotiation.id}</DialogTitle>
        {/* <DialogDescription>Detalhes</DialogDescription> */}
      </DialogHeader>
      {negotiation && (
        <div className="space-y-6">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="text-muted-foreground">Status</TableCell>
                <TableCell className="flex justify-end">
                  <div
                    className={` ${
                      negotiation.status === 1
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {negotiation.status === 1 ? (
                      <div className="mt-1 flex items-center gap-x-1.5">
                        <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        </div>
                        <p className="text-xs leading-5 text-gray-500">
                          Em negociação
                        </p>
                      </div>
                    ) : (
                      <div className="mt-1 flex items-center gap-x-1.5">
                        <div className="flex-none rounded-full bg-red-500/20 p-1">
                          <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                        </div>
                        <p className="text-xs leading-5 text-gray-500">
                          Finalizado a negociação
                        </p>
                      </div>
                    )}
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">Produto</TableCell>
                <TableCell className="flex justify-end">
                  {negotiation.produto}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">
                  Quantidade
                </TableCell>
                <TableCell className="flex justify-end">
                  {negotiation.quantidade}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">Valor</TableCell>
                <TableCell className="flex justify-end">
                  {negotiation.valor.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">
                  Comprador
                </TableCell>
                <TableCell className="flex justify-end">
                  {negotiation.comprador}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">
                  Vendedor
                </TableCell>
                <TableCell className="flex justify-end">
                  {negotiation.vendedor}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">
                  Inicio da negociação
                </TableCell>
                <TableCell className="flex justify-end">
                  {formatDate(new Date(negotiation.inicio))}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      )}
    </DialogContent>
  )
}
