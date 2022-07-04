import React, { Suspense } from "react"
import Comment from "./Comment"

export default function Comments({ comments }) {
  if (!comments) return null

  return (
    <>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </>
  )
}
