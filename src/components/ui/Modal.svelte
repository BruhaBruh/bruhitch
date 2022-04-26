<script lang="ts">
  import Typography from '@components/ui/Typography.svelte';
  import { createEventDispatcher } from 'svelte';
  import Backdrop from './Backdrop.svelte';
  import Portal from './Portal.svelte';

  const dispatch = createEventDispatcher();

  export let header: string;
  export let show: boolean = false;

  const handleClose = () => {
    dispatch('close');
  };
</script>

{#if show}
  <Portal target="#app-container">
    <Backdrop
      class="fixed z-40 top-0 left-0 w-full min-h-screen flex justify-center items-center p-2"
      on:mousedown={handleClose}
    >
      <section
        class="py-4 md:py-8 max-w-lg w-full rounded-lg bg-gray-lightest  dark:bg-gray-darkest border border-gray-base shadow-lg flex flex-col"
        on:mousedown|stopPropagation
      >
        <header class="mb-4 px-4 md:px-8">
          <Typography variant="h2">{header}</Typography>
        </header>
        <article class="flex-grow px-4 md:px-8 text-gray-darket dark:text-gray-lighter">
          <slot />
        </article>
        {#if $$slots.footer}
          <footer class="mt-6 px-4 md:px-8">
            <slot name="footer" />
          </footer>
        {/if}
      </section>
    </Backdrop>
  </Portal>
{/if}
