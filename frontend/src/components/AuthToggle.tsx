import { useAuth } from "@/context/authContext"
import { MdLogout, MdLogin } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import { Button } from "./ui/button"


export const AuthToggle = () => {
  const { authenticated, logout } = useAuth()
  const navigate = useNavigate()

  const handleClick = () => {
    if (authenticated) {
      logout()
    } else {
      navigate("/admin")
    }
  }

  return (
    <Button size="icon" variant="ghost" onClick={handleClick}>
      {authenticated ? <MdLogout className="h-5 w-5" /> : <MdLogin className="h-5 w-5" />}
      <span className="sr-only">{authenticated ? "Logout" : "Login"}</span>
    </Button>
  )
}