<script lang="ts">
  import { deepEqual } from '$lib/deepEqual';
  import config from '$lib/stores/follow/config';
  import { me } from '$lib/stores/me';
  import { ui } from '$lib/stores/ui';
  import type { Settings } from '$types/follow/settings';
  import Button from '@components/ui/Button.svelte';
  import TextField from '@components/ui/TextField.svelte';
  import LL from '@i18n/i18n-svelte';
  import { onMount } from 'svelte';

  export let token: string;

  let prevSettings: Settings = undefined;

  onMount(async () => {
    const data = await fetch('/api/v1/user/twitch')
      .then((r) => r.json())
      .catch(console.error);

    token = data.id;

    const settings = await fetch('/api/v1/follow/settings?token=' + token)
      .then((r) => r.json())
      .catch(console.error);

    config.loadSettings(settings);

    prevSettings = settings;
  });

  $: settingsIsSame = deepEqual(prevSettings, $config);

  const handleSave = async () => {
    if ($me) {
      prevSettings = await fetch('/api/v1/follow/settings', {
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

<TextField title={$LL.save()} class="mb-4">
  <Button disabled={settingsIsSame} on:click={handleSave} color="success">
    {$LL.save()}
  </Button>
</TextField>
