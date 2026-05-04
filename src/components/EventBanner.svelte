<script lang="ts">
  import type { Event } from '../lib/event'
  import type { AttendanceState } from '../lib/attendance'
  import { Video, MapPin } from 'lucide-svelte'
  import { formatDateLabel, formatTimeRange } from '../lib/format'

  let {
    event,
    attendance,
    onClick,
  }: {
    event: Event
    attendance: AttendanceState | undefined
    onClick: () => void
  } = $props()

  const statusLabel = $derived(
    attendance === 'attending' ? '出席' : attendance === 'absent' ? '欠席' : '未提出',
  )
</script>

<button class="banner" onclick={onClick}>
  <div class="row top">
    <span class="date">{formatDateLabel(event.startAtMs)}</span>
    <span class="time">{formatTimeRange(event.startAtMs, event.endAtMs)}</span>
    <span class="type" class:online={event.type === 'online'} class:offline={event.type === 'offline'}>
      {#if event.type === 'online'}
        <Video size={14} strokeWidth={2.5} />
      {:else}
        <MapPin size={14} strokeWidth={2.5} />
      {/if}
    </span>
  </div>
  <div class="title">{event.title}</div>
  <div class="row bottom">
    <span class="status" class:attending={attendance === 'attending'} class:absent={attendance === 'absent'} class:missing={attendance === undefined}>
      {statusLabel}
    </span>
  </div>
</button>

<style>
  .banner {
    display: block;
    width: 100%;
    background: var(--banner-bg);
    border: none;
    border-radius: 12px;
    box-shadow: var(--banner-shadow);
    padding: 12px 14px;
    margin: 0 0 10px;
    text-align: left;
    cursor: pointer;
    color: var(--text-main);
  }
  .banner:active {
    transform: scale(0.99);
  }
  .row {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .top {
    color: var(--text-sub);
    font-size: 13px;
  }
  .date {
    font-weight: 700;
    color: var(--text-main);
  }
  .time {
    flex: 1;
  }
  .type {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    border-radius: 999px;
  }
  .type.online {
    background: var(--accent);
    color: #fff;
  }
  .type.offline {
    background: #fff;
    color: var(--accent-dark);
    border: 2px solid var(--accent);
  }
  .title {
    margin: 6px 0 8px;
    font-size: 15px;
    font-weight: 700;
    line-height: 1.4;
  }
  .bottom {
    justify-content: flex-end;
  }
  .status {
    font-size: 12px;
    font-weight: 700;
    padding: 3px 10px;
    border-radius: 999px;
  }
  .status.missing {
    background: #ffe5e0;
    color: #c0392b;
  }
  .status.attending {
    background: var(--accent-light);
    color: var(--accent-dark);
  }
  .status.absent {
    background: #eee;
    color: #666;
  }
</style>
