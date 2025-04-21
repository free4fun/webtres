import { motion } from "framer-motion"
import { useState } from "react";

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  vertical?: number
}

export const AnimatedSection = ({ children, className = "", delay = 0, vertical=-40}: AnimatedSectionProps) => {
  const [isInView, setIsInView] = useState(false);
    return (
      <motion.span
      onViewportEnter={() => {
        setIsInView(true);
      }}>
      <motion.section
        initial={{ opacity: 0, y: vertical }}
        whileInView={isInView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.6, ease: "easeOut", delay }}
        className={className}
      >
        {children}
      </motion.section>
      </motion.span>
    )
  }
