import { useSession } from "next-auth/react"
import { useState } from "react"
import Avatar from "./Avatar"
import { LinkIcon, PhotographIcon } from "@heroicons/react/outline"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useRouter } from "next/router"

function PostBox({ subreddits, subreddit }) {
  const [select, setSelect] = useState(subreddits)
  const router = useRouter()
  const { data: session } = useSession()
  const [imageBoxOpen, setImageBoxOpen] = useState(false)
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = handleSubmit(async (formData) => {
    console.log(formData)
    const notification = toast.loading("Creating new post...")
    const subredditExists = select?.length > 0
    console.log(subredditExists)

    if (!subredditExists) {
      //create subreddit...
      // console.log("Subreddit is new! -> creastinga New subreddit")
      // const newSubreddit = await fetch("/api/subreddit", {
      //   body: JSON.stringify({
      //     name: formData.name,
      //   }),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   method: "POST",
      // })

      console.log("Creating post...", formData)

      const image = formData.postImage || ""

      const newPost = await fetch("/api/post", {
        body: JSON.stringify({
          title: formData.postTitle,
          content: formData.postBody,
          image: image,
          subredditName: subreddit.name,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      })
      console.log("New post add", newPost)
    } else {
      //use existing subreddit...
      console.log("Using existing subreddit!")
      console.log(subreddits)

      const image = formData.postImage || ""

      const newPost = await fetch("/api/post", {
        body: JSON.stringify({
          title: formData.postTitle,
          content: formData.postBody,
          image: image,
          subredditName: formData.subreddit || subreddit.name,
        }),
        headers: {
          "Content-type": "application/json",
        },
        method: "POST",
      })
      console.log("New post added:", newPost)
    }
    // After the post has been added!
    setValue("postBody", "")
    setValue("postImage", "")
    setValue("postTitle", "")
    setValue("subreddit", "")

    toast.success("New post Created!", {
      id: notification,
    })
    router.push(`/r/${formData.subreddit || subreddit.name}`)

    try {
      // const subredditExists = select.length > 0
      // console.log(subredditExists)
      // if (!subredditExists) {
      //   //create subreddit...
      //   console.log("Subreddit is new! -> creastinga New subreddit")
      //   const newSubreddit = await fetch("/api/subreddit", {
      //     body: JSON.stringify({
      //       name: formData.name,
      //     }),
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     method: "POST",
      //   })
      //   console.log("Creating post...", formData)
      //   const image = formData.postImage || ""
      //   const newPost = await fetch("/api/post", {
      //     body: JSON.stringify({
      //       title: formData.title,
      //       content: formData.postBody,
      //       image: image,
      //       subreddit_name: newSubreddit.name || subreddit.name,
      //     }),
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     method: "POST",
      //   })
      //   console.log("New post add", newPost)
      // } else {
      //   //use existing subreddit...
      //   console.log("Using existing subreddit!")
      //   console.log(subreddits)
      //   const image = formData.postImage || ""
      //   const newPost = await fetch("/api/post", {
      //     body: JSON.stringify({
      //       title: formData.postTitle,
      //       content: formData.postBody,
      //       image: image,
      //       subredditName: formData.subreddit || subreddit.name,
      //     }),
      //     headers: {
      //       "Content-type": "application/json",
      //     },
      //     method: "POST",
      //   })
      //   console.log("New post added:", newPost)
      // }
      // // After the post has been added!
      // setValue("postBody", "")
      // setValue("postImage", "")
      // setValue("postTitle", "")
      // setValue("subreddit", "")
      // toast.success("New post Created!", {
      //   id: notification,
      // })
      // router.push(`/r/${formData.subreddit}`)
    } catch (error) {
      // toast.error("Whoops something went wrong!", {
      //   id: notification,
      // })
    }
  })

  return (
    <form
      onSubmit={onSubmit}
      className="z-50 rounded-md border border-gray-300 bg-white p-2"
    >
      <div className="flex items-center space-x-3">
        {/* Avatar */}
        <Avatar />
        {/* Input text */}
        <input
          {...register("postTitle", { required: true })}
          disabled={!session}
          className="flex-1 rounded-md bg-gray-50 p-2 outline-none"
          type="text"
          placeholder={
            session
              ? subreddit
                ? `Create a post in r/${subreddit.name}`
                : "Create a post by entering a title!"
              : "Sign in to post"
          }
        />

        {/* Icons Input text */}
        <PhotographIcon
          onClick={() => setImageBoxOpen(!imageBoxOpen)}
          className={`h-6 text-gray-300 cursor-pointer ${
            imageBoxOpen && "text-blue-300"
          }`}
        />
        <LinkIcon className="h-6 text-gray-300" />
      </div>
      {!!watch("postTitle") && (
        <div className="flex flex-col py-2">
          {/* Body */}
          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Body:</p>
            <input
              className="m-2 flex-1 bg-blue-50 p-2 outline-none"
              {...register("postBody")}
              type="text"
              placeholder="Text (optional)"
            />
          </div>

          {/* Subrredit */}
          {!subreddit && (
            <div className="flex items-center px-2">
              <p className="min-w-[90px]">Subreddit:</p>
              {/* <input
                className="m-2 flex-1 bg-blue-50 p-2 outline-none"
                {...register("subreddit", { required: true })}
                type="text"
                placeholder="i.e. nextjs"
              /> */}
              <select
                className="m-2 flex-1 bg-blue-50 p-2 outline-none"
                {...register("subreddit", { required: true })}
                onChange={(e) => setSelect(e.target.value)}
              >
                {subreddits.map((subreddit) => (
                  <option key={subreddit.name} value={subreddit.name}>
                    {subreddit.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Image URL */}
          {imageBoxOpen && (
            <div className="flex items-center px-2">
              <p className="min-w-[90px]">Image URL:</p>
              <input
                className="m-2 flex-1 bg-blue-50 p-2 outline-none"
                {...register("postImage")}
                type="text"
                placeholder="optional..."
              />
            </div>
          )}

          {/* Erros */}
          {Object.keys(errors).length > 0 && (
            <div className="space-y-2 p-2 text-red-500 ">
              {errors.postTitle?.type === "required" && (
                <p>A post title is required</p>
              )}
              {errors.subreddit?.type === "required" && (
                <p>A Subreddit is required</p>
              )}
            </div>
          )}

          {!!watch("postTitle") && (
            <button
              type="submit"
              className="w-full rounded-full bg-blue-400 p-2 text-white"
            >
              Create Post
            </button>
          )}
        </div>
      )}
    </form>
  )
}

export default PostBox
