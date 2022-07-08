import { ChevronUpIcon } from "@heroicons/react/outline"
import React from "react"

export default function SubredditRow({ index, topic }) {
  return (
    <div className="flex items-center space-x-2 border-t bg-white px-4 py-2 last:rounded-b">
      <p>{index + 1}</p>
      <ChevronUpIcon className="h-4 w-4 " />
    </div>
  )
}
