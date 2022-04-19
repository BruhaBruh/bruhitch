<script lang="ts">
  import type { ButtonColor } from '@components/ui/Button';
  import type { IconName } from '@components/ui/Icon';
  import Icon from '@components/ui/Icon.svelte';
  import type { IconButtonSize } from '@components/ui/IconButton';

  export let color: ButtonColor = 'primary';
  export let size: IconButtonSize = 'large';
  export let icon: IconName;
  export let isLoading = false;
</script>

<button
  {...$$restProps}
  class={[
    $$restProps.class,
    'flex items-center justify-center rounded-default focus:ring-2 focus:ring-opacity-50 disabled:text-gray-dark disabled:bg-gray-light dark:disabled:text-gray-light dark:disabled:bg-gray-dark transition ease-in',
    size === 'large' ? 'h-10 w-10' : '',
    size === 'medium' ? 'h-8 w-8' : '',
    size === 'small' ? 'h-6 w-6' : '',
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
    <Icon
      size={size === 'large' ? 28 : size === 'medium' ? 24 : 20}
      icon={'spinner'}
      class="fill-current animate-spin"
    />
  {:else}
    <Icon size={size === 'large' ? 28 : size === 'medium' ? 24 : 20} {icon} class="fill-current" />
  {/if}
</button>
