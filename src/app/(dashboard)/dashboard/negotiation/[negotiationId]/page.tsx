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
import {
  getMessagesNegotiationAction,
  sendMessageNegotiationAction,
} from "@/app/_actions/negotiation"
import { catchError } from "@/lib/utils"
import { SendMessageCard } from "@/components/cards/send-message-card"

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

  const messages = await getMessagesNegotiationAction(negotiationId)

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
          <SendMessageCard
            messages={messages}
            userId={user.id_user.toString()}
            negotiationId={negotiationId}
          />
        </div>
      </section>
    </Shell>
  )
}
