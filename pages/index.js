import Header from "components/Header"
import PostBox from "components/PostBox"
import Head from "next/head"
import Image from "next/image"

export default function Home() {
  return (
    <div className="max-w-5xl my-7 lg:mx-auto sm:mx-4">
      <Head>
        <title>Rgreenit </title>
      </Head>
      <PostBox />
    </div>
  )
}
