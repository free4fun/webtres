import { MdAutorenew } from "react-icons/md"
import { useTranslation } from "react-i18next"

/**
 * LoadingOverlay.tsx
 * Fullscreen loading overlay used for route transitions
 */
const Loading = () => {
  const { t } = useTranslation()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 text-muted-foreground animate-fade-in">
        <MdAutorenew className="animate-spin h-8 w-8 text-primary" />
        <span className="text-sm">{t("loading")}</span>
      </div>
    </div>
  )
}

export default Loading
