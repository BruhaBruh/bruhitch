<script lang="ts">
  import config from '$lib/stores/donate/config';
  import { Animation } from '$types/animation';
  import AnimationControl from '@components/controls/AnimationControl.svelte';
  import ColorControl from '@components/controls/ColorControl.svelte';
  import DisablePaddingControl from '@components/controls/DisablePaddingControl.svelte';
  import FontControl from '@components/controls/FontControl.svelte';
  import FontSizeControl from '@components/controls/FontSizeControl.svelte';
  import VerticalControl from '@components/controls/VerticalControl.svelte';
  import Input from '@components/ui/Input.svelte';
  import TextField from '@components/ui/TextField.svelte';
  import LL from '@i18n/i18n-svelte';
  import HideDelayControl from './controls/HideDelayControl.svelte';
  import IsGradientCurrencyControl from './controls/IsGradientCurrencyControl.svelte';
  import IsGradientUserNameControl from './controls/IsGradientUserNameControl.svelte';
  import VolumeControl from './controls/VolumeControl.svelte';
  import SaveConfig from './SaveConfig.svelte';
  import WidgetLink from './WidgetLink.svelte';

  let token = '';
</script>

<div {...$$restProps}>
  <ColorControl
    title={$LL.donationAlerts.controls.usernameColor()}
    bind:color={$config.usernameColor}
    class="mb-4"
  />
  <IsGradientUserNameControl class="mb-4" />
  <ColorControl
    title={$LL.donationAlerts.controls.currencyColor()}
    bind:color={$config.currencyColor}
    class="mb-4"
  />
  <IsGradientCurrencyControl class="mb-4" />
  <ColorControl
    title={$LL.donationAlerts.controls.soundColor()}
    bind:color={$config.soundColor}
    class="mb-4"
  />
  <ColorControl
    title={$LL.donationAlerts.controls.textColor()}
    bind:color={$config.textColor}
    class="mb-4"
  />
  <TextField title={$LL.donationAlerts.controls.anonymous()} class="mb-4">
    <Input bind:value={$config.anonymous} />
  </TextField>
  <TextField
    title={$LL.donationAlerts.controls.image()}
    status="validation"
    statusText={$LL.donationAlerts.controls.image()}
    class="mb-4"
  >
    <Input bind:value={$config.image} />
  </TextField>
  <HideDelayControl class="mb-4" bind:hideDelay={$config.hideDelay} />
  <VolumeControl class="mb-8" bind:volume={$config.volume} />

  <FontControl class="mb-4" bind:font={$config.font} />
  <FontSizeControl class="mb-4" bind:fontSize={$config.fontSize} />
  <DisablePaddingControl class="mb-4" bind:disablePadding={$config.disablePadding} />
  <AnimationControl
    class="mb-4"
    bind:animation={$config.animation}
    bind:easing={$config.animationEasing}
    showEasing={$config.animation !== Animation.Nothing}
    bind:animationParams={$config.animationParams}
    showAnimationParams={{
      duration: $config.animation !== Animation.Nothing,
      start: $config.animation === Animation.Scale,
      opacity: $config.animation === Animation.Scale
    }}
  />
  <VerticalControl class="mb-8" bind:vertical={$config.vertical} />

  <SaveConfig class="mb-4" bind:token />
  <WidgetLink {token} />
</div>
