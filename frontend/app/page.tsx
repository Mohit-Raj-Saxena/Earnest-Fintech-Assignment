"use client"

export default function Home() {
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Task Manager</h1>
        <p style={styles.subtitle}>
          Simple, secure task management for your daily work
        </p>

        <div style={styles.actions}>
          <a href="/login" style={styles.primaryBtn}>Login</a>
          <a href="/register" style={styles.secondaryBtn}>Register</a>
        </div>
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
    background: "#fff",
    padding: "48px 40px",
    borderRadius: 12,
    textAlign: "center",
    boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
    maxWidth: 420,
    width: "100%"
  },
  title: {
    marginBottom: 12,
    fontSize: 32
  },
  subtitle: {
    marginBottom: 32,
    color: "#555"
  },
  actions: {
    display: "flex",
    gap: 16,
    justifyContent: "center"
  },
  primaryBtn: {
    padding: "12px 24px",
    background: "#2563eb",
    color: "#fff",
    borderRadius: 8,
    textDecoration: "none"
  },
  secondaryBtn: {
    padding: "12px 24px",
    border: "1px solid #2563eb",
    color: "#2563eb",
    borderRadius: 8,
    textDecoration: "none"
  }
}