"use client"
import * as React from "react"
import { type Metadata } from "next"
import { unstable_noStore as noStore } from "next/cache"
import { notFound, redirect } from "next/navigation"
import { env } from "@/env.mjs"
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"
import { DateRangePicker } from "@/components/date-range-picker"
import { SeedProducts } from "@/components/seed-products-button"
import { Product } from "@/lib/validations/product"

import { Shell } from "@/components/shells/shell"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { currentUser, getUserAction } from "@/app/_actions/user"
import { formatDistanceToNow } from "date-fns"
import {
  getNegotiationsAction,
  getNegotiationsPartAction,
} from "@/app/_actions/negotiation"
import { NegotiationTable } from "@/components/tables/negotiation-table"
import { SidebarNegotiationNav } from "@/components/layouts/sidebar-negotiation-nav"
import { negotiationDashboardConfig } from "@/config/dashboard"
import clsx from "clsx"
import useConversation from "@/hooks/use-conversation"
import EmptyState from "@/components/empty-state"
import { Card, CardContent } from "@/components/ui/card"

export default function NegotiationsPage() {
  //const { isOpen } = useConversation()
  const isOpen = false
  return (
    <Card className="w-3/4 h-[400px]">
      <CardContent
        className={clsx("h-full lg:block", isOpen ? "block" : "hidden")}
      >
        <EmptyState />
      </CardContent>
    </Card>
  )
}
