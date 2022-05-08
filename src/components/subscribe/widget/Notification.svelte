<script lang="ts">
  import { getEasing } from '$lib/stores/chat/config';
  import config from '$lib/stores/subscribe/config';
  import type { SubscribeItem } from '$lib/stores/subscribe/subscribe';
  import subscribe from '$lib/stores/subscribe/subscribe';
  import { Animation } from '$types/animation';
  import { rawDataSymbol } from '@twurple/common';
  import { onDestroy, onMount } from 'svelte';
  import { fade, scale, slide } from 'svelte/transition';
  import Heading from './Heading.svelte';
  import Icons from './Icons.svelte';
  import Message from './Message.svelte';

  export let current: SubscribeItem;
  $: rawData = current?.data[rawDataSymbol];
  let timeout: NodeJS.Timeout;

  onMount(() => {
    timeout = setTimeout(() => {
      subscribe.removeById(current.id);
    }, 5000);
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
</script>

<div
  class="w-full"
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
    {#if $config.image}
      <div
        class="w-full relative overflow-hidden"
        style={`aspect-ratio: 4 / 3; border-radius: ${$config.fontSize / 2}px; margin-bottom: ${
          $config.fontSize / 2
        }px`}
      >
        <img src={$config.image} alt="" class="absolute top-0 left-0 min-w-full min-h-full" />
        <Icons
          class="absolute"
          style={`bottom: ${$config.fontSize / 2}px; right: ${$config.fontSize / 2}px;`}
          tier={current.data.subPlan}
          months={current.data.cumulativeMonths}
          streak={current.data.streakMonths}
          isGift={current.data.isGift}
        />
      </div>
    {/if}
    <Heading msg={current.data} />
    {#if current.data.message}
      <Message message={current.data.message} />
    {/if}
    {#if !$config.image}
      <Icons
        toRight
        style={`margin-top: ${$config.fontSize}px;`}
        tier={current.data.subPlan}
        months={current.data.cumulativeMonths}
        streak={current.data.streakMonths}
        isGift={current.data.isGift}
      />
    {/if}
  </div>
</div>
