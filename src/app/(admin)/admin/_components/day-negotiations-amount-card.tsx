"use client"
import { Boxes, Loader2, MessageSquare, Users } from "lucide-react"

import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CardSkeleton } from "./card-skeleton"
import { getDayNegotiationsAmount } from "@/lib/actions/get-day-negotiations"

export function DayNegotiationsAmountCard() {
  const { data: monthUser, isFetching: isLoadingMonthUsers } = useQuery({
    queryKey: ["metrics", "day-negotiations-amount"],
    queryFn: () => getDayNegotiationsAmount(),
  })

  return (
    <Card>
      <CardHeader className="flex-row space-y-0 items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold">
          Negociações (dia)
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
                  monthUser.diffFromYesterday > 0
                    ? "text-emerald-500"
                    : "text-red-500"
                }
              >
                {monthUser.diffFromYesterday > 0
                  ? `+${monthUser.diffFromYesterday}`
                  : monthUser.diffFromYesterday}
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