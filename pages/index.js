// componets
import Feed from "components/Feed"
import PostBox from "components/PostBox"
import Head from "next/head"

// lib and  prismaclient
import { getListSubreddit, getPostsComment } from "lib/data"
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
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  let posts = await getPostsComment(prisma)
  posts = JSON.parse(JSON.stringify(posts))

  let subreddits = await getListSubreddit(prisma)
  subreddits = JSON.parse(JSON.stringify(subreddits))

  return {
    props: {
      posts,
      subreddits,
    },
  }
}
