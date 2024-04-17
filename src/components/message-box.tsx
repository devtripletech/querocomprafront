"use client"

import clsx from "clsx"
import { format } from "date-fns"
import { GetMessageResponse } from "@/lib/validations/message"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { getInitialLetters } from "@/lib/utils"

interface MessageBoxProps {
  data: GetMessageResponse
}

export const MessageBox = ({ data }: MessageBoxProps) => {
  const container = clsx("flex gap-3 pb-4", data.isOwn === 1 && "justify-end")

  const avatar = clsx(data.isOwn && "order-2")

  const body = clsx("flex flex-col gap-2", data.isOwn === 1 && "items-end")

  const message = clsx(
    "text-sm w-fit overflow-hidden rounded-lg py-2 px-3",
    data.isOwn === 1 ? "bg-sky-500 text-white" : "bg-gray-100"
  )

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar>
          {data.isOwn === 1 && <AvatarImage src={data.img} alt={data.name} />}
          <AvatarFallback>{getInitialLetters(data.name)}</AvatarFallback>
        </Avatar>
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">{data.name}</div>
          <div className="text-xs text-gray-400">
            {format(new Date(data.createdAt), "p")}
          </div>
        </div>
        <div className={message}>
          <div>{data.body}</div>
        </div>
      </div>
    </div>
  )
}
