"use client"
import { Icons } from "@/components/icons"

import { Button } from "@/components/ui/button"
import type { Category } from "@/lib/validations/category"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface AdvertiseStep3Props {
  setStep: (step: string) => void
}

export function AdvertiseStep3({ setStep }: AdvertiseStep3Props) {
  const router = useRouter()
  return (
    <div className="flex min-h-screen flex-col gap-20">
      <div className="flex justify-center items-center">
        <Link
          href="/"
          className="flex items-center text-lg font-bold tracking-tight"
        >
          <Icons.logo className="h-20 text-black w-32" aria-hidden="true" />
        </Link>
      </div>
      <div className="container">
        <main className="flex w-full justify-center">
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="font-medium text-base text-center max-w-xs w-auto m-auto">
              Tudo pronto!
            </div>
            <div className="font-light text-base text-center max-w-xs w-auto m-auto mb-4">
              Assim que terminarmos, seu produto será publicado.
            </div>
            <Button className="max-w-md w-full">Voltar ao perfil</Button>

            <Button
              onClick={() => setStep("step1")}
              variant="outline"
              className="max-w-md w-full"
            >
              Adicionar outro produto
            </Button>
          </div>
        </main>
      </div>
    </div>
  )
}
