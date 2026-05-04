const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土'] as const

export const formatDateLabel = (ms: number): string => {
  const d = new Date(ms)
  return `${d.getMonth() + 1}/${d.getDate()}(${WEEKDAYS[d.getDay()]})`
}

const pad2 = (n: number) => String(n).padStart(2, '0')

export const formatTime = (ms: number): string => {
  const d = new Date(ms)
  return `${pad2(d.getHours())}:${pad2(d.getMinutes())}`
}

export const formatTimeRange = (startMs: number, endMs?: number): string =>
  endMs === undefined ? `${formatTime(startMs)}〜` : `${formatTime(startMs)}〜${formatTime(endMs)}`
