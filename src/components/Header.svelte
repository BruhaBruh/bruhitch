<script lang="ts">
  import { ui } from '$lib/stores/ui';
  import Switch from './ui/Switch.svelte';
  import Typography from './ui/Typography.svelte';

  let isDarkTheme = $ui.isDarkTheme;

  $: ui.theme.set(isDarkTheme);
</script>

<header class="w-full border-b border-gray-base shadow-xs">
  <nav class="h-16 container mx-auto px-2 sm:px-4 flex items-center justify-between">
    <a href="/" sveltekit:prefetch>
      <Typography variant="h2">Bruhitch</Typography>
    </a>
    <Switch bind:isSelected={isDarkTheme} />
  </nav>
</header>
