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
  const horizontalAlignTypes: SelectItem[] = [
    {
      value: 'left',
      label: $LL.followAlerts.controls.left()
    },
    {
      value: 'center',
      label: $LL.followAlerts.controls.center()
    },
    {
      value: 'right',
      label: $LL.followAlerts.controls.right()
    }
  ];

  let token = '';
  let prevSettings: Settings = undefined;

  //#region Fields
  let vertical = [$config.vertical];
  let horizontal = [$config.horizontal];
  //#endregion

  //#region Reactive Fields
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
  });

  $: settingsIsSame = deepEqual(prevSettings, $config);

  const handleCopy = async (isPreview: boolean) => {
    const url = $page.url;
    url.pathname = '/follow/' + token + (isPreview ? '-preview' : '');
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
      ui.toast.add('circle-check', $LL.saved(), undefined, 'success');
    } else {
      ui.toast.add('circle-cancel', $LL.authorization(), undefined, 'danger');
    }
  };
</script>

<div {...$$restProps}>
  <!-- #region Pattern -->
  <TextField
    title={$LL.followAlerts.controls.pattern()}
    class="mb-4"
    status="validation"
    statusText={$LL.followAlerts.controls.patternDescription()}
  >
    <Input bind:value={$config.pattern} />
  </TextField>
  <!-- #endregion -->

  <!-- #region Font -->
  <TextField title={$LL.followAlerts.controls.font()} class="mb-4">
    <Input bind:value={$config.font} />
  </TextField>
  <!-- #endregion -->

  <!-- #region Font Size -->
  <TextField title={$LL.followAlerts.controls.fontSize()} class="mb-4">
    <Input bind:value={$config.fontSize} type="number" />
  </TextField>
  <!-- #endregion -->

  <!-- #region Disable Padding -->
  <TextField title={$LL.followAlerts.controls.disablePadding()} class="mb-4">
    <label for="disable-padding" class="cursor-pointer flex items-center space-x-1 select-none ">
      <Checkbox
        on:change={(e) => config.setDisablePadding(e.detail)}
        group={$config.disablePadding ? ['true'] : []}
        value={'true'}
        id="disable-padding"
      />
      <Typography variant="b1">
        {$LL.followAlerts.controls.disablePadding()}
      </Typography>
    </label>
  </TextField>
  <!-- #endregion -->

  <!-- #region Background Image -->
  <TextField
    title={$LL.followAlerts.controls.backgroundImage()}
    status="validation"
    statusText={$LL.followAlerts.controls.backgroundImageDescription()}
    class="mb-4"
  >
    <Input bind:value={$config.backgroundImage} />
  </TextField>
  <!-- #endregion -->

  <!-- #region Color Nickname -->
  <TextField title={$LL.followAlerts.controls.colorNickname()} class="mb-4">
    <ColorPicker bind:value={$config.colorNickname} />
  </TextField>
  <!-- #endregion -->

  <!-- #region Is Gradient Nickname -->
  <TextField title={$LL.followAlerts.controls.isGradientNickname()} class="mb-4">
    <label for="gradient-nickname" class="cursor-pointer flex items-center space-x-1 select-none ">
      <Checkbox
        on:change={(e) => config.setIsGradientNickname(e.detail)}
        group={$config.isGradientNickname ? ['true'] : []}
        value={'true'}
        id="gradient-nickname"
      />
      <Typography variant="b1">
        {$LL.followAlerts.controls.isGradientNickname()}
      </Typography>
    </label>
  </TextField>
  <!-- #endregion -->

  <!-- #region Animation -->
  <AnimationControl
    bind:animation={$config.animation}
    bind:animationEasing={$config.animationEasing}
    bind:animationParams={$config.animationParams}
    class="mb-4"
  />
  <!-- #endregion -->

  <TextField title={$LL.followAlerts.controls.verticalAlign()} class="mb-4">
    <Select
      on:selectitem={(e) => config.setVertical(e.detail)}
      selected={[$config.vertical]}
      values={verticalAlignTypes}
    />
  </TextField>
  <TextField title={$LL.followAlerts.controls.horizontalAlign()} class="mb-4">
    <Select
      on:selectitem={(e) => config.setHorizontal(e.detail)}
      selected={[$config.horizontal]}
      values={horizontalAlignTypes}
    />
  </TextField>

  <TextField title={$LL.save()} class="mb-4">
    <Button disabled={settingsIsSame} on:click={handleSave} color="success">{$LL.save()}</Button>
  </TextField>
  <TextField
    status="validation"
    statusText={$LL.dontShowLinkAnyone()}
    title={$LL.followAlerts.controls.widgetLink()}
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
