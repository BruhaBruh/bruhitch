<script lang="ts">
  import config from '$lib/stores/chat/config';
  import { Animation } from '$types/animation';
  import TextField from '@components/ui/TextField.svelte';
  import LL from '@i18n/i18n-svelte';
  import DurationInput from './DurationInput.svelte';
  import OpacityInput from './OpacityInput.svelte';
  import StartInput from './StartInput.svelte';
</script>

{#if $config.animation !== Animation.Nothing}
  <TextField title={$LL.chat.controls.animationParams.name()}>
    <div class={'flex space-x-2'}>
      <DurationInput />
      {#if $config.animation === Animation.Scale}
        <StartInput />
        <OpacityInput />
      {/if}
    </div>
  </TextField>
{/if}
