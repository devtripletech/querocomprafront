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

export default async function DashboardPage() {
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

      <section className="flex flex-col gap-4">
        <div className="grid grid-cols-4 gap-4">
          <UsersAmountCard />
          <MonthProductsAmountCard />
          <MonthNegotiationsAmountCard />
          <DayNegotiationsAmountCard />
        </div>
        <div className="grid grid-cols-9 gap-4">
          <NegotiationsChart />
          <PopularCategoriesChart />
        </div>
      </section>
    </Shell>
  )
}
