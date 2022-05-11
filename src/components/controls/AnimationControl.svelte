<script lang="ts">
  import type {
    Animation,
    AnimationEasing,
    AnimationParams as AnimationParamsType,
    ShowAnimationParams
  } from '$types/animation';
  import TextField from '@components/ui/TextField.svelte';
  import LL from '@i18n/i18n-svelte';
  import AnimationParams from './AnimationParams.svelte';
  import AnimationSelect from './AnimationSelect.svelte';
  import EasingSelect from './EasingSelect.svelte';

  export let animation: Animation;
  export let easing: AnimationEasing;
  export let showEasing: boolean;
  export let animationParams: AnimationParamsType;
  export let showAnimationParams: ShowAnimationParams;
</script>

<div class="mb-4">
  <TextField title={$LL.controls.animation()} class="mb-4">
    <div class={'flex space-x-2'}>
      <AnimationSelect bind:animation />
      {#if showEasing}
        <EasingSelect bind:easing />
      {/if}
    </div>
  </TextField>
  <AnimationParams bind:animationParams bind:showAnimationParams />
</div>
