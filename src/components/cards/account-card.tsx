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
  Contact,
  Phone,
  MapPin,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useSelectedLayoutSegment } from "next/navigation"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { SidebarSubNav } from "../layouts/sidebar-sub-nav"
import { accountDashboardConfig } from "@/config/dashboard"
import { User } from "@/lib/validations/user"

interface AccountCardProps {
  user: User
}
export function AccountCard({ user }: AccountCardProps) {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="rounded-md border px-6 py-8 gap-2">
        <div className="flex items-center">
          <KeyRound className="mr-2 h-4 w-4 text-zinc-600" />
          <h2 className="text-base font-normal">Dados de acesso</h2>
          <Link
            className="ml-2 font-light text-sm cursor-pointer"
            href="/dashboard/account/access"
          >
            Alterar
          </Link>
        </div>
        <div className="flex items-center pt-4">
          <Mail className="mr-2 h-4 w-4 text-zinc-600" />
          <h2 className="text-base font-normal">{user.email}</h2>
        </div>
        <div className="flex items-center pt-2">
          <Lock className="mr-2 h-4 w-4 text-zinc-600" />
          <h2 className="text-base font-normal">Senha:******</h2>
        </div>
      </div>

      <div className="rounded-md border px-6 py-8 gap-2">
        <div className="flex items-center">
          <UserRound className="mr-2 h-4 w-4 text-zinc-600" />
          <h2 className="text-base font-normal">Dados pessoais</h2>
          <Link
            className="ml-2 font-light text-sm cursor-pointer"
            href="/dashboard/account/personal"
          >
            Alterar
          </Link>
        </div>
        <div className="flex items-center pt-4">
          {user.nome && (
            <>
              <Contact className="mr-2 h-4 w-4 text-zinc-600" />
              <h2 className="text-base font-normal">{user.nome}</h2>
            </>
          )}
        </div>
        <div className="flex items-center pt-2">
          {user.celular && (
            <>
              <Phone className="mr-2 h-4 w-4 text-zinc-600" />
              <h2 className="text-base font-normal">{user.celular}</h2>
            </>
          )}
        </div>
        <div className="flex items-center pt-2">
          <MapPin className="mr-2 h-4 w-4 text-zinc-600" />
          <h2 className="text-base font-normal">
            {user.endereco}, {user.complemento}
          </h2>
        </div>
        <span className="ml-6 block text-sm">
          {user.bairro}, {user.cidade}, {user.uf}. CEP {user.cep}
        </span>
      </div>
    </div>
  )
}
