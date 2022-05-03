<script lang="ts">
  import config from '$lib/stores/subscribe/config';
  import subscribe, { type SubscribeItem } from '$lib/stores/subscribe/subscribe';
  import { onDestroy } from 'svelte';
  import Notification from './Notification.svelte';

  let current: SubscribeItem = null;
  let timeout: NodeJS.Timeout;

  subscribe.subscribe((v) => {
    const sorted = v.sort((a, b) => a.id - b.id);
    if (sorted.length === 0) return (current = null);
    if (JSON.stringify(sorted[0]) === JSON.stringify(current)) return;
    if (current === null) {
      current = sorted[0];
    } else {
      current = null;
      timeout = setTimeout(() => (current = sorted[0]), 300);
    }
  });

  onDestroy(() => {
    clearTimeout(timeout);
  });
</script>

<div
  class={[
    'max-h-full h-screen flex',
    $config.vertical === 'top' ? 'items-start' : '',
    $config.vertical === 'center' ? 'items-center' : '',
    $config.vertical === 'bottom' ? 'items-end' : ''
  ]
    .filter(Boolean)
    .join(' ')}
  style={[$config.disablePadding ? '' : `padding: ${$config.fontSize}px`]
    .filter(Boolean)
    .join('; ')}
>
  {#key current}
    {#if current}
      <Notification {current} />
    {/if}
  {/key}
</div>
