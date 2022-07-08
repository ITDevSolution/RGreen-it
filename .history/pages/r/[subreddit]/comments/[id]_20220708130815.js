import prisma from "lib/prisma"
import { getPost, getSubreddit, getVote, getVotes } from "lib/data"

import {
  ArrowDownIcon,
  ArrowUpIcon,
  BookmarkIcon,
  ChatAltIcon,
  DotsHorizontalIcon,
  GiftIcon,
  ShareIcon,
} from "@heroicons/react/outline"
import Avatar from "components/Avatar"
import timeago from "lib/timeago"

import Link from "next/link"
// import Post from "components/Post"
import NewComment from "components/NewComment"
import Comments from "components/Comments"

import { useSession, getSession } from "next-auth/react"
import toast, { Toaster } from "react-hot-toast"
import { useRouter } from "next/router"
import { Jelly } from "@uiball/loaders"

export default function SinglePost({ subreddit, post, votes, vote }) {
  const { data: session } = useSession()
  const router = useRouter()

  const upVote = async (isUpvote) => {
    if (!session) {
      alert("! You'll need to sign in to Vote! ")
    }

    await fetch("/api/vote", {
      body: JSON.stringify({
        post: post.id,
        up: isUpvote,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
    router.reload(window.location.pathname)
  }

  if (!post)
    return (
      <div className="flex w-full items-center justify-center p-10 text-xl">
        <Jelly size={50} color="#FF4501" />
      </div>
    )
  if (!post) return <p className="text-center p-5">Post does not exist 😟 </p>

  return (
    <div className="max-w-3xl mx-auto mt-4">
      <div className="flex cursor-pointer rounded-md border border-gray-300 bg-white shadow-sm hover:border hover:border-gray-600 ">
        {/* Votes */}
        <div className="flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400 ">
          <ArrowUpIcon
            onClick={() => upVote(true)}
            className={`voteButtons hover:text-red-400 ${
              vote?.up && "text-red-400"
            }`}
          />
          <p className="text-black font-bold text-xs">{votes}</p>
          <ArrowDownIcon
            onClick={() => upVote(false)}
            className={`voteButtons hover:text-blue-400 ${
              vote?.up === false && "text-blue-400"
            }`}
          />
        </div>
        {/* <Toaster /> */}

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
              </Link>
              {timeago.format(new Date(post.createdAt))}
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
              <p className="">{0} Comments</p>
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
      <NewComment post={post} />

      {/* List comments */}
      {/* <Comments comments={post.comments} /> */}
      <div className="-my-5 rounded-b-md border-t-0 border-gray-300 bg-white py-5 px-10">
        <hr className="py-2" />
        <Comments comments={post.comments} post={post} />
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  const subreddit = await getSubreddit(context.params.subreddit, prisma)

  let post = await getPost(parseInt(context.params.id), prisma)
  post = JSON.parse(JSON.stringify(post))

  // all votes
  let votes = await getVotes(parseInt(context.params.id), prisma)
  votes = JSON.parse(JSON.stringify(votes))

  let vote = await getVote(
    parseInt(context.params.id),
    session?.user.id,
    prisma
  )
  vote = JSON.parse(JSON.stringify(vote))

  return {
    props: {
      subreddit,
      post,
      votes,
      vote,
    },
  }
}
