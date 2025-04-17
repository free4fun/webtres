import { useTranslation } from "react-i18next"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

/**
 * Newsletter.tsx
 * Newsletter subscription section for webtres.uy
 */
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
        <section className="text-center space-y-6 px-4 max-w-4xl mx-auto">
            <div className="max-w-xl mx-auto space-y-6 text-center">
                <h2 className="text-3xl font-bold tracking-tight">{t("newsletter.title")}</h2>
                <p className="text-muted-foreground">{t("newsletter.description")}</p>
                <br/>
                <br/>
                {!submitted ? (
                    <form className="flex flex-col sm:flex-row gap-4 items-center justify-center" onSubmit={handleSubmit}>
                        <Input type="email" name="email" placeholder={t("newsletter.placeholder")} required className="w-full sm:w-auto flex-1" />
                        <Button type="submit" className="w-full sm:w-auto">{t("newsletter.subscribe")}</Button>
                    </form>
                ) : (
                    <p className="text-green-600 font-medium">{t("newsletter.success")}</p>
                )}
            </div>
            <br/>
            <p className="text-base">{t("newsletter.extendedDescription")}</p>
        </section>
    </div>
  )
}

export default Newsletter
