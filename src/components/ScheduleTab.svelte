<script lang="ts">
  import { appState } from '../lib/storage.svelte'
  import { sortByStart, isUpcoming } from '../lib/event'
  import EventBanner from './EventBanner.svelte'

  let { onOpenDetail }: { onOpenDetail: (id: string) => void } = $props()

  const now = Date.now()
  let showPast = $state(false)

  const visibleEvents = $derived(
    sortByStart(showPast ? appState.events : appState.events.filter((e) => isUpcoming(e, now))),
  )
</script>

<div class="page">
  <header class="head">
    <h1 class="page-title">予定</h1>
    <label class="toggle">
      <input type="checkbox" bind:checked={showPast} />
      <span>過去のイベントも表示</span>
    </label>
  </header>

  {#if visibleEvents.length === 0}
    <p class="empty">表示できるイベントはありません</p>
  {:else}
    {#each visibleEvents as event (event.id)}
      <EventBanner
        {event}
        attendance={appState.attendances[event.id]}
        past={!isUpcoming(event, now)}
        onClick={() => onOpenDetail(event.id)}
      />
    {/each}
  {/if}
</div>

<style>
  .page {
    padding: 16px 14px 24px;
  }
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 4px 0 14px;
    gap: 8px;
  }
  .page-title {
    font-size: 22px;
    margin: 0;
  }
  .toggle {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: var(--text-sub);
    cursor: pointer;
    user-select: none;
  }
  .toggle input {
    accent-color: var(--accent-dark);
    width: 16px;
    height: 16px;
  }
  .empty {
    color: var(--text-sub);
    text-align: center;
    padding: 24px 0;
  }
</style>
