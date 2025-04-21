import { useEffect, useState } from "react"

export const MotionSafe = ({ children }: { children: React.ReactNode }) => {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setReady(true), 150) // Delay mínimo
    return () => clearTimeout(timeout)
  }, [])

  return <>{ready ? children : null}</>
}
 