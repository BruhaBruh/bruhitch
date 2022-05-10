<script lang="ts" context="module">
  import Idea from '@components/index/Idea.svelte';
  import Structure from '@components/index/Structure.svelte';
  import Typography from '@components/ui/Typography.svelte';
  import LL from '@i18n/i18n-svelte';
</script>

<script lang="ts">
</script>

<svelte:head>
  <title>{$LL.pageNames.index()}</title>
</svelte:head>

<div>
  <Typography variant="h1" class="mb-8">{$LL.index.aboutProject()}</Typography>
  <Idea />
  <Structure />
</div>
