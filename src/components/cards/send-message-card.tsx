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

interface SendMessageCardProps {
  messages: Message[]
  userId: string
  negotiationId: string
}
export function SendMessageCard({
  messages,
  userId,
  negotiationId,
}: SendMessageCardProps) {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="space-y-1">
        <CardTitle>Chat</CardTitle>
      </CardHeader>
      <ScrollArea className="pb-6 pr-6 lg:pb-8  h-72">
        <CardContent className="space-y-3">
          {messages &&
            messages.map((message) => (
              <div
                key={message.id}
                className="flex gap-2 text-muted-foreground text-sm"
              >
                <Avatar>
                  <AvatarFallback>
                    {getInitialLetters(message.userName)}
                  </AvatarFallback>
                </Avatar>
                <p className="leading-relaxed">
                  <span className="block font-bold text-muted-foreground">
                    {message.userName}:
                  </span>
                  {message.content}
                </p>
              </div>
            ))}
        </CardContent>
      </ScrollArea>
      <CardFooter className="gap-2 flex items-center">
        <SedMessageForm userId={userId} negotiationId={negotiationId} />
      </CardFooter>
    </Card>
  )
}