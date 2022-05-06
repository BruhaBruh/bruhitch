<script lang="ts">
  import { getEasing } from '$lib/stores/chat/config';
  import config from '$lib/stores/prediction/config';
  import prediction, { showPrediction } from '$lib/stores/prediction/prediction';
  import { Animation } from '$types/animation';
  import { fade, scale, slide } from 'svelte/transition';
  import Row from './Row.svelte';

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

{#if $showPrediction}
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
      <h1 class="font-semibold" style={`color: ${$config.textColor};`}>
        {$prediction.data.title}
      </h1>
      {#each $prediction.data.outcomes as outcome (outcome.id)}
        <Row {outcome} />
      {/each}
    </div>
  </div>
{/if}
