import { type SidebarNavItem } from "@/types"

export interface DashboardConfig {
  sidebarNav: SidebarNavItem[]
  sidebarNavAdmin: SidebarNavItem[]
}
export const dashboardConfig: DashboardConfig = {
  sidebarNavAdmin: [
    {
      title: "Painel",
      href: "/admin",
      icon: "gauge",
      items: [],
    },
    {
      title: "Categorias",
      href: "/admin/categories",
      icon: "layoutGrid",
      items: [],
    },
    {
      title: "Usuários",
      href: "/admin/users",
      icon: "users",
      items: [],
    },
    {
      title: "Negociações",
      href: "/admin/negotiations",
      icon: "message",
      items: [],
    },
  ],
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
    // {
    //   title: "Min. negociações",
    //   href: "/dashboard/negotiation/my",
    //   icon: "message",
    //   items: [],
    // },
    {
      title: "Negociações",
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
  sidebarNavAdmin: [],
}

export const negotiationDashboardConfig: DashboardConfig = {
  sidebarNav: [
    // {
    //   title: "Visão geral",
    //   href: "/dashboard/negotiation/my",
    //   icon: "layoutGrid",
    //   items: [],
    // },
    // {
    //   title: "Dados de acesso",
    //   href: "/dashboard/negotiation",
    //   icon: "keyRound",
    //   items: [],
    // },
  ],
  sidebarNavAdmin: [],
}
