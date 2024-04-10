"use client"
import { useQuery } from "@tanstack/react-query"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

// import { MessageTableStatus } from "../tables/message-table-status"
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
import { getMessageDetails } from "@/lib/actions/get-message-details"
import { formatAddress, formatDate } from "@/lib/utils"
import { Icons } from "@/components/icons"

export interface MessageDetailsProps {
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
export function MessageDetails({ negotiation }: MessageDetailsProps) {
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

          {/* <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead className="text-right">Qtd.</TableHead>
                <TableHead className="text-right">Preço</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.orderItems.map((orderItem) => {
                return (
                  <TableRow key={orderItem.id}>
                    <TableCell>{orderItem.product.name}</TableCell>
                    <TableCell className="text-right">
                      {orderItem.quantity}
                    </TableCell>
                    <TableCell className="text-right">
                      {(orderItem.priceInCents / 100).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      {(
                        (orderItem.priceInCents * orderItem.quantity) /
                        100
                      ).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total do pedito</TableCell>
                <TableCell className="text-right font-medium">
                  {(order.totalInCents / 100).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table> */}
        </div>
      )}
    </DialogContent>
  )
}
