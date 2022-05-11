<script lang="ts">
  import Progress from '@components/ui/Progress.svelte';
  import TextField from '@components/ui/TextField.svelte';
  import LL from '@i18n/i18n-svelte';

  export let volume: number;

  const handleInput = (e: InputEvent & { currentTarget: HTMLInputElement }) => {
    const newValue = Number(e.currentTarget.value.replace(',', '.'));
    if (Number.isNaN(newValue)) return;
    volume = newValue;
  };
</script>

<TextField
  {...$$restProps}
  title={$LL.donationAlerts.controls.volume()}
  status="validation"
  statusText={`${(volume * 100).toFixed(0)}%`}
>
  <Progress value={volume} on:input={handleInput} min="0" max="1" step="0.01" />
</TextField>
