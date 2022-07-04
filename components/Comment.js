import Avatar from "./Avatar"

import timeago from "lib/timeago"

export default function Comment({ comment }) {
  return (
    <div className="relative flex items-center space-x-2 space-y-5">
      <hr className="absolute top-10 h-16 border left-7 z-0" />
      <div className="z-50">
        <Avatar seed={comment.author.name} />
      </div>

      <div className="flex flex-col">
        <p className="py-2 text-xs text-gray-400">
          <span className="font-semibold text-gray-600">
            {comment.author.name}
          </span>{" "}
          • {timeago.format(new Date(comment.createdAt))}
        </p>
        <p>{comment.content}</p>
      </div>
    </div>
  )
}
