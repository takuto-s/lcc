import type { Event } from './event'
import type { AttendanceMap, AttendanceState } from './attendance'
import { SEED_EVENTS, SEED_VERSION } from './seed'

const KEYS = {
  events: 'lcc:events',
  seedVersion: 'lcc:seedVersion',
  attendances: 'lcc:attendances',
} as const

const readJson = <T>(key: string): T | undefined => {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return undefined
    return JSON.parse(raw) as T
  } catch {
    return undefined
  }
}

const writeJson = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value))
}

const initEvents = (): Event[] => {
  const storedVersion = readJson<number>(KEYS.seedVersion)
  if (storedVersion === undefined || storedVersion < SEED_VERSION) {
    writeJson(KEYS.events, SEED_EVENTS)
    writeJson(KEYS.seedVersion, SEED_VERSION)
    return [...SEED_EVENTS]
  }
  const stored = readJson<Event[]>(KEYS.events)
  return stored ?? [...SEED_EVENTS]
}

const initAttendances = (): AttendanceMap => readJson<AttendanceMap>(KEYS.attendances) ?? {}

export const appState = $state({
  events: initEvents(),
  attendances: initAttendances(),
})

export const submitAttendance = (eventId: string, state: AttendanceState) => {
  appState.attendances = { ...appState.attendances, [eventId]: state }
  writeJson(KEYS.attendances, appState.attendances)
}
