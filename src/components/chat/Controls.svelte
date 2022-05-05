<script lang="ts">
  import { browser } from '$app/env';
  import { page } from '$app/stores';
  import UrlEncoder from '$lib/chat/urlEncoder';
  import UrlParser from '$lib/chat/urlParser';
  import { copyText } from '$lib/copyText';
  import config from '$lib/stores/chat/config';
  import { me } from '$lib/stores/me';
  import { ui } from '$lib/stores/ui';
  import LL from '@i18n/i18n-svelte';
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

  let url = '';
  let previewUrl = '';
  let loadUrl = '';

  $: url = new UrlEncoder($config, $page.url.origin).getLink().href;
  $: {
    const u = new UrlEncoder($config, $page.url.origin).getLink();
    u.pathname = u.pathname + '-preview';
    previewUrl = u.href;
  }

  const handleClickCopy = async (isPreview: boolean) => {
    if (isPreview) {
      await copyText(previewUrl);
      ui.toast.add('circle-check', $LL.copied(), undefined, 'success');
      return;
    }
    await copyText(url);
    if ($me) {
      await fetch('/api/v1/chat/link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ link: url })
      })
        .then((r) => r.json())
        .catch(console.error);
    }
    ui.toast.add('circle-check', $LL.copied(), undefined, 'success');
  };
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
