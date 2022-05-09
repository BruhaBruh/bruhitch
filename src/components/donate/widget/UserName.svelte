<script lang="ts">
  import { generateGradient, generateLightenColor } from '$lib/color';
  import config from '$lib/stores/donate/config';

  export let username: string | null;

  const startColor = $config.usernameColor;
  const endColor = $config.isGradientUsername
    ? generateLightenColor($config.usernameColor)
    : $config.usernameColor;

  const gradient = generateGradient(startColor, endColor);
</script>

<span
  class="w-full"
  style={`background: linear-gradient(to right, ${gradient.join(
    ', '
  )}); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent`}
  >{username ? username : $config.anonymous}</span
>
