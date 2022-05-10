<script lang="ts">
  import Typography from '@components/ui/Typography.svelte';
  import LL from '@i18n/i18n-svelte';
</script>

<Typography variant="h2" class="mb-4">
  {$LL.index.idea.title()}
</Typography>
<Typography variant="b1" class="mb-8">
  {$LL.index.idea.description()}
</Typography>
