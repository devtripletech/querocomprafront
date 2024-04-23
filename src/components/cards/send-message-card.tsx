"use client"

import { useTheme } from "next-themes"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu"
import Link from "next/link"
import {
  Lock,
  ChevronRightIcon,
  KeyRound,
  LayoutGrid,
  Mail,
  UserRound,
  Contact,
  Phone,
  MapPin,
} from "lucide-react"
import { cn, getInitialLetters } from "@/lib/utils"
import { useSelectedLayoutSegment } from "next/navigation"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { SidebarSubNav } from "../layouts/sidebar-sub-nav"
import { accountDashboardConfig } from "@/config/dashboard"
import { User } from "@/lib/validations/user"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { Button } from "../ui/button"
import { SedMessageForm } from "../forms/send-message-form"
import { Message } from "@/lib/validations/negotiation"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageBox } from "../message-box"
import { GetMessageResponse } from "@/lib/validations/message"

interface SendMessageCardProps {
  messages: GetMessageResponse[]
  userId: string
  negotiationId: string
}
export function SendMessageCard({
  messages,
  userId,
  negotiationId,
}: SendMessageCardProps) {
  return (
    <div className="flex gap-4 w-full">
      <Card className="w-1/4">
        <CardHeader className="space-y-1">
          {/* <CardTitle>Chat</CardTitle> */}
        </CardHeader>
        <ScrollArea className="pb-6 pr-6 lg:pb-8  h-72">
          <CardContent className="space-y-3"></CardContent>
        </ScrollArea>
      </Card>
      <Card className="w-3/4">
        <CardHeader className="space-y-1">
          {/* <CardTitle>Chat</CardTitle> */}
        </CardHeader>
        <ScrollArea className="pb-6 pr-6 lg:pb-8  h-72">
          <CardContent className="space-y-3">
            {messages && messages.length > 0 ? (
              messages.map((message, i) => (
                <MessageBox key={message.id} data={message} />
              ))
            ) : (
              <span className="pt-20 flex justify-center items-center">
                Sem mensagens
              </span>
            )}
          </CardContent>
        </ScrollArea>
        <CardFooter className="gap-2 flex items-center">
          <SedMessageForm userId={userId} negotiationId={negotiationId} />
        </CardFooter>
      </Card>
    </div>
  )
}
