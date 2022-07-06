import { useSession } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/router"

import toast from "react-hot-toast"

export default function NewComment({ post }) {
  const router = useRouter()
  const [content, setContent] = useState("")
  const { data: session } = useSession()

  const onSubmitComment = async (e) => {
    e.preventDefault()
    const notification = toast.loading("Posting your comment")
    if (!content) {
      toast.error("Enter some text in the comment")
      return
    }
    await fetch("/api/comment", {
      body: JSON.stringify({
        post: post.id,
        content: content,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })

    router.reload(window.location.pathname)

    toast.success("comment Sucessfully", {
      id: notification,
    })
  }

  return (
    <div className="rounded-b-md border border-t-0 border-gray-300 bg-white mt-2 p-5 pl-16">
      <p className="text-sm">
        Comment as <span className="text-red-500">{session?.user?.name}</span>
      </p>

      <form onSubmit={onSubmitComment} className="flex flex-col space-y-2">
        <textarea
          onChange={(e) => setContent(e.target.value)}
          disabled={!session}
          className="h-24 rounded-md border border-gray-200 p-2 pl-4 outline-none disabled:bg-gray-50"
          placeholder={
            session ? "What are your thoughts?" : "Please sign in to comment"
          }
        />

        <button
          disabled={!session}
          type="submit"
          className="rounded-full bg-red-500 p-3 text-white disabled:text-black disabled:font-semibold disabled:bg-gray-200"
        >
          Comment
        </button>
      </form>
    </div>
  )
}
