import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

/**
 * ContributeSection.tsx
 * Extended section for ways to contribute to webtres.uy
 */
export const ContributeSection = () => {
  const { t } = useTranslation()

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-16 bg-background text-center text-foreground">
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-2xl font-semibold">{t("contribute.title")}</h2>
        <p className="text-muted-foreground text-base">{t("contribute.description")}</p>
        <ul className="text-left list-disc list-inside space-y-2 text-base">
          <li>{t("contribute.points.1")}</li>
          <li>{t("contribute.points.2")}</li>
          <li>{t("contribute.points.3")}</li>
          <li>{t("contribute.points.4")}</li>
        </ul>
        <p className="text-base leading-relaxed">{t("contribute.footer")}</p>
        <Button variant="default" asChild>
          <Link to="/contact">{t("contribute.cta")}</Link>
        </Button>
      </div>
    </section>
  )
}
