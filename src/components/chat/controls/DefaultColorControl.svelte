<script lang="ts">
  import config from '$lib/stores/chat/config';
  import ColorPicker from '@components/ui/ColorPicker.svelte';
  import TextField from '@components/ui/TextField.svelte';
  import LL from '@i18n/i18n-svelte';
</script>

<TextField title={$LL.chat.controls.defaultColor()} class="mb-4">
  <ColorPicker bind:value={$config.defaultColor} />
</TextField>
