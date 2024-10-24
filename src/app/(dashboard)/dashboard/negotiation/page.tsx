"use client"
import * as React from "react"

import clsx from "clsx"
import EmptyState from "@/components/empty-state"
import { Card, CardContent } from "@/components/ui/card"

export default function NegotiationsPage() {
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
