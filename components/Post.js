import React from "react"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BookmarkIcon,
  ChatAltIcon,
  DotsHorizontalIcon,
  GiftIcon,
  ShareIcon,
} from "@heroicons/react/outline"
import Avatar from "./Avatar"
import TimeAgo from "react-timeago"

function Post({ post }) {
  return (
    <div className="flex cursor-pointer rounded-md border border-gray-300 bg-white shadow-sm hover:border hover:border-gray-600 ">
      {/* Votes */}
      <div className="flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400 ">
        <ArrowUpIcon className="voteButtons hover:text-red-400" />
        <p className="text-black font-bold text-xs">0</p>
        <ArrowDownIcon className="voteButtons hover:text-blue-400" />
      </div>

      {/* Post template */}
      <div className="p-3 pb-1">
        {/* Header */}
        <div className="flex items-center space-x-2">
          <Avatar seed={post?.subredditName} />
          <p className="text-gray-400 text-xs">
            <span className="text-black font-bold hover:text-blue-400 hover:underline">
              r/{post?.subredditName}
            </span>{" "}
            • Posted by u/
            {post.author.name} <TimeAgo date={post.createdAt} />
          </p>
        </div>

        {/* Body */}
        <div className="py-4">
          <h2 className="text-xl font-semibold"> {post.title}</h2>
          <p className="mt-2 text-sm font-light">{post.content}</p>
        </div>
        {/* Image */}
        <img className="w-full" src={post.image} alt="" />

        {/* Footer */}
      </div>
    </div>
  )
}

export default Post
