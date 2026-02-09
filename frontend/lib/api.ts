const BASE = process.env.NEXT_PUBLIC_API_URL as string

export const api = async (url: string, options: any = {}) => {
  const token = localStorage.getItem("access")
  const res = await fetch(BASE + url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? "Bearer " + token : ""
    }
  })
  return res.json()
}