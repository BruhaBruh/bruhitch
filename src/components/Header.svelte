<script lang="ts">
  import { ui } from '$lib/stores/ui';
  import Typography from '@components/ui/Typography.svelte';
  import { locale } from '@i18n/i18n-svelte';
  import IconButton from './ui/IconButton.svelte';

  let isDarkTheme = $ui.isDarkTheme;

  $: ui.theme.set(isDarkTheme);
</script>

<header
  class="w-full h-16 border-b border-gray-base shadow-xs px-2 sm:px-4 flex items-center justify-between sticky top-0 z-30 bg-gray-lightest dark:bg-gray-darkest"
>
  <nav>
    <a href={`/${$locale}`}>
      <Typography variant="h3">Bruhitch</Typography>
    </a>
  </nav>
  <IconButton icon="menu" color="secondary" on:click={() => ui.drawer.set(true)} />
  <!-- {#if $me}
    <a href="/api/v1/auth/logout" class="flex space-x-2 items-center">
      <Typography variant="button">{$me.username}</Typography>
      <Avatar size="large" variant="circle" src={$me.avatar} alt={$me.username} />
    </a>
  {:else}
    <Button color="primary" link href="/api/v1/auth/login">{$LL.continueWithTwitch()}</Button>
  {/if} -->
</header>
