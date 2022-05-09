<script lang="ts">
  import { getEasing } from '$lib/stores/chat/config';
  import config from '$lib/stores/donate/config';
  import type { DonateItem } from '$lib/stores/donate/donate';
  import { Animation } from '$types/animation';
  import Text from '@components/donate/widget/Text.svelte';
  import { fade, scale, slide } from 'svelte/transition';
  import Heading from './Heading.svelte';

  export let current: DonateItem;

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
      </div>
    {/if}
    <Heading
      username={current.data.username}
      currency={current.data.currency}
      amount={current.data.amount}
      isAudio={current.data.message_type === 'audio'}
    />
    {#if current.data.message_type !== 'audio'}
      <Text text={current.data.message} />
    {/if}
  </div>
</div>
