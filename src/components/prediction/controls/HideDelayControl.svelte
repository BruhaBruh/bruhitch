<script lang="ts">
  import Input from '@components/ui/Input.svelte';
  import TextField from '@components/ui/TextField.svelte';
  import LL from '@i18n/i18n-svelte';

  export let hideDelay: number;

  const handleInput = (e: InputEvent & { currentTarget: HTMLInputElement }) => {
    const newValue = Number(e.currentTarget.value.replace(',', '.'));
    if (Number.isNaN(newValue)) return;
    hideDelay = newValue;
  };
</script>

<TextField {...$$restProps} title={$LL.predictionWidget.controls.hideDelay()}>
  <Input value={hideDelay} on:input={handleInput} type="number" />
</TextField>
