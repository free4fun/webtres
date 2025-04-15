import { useEffect, useState, useRef } from "react"
import { useTranslation } from "react-i18next"
import { getPostsByLang } from "@/data/blog/getPostsByLang"
import { PostCard } from "@/components/PostCard"
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import clsx from "clsx"

const Blog = () => {
  const { t, i18n } = useTranslation()
  const allPosts = getPostsByLang(i18n.language).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
  const total = allPosts.length

  const getPostsPerRow = () => (window.innerWidth < 768 ? 1 : 3)
  const [postsPerRow, setPostsPerRow] = useState(getPostsPerRow())
  const getVisibleRows = () => (window.innerWidth < 768 ? 1 : 2)
  const [visibleRows, setVisibleRows] = useState(getVisibleRows())
  const POSTS_PER_VIEW = postsPerRow * visibleRows

  const [startIndex, setStartIndex] = useState(0)
  const [visiblePosts, setVisiblePosts] = useState(allPosts.slice(0, POSTS_PER_VIEW))
  const [renderKey, setRenderKey] = useState(0)
  const [loading, setLoading] = useState(false)

  const touchStartY = useRef(0)
  const touchEndY = useRef(0)

  const updateVisiblePosts = (newStart: number) => {
    const result: typeof allPosts = []
    for (let i = 0; i < postsPerRow * visibleRows; i++) {
      const idx = (newStart + i) % total
      result.push(allPosts[idx])
    }
    setVisiblePosts(result)
    setRenderKey(prev => prev + 1)
  }

  const handleNext = () => {
    if (loading) return
    setLoading(true)
    setTimeout(() => {
      const newStart = (startIndex + postsPerRow) % total
      setStartIndex(newStart)
      updateVisiblePosts(newStart)
      setLoading(false)
    }, 800)
  }

  const handlePrev = () => {
    if (loading) return
    setLoading(true)
    setTimeout(() => {
      const newStart = (startIndex - postsPerRow + total) % total
      setStartIndex(newStart)
      updateVisiblePosts(newStart)
      setLoading(false)

    }, 400)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndY.current = e.changedTouches[0].clientY
    const deltaY = touchStartY.current - touchEndY.current
    if (Math.abs(deltaY) > 50) {
      deltaY > 0 ? handleNext() : handlePrev()
    }
  }

  useEffect(() => {
    const handleResize = () => {
      const newPostsPerRow = getPostsPerRow()
      const newVisibleRows = getVisibleRows()
      if (newPostsPerRow !== postsPerRow) {
        setPostsPerRow(newPostsPerRow)
        setVisibleRows(newVisibleRows)
        updateVisiblePosts(startIndex)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [postsPerRow, startIndex])

  return (
    <div
      className="w-full px-4 sm:px-6 lg:px-8 py-12 bg-background text-foreground relative"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="max-w-6xl mx-auto space-y-10">
        <h1 className="text-3xl font-bold tracking-tight">{t("blog.title")}</h1>

        {/* Desktop arrow buttons */}
        {total > POSTS_PER_VIEW && postsPerRow !== 1 && (
          <>
            <Button
              onClick={handlePrev}
              className="hidden md:flex absolute left-5 top-1/2 -translate-y-1/2 z-10 rounded-full p-2"
              aria-label="Previous"
            >
              <ChevronLeft />
            </Button>

            <Button
              onClick={handleNext}
              className="hidden md:flex absolute right-5 top-1/2 -translate-y-1/2 z-10  rounded-full p-2"
              aria-label="Next"
            >
              <ChevronRight />
            </Button>
          </>
        )}

        {/* Animated Post Grid */}
        <div
          key={renderKey}
          className={clsx(
            "grid gap-6 transition-transform duration-500",
            postsPerRow === 1 ? "grid-cols-1" : "md:grid-cols-3",
          )}
        >
          {visiblePosts.map((post) => (
            <PostCard key={post.slug} {...post} />
          ))}
        </div>

        {/* Mobile nav buttons */}
        {total > POSTS_PER_VIEW && postsPerRow === 1 && (
          <div className="flex justify-center items-center">
            <Button onClick={handleNext} className="flex md:hidden bg-black/60 text-white hover:bg-black dark:bg-white/60 dark:text-black dark:hover:bg-white rounded-full"><ChevronDown /></Button>
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
  )
}

export default Blog
