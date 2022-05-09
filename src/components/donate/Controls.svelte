<script lang="ts">
  import TextColorControl from '@components/prediction/controls/TextColorControl.svelte';
  import AnimationControl from './controls/AnimationControl.svelte';
  import AnonymousControl from './controls/AnonymousControl.svelte';
  import CurrencyColorControl from './controls/CurrencyColorControl.svelte';
  import DisablePaddingControl from './controls/DisablePaddingControl.svelte';
  import FontControl from './controls/FontControl.svelte';
  import FontSizeControl from './controls/FontSizeControl.svelte';
  import HideDelayControl from './controls/HideDelayControl.svelte';
  import ImageControl from './controls/ImageControl.svelte';
  import IsGradientCurrencyControl from './controls/IsGradientCurrencyControl.svelte';
  import IsGradientUserNameControl from './controls/IsGradientUserNameControl.svelte';
  import SoundColorControl from './controls/SoundColorControl.svelte';
  import UserNameColorControl from './controls/UserNameColorControl.svelte';
  import VerticalControl from './controls/VerticalControl.svelte';
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
  <FontControl />
  <FontSizeControl />
  <DisablePaddingControl />
  <AnimationControl />
  <VerticalControl />

  <SaveConfig bind:token />
  <WidgetLink {token} />
</div>
