<script lang="ts" context="module">
  import Controls from '@components/chat/Controls.svelte';
  import PreviewChat from '@components/chat/PreviewChat.svelte';
  import Typography from '@components/ui/Typography.svelte';
  import LL from '@i18n/i18n-svelte';
</script>

<script lang="ts">
  let channel = '';
</script>

<svelte:head>
  <title>{$LL.pageNames.chat()}</title>
</svelte:head>

<div class="container mx-auto grid grid-cols-12 gap-4">
  <Typography variant="h1" class="mb-8 col-span-12">
    {$LL.chat.title()}
  </Typography>
  <Controls bind:channel class="col-span-6" />
  <PreviewChat {channel} class="col-span-6" />
</div>
