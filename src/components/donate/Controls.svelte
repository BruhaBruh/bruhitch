<script lang="ts">
  import config from '$lib/stores/donate/config';
  import { Animation } from '$types/animation';
  import AnimationControl from '@components/controls/AnimationControl.svelte';
  import DisablePaddingControl from '@components/controls/DisablePaddingControl.svelte';
  import FontControl from '@components/controls/FontControl.svelte';
  import FontSizeControl from '@components/controls/FontSizeControl.svelte';
  import VerticalControl from '@components/controls/VerticalControl.svelte';
  import TextColorControl from '@components/prediction/controls/TextColorControl.svelte';
  import AnonymousControl from './controls/AnonymousControl.svelte';
  import CurrencyColorControl from './controls/CurrencyColorControl.svelte';
  import HideDelayControl from './controls/HideDelayControl.svelte';
  import ImageControl from './controls/ImageControl.svelte';
  import IsGradientCurrencyControl from './controls/IsGradientCurrencyControl.svelte';
  import IsGradientUserNameControl from './controls/IsGradientUserNameControl.svelte';
  import SoundColorControl from './controls/SoundColorControl.svelte';
  import UserNameColorControl from './controls/UserNameColorControl.svelte';
  import VolumeControl from './controls/VolumeControl.svelte';
  import SaveConfig from './SaveConfig.svelte';
  import WidgetLink from './WidgetLink.svelte';

  let token = '';
</script>

<div {...$$restProps}>
  <UserNameColorControl />
  <IsGradientUserNameControl />
  <CurrencyColorControl />
  <IsGradientCurrencyControl />
  <SoundColorControl />
  <TextColorControl />
  <AnonymousControl />
  <ImageControl />
  <HideDelayControl />
  <VolumeControl />
  <FontControl bind:font={$config.font} />
  <FontSizeControl bind:fontSize={$config.fontSize} />
  <DisablePaddingControl bind:disablePadding={$config.disablePadding} />
  <AnimationControl
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
  <VerticalControl bind:vertical={$config.vertical} />

  <SaveConfig bind:token />
  <WidgetLink {token} />
</div>
