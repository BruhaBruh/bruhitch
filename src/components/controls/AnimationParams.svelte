<script lang="ts">
  import type { AnimationParams, ShowAnimationParams } from '$types/animation';
  import TextField from '@components/ui/TextField.svelte';
  import LL from '@i18n/i18n-svelte';
  import DurationInput from './DurationInput.svelte';
  import OpacityInput from './OpacityInput.svelte';
  import StartInput from './StartInput.svelte';

  export let animationParams: AnimationParams;
  export let showAnimationParams: ShowAnimationParams;

  $: show =
    showAnimationParams.duration || showAnimationParams.start || showAnimationParams.opacity;
</script>

{#if show}
  <TextField title={$LL.controls.animationParams.name()}>
    <div class={'flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2'}>
      {#if showAnimationParams.duration}
        <DurationInput bind:duration={animationParams.duration} />
      {/if}
      {#if showAnimationParams.start}
        <StartInput bind:start={animationParams.start} />
      {/if}
      {#if showAnimationParams.opacity}
        <OpacityInput bind:opacity={animationParams.opacity} />
      {/if}
    </div>
  </TextField>
{/if}
