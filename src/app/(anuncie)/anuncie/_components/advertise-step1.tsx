"use client"
import { Button } from "@/components/ui/button"
import React from "react"
import Link from "next/link"

import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Icons } from "@/components/icons"

interface AdvertiseStep1Props {
  setStep: (step: string) => void
}
export function AdvertiseStep1({ setStep }: AdvertiseStep1Props) {
  return (
    <div className="grid min-h-screen grid-cols-1 overflow-hidden lg:grid-cols-2">
      <AspectRatio ratio={16 / 9} className="hidden lg:block">
        <Icons.bgCadastroV1
          aria-hidden="true"
          className="w-full transition-all duration-500 ease-in-out"
        />
      </AspectRatio>
      <main className="container absolute top-1/2 flex flex-col items-center col-span-1 -translate-y-1/3 lg:static lg:top-0 lg:flex lg:translate-y-0 lg:col-span-1 justify-center h-full">
        <Link
          href="/"
          className="absolute items-center top-0 text-lg font-bold tracking-tight lg:hidden"
        >
          <Icons.logo className="h-20 text-black" aria-hidden="true" />
        </Link>
        <div className="flex flex-col justify-center items-center gap-2">
          <div className="font-medium text-base text-center max-w-xs w-auto m-auto">
            Quer vender aqui?
          </div>
          <div className="font-normal text-base text-center max-w-xs w-auto m-auto mb-4">
            Preencha o formulário para cadastrar seu primeiro produto com a
            gente!
          </div>
          <Button onClick={() => setStep("step2")} className="max-w-md w-full">
            Começar
          </Button>
        </div>
      </main>
    </div>
  )
}
