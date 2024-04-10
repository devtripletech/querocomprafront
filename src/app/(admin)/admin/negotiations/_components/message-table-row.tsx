"use client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { formatDistanceToNow } from "date-fns"
import ptBR from "date-fns/locale/pt-BR"
import { ArrowRight, Loader2, Search, X } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

// import { approveOrder } from "@/app/_action/approve-message"
// import { cancelOrder } from "@/app/_action/cancel-message"
// import { deliverOrder } from "@/app/_action/deliver-message"
// import { dispatchOrder } from "@/app/_action/dispatch-message"
// import { GetMessagesResponse } from "@/app/_action/get-messages"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { TableCell, TableRow } from "@/components/ui/table"
import { GetMessagesResponse } from "@/lib/actions/get-messages"
import { MessageDetails } from "./message-details-dialog"
import { formatDate, getRoleName } from "@/lib/utils"
// import { MessageTableStatus } from "./message-table-status"

export interface MessageTableRowProps {
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

export function MessageTableRow({ negotiation }: MessageTableRowProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>
          <MessageDetails negotiation={negotiation} />
        </Dialog>
      </TableCell>
      <TableCell className="text-muted-foreground font-medium text-xs">
        {negotiation.produto}
      </TableCell>
      <TableCell className="text-muted-foreground font-medium text-xs">
        {negotiation.comprador}
      </TableCell>
      <TableCell className="text-muted-foreground font-medium text-xs">
        {negotiation.vendedor}
      </TableCell>
      <TableCell className="text-muted-foreground font-mono text-xs font-medium">
        {formatDate(new Date(negotiation.inicio))}
      </TableCell>
    </TableRow>
  )
}
