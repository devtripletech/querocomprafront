import { AddProductForm } from "@/components/forms/add-product-form"
import { Icons } from "@/components/icons"
import { SiteFooter } from "@/components/layouts/site-footer"
import { Shell } from "@/components/shells/shell"
import { Button } from "@/components/ui/button"
import type { Category } from "@/lib/validations/category"
import Link from "next/link"

interface AdvertiseStep2Props {
  setStep: (step: string) => void
  categories: Category[]
}
export function AdvertiseStep2({ setStep, categories }: AdvertiseStep2Props) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex justify-center items-center">
        <Link
          href="/"
          className="flex items-center text-lg font-bold tracking-tight"
        >
          <Icons.logo className="h-20 text-black w-32" aria-hidden="true" />
        </Link>
      </div>
      <div className="container flex-1 items-start">
        <main className="flex w-full justify-center">
          <AddProductForm categories={categories ?? []} />
        </main>
      </div>
      <SiteFooter />
    </div>
  )
}
