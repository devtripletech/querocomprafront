"use client"

import { useTheme } from "next-themes"
import { Card, CardContent } from "../ui/card"
import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu"
import Link from "next/link"
import {
  Lock,
  ChevronRightIcon,
  KeyRound,
  LayoutGrid,
  Mail,
  UserRound,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useSelectedLayoutSegment } from "next/navigation"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { SidebarSubNav } from "../layouts/sidebar-sub-nav"
import { accountDashboardConfig } from "@/config/dashboard"
import { Separator } from "../ui/separator"
import { Button, buttonVariants } from "../ui/button"
import { EditCPFDialog } from "../dialog/edit-cpf-dialog"

export function AccountPersonalCard() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center">
        <UserRound className="mr-2 h-5 w-5" />
        <h2 className="text-xl">Dados pessoais</h2>
      </div>

      <div className="rounded-md border px-6 py-8">
        <div className="grid grid-cols-3 grid-rows-2 gap-4">
          <div className="col-span-2">
            <Label>Nome</Label>

            <Input type="email" value="Mário Thomas Drumond" />
          </div>
          <div>
            <Label>CPF</Label>
            <div className="flex w-full items-center rounded-md border h-10 px-3 ">
              <Input
                className="border-none"
                type="password"
                placeholder="999.999.999-99"
                disabled
              />
              <EditCPFDialog cpf="">
                <span className="text-sm cursor-pointer">Alterar</span>
              </EditCPFDialog>
            </div>
          </div>
          <div className="col-span-2">
            <Label>Telefone</Label>

            <Input type="text" placeholder="(99) 9999-9999" />
          </div>
          <div>
            <Label>Celular</Label>

            <Input type="text" placeholder="(99) 9 99999-9999" />
          </div>
        </div>
      </div>

      <div className="rounded-md border px-6 py-8">
        <h2 className="font-medium">Endereço</h2>
        <Separator className="my-4" />
        <div className="grid grid-cols-5 grid-rows-3 gap-4">
          <div className="col-span-2">
            <Label>CEP</Label>
            <Input type="text" value="32071-184" />
          </div>
          <div className="col-span-3">
            <Label>Rua</Label>
            <Input type="text" value="Rua Sodalita" />
          </div>

          <div className="col-span-2">
            <Label>Número</Label>
            <Input type="text" value="205" />
          </div>
          <div className="col-span-3">
            <Label>Complemento</Label>
            <Input type="text" placeholder="Casa,Apto etc" />
          </div>
          <div className="col-span-2">
            <Label>Bairro</Label>
            <Input type="text" value="Sapucaia II" />
          </div>
          <div className="col-span-2">
            <Label>Cidade</Label>
            <Input type="text" value="Contagem" />
          </div>

          <div className="">
            <Label>UF</Label>
            <Input type="text" value="MG" />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button size="lg" className="w-min">
          Salvar
        </Button>
      </div>
    </div>
  )
}
