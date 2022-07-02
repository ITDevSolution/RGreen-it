import React from "react"
import Post from "./Post"

function Feed({ posts }) {
  if (!posts) return null

  return (
    <div className="mt-5 space-y-4">
      {posts?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  )
}

export default Feed
