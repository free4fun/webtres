import { useTranslation } from "react-i18next"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { AnimatedSection } from "@/components/Animations"

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
    { id: "q6", question: t("faq.q6.q"), answer: t("faq.q6.a") },
    { id: "q7", question: t("faq.q7.q"), answer: t("faq.q7.a") },
    { id: "q8", question: t("faq.q8.q"), answer: t("faq.q8.a") },
    { id: "q9", question: t("faq.q9.q"), answer: t("faq.q9.a") },
    { id: "q10", question: t("faq.q10.q"), answer: t("faq.q10.a") },
    { id: "q11", question: t("faq.q11.q"), answer: t("faq.q11.a") }
  ]

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-12 bg-background text-foreground">
      <AnimatedSection className="max-w-3xl mx-auto space-y-6" vertical={-40}>
        <h1 className="text-3xl font-bold tracking-tight text-center">{t("faq.title")}</h1>
        <Accordion type="multiple" className="w-full">
          {questions.map((item) => (
            <AccordionItem key={item.id} value={item.id} className="no-underline">
              <AccordionTrigger className="hover:no-underline hover:text-primary transition-colors duration-200 cursor-pointer">{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        </AnimatedSection>
    </div>
  )
}

export default FAQ
