import { createContext, useContext, useEffect, useState } from 'react'

interface AuthContextType {
  authenticated: boolean
  login: (token: string) => void
  logout: () => void
  validateToken: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authenticated, setAuthenticated] = useState(false)
  const API = import.meta.env.VITE_API_URL

  const validateToken = async () => {
    const token = localStorage.getItem("jwt")
    if (!token) {
      setAuthenticated(false)
      return
    }

    try {
      const res = await fetch(`${API}/api/auth/validate`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (res.ok) {
        setAuthenticated(true)
      } else {
        setAuthenticated(false)
        localStorage.removeItem("jwt")
      }
    } catch {
      setAuthenticated(false)
      localStorage.removeItem("jwt")
    }
  }

  const login = (token: string) => {
    localStorage.setItem("jwt", token)
    setAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem("jwt")
    setAuthenticated(false)
  }

  useEffect(() => {
    validateToken()
  }, [])

  return (
    <AuthContext.Provider value={{ authenticated, login, logout, validateToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within AuthProvider")
  return context
}
