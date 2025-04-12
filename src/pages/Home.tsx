import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
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
      <section className="text-center space-y-6 px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">{t("home.hero.title")}</h1>
        <p className="text-muted-foreground text-lg">{t("home.hero.description")}</p>
        <Button size="lg">{t("home.hero.cta")}</Button>
      </section>

      {/* About Section */}
      <section className="bg-muted py-16 text-center px-4 transition-colors duration-300">
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="text-2xl font-semibold">{t("home.about.title")}</h2>
          <p className="text-muted-foreground">{t("home.about.text")}</p>
        </div>
      </section>

      {/* Events Preview */}
      <section className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">{t("home.events.title")}</h2>
            <Link to="/events">
              <Button variant="ghost" size="sm">{t("home.events.cta")}</Button>
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
      </section>

      {/* Blog Preview – real data */}
      <section className="w-full px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-semibold">{t("home.blog.title")}</h2>
      <Link to="/blog">
        <Button variant="ghost" size="sm">{t("home.blog.cta")}</Button>
      </Link>
    </div>
    <div className="grid gap-4 md:grid-cols-3">
      {posts.slice(0, 3).map((post) => (
          <PostCard {...post}/>
      ))}
    </div>
  </div>
</section>


      {/* Community Section */}
      <section className="bg-muted/40 py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl font-semibold">{t("home.community.title")}</h2>
          <p className="text-muted-foreground">{t("home.community.description")}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="secondary">{t("home.community.action1")}</Button>
            <Button variant="secondary">{t("home.community.action2")}</Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-4 px-4 max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold">{t("home.cta.title")}</h2>
        <p className="text-muted-foreground">{t("home.cta.description")}</p>
        <Link to="/contact">
          <Button size="lg">{t("home.cta.button")}</Button>
        </Link>
      </section>
    </div>
  )
}

export default Home
