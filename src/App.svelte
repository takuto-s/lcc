<script lang="ts">
  import TabBar, { type TabId } from './components/TabBar.svelte'
  import HomeTab from './components/HomeTab.svelte'
  import ScheduleTab from './components/ScheduleTab.svelte'
  import PlaceholderTab from './components/PlaceholderTab.svelte'
  import EventDetail from './components/EventDetail.svelte'
  import { appState } from './lib/storage.svelte'

  let activeTab = $state<TabId>('home')
  let detailEventId = $state<string | null>(null)

  const detailEvent = $derived(
    detailEventId === null
      ? null
      : (appState.events.find((e) => e.id === detailEventId) ?? null),
  )

  const openDetail = (id: string) => {
    detailEventId = id
  }
  const closeDetail = () => {
    detailEventId = null
  }
  const goSchedule = () => {
    activeTab = 'schedule'
  }
</script>

{#if detailEvent}
  <EventDetail event={detailEvent} onBack={closeDetail} />
{:else}
  <div class="shell">
    <main class="content">
      {#if activeTab === 'home'}
        <HomeTab onOpenDetail={openDetail} onGoSchedule={goSchedule} />
      {:else if activeTab === 'schedule'}
        <ScheduleTab onOpenDetail={openDetail} />
      {:else if activeTab === 'news'}
        <PlaceholderTab title="お知らせ" />
      {:else}
        <PlaceholderTab title="設定" />
      {/if}
    </main>
    <TabBar bind:active={activeTab} />
  </div>
{/if}

<style>
  .shell {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  .content {
    flex: 1;
    padding-bottom: 64px;
  }
</style>
