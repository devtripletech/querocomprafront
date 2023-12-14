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

export function AccountCard() {
  return (
    <div className="flex flex-col gap-4 w-full">
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
          <h2 className="text-base font-normal">edvan.lima@tripletech.com</h2>
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
          <Contact className="mr-2 h-4 w-4 text-zinc-600" />
          <h2 className="text-base font-normal">Mário Thomas Drumond</h2>
        </div>
        <div className="flex items-center pt-2">
          <Phone className="mr-2 h-4 w-4 text-zinc-600" />
          <h2 className="text-base font-normal">+5511999999</h2>
        </div>
        <div className="flex items-center pt-2">
          <MapPin className="mr-2 h-4 w-4 text-zinc-600" />
          <h2 className="text-base font-normal">Rua Sodalita, 205</h2>
        </div>
        <span className="ml-6 block text-sm">
          Sapucaia II, Contagem, MG. CEP 32071-184
        </span>
      </div>
    </div>
  )
}
