import { useTranslation } from "react-i18next"
import { useState } from "react"
import { AnimatedSection } from "@/components/Animations"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import clsx from "clsx"
import Loading from "@/components/Loading"
import HCaptcha from "@hcaptcha/react-hcaptcha"
import { useRef } from "react"

const Contact = () => {
  const { t } = useTranslation()
  const [status, setStatus] = useState<"success" | "error" | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [captchaToken, setCaptchaToken] = useState("")
  const captchaRef = useRef<any>(null)

  const sendContactMessage = async (data: {
    name: string
    email: string
    message: string
    captchaToken: string
  }) => {
    const res = await fetch("http://localhost:3001/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    const result = await res.json()
    if (!res.ok) throw new Error(result.error || "Error")
    return result
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus(null)
    setIsLoading(true)
    const form = e.currentTarget
    const name = (form.elements.namedItem("name") as HTMLInputElement).value
    const email = (form.elements.namedItem("email") as HTMLInputElement).value
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value
    if (!captchaToken) {
      setStatus("error")
      return
    }
    try {
      await sendContactMessage({ name, email, message, captchaToken })
      setStatus("success")
      form.reset()
    } catch (error) {
      console.error("Error:", error)
      setStatus("error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-12 py-12 bg-background text-foreground transition-colors duration-300">
      <AnimatedSection className="max-w-4xl mx-auto text-center space-y-6 px-4">
        <h1 className="text-3xl font-bold tracking-tight text-center">{t("contact.title")}</h1>
        <p className="text-muted-foreground text-center">{t("contact.description")}</p>
      </AnimatedSection>

      <AnimatedSection delay={0.4}>
        <form className="space-y-4 text-center max-w-xl mx-auto" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1">{t("contact.name")}</label>
            <Input name="name" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t("contact.email")}</label>
            <Input type="email" name="email" required />
          </div>
          <div className="pb-7">
            <label className="block text-sm font-medium mb-1">{t("contact.message")}</label>
            <Textarea name="message" rows={5} required />
          </div>
          <div className="max-w-sm mx-auto">
            <HCaptcha sitekey={import.meta.env.VITE_HCAPTCHA_SITE_KEY} onVerify={(token) => setCaptchaToken(token)} ref={captchaRef}/>
          </div>
          <Button type="submit" className="w-full">{t("contact.submit")}</Button>
        </form>

        {status && (
          <div
            className={clsx(
              "mt-6 mx-auto max-w-xl px-4 py-3 rounded-md text-sm text-center",
              status === "success"
                ? "bg-green-100 text-green-800 border border-green-300"
                : "bg-red-100 text-red-800 border border-red-300"
            )}
          >
            {status === "success" ? t("contact.success") : t("contact.error")}
          </div>
        )}

      {isLoading && <Loading />}

      </AnimatedSection>
    </div>
  )
}

export default Contact
