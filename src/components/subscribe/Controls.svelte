<script lang="ts">
  import config from '$lib/stores/subscribe/config';
  import { Animation } from '$types/animation';
  import AnimationControl from '@components/controls/AnimationControl.svelte';
  import DisablePaddingControl from '@components/controls/DisablePaddingControl.svelte';
  import FontControl from '@components/controls/FontControl.svelte';
  import FontSizeControl from '@components/controls/FontSizeControl.svelte';
  import VerticalControl from '@components/controls/VerticalControl.svelte';
  import AnonymousControl from './controls/AnonymousControl.svelte';
  import GiftMultiMonthPatternControl from './controls/GiftMultiMonthPatternControl.svelte';
  import GiftPatternControl from './controls/GiftPatternControl.svelte';
  import ImageControl from './controls/ImageControl.svelte';
  import IsGradientRecipientControl from './controls/IsGradientRecipientControl.svelte';
  import IsGradientUserNameControl from './controls/IsGradientUserNameControl.svelte';
  import RecipientColorControl from './controls/RecipientColorControl.svelte';
  import SubPatternControl from './controls/SubPatternControl.svelte';
  import UserNameColorControl from './controls/UserNameColorControl.svelte';
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
  <ImageControl />
  <UserNameColorControl />
  <IsGradientUserNameControl />
  <RecipientColorControl />
  <IsGradientRecipientControl />
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

  <SaveConfig bind:token />
  <WidgetLink {token} />
  <PreviewLink {token} />
</div>
