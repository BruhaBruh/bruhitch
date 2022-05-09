<script lang="ts">
  import config from '$lib/stores/donate/config';

  export let text: string;
</script>

<p
  class="whitespace-normal"
  style={`color: ${$config.textColor}; margin-top: ${$config.fontSize / 2}; font-size: ${
    $config.fontSize * 1.5
  }px`}
>
  {text}
</p>
