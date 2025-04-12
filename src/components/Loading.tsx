import { useTranslation } from "react-i18next"
import { Loader2 } from "lucide-react"

/**
 * Loading.tsx
 * Global or local loading spinner for webtres.uy
 */
const Loading = () => {
    const { t } = useTranslation()
    return (
        <div className="flex items-center justify-center min-h-[200px] w-full text-muted-foreground">
            <Loader2 className="animate-spin h-6 w-6" />
            <span className="ml-2 text-sm">{t("loading")}</span>
        </div>
    )
}

export default Loading
