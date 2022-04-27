<script lang="ts">
  import { browser } from '$app/env';
  import config from '$lib/stores/follow/config';
  import follow from '$lib/stores/follow/follow';
  import type { TwitchEventFollowData } from '$types/ws';
  import { hex, scale } from 'chroma-js';
  import { onDestroy, onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  export let id: number;
  export let current: TwitchEventFollowData;
  let timeout: NodeJS.Timeout;

  onMount(() => {
    if (!browser) return;
    timeout = setTimeout(() => {
      follow.removeById(id);
    }, 2000);
  });

  onDestroy(() => {
    clearTimeout(timeout);
  });

  let nicknameStartColor = $config.color;
  let nicknameEndColor = $config.isGradient
    ? hex($config.color).brighten(1.15).hex()
    : $config.color;

  $: gradient = scale([nicknameStartColor, nicknameEndColor]).mode('hcl').colors(8, 'hex');
</script>

<div transition:fade={{ duration: 150, delay: 150 }} class="text-gray-lightest">
  <div
    class="bg-gray-darkest bg-opacity-75 "
    style={`padding: ${$config.fontSize}px; border-radius: ${$config.fontSize}px; font-size: 12vh`}
  >
    {@html $config.pattern.replace(
      '$username$',
      `<strong style="background: linear-gradient(to right, ${gradient.join(
        ', '
      )}); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent">` +
        current.user_name +
        '</strong>'
    )}
  </div>
</div>
