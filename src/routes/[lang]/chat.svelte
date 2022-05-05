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

<div class="container mx-auto grid grid-cols-12 gap-8">
  <Typography variant="h1" class="col-span-12">
    {$LL.chat.title()}
  </Typography>
  <Controls class="col-span-12 md:col-span-6" />
  <PreviewChat channel={$config.channel} class="col-span-12 md:col-span-6" />
</div>
