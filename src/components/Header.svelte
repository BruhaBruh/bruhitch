<script lang="ts">
  import { ui } from '$lib/stores/ui';
  import Typography from '@components/ui/Typography.svelte';
  import { locale } from '@i18n/i18n-svelte';

  let isDarkTheme = $ui.isDarkTheme;

  $: ui.theme.set(isDarkTheme);
</script>

<header
  class="w-full h-16 border-b border-gray-base shadow-xs px-2 sm:px-4 flex items-center justify-start"
>
  <nav>
    <a href={'/' + $locale} sveltekit:prefetch>
      <Typography variant="h3">Bruhitch</Typography>
    </a>
  </nav>
</header>
