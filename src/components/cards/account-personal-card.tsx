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
  RocketIcon,
  AlertTriangle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useSelectedLayoutSegment } from "next/navigation"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { SidebarSubNav } from "../layouts/sidebar-sub-nav"
import { accountDashboardConfig } from "@/config/dashboard"
import { Separator } from "../ui/separator"
import { Button, buttonVariants } from "../ui/button"

import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { AddAccountPersonalForm } from "../forms/add-account-personal-form"
import { User } from "@/lib/validations/user"

export function AccountPersonalCard({
  userValid,
  user,
  userId,
}: {
  userValid: boolean
  user: User
  userId: number
}) {
  console.log(userId)
  return (
    <div className="flex flex-col gap-4 w-full">
      {!userValid && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />

          <AlertTitle>
            Aviso Importante - Conclusão do Cadastro Obrigatória
          </AlertTitle>
          <AlertDescription>
            É importante informar que o seu cadastro na plataforma está em
            andamento. Para começar a utilizar todos os recursos e benefícios
            que oferecemos, solicitamos que conclua o seu cadastro o mais breve
            possível.
          </AlertDescription>
        </Alert>
      )}

      <AddAccountPersonalForm user={user} userId={userId} />
    </div>
  )
}
