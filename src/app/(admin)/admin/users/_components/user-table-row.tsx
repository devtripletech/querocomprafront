"use client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { formatDistanceToNow } from "date-fns"
import ptBR from "date-fns/locale/pt-BR"
import { ArrowRight, Loader2, Search, X } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

// import { approveOrder } from "@/app/_action/approve-user"
// import { cancelOrder } from "@/app/_action/cancel-user"
// import { deliverOrder } from "@/app/_action/deliver-user"
// import { dispatchOrder } from "@/app/_action/dispatch-user"
// import { GetUsersResponse } from "@/app/_action/get-users"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { TableCell, TableRow } from "@/components/ui/table"
import { GetUsersResponse } from "@/lib/actions/get-users"
import { UserDetails } from "./users-details-dialog"
import { formatDate, getRoleName } from "@/lib/utils"
// import { UserTableStatus } from "./user-table-status"

export interface UserTableRowProps {
  user: {
    id: string
    name: string
    email: string
    role: number
    create_at: string
  }
}

export function UserTableRow({ user }: UserTableRowProps) {
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
          <UserDetails userId={user.id} open={isDetailsOpen} />
        </Dialog>
      </TableCell>
      <TableCell className="text-muted-foreground font-medium text-xs">
        {user.name}
      </TableCell>
      <TableCell className="text-muted-foreground font-medium text-xs">
        {user.email}
      </TableCell>
      <TableCell className="text-muted-foreground font-medium text-xs">
        {getRoleName(user.role)}
      </TableCell>
      <TableCell className="text-muted-foreground font-mono text-xs font-medium">
        {formatDate(new Date(user.create_at))}
      </TableCell>
    </TableRow>
  )
}
