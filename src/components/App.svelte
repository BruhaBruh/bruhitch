<script lang="ts">
  export let isDark: boolean;
</script>

<div class:dark={isDark}>
  <div
    class="font-sans h-screen overflow-y-auto bg-gray-lightest text-gray-darkest dark:bg-gray-darkest dark:text-gray-lightest relative"
  >
    <slot />
  </div>
</div>
