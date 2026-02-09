"use client"
import { ui } from "../../lib/styles"

export default function Login() {
  const submit = async (e: any) => {
    e.preventDefault()
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value
      })
    }).then(r => r.json())

    localStorage.setItem("access", res.access)
    location.href = "/dashboard"
  }

  return (
    <form onSubmit={submit} style={ui.card}>
      <h2 style={ui.heading}>Login</h2>
      <input name="email" placeholder="Email" style={ui.input} />
      <input name="password" type="password" placeholder="Password" style={ui.input} />
      <button style={ui.button}>Login</button>
      <div style={ui.link}>
        New here? <a href="/register">Create account</a>
      </div>
    </form>
  )
}