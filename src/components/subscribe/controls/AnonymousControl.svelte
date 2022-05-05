<script lang="ts">
  import config from '$lib/stores/subscribe/config';
  import Input from '@components/ui/Input.svelte';
  import TextField from '@components/ui/TextField.svelte';
  import LL from '@i18n/i18n-svelte';
</script>

<TextField
  title={$LL.subscribeAlerts.controls.anonymous()}
  class="mb-4"
  status="validation"
  statusText={$LL.subscribeAlerts.controls.anonymousDescription()}
>
  <Input bind:value={$config.anonymous} />
</TextField>
