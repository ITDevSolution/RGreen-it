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
        <div></div>

        {/* Body */}

        {/* Image */}

        {/* Footer */}
      </div>
    </div>
  )
}

export default Post
