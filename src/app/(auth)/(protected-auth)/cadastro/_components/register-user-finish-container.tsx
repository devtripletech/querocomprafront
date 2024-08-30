"use client"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import React from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { RegisterBuyerStep1Form } from "@/components/forms/register-buyer-step1-form"
import { RegisterSellerStep1Form } from "@/components/forms/register-seller-step1-form"
import { RegisterSellerStep2Form } from "@/components/forms/register-seller-step2-form"

export function RegisterUserFinishContainer() {
  const searchParams = useSearchParams()

  const page = searchParams?.get("page") ?? "comprador"

  return (
    <Card className="border-spacing-0 border-none shadow-none">
      <CardHeader className="space-y-1"></CardHeader>
      <CardContent className="grid gap-3">
        {page === "comprador" ? (
          <RegisterBuyerStep1Form />
        ) : (
          <RegisterSellerStep2Form />
        )}
      </CardContent>
    </Card>
  )
}
