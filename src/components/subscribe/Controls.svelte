<script lang="ts">
  import config from '$lib/stores/subscribe/config';
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
  import IsGradientRecipientControl from './controls/IsGradientRecipientControl.svelte';
  import IsGradientUserNameControl from './controls/IsGradientUserNameControl.svelte';
  import PreviewLink from './PreviewLink.svelte';
  import SaveConfig from './SaveConfig.svelte';
  import WidgetLink from './WidgetLink.svelte';

  let token = '';
</script>

<div {...$$restProps}>
  <TextField
    title={$LL.subscribeAlerts.controls.subPattern()}
    class="mb-4"
    status="validation"
    statusText={$LL.subscribeAlerts.controls.subPatternDescription()}
  >
    <Input bind:value={$config.subPattern} />
  </TextField>
  <TextField
    title={$LL.subscribeAlerts.controls.giftPattern()}
    class="mb-4"
    status="validation"
    statusText={$LL.subscribeAlerts.controls.giftPatternDescription()}
  >
    <Input bind:value={$config.giftPattern} />
  </TextField>
  <TextField
    title={$LL.subscribeAlerts.controls.giftMultiMonthPattern()}
    class="mb-4"
    status="validation"
    statusText={$LL.subscribeAlerts.controls.giftMultiMonthPatternDescription()}
  >
    <Input bind:value={$config.giftMultiMonthPattern} />
  </TextField>
  <TextField
    title={$LL.subscribeAlerts.controls.anonymous()}
    class="mb-4"
    status="validation"
    statusText={$LL.subscribeAlerts.controls.anonymousDescription()}
  >
    <Input bind:value={$config.anonymous} />
  </TextField>
  <TextField
    title={$LL.subscribeAlerts.controls.image()}
    status="validation"
    statusText={$LL.subscribeAlerts.controls.image()}
    class="mb-4"
  >
    <Input bind:value={$config.image} />
  </TextField>
  <ColorControl
    title={$LL.subscribeAlerts.controls.usernameColor()}
    bind:color={$config.usernameColor}
    class="mb-4"
  />
  <IsGradientUserNameControl class="mb-4" />
  <ColorControl
    title={$LL.subscribeAlerts.controls.recipientColor()}
    bind:color={$config.recipientColor}
    class="mb-4"
  />
  <IsGradientRecipientControl class="mb-8" />

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
  <VerticalControl bind:vertical={$config.vertical} class="mb-8" />

  <SaveConfig class="mb-4" bind:token />
  <WidgetLink class="mb-4" {token} />
  <PreviewLink {token} />
</div>
