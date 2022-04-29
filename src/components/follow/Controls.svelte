<script lang="ts">
  import { browser } from '$app/env';
  import { page } from '$app/stores';
  import { copyText } from '$lib/copyText';
  import { deepEqual } from '$lib/deepEqual';
  import config from '$lib/stores/follow/config';
  import { me } from '$lib/stores/me';
  import { ui } from '$lib/stores/ui';
  import type { Settings } from '$types/follow/settings';
  import AnimationControl from '@components/follow/AnimationControl.svelte';
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

  const verticalAlignTypes: SelectItem[] = [
    {
      value: 'top',
      label: $LL.followAlerts.top()
    },
    {
      value: 'center',
      label: $LL.followAlerts.center()
    },
    {
      value: 'bottom',
      label: $LL.followAlerts.bottom()
    }
  ];
  const horizontalAlignTypes: SelectItem[] = [
    {
      value: 'left',
      label: $LL.followAlerts.left()
    },
    {
      value: 'center',
      label: $LL.followAlerts.center()
    },
    {
      value: 'right',
      label: $LL.followAlerts.right()
    }
  ];

  let token = '';
  let prevSettings: Settings = undefined;

  //#region Fields
  let pattern = $config.pattern;
  let disablePadding = $config.disablePadding ? ['true'] : [];
  let font = $config.font;
  let fontSize = $config.fontSize;
  let textColor = $config.textColor;
  let backgroundColor = $config.backgroundColor;
  let backgroundImage = $config.backgroundImage;
  let colorNickname = $config.colorNickname;
  let isGradientNickname = $config.isGradientNickname ? ['true'] : [];
  let animation = $config.animation;
  let animationEasing = $config.animationEasing;
  let animationParams = $config.animationParams;
  let vertical = [$config.vertical];
  let horizontal = [$config.horizontal];
  //#endregion

  //#region Reactive Fields
  $: config.setPattern(pattern);
  $: config.setDisablePadding(!!disablePadding.length);
  $: config.setFont(font);
  $: config.setFontSize(fontSize);
  $: config.setTextColor(textColor);
  $: config.setBackgroundColor(backgroundColor);
  $: config.setBackgroundImage(backgroundImage);
  $: config.setColorNickname(colorNickname);
  $: config.setIsGradientNickname(!!isGradientNickname.length);
  $: config.setAnimation(animation);
  $: config.setAnimationEasing(animationEasing);
  $: config.setAnimationParams(animationParams);
  $: config.setVertical(vertical[0]);
  $: config.setHorizontal(horizontal[0]);
  //#endregion

  onMount(async () => {
    if (!browser) return;
    const data = await fetch('/api/v1/user/twitch')
      .then((r) => r.json())
      .catch(console.error);

    token = data.id;

    const settings = await fetch('/api/v1/follow/settings?token=' + token)
      .then((r) => r.json())
      .catch(console.error);

    config.loadSettings(prevSettings);

    prevSettings = settings;

    pattern = settings.pattern;
    disablePadding = settings.disablePadding ? ['true'] : [];
    font = settings.font;
    fontSize = settings.fontSize;
    textColor = settings.textColor;
    backgroundColor = settings.backgroundColor;
    backgroundImage = settings.backgroundImage;
    colorNickname = settings.colorNickname;
    isGradientNickname = settings.isGradientNickname ? ['true'] : [];
    animation = settings.animation;
    animationEasing = settings.animationEasing;
    animationParams = settings.animationParams;
    vertical = [settings.vertical];
    horizontal = [settings.horizontal];
  });

  $: settingsIsSame = deepEqual(prevSettings, $config);

  const handleCopy = async () => {
    const url = $page.url;
    url.pathname = '/follow/' + token;
    await copyText(url.href);

    ui.toast.add('circle-check', $LL.copied(), undefined, 'success');
  };

  const handleSave = async () => {
    if ($me) {
      prevSettings = await fetch('/api/v1/follow/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify($config)
      })
        .then((r) => r.json())
        .catch(console.error);
      ui.toast.add('circle-check', $LL.copied(), undefined, 'success');
    } else {
      ui.toast.add('circle-cancel', $LL.authorization(), undefined, 'danger');
    }
  };
</script>

<div {...$$restProps}>
  <!-- #region Pattern -->
  <TextField
    title={$LL.followAlerts.pattern()}
    class="mb-4"
    status="validation"
    statusText={$LL.followAlerts.patternDescription()}
  >
    <Input bind:value={pattern} />
  </TextField>
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

  <!-- #region Text Color -->
  <TextField title={$LL.followAlerts.textColor()} class="mb-4">
    <ColorPicker bind:value={textColor} />
  </TextField>
  <!-- #endregion -->

  <!-- #region Background Color -->
  <TextField title={$LL.followAlerts.backgroundColor()} class="mb-4">
    <ColorPicker bind:value={backgroundColor} />
  </TextField>
  <!-- #endregion -->

  <!-- #region Background Image -->
  <TextField
    title={$LL.followAlerts.backgroundImage()}
    status="validation"
    statusText={$LL.followAlerts.backgroundImageDescription()}
    class="mb-4"
  >
    <Input bind:value={backgroundImage} />
  </TextField>
  <!-- #endregion -->

  <!-- #region Color Nickname -->
  <TextField title={$LL.followAlerts.colorNickname()} class="mb-4">
    <ColorPicker bind:value={colorNickname} />
  </TextField>
  <!-- #endregion -->

  <!-- #region Is Gradient Nickname -->
  <TextField title={$LL.followAlerts.isGradientNickname()} class="mb-4">
    <label for="gradient-nickname" class="cursor-pointer flex items-center space-x-1 select-none ">
      <Checkbox bind:group={isGradientNickname} value={'true'} id="gradient-nickname" />
      <Typography variant="b1">
        {$LL.followAlerts.isGradientNickname()}
      </Typography>
    </label>
  </TextField>
  <!-- #endregion -->

  <!-- #region Animation -->
  <AnimationControl bind:animation bind:animationEasing bind:animationParams class="mb-4" />
  <!-- #endregion -->

  <TextField title={$LL.followAlerts.verticalAlign()} class="mb-4">
    <Select bind:selected={vertical} values={verticalAlignTypes} />
  </TextField>
  <TextField title={$LL.followAlerts.horizontalAlign()} class="mb-4">
    <Select bind:selected={horizontal} values={horizontalAlignTypes} />
  </TextField>

  <!--
  let vertical = $config.vertical;
  let horizontal = $config.horizontal;-->

  <TextField title={$LL.save()} class="mb-4">
    <Button disabled={settingsIsSame} on:click={handleSave} color="success">{$LL.save()}</Button>
  </TextField>
  <TextField title={$LL.followAlerts.widgetLink()}>
    <Button color="secondary" on:click={handleCopy}>
      {$LL.copy()}
    </Button>
  </TextField>
</div>
