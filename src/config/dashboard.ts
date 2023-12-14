import { type SidebarNavItem } from "@/types"

export interface DashboardConfig {
  sidebarNav: SidebarNavItem[]
}
export const dashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      title: "Minha conta",
      href: "/dashboard/account",
      icon: "avatar",
      items: [],
    },
  ],
}

export const accountDashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      title: "Visão geral",
      href: "/dashboard/account",
      icon: "layoutGrid",
      items: [],
    },
    {
      title: "Dados de acesso",
      href: "/dashboard/account/access",
      icon: "keyRound",
      items: [],
    },
    {
      title: "Dados pessoais",
      href: "/dashboard/account/personal",
      icon: "userRound",
      items: [],
    },
  ],
}
