import { Link } from "react-router-dom"
import { MdCalendarToday, MdLocationOn } from "react-icons/md"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface EventCardProps {
  slug: string
  title: string
  date: string
  location: string
  description: string
  image?: string
}

/**
 * EventCard.tsx
 * Reusable event preview card with image and details.
 */
export const EventCard = ({ slug, title, date, location, description, image }: EventCardProps) => {
  return (
    <Link to={`/events/${slug}`} key={slug}>
    <Card className="pt-0 pb-6 bg-card text-card-foreground overflow-hidden">
      {image && (
        <div className="aspect-[3/2] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-lg truncate">{title}</CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MdCalendarToday className="w-4 h-4" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MdLocationOn className="w-4 h-4" />
          <span>{location}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        
        <p className="text-sm text-muted-foreground line-clamp-3">{description}</p>
      </CardContent>
    </Card>
    </Link>
  )
}
