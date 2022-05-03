<script lang="ts">
  import { generateGradient, generateLightenColor } from '$lib/color';
  import config from '$lib/stores/follow/config';

  export let username: string;

  let nicknameStartColor = $config.colorNickname;
  let nicknameEndColor = $config.isGradientNickname
    ? generateLightenColor($config.colorNickname)
    : $config.colorNickname;

  $: gradient = generateGradient(nicknameStartColor, nicknameEndColor);
</script>

<span
  class="font-semibold"
  style={`background: linear-gradient(to right, ${gradient.join(
    ', '
  )}); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent`}
>
  {username}
</span>
