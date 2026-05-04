import type { Event } from './event'

export const SEED_VERSION = 1

const at = (month: number, day: number, hour: number, minute: number) =>
  new Date(2026, month - 1, day, hour, minute).getTime()

export const SEED_EVENTS: Event[] = [
  {
    id: 'zoom-2026-04-22',
    title: 'オンラインZoom実践会 専攻なし',
    startAtMs: at(4, 22, 12, 0),
    endAtMs: at(4, 22, 13, 30),
    type: 'online',
    archiveUrl: 'https://example.com/archive/2026-04-22',
  },
  {
    id: 'zoom-2026-05-07',
    title: 'オンラインZoom実践会 専攻なし',
    startAtMs: at(5, 7, 12, 0),
    endAtMs: at(5, 7, 14, 30),
    type: 'online',
    onlineUrl: 'https://zoom.us/j/example-2026-05-07',
  },
  {
    id: 'shusai-2026-05-13',
    title: '主宰実践会 変化を言葉にしよう',
    startAtMs: at(5, 13, 12, 0),
    type: 'online',
    onlineUrl: 'https://zoom.us/j/example-2026-05-13',
    imagePath: '/event-banner0513.png',
  },
  {
    id: 'real-2026-05-23',
    title: 'リアル実践会 専攻なし/懇親会',
    startAtMs: at(5, 23, 13, 30),
    endAtMs: at(5, 23, 17, 30),
    type: 'offline',
  },
  {
    id: 'zoom-2026-06-06',
    title: 'オンラインZoom実践会 専攻A',
    startAtMs: at(6, 6, 9, 0),
    endAtMs: at(6, 6, 10, 30),
    type: 'online',
    onlineUrl: 'https://zoom.us/j/example-2026-06-06',
  },
  {
    id: 'real-2026-06-18',
    title: 'リアル実践会 専攻B/懇親会',
    startAtMs: at(6, 18, 13, 30),
    endAtMs: at(6, 18, 17, 30),
    type: 'offline',
  },
  {
    id: 'zoom-2026-07-02',
    title: 'オンラインZoom実践会 専攻B',
    startAtMs: at(7, 2, 12, 0),
    endAtMs: at(7, 2, 13, 0),
    type: 'online',
    onlineUrl: 'https://zoom.us/j/example-2026-07-02',
  },
  {
    id: 'real-2026-07-18',
    title: 'リアル実践会 専攻A/卒業懇親会',
    startAtMs: at(7, 18, 13, 30),
    endAtMs: at(7, 18, 17, 30),
    type: 'offline',
  },
  {
    id: 'zoom-2026-08-01',
    title: 'オンラインZoom実践会 専攻なし',
    startAtMs: at(8, 1, 9, 0),
    endAtMs: at(8, 1, 11, 30),
    type: 'online',
    onlineUrl: 'https://zoom.us/j/example-2026-08-01',
  },
  {
    id: 'real-2026-08-20',
    title: 'リアル実践会 専攻なし/懇親会',
    startAtMs: at(8, 20, 13, 30),
    endAtMs: at(8, 20, 17, 30),
    type: 'offline',
  },
  {
    id: 'zoom-2026-09-03',
    title: 'オンラインZoom実践会 専攻A',
    startAtMs: at(9, 3, 12, 0),
    endAtMs: at(9, 3, 13, 30),
    type: 'online',
    onlineUrl: 'https://zoom.us/j/example-2026-09-03',
  },
  {
    id: 'real-2026-09-26',
    title: 'リアル実践会 専攻B/懇親会',
    startAtMs: at(9, 26, 13, 30),
    endAtMs: at(9, 26, 17, 30),
    type: 'offline',
  },
  {
    id: 'zoom-2026-10-03',
    title: 'オンラインZoom実践会 専攻B',
    startAtMs: at(10, 3, 9, 0),
    endAtMs: at(10, 3, 10, 30),
    type: 'online',
    onlineUrl: 'https://zoom.us/j/example-2026-10-03',
  },
  {
    id: 'real-2026-10-15',
    title: 'リアル実践会 専攻A/卒業懇親会',
    startAtMs: at(10, 15, 13, 30),
    endAtMs: at(10, 15, 17, 30),
    type: 'offline',
  },
]
