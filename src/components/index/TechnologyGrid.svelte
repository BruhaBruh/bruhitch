<script lang="ts">
</script>

<div class={['technology-grid grid gap-2', $$restProps.class].filter(Boolean).join(' ')}>
  <slot />
</div>

<style lang="postcss">
  .technology-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
</style>
