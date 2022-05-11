<script lang="ts">
  import Input from '@components/ui/Input.svelte';
  import TextField from '@components/ui/TextField.svelte';
  import LL from '@i18n/i18n-svelte';

  export let fontSize: number;
</script>

<TextField title={$LL.controls.fontSize()} class="mb-4">
  <Input bind:value={fontSize} type="number" />
</TextField>
