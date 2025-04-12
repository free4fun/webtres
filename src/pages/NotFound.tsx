import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

/**
 * NotFound.tsx
 * 404 page for unmatched routes in webtres.uy
 */
const NotFound = () => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-background text-foreground">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-lg text-muted-foreground mt-4">{t("notfound.message")}</p>
      <Link to="/" className="mt-6">
        <Button>{t("notfound.backHome")}</Button>
      </Link>
    </div>
  )
}

export default NotFound
