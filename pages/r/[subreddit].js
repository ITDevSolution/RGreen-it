import prisma from "lib/prisma"
import { getSubreddit, getPostsFromSubreddit } from "lib/data"

import Feed from "components/Feed"
import Avatar from "components/Avatar"

import Link from "next/link"
import PostBox from "components/PostBox"

export default function Subreddit({ subreddit, posts }) {
  console.log("####refreshing")

  return (
    <div className={`h-24 bg-cyan-400 p-8`}>
      {/* Header page subreddit */}
      <div className="-mx-8 mt-10 bg-white">
        <div className="mx-auto flex max-w-5xl items-center space-x-4 pb-3">
          <div className="-mt-5">
            <Avatar seed={subreddit.name} large />
          </div>
          <div className="py-2">
            <h1 className="text-3xl font-semibold">
              Welcome to the r/{subreddit.name} subreddit
            </h1>
            <p className="text-sm text-gray-400">r{subreddit.name}</p>
            <p className="text-xl font-bold">Subreddit Description:</p>
            <p className="text-gray-500">{subreddit.description}</p>
          </div>
        </div>
      </div>
      {/* Body page subreddit */}
      <div className="lg:mx-auto max-w-5xl lg:max-w-3xl mt-5 pb-10">
        <PostBox subreddit={subreddit} />
        <Feed posts={posts} />
      </div>
    </div>
  )
}

export async function getServerSideProps({ params }) {
  const subreddit = await getSubreddit(params.subreddit, prisma)

  let posts = await getPostsFromSubreddit(params.subreddit, prisma)

  posts = JSON.parse(JSON.stringify(posts))

  return {
    props: {
      subreddit,
      posts,
    },
  }
}
