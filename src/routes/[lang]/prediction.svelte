<script lang="ts" context="module">
  import { me } from '$lib/stores/me';
  import Controls from '@components/prediction/Controls.svelte';
  import PreviewPrediction from '@components/prediction/PreviewPrediction.svelte';
  import Typography from '@components/ui/Typography.svelte';
  import LL from '@i18n/i18n-svelte';
</script>

<script lang="ts">
</script>

<svelte:head>
  <title>{$LL.pageNames.another($LL.predictionWidget.name())}</title>
</svelte:head>

{#if $me}
  <div class="grid grid-cols-2 sm:grid-cols-12 gap-8">
    <Typography variant="h1" class="col-span-full">
      {$LL.predictionWidget.title()}
    </Typography>
    <PreviewPrediction class="col-span-full md:col-span-4 sm:order-1 sm:sticky top-0" />
    <Controls class="col-span-full md:col-span-8" />
  </div>
{:else}
  <Typography variant="h1" class="col-span-12">
    {$LL.authorization()}
  </Typography>
{/if}
