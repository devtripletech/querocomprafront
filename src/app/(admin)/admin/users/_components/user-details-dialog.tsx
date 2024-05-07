"use client"
import { useQuery } from "@tanstack/react-query"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

// import { UserTableStatus } from "../tables/user-table-status"
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
import { getUserDetails } from "@/lib/actions/get-user-details"
import { formatAddress, formatDate } from "@/lib/utils"

export interface UserDetailsProps {
  userId: string
  open: boolean
}
export function UserDetails({ userId, open }: UserDetailsProps) {
  const { data: user } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserDetails({ userId }),
    enabled: open,
    staleTime: 60000, //60 segundos (tempo em milissegundos)
  })

  function firstLine(address: any) {
    const { endereco, numero, complemento } = address
    let firstLine = endereco

    if (numero) {
      firstLine += `, ${numero}`
    }

    if (complemento) {
      firstLine += `, ${complemento}`
    }

    return firstLine
  }
  function secondLine(address: any) {
    const { bairro, cidade, uf, cep } = address

    let secondLine = bairro

    if (cidade) {
      secondLine += `, ${cidade}`
    }
    if (uf) {
      secondLine += `, ${uf}`
    }
    if (cep) {
      secondLine += `, ${cep}`
    }
    return secondLine
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Usuário: {userId}</DialogTitle>
        {/* <DialogDescription>Detalhes</DialogDescription> */}
      </DialogHeader>
      {user && (
        <div className="space-y-6">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="text-muted-foreground">Nome</TableCell>
                <TableCell className="flex justify-end">{user.name}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">E-mail</TableCell>
                <TableCell className="flex justify-end">{user.email}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">CPF</TableCell>
                <TableCell className="flex justify-end">
                  {user?.address?.cpf ?? (
                    <span className="italic text-muted-foreground">
                      Não informado
                    </span>
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">
                  Telefone
                </TableCell>
                <TableCell className="flex justify-end">
                  {user?.address?.telefone ?? (
                    <span className="italic text-muted-foreground">
                      Não informado
                    </span>
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">Celular</TableCell>
                <TableCell className="flex justify-end">
                  {user?.address?.celular ?? (
                    <span className="italic text-muted-foreground">
                      Não informado
                    </span>
                  )}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">
                  Endereço
                </TableCell>
                <TableCell className="flex flex-col justify-end">
                  {user?.address ? (
                    <>
                      <span className="flex justify-end">
                        {firstLine(user?.address)}
                      </span>
                      <span className="flex justify-end text-xs">
                        {secondLine(user?.address)}
                      </span>
                    </>
                  ) : (
                    <span className="italic text-muted-foreground flex justify-end">
                      Não informado
                    </span>
                  )}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">
                  Criado em
                </TableCell>
                <TableCell className="flex justify-end">
                  {user.create_at && formatDate(new Date(user.create_at))}
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
