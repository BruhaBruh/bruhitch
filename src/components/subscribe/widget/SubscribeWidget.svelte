<script lang="ts">
  import config from '$lib/stores/follow/config';
  import subscribe, { type SubscribeItem } from '$lib/stores/subscribe/subscribe';
  import { rawDataSymbol } from '@twurple/common';
  import { onDestroy } from 'svelte';

  let current: SubscribeItem = null;
  let timeout: NodeJS.Timeout;

  subscribe.subscribe((v) => {
    const sorted = v.sort((a, b) => a.id - b.id);
    if (sorted.length === 0) return (current = null);
    if (JSON.stringify(sorted[0]) === JSON.stringify(current)) return;
    if (current === null) {
      current = sorted[0];
      timeout = setTimeout(() => subscribe.removeById(current.id), 5000);
    } else {
      current = null;
      timeout = setTimeout(() => {
        current = sorted[0];

        timeout = setTimeout(() => subscribe.removeById(current.id), 5000);
      }, 300);
    }
  });

  $: rawData = current?.data[rawDataSymbol];

  onDestroy(() => {
    clearTimeout(timeout);
  });
</script>

<div
  class={[
    'max-h-full h-screen flex',
    $config.vertical === 'top' ? 'items-start' : '',
    $config.vertical === 'center' ? 'items-center' : '',
    $config.vertical === 'bottom' ? 'items-end' : '',
    $config.horizontal === 'left' ? 'justify-start' : '',
    $config.horizontal === 'center' ? 'justify-center' : '',
    $config.horizontal === 'right' ? 'justify-end' : ''
  ]
    .filter(Boolean)
    .join(' ')}
  style={[$config.disablePadding ? '' : `padding: ${$config.fontSize}px`]
    .filter(Boolean)
    .join('; ')}
>
  {#key current}
    {#if current}
      {rawData.context}
      <pre>
        {JSON.stringify(rawData, null, 2)}
      </pre>
    {/if}
  {/key}
</div>
