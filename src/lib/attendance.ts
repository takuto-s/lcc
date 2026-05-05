import type { Event } from './event'
import { isUpcoming } from './event'

export type AttendanceState = 'attending' | 'absent'

export type AttendanceMap = Record<string, AttendanceState>

const ONE_MONTH_MS = 30 * 24 * 60 * 60 * 1000

export const countMissingSoon = (
  events: readonly Event[],
  attendances: AttendanceMap,
  nowMs: number,
): number =>
  events.filter(
    (e) =>
      isUpcoming(e, nowMs) &&
      e.startAtMs <= nowMs + ONE_MONTH_MS &&
      attendances[e.id] === undefined,
  ).length
