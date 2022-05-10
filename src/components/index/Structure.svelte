<script lang="ts">
  import Typography from '@components/ui/Typography.svelte';
  import LL from '@i18n/i18n-svelte';
  import ClientTechnologies from './ClientTechnologies.svelte';
  import Links from './Links.svelte';
  import ServerTechnologies from './ServerTechnologies.svelte';
</script>

<Typography variant="h2" class="mb-4">{$LL.index.structure.title()}</Typography>
<ClientTechnologies />
<ServerTechnologies />
<Links />
