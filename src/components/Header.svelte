<script lang="ts">
  import { ui } from '$lib/stores/ui';
  import Switch from '@components/ui/Switch.svelte';
  import Typography from '@components/ui/Typography.svelte';
  import { locale } from '@i18n/i18n-svelte';

  let isDarkTheme = $ui.isDarkTheme;

  $: ui.theme.set(isDarkTheme);
</script>

<header class="w-full border-b border-gray-base shadow-xs">
  <nav class="h-16 container mx-auto px-2 sm:px-4 flex items-center justify-between">
    <a href={'/' + $locale} sveltekit:prefetch>
      <Typography variant="h3">Bruhitch</Typography>
    </a>
    <Switch bind:isSelected={isDarkTheme} />
  </nav>
</header>
