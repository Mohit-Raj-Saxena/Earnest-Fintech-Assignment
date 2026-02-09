"use client"
import { useEffect, useState } from "react"
import { api } from "../../lib/api"

export default function Dashboard() {
  const [tasks, setTasks] = useState<any[]>([])
  const [title, setTitle] = useState("")

  const load = async () => setTasks(await api("/tasks"))

  useEffect(() => {
    load()
  }, [])

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        <div style={styles.topBar}>
          <button
            style={styles.logoutBtn}
            onClick={() => {
              localStorage.removeItem("access")
              location.href = "/login"
            }}
          >
            Logout
          </button>
        </div>

        <h2 style={styles.heading}>My Tasks</h2>

        <div style={styles.addRow}>
          <input
            style={styles.input}
            placeholder="Enter a task..."
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <button
            style={styles.primaryBtn}
            onClick={async () => {
              if (!title.trim()) return
              await api("/tasks", {
                method: "POST",
                body: JSON.stringify({ title })
              })
              setTitle("")
              load()
            }}
          >
            Add
          </button>
        </div>

        {tasks.length === 0 && (
          <p style={styles.empty}>No tasks yet</p>
        )}

        {tasks.map(t => (
          <div key={t.id} style={styles.taskRow}>
            <span
              style={{
                ...styles.taskText,
                textDecoration: t.completed ? "line-through" : "none",
                color: t.completed ? "#888" : "#222"
              }}
            >
              {t.title}
            </span>

            <div style={styles.actions}>
              <button
                style={styles.secondaryBtn}
                onClick={async () => {
                  await api(`/tasks/${t.id}/toggle`, { method: "POST" })
                  load()
                }}
              >
                Toggle
              </button>

              <button
                style={styles.dangerBtn}
                onClick={async () => {
                  await api(`/tasks/${t.id}`, { method: "DELETE" })
                  load()
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const styles: any = {
  page: {
    minHeight: "100vh",
    background: "#f4f6f8",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
  width: "100%",
  maxWidth: 860,
  minHeight: 360,
  background: "#fff",
  padding: "56px 64px",
  borderRadius: 16,
  boxShadow: "0 24px 60px rgba(0,0,0,0.12)"
},
  topBar: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: 8
  },
  logoutBtn: {
    background: "transparent",
    border: "none",
    color: "#ef4444",
    cursor: "pointer",
    fontSize: 14
  },
  heading: {
    marginBottom: 24,
    textAlign: "center",
    fontSize: 28
  },
  addRow: {
    display: "flex",
    gap: 12,
    marginBottom: 28
  },
  input: {
    flex: 1,
    padding: "10px 12px",
    borderRadius: 6,
    border: "1px solid #ccc",
    outline: "none"
  },
  primaryBtn: {
    padding: "10px 16px",
    borderRadius: 6,
    border: "none",
    background: "#2563eb",
    color: "#fff",
    cursor: "pointer"
  },
  taskRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 0",
    borderBottom: "1px solid #eee"
  },
  taskText: {
    fontSize: 15
  },
  actions: {
    display: "flex",
    gap: 8
  },
  secondaryBtn: {
    padding: "6px 10px",
    borderRadius: 6,
    border: "1px solid #ccc",
    background: "#fff",
    cursor: "pointer"
  },
  dangerBtn: {
    padding: "6px 10px",
    borderRadius: 6,
    border: "none",
    background: "#ef4444",
    color: "#fff",
    cursor: "pointer"
  },
  empty: {
  textAlign: "center",
  color: "#777",
  marginTop: 40,
  fontSize: 16
 }
}