<script lang="ts">
  export let value = '#000000';
</script>

<input
  {...$$restProps}
  bind:value
  type="color"
  class="w-10 h-10 p-1 rounded-default bg-gray-lightest dark:bg-gray-darkest border border-gray-base appearance-none flex"
/>
