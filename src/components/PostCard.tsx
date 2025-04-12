import { Link } from "react-router-dom"
import { Card, CardContent, CardTitle } from "@/components/ui/card"

interface PostCardProps {
  slug: string
  title: string
  summary: string
  image?: string
}

export const PostCard = ({ slug, title, summary, image }: PostCardProps) => {
  return (
    <Link to={`/blog/${slug}`} key={slug}>
      <Card className="flex flex-col bg-card text-card-foreground overflow-hidden h-full">
        {image && (
          <div className="aspect-[3/2] overflow-hidden rounded-md">
            <img src={image} alt={title} className="w-full h-full object-cover" />
          </div>
        )}
        <CardContent className="flex flex-col flex-grow justify-between p-4 space-y-2">
          <div>
            <CardTitle>{title}</CardTitle>
            <p className="text-sm text-muted-foreground">{summary}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}