import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { MdCheckCircle } from "react-icons/md"


/**
 * CommunitySection.tsx
 * Extended section about the Webtres.uy community.
 */
export const Community = () => {
  const { t } = useTranslation();
  const body3items = t("community.body3.items", { returnObjects: true }) as Record<string, string>
  const body4items = t("community.body4.items", { returnObjects: true }) as Record<string, string>


  return (
    <div className="flex flex-col gap-12 py-12 bg-background text-foreground transition-colors duration-300">
      <section className="text-center space-y-6 px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold">{t("community.title")}</h2>
        <p className="text-muted-foreground text-lg">{t("community.description")}</p>
      </section>
      <section className="bg-muted/40 py-12 text-center px-4">
        <p className="text-base leading-relaxed">{t("community.body1.1")}<br/>{t("community.body1.2")}</p>
        <p className="text-base leading-relaxed py-7">{t("community.body2")}</p>
        <p><Link to="/about"><Button>{t("community.cta")}</Button></Link></p>
      </section>
      <section className="text-center space-y-6 px-4 max-w-4xl mx-auto">
        <h3 className="text-2xl font-semibold">{t("community.body3.title")}</h3>
        <p className="text-base leading-relaxed">{t("community.body3.text1")}</p>
        <p className="text-base leading-relaxed">{t("community.body3.text2")}</p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 list-none max-w-2xl mx-auto text-center sm:text-left">
          {Object.entries(body3items).map(([key, value], index) => (
          <motion.li key={key} className="flex items-center gap-2 justify-center sm:justify-start text-muted-foreground" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.1 }}>
            <MdCheckCircle className="text-primary w-5 h-5 shrink-0" /><span>{value}</span>
          </motion.li>
          ))}
        </ul>
      </section>
      <section className="bg-muted/40 py-12 text-center px-4">
        <p className="text-base leading-relaxed">{t("community.body5.text1")}<br/>{t("community.body5.text2")}</p>
        <p className="text-base leading-relaxed  py-7">{t("community.body5.text3")}</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/about"><Button variant="secondary">{t("community.cta2")}</Button></Link>
          <Link to="/about"><Button variant="secondary">{t("community.cta3")}</Button></Link>
        </div>
      </section>
      <section className="text-center space-y-6 px-4 max-w-4xl mx-auto">
        <h3 className="text-2xl font-semibold">{t("community.body4.title")}</h3>
        <p className="text-base leading-relaxed">{t("community.body4.text1")}</p>
        <p className="text-base leading-relaxed">{t("community.body4.text2")}</p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 list-none max-w-2xl mx-auto text-center sm:text-left">
          {Object.entries(body4items).map(([key, value], index) => (
          <motion.li key={key} className="flex items-center gap-2 justify-center sm:justify-start text-muted-foreground" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.1 }}>
            <MdCheckCircle className="text-primary w-5 h-5 shrink-0" /><span>{value}</span>
          </motion.li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default Community