<script lang="ts">
  import Input from '@components/ui/Input.svelte';
  import LL from '@i18n/i18n-svelte';

  export let start: number;

  const handleInput = (e: InputEvent & { currentTarget: HTMLInputElement }) => {
    const newValue = Number(e.currentTarget.value.replace(',', '.'));
    if (Number.isNaN(newValue)) return;
    start = newValue;
  };
</script>

<Input
  class="flex-1"
  value={start}
  on:input={handleInput}
  type="number"
  placeholder={$LL.controls.animationParams.startScale()}
/>
