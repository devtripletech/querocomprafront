import * as React from "react"
import { Shell } from "@/components/shells/shell"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { ConversationList } from "./_components/conversation-list"
import { getAllNegotiationsByUser } from "@/lib/actions/get-all-negotiations-by-user"
import { ReactQueryProvider } from "@/components/react-query-provider"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

export default async function NegotiationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const conversations = await getAllNegotiationsByUser()
  return (
    <Shell variant="sidebar">
      <PageHeader>
        <div className="flex space-x-4">
          <PageHeaderHeading size="sm" className="flex-1">
            Negociações
          </PageHeaderHeading>
        </div>
        <PageHeaderDescription size="sm">
          Gerenciar suas Negociações
        </PageHeaderDescription>
      </PageHeader>
      <section
        id="user-account-info"
        aria-labelledby="user-account-info-heading"
        className="overflow-hidden"
      >
        <div className="flex gap-4 w-full">
          <ConversationList initialItems={conversations} />
          {children}
        </div>
      </section>

      {/* <section className="grid gap-4">
        
        <ConversationList initialItems={conversations} />
        {children}
      </section> */}
    </Shell>
  )
}
