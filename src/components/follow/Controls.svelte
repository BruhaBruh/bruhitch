<script lang="ts">
  import config from '$lib/stores/follow/config';
  import { Animation } from '$types/animation';
  import AnimationControl from '@components/controls/AnimationControl.svelte';
  import DisablePaddingControl from '@components/controls/DisablePaddingControl.svelte';
  import FontControl from '@components/controls/FontControl.svelte';
  import FontSizeControl from '@components/controls/FontSizeControl.svelte';
  import HorizontalControl from '@components/controls/HorizontalControl.svelte';
  import VerticalControl from '@components/controls/VerticalControl.svelte';
  import BackgroundImageControl from './controls/BackgroundImageControl.svelte';
  import ColorNicknameControl from './controls/ColorNicknameControl.svelte';
  import IsGradientNicknameControl from './controls/IsGradientNicknameControl.svelte';
  import PatternControl from './controls/PatternControl.svelte';
  import PreviewLink from './PreviewLink.svelte';
  import SaveConfig from './SaveConfig.svelte';
  import WidgetLink from './WidgetLink.svelte';

  let token = '';
</script>

<div {...$$restProps}>
  <PatternControl />
  <BackgroundImageControl />
  <ColorNicknameControl />
  <IsGradientNicknameControl />
  <FontControl bind:font={$config.font} />
  <FontSizeControl bind:fontSize={$config.fontSize} />
  <DisablePaddingControl bind:disablePadding={$config.disablePadding} />
  <AnimationControl
    bind:animation={$config.animation}
    bind:easing={$config.animationEasing}
    showEasing={$config.animation !== Animation.Nothing}
    bind:animationParams={$config.animationParams}
    showAnimationParams={{
      duration: false,
      start: $config.animation === Animation.Scale,
      opacity: $config.animation === Animation.Scale
    }}
  />
  <VerticalControl bind:vertical={$config.vertical} />
  <HorizontalControl bind:horizontal={$config.horizontal} />

  <SaveConfig bind:token />
  <WidgetLink {token} />
  <PreviewLink {token} />
</div>
