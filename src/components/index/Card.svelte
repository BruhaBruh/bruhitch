<script lang="ts">
  import Typography from '@components/ui/Typography.svelte';

  export let tag: string = 'div';
</script>

<svelte:element
  this={tag}
  {...$$restProps}
  class={[
    $$restProps.class,
    'p-2 sm:p-4 cursor-pointer ',
    'flex items-center justify-center space-x-1 rounded-default focus:ring-2 focus:ring-opacity-50 disabled:text-gray-dark disabled:bg-gray-light dark:disabled:text-gray-light dark:disabled:bg-gray-dark transition ease-in',
    'border text-gray-darkest border-gray-base bg-gray-lightest hover:bg-gray-lighter focus:ring-gray-base dark:text-gray-lightest dark:bg-gray-darkest dark:hover:bg-gray-darker'
  ]
    .filter(Boolean)
    .join(' ')}
>
  <Typography variant="button">
    <slot />
  </Typography>
</svelte:element>
