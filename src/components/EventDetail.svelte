<script lang="ts">
  import type { Event } from '../lib/event'
  import { isUpcoming } from '../lib/event'
  import type { AttendanceState } from '../lib/attendance'
  import { ChevronLeft, Video, MapPin, ExternalLink, PlayCircle } from 'lucide-svelte'
  import { formatDateLabel, formatTimeRange } from '../lib/format'
  import { appState, submitAttendance } from '../lib/storage.svelte'

  let { event, onBack }: { event: Event; onBack: () => void } = $props()

  const now = Date.now()
  const upcoming = $derived(isUpcoming(event, now))
  const current = $derived<AttendanceState | undefined>(appState.attendances[event.id])

  const select = (state: AttendanceState) => {
    submitAttendance(event.id, state)
  }

  const statusLabel = $derived(
    current === 'attending' ? '出席' : current === 'absent' ? '欠席' : '未提出',
  )
</script>

<div class="detail">
  <button class="back" onclick={onBack} aria-label="戻る">
    <ChevronLeft size={26} />
  </button>

  {#if event.imagePath}
    <img class="banner-img" src={event.imagePath} alt="" />
  {/if}

  <div class="content">
    <div class="meta">
      <span class="date">{formatDateLabel(event.startAtMs)}</span>
      <span class="time">{formatTimeRange(event.startAtMs, event.endAtMs)}</span>
      <span class="type" class:online={event.type === 'online'} class:offline={event.type === 'offline'}>
        {#if event.type === 'online'}
          <Video size={14} strokeWidth={2.5} />
          <span>オンライン</span>
        {:else}
          <MapPin size={14} strokeWidth={2.5} />
          <span>オフライン</span>
        {/if}
      </span>
    </div>

    <h1 class="title">{event.title}</h1>

    {#if event.description}
      <section class="description">
        <h2 class="section-title">内容</h2>
        <pre class="description-body">{event.description}</pre>
      </section>
    {/if}

    <div class="links">
      {#if upcoming && event.type === 'online' && event.onlineUrl}
        <a class="link primary" href={event.onlineUrl} target="_blank" rel="noopener">
          <ExternalLink size={16} />
          <span>参加リンク</span>
        </a>
      {/if}
      {#if !upcoming && event.archiveUrl}
        <a class="link" href={event.archiveUrl} target="_blank" rel="noopener">
          <PlayCircle size={16} />
          <span>アーカイブを見る</span>
        </a>
      {/if}
    </div>

    <section class="attendance">
      <h2 class="section-title">出欠</h2>
      {#if upcoming}
        <div class="choices">
          <button class="choice" class:selected={current === 'attending'} onclick={() => select('attending')}>
            <span>出席</span>
          </button>
          <button class="choice" class:selected={current === 'absent'} onclick={() => select('absent')}>
            <span>欠席</span>
          </button>
        </div>
      {:else}
        <div class="status-row">
          <span
            class="status-pill"
            class:attending={current === 'attending'}
            class:absent={current === 'absent'}
            class:missing={current === undefined}
          >
            {statusLabel}
          </span>
        </div>
      {/if}
    </section>
  </div>
</div>

<style>
  .detail {
    background: var(--bg);
    min-height: 100vh;
    padding-top: 56px;
    padding-bottom: 32px;
  }
  .back {
    position: absolute;
    top: 8px;
    left: 8px;
    z-index: 5;
    background: rgba(255, 255, 255, 0.9);
    border: none;
    border-radius: 999px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: var(--banner-shadow);
    color: var(--text-main);
  }
  .banner-img {
    display: block;
    width: 100%;
    height: auto;
  }
  .content {
    padding: 16px 14px;
  }
  .meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    color: var(--text-sub);
    font-size: 13px;
    margin-bottom: 8px;
  }
  .date {
    font-weight: 700;
    color: var(--text-main);
  }
  .type {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 2px 8px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 700;
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
    font-size: 20px;
    font-weight: 700;
    line-height: 1.4;
    margin: 4px 0 16px;
  }
  .description {
    margin-bottom: 20px;
  }
  .description-body {
    background: transparent;
    padding: 0;
    margin: 0;
    font-family: inherit;
    font-size: 14px;
    line-height: 1.7;
    color: var(--text-main);
    white-space: pre-wrap;
    word-wrap: break-word;
  }
  .links {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 20px;
  }
  .link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px 16px;
    border-radius: 999px;
    font-weight: 700;
    text-decoration: none;
    background: #fff;
    color: var(--text-main);
    box-shadow: var(--banner-shadow);
  }
  .link.primary {
    background: var(--accent);
    color: #fff;
  }
  .section-title {
    font-size: 14px;
    color: var(--text-sub);
    margin: 0 0 10px;
    font-weight: 700;
  }
  .choices {
    display: flex;
    gap: 10px;
    margin-bottom: 12px;
  }
  .choice {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 14px 0;
    background: #fff;
    border-radius: 12px;
    cursor: pointer;
    font-weight: 700;
    box-shadow: var(--banner-shadow);
    border: 2px solid transparent;
    transition: border-color 0.15s ease;
  }
  .choice input {
    display: none;
  }
  .choice.selected {
    border-color: var(--accent);
    background: var(--accent-light);
  }

  .status-row {
    display: flex;
    justify-content: center;
    padding: 8px 0;
  }
  .status-pill {
    padding: 8px 18px;
    border-radius: 999px;
    font-weight: 700;
    font-size: 14px;
  }
  .status-pill.attending {
    background: var(--accent-light);
    color: var(--accent-dark);
  }
  .status-pill.absent {
    background: #eee;
    color: #666;
  }
  .status-pill.missing {
    background: #ffe5e0;
    color: #c0392b;
  }
</style>
