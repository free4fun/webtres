import { Link } from "react-router-dom";
import { MdCalendarToday, MdPerson } from "react-icons/md"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

interface PostCardProps {
  slug: string
  date: string
  title: string
  author: string
  summary: string
  image?: string
}

export const PostCard = ({ slug, date, title, author, summary, image }: PostCardProps) => {
  return (
    <Link to={`/blog/${slug}`} key={slug}>
      <Card className="pt-0 pb-6 flex flex-col bg-card text-card-foreground overflow-hidden h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
        {image && (
          <div className="aspect-[3/2] overflow-hidden rounded-md">
            <img src={image} alt={title} className="w-full h-full object-cover" />
          </div>
        )}
        <CardHeader>
          <CardTitle className="truncate">{title}</CardTitle>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><MdPerson className="w-4 h-4" /><span>{author}</span></div>
            <div className="flex items-center gap-2"><MdCalendarToday className="w-4 h-4" /><span>{date}</span></div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col flex-grow justify-between p-4 space-y-2">
          <div>
            <p className="text-sm text-muted-foreground line-clamp-2">{summary}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}