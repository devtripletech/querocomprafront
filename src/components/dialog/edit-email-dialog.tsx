import { Copy, Mail } from "lucide-react"

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
import { updateCPFSchema, updateEmailSchema } from "@/lib/validations/personal"
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

type Inputs = z.infer<typeof updateEmailSchema>

export function EditEmailDialog({
  children,
  email,
}: {
  email: string
  children: React.ReactNode
}) {
  const [isPending, startTransition] = React.useTransition()
  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(updateEmailSchema),
    defaultValues: {
      email: "",
      reasonForChange: "",
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
          <DialogTitle>Alterar e-mail</DialogTitle>
          <DialogDescription>
            Por motivos de segurança, nossa equipe validará a alteração.
          </DialogDescription>

          <div className="flex items-center pt-4">
            <Mail className="h-5 w-5 mr-2" /> <span>{email}</span>
          </div>
        </DialogHeader>
        <Form {...form}>
          <form
            className="grid w-full gap-5"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Novo email</FormLabel>
                  <Input
                    {...field}
                    placeholder="Para qual e-mail você gostaria de alterar?"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reasonForChange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Motivo da alteração</FormLabel>
                  <Textarea
                    placeholder="Descreva por que você precisa fazer essa alteração"
                    className="resize-none"
                    {...field}
                  />
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
