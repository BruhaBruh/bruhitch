<script lang="ts">
  import config from '$lib/stores/follow/config';
  import Input from '@components/ui/Input.svelte';
  import TextField from '@components/ui/TextField.svelte';
  import LL from '@i18n/i18n-svelte';
</script>

<TextField
  title={$LL.followAlerts.controls.pattern()}
  class="mb-4"
  status="validation"
  statusText={$LL.followAlerts.controls.patternDescription()}
>
  <Input bind:value={$config.pattern} />
</TextField>
