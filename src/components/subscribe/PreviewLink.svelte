<script lang="ts">
  import { page } from '$app/stores';
  import { copyText } from '$lib/copyText';
  import { ui } from '$lib/stores/ui';
  import Button from '@components/ui/Button.svelte';
  import TextField from '@components/ui/TextField.svelte';
  import LL from '@i18n/i18n-svelte';

  export let token: string;

  const handleCopy = async () => {
    const url = $page.url;
    url.pathname = '/subscribe/' + token + '-preview';
    await copyText(url.href);

    ui.toast.add('circle-check', $LL.copied(), undefined, 'success');
  };
</script>

<TextField
  {...$$restProps}
  status="validation"
  statusText={$LL.dontShowLinkAnyone()}
  title={$LL.preview()}
>
  <Button color="secondary" on:click={handleCopy}>
    {$LL.copy()}
  </Button>
</TextField>
