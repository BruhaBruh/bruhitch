<script lang="ts">
  import config from '$lib/stores/donate/config';
  import Icon from '@components/ui/Icon.svelte';

  export let isAudio: boolean;
</script>

{#if isAudio}
  <div
    class="flex items-center justify-center aspect-square"
    style={`background-color: rgba(17, 17, 17, 0.75); border-radius: ${
      $config.fontSize / 2
    }px; padding: ${$config.fontSize / 2}px; font-size: ${$config.fontSize * 2}px; margin-left: ${
      $config.fontSize / 2
    }px; height: ${$config.fontSize * 3}px`}
  >
    <Icon icon="sound" size={$config.fontSize * 2} style={'fill: ' + $config.soundColor} />
  </div>
{/if}
