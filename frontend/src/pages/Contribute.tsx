import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { AnimatedSection } from "@/components/Animations"
import { Button } from "@/components/ui/button"
import { MdCheckCircle } from "react-icons/md"

export const Contribute = () => {
  const { t } = useTranslation()
  const contributePoints = t("contribute.points", { returnObjects: true }) as Record<string, string>
  return (
    <div className="flex flex-col gap-12 py-12 bg-background text-foreground transition-colors duration-300">
      <AnimatedSection className="max-w-4xl mx-auto text-center space-y-6 px-4" vertical={-40}>
        <h2 className="text-3xl font-bold">{t("contribute.title")}</h2>
        <p className="text-muted-foreground text-lg">{t("contribute.text1")}</p>
      </AnimatedSection>
      <AnimatedSection className="bg-muted/40 py-12 text-center px-4" vertical={40}>
        <p className="text-base leading-relaxed py-7">{t("contribute.text2.1")}<br/><br/>{t("contribute.text2.2")}</p>
        <p><Link to="https://t.me/webtres_uy"><Button className="animate-pulse hover:animate-none transition-transform duration-300 hover:scale-105">{t("contribute.cta")}</Button></Link></p>
      </AnimatedSection>
      <AnimatedSection className="text-center space-y-6 px-4 max-w-4xl mx-auto" vertical={-40}>
        <h3 className="text-2xl font-semibold">{t("contribute.subtitle")}</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 list-none max-w-2xl mx-auto text-center sm:text-left">
          {Object.entries(contributePoints).map(([key, value], index) => (
          <motion.li key={key} className="flex items-center gap-2 justify-center sm:justify-start text-muted-foreground" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.1 }}>
            <MdCheckCircle className="text-primary w-5 h-5 shrink-0" /><span>{value}</span>
          </motion.li>
          ))}
        </ul>
        </AnimatedSection>
        <AnimatedSection className="bg-muted/40 py-12 text-center px-4" vertical={40}>
        <p className="text-base leading-relaxed">{t("contribute.text3")}<br/>{t("contribute.text4")}</p>
        <p className="text-base leading-relaxed py-7">{t("contribute.text5")}</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/community"><Button variant="secondary" className="transition-colors duration-200 hover:brightness-110 active:scale-95">{t("contribute.cta2")}</Button></Link>
          <Link to="/about"><Button variant="secondary" className="transition-colors duration-200 hover:brightness-110 active:scale-95">{t("contribute.cta3")}</Button></Link>
        </div>
      </AnimatedSection>
    </div>
  )
}

export default Contribute