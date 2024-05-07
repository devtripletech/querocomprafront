"use server"
import { env } from "@/env.mjs"
import { NegotiationDetailsResponse } from "../validations/message"
import { unstable_noStore as noStore, revalidatePath } from "next/cache"

export interface GetNegotiationDetailsRequest {
  messageId: string
}

export const getNegotiationDetails = async ({
  messageId,
}: GetNegotiationDetailsRequest): Promise<NegotiationDetailsResponse> => {
  noStore()
  const response = await fetch(`${env.API_URL}/messages/${messageId}/details`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  const data = await response.json()

  return data
}
