<script lang="ts">
  import { ui } from '$lib/stores/ui';
</script>

<main
id="main-component"
  class="bg-gray-lightest dark:bg-gray-darkest col-span-full xl:col-span-9 3xl:col-span-10 p-4 sm:p-8 xl:border-l xl:border-t border-gray-base rounded-tl-default overflow-y-scroll"
>
  <slot />
</main>
