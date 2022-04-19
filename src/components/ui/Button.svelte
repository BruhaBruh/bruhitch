<script lang="ts">
  import type { ButtonColor } from '@components/ui/Button';
  import type { IconName } from '@components/ui/Icon';
  import Icon from '@components/ui/Icon.svelte';
  import Typography from '@components/ui/Typography.svelte';

  export let color: ButtonColor = 'primary';
  export let startIcon: IconName = undefined;
  export let endIcon: IconName = undefined;
  export let isLoading = false;
</script>

<button
  {...$$restProps}
  class={[
    $$restProps.class,
    'h-10 px-4 flex items-center justify-center space-x-1 rounded-default focus:ring-2 focus:ring-opacity-50 disabled:text-gray-dark disabled:bg-gray-light dark:disabled:text-gray-light dark:disabled:bg-gray-dark transition ease-in',
    color === 'primary'
      ? 'text-gray-lightest bg-primary-base hover:bg-primary-dark focus:ring-primary-base'
      : '',
    color === 'secondary'
      ? 'border text-gray-darkest border-gray-base bg-gray-lightest hover:bg-gray-lighter focus:ring-gray-base dark:text-gray-lightest dark:bg-gray-darkest dark:hover:bg-gray-darker'
      : '',
    color === 'success'
      ? 'text-gray-darkest bg-success-base hover:bg-success-dark focus:ring-success-base'
      : '',
    color === 'warning'
      ? 'text-gray-darkest bg-warning-base hover:bg-warning-dark focus:ring-warning-base'
      : '',
    color === 'danger'
      ? 'text-gray-darkest bg-danger-base hover:bg-danger-dark focus:ring-danger-base'
      : '',
    isLoading ? '' : ''
  ]
    .filter(Boolean)
    .join(' ')}
  on:click
  on:mouseenter
  on:mouseleave
  on:mousedown
  on:mousemove
  on:mouseup
>
  {#if isLoading}
    <Icon size={28} icon={'spinner'} class="fill-current animate-spin" />
  {:else}
    {#if startIcon}
      <Icon size={28} icon={startIcon} class="fill-current" />
    {/if}
    <Typography variant="button">
      <slot />
    </Typography>
    {#if endIcon}
      <Icon size={28} icon={endIcon} class="fill-current" />
    {/if}
  {/if}
</button>
