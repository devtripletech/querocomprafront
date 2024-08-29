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
import { SignUpForm } from "@/components/forms/signup-form"
import React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export function RegisterContainer() {
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
      <CardContent className="grid gap-4">
        <Tabs defaultValue={tabName} onValueChange={handleTabChange}>
          <div className="flex items-center justify-center">
            <TabsList className="grid w-[230px] grid-cols-2">
              <TabsTrigger value="comprador">Comprador</TabsTrigger>
              <TabsTrigger value="vendedor">Vendedor</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="comprador">
            <SignUpForm />
          </TabsContent>
          <TabsContent value="vendedor"></TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
