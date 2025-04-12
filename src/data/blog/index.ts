import { BlogPost } from "./types"

// Load all blog posts from the es and en directories
const esModules = import.meta.glob("./es/*.ts", { eager: true }) as Record<string, { default: BlogPost }>
const enModules = import.meta.glob("./en/*.ts", { eager: true }) as Record<string, { default: BlogPost }>

const mapToPosts = (modules: Record<string, { default: BlogPost }>): BlogPost[] =>
  Object.values(modules).map((mod) => mod.default)

/**
 * getPostsByLang
 * Load the blog posts based on the language.
 * @param lang - The language to load the posts for. Can be "es" or "en".
 * @returns An array of BlogPost objects.
 * If the language is not supported, it defaults to English posts.
 */
export const getPostsByLang = (lang: "es" | "en"): BlogPost[] => {
  if (lang === "es") return mapToPosts(esModules)
  if (lang === "en") return mapToPosts(enModules)
  return mapToPosts(enModules) // fallback
}
