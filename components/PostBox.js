import { useSession } from "next-auth/react"
import React from "react"
import Avatar from "./Avatar"
import { LinkIcon, PhotographIcon } from "@heroicons/react/outline"
import { useForm } from "react-hook-form"

function PostBox() {
  const { data: session } = useSession()
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  return (
    <form className="z-50 rounded-md border border-gray-300 bg-white p-2">
      <div className="flex items-center space-x-3">
        {/* Avatar */}
        <Avatar />
        <input
          {...register("post title", { required: true })}
          disabled={!session}
          className="flex-1 rounded-md bg-gray-50 p-2 outline-none"
          type="text"
          placeholder={
            session ? "Create a post by entering a title!" : "Sign in to post"
          }
        />

        {/* Icons  */}
        <PhotographIcon className={`h-6 text-gray-300 cursor-pointer`} />
        <LinkIcon className="h-6 text-gray-300" />
      </div>
      {!!watch("post title") && <div>{/* Body */}</div>}
    </form>
  )
}

export default PostBox
