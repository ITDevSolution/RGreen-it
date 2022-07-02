// this method get list all post
export const getPosts = async (prisma) => {
  const posts = await prisma.post.findMany({
    where: {},
    orderBy: {
      id: "desc",
    },
    include: {
      author: true,
    },
  })

  return posts
}

// this method get List post and Comments []
export const getPostsComment = async (prisma) => {
  const posts = await prisma.post.findMany({
    where: {},
    orderBy: [
      {
        id: "desc",
      },
    ],
    include: {
      author: true,
    },
  })

  await Promise.all(
    posts.map(
      async (post) => (post.comments = await getCommentsFromPost(post, prisma))
    )
  )
  return posts
}

const getCommentsFromPost = async (post, prisma) => {
  const comments = await prisma.comment.findMany({
    where: {
      postId: post.id,
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
    include: {
      post: true,
    },
  })
  return comments
}

// get Subreddit
export const getSubreddit = async (name, prisma) => {
  return await prisma.subreddit.findUnique({
    where: {
      name,
    },
  })
}

export const getPostsFromSubreddit = async (subreddit, prisma) => {
  const posts = await prisma.post.findMany({
    where: {
      subreddit: {
        name: subreddit,
      },
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
    include: {
      author: true,
    },
  })

  await Promise.all(
    posts.map(
      async (post) => (post.comments = await getCommentsFromPost(post, prisma))
    )
  )

  return posts
}
