<script lang="ts" context="module">
  import config from '$lib/stores/chat/config';
  import Controls from '@components/chat/Controls.svelte';
  import PreviewChat from '@components/chat/PreviewChat.svelte';
  import Typography from '@components/ui/Typography.svelte';
  import LL from '@i18n/i18n-svelte';
</script>

<script lang="ts">
</script>

<svelte:head>
  <title>{$LL.pageNames.another($LL.chat.name())}</title>
</svelte:head>

<div class="grid grid-cols-2 sm:grid-cols-12 gap-8">
  <Typography variant="h1" class="col-span-full">
    {$LL.chat.title()}
  </Typography>
  <PreviewChat channel={$config.channel} class="col-span-full md:col-span-4 sm:order-1" />
  <Controls class="col-span-full md:col-span-8" />
</div>
