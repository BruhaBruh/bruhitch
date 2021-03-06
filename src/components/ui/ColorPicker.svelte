<script lang="ts">
  import * as chroma from 'chroma-js';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  export let hue: number = 0; // 0-360
  export let saturation = 1;
  export let value = 0.5;
  export let hex: string = '#FF0000'; // OUTPUT

  let picker: HTMLDivElement;
  let scrollableElement: HTMLElement;
  let isMouseDown = false;

  $: hex = chroma.hsv(hue, saturation, value).hex();

  onMount(() => {
    const color = chroma.hex(hex).hsv();
    hue = color[0];
    saturation = color[1];
    value = color[2];
    scrollableElement = document.querySelector('#main-component');
  });

  const updateByEvent = (e: MouseEvent) => {
    if (!scrollableElement) return;
    const x =
      e.clientX + scrollableElement.scrollLeft - (e.currentTarget as HTMLElement).offsetLeft;
    const y = e.clientY + scrollableElement.scrollTop - (e.currentTarget as HTMLElement).offsetTop;

    const s = x / picker.clientWidth;
    const v = y / picker.clientHeight;

    saturation = s < 0 ? 0 : s > 1 ? 1 : s;
    const prevalue = v < 0 ? 0 : v > 1 ? 1 : v;
    value = Math.abs(prevalue - 1);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isMouseDown) return;
    updateByEvent(e);
  };

  const handleClick = (e: MouseEvent) => {
    updateByEvent(e);
  };
</script>

<div
  {...$$restProps}
  class={[$$restProps.class, 'relative overflow-hidden'].filter(Boolean).join(' ')}
  style={`background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 255) 100%),
      linear-gradient(to left, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 255) 100%), ${chroma
        .hsl(hue, 1, 0.5)
        .hex()}`}
  on:mousedown={() => (isMouseDown = true)}
  on:mouseup={() => (isMouseDown = false)}
  on:mouseleave={() => (isMouseDown = false)}
  on:mousemove={handleMouseMove}
  on:click={handleClick}
  bind:this={picker}
>
  {#if hex}
    <span
      class={[
        'absolute -translate-x-1/2 -translate-y-1/2 border rounded-full w-4 h-4',
        chroma.contrast(hex, 'white') < 6 ? 'border-gray-darkest' : 'border-gray-lightest'
      ]
        .filter(Boolean)
        .join(' ')}
      style={`background: ${hex}; top: ${Math.abs(1 - value) * 100}%; left: ${saturation * 100}%`}
      transition:fade={{ duration: 150 }}
    />
  {/if}
</div>
