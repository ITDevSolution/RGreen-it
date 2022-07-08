import Avatar from "./Avatar"

import timeago from "lib/timeago"
import { ChatAltIcon } from "@heroicons/react/outline"

import { useState } from "react"
import NewComment from "./NewComment"
import Link from "next/link"

export default function Comment({ comment, post }) {
  const [showReply, setShowReply] = useState(false)
  return (
    <div className="relative flex items-center space-x-2 space-y-5">
      <hr className="absolute top-10 h-16 border left-7 z-0" />
      <div className="z-50">
        <Avatar seed={comment.author.name} />
      </div>

      <div className="flex flex-col ">
        <p className="py-2 text-xs text-gray-400">
          <Link href={`/u/${comment.author.name}`}>
            <a className="font-semibold text-gray-600 underline hover:bg-slate-600 hover:text-white">
              {comment.author.name}
            </a>
          </Link>{" "}
          • {timeago.format(new Date(comment.createdAt))}
        </p>
        <p className="">{comment.content}</p>
        {showReply ? (
          <>
            <NewComment
              className={`${!showReply && "hidden"}`}
              comment={comment}
              post={post}
            />
            <button
              className="rounded-full bg-violet-800 p-2 text-white disabled:text-black disabled:font-semibold disabled:bg-gray-200"
              onClick={() => setShowReply(false)}
            >
              Cancel
            </button>
          </>
        ) : (
          <div className="flex space-x-4 text-gray">
            <div onClick={() => setShowReply(true)} className="postButtons">
              <ChatAltIcon className="h-4 w-4" />
              <p className="text-sm">Reply</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
