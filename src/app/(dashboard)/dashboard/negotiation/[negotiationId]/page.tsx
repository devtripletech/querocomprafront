import { type Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { env } from "@/env.mjs"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { UpdateProductForm } from "@/components/forms/update-product-form"
import { ProductPager } from "@/components/pagers/product-pager"
import { getProductByIdAction } from "@/app/_actions/product"
import { Shell } from "@/components/shells/shell"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { listCategoriesAction } from "@/app/_actions/categories"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { currentUser, getUserAction } from "@/app/_actions/user"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Manage Product",
  description: "Manage your product",
}

interface NegotiationPageProps {
  params: {
    negotiationId: string
  }
}

export default async function NegotiationPage({
  params,
}: NegotiationPageProps) {
  const negotiationId = params.negotiationId

  const user = await currentUser()

  if (!user) {
    redirect("/signin")
  }

  const userData = await getUserAction(user?.id_user)

  if (!userData.uservalido) {
    redirect("/dashboard/account/personal")
  }

  return (
    <Shell variant="sidebar">
      <PageHeader
        id="account-header"
        aria-labelledby="account-header-heading"
        separated
      >
        <PageHeaderHeading size="sm">Mensagem</PageHeaderHeading>
        <PageHeaderDescription size="sm"></PageHeaderDescription>
      </PageHeader>
      <section
        id="user-account-info"
        aria-labelledby="user-account-info-heading"
        className="overflow-hidden"
      >
        <div className="flex  gap-4">
          <Card className="w-full max-w-2xl">
            <CardHeader className="space-y-1">
              <CardTitle>Chat</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2 text-muted-foreground text-sm">
                <Avatar>
                  <AvatarFallback>ED</AvatarFallback>
                </Avatar>
                <p className="leading-relaxed">
                  <span className="block font-bold text-muted-foreground">
                    Edvan:
                  </span>
                  is simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum has been the s standard dummy
                </p>
              </div>

              <div className="flex gap-2 text-muted-foreground text-sm">
                <Avatar>
                  <AvatarFallback>MM</AvatarFallback>
                </Avatar>
                <p className="leading-relaxed">
                  <span className="block font-bold text-muted-foreground">
                    Matheus:
                  </span>
                  is simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum has been the standard dummy
                </p>
              </div>
            </CardContent>
            <CardFooter className="gap-2 flex items-center">
              <Input type="text" placeholder="Envie sua msg" />
              <Button size="sm" type="submit">
                Enviar
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </Shell>
  )
}
