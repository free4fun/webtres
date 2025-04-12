import { BlogPost } from "./types"
import es from "./es.json"
import en from "./en.json"

const sources: Record<string, BlogPost[]> = {
  es,
  en
}

export const getPostsByLang = (lang: string): BlogPost[] => {
  return sources[lang] || sources.en
}