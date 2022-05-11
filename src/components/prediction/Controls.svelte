<script lang="ts">
  import config from '$lib/stores/prediction/config';
  import { Animation } from '$types/animation';
  import AnimationControl from '@components/controls/AnimationControl.svelte';
  import DisablePaddingControl from '@components/controls/DisablePaddingControl.svelte';
  import FontControl from '@components/controls/FontControl.svelte';
  import FontSizeControl from '@components/controls/FontSizeControl.svelte';
  import VerticalControl from '@components/controls/VerticalControl.svelte';
  import BlueColorControl from './controls/BlueColorControl.svelte';
  import ChannelPointImageControl from './controls/ChannelPointImageControl.svelte';
  import HideDelayControl from './controls/HideDelayControl.svelte';
  import PinkColorControl from './controls/PinkColorControl.svelte';
  import TextColorControl from './controls/TextColorControl.svelte';
  import PreviewLink from './PreviewLink.svelte';
  import SaveConfig from './SaveConfig.svelte';
  import WidgetLink from './WidgetLink.svelte';

  let token = '';
</script>

<div {...$$restProps}>
  <TextColorControl />
  <BlueColorControl />
  <PinkColorControl />
  <ChannelPointImageControl />
  <HideDelayControl />

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
  <PreviewLink {token} />
</div>
