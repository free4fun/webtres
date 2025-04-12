import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { Github, Twitter, Mail } from "lucide-react"

/**
 * Footer.tsx
 * Site-wide footer for webtres.uy
 */
export const Footer = () => {
  const { t } = useTranslation()

  return (
    <footer className="w-full border-t border-border bg-muted/50 py-10 text-muted-foreground text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Text + Links */}
        <div className="text-center md:text-left space-y-2">
          <p>© {new Date().getFullYear()} webtres.uy</p>
          <div className="flex justify-center md:justify-start gap-4">
            <Link to="/">{t("footer.home")}</Link>
            <Link to="/events">{t("footer.events")}</Link>
            <Link to="/blog">{t("footer.blog")}</Link>
            <Link to="/contact">{t("footer.contact")}</Link>
          </div>
        </div>

        {/* Socials */}
        <div className="flex gap-4">
          <a href="https://github.com/webtresuy" target="_blank" rel="noreferrer">
            <Github className="w-5 h-5 hover:text-foreground" />
          </a>
          <a href="https://twitter.com/webtresuy" target="_blank" rel="noreferrer">
            <Twitter className="w-5 h-5 hover:text-foreground" />
          </a>
          <a href="mailto:contacto@webtres.uy">
            <Mail className="w-5 h-5 hover:text-foreground" />
          </a>
        </div>
      </div>
    </footer>
  )
}
