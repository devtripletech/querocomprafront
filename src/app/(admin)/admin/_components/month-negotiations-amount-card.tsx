"use client"
import { Boxes, Loader2, MessageSquare, Users } from "lucide-react"

import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CardSkeleton } from "./card-skeleton"
import { getMonthUsersAmount } from "@/lib/actions/get-month-users"
import { getMonthProductsAmount } from "@/lib/actions/get-month-products"
import { getMonthNegotiationsAmount } from "@/lib/actions/get-month-negotiations"

export function MonthNegotiationsAmountCard() {
  const { data: monthUser, isFetching: isLoadingMonthUsers } = useQuery({
    queryKey: ["metrics", "month-negotiations"],
    queryFn: () => getMonthNegotiationsAmount(),
    staleTime: 60000, //60 segundos (tempo em milissegundos)
  })

  return (
    <Card>
      <CardHeader className="flex-row space-y-0 items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold">
          Negociações (mês)
        </CardTitle>
        {isLoadingMonthUsers ? (
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        ) : (
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
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
