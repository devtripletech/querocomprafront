"use client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import React, { Dispatch, SetStateAction } from "react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getUserDetails } from "@/lib/actions/get-user-details"
import { formatAddress, formatDate } from "@/lib/utils"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { UserDetailsResponse, userDetailsSchema } from "@/lib/validations/user"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  UpdateUserDetailsRequest,
  updateUserDetails,
} from "@/lib/actions/update-user-details"
import { GetUsersResponse } from "@/lib/actions/get-users"

type Params = {
  pageIndex: number
  role: string | null
  name: string | null
  activated: string | null
}

export interface UserDetailsProps {
  userId: string
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  params: Params
}

export function UserDetailsEdit({
  userId,
  open,
  setOpen,
  params,
}: UserDetailsProps) {
  const [isPending, startTransition] = React.useTransition()
  const queryClient = useQueryClient()

  const { data: user } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserDetails({ userId }),
    enabled: open,
    staleTime: Infinity, //24 horas (86400000 tempo em milissegundos)
  })

  function updateUserDataOnCache({ userId, input }: UpdateUserDetailsRequest) {
    const cached = queryClient.getQueryData<UserDetailsResponse>([
      "user",
      userId,
    ])

    if (cached) {
      queryClient.setQueryData<UserDetailsResponse>(["user", userId], {
        ...cached,
        ...input,
      })
    }

    return { cached }
  }
  const { mutateAsync: updateUserDetailsFn } = useMutation({
    mutationFn: updateUserDetails,
    onMutate: ({ userId, input }) => {
      const { cached } = updateUserDataOnCache({ userId, input })
      queryClient.invalidateQueries({ queryKey: ["users"] })
      return { previousProfile: cached }
    },
    onError(_, __, context) {
      if (context?.previousProfile) {
        updateUserDataOnCache({ userId, input: context.previousProfile })
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          "users",
          params.pageIndex,
          params.role,
          params.name,
          params.activated,
        ],
      })
    },
  })

  //const form = useForm<UserDetailsResponse>()
  const form = useForm<UserDetailsResponse>({
    resolver: zodResolver(userDetailsSchema),
    defaultValues: {
      id: user?.id ?? undefined,
      email: user?.email ?? "",
      name: user?.name ?? "",
      role: user?.role,
      address: {
        id_usuario: user?.address?.id_usuario ?? "",
        telefone: user?.address?.telefone ?? "",
        celular: user?.address?.celular ?? "",
        endereco: user?.address?.endereco ?? "",
        complemento: user?.address?.complemento ?? "",
        cep: user?.address?.cep ?? "",
        cpf: user?.address?.cpf ?? "",
        id_user: user?.address?.id_user ?? "",
        data_cadastrou: user?.address?.data_cadastrou ?? "",
        bairro: user?.address?.bairro ?? "",
        uf: user?.address?.uf ?? "",
        cidade: user?.address?.cidade ?? "",
        numero: user?.address?.numero ?? "",
      },
    },
  })

  function onSubmit(input: UserDetailsResponse) {
    startTransition(async () => {
      try {
        updateUserDetailsFn({ userId, input })
        toast.success("usuário atualizado com sucesso!")
        form.reset()
        setOpen(false)
      } catch (err) {
        toast.error("Ocorreu um erro")
      }
    })
  }

  React.useEffect(() => {
    if (user) {
      form.setValue("id", user.id)
      form.setValue("email", user.email)
      form.setValue("name", user.name)
      form.setValue("role", user.role)
      if (user.address) {
        form.setValue("address.telefone", user.address.telefone)
        form.setValue("address.celular", user.address.celular)
        form.setValue("address.id_usuario", user.address.id_usuario)
        form.setValue("address.endereco", user.address.endereco)
        form.setValue("address.complemento", user.address.complemento)
        form.setValue("address.cep", user.address.cep)
        form.setValue("address.cpf", user.address.cpf)
        form.setValue("address.data_cadastrou", user.address.data_cadastrou)
        form.setValue("address.bairro", user.address.bairro)
        form.setValue("address.uf", user.address.uf)
        form.setValue("address.cidade", user.address.cidade)
        form.setValue("address.numero", user.address.numero)
      }
    }
  }, [form.setValue, user])

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Editar usuário</DialogTitle>
        <DialogDescription>{user?.email ?? ""}</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form
          className="grid gap-4 py-4"
          onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
        >
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field: { name, onChange, value, disabled } }) => (
                <FormItem className="w-full">
                  <FormLabel>Perfil</FormLabel>
                  <FormControl>
                    <Select
                      name={name}
                      onValueChange={onChange}
                      value={value !== undefined ? String(value) : undefined}
                      disabled={disabled}
                    >
                      <SelectTrigger className="">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Administrador</SelectItem>
                        <SelectItem value="2">Usuário</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="address.telefone"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address.celular"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Celular</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="address.cep"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>CEP</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address.endereco"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Rua</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="address.numero"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Numero</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address.complemento"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Complemento</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="address.bairro"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Bairro</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address.cidade"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Cidade</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address.uf"
              render={({ field }) => (
                <FormItem className="w-[100px]">
                  <FormLabel>UF</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" disabled={isPending}>
            {isPending && (
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Atualizar
            <span className="sr-only">Atualizar</span>
          </Button>
        </form>
      </Form>
    </DialogContent>
  )
}
