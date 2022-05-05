<script lang="ts">
  import config from '$lib/stores/chat/config';
  import Input from '@components/ui/Input.svelte';
  import LL from '@i18n/i18n-svelte';
</script>

<Input
  class="flex-1"
  bind:value={$config.animationParams.duration}
  placeholder={$LL.chat.controls.animationParams.duration()}
/>
