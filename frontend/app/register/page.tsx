"use client"
import { ui } from "../../lib/styles"

export default function Register() {
  const submit = async (e: any) => {
    e.preventDefault()
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value
      })
    })
    location.href = "/login"
  }

  return (
    <form onSubmit={submit} style={ui.card}>
      <h2 style={ui.heading}>Create Account</h2>
      <input name="email" placeholder="Email" style={ui.input} />
      <input name="password" type="password" placeholder="Password" style={ui.input} />
      <button style={ui.button}>Register</button>
      <div style={ui.link}>
        Already have an account? <a href="/login">Login</a>
      </div>
    </form>
  )
}