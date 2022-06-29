import { useSession } from "next-auth/react"
import Image from "next/image"
import React from "react"

const type = {
  seed: "",
  large: true,
}

function Avatar({ seed, large }) {
  const { data: session } = useSession()
  return (
    <div
      className={`overflow-hidden relative h-10 w-10 rounded-full border-gray-300 bg-white ${
        large && "h-20 w-20"
      }`}
    >
      <Image
        layout="fill"
        src={`https://avatars.dicebear.com/api/open-peeps/${
          seed || session?.user?.name || "placeholder"
        }.svg`}
      />
    </div>
  )
}

export default Avatar