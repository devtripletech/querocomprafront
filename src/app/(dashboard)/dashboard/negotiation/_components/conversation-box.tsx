"use client"
import { useCallback, useMemo } from "react"
import { useRouter } from "next/navigation"

import { format } from "date-fns"
import { useSession } from "next-auth/react"
import clsx from "clsx"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { GetNegotiationResponse } from "@/lib/actions/get-all-negotiations-by-user"
import { getMessagesNegotiationAction } from "@/app/_actions/negotiation"
import { useQuery } from "@tanstack/react-query"
import { getInitialLetters, truncate } from "@/lib/utils"

interface ConversationBoxProps {
  data: GetNegotiationResponse
  selected?: boolean
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
  data,
  selected,
}) => {
  // const otherUser = useOtherUser(data)

  const session = useSession()
  const router = useRouter()

  const { data: res } = useQuery({
    queryKey: ["messages-by-user", data.id],
    queryFn: () => getMessagesNegotiationAction(data.id),
  })

  const handleClick = useCallback(() => {
    router.push(`/dashboard/negotiation/${data.id}`)
  }, [data.id, router])

  const lastMessage = useMemo(() => {
    const messages = res?.messages || []

    return messages[messages.length - 1]
  }, [res?.messages])

  function getFirstName(name: string) {
    let nameParts = name.split(" ")

    return nameParts[0]
  }

  const lastMessageText = useMemo(() => {
    if (lastMessage?.body) {
      return lastMessage.body
    }

    return ""
  }, [lastMessage])

  return (
    <div
      onClick={handleClick}
      className={clsx(
        `
        w-full,
        relative
        flex
        items-center
        hover:bg-neutral-100
        rounded-lg
        transition
        cursor-pointer
        p-3
        mb-1
      `,
        selected ? "bg-neutral-100" : "bg-white"
      )}
    >
      <Avatar className="mr-2">
        {data.img && <AvatarImage src={data.img} alt={data.name} />}
        <AvatarFallback>{getInitialLetters(data.name)}</AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex justify-start flex-col mb-1">
            <p
              className="
                text-sm
                font-normal
                text-gray-900
              "
            >
              {`${getFirstName(data.vendedor)} - ${truncate(data.name, 15)}`}
            </p>
            {lastMessage?.createdAt && (
              <p
                className="
                  text-xs
                  text-gray-400
                  font-light
                "
              >
                {`${truncate(lastMessageText, 20)} - ${format(
                  new Date(lastMessage.createdAt),
                  "p"
                )}`}
              </p>
            )}
          </div>
          {/* <p
            className={clsx(
              `
              text-black font-medium
              truncate
              text-sm
            `
            )}
          >
            {lastMessageText}
          </p> */}
        </div>
      </div>
    </div>
  )
}

export default ConversationBox
