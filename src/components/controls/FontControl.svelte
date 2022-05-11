<script lang="ts">
  import Input from '@components/ui/Input.svelte';
  import TextField from '@components/ui/TextField.svelte';
  import LL from '@i18n/i18n-svelte';

  export let font: string;
</script>

<TextField {...$$restProps} title={$LL.controls.font()}>
  <Input bind:value={font} />
</TextField>
