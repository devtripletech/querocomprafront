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
    {
      title: "Produto",
      href: "/dashboard/products",
      icon: "boxes",
      items: [],
    },
    {
      title: "Categoria",
      href: "/dashboard/categories",
      icon: "layoutGrid",
      items: [],
    },
    {
      title: "Min. negociações",
      href: "/dashboard/negotiation/my",
      icon: "message",
      items: [],
    },
    {
      title: "Negociações P/S",
      href: "/dashboard/negotiation",
      icon: "message",
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

export const negotiationDashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      title: "Visão geral",
      href: "/dashboard/negotiation/my",
      icon: "layoutGrid",
      items: [],
    },
    {
      title: "Dados de acesso",
      href: "/dashboard/negotiation",
      icon: "keyRound",
      items: [],
    },
  ],
}
