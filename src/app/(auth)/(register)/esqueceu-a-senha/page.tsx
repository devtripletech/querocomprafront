import type { Metadata } from "next"
import { Shell } from "@/components/shells/shell"
import { ResetPasswordForm } from "@/components/forms/reset-password-form"

export const metadata: Metadata = {
  title: "Esqueceu a sua senha?",
  description: "Nós enviaremos o passo a passo para o seu email",
}

export default function RecoverPasswordPage() {
  return (
    <Shell className="max-w-md">
      <ResetPasswordForm />
    </Shell>
  )
}
