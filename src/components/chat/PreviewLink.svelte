<script lang="ts">
  import { page } from '$app/stores';
  import UrlEncoder from '$lib/chat/urlEncoder';
  import { copyText } from '$lib/copyText';
  import config from '$lib/stores/chat/config';
  import { ui } from '$lib/stores/ui';
  import Button from '@components/ui/Button.svelte';
  import Input from '@components/ui/Input.svelte';
  import TextField from '@components/ui/TextField.svelte';
  import LL from '@i18n/i18n-svelte';

  let previewUrl = '';

  $: {
    const u = new UrlEncoder($config, $page.url.origin).getLink();
    u.pathname = u.pathname + '-preview';
    previewUrl = u.href;
  }

  const handleClickCopy = async () => {
    await copyText(previewUrl);
    ui.toast.add('circle-check', $LL.copied(), undefined, 'success');
  };
</script>

<TextField {...$$restProps} title={$LL.preview()}>
  <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
    <Input readonly value={previewUrl} class="flex-1" />
    <Button color="secondary" on:click={handleClickCopy}>
      {$LL.copy()}
    </Button>
  </div>
</TextField>
