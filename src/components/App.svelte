<script lang="ts">
  import { ui } from '$lib/stores/ui';
</script>

<div class:dark={$ui.isDarkTheme}>
  <div
    class="font-sans h-screen overflow-y-auto bg-gray-lightest text-gray-darkest dark:bg-gray-darkest dark:text-gray-lightest relative transition ease-in"
  >
    <slot />
  </div>
</div>
