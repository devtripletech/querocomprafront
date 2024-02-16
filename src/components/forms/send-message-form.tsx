"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  UncontrolledFormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { type z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import * as React from "react"
import { sendMessageNegotiationAction } from "@/app/_actions/negotiation"
import { catchError } from "@/lib/utils"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { sendMessageSchema } from "@/lib/validations/negotiation"

type Inputs = z.infer<typeof sendMessageSchema>

interface SedMessageFormProps {
  userId: string
  negotiationId: string
}
export function SedMessageForm({ userId, negotiationId }: SedMessageFormProps) {
  const [isPending, startTransition] = React.useTransition()
  const router = useRouter()
  const form = useForm<Inputs>({
    resolver: zodResolver(sendMessageSchema),
    defaultValues: {
      id_negociacao: negotiationId,
      id_user_mensagem: userId,
      mensagem: "",
    },
  })

  function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        const res = await sendMessageNegotiationAction(data)
        toast.success(res.mensagem)
      } catch (err) {
        catchError(err)
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-2xl gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="mensagem"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Envie sua msg" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isPending} size="sm" type="submit">
          Enviar
        </Button>
      </form>
    </Form>
  )
}
