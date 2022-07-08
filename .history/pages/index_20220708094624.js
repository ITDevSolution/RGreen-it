// componets
import Feed from "components/Feed"
import PostBox from "components/PostBox"
import Head from "next/head"

// lib and  prismaclient
import {
  getListSubreddit,
  getPostsComment,
  getSubredditListLimit,
} from "lib/data"
import prisma from "lib/prisma"

export default function Home({ posts, subreddits }) {
  return (
    <div className="max-w-5xl my-7 lg:mx-auto sm:mx-4">
      <Head>
        <title>Rgreenit </title>
      </Head>
      <PostBox subreddits={subreddits} />
      <div className="flex">
        <Feed posts={posts} />

        <div className="sticky top-36 mx-5 mt-5 hidden h-fit min-w-[300px] rounded-md border border-gray bg-white lg:inline ">
          <p className="text-md mb-1 p-4 pb-3 font-bold">Top Communities</p>
          <div>{/* List subreddits */}</div>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  let posts = await getPostsComment(prisma)
  posts = JSON.parse(JSON.stringify(posts))

  let subreddits = await getListSubreddit(prisma)
  subreddits = JSON.parse(JSON.stringify(subreddits))

  let top10subreddit = await getSubredditListLimit(prisma)
  top10subreddit = JSON.parse(JSON.stringify(top10subreddit))

  return {
    props: {
      posts,
      subreddits,
      top10subreddit,
    },
  }
}
