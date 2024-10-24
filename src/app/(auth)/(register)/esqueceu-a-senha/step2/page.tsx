import type { Metadata } from "next"

import { Shell } from "@/components/shells/shell"

export const metadata: Metadata = {
  title: "Recover Password",
  description: "Recover Password",
}

export default function ResetPasswordStep2Page() {
  return <Shell className="max-w-xl">Esqueceu a senha</Shell>
}
