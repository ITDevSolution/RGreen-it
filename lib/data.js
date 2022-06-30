// this's method get list all post
export const getPosts = async (prisma) => {
  const post = await prisma.post.findMany({
    where: {},
    orderBy: {
      id: "desc",
    },
    include: {
      author: true,
    },
  })
  return post
}
