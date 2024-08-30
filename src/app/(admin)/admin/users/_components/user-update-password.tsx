"use client"
import { useQuery } from "@tanstack/react-query"

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"
import { PasswordInput } from "@/components/password-input"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { Dispatch, SetStateAction } from "react"
import { useForm } from "react-hook-form"
import { updatePassword } from "@/lib/actions/update-password"
import { toast } from "sonner"

export interface UserDetailsProps {
  userId: string
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}
const updatePasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(3, {
        message: "A senha deve ter pelo menos 3 caracteres",
      })
      .max(100),
    confirmPassword: z
      .string()
      .min(3, {
        message: "A senha deve ter pelo menos 3 caracteres",
      })
      .max(100),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Senhas não combinam",
    path: ["confirmPassword"],
  })
type UpdatePasswordSchema = z.infer<typeof updatePasswordSchema>

export function UpdatePassword({ userId, open, setOpen }: UserDetailsProps) {
  const [isPending, startTransition] = React.useTransition()
  // const { data: user } = useQuery({
  //   queryKey: ["user", userId],
  //   queryFn: () => getUserDetails({ userId }),
  //   enabled: open,
  // })

  const form = useForm<UpdatePasswordSchema>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  })

  function onSubmit({ newPassword, confirmPassword }: UpdatePasswordSchema) {
    startTransition(async () => {
      try {
        await updatePassword({ userId, newPassword })
        toast.success("Senha alterado com sucesso!")
        form.reset()
        setOpen(false)
      } catch (err) {
        toast.error("Ocorreu um erro")
      }
    })
  }
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Atualizar senha</DialogTitle>
        {/* <DialogDescription>Detalhes</DialogDescription> */}
        <Form {...form}>
          <form
            className="grid gap-3 py-4"
            onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
          >
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="**********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar a senha</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="**********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending}>
              {isPending && (
                <Icons.spinner
                  className="mr-2 h-4 w-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              Alterar
              <span className="sr-only">Alterar</span>
            </Button>
          </form>
        </Form>
      </DialogHeader>
    </DialogContent>
  )
}
