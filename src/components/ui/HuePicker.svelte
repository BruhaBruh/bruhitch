<script lang="ts">
  import { onMount } from 'svelte';

  export let variant: 'vertical' | 'horizontal' = 'vertical';
  export let hue = 0; // 0-360

  let picker: HTMLDivElement;
  let app: HTMLDivElement;

  let position = hue / 360;
  let isMouseDown = false;

  onMount(() => {
    app = document.querySelector('#app-container');
  });

  $: {
    if (hue / 360 < 0) {
      position = 0;
    } else if (hue / 360 > 1) {
      position = 1;
    } else {
      position = hue / 360;
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isMouseDown) return;
    if (variant === 'horizontal') {
      const x = e.clientX + app.scrollLeft - picker.offsetLeft;
      hue = (x / picker.clientWidth) * 360;
    } else {
      const y = e.clientY + app.clientTop - picker.offsetTop;
      hue = (y / picker.clientHeight) * 360;
    }
  };

  const handleClick = (e: MouseEvent) => {
    if (variant === 'horizontal') {
      const x = e.pageX - picker.offsetLeft;
      hue = (x / picker.clientWidth) * 360;
    } else {
      const y = e.pageY - picker.offsetTop;
      hue = (y / picker.clientHeight) * 360;
    }
  };
</script>

<div
  {...$$restProps}
  class={[
    $$restProps.class,
    'relative',
    variant === 'vertical' ? 'hue-picker-vertical' : 'hue-picker-horizontal'
  ]
    .filter(Boolean)
    .join(' ')}
  on:mousedown={() => (isMouseDown = true)}
  on:mouseup={() => (isMouseDown = false)}
  on:mouseleave={() => (isMouseDown = false)}
  on:mousemove={handleMouseMove}
  on:click={handleClick}
  bind:this={picker}
>
  <span
    class={[
      'bg-gray-darkest dark:bg-gray-lightest absolute',
      variant === 'vertical' ? 'w-full h-0.5 -translate-y-1/2' : 'h-full w-0.5 -translate-x-1/2'
    ]
      .filter(Boolean)
      .join(' ')}
    style={variant === 'vertical' ? `top: ${position * 100}%` : `left: ${position * 100}%`}
  />
</div>

<style lang="postcss">
  .hue-picker-vertical {
    background: linear-gradient(
      to bottom,
      #f00 0%,
      #ff0 16.66%,
      #0f0 33.33%,
      #0ff 50%,
      #00f 66.66%,
      #f0f 83.33%,
      #f00 100%
    );
  }
  .hue-picker-horizontal {
    background: linear-gradient(
      to right,
      #f00 0%,
      #ff0 16.66%,
      #0f0 33.33%,
      #0ff 50%,
      #00f 66.66%,
      #f0f 83.33%,
      #f00 100%
    );
  }
</style>
