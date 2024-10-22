"use client"
import Link from "next/link"

import { dashboardConfig } from "@/config/dashboard"
import { siteConfig } from "@/config/site"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { MainNav } from "@/components/layouts/main-nav"
import { MobileNav } from "@/components/layouts/mobile-nav"
import { Icons } from "../icons"
import { User } from "@/lib/validations/user"
import { redirect } from "next/navigation"
import { UserPayload } from "@/lib/validations/auth"
import { signOut } from "next-auth/react"

interface SiteHeaderProps {
  user?: UserPayload | null
}

export async function SiteHeader({ user }: SiteHeaderProps) {
  let initials
  if (user) {
    initials = `${user.name?.charAt(0).toLocaleUpperCase() ?? ""}`
  }

  return (
    <header className="sticky top-0 z-40 w-full bg-background">
      <div className="container flex h-16 items-center">
        <MainNav items={siteConfig.mainNav} />
        <MobileNav
          mainNavItems={siteConfig.mainNav}
          sidebarNavItems={dashboardConfig.sidebarNav}
        />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Link href="/">
              <div
                className={buttonVariants({
                  size: "sm",
                  variant: "outline",
                })}
              >
                Anunciar produto
                <span className="sr-only">Anunciar produto</span>
              </div>
            </Link>
            {user ? (
              <>
                <Link href="/">
                  <div
                    className={buttonVariants({
                      size: "icon",
                      variant: "secondary",
                      className: "rounded-lg w-8 h-8",
                    })}
                  >
                    <Icons.chartNoAxesCombined
                      size={20}
                      className="text-black-dark"
                    />
                  </div>
                </Link>
                <Link href="/">
                  <div
                    className={buttonVariants({
                      size: "icon",
                      variant: "ghost",
                      className: "rounded-lg w-8 h-8",
                    })}
                  >
                    <Icons.messageSquare size={20} className="text-black-mid" />
                  </div>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="relative rounded-lg w-8 h-8"
                    >
                      <Icons.menu size={20} className="text-black-mid" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          Meu Perfil
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem asChild>
                        <Link
                          href="/dashboard/settings"
                          className="cursor-pointer"
                        >
                          <Icons.userAccount
                            className="mr-2 h-4 w-4"
                            aria-hidden="true"
                          />
                          Conta
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href="/dashboard/settings"
                          className="cursor-pointer"
                        >
                          <Icons.myNegotiation
                            className="mr-2 h-4 w-4"
                            aria-hidden="true"
                          />
                          Minhas Negociações
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href="/dashboard/settings"
                          className="cursor-pointer"
                        >
                          <Icons.archive
                            className="mr-2 h-4 w-4 text-black-dark"
                            aria-hidden="true"
                          />
                          Meus Produtos
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href="/dashboard/settings"
                          className="cursor-pointer"
                        >
                          <Icons.store
                            className="mr-2 h-4 w-4 text-black-dark"
                            aria-hidden="true"
                          />
                          Minha Loja
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <button
                        className="text-red-500 font-semibold cursor-pointer underline-offset-4 w-full"
                        onClick={() => signOut()}
                      >
                        <Icons.logout
                          className="mr-2 h-4 w-4"
                          aria-hidden="true"
                        />
                        Sair
                      </button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Link href="/login">
                <div
                  className={buttonVariants({
                    size: "sm",
                  })}
                >
                  Login
                  <span className="sr-only">Login</span>
                </div>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
