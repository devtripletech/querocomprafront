import Link from "next/link"
import { SiteFooter } from "@/components/layouts/site-footer"
import { SiteHeader } from "@/components/layouts/site-header"
import React from "react"
import { Icons } from "@/components/icons"

export default function NotFound() {
  // const headersList = headers()
  // const domain = headersList.get("host")

  // console.log(headersList)
  return (
    <div className="flex flex-col min-h-screen bg-[#25A577]">
      <main className="relative flex flex-col items-center justify-center flex-1">
        <div className="absolute top-16 flex flex-col items-center justify-center text-white">
          <Icons.logo className="text-white w-[200px]" />

          <div className="flex flex-col items-center justify-center mt-20">
            <h2 className="font-black text-[168.76px] leading-[150px]">
              OPS...
            </h2>
            <p className="font-medium text-2xl">Parece que não tem nada aqui</p>
            <Link href={"/"} className="font-light text-xl hover:underline">
              Volte a página inicial
            </Link>
          </div>
        </div>
      </main>
      <Icons.bgNotFoundPage2 className="w-1/3 mt-10 flex-1" />
      <SiteFooter />
    </div>
  )
}
