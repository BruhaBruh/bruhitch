<script lang="ts">
  import config from '$lib/stores/chat/config';
  import type { ColorGradient } from '$types/chat/nickname';
  import { contrast, deltaE, hex, mix, rgb, scale } from 'chroma-js';
  import type { Badges as TBadges } from 'tmi.js';
  import Badges from './Badges.svelte';
  import Separator from './Separator.svelte';

  export let userBadges: TBadges;
  export let color: string | null;
  export let nickname: string;
  export let withSeparator = true;

  // default gradient color
  let nicknameStartColor = $config.defaultColor;
  let nicknameEndColor = hex($config.defaultColor).brighten(1.25).hex();

  const updateNicknameColors = () => {
    const customNicknames = $config.nicknameColors;
    if (Object.keys(customNicknames).includes(nickname)) {
      if (typeof customNicknames[nickname] !== 'string') {
        const colors = customNicknames[nickname] as ColorGradient;
        nicknameStartColor = colors.start;
        nicknameEndColor = colors.end;
        return;
      }
      nicknameStartColor = customNicknames[nickname] as string;
      nicknameEndColor = customNicknames[nickname] as string;
      return;
    }

    if ($config.gradientOnlyCustom) {
      if (color !== null) {
        nicknameStartColor = color;
        nicknameEndColor = color;
        return;
      }
      nicknameStartColor = $config.defaultColor;
      nicknameEndColor = $config.defaultColor;
      return;
    }

    if (color !== null) {
      // TODO Check in action
      while (contrast(color, rgb(23, 23, 23).alpha(0.75)) < 4.5) {
        color = hex(color).brighten(0.2).hex();
      }
      if (deltaE(color, '#fafafa') < 30) {
        color = mix($config.defaultColor, color, 0.25).hex();
      }
      nicknameStartColor = color;
      nicknameEndColor = hex(color).brighten(1.25).hex();
    }
  };

  $: color && updateNicknameColors();

  $: gradient = scale([nicknameStartColor, nicknameEndColor]).mode('hcl').colors(8, 'hex');
</script>

<div class="username">
  <Badges {userBadges} /><span
    class="name"
    style={`background: linear-gradient(to right, ${gradient.join(
      ', '
    )}); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent`}
    >{nickname}</span
  >{#if withSeparator}<Separator />{/if}
</div>

<style>
  .username {
    display: inline-block;
  }
  .name {
    word-break: break-all;
    font-weight: 700;
  }
</style>
