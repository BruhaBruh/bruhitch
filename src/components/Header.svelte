<script lang="ts">
  import { ui } from '$lib/stores/ui';
  import { locale } from '@i18n/i18n-svelte';
  import { onDestroy, onMount } from 'svelte';
  import IconButton from './ui/IconButton.svelte';
  import Typography from './ui/Typography.svelte';

  let mql: MediaQueryList;
  let matches = true;

  const mediaListener = (e: MediaQueryListEvent) => {
    matches = e.matches;
  };

  onMount(() => {
    mql = window.matchMedia('(min-width: 1280px)');
    matches = mql.matches;
    mql.addEventListener('change', mediaListener);
  });

  onDestroy(() => {
    if (mql) mql.removeEventListener('change', mediaListener);
  });
</script>

<header
  class="col-span-full bg-gray-lightest dark:bg-gray-darkest h-20 px-2 sm:px-4 flex items-center justify-between xl:justify-start"
>
  <a href={`/${$locale}`} class="h-10 flex items-center rounded-default px-4">
    <Typography
      variant="h3"
      class="hover:text-gray-darker dark:hover:text-gray-lighter transition ease-in"
    >
      Bruhitch
    </Typography>
  </a>

  {#if !matches}
    <IconButton icon="menu" color="secondary" on:click={() => ui.sidebar.set(true)} />
  {/if}
</header>
