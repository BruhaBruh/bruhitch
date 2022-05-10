<script lang="ts">
  import Typography from '@components/ui/Typography.svelte';
  import LL from '@i18n/i18n-svelte';
  import LinksGrid from './LinksGrid.svelte';
</script>

<Typography variant="h2" class="mb-4">{$LL.index.links.title()}</Typography>
<LinksGrid />
