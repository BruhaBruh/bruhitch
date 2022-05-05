<script lang="ts">
  import UrlParser from '$lib/chat/urlParser';
  import config from '$lib/stores/chat/config';
  import { ui } from '$lib/stores/ui';
  import Button from '@components/ui/Button.svelte';
  import Input from '@components/ui/Input.svelte';
  import TextField from '@components/ui/TextField.svelte';
  import LL from '@i18n/i18n-svelte';

  let loadUrl = '';

  const handleClickLoad = () => {
    if (!loadUrl) {
      ui.toast.add('circle-warning', $LL.chat.incorrectUrl(), undefined, 'warning');
      return;
    }
    config.loadSettings(new UrlParser(loadUrl).getSettings());
    ui.toast.add('circle-check', $LL.loaded(), undefined, 'success');
  };
</script>

<TextField title={$LL.chat.controls.loadConfigFromLink()}>
  <div class="flex space-x-2">
    <Input bind:value={loadUrl} class="flex-1" />
    <Button color="secondary" on:click={handleClickLoad}>{$LL.load()}</Button>
  </div>
</TextField>
