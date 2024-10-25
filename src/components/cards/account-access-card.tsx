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
import { EditPasswordDialog } from "../dialog/edit-password-dialog"

export function AccountAccessCard({ email }: { email: string }) {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex items-center">
        <KeyRound className="mr-2 h-5 w-5" />
        <h2 className="text-xl">Dados de acesso</h2>
      </div>
      <div className="flex flex-col">
        <div className="rounded-md border px-6 py-8 gap-2">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>E-mail</Label>
              <div className="flex  w-full items-center rounded-md border px-4 ">
                <Mail className="mr-2 h-5 w-5" />
                <Input
                  className="border-none"
                  type="email"
                  placeholder={email}
                  disabled
                />
              </div>
            </div>
            <div>
              <Label>Senha</Label>
              <div className="flex w-full items-center rounded-md border px-4 ">
                <Lock className="mr-2 h-5 w-5" />
                <Input
                  className="border-none"
                  type="password"
                  placeholder="***********"
                  disabled
                />
                <EditPasswordDialog>
                  <span className="text-sm cursor-pointer">Alterar</span>
                </EditPasswordDialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
