"use client"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

export function ButtonToGoHome() {
  return (
    <Link href={"/"} className={cn(buttonVariants({}))}>
      voltar
    </Link>
  )
}
