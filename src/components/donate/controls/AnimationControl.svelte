<script lang="ts">
  import config from '$lib/stores/donate/config';
  import { Animation } from '$types/animation';
  import TextField from '@components/ui/TextField.svelte';
  import LL from '@i18n/i18n-svelte';
  import AnimationParams from './AnimationParams.svelte';
  import AnimationSelect from './AnimationSelect.svelte';
  import EasingSelect from './EasingSelect.svelte';
</script>

<div class="mb-4">
  <TextField title={$LL.donationAlerts.controls.animation()} class="mb-4">
    <div class={'flex space-x-2'}>
      <AnimationSelect />
      {#if $config.animation !== Animation.Nothing}
        <EasingSelect />
      {/if}
    </div>
  </TextField>
  <AnimationParams />
</div>
