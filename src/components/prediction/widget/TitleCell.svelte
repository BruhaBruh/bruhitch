<script lang="ts">
  import { getColorWithAlpha } from '$lib/color';
  import config from '$lib/stores/prediction/config';

  export let title: string;
  export let color: 'pink' | 'blue';
  export let isWin: boolean;

  let winColor = '';

  $: {
    const currentColor = color === 'blue' ? $config.blueColor : $config.pinkColor;

    const [r, g, b, a] = getColorWithAlpha(currentColor);

    winColor = `rgba(${r}, ${g}, ${b}, ${a})`;
  }
</script>

<div
  class="cell flex items-center transition ease-in"
  style={`background-color: ${isWin ? winColor : 'rgba(17, 17, 17, 0.75)'}; border-radius: ${
    $config.fontSize / 2
  }px; padding: 0px ${$config.fontSize / 2}px; height: ${$config.fontSize * 2.5}px; font-size: ${
    $config.fontSize * 1.5
  }px`}
>
  <p>{title}</p>
  <div
    class="rounded-full aspect-square transition ease-in"
    style={`height: ${$config.fontSize}px; background-color: ${
      isWin ? 'rgba(17, 17, 17, 1)' : color === 'blue' ? $config.blueColor : $config.pinkColor
    }`}
  />
</div>
