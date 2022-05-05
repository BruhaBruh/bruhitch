<script lang="ts">
  import config from '$lib/stores/prediction/config';
  import ColorPicker from '@components/ui/ColorPicker.svelte';
  import TextField from '@components/ui/TextField.svelte';
  import LL from '@i18n/i18n-svelte';
</script>

<TextField title={$LL.predictionWidget.controls.blueColor()} class="mb-4">
  <ColorPicker bind:value={$config.blueColor} />
</TextField>
