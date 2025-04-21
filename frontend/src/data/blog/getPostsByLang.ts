import { BlogPost } from "./types"

export const getPostsByLang = async (lang: string, token?: string): Promise<BlogPost[]> => {
  const baseUrl = import.meta.env.VITE_API_URL
  const headers: HeadersInit = {
    "Content-Type": "application/json"
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  try {
    const res = await fetch(`${baseUrl}/api/blog/${lang}`, { headers })
    const data = await res.json()
    return Array.isArray(data) ? data : []


    if (!res.ok) {
      console.error("Error al obtener posts:", res.statusText)
      return []
    }

    return await res.json()
  } catch (err) {
    console.error("Error de red al obtener posts:", err)
    return []
  }
}

