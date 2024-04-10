import { getServerSession } from "next-auth"
import { authOptions } from "../auth"

export const getToken = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return null
  }
  const user = session.user

  return user.accessToken
}
