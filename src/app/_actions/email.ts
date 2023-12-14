"use server"

import { revalidatePath } from "next/cache"
import { env } from "@/env.mjs"
import { type z } from "zod"

import { resend } from "@/lib/resend"
import { updateEmailPreferencesSchema } from "@/lib/validations/email"
import { currentUser } from "./user"

// Email can not be sent through a server action in production, because it is returning an email component maybe?
// So we are using the route handler /api/newsletter/subscribe instead

export async function updateEmailPreferencesAction(
  rawInput: z.infer<typeof updateEmailPreferencesSchema>
) {
  const input = updateEmailPreferencesSchema.parse(rawInput)

  const emailPreference = {} as any

  if (!emailPreference) {
    throw new Error("Email not found.")
  }

  const user = await currentUser()

  // if (input.newsletter && !emailPreference.newsletter) {
  //   await resend.emails.send({
  //     from: env.EMAIL_FROM_ADDRESS,
  //     to: emailPreference.email,
  //     subject: "Welcome to skateshop",
  //     react: NewsletterWelcomeEmail({
  //       firstName: user?.firstName ?? undefined,
  //       fromEmail: env.EMAIL_FROM_ADDRESS,
  //       token: input.token,
  //     }),
  //   })
  // }

  // await db
  //   .update(emailPreferences)
  //   .set({
  //     ...input,
  //     userId: user?.id,
  //   })
  //   .where(eq(emailPreferences.token, input.token))

  revalidatePath("/")
}
