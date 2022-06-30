import prisma from "lib/prisma"
import { faker } from "@faker-js/faker"

export default async function handler(req, res) {
  if (req.method !== "POST") return res.end()

  if (req.body.task === "generate_users") {
    let count = 0

    while (count < 10) {
      await prisma.user.create({
        data: {
          name: faker.internet.userName().toLowerCase(),
          email: faker.internet.email().toLowerCase(),
        },
      })
      count++
    }
  }

  if (req.body.task === "generate_subreddits") {
    let count = 0

    while (count < 10) {
      await prisma.subreddit.create({
        data: {
          name: faker.word.noun().toLowerCase(),
          description: faker.lorem.paragraph(1).toLowerCase(),
        },
      })
      count++
    }
  }

  if (req.body.task === "add_fake_content") {
    //find the list users
    const users = await prisma.user.findMany()

    //GET RANDOM USERS
    const getRandomUser = () => {
      const randomIndex = Math.floor(Math.random() * users.length)
      return users[randomIndex]
    }

    //Create post
    const createPostFromRandomUser = async (subreddit) => {
      // we assign getRandomUser to a constant
      const user = getRandomUser()

      //return function createPostFromRandomUser with create POST
      return await prisma.post.create({
        data: {
          title:
            faker.hacker.adjective() +
            " " +
            faker.hacker.verb() +
            " " +
            faker.hacker.noun(),
          content: faker.hacker.phrase(),
          image: faker.image.image(640, 480, true),
          subreddit: {
            connect: {
              name: subreddit.name,
            },
          },
          author: {
            connect: { id: user.id },
          },
        },
      })
    }

    //Create comments to post
    const createCommentstoPost = async (post) => {
      let count = 0
      const commentsNumber = Math.floor(Math.random() * 5)

      while (count < commentsNumber) {
        const user = getRandomUser()

        await prisma.comment.create({
          data: {
            content: faker.hacker.phrase(),
            post: {
              connect: { id: post.id },
            },
            author: {
              connect: { id: user.id },
            },
          },
        })
        count++
      }
    }

    //find the list subreddits
    const subreddits = await prisma.subreddit.findMany()

    //for each subreddit we’re going to add a post:
    subreddits.forEach(async (subreddit) => {
      const post = await createPostFromRandomUser(subreddit)
      await createCommentstoPost(post)
    })
  }

  if (req.body.task === "clean_database") {
    await prisma.comment.deleteMany({})
    await prisma.post.deleteMany({})
    await prisma.subreddit.deleteMany({})
    await prisma.user.deleteMany({})
  }

  res.end()
}
