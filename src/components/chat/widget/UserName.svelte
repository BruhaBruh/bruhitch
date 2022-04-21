<script lang="ts">
  import config from '$lib/stores/chat/config';
  import type { ColorGradient } from '$types/chat/nickname';
  import { hex, scale } from 'chroma-js';
  import Badges from './Badges.svelte';
  import Separator from './Separator.svelte';
  import type { Badges as TBadges } from 'tmi.js';

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
