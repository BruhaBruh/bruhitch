<script lang="ts">
  import { ui } from '$lib/stores/ui';
</script>

<div class:dark={$ui.isDarkTheme}>
  <div
    {...$$restProps}
    id="app-container"
    class={[
      'font-sans h-screen w-full bg-gray-lightest text-gray-darkest dark:bg-gray-darkest dark:text-gray-lightest relative transition ease-in overflow-hidden',
      $$restProps.class
    ]
      .filter(Boolean)
      .join(' ')}
  >
    <slot />
  </div>
</div>
