<script lang="ts" module>
  export type TabId = 'home' | 'schedule' | 'news' | 'settings'
</script>

<script lang="ts">
  import { Home, Calendar, Megaphone, Settings } from 'lucide-svelte'

  let { active = $bindable() }: { active: TabId } = $props()

  const tabs = [
    { id: 'home' as const, label: 'ホーム', Icon: Home },
    { id: 'schedule' as const, label: '予定', Icon: Calendar },
    { id: 'news' as const, label: 'お知らせ', Icon: Megaphone },
    { id: 'settings' as const, label: '設定', Icon: Settings },
  ]
</script>

<nav class="tabbar">
  {#each tabs as tab (tab.id)}
    {@const Icon = tab.Icon}
    <button
      class="tab"
      class:active={active === tab.id}
      onclick={() => (active = tab.id)}
      aria-label={tab.label}
    >
      <Icon size={22} strokeWidth={active === tab.id ? 2.5 : 2} />
      <span class="label">{tab.label}</span>
    </button>
  {/each}
</nav>

<style>
  .tabbar {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 480px;
    display: flex;
    background: #fff;
    border-top: 1px solid var(--border);
    padding: 6px 0 calc(6px + env(safe-area-inset-bottom));
    z-index: 10;
  }
  .tab {
    flex: 1;
    background: none;
    border: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    padding: 4px 0;
    color: var(--text-sub);
    cursor: pointer;
  }
  .tab.active {
    color: var(--accent-dark);
  }
  .label {
    font-size: 11px;
    font-weight: 600;
  }
</style>
