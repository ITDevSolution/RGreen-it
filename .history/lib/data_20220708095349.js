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

// get Unique Subreddit from name
export const getSubreddit = async (name, prisma) => {
  return await prisma.subreddit.findUnique({
    where: {
      name,
    },
  })
}

// get List subreddit
export const getListSubreddit = async (prisma) => {
  const subreddits = await prisma.subreddit.findMany({
    where: {},
  })
  return subreddits
}

// get unique Post
export const getPost = async (id, prisma) => {
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      author: true,
      comments: {
        where: {
          parentId: null,
        },
        orderBy: [
          {
            id: "desc",
          },
        ],
        include: {
          author: true,
        },
      },
    },
  })

  if (post.comments) {
    post.comments = await fetchCommentsOfComments(post.comments, prisma)
  }

  return post
}

const fetchCommentsOfComments = async (comments, prisma) => {
  const fetchCommentsOfComment = async (comment, prisma) => {
    comment.comments = await getComments(comment.id, prisma)
    return comment
  }

  return Promise.all(
    comments.map((comment) => {
      comment = fetchCommentsOfComment(comment, prisma)
      return comment
    })
  )
}

const getComments = async (parent_id, prisma) => {
  let comments = await prisma.comment.findMany({
    where: {
      parentId: parent_id,
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

  if (comments.length) {
    comments = await fetchCommentsOfComments(comments, prisma)
  }

  return comments
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

// get List Poft from Subreddit
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

// get count Votes
export const getVotes = async (post, prisma) => {
  const upvotes = await prisma.vote.count({
    where: {
      postId: post,
      up: true,
    },
  })
  const downvotes = await prisma.vote.count({
    where: {
      postId: post,
      up: false,
    },
  })
  return upvotes - downvotes
}

// Get List Vote
export const getVote = async (post_id, user_id, prisma) => {
  const vote = await prisma.vote.findMany({
    where: {
      postId: post_id,
      authorId: user_id,
    },
  })
  if (vote.length === 0) return null
  return vote[0]
}

export const getUser = async (name, prisma) => {
  const user = await prisma.user.findUnique({
    where: {
      name,
    },
  })

  return user
}

export const getPostsFromUser = async (user_name, prisma) => {
  const posts = await prisma.post.findMany({
    where: {
      author: {
        name: user_name,
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

  return posts
}

export const getSubredditListLimit = async (prisma) => {
  const top10subreddit = await prisma.subreddit.findMany({
    where: {},
    orderBy: [
      {
        name: "desc",
      },
    ],
    take: 10,
  })
  return top10subreddit
}
