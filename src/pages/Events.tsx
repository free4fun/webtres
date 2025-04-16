import { useTranslation } from "react-i18next"
import { getEvents } from "@/data/events/getEvents"
import { useVisibleItems } from '../hooks/useVisibleItems';
import { EventCard } from "@/components/EventCard"
import { MdChevronLeft, MdChevronRight, MdArrowDownward } from "react-icons/md"
import { Button } from "@/components/ui/button"
import clsx from "clsx"

const Events = () => {
  const { t } = useTranslation();
  const events = getEvents().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  const {
    visibleItems,
    handleNext,
    handlePrev,
    handleTouchStart,
    handleTouchEnd,
    renderKey,
    loading,
    itemsPerRow,
  } = useVisibleItems(events)
  
  return (
    <div>
      <div className="flex flex-col gap-12 py-12 bg-background text-foreground transition-colors duration-300">
        <section className="text-center space-y-6 px-4 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold">{t("events.title")}</h2>
          <p className="text-lg text-muted-foreground">{t("events.text1")}</p>
          <p className="text-base">{t("events.text2")}</p>
        </section>
      </div>
      <div className="w-full px-4 sm:px-6 lg:px-8 pb-12 bg-background text-foreground relative" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <div className="max-w-6xl mx-auto space-y-10">
          {/* Desktop arrow buttons */}
          {events.length > itemsPerRow && (
            <>
              <Button
                onClick={handlePrev}
                className="hidden md:flex absolute left-5 top-1/2 -translate-y-1/2 z-10 rounded-full p-2"
                aria-label="Previous"
              >
                <MdChevronLeft />
              </Button>
              <Button
                onClick={handleNext}
                className="hidden md:flex absolute right-5 top-1/2 -translate-y-1/2 z-10 rounded-full p-2"
                aria-label="Next"
              >
                <MdChevronRight />
              </Button>
            </>
          )}

          {/* Post Grid */}
          <div
            key={renderKey}
            className={clsx(
              "grid gap-6 transition-all duration-500",
              itemsPerRow === 1 ? "grid-cols-1" : "md:grid-cols-3"
            )}
          >
            {visibleItems.map((post) => (
              <EventCard key={post.slug} {...post} />
            ))}
          </div>

          {/* Mobile arrow down */}
          {events.length > itemsPerRow && (
            <div className="flex justify-center md:hidden">
              <Button
                onClick={handleNext}
                className="bg-black/60 text-white hover:bg-black dark:bg-white/60 dark:text-black dark:hover:bg-white rounded-full"
              >
                <MdArrowDownward />
              </Button>
            </div>
          )}
        </div>

        {/* Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <p className="text-lg font-medium text-foreground animate-pulse">
              {t("blog.loading")}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Events