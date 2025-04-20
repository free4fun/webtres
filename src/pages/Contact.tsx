import { useTranslation } from "react-i18next"
import { AnimatedSection } from "@/components/Animations"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

/**
 * Contact.tsx
 * Contact form page for webtres.uy
 */
const Contact = () => {
  const { t } = useTranslation()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO: Implement form submission logic (email, backend, etc.)
    alert(t("contact.success"))
  }
 
  return (
    <div className="flex flex-col gap-12 py-12 bg-background text-foreground transition-colors duration-300">
      <AnimatedSection className="max-w-4xl mx-auto text-center space-y-6 px-4">
        <h1 className="text-3xl font-bold tracking-tight text-center">{t("contact.title")}</h1>
        <p className="text-muted-foreground text-center">{t("contact.description")}</p>
      </AnimatedSection>
      <AnimatedSection delay={0.4}>
        <form className="space-y-4 text-center" onSubmit={handleSubmit}>
          <div><label className="block text-sm font-medium mb-1">{t("contact.name")}</label><Input className="max-w-sm mx-auto" name="name" required /></div>
          <div><label className="block text-sm font-medium mb-1">{t("contact.email")}</label><Input className="max-w-sm mx-auto" type="email" name="email" required /></div>
          <div className="pb-7"><label className="block text-sm font-medium mb-1">{t("contact.message")}</label><Textarea className="max-w-sm mx-auto" name="message" rows={5} required /></div>
          <Button type="submit" className="animate-pulse hover:animate-none transition-transform duration-300 hover:scale-105 w-full max-w-sm">{t("contact.submit")}</Button>
        </form>
      </AnimatedSection>
    </div>
  )
}

export default Contact
