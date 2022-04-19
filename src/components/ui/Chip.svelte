<script lang="ts">
  import type { ChipColor } from '@components/ui/Chip';
  import Icon from '@components/ui/Icon.svelte';
  import Typography from '@components/ui/Typography.svelte';
  import { createEventDispatcher } from 'svelte';

  export let color: ChipColor = 'secondary';
  export let closeable = false;
  export let selected = false;

  const dispatch = createEventDispatcher();

  const handleCloseClick = (e: MouseEvent) => {
    dispatch('close', e);
    console.log('test');
  };
</script>

<button
  {...$$restProps}
  class={[
    $$restProps.class,
    'h-6 flex items-center space-x-0.5 px-2 border-current rounded-full transition ease-in focus:ring-2 focus:ring-opacity-50 disabled:bg-gray-light disabled:text-gray-dark dark:disabled:text-gray-light dark:disabled:bg-gray-dark',
    selected
      ? 'disabled:bg-gray-dark disabled:text-gray-light dark:disabled:text-gray-dark dark:disabled:bg-gray-light'
      : 'border',
    color === 'primary'
      ? [
          selected
            ? 'bg-primary-darker text-primary-lighter hover:bg-primary-dark'
            : 'bg-primary-lighter text-primary-darker hover:bg-primary-light',
          'focus:ring-primary-base'
        ].join(' ')
      : '',
    color === 'secondary'
      ? [
          selected
            ? 'bg-gray-base hover:bg-gray-dark dark:hover:bg-gray-light text-gray-lightest dark:text-gray-darkest'
            : 'text-gray-base bg-gray-lightest hover:bg-gray-lighter dark:bg-gray-darkest dark:hover:bg-gray-darker',
          'focus:ring-gray-base'
        ].join(' ')
      : '',
    color === 'success'
      ? [
          selected
            ? 'bg-success-darker text-success-lighter hover:bg-success-dark'
            : 'bg-success-lighter text-success-darker hover:bg-success-light',
          'focus:ring-success-base'
        ].join(' ')
      : '',
    color === 'warning'
      ? [
          selected
            ? 'bg-warning-darker text-warning-lighter hover:bg-warning-dark'
            : 'bg-warning-lighter text-warning-darker hover:bg-warning-light',
          'focus:ring-warning-base'
        ].join(' ')
      : '',
    color === 'danger'
      ? [
          selected
            ? 'bg-danger-darker text-danger-lighter hover:bg-danger-dark'
            : 'bg-danger-lighter text-danger-darker hover:bg-danger-light',
          'focus:ring-danger-base'
        ].join(' ')
      : ''
  ]
    .filter(Boolean)
    .join(' ')}
  on:click
>
  <slot name="start" />
  <Typography variant="b2">
    <slot iconSize={16} iconClass={'fill-current'} avatarSize={'extraSmall'} />
  </Typography>
  {#if closeable && !$$restProps.disabled}
    <button on:click|stopPropagation={handleCloseClick}>
      <Icon size={16} icon="circle-cancel" class="fill-current" />
    </button>
  {/if}
</button>
