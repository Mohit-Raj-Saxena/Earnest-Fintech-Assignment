import { Router } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { prisma } from "../prisma"
import { signAccess, signRefresh } from "../utils/jwt"

const router = Router()

router.post("/register", async (req, res) => {
  const { email, password } = req.body
  const hash = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({ data: { email, password: hash } })
  res.json({ id: user.id, email: user.email })
})

router.post("/login", async (req, res) => {
  const { email, password } = req.body
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return res.sendStatus(401)
  const ok = await bcrypt.compare(password, user.password)
  if (!ok) return res.sendStatus(401)
  res.json({
    access: signAccess(user.id),
    refresh: signRefresh(user.id)
  })
})

router.post("/refresh", (req, res) => {
  const { refresh } = req.body
  try {
    const data = jwt.verify(refresh, process.env.JWT_REFRESH_SECRET!) as any
    res.json({ access: signAccess(data.id) })
  } catch {
    res.sendStatus(401)
  }
})

router.post("/logout", (_, res) => res.sendStatus(200))

export default router