import { useEffect, useState, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PostCard } from "@/components/PostCard"
import type { BlogPost } from "@/data/blog/types"

interface BlogCarouselProps {
  posts: BlogPost[]
}

export const BlogCarousel = ({ posts }: BlogCarouselProps) => {
  const [startIndex, setStartIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(3)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateView = () => {
      setItemsPerView(window.innerWidth < 768 ? 1 : 3)
    }
    updateView()
    window.addEventListener("resize", updateView)
    return () => window.removeEventListener("resize", updateView)
  }, [])

  useEffect(() => {
    setStartIndex(0)
  }, [posts])

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % posts.length)
  }

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + posts.length) % posts.length)
  }

  const visiblePosts = Array.from({ length: itemsPerView }, (_, i) => {
    const index = (startIndex + i) % posts.length
    return posts[index]
  })

  return (
    <div className="relative w-full overflow-hidden">
      {/* Flecha izquierda */}
      {posts.length > itemsPerView && (
        <Button
          onClick={handlePrev}
          className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-10
          bg-white/60 text-black hover:bg-white dark:bg-black/60 dark:text-white dark:hover:bg-black
          rounded-full p-2"
          aria-label="Previous"
        >
          <ChevronLeft />
        </Button>
      )}

      {/* Carrusel visible */}
      <div
        ref={containerRef}
        className="flex transition-transform duration-500 gap-4"
        style={{
          transform: `translateX(0%)`
        }}
      >
        {visiblePosts.map((post) => (
          <div
            key={post.slug}
            className="w-full sm:w-1/2 lg:w-1/4 shrink-0"
          >
            <PostCard {...post} />
          </div>
        ))}
      </div>

      {/* Flecha derecha */}
      {posts.length > itemsPerView && (
        <Button
          onClick={handleNext}
          className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-10
          bg-white/60 text-black hover:bg-white dark:bg-black/60 dark:text-white dark:hover:bg-black
          rounded-full p-2"
          aria-label="Next"
        >
          <ChevronRight />
        </Button>
      )}
    </div>
  )
}
