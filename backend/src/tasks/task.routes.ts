import { Router } from "express"
import { prisma } from "../prisma"
import { auth } from "../middleware/auth"

const router = Router()
router.use(auth)

router.get("/", async (req, res) => {
  const { page = "1", q = "", status } = req.query as any
  const tasks = await prisma.task.findMany({
    where: {
      userId: (req as any).userId,
      title: { contains: q },
      ...(status !== undefined ? { completed: status === "true" } : {})
    },
    skip: (+page - 1) * 10,
    take: 10
  })
  res.json(tasks)
})

router.post("/", async (req, res) => {
  const task = await prisma.task.create({
    data: { title: req.body.title, userId: (req as any).userId }
  })
  res.json(task)
})

router.patch("/:id", async (req, res) => {
  const task = await prisma.task.update({
    where: { id: +req.params.id },
    data: req.body
  })
  res.json(task)
})

router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id)
  const userId = (req as any).userId

  const task = await prisma.task.findFirst({
    where: { id, userId }
  })

  if (!task) return res.sendStatus(404)

  await prisma.task.delete({ where: { id } })
  res.json({ success: true })
})

router.post("/:id/toggle", async (req, res) => {
  const id = Number(req.params.id)
  const userId = (req as any).userId

  const task = await prisma.task.findFirst({
    where: { id, userId }
  })

  if (!task) return res.sendStatus(404)

  const updated = await prisma.task.update({
    where: { id },
    data: { completed: !task.completed }
  })

  res.json(updated)
})

export default router