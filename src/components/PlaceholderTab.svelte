<script lang="ts">
  let { title }: { title: string } = $props()
</script>

<div class="page">
  <h1 class="page-title">{title}</h1>
  <p class="empty">準備中です</p>
</div>

<style>
  .page {
    padding: 16px 14px 24px;
  }
  .page-title {
    font-size: 22px;
    margin: 4px 0 16px;
  }
  .empty {
    color: var(--text-sub);
    text-align: center;
    padding: 40px 0;
  }
</style>
