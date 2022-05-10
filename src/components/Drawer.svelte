<script lang="ts">
  import { privateRoutes, publicRoutes } from '$lib/indexRoutes';
  import { me } from '$lib/stores/me';
  import { ui } from '$lib/stores/ui';
  import LL, { locale } from '@i18n/i18n-svelte';
  import { fly } from 'svelte/transition';
  import Avatar from './ui/Avatar.svelte';
  import Backdrop from './ui/Backdrop.svelte';
  import Button from './ui/Button.svelte';
  import Typography from './ui/Typography.svelte';

  $: routes = $me
    ? privateRoutes.filter((v) => v.isWorking)
    : publicRoutes.filter((v) => v.isWorking);
</script>

{#if $ui.IsOpenedDrawer}
  <Backdrop
    class="fixed z-50 top-0 left-0 w-full min-h-screen flex justify-center items-center p-2"
    on:mousedown={() => ui.drawer.set(false)}
  >
    <div
      in:fly={{ duration: 150, y: 0, x: 300 }}
      class="fixed bg-gray-lightest dark:bg-gray-darkest border-l border-gray-base h-screen top-0 right-0 max-w-full ml-4 p-2 sm:p-4 overflow-y-auto"
    >
      <nav class="flex flex-col items-stretch min-h-max">
        {#if $me}
          <a href={`/${$locale}`} class="flex space-x-2 items-center justify-between mb-4">
            <Typography variant="button">{$me.username}</Typography>
            <Avatar size="medium" variant="circle" src={$me.avatar} alt={$me.username} />
          </a>
        {:else}
          <a href={`/${$locale}`} class="mb-4">
            <Typography variant="h3">Bruhitch</Typography>
          </a>
        {/if}
        <div class="w-full h-px bg-gray-base mb-8" />
        {#each routes as route}
          <Button tag="a" href={`/${$locale}/${route.path}`} class="mb-2" color="secondary">
            {$LL[route.LL].name()}
          </Button>
        {/each}
        <div class="w-full h-px bg-gray-base mt-6 mb-8" />
        {#if $me}
          <Button color="danger" link href="/api/v1/auth/logout">{$LL.logout()}</Button>
        {:else}
          <Button color="primary" link href="/api/v1/auth/login">{$LL.continueWithTwitch()}</Button>
        {/if}
      </nav>
    </div>
  </Backdrop>
{/if}
