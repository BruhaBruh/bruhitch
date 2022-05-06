<script lang="ts">
  import { browser } from '$app/env';
  import UrlParser from '$lib/chat/urlParser';
  import config from '$lib/stores/chat/config';
  import { me } from '$lib/stores/me';
  import AnimationControl from './controls/AnimationControl.svelte';
  import ChannelControl from './controls/ChannelControl.svelte';
  import ChatTypeControl from './controls/ChatTypeControl.svelte';
  import CustomColorNicknamesControl from './controls/CustomColorNicknamesControl.svelte';
  import DefaultColorControl from './controls/DefaultColorControl.svelte';
  import DisablePaddingControl from './controls/DisablePaddingControl.svelte';
  import FontControl from './controls/FontControl.svelte';
  import FontSizeControl from './controls/FontSizeControl.svelte';
  import GradientOnlyCustomControl from './controls/GradientOnlyCustomControl.svelte';
  import HiddenNicknamesControl from './controls/HiddenNicknamesControl.svelte';
  import HideRewardsControl from './controls/HideRewardsControl.svelte';
  import LoadConfig from './LoadConfig.svelte';
  import PreviewLink from './PreviewLink.svelte';
  import WidgetLink from './WidgetLink.svelte';

  let isLoadedLink = false;

  const loadFromLink = (link: string) => {
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
  <FontControl />
  <FontSizeControl />
  <DisablePaddingControl />
  <AnimationControl />

  <WidgetLink />
  <PreviewLink />
  <LoadConfig />
</div>
