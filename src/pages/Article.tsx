import { useTranslation } from "react-i18next"
import { useParams, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { getPostsByLang } from "@/data/blog/getPostsByLang"
import { AnimatedSection } from "@/components/Animations"

const Article = () => {
  const { t, i18n } = useTranslation()
  const { slug } = useParams()
  const posts = getPostsByLang(i18n.language)
  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <div className="px-4 py-16 text-center text-muted-foreground">
        {t("blog.notFound")}
      </div>
    )
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-12 bg-background text-foreground">
      <div className="max-w-3xl mx-auto space-y-6">
        {post.image && (
          <div className="aspect-[3/2] overflow-hidden rounded-md">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <h1 className="text-3xl font-bold tracking-tight">{post.title}</h1>
        <p className="text-sm text-muted-foreground">{post.date}</p>
        <div className="prose prose-neutral dark:prose-invert max-w-none text-base leading-relaxed whitespace-pre-wrap">
          {post.content}
        </div>
        <Button><Link to="/blog">{t("blog.backToList")}</Link></Button>
      </div>
    </div>
  )
}

export default Article
