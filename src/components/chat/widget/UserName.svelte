<script lang="ts">
  import { generateColors, generateGradient, generateLightenColor } from '$lib/color';
  import config from '$lib/stores/chat/config';
  import type { ColorGradient } from '$types/chat/nickname';
  import type { Badges as TBadges } from 'tmi.js';
  import Badges from './Badges.svelte';
  import Separator from './Separator.svelte';

  export let userBadges: TBadges;
  export let color: string | null;
  export let nickname: string;
  export let withSeparator = true;

  // default gradient color
  let nicknameStartColor = $config.defaultColor;
  let nicknameEndColor = generateLightenColor($config.defaultColor);

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
      [nicknameStartColor, nicknameEndColor] = generateColors(color, $config.defaultColor);
    }
  };

  $: color && updateNicknameColors();

  $: gradient = generateGradient(nicknameStartColor, nicknameEndColor);
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
