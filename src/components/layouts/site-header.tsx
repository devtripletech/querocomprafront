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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/account">
                        <Icons.user
                          className="mr-2 h-4 w-4"
                          aria-hidden="true"
                        />
                        Perfil
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild disabled>
                      <Link href="/dashboard/settings">
                        <Icons.settings
                          className="mr-2 h-4 w-4"
                          aria-hidden="true"
                        />
                        Configuração
                        <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/signout">
                      <Icons.logout
                        className="mr-2 h-4 w-4"
                        aria-hidden="true"
                      />
                      Sair
                      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
