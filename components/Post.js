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

import Link from "next/link"
import { Jelly } from "@uiball/loaders"

export default function Post({ post }) {
  if (!post)
    return (
      <div className="flex w-full items-center justify-center p-10 text-xl">
        <Jelly size={50} color="#FF4501" />
      </div>
    )

  return (
    <Link href={`/r/${post.subredditName}/comments/${post.id}`}>
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
              <Link href={`/r/${post?.subredditName}`}>
                <a className="text-black font-bold hover:text-blue-400 hover:underline">
                  r/{post?.subredditName}
                </a>
              </Link>{" "}
              • Posted by u/
              <Link href={`/u/${post.author.name}`}>
                <a className="font-semibold text-gray-600 underline hover:bg-slate-600 hover:text-white">
                  {post.author.name}
                </a>
              </Link>{" "}
              <TimeAgo date={post.createdAt} />
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
          <div className="flex space-x-4 text-gray-400 pt-1">
            <div className="postButtons">
              <ChatAltIcon className="h-6 w-6" />
              <p className="">{post?.comments?.length} Comments</p>
            </div>
            <div className="postButtons">
              <GiftIcon className="h-6 w-6" />
              <p className="hidden sm:inline">Award</p>
            </div>
            <div className="postButtons">
              <ShareIcon className="h-6 w-6" />
              <p className="hidden sm:inline">Share</p>
            </div>
            <div className="postButtons">
              <BookmarkIcon className="h-6 w-6" />
              <p className="hidden sm:inline">Save</p>
            </div>
            <div className="postButtons">
              <DotsHorizontalIcon className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
