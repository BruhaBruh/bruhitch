<script lang="ts">
  import { Animation, AnimationEasing, type AnimationParams } from '$types/animation';
  import Input from '@components/ui/Input.svelte';
  import type { SelectItem } from '@components/ui/Select';
  import Select from '@components/ui/Select.svelte';
  import TextField from '@components/ui/TextField.svelte';
  import LL from '@i18n/i18n-svelte';

  let animations: SelectItem[] = [
    { value: Animation.Slide, label: 'Slide' },
    { value: Animation.Scale, label: 'Scale' },
    { value: Animation.Fade, label: 'Fade' },
    { value: Animation.Nothing, label: 'Nothing' }
  ];

  let easing: SelectItem[] = Object.values(AnimationEasing).map((v) => ({ value: v, label: v }));

  export let animation: Animation;
  export let animationEasing: AnimationEasing;
  export let animationParams: AnimationParams;

  let selectedAnimation = [animation];
  let selectedEasing = [animationEasing];
  let duration = animationParams.duration;
  let start = animationParams.start;
  let opacity = animationParams.opacity;

  $: animation = selectedAnimation[0];
  $: animationEasing = selectedEasing[0];
  $: animationParams = {
    duration,
    start,
    opacity
  };
</script>

<div {...$$restProps}>
  <TextField title={$LL.chat.animation()} class="mb-4">
    <div class={'flex space-x-2'}>
      <Select bind:selected={selectedAnimation} values={animations} class="flex-1" />
      {#if animation !== Animation.Nothing}
        <Select bind:selected={selectedEasing} values={easing} class="flex-1" />
      {/if}
    </div>
  </TextField>
  {#if animation !== Animation.Nothing}
    <TextField title={$LL.chat.animationParams.name()}>
      <div class={'flex space-x-2'}>
        <Input
          class="flex-1"
          bind:value={duration}
          placeholder={$LL.chat.animationParams.duration()}
        />
        {#if animation === Animation.Scale}
          <Input
            class="flex-1"
            bind:value={start}
            placeholder={$LL.chat.animationParams.startScale()}
          />
          <Input
            class="flex-1"
            bind:value={opacity}
            placeholder={$LL.chat.animationParams.opacity()}
          />
        {/if}
      </div>
    </TextField>
  {/if}
</div>
