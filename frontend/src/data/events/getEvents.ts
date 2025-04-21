import events from "./events.json"
import { Event } from "./types"

export const getEvents = (): Event[] => events
export const getEventBySlug = (slug: string): Event | undefined =>
  events.find((e) => e.slug === slug)