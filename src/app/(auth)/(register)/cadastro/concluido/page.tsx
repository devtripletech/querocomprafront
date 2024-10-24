"use client"
import { Shell } from "@/components/shells/shell"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function Page() {
  return (
    <Shell className="max-w-xl">
      <div className="font-medium text-base text-center max-w-xs w-auto m-auto">
        Cadastro concluído com sucesso, aguarde pela validação da sua conta.
        Entraremos em contato!
      </div>
      <Link href={"/"} className={cn(buttonVariants({}))}>
        voltar
      </Link>
    </Shell>
  )
}
