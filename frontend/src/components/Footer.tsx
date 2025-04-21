import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { SiTelegram, SiInstagram, SiX, SiLinkedin, SiYoutube, SiGithub } from "react-icons/si";

export const Footer = () => {
  const { t } = useTranslation()

  return (
    <footer className="sticky bottom-0 z-50 backdrop-blur-md bg-background/80 w-full border-t border-border py-10 text-muted-foreground text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left space-y-2">
          <div className="flex justify-center md:justify-start gap-4">
            <Link className="text-sm font-medium hover:text-primary transition-colors" to="/blog">{t("footer.blog")}</Link>
            <Link className="text-sm font-medium hover:text-primary transition-colors" to="/faq">{t("footer.faq")}</Link>
            <Link className="text-sm font-medium hover:text-primary transition-colors" to="/newsletter">{t("footer.newsletter")}</Link>
            <Link className="text-sm font-medium hover:text-primary transition-colors" to="/contact">{t("footer.contact")}</Link>
          </div>
          <p>© {new Date().getFullYear()} webtres</p>
        </div>
        <div className="flex gap-4">
          <Link to="https://t.me/webtres_uy" target="_blank"><SiTelegram className="text-foreground w-5 h-5 hover:text-primary" /></Link>
          <Link to="https://www.instagram.com/webtres.uy/" target="_blank"><SiInstagram className="text-foreground w-5 h-5 hover:text-primary" /></Link>
          <Link to="https://x.com/webtres_uy" target="_blank"><SiX className="text-foreground w-5 h-5 hover:text-primary" /></Link>
          <Link to="https://linkedin.com/company/webtres-uy" target="_blank"><SiLinkedin className="text-foreground w-5 h-5 hover:text-primary" /></Link>
          <Link to="https://www.youtube.com/@webtres-uy" target="_blank"><SiYoutube className="text-foreground w-5 h-5 hover:text-primary" /></Link>
          <Link to="https://github.com/webtres" target="_blank"><SiGithub className="text-foreground w-5 h-5 hover:text-primary" /></Link>
        </div>
      </div>
    </footer>
  )
}