"use client"
import { Loader2, Users } from "lucide-react"

import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CardSkeleton } from "./card-skeleton"
import { getMonthUsersAmount } from "@/lib/actions/get-month-users"

export function UsersAmountCard() {
  const { data: monthUser, isFetching: isLoadingMonthUsers } = useQuery({
    staleTime: 60000, //60 segundos (tempo em milissegundos)
    queryKey: ["metrics", "month-users"],
    queryFn: () => getMonthUsersAmount(),
  })

  return (
    <Card>
      <CardHeader className="flex-row space-y-0 items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold">
          Cadastro usuários (mês)
        </CardTitle>
        {isLoadingMonthUsers ? (
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        ) : (
          <Users className="h-4 w-4 text-muted-foreground" />
        )}
      </CardHeader>
      <CardContent className="space-y-1">
        {monthUser ? (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {monthUser.amount}
            </span>
            <p className="text-xs text-muted-foreground">
              <span
                className={
                  monthUser.diffFromLastMonth > 0
                    ? "text-emerald-500"
                    : "text-red-500"
                }
              >
                {monthUser.diffFromLastMonth > 0
                  ? `+${monthUser.diffFromLastMonth}`
                  : monthUser.diffFromLastMonth}
                %
              </span>{" "}
              em relação ao mês passado
            </p>
          </>
        ) : (
          <CardSkeleton />
        )}
      </CardContent>
    </Card>
  )
}
