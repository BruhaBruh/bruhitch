<script lang="ts">
  import config from '$lib/stores/subscribe/config';
  import { Animation } from '$types/animation';
  import TextField from '@components/ui/TextField.svelte';
  import LL from '@i18n/i18n-svelte';
  import OpacityInput from './OpacityInput.svelte';
  import StartInput from './StartInput.svelte';
</script>

{#if $config.animation === Animation.Scale}
  <TextField title={$LL.subscribeAlerts.controls.animationParams.name()}>
    <div class={'flex space-x-2'}>
      <StartInput />
      <OpacityInput />
    </div>
  </TextField>
{/if}
