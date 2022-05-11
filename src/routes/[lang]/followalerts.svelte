<script lang="ts" context="module">
  import { me } from '$lib/stores/me';
  import Controls from '@components/follow/Controls.svelte';
  import PreviewFollow from '@components/follow/PreviewFollow.svelte';
  import Typography from '@components/ui/Typography.svelte';
  import LL from '@i18n/i18n-svelte';
</script>

<script lang="ts">
</script>

<svelte:head>
  <title>{$LL.pageNames.another($LL.followAlerts.name())}</title>
</svelte:head>

{#if $me}
  <div class="grid grid-cols-2 sm:grid-cols-12 gap-8">
    <Typography variant="h1" class="col-span-full">
      {$LL.followAlerts.title()}
    </Typography>
    <PreviewFollow class="col-span-full md:col-span-4 sm:order-1 sm:sticky top-0" />
    <Controls class="col-span-full md:col-span-8" />
  </div>
{:else}
  <div>
    <Typography variant="h1">
      {$LL.authorization()}
    </Typography>
  </div>
{/if}
