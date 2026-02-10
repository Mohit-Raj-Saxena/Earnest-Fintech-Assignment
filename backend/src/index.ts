import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./auth/auth.routes"
import taskRoutes from "./tasks/task.routes"

dotenv.config()

const app = express()

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://earnest-fintech-assignment.netlify.app"
    ],
    credentials: true
  })
)

app.use(express.json())

// health + root routes (IMPORTANT)
app.get("/", (_req, res) => {
  res.send("Backend is running")
})

app.get("/healthz", (_req, res) => {
  res.send("OK")
})

app.use("/auth", authRoutes)
app.use("/tasks", taskRoutes)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})