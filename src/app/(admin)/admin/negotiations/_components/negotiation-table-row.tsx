"use client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { formatDistanceToNow } from "date-fns"
import ptBR from "date-fns/locale/pt-BR"
import { ArrowRight, Loader2, MessageSquare, Search, X } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

// import { approveOrder } from "@/app/_action/approve-message"
// import { cancelOrder } from "@/app/_action/cancel-message"
// import { deliverOrder } from "@/app/_action/deliver-message"
// import { dispatchOrder } from "@/app/_action/dispatch-message"
// import { GetNegotiationsResponse } from "@/app/_action/get-messages"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { TableCell, TableRow } from "@/components/ui/table"
import { GetNegotiationsResponse } from "@/lib/actions/get-messages"
import { NegotiationDetails } from "./negotiation-details-dialog"
import { formatDate, getRoleName } from "@/lib/utils"
import { NegotiationDropdown } from "./negotiation-dropdown"
import { NegotiationMessages } from "./negotiation-message-dialog"
// import { NegotiationTableStatus } from "./message-table-status"

export interface NegotiationTableRowProps {
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

export function NegotiationTableRow({ negotiation }: NegotiationTableRowProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isMessageOpen, setIsMessageOpen] = useState(false)

  return (
    <TableRow>
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

      <TableCell className="flex gap-2">
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3 text-muted-foreground" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>
          <NegotiationDetails negotiation={negotiation} />
        </Dialog>

        <Dialog open={isMessageOpen} onOpenChange={setIsMessageOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <MessageSquare className="h-3 w-3 text-muted-foreground" />
              <span className="sr-only">Mensagens</span>
            </Button>
          </DialogTrigger>
          <NegotiationMessages
            negotiationId={negotiation.id}
            open={isMessageOpen}
          />
        </Dialog>
      </TableCell>
    </TableRow>
  )
}
