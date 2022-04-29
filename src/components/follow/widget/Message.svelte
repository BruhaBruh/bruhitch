<script lang="ts">
  import { browser } from '$app/env';
  import { getEasing } from '$lib/stores/chat/config';
  import config from '$lib/stores/follow/config';
  import follow from '$lib/stores/follow/follow';
  import { Animation } from '$types/animation';
  import type { TwitchEventFollowData } from '$types/ws';
  import { hex, scale } from 'chroma-js';
  import * as sanitizeHtml from 'sanitize-html';
  import { onDestroy, onMount } from 'svelte';
  import { fade, scale as Scale, slide } from 'svelte/transition';

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

  let nicknameStartColor = $config.colorNickname;
  let nicknameEndColor = $config.isGradientNickname
    ? hex($config.colorNickname).brighten(1.15).hex()
    : $config.colorNickname;

  $: gradient = scale([nicknameStartColor, nicknameEndColor]).mode('hcl').colors(8, 'hex');

  $: bg = hex($config.backgroundColor).alpha(0.75).hex();

  const getAnimation = (animation: Animation) => {
    switch (animation) {
      case Animation.Slide:
        return slide;
      case Animation.Fade:
        return fade;
      case Animation.Scale:
        return Scale;
      default:
        return undefined;
    }
  };

  $: animation = getAnimation($config.animation);

  type Item = {
    type: 'image' | 'text';
    value: string;
  };

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
      .filter(Boolean)
      .join(' ');
  };

  $: {
    const [before, after] = $config.pattern.split('$username$');

    const options: sanitizeHtml.IOptions = {
      allowedTags: ['span', 'img'],
      allowedAttributes: {
        span: ['class', 'style'],
        img: ['class', 'src', 'alt']
      }
    };

    beforeUsername = sanitizeHtml(withReplaceImages(before), options);
    afterUsername = sanitizeHtml(withReplaceImages(after), options);
  }
</script>

<div
  in:animation={{
    duration: 150,
    delay: 250,
    ...$config.animationParams,
    easing: getEasing($config.animationEasing)
  }}
  out:animation={{
    duration: 150,
    ...$config.animationParams,
    easing: getEasing($config.animationEasing)
  }}
>
  <div
    class="whitespace-nowrap relative overflow-hidden"
    style={`padding: ${$config.fontSize}px; border-radius: ${$config.fontSize}px; font-size: ${
      $config.fontSize * 2
    }px; background-color: ${bg}; color: ${$config.textColor}`}
  >
    {#if $config.backgroundImage}
      <img
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-h-full min-w-full"
        style="z-index: -1"
        src={$config.backgroundImage}
        alt=""
      />
    {/if}

    {@html beforeUsername}
    <span
      class="font-semibold"
      style={`background: linear-gradient(to right, ${gradient.join(
        ', '
      )}); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent`}
      >{current.user_name}</span
    >
    {@html afterUsername}
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
