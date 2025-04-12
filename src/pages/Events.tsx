import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { EventCard } from "@/components/EventCard"
import { getEvents } from "@/data/events/getEvents"

const Events = () => {
  const { t } = useTranslation()
  const events = getEvents()

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-12 bg-background text-foreground">
      <div className="max-w-5xl mx-auto space-y-10">
        <h1 className="text-3xl font-bold tracking-tight">{t("events.title")}</h1>
        <div className="grid gap-6 md:grid-cols-2">
          {events.map((event) => (
            <Link to={`/events/${event.slug}`} key={event.slug}>
              <EventCard {...event} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Events