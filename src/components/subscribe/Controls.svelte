<script lang="ts">
  import AnimationControl from './controls/AnimationControl.svelte';
  import AnonymousControl from './controls/AnonymousControl.svelte';
  import DisablePaddingControl from './controls/DisablePaddingControl.svelte';
  import FontControl from './controls/FontControl.svelte';
  import FontSizeControl from './controls/FontSizeControl.svelte';
  import GiftMultiMonthPatternControl from './controls/GiftMultiMonthPatternControl.svelte';
  import GiftPatternControl from './controls/GiftPatternControl.svelte';
  import ImageControl from './controls/ImageControl.svelte';
  import IsGradientRecipientControl from './controls/IsGradientRecipientControl.svelte';
  import IsGradientUserNameControl from './controls/IsGradientUserNameControl.svelte';
  import RecipientColorControl from './controls/RecipientColorControl.svelte';
  import SubPatternControl from './controls/SubPatternControl.svelte';
  import UserNameColorControl from './controls/UserNameColorControl.svelte';
  import VerticalControl from './controls/VerticalControl.svelte';
  import PreviewLink from './PreviewLink.svelte';
  import SaveConfig from './SaveConfig.svelte';
  import WidgetLink from './WidgetLink.svelte';

  let token = '';
</script>

<div {...$$restProps}>
  <SubPatternControl />
  <GiftPatternControl />
  <GiftMultiMonthPatternControl />
  <AnonymousControl />
  <FontControl />
  <FontSizeControl />
  <DisablePaddingControl />
  <ImageControl />
  <UserNameColorControl />
  <IsGradientUserNameControl />
  <RecipientColorControl />
  <IsGradientRecipientControl />
  <AnimationControl />
  <VerticalControl />

  <SaveConfig bind:token />
  <WidgetLink {token} />
  <PreviewLink {token} />
</div>
