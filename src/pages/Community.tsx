import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

/**
 * CommunitySection.tsx
 * Extended section about the Webtres.uy community.
 */
export const CommunitySection = () => {
  const { t } = useTranslation()

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-16 bg-muted/40 text-center text-foreground">
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-3xl font-semibold">{t("community.title")}</h2>
        <p className="text-muted-foreground text-lg">{t("community.description")}</p>
        <p className="text-base leading-relaxed">
          {t("community.body1")}
        </p>
        <p className="text-base leading-relaxed">
          {t("community.body2")}
        </p>
        <Button variant="secondary" asChild>
          <Link to="/about">{t("community.cta")}</Link>
        </Button>
      </div>
    </section>
  )
}
