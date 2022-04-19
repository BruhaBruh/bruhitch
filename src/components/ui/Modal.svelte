<script lang="ts">
  import Typography from '@components/ui/Typography.svelte';

  export let header: string;
</script>

<section
  class="py-4 md:py-8 max-w-lg w-full rounded-lg bg-gray-lightest  dark:bg-gray-darkest border border-gray-base shadow-lg flex flex-col"
  on:mousedown|stopPropagation
>
  <header class="mb-4 px-4 md:px-8">
    <Typography variant="h2">{header}</Typography>
  </header>
  <article class="flex-grow px-4 md:px-8 ">
    <slot />
  </article>
  {#if $$slots.footer}
    <footer class="mt-6 px-4 md:px-8">
      <slot name="footer" />
    </footer>
  {/if}
</section>
