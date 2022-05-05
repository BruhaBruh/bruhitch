<script lang="ts">
  import { page } from '$app/stores';
  import UrlEncoder from '$lib/chat/urlEncoder';
  import { copyText } from '$lib/copyText';
  import config from '$lib/stores/chat/config';
  import { me } from '$lib/stores/me';
  import { ui } from '$lib/stores/ui';
  import Button from '@components/ui/Button.svelte';
  import Input from '@components/ui/Input.svelte';
  import TextField from '@components/ui/TextField.svelte';
  import LL from '@i18n/i18n-svelte';

  $: url = new UrlEncoder($config, $page.url.origin).getLink().href;

  const handleClickCopy = async () => {
    await copyText(url);
    if ($me) {
      await fetch('/api/v1/chat/link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ link: url })
      })
        .then((r) => r.json())
        .catch(console.error);
    }
    ui.toast.add('circle-check', $LL.copied(), undefined, 'success');
  };
</script>

<TextField title={$LL.chat.controls.chatLink()} class="mb-4">
  <div class="flex space-x-2">
    <Input readonly value={url} class="flex-1" />
    <Button color="secondary" on:click={handleClickCopy}>
      {$LL.copy()}
    </Button>
  </div>
</TextField>
