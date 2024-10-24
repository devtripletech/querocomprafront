"use server"
import { env } from "@/env"
import { NegotiationDetailsResponse } from "../validations/message"
import { revalidatePath } from "next/cache"

export interface GetNegotiationDetailsRequest {
  messageId: string
}

export const getNegotiationDetails = async ({
  messageId,
}: GetNegotiationDetailsRequest): Promise<NegotiationDetailsResponse> => {
  const response = await fetch(`${env.API_URL}/messages/${messageId}/details`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  const data = await response.json()

  return data
}
