import type { Event } from './event'
import { isUpcoming } from './event'

export type AttendanceState = 'attending' | 'absent'

export type AttendanceMap = Record<string, AttendanceState>

export const countMissingUpcoming = (
  events: readonly Event[],
  attendances: AttendanceMap,
  nowMs: number,
): number =>
  events.filter((e) => isUpcoming(e, nowMs) && attendances[e.id] === undefined).length
