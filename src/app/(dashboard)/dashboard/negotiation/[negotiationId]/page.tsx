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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { currentUser, getUserAction } from "@/app/_actions/user"
import {
  getMessagesNegotiationAction,
  sendMessageNegotiationAction,
} from "@/app/_actions/negotiation"
import {
  catchError,
  formatPrice,
  getInitialLetters,
  truncate,
} from "@/lib/utils"
import { SendMessageCard } from "@/components/cards/send-message-card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageBox } from "@/components/message-box"
import { SedMessageForm } from "@/components/forms/send-message-form"

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
    redirect("/login")
  }

  const userData = await getUserAction(user?.id_user)

  if (!userData.uservalido) {
    redirect("/dashboard/account/personal")
  }

  const { messages, product } = await getMessagesNegotiationAction(
    negotiationId
  )

  if (messages.length <= 0) {
    notFound()
  }

  return (
    <Card className="w-3/4">
      <CardHeader className="space-y-1">
        <CardTitle>
          <div className="flex gap-2 items-center">
            <Avatar>
              {product.img && (
                <AvatarImage src={product.img} alt={product.name} />
              )}
              <AvatarFallback>{getInitialLetters(product.name)}</AvatarFallback>
            </Avatar>
            <div className="text-base font-medium">{`${formatPrice(
              Number(product.price)
            )} - ${truncate(product.name, 70)}`}</div>
          </div>
        </CardTitle>
      </CardHeader>
      <ScrollArea className="pb-6 pr-6 lg:pb-8  h-72">
        <CardContent className="space-y-3">
          {messages && messages.length > 0 ? (
            messages.map((message, i) => (
              <MessageBox key={message.id} message={message} />
            ))
          ) : (
            <span className="pt-20 flex justify-center items-center">
              Sem mensagens
            </span>
          )}
        </CardContent>
      </ScrollArea>
      <CardFooter className="gap-2 flex items-center">
        <SedMessageForm
          userId={user?.id_user.toString()}
          negotiationId={negotiationId}
        />
      </CardFooter>
    </Card>
  )
}
