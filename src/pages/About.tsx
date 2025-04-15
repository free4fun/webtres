import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button";
const About = () => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-12 py-12 bg-background text-foreground transition-colors duration-300">
      <section className="text-center space-y-6 px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold">{t("about.title")}</h2>
        <p className="text-lg text-muted-foreground">{t("about.mission")}</p>
        <p className="text-base">{t("about.description")}</p>
        <div className="grid gap-6 sm:grid-cols-2 mt-8 text-left">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">{t("about.education.title")}</h2>
            <p className="text-muted-foreground">{t("about.education.text")}</p>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">{t("about.community.title")}</h2>
            <p className="text-muted-foreground">{t("about.community.text")}</p>
          </div>
        </div>
      </section>
      <section className="bg-muted/40 py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl font-semibold">{t("home.community.title")}</h2>
          <p className="text-muted-foreground">{t("home.community.description")}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/community"><Button variant="secondary">{t("about.cta1")}</Button></Link>
            <Link to="/contribute"><Button variant="secondary">{t("about.cta2")}</Button></Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
