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
  <div class="container mx-auto grid grid-cols-12 gap-8">
    <Typography variant="h1" class="col-span-12">
      {$LL.predictionWidget.title()}
    </Typography>
    <Controls class="col-span-12 md:col-span-6" />
    <PreviewPrediction class="col-span-12 md:col-span-6" />
  </div>
{:else}
  <div class="container mx-auto">
    <Typography variant="h1" class="col-span-12">
      {$LL.authorization()}
    </Typography>
  </div>
{/if}
