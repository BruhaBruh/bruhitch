<script lang="ts">
  import { browser } from '$app/env';
  import UrlParser from '$lib/chat/urlParser';
  import config from '$lib/stores/chat/config';
  import { me } from '$lib/stores/me';
  import { Animation } from '$types/animation';
  import AnimationControl from '@components/controls/AnimationControl.svelte';
  import DisablePaddingControl from '@components/controls/DisablePaddingControl.svelte';
  import FontControl from '@components/controls/FontControl.svelte';
  import FontSizeControl from '@components/controls/FontSizeControl.svelte';
  import ChannelControl from './controls/ChannelControl.svelte';
  import ChatTypeControl from './controls/ChatTypeControl.svelte';
  import CustomColorNicknamesControl from './controls/CustomColorNicknamesControl.svelte';
  import DefaultColorControl from './controls/DefaultColorControl.svelte';
  import GradientOnlyCustomControl from './controls/GradientOnlyCustomControl.svelte';
  import HiddenNicknamesControl from './controls/HiddenNicknamesControl.svelte';
  import HideRewardsControl from './controls/HideRewardsControl.svelte';
  import LoadConfig from './LoadConfig.svelte';
  import PreviewLink from './PreviewLink.svelte';
  import WidgetLink from './WidgetLink.svelte';

  let isLoadedLink = false;

  const loadFromLink = (link: string) => {
    if (!link) return;
    const settings = new UrlParser(link).getSettings();
    config.loadSettings(settings);
  };

  //#region Load Saved link
  me.subscribe(async (v) => {
    // browser required to fetch with cookie
    if (!v || isLoadedLink || !browser) return;
    const { link } = await fetch('/api/v1/chat/link')
      .then((r) => r.json())
      .catch(console.error);

    isLoadedLink = true;

    loadFromLink(link);
  });
  //#endregion
</script>

<div {...$$restProps}>
  <ChannelControl />
  <ChatTypeControl />
  <HideRewardsControl />
  <HiddenNicknamesControl />
  <DefaultColorControl />
  <GradientOnlyCustomControl />
  <CustomColorNicknamesControl />
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

  <WidgetLink />
  <PreviewLink />
  <LoadConfig />
</div>
