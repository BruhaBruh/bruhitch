<script lang="ts">
  import AnimationControl from './controls/AnimationControl.svelte';
  import BackgroundImageControl from './controls/BackgroundImageControl.svelte';
  import ColorNicknameControl from './controls/ColorNicknameControl.svelte';
  import DisablePaddingControl from './controls/DisablePaddingControl.svelte';
  import FontControl from './controls/FontControl.svelte';
  import FontSizeControl from './controls/FontSizeControl.svelte';
  import HorizontalControl from './controls/HorizontalControl.svelte';
  import IsGradientNicknameControl from './controls/IsGradientNicknameControl.svelte';
  import PatternControl from './controls/PatternControl.svelte';
  import VerticalControl from './controls/VerticalControl.svelte';
  import PreviewLink from './PreviewLink.svelte';
  import SaveConfig from './SaveConfig.svelte';
  import WidgetLink from './WidgetLink.svelte';

  let token = '';
</script>

<div {...$$restProps}>
  <PatternControl />
  <FontControl />
  <FontSizeControl />
  <DisablePaddingControl />
  <BackgroundImageControl />
  <ColorNicknameControl />
  <IsGradientNicknameControl />
  <AnimationControl />
  <VerticalControl />
  <HorizontalControl />

  <SaveConfig bind:token />
  <WidgetLink {token} />
  <PreviewLink {token} />
</div>
