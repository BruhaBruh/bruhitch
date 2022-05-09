<script lang="ts">
  import config from '$lib/stores/donate/config';
  import type { DonateItem } from '$lib/stores/donate/donate';
  import donate from '$lib/stores/donate/donate';
  import Notification from '@components/donate/widget/Notification.svelte';
  import { Howl } from 'howler';
  import { onDestroy } from 'svelte';

  let current: DonateItem = null;
  let timeout: NodeJS.Timeout;
  let isPlaying = false;

  const waitUntilIsPlaying = (id: number) => {
    current = null;
    timeout = setTimeout(() => {
      if (isPlaying) {
        waitUntilIsPlaying(id);
      } else {
        donate.removeById(id);
      }
    }, 250);
  };

  donate.subscribe((v) => {
    if (isPlaying) return;
    const sorted = v.sort(
      (a, b) => new Date(a.data.created_at).getTime() - new Date(b.data.created_at).getTime()
    );
    if (sorted.length === 0) return (current = null);
    if (JSON.stringify(sorted[0]) === JSON.stringify(current)) return;
    if (current !== null) return;
    current = sorted[0];
    if (current.data.message_type === 'audio') {
      const sound = new Howl({
        src: [`/api/v1/donationalerts/sound?url=${current.data.message}`],
        autoplay: true,
        loop: false,
        volume: $config.volume,
        format: ['wav', 'webm', 'mp3']
      });
      isPlaying = true;
      sound.on('end', () => {
        isPlaying = false;
      });
      sound.on('playerror', () => {
        isPlaying = false;
      });
      sound.on('loaderror', () => {
        isPlaying = false;
      });
    }
    timeout = setTimeout(() => {
      if (isPlaying) {
        waitUntilIsPlaying(current.id);
      } else {
        donate.removeById(current.id);
        current = null;
      }
    }, $config.hideDelay);
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
