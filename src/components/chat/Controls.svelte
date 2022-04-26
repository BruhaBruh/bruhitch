<script lang="ts">
  import { browser } from '$app/env';
  import { page } from '$app/stores';
  import UrlEncoder from '$lib/chat/urlEncoder';
  import UrlParser from '$lib/chat/urlParser';
  import { copyText } from '$lib/copyText';
  import config from '$lib/stores/chat/config';
  import { me } from '$lib/stores/me';
  import { ui } from '$lib/stores/ui';
  import type { UserNicknameColor } from '$types/chat/nickname';
  import type { ChatType } from '$types/chat/settings';
  import Button from '@components/ui/Button.svelte';
  import type { CheckboxValue } from '@components/ui/Checkbox';
  import Checkbox from '@components/ui/Checkbox.svelte';
  import ColorPicker from '@components/ui/ColorPicker.svelte';
  import Input from '@components/ui/Input.svelte';
  import type { SelectItem, SelectValue } from '@components/ui/Select';
  import Select from '@components/ui/Select.svelte';
  import TextField from '@components/ui/TextField.svelte';
  import Typography from '@components/ui/Typography.svelte';
  import LL from '@i18n/i18n-svelte';
  import { onMount } from 'svelte';
  import AnimationControl from './AnimationControl.svelte';
  import CustomColorNicknamesControl from './CustomColorNicknamesControl.svelte';
  import HiddenNicknamesControl from './HiddenNicknamesControl.svelte';

  const chatTypes: SelectItem[] = [
    {
      value: 'default',
      label: $LL.chat.default()
    },
    {
      value: 'block',
      label: $LL.chat.block()
    },
    {
      value: 'alternative-block',
      label: $LL.chat.alternativeBlock()
    }
  ];

  export let channel = '';
  let isLoadedLink = false;
  //#region Config fields
  let chatType: SelectValue[] = [$config.chatType];
  let hideRewards: CheckboxValue[] = $config.hideReward ? ['true'] : [];
  let hiddenNicknames: string[] = $config.hiddenNicknames;
  let defaultColor = $config.defaultColor;
  let onlyGradient: CheckboxValue[] = $config.gradientOnlyCustom ? ['true'] : [];
  let userNicknames: UserNicknameColor = $config.nicknameColors;
  let font = $config.font;
  let fontSize = $config.fontSize.toString();
  let disablePadding: CheckboxValue[] = $config.disablePadding ? ['true'] : [];
  let animation = $config.animation;
  let animationEasing = $config.animationEasing;
  let animationParams = $config.animationParams;
  //#endregion

  //#region Reactive set config
  $: config.setChatType(chatType[0] as ChatType);
  $: config.setHideReward(!!hideRewards.length);
  $: config.setHidden(hiddenNicknames);
  $: config.setDefaultColor(defaultColor);
  $: config.setGradientOnlyCustom(!!onlyGradient.length);
  $: config.setCustomColor(userNicknames);
  $: config.setFont(font);
  $: config.setFontSize(Number.isNaN(Number(fontSize)) ? 16 : Number(fontSize));
  $: config.setDisablePadding(!!disablePadding.length);
  $: config.setAnimation(animation);
  $: config.setAnimationEasing(animationEasing);
  $: config.setAnimationParams(animationParams);
  //#endregion

  const loadFromLink = (link: string) => {
    const settings = new UrlParser(link).getSettings();

    channel = settings.channel;
    chatType = [settings.chatType];
    hideRewards = settings.hideReward ? ['true'] : [];
    hiddenNicknames = settings.hiddenNicknames;
    defaultColor = settings.defaultColor;
    onlyGradient = settings.gradientOnlyCustom ? ['true'] : [];
    userNicknames = settings.nicknameColors;
    font = settings.font;
    fontSize = settings.fontSize.toString();
    disablePadding = settings.disablePadding ? ['true'] : [];
    animation = settings.animation;
    animationEasing = settings.animationEasing;
    animationParams = settings.animationParams;
  };

  //#region Load Saved link
  me.subscribe(async (v) => {
    if (!v || isLoadedLink || !browser) return;
    const { link } = await fetch('/api/v1/chat/link')
      .then((r) => r.json())
      .catch(console.error);

    isLoadedLink = true;

    loadFromLink(link);
  });
  onMount(async () => {
    if (!$me) return;
  });
  //#endregion

  let url = '';
  let loadUrl = '';

  $: url = new UrlEncoder({ channel, ...$config }, $page.url.origin).getLink().href;

  const handleClickCopy = async () => {
    await copyText(url);
    if ($me) {
      await fetch('/api/v1/chat/save', {
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

  const handleClickLoad = () => {
    if (!loadUrl) {
      ui.toast.add('circle-warning', $LL.chat.incorrectUrl(), undefined, 'warning');
      return;
    }

    loadFromLink(loadUrl);
    ui.toast.add('circle-check', $LL.loaded(), undefined, 'success');
  };
</script>

<div {...$$restProps}>
  <!--#region Channel-->
  <TextField title={$LL.chat.channel()} class="mb-4">
    <Input bind:value={channel} />
  </TextField>
  <!--#endregion-->

  <!--#region ChatType-->
  <TextField title={$LL.chat.chatType()} class="mb-4">
    <Select bind:selected={chatType} values={chatTypes} />
  </TextField>
  <!--#endregion-->

  <!-- #region Hide Rewards -->
  <TextField title={$LL.chat.hideRewards()} class="mb-4">
    <label for="hide-rewards" class="cursor-pointer flex items-center space-x-1 select-none">
      <Checkbox bind:group={hideRewards} value={'true'} id="hide-rewards" />
      <Typography variant="b1">
        {$LL.chat.hideRewardsDescription()}
      </Typography>
    </label>
  </TextField>
  <!-- #endregion -->

  <!-- #region Hidden Nicknames -->
  <HiddenNicknamesControl bind:hiddenNicknames class="mb-4" />
  <!-- #endregion -->

  <!-- #region Default Color -->
  <TextField title={$LL.chat.defaultColor()} class="mb-4">
    <ColorPicker bind:value={defaultColor} />
  </TextField>
  <!-- #endregion -->

  <!-- #region Gradient Only to custom nicknames -->
  <TextField title={$LL.chat.gradientOnlyToCustomNicknames()} class="mb-4">
    <label for="gradient-only" class="cursor-pointer flex items-center space-x-1 select-none ">
      <Checkbox bind:group={onlyGradient} value={'true'} id="gradient-only" />
      <Typography variant="b1">
        {$LL.chat.gradientOnlyToCustomNicknames()}
      </Typography>
    </label>
  </TextField>
  <!-- #endregion -->

  <!-- #region Custom Nicknames -->
  <CustomColorNicknamesControl bind:userNicknames class="mb-4" />
  <!-- #endregion -->

  <!-- #region Font -->
  <TextField title={$LL.chat.font()} class="mb-4">
    <Input bind:value={font} />
  </TextField>
  <!-- #endregion -->

  <!-- #region Font Size -->
  <TextField title={$LL.chat.fontSize()} class="mb-4">
    <Input bind:value={fontSize} type="number" />
  </TextField>
  <!-- #endregion -->

  <!-- #region Disable Padding -->
  <TextField title={$LL.chat.disablePadding()} class="mb-4">
    <label for="disable-padding" class="cursor-pointer flex items-center space-x-1 select-none ">
      <Checkbox bind:group={disablePadding} value={'true'} id="disable-padding" />
      <Typography variant="b1">
        {$LL.chat.disablePadding()}
      </Typography>
    </label>
  </TextField>
  <!-- #endregion -->

  <!-- #region Animation -->
  <AnimationControl bind:animation bind:animationEasing bind:animationParams class="mb-4" />
  <!-- #endregion -->

  <!-- #region Generated Link -->
  <TextField title={$LL.chat.chatLink()} class="mb-4">
    <div class="flex space-x-2">
      <Input readonly value={url} class="flex-1" />
      <Button color="secondary" on:click={handleClickCopy}>{$LL.copy()}</Button>
    </div>
  </TextField>
  <!-- #endregion -->

  <!-- #region Load Config From Link -->
  <TextField title={$LL.chat.loadConfigFromLink()}>
    <div class="flex space-x-2">
      <Input bind:value={loadUrl} class="flex-1" />
      <Button color="secondary" on:click={handleClickLoad}>{$LL.load()}</Button>
    </div>
  </TextField>
  <!-- #endregion -->
</div>
