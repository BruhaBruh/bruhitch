<script lang="ts">
  import Input from '@components/ui/Input.svelte';
  import LL from '@i18n/i18n-svelte';

  export let duration: number;

  const handleInput = (e: InputEvent & { currentTarget: HTMLInputElement }) => {
    const newValue = Number(e.currentTarget.value.replace(',', '.'));
    if (Number.isNaN(newValue)) return;
    duration = newValue;
  };
</script>

<Input
  class="flex-1"
  value={duration}
  on:input={handleInput}
  placeholder={$LL.controls.animationParams.duration()}
  type="number"
/>
