"use client"
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts"
import colors from "tailwindcss/colors"
import { subDays } from "date-fns"
import { useQuery } from "@tanstack/react-query"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { useState } from "react"
import { DateRange } from "react-day-picker"
import { getDailyNegotiationsInPeriod } from "@/lib/actions/get-daily-negotiations-in-period"
import { Loader2, XCircle } from "lucide-react"
import { Label } from "@/components/ui/label"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { Button } from "../ui/button"

const data = [
  { date: "10/12", revenue: 1200 },
  { date: "11/12", revenue: 880 },
  { date: "12/12", revenue: 400 },
  { date: "13/12", revenue: 539 },
  { date: "14/12", revenue: 793 },
  { date: "15/12", revenue: 899 },
  { date: "16/12", revenue: 1200 },
  { date: "17/12", revenue: 1379 },
  { date: "18/12", revenue: 965 },
]
interface NegotiationsDataPerMonth {
  date: string
  negotiations: number
}

export interface NegotiationsChartProps {
  data: NegotiationsDataPerMonth[]
}
function CustomTooltip({
  active,
  payload,
  label,
}: TooltipProps<number, number>) {
  if (active && payload && payload.length) {
    return (
      <div className="flex gap-1 rounded-l border bg-card p-2 text-sm text-card-foreground shadow-sm">
        <span className="font-semibold">{label}</span>
        <span>-</span>
        <span>{payload[0].value}</span>
      </div>
    )
  }

  return null
}
export function NegotiationsChart() {
  const [period, setPeriod] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  })

  const {
    data: dailyNegotiationsInPeriod,
    isFetching: isLoadingDailyNegotiationsInPeriod,
    error: dailyNegotiationsError,
  } = useQuery({
    retry: false,
    queryKey: ["metrics", "daily-negotiations-in-period", period],
    queryFn: () =>
      getDailyNegotiationsInPeriod({
        from: period?.from,
        to: period?.to,
      }),
  })

  function handleResetPeriod() {
    setPeriod({
      from: subDays(new Date(), 7),
      to: new Date(),
    })
  }

  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Negociações no período
            {isLoadingDailyNegotiationsInPeriod && (
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            )}
          </CardTitle>
          <CardDescription>Negociações diária no período</CardDescription>
        </div>
        <div className="flex items-center gap-3">
          <Label>Período</Label>
          <DateRangePicker date={period} onDateChange={setPeriod} />
        </div>
      </CardHeader>
      <CardContent>
        {dailyNegotiationsInPeriod ? (
          <>
            {dailyNegotiationsInPeriod ? (
              <ResponsiveContainer width="100%" height={240}>
                <LineChart
                  data={dailyNegotiationsInPeriod}
                  style={{ fontSize: 12 }}
                >
                  <XAxis
                    stroke="#888"
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    dy={16}
                  />
                  <YAxis
                    stroke="#888"
                    axisLine={false}
                    tickLine={false}
                    width={22}
                    tickFormatter={(value: number) => value.toString()}
                  />
                  <CartesianGrid className="!stroke-muted" vertical={false} />
                  <Line
                    type="linear"
                    strokeWidth={2}
                    dataKey="negotiations"
                    stroke={colors["violet"]["500"]}
                  />
                  <Tooltip cursor={false} content={<CustomTooltip />} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-[240px] w-full flex-col items-center justify-center gap-0.5">
                <span className="text-sm text-muted-foreground">
                  Nenhum resultado encontrado para o período.
                </span>
                <Button
                  variant="link"
                  size="xs"
                  className="text-violet-500 dark:text-violet-400"
                  onClick={handleResetPeriod}
                >
                  Exibir resultados dos últimos 7 dias
                </Button>
              </div>
            )}
          </>
        ) : dailyNegotiationsError ? (
          <div className="flex h-[240px] w-full flex-col items-center justify-center gap-0.5">
            <span className="flex items-center gap-2 text-sm text-red-500 dark:text-red-400">
              <XCircle className="h-4 w-4" />
              Erro ao obter dados do período.
            </span>
            <Button
              variant="link"
              size="xs"
              className="text-violet-500 dark:text-violet-400"
              onClick={handleResetPeriod}
            >
              Recarregar gráfico
            </Button>
          </div>
        ) : (
          <div className="flex h-[240px] w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
