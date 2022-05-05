<script lang="ts">
  import AnimationControl from './controls/AnimationControl.svelte';
  import BlueColorControl from './controls/BlueColorControl.svelte';
  import ChannelPointImageControl from './controls/ChannelPointImageControl.svelte';
  import DisablePaddingControl from './controls/DisablePaddingControl.svelte';
  import FontControl from './controls/FontControl.svelte';
  import FontSizeControl from './controls/FontSizeControl.svelte';
  import HideDelayControl from './controls/HideDelayControl.svelte';
  import PinkColorControl from './controls/PinkColorControl.svelte';
  import TextColorControl from './controls/TextColorControl.svelte';
  import VerticalControl from './controls/VerticalControl.svelte';
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
  <DisablePaddingControl />
  <FontControl />
  <FontSizeControl />
  <HideDelayControl />
  <AnimationControl />
  <VerticalControl />

  <SaveConfig bind:token />
  <WidgetLink {token} />
  <PreviewLink {token} />
</div>
