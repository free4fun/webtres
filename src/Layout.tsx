import { Outlet } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import { Footer } from "./components/Footer"

/**
 * Layout.tsx
 * Main layout wrapper with sticky footer.
 */
const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen w-full bg-background text-foreground transition-colors">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
