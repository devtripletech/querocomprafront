"use server"
import { env } from "@/env.mjs"
import { MessageDetailsResponse } from "../validations/message"

export interface GetMessageDetailsRequest {
  messageId: string
}

export const getMessageDetails = async ({
  messageId,
}: GetMessageDetailsRequest): Promise<MessageDetailsResponse> => {
  const response = await fetch(`${env.API_URL}/messages/${messageId}/details`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  const data = await response.json()
  console.log(data)

  return data
}
