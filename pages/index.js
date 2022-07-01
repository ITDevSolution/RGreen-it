// componets
import Feed from "components/Feed"
import PostBox from "components/PostBox"
import Head from "next/head"

// lib and  prismaclient
import { getPostsComment } from "lib/data"
import prisma from "lib/prisma"

export default function Home({ postsComment }) {
  return (
    <div className="max-w-5xl my-7 lg:mx-auto sm:mx-4">
      <Head>
        <title>Rgreenit </title>
      </Head>
      <PostBox />
      <div className="flex">
        <Feed postsComment={postsComment} />
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  let postsComment = await getPostsComment(prisma)
  postsComment = JSON.parse(JSON.stringify(postsComment))

  return {
    props: {
      postsComment,
    },
  }
}
