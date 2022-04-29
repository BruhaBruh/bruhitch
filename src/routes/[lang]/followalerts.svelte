<script lang="ts" context="module">
</script>

<script lang="ts">
  import { me } from '$lib/stores/me';
  import Controls from '@components/follow/Controls.svelte';
  import PreviewFollow from '@components/follow/PreviewFollow.svelte';
  import Typography from '@components/ui/Typography.svelte';
  import LL from '@i18n/i18n-svelte';
</script>

<svelte:head>
  <title>{$LL.pageNames.another($LL.followAlerts.name())}</title>
</svelte:head>

{#if $me}
  <div class="container mx-auto grid grid-cols-12 gap-8">
    <Typography variant="h1" class="col-span-12">
      {$LL.followAlerts.title()}
    </Typography>
    <Controls class="col-span-12 md:col-span-6" />
    <PreviewFollow class="col-span-12 md:col-span-6" />
  </div>
{:else}
  <div class="container mx-auto">
    <Typography variant="h1" class="col-span-12">
      {$LL.authorization()}
    </Typography>
  </div>
{/if}
