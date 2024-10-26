import { PopularCategoriesChart } from "@/components/charts/popular-categories-chart"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Shell } from "@/components/shells/shell"
import { PieChart } from "lucide-react"
import { UsersAmountCard } from "./_components/users-amount"
import { MonthNegotiationsAmountCard } from "./_components/month-negotiations-amount-card"
import { DayNegotiationsAmountCard } from "./_components/day-negotiations-amount-card"
import { MonthProductsAmountCard } from "./_components/month-products-amount-card"
import { NegotiationsChart } from "@/components/charts/negoatiations-chart"
import { getDayNegotiationsAmount } from "@/lib/actions/get-day-negotiations"

export default async function DashboardPage() {
  const data = await getDayNegotiationsAmount()
  return (
    <Shell variant="sidebar">
      <PageHeader>
        <div className="flex space-x-4">
          <PageHeaderHeading size="sm" className="flex-1">
            Dashboard
          </PageHeaderHeading>
        </div>
        <PageHeaderDescription size="sm"></PageHeaderDescription>
      </PageHeader>

      <section className="flex flex-col gap-3">
        <div className="grid grid-cols-4 gap-3">
          <UsersAmountCard />
          <MonthProductsAmountCard />
          <MonthNegotiationsAmountCard />
          <DayNegotiationsAmountCard monthUser={data} />
        </div>
        <div className="grid grid-cols-9 gap-3">
          <NegotiationsChart />
          <PopularCategoriesChart />
        </div>
      </section>
    </Shell>
  )
}
