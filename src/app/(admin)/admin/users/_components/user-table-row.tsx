"use client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { formatDistanceToNow } from "date-fns"
import ptBR from "date-fns/locale/pt-BR"
import { ArrowRight, Edit, Loader2, LockKeyhole, Search, X } from "lucide-react"
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
import { UserDetails } from "./user-details-dialog"
import { formatDate, getRoleName } from "@/lib/utils"
import { UpdatePassword } from "./user-update-password"
import { Icons } from "@/components/icons"
// import { UserTableStatus } from "./user-table-status"

export interface UserTableRowProps {
  user: {
    id: string
    name: string
    email: string
    role: number
    create_at: string
    activated: boolean
  }
}

export function UserTableRow({ user }: UserTableRowProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isSetPasswordOpen, setPasswordOpen] = useState(false)

  return (
    <TableRow>
      <TableCell className="text-muted-foreground font-medium text-xs">
        {user.name}
      </TableCell>
      <TableCell className="text-muted-foreground font-medium text-xs">
        {user.email}
      </TableCell>
      <TableCell className="text-muted-foreground font-medium text-xs">
        {getRoleName(user.role)}
      </TableCell>
      <TableCell className="flex justify-start items-center ml-2">
        {user.activated ? (
          <Icons.active className="h-4 w-4 text-green-400" aria-hidden="true" />
        ) : (
          <Icons.inactive className="h-4 w-4 text-red-400" aria-hidden="true" />
        )}
      </TableCell>
      <TableCell className="text-muted-foreground font-mono text-xs font-medium">
        {formatDate(new Date(user.create_at))}
      </TableCell>
      <TableCell className="flex gap-2">
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only"></span>
            </Button>
          </DialogTrigger>
          <UserDetails userId={user.id} open={isDetailsOpen} />
        </Dialog>

        <Dialog open={isSetPasswordOpen} onOpenChange={setPasswordOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <LockKeyhole className="h-3 w-3" />
              <span className="sr-only"></span>
            </Button>
          </DialogTrigger>
          <UpdatePassword
            userId={user.id}
            open={isSetPasswordOpen}
            setOpen={setPasswordOpen}
          />
        </Dialog>
      </TableCell>
    </TableRow>
  )
}
