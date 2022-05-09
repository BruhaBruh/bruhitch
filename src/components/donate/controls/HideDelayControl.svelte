<script lang="ts">
  import config from '$lib/stores/donate/config';
  import Input from '@components/ui/Input.svelte';
  import TextField from '@components/ui/TextField.svelte';
  import LL from '@i18n/i18n-svelte';
</script>

<TextField title={$LL.donationAlerts.controls.hideDelay()} class="mb-4">
  <Input bind:value={$config.hideDelay} type="number" />
</TextField>
