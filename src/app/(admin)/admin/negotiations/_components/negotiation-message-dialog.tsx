"use client"
import {
  Message,
  getMessagesNegotiationAction,
} from "@/app/_actions/negotiation"
import { AvatarFallback } from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getInitialLetters } from "@/lib/utils"
import { Avatar } from "@radix-ui/react-avatar"
import { useQuery } from "@tanstack/react-query"
import clsx from "clsx"
import { useSession } from "next-auth/react"
import { MessageBox } from "@/components/message-box"

type Messages = {
  id: number
  name: string
  email: string
  body: string
  createdAt: string
}[]
interface NegotiationMessagesProps {
  negotiationId: string
  open: boolean
}
export function NegotiationMessages({
  negotiationId,
  open,
}: NegotiationMessagesProps) {
  const { data: data } = useQuery({
    queryKey: ["messages", negotiationId],
    queryFn: () => getMessagesNegotiationAction(negotiationId),
    enabled: open,
  })

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Mensagens</DialogTitle>
        {/* <DialogDescription>Detalhes</DialogDescription> */}
      </DialogHeader>
      <Card className="w-full max-w-2xl pt-4">
        <ScrollArea className="pb-6 pr-6 lg:pb-8  h-72">
          <CardContent>
            {data?.messages && data.messages.length > 0 ? (
              data.messages.map((message: Message, i) => (
                <MessageBox key={message.id} message={message} />
              ))
            ) : (
              <span className="pt-20 flex justify-center items-center">
                Sem mensagem
              </span>
            )}
          </CardContent>
        </ScrollArea>
        <CardFooter className="gap-2 flex items-center">
          {/* <SedMessageForm userId={userId} negotiationId={negotiationId} /> */}
        </CardFooter>
      </Card>
    </DialogContent>
  )
}
