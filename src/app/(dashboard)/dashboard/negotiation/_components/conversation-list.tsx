"use client"
import {
  GetNegotiation,
  GetNegotiationsResponse,
} from "@/lib/actions/get-messages"
import { GetUsersResponse } from "@/lib/actions/get-users"
import clsx from "clsx"
import { useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { find, initial } from "lodash"
import useConversation from "@/hooks/use-conversation"
import { GetMessageResponse } from "@/lib/validations/message"
import ConversationBox from "./conversation-box"
import { GetNegotiationResponse } from "@/lib/actions/get-all-negotiations-by-user"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ConversationListProps {
  initialItems: GetNegotiationResponse[]
}

export function ConversationList({ initialItems }: ConversationListProps) {
  const session = useSession()
  const [items, setItems] = useState(initialItems)
  const router = useRouter()

  const pathname = usePathname()
  const pathParts = pathname.split("/")
  const conversationId = pathParts[pathParts.length - 1]

  return (
    <Card className="w-1/4">
      <CardHeader className="space-y-1">
        <CardTitle>Mensagens</CardTitle>
      </CardHeader>
      <ScrollArea className="pb-6 lg:pb-8 h-72">
        <CardContent className="m-0 p-1">
          {items.map((item) => (
            <ConversationBox
              key={item.id}
              data={item}
              selected={conversationId === item.id}
            />
          ))}
        </CardContent>
      </ScrollArea>
    </Card>
  )
}
