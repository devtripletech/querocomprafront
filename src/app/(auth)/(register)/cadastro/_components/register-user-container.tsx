"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { RegisterBuyerStep1Form } from "@/components/forms/register-buyer-step1-form"
import { RegisterSellerStep1Form } from "@/components/forms/register-seller-step1-form"

export function RegisterUserContainer() {
  const searchParams = useSearchParams()
  const page = searchParams?.get("page") ?? "comprador"
  const [tabName, setTabName] = React.useState(page)
  const router = useRouter()
  const pathname = usePathname()

  const createQueryString = React.useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString())

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key)
        } else {
          newSearchParams.set(key, String(value))
        }
      }

      return newSearchParams.toString()
    },
    [searchParams]
  )

  const handleTabChange = (value: string) => {
    setTabName(value)
    const newQueryString = createQueryString({ page: value })
    router.replace(`${pathname}?${newQueryString}`)
  }

  return (
    <Card className="border-spacing-0 border-none shadow-none">
      <CardHeader className="space-y-1"></CardHeader>
      <CardContent className="grid gap-3">
        <RegisterBuyerStep1Form />
      </CardContent>
    </Card>
  )
}
