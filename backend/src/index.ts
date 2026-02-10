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
      "https://earnest-fintech-assignment.vercel.app"
    ],
    credentials: true
  })
)
app.use(express.json())

app.use("/auth", authRoutes)
app.use("/tasks", taskRoutes)

app.listen(4000)