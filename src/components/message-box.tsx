"use client"

import clsx from "clsx"
import { format } from "date-fns"
import { GetMessageResponse } from "@/lib/validations/message"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { getInitialLetters } from "@/lib/utils"
import { Message } from "@/app/_actions/negotiation"

interface Product {
  name: string
  img: string
}
interface MessageBoxProps {
  message: Message
}

export const MessageBox = ({ message }: MessageBoxProps) => {
  const container = clsx(
    "flex gap-3 pb-4",
    message.isOwn === 1 && "justify-end"
  )

  const avatar = clsx(message.isOwn && "order-2")

  const body = clsx("flex flex-col gap-2", message.isOwn === 1 && "items-end")

  const messageStyle = clsx(
    "text-sm w-fit overflow-hidden rounded-lg py-2 px-3",
    message.isOwn === 1 ? "bg-sky-500 text-white" : "bg-gray-100"
  )

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar>
          <AvatarFallback>{getInitialLetters(message.name)}</AvatarFallback>
        </Avatar>
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">{message.name}</div>
          <div className="text-xs text-gray-400">
            {format(new Date(message.createdAt), "p")}
          </div>
        </div>
        <div className={messageStyle}>
          <div>{message.body}</div>
        </div>
      </div>
    </div>
  )
}
