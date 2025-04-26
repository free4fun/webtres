import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AnimatedSection } from "@/components/Animations"
import Loading from "@/components/Loading"
import HCaptcha from "@hcaptcha/react-hcaptcha"
import { useRef } from "react"
import clsx from "clsx"

const Newsletter = () => {
  const { t } = useTranslation();
  const [status, setStatus] = useState<"success" | "error" | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [captchaToken, setCaptchaToken] = useState("")
  const captchaRef = useRef<any>(null)
  const subscribeNewsletter = async (data: {
    name: string,
    email: string,
    captchaToken: string
    
  }) => {
    const res = await fetch("http://localhost:3001/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
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
    if (!captchaToken) {
      setStatus("error")
      setIsLoading(false)
      return
    }
    try {
      await subscribeNewsletter({ name, email, captchaToken })
      setStatus("success")
      form.reset()
    } catch (error) {
      //console.error("Error:", error)
      setStatus("error")
      captchaRef.current?.resetCaptcha() // Reset the captcha
      setCaptchaToken("")  // Clear the captcha token
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-12 py-12 bg-background text-foreground transition-colors duration-300">
      <AnimatedSection className="max-w-4xl mx-auto text-center space-y-6 px-4 py-12" vertical={-40}>
        <h2 className="text-3xl font-bold tracking-tight">{t("newsletter.title")}</h2>
        <p className="text-muted-foreground">{t("newsletter.description")}</p>
          <form className="space-y-4 text-center max-w-xl mx-auto" onSubmit={handleSubmit}>
            <div>
              <Input className="max-w-sm mx-auto" name="name" placeholder={t("newsletter.name")} required />
            </div>
            <div>
              <Input className="max-w-sm mx-auto" type="email" name="email" placeholder={t("newsletter.email")} required />
            </div>
            <div className="max-w-sm mx-auto">
            <HCaptcha sitekey={import.meta.env.VITE_HCAPTCHA_SITE_KEY} onVerify={(token) => setCaptchaToken(token)} ref={captchaRef} />
            </div>
            <Button type="submit" className="animate-pulse hover:animate-none transition-transform duration-300 hover:scale-105 w-full max-w-sm" >{t("newsletter.subscribe")}</Button>
          </form>
          
          {status && (          
          <p className={clsx("mt-6 mx-auto max-w-xl px-4 py-3 rounded-md text-sm text-center font-medium animate-fade-in",status === "success"? "text-green-500": "bg-red-100 text-red-800 border border-red-300")}>
            {status === "success" ? t("newsletter.success") : t("newsletter.error")}
          </p>
          )}
          </AnimatedSection>
          <AnimatedSection className="max-w-4xl mx-auto text-center space-y-6 px-4 py-12" vertical={40}>
            <p className="text-base">{t("newsletter.extendedDescription")}</p>
            {isLoading && <Loading />}
          </AnimatedSection>
    </div>
  )
}

export default Newsletter
