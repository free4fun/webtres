import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AnimatedSection } from "@/components/Animations"
import { Button } from "@/components/ui/button";
import { PostCard } from "@/components/PostCard"
import { EventCard } from "@/components/EventCard";
import { getPostsByLang } from "@/data/blog/getPostsByLang";
import { getEvents } from "@/data/events/getEvents";

const Home = () => {
  const { t, i18n } = useTranslation();
  const posts = getPostsByLang(i18n.language);
  const events = getEvents();

  return (
    <div className="flex flex-col gap-24 py-12 bg-background text-foreground transition-colors duration-300">
      {/* Hero Section */}
      <AnimatedSection className="max-w-4xl mx-auto text-center space-y-6 px-4" vertical={-40}>
        <img src="/images/webtres.png" alt="Webtres logo" className="w-24 h-24 sm:w-80 sm:h-80 mx-auto" />
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">{t("home.hero.title")}</h1>
        <p className="text-muted-foreground text-lg">{t("home.hero.description")}</p>
        <Link to="https://t.me/webtres_uy" target="_blank"><Button className="animate-pulse hover:animate-none transition-transform duration-300 hover:scale-105" size="lg">{t("home.hero.cta")}</Button></Link>
      </AnimatedSection>

      {/* About Section */}
      <AnimatedSection className="bg-muted/40 py-16 px-4 text-center" vertical={40}>
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="text-2xl font-semibold">{t("home.about.title")}</h2>
          <p className="text-muted-foreground">{t("home.about.text")}</p>
          <Link to="/about"><Button variant="secondary" className="transition-colors duration-200 hover:brightness-110 active:scale-95">{t("home.about.button")}</Button></Link>
        </div>
      </AnimatedSection>

      {/* Events Preview */}
      <AnimatedSection className="w-full px-4 sm:px-6 lg:px-8" vertical={-40}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">{t("home.events.title")}</h2>
            <Link to="/events">
              <Button variant="ghost" size="sm" className="transition-colors duration-200 hover:brightness-110 active:scale-95">{t("home.events.cta")}</Button>
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {events.slice(0, 2).map((event) => (
              <Link to={`/events/${event.slug}`} key={event.slug}>
                <EventCard {...event} />
              </Link>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Blog Preview */}
      <AnimatedSection className="w-full px-4 sm:px-6 lg:px-8" vertical={40}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">{t("home.blog.title")}</h2>
            <Link to="/blog"><Button variant="ghost" size="sm" className="transition-colors duration-200 hover:brightness-110 active:scale-95">{t("home.blog.cta")}</Button></Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {posts.slice(0, 3).map((post) => (
              <PostCard {...post}/>
            ))}
          </div>
        </div>
      </AnimatedSection>


      {/* Community Section */}
      <AnimatedSection className="bg-muted/40 py-16 px-4 text-center" vertical={-40}>
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl font-semibold">{t("home.community.title")}</h2>
          <p className="text-muted-foreground">{t("home.community.description")}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/community"><Button variant="secondary" className="transition-colors duration-200 hover:brightness-110 active:scale-95">{t("home.community.community")}</Button></Link>
            <Link to="/contribute"><Button variant="secondary" className="transition-colors duration-200 hover:brightness-110 active:scale-95">{t("home.community.contribute")}</Button></Link>
          </div>
        </div>
      </AnimatedSection>
      
      {/* CTA Section */}
      <AnimatedSection className="max-w-4xl mx-auto text-center space-y-4 px-4" vertical={40}>
        <h2 className="text-2xl font-semibold">{t("home.cta.title")}</h2>
        <p className="text-muted-foreground">{t("home.cta.description")}</p>
        <Link to="/contact">
          <Button size="lg" className="hover:brightness-110 active:scale-95 animate-pulse hover:animate-none transition-transform duration-300 hover:scale-105">{t("home.cta.button")}</Button>
        </Link>
      </AnimatedSection>
    </div>
  )
}

export default Home
