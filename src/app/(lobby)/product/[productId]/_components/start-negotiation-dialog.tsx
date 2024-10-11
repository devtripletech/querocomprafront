"use client"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import * as React from "react"
import { StartNegotiationForm } from "./start-netotiation-form"

export function StartNegotiationDialog() {
  const [isOpenDialog, setOpenDialog] = React.useState(false)
  console.log("Start")

  return (
    <Dialog
      open={isOpenDialog || false}
      onOpenChange={(open) => {
        if (!open) {
          setOpenDialog(false)
        } else {
          setOpenDialog(true)
        }
      }}
    >
      <DialogTrigger asChild>
        <Button size={"lg"} onClick={() => setOpenDialog(true)}>
          Iniciar Negociação
          <Icons.messageSquare size={20} className="text-white ml-2" />
        </Button>
      </DialogTrigger>
      <StartNegotiationForm />
    </Dialog>
  )
}
