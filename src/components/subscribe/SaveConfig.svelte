<script lang="ts">
  import { deepEqual } from '$lib/deepEqual';
  import { me } from '$lib/stores/me';
  import config from '$lib/stores/subscribe/config';
  import { ui } from '$lib/stores/ui';
  import type { Settings } from '$types/subscribe/settings';
  import Button from '@components/ui/Button.svelte';
  import TextField from '@components/ui/TextField.svelte';
  import LL from '@i18n/i18n-svelte';
  import { onMount } from 'svelte';

  export let token = '';

  let prevSettings: Settings = undefined;

  onMount(async () => {
    const data = await fetch('/api/v1/user/token')
      .then((r) => r.json())
      .catch(console.error);

    token = data.token.id;

    const settings = await fetch('/api/v1/subscribe/settings?token=' + token)
      .then((r) => r.json())
      .catch(console.error);

    if (!settings) return;
    config.loadSettings(settings);

    prevSettings = settings;
  });

  $: settingsIsSame = deepEqual(prevSettings, $config);

  const handleSave = async () => {
    if ($me) {
      config.setFontSize($config.fontSize);
      config.setAnimationParams($config.animationParams);

      prevSettings = await fetch('/api/v1/subscribe/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify($config)
      })
        .then((r) => r.json())
        .catch(console.error);
      ui.toast.add('circle-check', $LL.saved(), undefined, 'success');
    } else {
      ui.toast.add('circle-cancel', $LL.authorization(), undefined, 'danger');
    }
  };
</script>

<TextField {...$$restProps} title={$LL.save()}>
  <Button disabled={settingsIsSame} on:click={handleSave} color="success">
    {$LL.save()}
  </Button>
</TextField>
