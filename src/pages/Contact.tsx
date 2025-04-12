import { useTranslation } from "react-i18next"
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
    <div className="w-full px-4 sm:px-6 lg:px-8 py-12 bg-background text-foreground">
      <div className="max-w-xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold tracking-tight text-center">{t("contact.title")}</h1>
        <p className="text-muted-foreground text-center">{t("contact.description")}</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1">{t("contact.name")}</label>
            <Input name="name" required />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">{t("contact.email")}</label>
            <Input type="email" name="email" required />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">{t("contact.message")}</label>
            <Textarea name="message" rows={5} required />
          </div>

          <Button type="submit" className="w-full">{t("contact.submit")}</Button>
        </form>
      </div>
    </div>
  )
}

export default Contact
