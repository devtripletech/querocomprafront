"use client"

import Image from "next/image"

type User = {
  id: number
  name: string
  email: string
  role: number
  create_at: string
}
interface AvatarProps {
  user?: User
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  return (
    <div className="relative">
      <div
        className="
          relative
          inline-block
          rounded-full
          overflow-hidden
          h-9
          w-9
          md:h-11
          md:w-11
        "
      >
        <Image alt="Avatar" src={"/images/placeholder.jpg"} fill />
      </div>
    </div>
  )
}

export default Avatar
