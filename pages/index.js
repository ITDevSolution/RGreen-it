// componets
import Feed from "components/Feed"
import PostBox from "components/PostBox"
import Head from "next/head"
import Image from "next/image"
// lib and  prismaclient
import { getPosts } from "lib/data"
import prisma from "lib/prisma"

export default function Home({ posts }) {
  console.log(posts)
  return (
    <div className="max-w-5xl my-7 lg:mx-auto sm:mx-4">
      <Head>
        <title>Rgreenit </title>
      </Head>
      <PostBox />
      <div className="flex">
        <Feed posts={posts} />
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  let posts = await getPosts(prisma)
  posts = JSON.parse(JSON.stringify(posts))

  return {
    props: {
      posts,
    },
  }
}
