<script lang="ts" context="module">
  import Typography from '@components/ui/Typography.svelte';
  import LL from '@i18n/i18n-svelte';
</script>

<script lang="ts">
</script>

<div class="container mx-auto">
  <Typography variant="h1">
    {$LL.wip()}
  </Typography>
</div>
