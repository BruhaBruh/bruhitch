<script lang="ts">
  import { browser } from '$app/env';
  import { page } from '$app/stores';
  import UrlEncoder from '$lib/chat/urlEncoder';
  import UrlParser from '$lib/chat/urlParser';
  import { copyText } from '$lib/copyText';
  import config from '$lib/stores/chat/config';
  import { me } from '$lib/stores/me';
  import { ui } from '$lib/stores/ui';
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
  import CustomColorNicknamesControl from './CustomColorNicknamesControl.svelte';
  import HiddenNicknamesControl from './HiddenNicknamesControl.svelte';

  const chatTypes: SelectItem[] = [
    {
      value: 'default',
      label: $LL.chat.controls.default()
    },
    {
      value: 'block',
      label: $LL.chat.controls.block()
    },
    {
      value: 'alternative-block',
      label: $LL.chat.controls.alternativeBlock()
    }
  ];

  let isLoadedLink = false;

  const loadFromLink = (link: string) => {
    const settings = new UrlParser(link).getSettings();
    config.loadSettings(settings);
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
  <TextField title={$LL.chat.controls.channel()} class="mb-4">
    <Input bind:value={$config.channel} />
  </TextField>
  <!--#endregion-->

  <!--#region ChatType-->
  <TextField title={$LL.chat.controls.chatType()} class="mb-4">
    <Select
      on:selectitem={(e) => config.setChatType(e.detail)}
      selected={[$config.chatType]}
      values={chatTypes}
    />
  </TextField>
  <!--#endregion-->

  <!-- #region Hide Rewards -->
  <TextField title={$LL.chat.controls.hideRewards()} class="mb-4">
    <label for="hide-rewards" class="cursor-pointer flex items-center space-x-1 select-none">
      <Checkbox
        on:change={(e) => config.setHideReward(e.detail)}
        group={$config.hideReward ? ['true'] : []}
        value={'true'}
        id="hide-rewards"
      />
      <Typography variant="b1">
        {$LL.chat.controls.hideRewardsDescription()}
      </Typography>
    </label>
  </TextField>
  <!-- #endregion -->

  <!-- #region Hidden Nicknames -->
  <HiddenNicknamesControl bind:hiddenNicknames={$config.hiddenNicknames} class="mb-4" />
  <!-- #endregion -->

  <!-- #region Default Color -->
  <TextField title={$LL.chat.controls.defaultColor()} class="mb-4">
    <ColorPicker bind:value={$config.defaultColor} />
  </TextField>
  <!-- #endregion -->

  <!-- #region Gradient Only to custom nicknames -->
  <TextField title={$LL.chat.controls.gradientOnlyToCustomNicknames()} class="mb-4">
    <label for="gradient-only" class="cursor-pointer flex items-center space-x-1 select-none ">
      <Checkbox
        on:change={(e) => config.setGradientOnlyCustom(e.detail)}
        group={$config.gradientOnlyCustom ? ['true'] : []}
        value={'true'}
        id="gradient-only"
      />
      <Typography variant="b1">
        {$LL.chat.controls.gradientOnlyToCustomNicknames()}
      </Typography>
    </label>
  </TextField>
  <!-- #endregion -->

  <!-- #region Custom Nicknames -->
  <CustomColorNicknamesControl bind:userNicknames={$config.nicknameColors} class="mb-4" />
  <!-- #endregion -->

  <!-- #region Font -->
  <TextField title={$LL.chat.controls.font()} class="mb-4">
    <Input bind:value={$config.font} />
  </TextField>
  <!-- #endregion -->

  <!-- #region Font Size -->
  <TextField title={$LL.chat.controls.fontSize()} class="mb-4">
    <Input bind:value={$config.fontSize} type="number" />
  </TextField>
  <!-- #endregion -->

  <!-- #region Disable Padding -->
  <TextField title={$LL.chat.controls.disablePadding()} class="mb-4">
    <label for="disable-padding" class="cursor-pointer flex items-center space-x-1 select-none ">
      <Checkbox
        on:change={(e) => config.setDisablePadding(e.detail)}
        group={$config.disablePadding ? ['true'] : []}
        value={'true'}
        id="disable-padding"
      />
      <Typography variant="b1">
        {$LL.chat.controls.disablePadding()}
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

  <!-- #region Generated Link -->
  <TextField title={$LL.chat.controls.chatLink()} class="mb-4">
    <div class="flex space-x-2">
      <Input readonly value={url} class="flex-1" />
      <Button color="secondary" on:click={() => handleClickCopy(false)}>{$LL.copy()}</Button>
    </div>
  </TextField>
  <!-- #endregion -->

  <!-- #region Preview Link -->
  <TextField title={$LL.preview()} class="mb-4">
    <div class="flex space-x-2">
      <Input readonly value={previewUrl} class="flex-1" />
      <Button color="secondary" on:click={() => handleClickCopy(true)}>{$LL.copy()}</Button>
    </div>
  </TextField>
  <!-- #endregion -->

  <!-- #region Load Config From Link -->
  <TextField title={$LL.chat.controls.loadConfigFromLink()}>
    <div class="flex space-x-2">
      <Input bind:value={loadUrl} class="flex-1" />
      <Button color="secondary" on:click={handleClickLoad}>{$LL.load()}</Button>
    </div>
  </TextField>
  <!-- #endregion -->
</div>
