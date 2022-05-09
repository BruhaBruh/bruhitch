<script lang="ts">
  import config from '$lib/stores/donate/config';
  import Input from '@components/ui/Input.svelte';
  import TextField from '@components/ui/TextField.svelte';
  import LL from '@i18n/i18n-svelte';
</script>

<TextField
  title={$LL.donationAlerts.controls.volume()}
  class="mb-4"
  status="validation"
  statusText={`${($config.volume * 100).toFixed(0)}%`}
>
  <Input bind:value={$config.volume} type="range" min="0" max="1" step="0.01" />
</TextField>
