import type { Metadata } from "next"

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Shell } from "@/components/shells/shell"
import { LogOutButtons } from "@/components/auth/logout-buttons"
import { Toaster } from "sonner"
import { ResetPasswordForm } from "@/components/forms/reset-password-form"

export const metadata: Metadata = {
  title: "Recover Password",
  description: "Recover Password",
}

export default function ResetPasswordStep2Page() {
  return <Shell className="max-w-xl">{/* <ResetPasswordFormStep2 /> */}</Shell>
}
