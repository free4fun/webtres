import { useTranslation } from "react-i18next"
import { useParams, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { getEventBySlug } from "@/data/events/getEvents"

const EventDetail = () => {
  const { t } = useTranslation()
  const { slug } = useParams()
  const event = getEventBySlug(slug || "")

  if (!event) {
    return (
      <div className="px-4 py-16 text-center text-muted-foreground">
        {t("events.notFound")}
      </div>
    )
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-12 bg-background text-foreground">
      <div className="max-w-3xl mx-auto space-y-6">
        {event.image && (
          <div className="aspect-[3/2] overflow-hidden rounded-md">
            <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
          </div>
        )}
        <h1 className="text-3xl font-bold tracking-tight">{event.title}</h1>
        <p className="text-sm text-muted-foreground">{event.date} — {event.location}</p>
        <p className="text-base leading-relaxed whitespace-pre-wrap">{event.details}</p>
        <Button variant="link" asChild>
          <Link to="/events">{t("events.backToList")}</Link>
        </Button>
      </div>
    </div>
  )
}

export default EventDetail
