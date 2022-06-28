import React from "react"

export default function Utils() {
  const tasks = [
    { task: "generate_users", description: "Generate random users" },
    { task: "generate_subreddits", description: "Generate random subreddits" },
    { task: "add_fake_content", description: "Add fake content" },
    { task: "clean_database", description: "Clean the database" },
  ]

  const Button = ({ task }) => (
    <div className="flex-1 mb-5">
      <button
        onClick={async () => {
          await fetch("/api/utils", {
            body: JSON.stringify({
              task: task.task,
            }),
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
          })
        }}
        className="border px-8 py-2 mt-5 mr-8 font-bold rouned-full bg-gray-900 text-white"
      >
        {task.description}
      </button>
    </div>
  )
  return (
    <div className="mt-10  ml-20">
      <h2 className="mb-10 text-xl">Utils</h2>
      {tasks.map((task, index) => (
        <Button key={index} task={task} />
      ))}
    </div>
  )
}
