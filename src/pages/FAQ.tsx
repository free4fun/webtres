import { useTranslation } from "react-i18next"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

/**
 * FAQ.tsx
 * Frequently Asked Questions component for webtres.uy
 */
const FAQ = () => {
  const { t } = useTranslation()

  const questions = [
    { id: "q1", question: t("faq.q1.q"), answer: t("faq.q1.a") },
    { id: "q2", question: t("faq.q2.q"), answer: t("faq.q2.a") },
    { id: "q3", question: t("faq.q3.q"), answer: t("faq.q3.a") },
    { id: "q4", question: t("faq.q4.q"), answer: t("faq.q4.a") },
    { id: "q5", question: t("faq.q5.q"), answer: t("faq.q5.a") },
  ]

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-12 bg-background text-foreground">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold tracking-tight text-center">{t("faq.title")}</h1>
        <Accordion type="multiple" className="w-full">
          {questions.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}

export default FAQ
