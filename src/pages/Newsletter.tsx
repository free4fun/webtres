import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AnimatedSection } from "@/components/Animations"

const Newsletter = () => {
  const { t } = useTranslation()
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO: Replace with actual subscription logic (API call, etc.)
    setSubmitted(true)
  }

  return (
    <div className="flex flex-col gap-12 py-12 bg-background text-foreground transition-colors duration-300">
      <AnimatedSection className="max-w-4xl mx-auto text-center space-y-6 px-4 py-12">
        <h2 className="text-3xl font-bold tracking-tight">{t("newsletter.title")}</h2>
        <p className="text-muted-foreground">{t("newsletter.description")}</p>
      
        {!submitted ? (
          <form className="space-y-4 text-center" onSubmit={handleSubmit}>
            <Input className="max-w-sm mx-auto" type="email" name="email" placeholder={t("newsletter.placeholder")} required />
            <Button type="submit" className="animate-pulse hover:animate-none transition-transform duration-300 hover:scale-105 w-full max-w-sm" >{t("newsletter.subscribe")}</Button>
          </form>
        ) : (
          <p className="text-green-500 text-sm font-medium animate-fade-in">{t("newsletter.success")}</p>
        )}
          <p className="text-base">{t("newsletter.extendedDescription")}</p>
        </AnimatedSection>
    </div>
  )
}

export default Newsletter
