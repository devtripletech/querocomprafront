import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

export const startNegotiationSchema = z.object({
  price: z.string(),
  qnt: z.string().default("1"),
})
type Inputs = z.infer<typeof startNegotiationSchema>

export function StartNegotiationForm() {
  const form = useForm<Inputs>({
    resolver: zodResolver(startNegotiationSchema),
    defaultValues: {
      price: "",
      qnt: "",
    },
  })

  function onSubmit(input: Inputs) {}
  return (
    <DialogContent className="max-w-md">
      <DialogHeader className="">
        <DialogTitle>Iniciar negociação</DialogTitle>
        <DialogDescription>
          Para iniciar uma negociação determine um valor.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form className="gap gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex items-center gap-2">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="w-full">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value || "1"}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">R$ 1.250,00</SelectItem>
                      <SelectItem value="2">R$ 1.150,00</SelectItem>
                      <SelectItem value="3">R$ 1.050,00</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="qnt"
              render={({ field }) => (
                <FormItem className="w-full">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value || "1"}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">1 Unidade</SelectItem>
                      <SelectItem value="2">2 Unidade</SelectItem>
                      <SelectItem value="3">3 Unidade</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Separator className="mb-4 mt-8" />
          <div className="flex items-center justify-end gap-2">
            <DialogClose asChild>
              <Button type="button" variant="ghost">
                Voltar
              </Button>
            </DialogClose>
            <Button className="mt-2">
              Continuar{" "}
              <Icons.messageSquare size={20} className="text-white ml-2" />
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  )
}
