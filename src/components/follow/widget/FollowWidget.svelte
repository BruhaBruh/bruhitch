<script lang="ts">
  import config from '$lib/stores/follow/config';
  import follow from '$lib/stores/follow/follow';
  import { onDestroy } from 'svelte';
import Message from './Message.svelte';

  let current: number | null = null;
  let timeout: NodeJS.Timeout;

  follow.subscribe((v) => {
    const sorted = v.sort((a, b) => b.id - a.id);
    if (sorted.length === 0) return (current = null);
    if (sorted[0].id === current) return;
    if (current === null) {
      current = sorted[0].id;
    } else {
      current = null;
      timeout = setTimeout(() => (current = sorted[0].id), 300);
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
      <Message id={current} current={$follow.find((v) => v.id === current).data} />
    {/if}
  {/key}
</div>
