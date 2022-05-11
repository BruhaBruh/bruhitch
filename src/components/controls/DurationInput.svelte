<script lang="ts">
  import Input from '@components/ui/Input.svelte';
  import LL from '@i18n/i18n-svelte';

  export let duration: number;
</script>

<Input
  class="flex-1"
  bind:value={duration}
  placeholder={$LL.controls.animationParams.duration()}
  type="number"
/>
