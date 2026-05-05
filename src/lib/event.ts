export type EventType = 'online' | 'offline'

export type Event = {
  id: string
  title: string
  startAtMs: number
  endAtMs?: number
  type: EventType
  onlineUrl?: string
  archiveUrl?: string
  imagePath?: string
  description?: string
}

const FALLBACK_DURATION_MS = 3 * 60 * 60 * 1000

export const isUpcoming = (event: Event, nowMs: number): boolean => {
  const boundary = event.endAtMs ?? event.startAtMs + FALLBACK_DURATION_MS
  return nowMs < boundary
}

export const sortByStart = (events: readonly Event[]): Event[] =>
  [...events].sort((a, b) => a.startAtMs - b.startAtMs)

export const filterUpcoming = (events: readonly Event[], nowMs: number): Event[] =>
  events.filter((e) => isUpcoming(e, nowMs))

export const findNextEvent = (events: readonly Event[], nowMs: number): Event | undefined =>
  sortByStart(filterUpcoming(events, nowMs))[0]
