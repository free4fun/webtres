export type BlogPost = {
    id: string
    slug: string
    date: string
    title: string
    summary: string
    content: string
    tags?: string[]
    image?: string
  }