<script lang="ts" context="module">
  import DeleteAccount from '@components/settings/DeleteAccount.svelte';
  import RefreshTwitchToken from '@components/settings/RefreshTwitchToken.svelte';
  import SelectLocale from '@components/settings/SelectLocale.svelte';
  import Typography from '@components/ui/Typography.svelte';
  import LL from '@i18n/i18n-svelte';
</script>

<script lang="ts">
</script>

<svelte:head>
  <title>{$LL.pageNames.another($LL.settings.name())}</title>
</svelte:head>

<div class="container mx-auto">
  <Typography variant="h1" class="mb-8">{$LL.settings.name()}</Typography>

  <SelectLocale />
  <RefreshTwitchToken />
  <DeleteAccount />
</div>
