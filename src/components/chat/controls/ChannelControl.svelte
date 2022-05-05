<script lang="ts">
  import config from '$lib/stores/chat/config';
  import Input from '@components/ui/Input.svelte';
  import TextField from '@components/ui/TextField.svelte';
  import LL from '@i18n/i18n-svelte';
</script>

<TextField title={$LL.chat.controls.channel()} class="mb-4">
  <Input bind:value={$config.channel} />
</TextField>
