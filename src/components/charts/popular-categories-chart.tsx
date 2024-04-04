"use client"
import { BarChart, Loader2 } from "lucide-react"
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
} from "recharts"
import colors from "tailwindcss/colors"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { useQuery } from "@tanstack/react-query"
import { getPopularCategories } from "@/lib/actions/get-popular-categories"

function CustomTooltip({ active, payload }: TooltipProps<number, number>) {
  if (active && payload && payload.length) {
    return (
      <div className="flex flex-col gap-2 rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
        <span className="text-base font-semibold">{payload[0].name}</span>
        <div className="flex flex-col gap-1">
          <span className="">
            <span className="font-semibold">Vendas:</span> {payload[0].value}
          </span>
        </div>
      </div>
    )
  }

  return null
}

const COLORS = [
  colors.sky[500],
  colors.amber[500],
  colors.violet[500],
  colors.emerald[500],
]

export function PopularCategoriesChart() {
  const { data: popularCategories, isFetching: isLoadingPopularCategories } =
    useQuery({
      queryKey: ["metrics", "popular-categories"],
      queryFn: () => getPopularCategories(),
    })

  return (
    <Card className="col-span-3">
      <CardHeader className="pb-8">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            Categorias populares
            {isLoadingPopularCategories && (
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            )}
          </CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </div>
        <CardDescription>As 5 categorias com mais produtos</CardDescription>
      </CardHeader>
      <CardContent>
        {popularCategories ? (
          <ResponsiveContainer width="100%" height={220}>
            <PieChart style={{ fontSize: 14 }}>
              <Pie
                data={popularCategories}
                nameKey="category"
                dataKey="amount"
                cx="50%"
                cy="50%"
                outerRadius={86}
                innerRadius={64}
                strokeWidth={8}
                labelLine={false}
                label={({
                  cx,
                  cy,
                  midAngle,
                  innerRadius,
                  outerRadius,
                  value,
                  index,
                }) => {
                  const RADIAN = Math.PI / 180
                  const radius = 12 + innerRadius + (outerRadius - innerRadius)
                  const x = cx + radius * Math.cos(-midAngle * RADIAN)
                  const y = cy + radius * Math.sin(-midAngle * RADIAN)

                  return (
                    <text
                      x={x}
                      y={y}
                      className="fill-muted-foreground text-xs"
                      textAnchor={x > cx ? "start" : "end"}
                      dominantBaseline="central"
                    >
                      {popularCategories[index].category.length > 11
                        ? popularCategories[index].category
                            .substring(0, 11)
                            .concat("...")
                        : popularCategories[index].category}{" "}
                      ({value})
                    </text>
                  )
                }}
              >
                {popularCategories.length > 0 &&
                  popularCategories.map((_, index) => {
                    return (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index]}
                        className="stroke-background hover:opacity-80"
                      />
                    )
                  })}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-[240px] w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
