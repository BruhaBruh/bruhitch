<script lang="ts">
  import config from '$lib/stores/follow/config';
  import { Animation } from '$types/animation';
  import AnimationControl from '@components/controls/AnimationControl.svelte';
  import ColorControl from '@components/controls/ColorControl.svelte';
  import DisablePaddingControl from '@components/controls/DisablePaddingControl.svelte';
  import FontControl from '@components/controls/FontControl.svelte';
  import FontSizeControl from '@components/controls/FontSizeControl.svelte';
  import HorizontalControl from '@components/controls/HorizontalControl.svelte';
  import VerticalControl from '@components/controls/VerticalControl.svelte';
  import Input from '@components/ui/Input.svelte';
  import TextField from '@components/ui/TextField.svelte';
  import LL from '@i18n/i18n-svelte';
  import IsGradientNicknameControl from './controls/IsGradientNicknameControl.svelte';
  import PreviewLink from './PreviewLink.svelte';
  import SaveConfig from './SaveConfig.svelte';
  import WidgetLink from './WidgetLink.svelte';

  let token = '';
</script>

<div {...$$restProps}>
  <TextField
    title={$LL.followAlerts.controls.pattern()}
    class="mb-4"
    status="validation"
    statusText={$LL.followAlerts.controls.patternDescription()}
  >
    <Input bind:value={$config.pattern} />
  </TextField>
  <TextField
    title={$LL.followAlerts.controls.backgroundImage()}
    status="validation"
    statusText={$LL.followAlerts.controls.backgroundImageDescription()}
    class="mb-4"
  >
    <Input bind:value={$config.backgroundImage} />
  </TextField>
  <ColorControl
    title={$LL.followAlerts.controls.colorNickname()}
    bind:color={$config.colorNickname}
    class="mb-4"
  />
  <IsGradientNicknameControl class="mb-8" />

  <FontControl bind:font={$config.font} class="mb-4" />
  <FontSizeControl bind:fontSize={$config.fontSize} class="mb-4" />
  <DisablePaddingControl bind:disablePadding={$config.disablePadding} class="mb-4" />
  <AnimationControl
    class="mb-4"
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
  <VerticalControl class="mb-4" bind:vertical={$config.vertical} />
  <HorizontalControl class="mb-8" bind:horizontal={$config.horizontal} />

  <SaveConfig class="mb-4" bind:token />
  <WidgetLink class="mb-4" {token} />
  <PreviewLink {token} />
</div>
