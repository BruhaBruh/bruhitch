<script lang="ts">
  import config from '$lib/stores/prediction/config';
  import { Animation } from '$types/animation';
  import AnimationControl from '@components/controls/AnimationControl.svelte';
  import ColorControl from '@components/controls/ColorControl.svelte';
  import DisablePaddingControl from '@components/controls/DisablePaddingControl.svelte';
  import FontControl from '@components/controls/FontControl.svelte';
  import FontSizeControl from '@components/controls/FontSizeControl.svelte';
  import VerticalControl from '@components/controls/VerticalControl.svelte';
  import Input from '@components/ui/Input.svelte';
  import TextField from '@components/ui/TextField.svelte';
  import LL from '@i18n/i18n-svelte';
  import HideDelayControl from './controls/HideDelayControl.svelte';
  import PreviewLink from './PreviewLink.svelte';
  import SaveConfig from './SaveConfig.svelte';
  import WidgetLink from './WidgetLink.svelte';

  let token = '';
</script>

<div {...$$restProps}>
  <ColorControl
    title={$LL.predictionWidget.controls.textColor()}
    color={$config.textColor}
    bind:hex={$config.textColor}
    class="mb-4"
  />
  <ColorControl
    title={$LL.predictionWidget.controls.blueColor()}
    color={$config.blueColor}
    bind:hex={$config.blueColor}
    class="mb-4"
  />
  <ColorControl
    title={$LL.predictionWidget.controls.pinkColor()}
    color={$config.pinkColor}
    bind:hex={$config.pinkColor}
    class="mb-4"
  />
  <TextField title={$LL.predictionWidget.controls.channelPointImage()} class="mb-4">
    <Input bind:value={$config.channelPointImage} />
  </TextField>
  <HideDelayControl class="mb-8" bind:hideDelay={$config.hideDelay} />

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
      duration: $config.animation !== Animation.Nothing,
      start: $config.animation === Animation.Scale,
      opacity: $config.animation === Animation.Scale
    }}
  />
  <VerticalControl bind:vertical={$config.vertical} class="mb-8" />

  <SaveConfig class="mb-4" bind:token />
  <WidgetLink class="mb-4" {token} />
  <PreviewLink {token} />
</div>
