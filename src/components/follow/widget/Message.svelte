<script lang="ts">
  import { browser } from '$app/env';
  import { getEasing } from '$lib/stores/chat/config';
  import config from '$lib/stores/follow/config';
  import follow from '$lib/stores/follow/follow';
  import { Animation } from '$types/animation';
  import type { TwitchEventFollowData } from '$types/ws';
  import { onDestroy, onMount } from 'svelte';
  import { fade, scale, slide } from 'svelte/transition';
  import UserName from './UserName.svelte';

  export let id: number;
  export let current: TwitchEventFollowData;
  let timeout: NodeJS.Timeout;

  onMount(() => {
    if (!browser) return;
    timeout = setTimeout(() => {
      follow.removeById(id);
    }, 3000);
  });

  onDestroy(() => {
    clearTimeout(timeout);
  });

  const getAnimation = (animation: Animation) => {
    switch (animation) {
      case Animation.Slide:
        return slide;
      case Animation.Fade:
        return fade;
      case Animation.Scale:
        return scale;
      default:
        return undefined;
    }
  };

  $: animation = getAnimation($config.animation);

  let beforeUsername: string = '';
  let afterUsername: string = '';

  const withReplaceImages = (str: string) => {
    const imageRegex = /!\[([^\]]*)\]\((.*?)(?=\"|\))\)/gi;

    return str
      .replaceAll(
        imageRegex,
        `<span class="emote"><span style="width: 0.5em; height: 0.5em;"><img class="emote-image" src="$2" alt="$1"/></span></span>`
      )
      .split(' ')
      .join(' ');
  };

  $: {
    const [before, after] = $config.pattern.split('$username$');

    beforeUsername = withReplaceImages(before);
    afterUsername = withReplaceImages(after);
  }
</script>

<div
  in:animation={{
    ...$config.animationParams,
    duration: 150,
    delay: 250,
    easing: getEasing($config.animationEasing)
  }}
  out:animation={{
    ...$config.animationParams,
    duration: 150,
    easing: getEasing($config.animationEasing)
  }}
>
  <div
    class="whitespace-nowrap relative overflow-hidden"
    style={`padding: ${$config.fontSize}px; border-radius: ${$config.fontSize}px; font-size: ${
      $config.fontSize * 2
    }px; background-color: rgba(17, 17, 17, 0.75); color: #fafafa`}
  >
    {#if $config.backgroundImage}
      <img
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-h-full min-w-full"
        style="z-index: -1"
        src={$config.backgroundImage}
        alt=""
      />
    {/if}
    {@html beforeUsername}<UserName username={current.user_name} />{@html afterUsername}
  </div>
</div>

<style>
  :global(.emote) {
    margin-right: 0.25em;
  }

  :global(.emote-image) {
    position: relative;
    top: -0.1em;
    height: 1.1875em;
    display: inline-block;
  }
</style>
