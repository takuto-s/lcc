<script lang="ts">
  import { appState } from '../lib/storage.svelte'
  import { findNextEvent } from '../lib/event'
  import { countMissingUpcoming } from '../lib/attendance'
  import EventBanner from './EventBanner.svelte'
  import { AlertCircle } from 'lucide-svelte'

  let {
    onOpenDetail,
    onGoSchedule,
  }: {
    onOpenDetail: (id: string) => void
    onGoSchedule: () => void
  } = $props()

  const now = Date.now()
  const missingCount = $derived(countMissingUpcoming(appState.events, appState.attendances, now))
  const next = $derived(findNextEvent(appState.events, now))
</script>

<div class="page">
  <h1 class="page-title">ホーム</h1>

  {#if missingCount > 0}
    <button class="missing" onclick={onGoSchedule}>
      <AlertCircle size={20} />
      <span>未提出の出欠が {missingCount} 件あります</span>
    </button>
  {/if}

  <h2 class="section-title">次のイベント</h2>
  {#if next}
    <EventBanner
      event={next}
      attendance={appState.attendances[next.id]}
      onClick={() => onOpenDetail(next.id)}
    />
  {:else}
    <p class="empty">予定されているイベントはありません</p>
  {/if}
</div>

<style>
  .page {
    padding: 16px 14px 24px;
  }
  .page-title {
    font-size: 22px;
    margin: 4px 0 16px;
  }
  .missing {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    background: #ffd54f;
    color: #5a3d00;
    border: none;
    border-radius: 12px;
    padding: 12px 14px;
    margin-bottom: 18px;
    font-size: 14px;
    font-weight: 700;
    text-align: left;
    cursor: pointer;
    box-shadow: var(--banner-shadow);
  }
  .missing:active {
    transform: scale(0.99);
  }
  .section-title {
    font-size: 14px;
    color: var(--text-sub);
    margin: 0 0 8px;
    font-weight: 700;
  }
  .empty {
    color: var(--text-sub);
    text-align: center;
    padding: 24px 0;
  }
</style>
