<script lang="ts">
  import config from '$lib/stores/follow/config';
  import * as chroma from 'chroma-js';

  export let username: string;

  let nicknameStartColor = $config.colorNickname;
  let nicknameEndColor = $config.isGradientNickname
    ? chroma.hex($config.colorNickname).brighten(1.15).hex()
    : $config.colorNickname;

  $: gradient = chroma.scale([nicknameStartColor, nicknameEndColor]).mode('hcl').colors(8, 'hex');
</script>

<span
  class="font-semibold"
  style={`background: linear-gradient(to right, ${gradient.join(
    ', '
  )}); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent`}
>
  {username}
</span>
