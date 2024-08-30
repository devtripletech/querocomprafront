import { Shell } from "@/components/shells/shell"
import { AuthForm } from "@/components/forms/auth-form"
import { Toaster } from "sonner"

const AuthPage = () => {
  return (
    <Shell className="max-w-xl">
      <AuthForm />
      <Toaster />
    </Shell>
  )
}

export default AuthPage
