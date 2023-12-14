import { Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  updateCPFSchema,
  updatePasswordSchema,
} from "@/lib/validations/personal"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { toast } from "sonner"
import router from "next/router"
import { catchError } from "@/lib/utils"
import { Icons } from "../icons"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Textarea } from "../ui/textarea"

type Inputs = z.infer<typeof updatePasswordSchema>

export function EditPasswordDialog({
  children,
}: {
  children: React.ReactNode
}) {
  const [isPending, startTransition] = React.useTransition()
  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        console.log(data)
        // toast.success(res.status)

        // form.reset()

        //router.push("/dashboard/client")
      } catch (err) {
        catchError(err)
      }
    })
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
        {/* <Button variant="outline">Alterar</Button> */}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Alteração de senha</DialogTitle>
          <DialogDescription>
            Informe a senha atual e nova senha abaixo:
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="grid w-full gap-5"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha atual</FormLabel>
                  <Input {...field} placeholder="Digite sua senha atual" />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nova senha</FormLabel>
                  <Input {...field} placeholder="Digite sua nova senha" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar a nova senha</FormLabel>
                  <Input {...field} placeholder="Confirme a nova senha" />
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="sm:justify-end">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" className="w-fit" disabled={isPending}>
                {isPending && (
                  <Icons.spinner
                    className="mr-2 h-4 w-4 animate-spin"
                    aria-hidden="true"
                  />
                )}
                Alterar
                <span className="sr-only">Alterar</span>
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
