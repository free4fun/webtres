import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { SiTelegram, SiInstagram, SiX, SiLinkedin, SiYoutube, SiGithub } from "react-icons/si";

export const Footer = () => {
  const { t } = useTranslation()

  return (
    <footer className="w-full border-t border-border bg-muted py-10 text-muted-foreground text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left space-y-2">
          <div className="flex justify-center md:justify-start gap-4">
            <Link to="/blog">{t("footer.blog")}</Link>
            <Link to="/faq">{t("footer.faq")}</Link>
            <Link to="/newsletter">{t("footer.newsletter")}</Link>
            <Link to="/contact">{t("footer.contact")}</Link>
          </div>
          <p>© {new Date().getFullYear()} webtres</p>
        </div>
        <div className="flex gap-4">
          <Link to="https://t.me/webtres_uy" target="_blank"><SiTelegram className="w-5 h-5 hover:text-foreground" /></Link>
          <Link to="https://instagram.com/" target="_blank"><SiInstagram className="w-5 h-5 hover:text-foreground" /></Link>
          <Link to="https://x.com/" target="_blank"><SiX className="w-5 h-5 hover:text-foreground" /></Link>
          <Link to="https://linkedin.com" target="_blank"><SiLinkedin className="w-5 h-5 hover:text-foreground" /></Link>
          <Link to="https://youtube.com" target="_blank"><SiYoutube className="w-5 h-5 hover:text-foreground" /></Link>
          <Link to="https://github.com" target="_blank"><SiGithub className="w-5 h-5 hover:text-foreground" /></Link>
        </div>
      </div>
    </footer>
  )
}
