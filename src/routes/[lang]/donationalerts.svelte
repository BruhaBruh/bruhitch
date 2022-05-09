<script lang="ts" context="module">
  import { me } from '$lib/stores/me';
  import Controls from '@components/donate/Controls.svelte';
  import PreviewDonate from '@components/donate/PreviewDonate.svelte';
  import Typography from '@components/ui/Typography.svelte';
  import LL from '@i18n/i18n-svelte';
</script>

<script lang="ts">
</script>

<svelte:head>
  <title>{$LL.pageNames.another($LL.donationAlerts.name())}</title>
</svelte:head>

{#if $me}
  <div class="container mx-auto grid grid-cols-12 gap-8">
    <Typography variant="h1" class="col-span-12">
      {$LL.donationAlerts.title()}
    </Typography>
    <Controls class="col-span-12 md:col-span-8" />
    <PreviewDonate class="col-span-12 md:col-span-4" />
  </div>
{:else}
  <div class="container mx-auto">
    <Typography variant="h1" class="col-span-12">
      {$LL.authorization()}
    </Typography>
  </div>
{/if}
