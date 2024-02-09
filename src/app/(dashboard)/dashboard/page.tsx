import { DayOrdersAmountCard } from "@/components/cards/day-orders-amount-card"
import { MonthCanceledOrdersAmountCard } from "@/components/cards/month-canceled-orders-amount"
import { MonthOrdersAmountCard } from "@/components/cards/month-orders-amount-card"
import { MonthRevenueCard } from "@/components/cards/month-revenue-card"
import { PopularCategoriesChart } from "@/components/charts/popular-categories-chart"
import { RevenueChart } from "@/components/charts/revenue-chart"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Shell } from "@/components/shells/shell"
import { PieChart } from "lucide-react"

export default function DashboardPage() {
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
          <MonthRevenueCard />
          <MonthOrdersAmountCard />
          <DayOrdersAmountCard />
          <MonthCanceledOrdersAmountCard />
        </div>
        <div className="grid grid-cols-9 gap-4">
          <RevenueChart />
          <PopularCategoriesChart />
        </div>
      </section>
    </Shell>
  )
}
