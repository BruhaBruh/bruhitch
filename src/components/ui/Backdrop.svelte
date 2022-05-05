<script lang="ts">
  import { fade } from 'svelte/transition';
</script>

<div
  {...$$restProps}
  class={[$$restProps.class, 'bg-gray-darkest bg-opacity-50'].filter(Boolean).join(' ')}
  transition:fade={{ duration: 150 }}
  on:click
  on:mousedown
>
  <slot />
</div>
