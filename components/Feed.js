import React from "react"
import Post from "./Post"

function Feed({ postsComment }) {
  if (!postsComment) return null

  return (
    <div className="mt-5 space-y-4">
      {postsComment?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  )
}

export default Feed
