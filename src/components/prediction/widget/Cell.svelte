<script lang="ts">
  import config from '$lib/stores/prediction/config';
</script>

<div
  class="cell flex items-center"
  style={`background-color: rgba(17, 17, 17, 0.75); border-radius: ${
    $config.fontSize / 2
  }px; padding: 0px ${$config.fontSize / 2}px; height: ${$config.fontSize * 2.5}px; font-size: ${
    $config.fontSize * 1.5
  }px`}
>
  <slot />
</div>

<style lang="postcss">
  :global(.cell > *) {
    margin-right: 0.25em;
  }

  :global(.cell > *:last-child) {
    margin-right: 0;
  }
</style>
