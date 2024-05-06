"use client"
import { Boxes, Loader2, Users } from "lucide-react"

import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CardSkeleton } from "./card-skeleton"
import { getMonthUsersAmount } from "@/lib/actions/get-month-users"
import { getMonthProductsAmount } from "@/lib/actions/get-month-products"

export function MonthProductsAmountCard() {
  const { data: monthUser, isFetching: isLoadingMonthUsers } = useQuery({
    staleTime: Infinity, // 86400000 = 24 horas em milissegundos
    queryKey: ["metrics", "month-products"],
    queryFn: () => getMonthProductsAmount(),
  })

  return (
    <Card>
      <CardHeader className="flex-row space-y-0 items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold">
          Cadastro produtos (mês)
        </CardTitle>
        {isLoadingMonthUsers ? (
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        ) : (
          <Boxes className="h-4 w-4 text-muted-foreground" />
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
