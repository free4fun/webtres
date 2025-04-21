import { Event } from "./types"
import { authFetch } from "@/lib/authFetch"

export const getEvents = async (): Promise<Event[]> => {
  try {
    const res = await authFetch(`http://localhost:3001/api/events`)
    if (!res.ok) {
      console.error("Error al obtener eventos:", await res.text())
      return []
    }
    const data = await res.json()
    return data as Event[]
  } catch (error) {
    console.error("Error al obtener eventos:", error)
    return []
  }
}
