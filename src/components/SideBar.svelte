<script lang="ts">
  import { privateRoutes, publicRoutes } from '$lib/indexRoutes';
  import { me } from '$lib/stores/me';
  import { ui } from '$lib/stores/ui';
  import LL, { locale } from '@i18n/i18n-svelte';
  import { onDestroy, onMount } from 'svelte';
  import { fade, fly, slide } from 'svelte/transition';
  import SideBarDivider from './SideBarDivider.svelte';
  import Button from './ui/Button.svelte';
  import Icon from './ui/Icon.svelte';
  import Switch from './ui/Switch.svelte';
  import Typography from './ui/Typography.svelte';

  $: routes = $me
    ? privateRoutes.filter((v) => v.isWorking && v.LL !== 'settings')
    : publicRoutes.filter((v) => v.isWorking && v.LL !== 'settings');

  $: settingsRoute = publicRoutes.find((v) => v.LL === 'settings');

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

{#if matches ? true : $ui.isOpenedSidebar}
  <aside
    id="side-bar"
    class="col-span-3 3xl:col-span-2 w-full min-h-full max-h-full absolute xl:relative xl:bg-gray-lightest dark:bg-gray-darkest bg-opacity-90 sm:bg-opacity-100 overflow-y-auto py-6 px-2 sm:px-4 flex flex-col items-stretch justify-end xl:justify-start text-gray-lightest xl:text-inherit"
    in:fly={{ duration: matches ? 0 : 150, x: 0, y: -500 }}
  >
    {#if !matches}
      <button
        class="flex items-center justify-between h-10 mb-auto hover:bg-gray-darker rounded-default px-4 transition ease-in select-none cursor-pointer text-gray-lighter"
        on:click={() => ui.sidebar.set(false)}
      >
        <Typography variant="button">{$LL.close()}</Typography>
        <Icon icon="cancel" class="fill-current" />
      </button>
    {/if}
    {#each routes as route (route.path)}
      <a
        href={`/${$locale}/${route.path}`}
        class="flex items-center h-10 mb-2 hover:bg-gray-darker xl:hover:bg-gray-lighter dark:hover:bg-gray-darker rounded-default px-4 transition ease-in"
        transition:slide={{ duration: 150 }}
      >
        <Typography variant="button">{$LL[route.LL].name()}</Typography>
      </a>
    {/each}
    <SideBarDivider class="my-4" />
    <div
      class="flex items-center justify-between h-10 mb-2 hover:bg-gray-darker xl:hover:bg-gray-lighter dark:hover:bg-gray-darker rounded-default px-4 transition ease-in select-none cursor-pointer"
      on:click={ui.theme.toggle}
      role="button"
    >
      <Typography variant="button">{$LL.settings.darkTheme()}</Typography>
      <Switch isSelected={$ui.isDarkTheme} />
    </div>
    {#if settingsRoute}
      <a
        href={`/${$locale}/${settingsRoute.path}`}
        class="flex items-center h-10 mb-2 hover:bg-gray-darker xl:hover:bg-gray-lighter dark:hover:bg-gray-darker rounded-default px-4 transition ease-in"
        transition:slide={{ duration: 150 }}
      >
        <Typography variant="button">{$LL[settingsRoute.LL].name()}</Typography>
      </a>
    {/if}
    <SideBarDivider class="my-4" />
    {#if $me}
      <div in:fade={{ duration: 150, delay: 250 }} out:fade={{ duration: 150 }}>
        <Button color="danger" link href="/api/v1/auth/logout">
          {$LL.logout()}
        </Button>
      </div>
    {:else}
      <div in:fade={{ duration: 150, delay: 250 }} out:fade={{ duration: 150 }}>
        <Button color="primary" link href="/api/v1/auth/login">
          {$LL.continueWithTwitch()}
        </Button>
      </div>
    {/if}
  </aside>
{/if}
