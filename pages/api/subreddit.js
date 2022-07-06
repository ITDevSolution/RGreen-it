import prisma from "lib/prisma"
import { getSession } from "next-auth/react"

export default async function handler(req, res) {
  if (req.method !== "POST" || req.method !== "GET") {
    return res.status(501).end()
  }

  const session = getSession({ req })

  if (!session) return res.status(401).json({ message: "Not logged in" })

  if (req.method === "POST") {
    const subreddit = await prisma.subreddit.create({
      data: {
        name: req.body.name,
      },
    })
    res.json(subreddit)
    return
  }
}
