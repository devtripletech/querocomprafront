"use client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { formatDistanceToNow } from "date-fns"
import ptBR from "date-fns/locale/pt-BR"
import { ArrowRight, Edit, Loader2, LockKeyhole, Search, X } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { TableCell, TableRow } from "@/components/ui/table"
import { GetUsersResponse } from "@/lib/actions/get-users"
import { UserDetails } from "./user-details-dialog"
import { formatDate, getRoleName } from "@/lib/utils"
import { UpdatePassword } from "./user-update-password"
import { Icons } from "@/components/icons"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { activateUser } from "@/lib/actions/activate-user"
import { deactivateUser } from "@/lib/actions/deactivate-user"
import { UserDetailsEdit } from "./user-details-edit-dialog"

type Params = {
  pageIndex: number
  role: string | null
  name: string | null
  activated: string | null
}
export interface UserTableRowProps {
  user: {
    id: string
    name: string
    email: string
    role: number
    create_at: string
    activated: boolean
  }
  params: Params
}

export function UserTableRow({ user, params }: UserTableRowProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isDetailsEditOpen, setIsDetailsEditOpen] = useState(false)
  const [isSetPasswordOpen, setPasswordOpen] = useState(false)

  const queryClient = useQueryClient()

  function updateUserStatusOnCache(userId: string, activated: boolean) {
    const usersListingCache = queryClient.getQueriesData<GetUsersResponse>({
      queryKey: ["users"],
    })

    usersListingCache.forEach(([cacheKey, cached]) => {
      if (!cached) {
        return
      }

      queryClient.setQueryData<GetUsersResponse>(cacheKey, {
        ...cached,
        users: cached.users.map((user) => {
          if (user.id !== userId) {
            return user
          }

          return {
            ...user,
            activated,
          }
        }),
      })
    })

    toast.success("Usuário atualizado com sucesso!")
  }

  const { mutateAsync: activateUserFn } = useMutation({
    mutationFn: activateUser,
    onSuccess: async (_, { userId }) => {
      updateUserStatusOnCache(userId, true)
    },
  })

  const { mutateAsync: deactivateUserFn } = useMutation({
    mutationFn: deactivateUser,
    onSuccess: async (_, { userId }) => {
      updateUserStatusOnCache(userId, false)
    },
  })

  return (
    <>
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
            <Icons.active
              className="h-4 w-4 text-green-400"
              aria-hidden="true"
            />
          ) : (
            <Icons.inactive
              className="h-4 w-4 text-red-400"
              aria-hidden="true"
            />
          )}
        </TableCell>
        <TableCell className="text-muted-foreground font-mono text-xs font-medium">
          {formatDate(new Date(user.create_at))}
        </TableCell>
        <TableCell className="flex gap-2">
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
              <DropdownMenuItem onClick={() => setIsDetailsOpen(true)}>
                Visualizar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsDetailsEditOpen(true)}>
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPasswordOpen(true)}>
                Alterar a senha
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => activateUserFn({ userId: user.id })}
              >
                Ativar
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => deactivateUserFn({ userId: user.id })}
              >
                Desativar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <UserDetails userId={user.id} open={isDetailsOpen} />
      </Dialog>
      <Dialog open={isSetPasswordOpen} onOpenChange={setPasswordOpen}>
        <UpdatePassword
          userId={user.id}
          open={isSetPasswordOpen}
          setOpen={setPasswordOpen}
        />
      </Dialog>

      <Dialog open={isDetailsEditOpen} onOpenChange={setIsDetailsEditOpen}>
        <UserDetailsEdit
          userId={user.id}
          open={isDetailsEditOpen}
          setOpen={setIsDetailsEditOpen}
          params={params}
        />
      </Dialog>
    </>
  )
}
