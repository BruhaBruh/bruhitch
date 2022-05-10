<script lang="ts">
  export let tag: string = 'div';
</script>

<svelte:element
  this={tag}
  {...$$restProps}
  class={[
    $$restProps.class,
    'p-2 sm:p-4 cursor-pointer',
    'flex items-center justify-start rounded-default disabled:text-gray-dark disabled:bg-gray-light dark:disabled:text-gray-light dark:disabled:bg-gray-dark transition ease-in',
    'border text-gray-darkest border-gray-base bg-gray-lightest hover:bg-gray-lighter dark:text-gray-lightest dark:bg-gray-darkest dark:hover:bg-gray-darker'
  ]
    .filter(Boolean)
    .join(' ')}
>
  <slot />
</svelte:element>
