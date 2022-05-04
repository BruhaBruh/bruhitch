<script lang="ts">
  import { browser } from '$app/env';
  import { page } from '$app/stores';
  import { copyText } from '$lib/copyText';
  import { deepEqual } from '$lib/deepEqual';
  import { me } from '$lib/stores/me';
  import config from '$lib/stores/subscribe/config';
  import { ui } from '$lib/stores/ui';
  import type { Settings } from '$types/subscribe/settings';
  // import AnimationControl from '@components/subscribe/AnimationControl.svelte';
  import Button from '@components/ui/Button.svelte';
  import Checkbox from '@components/ui/Checkbox.svelte';
  import ColorPicker from '@components/ui/ColorPicker.svelte';
  import Input from '@components/ui/Input.svelte';
  import type { SelectItem } from '@components/ui/Select';
  import Select from '@components/ui/Select.svelte';
  import TextField from '@components/ui/TextField.svelte';
  import Typography from '@components/ui/Typography.svelte';
  import LL from '@i18n/i18n-svelte';
  import { onMount } from 'svelte';
  import AnimationControl from './AnimationControl.svelte';

  const verticalAlignTypes: SelectItem[] = [
    {
      value: 'top',
      label: $LL.followAlerts.controls.top()
    },
    {
      value: 'center',
      label: $LL.followAlerts.controls.center()
    },
    {
      value: 'bottom',
      label: $LL.followAlerts.controls.bottom()
    }
  ];

  let token = '';
  let prevSettings: Settings = undefined;

  //#region Fields
  let subPattern = $config.subPattern;
  let giftPattern = $config.giftPattern;
  let giftMultiMonthPattern = $config.giftMultiMonthPattern;
  let anonymous = $config.anonymous;
  let disablePadding = $config.disablePadding ? ['true'] : [];
  let font = $config.font;
  let fontSize = $config.fontSize;
  let image = $config.image;
  let usernameColor = $config.usernameColor;
  let isGradientUsername = $config.isGradientUsername ? ['true'] : [];
  let recipientColor = $config.recipientColor;
  let isGradientRecipient = $config.isGradientRecipient ? ['true'] : [];
  let animation = $config.animation;
  let animationEasing = $config.animationEasing;
  let animationParams = $config.animationParams;
  let vertical = [$config.vertical];
  //#endregion

  //#region Reactive Fields
  $: config.setSubPattern(subPattern);
  $: config.setGiftPattern(giftPattern);
  $: config.setGiftMultiMonthPattern(giftMultiMonthPattern);
  $: config.setAnonymous(anonymous);
  $: config.setDisablePadding(!!disablePadding.length);
  $: config.setFont(font);
  $: config.setFontSize(fontSize);
  $: config.setImage(image);
  $: config.setUsernameColor(usernameColor);
  $: config.setIsGradientUsername(!!isGradientUsername.length);
  $: config.setRecipientColor(recipientColor);
  $: config.setIsGradientRecipient(!!isGradientRecipient.length);
  $: config.setAnimation(animation);
  $: config.setAnimationEasing(animationEasing);
  $: config.setAnimationParams(animationParams);
  $: config.setVertical(vertical[0]);
  //#endregion

  onMount(async () => {
    if (!browser) return;
    const data = await fetch('/api/v1/user/twitch')
      .then((r) => r.json())
      .catch(console.error);

    token = data.id;

    const settings = await fetch('/api/v1/subscribe/settings?token=' + token)
      .then((r) => r.json())
      .catch(console.error);

    config.loadSettings(prevSettings);

    prevSettings = settings;

    subPattern = settings.subPattern;
    giftPattern = settings.giftPattern;
    giftMultiMonthPattern = settings.giftMultiMonthPattern;
    anonymous = settings.anonymous;
    disablePadding = settings.disablePadding ? ['true'] : [];
    font = settings.font;
    fontSize = settings.fontSize;
    image = settings.image;
    usernameColor = settings.usernameColor;
    isGradientUsername = settings.isGradientUsername ? ['true'] : [];
    recipientColor = settings.recipientColor;
    isGradientRecipient = settings.isGradientRecipient ? ['true'] : [];
    animation = settings.animation;
    animationEasing = settings.animationEasing;
    animationParams = settings.animationParams;
    vertical = [settings.vertical];
  });

  $: settingsIsSame = deepEqual(prevSettings, $config);

  const handleCopy = async (isPreview: boolean) => {
    const url = $page.url;
    url.pathname = '/subscribe/' + token + (isPreview ? '-preview' : '');
    await copyText(url.href);

    ui.toast.add('circle-check', $LL.copied(), undefined, 'success');
  };

  const handleSave = async () => {
    if ($me) {
      prevSettings = await fetch('/api/v1/subscribe/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify($config)
      })
        .then((r) => r.json())
        .catch(console.error);
      ui.toast.add('circle-check', $LL.saved(), undefined, 'success');
    } else {
      ui.toast.add('circle-cancel', $LL.authorization(), undefined, 'danger');
    }
  };
</script>

<div {...$$restProps}>
  <!-- #region SubPattern -->
  <TextField
    title={$LL.subscribeAlerts.controls.subPattern()}
    class="mb-4"
    status="validation"
    statusText={$LL.subscribeAlerts.controls.subPatternDescription()}
  >
    <Input bind:value={subPattern} />
  </TextField>
  <!-- #endregion -->

  <!-- #region GiftPattern -->
  <TextField
    title={$LL.subscribeAlerts.controls.giftPattern()}
    class="mb-4"
    status="validation"
    statusText={$LL.subscribeAlerts.controls.giftPatternDescription()}
  >
    <Input bind:value={giftPattern} />
  </TextField>
  <!-- #endregion -->

  <!-- #region GiftMultiMonthPattern -->
  <TextField
    title={$LL.subscribeAlerts.controls.giftMultiMonthPattern()}
    class="mb-4"
    status="validation"
    statusText={$LL.subscribeAlerts.controls.giftMultiMonthPatternDescription()}
  >
    <Input bind:value={giftMultiMonthPattern} />
  </TextField>
  <!-- #endregion -->

  <!-- #region Anonymous -->
  <TextField
    title={$LL.subscribeAlerts.controls.anonymous()}
    class="mb-4"
    status="validation"
    statusText={$LL.subscribeAlerts.controls.anonymousDescription()}
  >
    <Input bind:value={anonymous} />
  </TextField>
  <!-- #endregion -->

  <!-- #region Font -->
  <TextField title={$LL.subscribeAlerts.controls.font()} class="mb-4">
    <Input bind:value={font} />
  </TextField>
  <!-- #endregion -->

  <!-- #region Font Size -->
  <TextField title={$LL.subscribeAlerts.controls.fontSize()} class="mb-4">
    <Input bind:value={fontSize} type="number" />
  </TextField>
  <!-- #endregion -->

  <!-- #region Disable Padding -->
  <TextField title={$LL.subscribeAlerts.controls.disablePadding()} class="mb-4">
    <label for="disable-padding" class="cursor-pointer flex items-center space-x-1 select-none ">
      <Checkbox bind:group={disablePadding} value={'true'} id="disable-padding" />
      <Typography variant="b1">
        {$LL.subscribeAlerts.controls.disablePadding()}
      </Typography>
    </label>
  </TextField>
  <!-- #endregion -->

  <!-- #region Image -->
  <TextField
    title={$LL.subscribeAlerts.controls.image()}
    status="validation"
    statusText={$LL.subscribeAlerts.controls.image()}
    class="mb-4"
  >
    <Input bind:value={image} />
  </TextField>
  <!-- #endregion -->

  <!-- #region UserName Color -->
  <TextField title={$LL.subscribeAlerts.controls.usernameColor()} class="mb-4">
    <ColorPicker bind:value={usernameColor} />
  </TextField>
  <!-- #endregion -->

  <!-- #region Is Gradient UserName -->
  <TextField title={$LL.subscribeAlerts.controls.isGradientUsername()} class="mb-4">
    <label for="gradient-username" class="cursor-pointer flex items-center space-x-1 select-none">
      <Checkbox bind:group={isGradientUsername} value={'true'} id="gradient-username" />
      <Typography variant="b1">
        {$LL.subscribeAlerts.controls.isGradientUsername()}
      </Typography>
    </label>
  </TextField>
  <!-- #endregion -->

  <!-- #region Recipient Color -->
  <TextField title={$LL.subscribeAlerts.controls.recipientColor()} class="mb-4">
    <ColorPicker bind:value={recipientColor} />
  </TextField>
  <!-- #endregion -->

  <!-- #region Is Gradient Recipient -->
  <TextField title={$LL.subscribeAlerts.controls.isGradientRecipient()} class="mb-4">
    <label for="gradient-recipient" class="cursor-pointer flex items-center space-x-1 select-none">
      <Checkbox bind:group={isGradientRecipient} value={'true'} id="gradient-recipient" />
      <Typography variant="b1">
        {$LL.subscribeAlerts.controls.isGradientRecipient()}
      </Typography>
    </label>
  </TextField>
  <!-- #endregion -->

  <!-- #region Animation -->
  <AnimationControl bind:animation bind:animationEasing bind:animationParams class="mb-4" />
  <!-- #endregion -->

  <!-- #region Vertical Alignment -->
  <TextField title={$LL.subscribeAlerts.controls.verticalAlign()} class="mb-4">
    <Select bind:selected={vertical} values={verticalAlignTypes} />
  </TextField>
  <!-- #endregion -->

  <TextField title={$LL.save()} class="mb-4">
    <Button disabled={settingsIsSame} on:click={handleSave} color="success">{$LL.save()}</Button>
  </TextField>
  <TextField
    status="validation"
    statusText={$LL.dontShowLinkAnyone()}
    title={$LL.subscribeAlerts.controls.widgetLink()}
    class="mb-4"
  >
    <Button color="secondary" on:click={() => handleCopy(false)}>
      {$LL.copy()}
    </Button>
  </TextField>
  <TextField status="validation" statusText={$LL.dontShowLinkAnyone()} title={$LL.preview()}>
    <Button color="secondary" on:click={() => handleCopy(true)}>
      {$LL.copy()}
    </Button>
  </TextField>
</div>
