<script lang="ts">
  import Input from '@components/ui/Input.svelte';
  import LL from '@i18n/i18n-svelte';

  export let start: number;
</script>

<Input
  class="flex-1"
  bind:value={start}
  type="number"
  placeholder={$LL.controls.animationParams.startScale()}
/>
