<script lang="ts">
  import Input from '@components/ui/Input.svelte';
  import TextField from '@components/ui/TextField.svelte';
  import LL from '@i18n/i18n-svelte';

  export let font: string;
</script>

<TextField title={$LL.controls.font()} class="mb-4">
  <Input bind:value={font} />
</TextField>
