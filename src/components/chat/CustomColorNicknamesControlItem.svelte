<script lang="ts">
  import type { NicknameColor } from '$types/chat/nickname';
  import Button from '@components/ui/Button.svelte';
  import Typography from '@components/ui/Typography.svelte';
  import LL from '@i18n/i18n-svelte';
  import { scale } from 'chroma-js';
  import { createEventDispatcher } from 'svelte';
  import { slide } from 'svelte/transition';

  export let nickname: string;
  export let color: NicknameColor;

  $: colorString = typeof color === 'string' ? color : `${color.start} - ${color.end}`;
  $: colorStart = typeof color === 'string' ? color : color.start;
  $: colorEnd = typeof color === 'string' ? color : color.end;

  $: gradient = scale([colorStart, colorEnd]).mode('hcl').colors(8, 'hex');

  const dispatch = createEventDispatcher();

  const handleClick = () => {
    dispatch('remove');
  };
</script>

<li class="flex" transition:slide>
  <Typography variant="b1" class="w-full">
    <span
      style={`background: linear-gradient(to right, ${gradient.join(
        ', '
      )}); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent`}
    >
      {nickname}
    </span>
    {colorString}
  </Typography>
  <Button color="danger" on:click={handleClick}>
    {$LL.remove()}
  </Button>
</li>
