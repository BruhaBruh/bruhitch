<script lang="ts">
  import config from '$lib/stores/follow/config';
  import Input from '@components/ui/Input.svelte';
  import LL from '@i18n/i18n-svelte';
</script>

<Input
  class="flex-1"
  bind:value={$config.animationParams.opacity}
  placeholder={$LL.followAlerts.controls.animationParams.opacity()}
/>
