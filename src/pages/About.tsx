import { useTranslation } from "react-i18next"

/**
 * About.tsx
 * About page or section for webtres.uy
 */
const About = () => {
  const { t } = useTranslation()

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-12 bg-background text-foreground">
      <div className="max-w-3xl mx-auto space-y-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight">{t("about.title")}</h1>
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
      </div>
    </div>
  )
}

export default About
