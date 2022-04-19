<script lang="ts">
  import Icon from '@components/ui/Icon.svelte';
  import type { TextFieldStatus } from '@components/ui/TextField';
  import Typography from '@components/ui/Typography.svelte';

  export let title: string = undefined;
  export let status: TextFieldStatus = undefined;
  export let statusText: string = undefined;
  export let statusClass = '';
</script>

<div
  {...$$restProps}
  class={[$$restProps.class, 'space-y-0.5 flex flex-col items-stretch'].filter(Boolean).join(' ')}
>
  {#if title}
    <Typography variant="b2" class="text-gray-darker dark:text-gray-lighter">{title}</Typography>
  {/if}
  <slot />
  {#if status}
    <div class={['flex space-x-1', statusClass].filter(Boolean).join(' ')}>
      <Icon
        size={16}
        icon={status === 'loading'
          ? 'spinner'
          : status === 'success'
          ? 'circle-check'
          : status === 'validation'
          ? 'circle-warning'
          : 'circle-cancel'}
        class={[
          'mt-0.5 ml-0.5',
          status === 'loading' ? 'fill-primary-base animate-spin' : '',
          status === 'success' ? 'fill-success-base' : '',
          status === 'validation' ? 'fill-warning-base' : '',
          status === 'error' ? 'fill-danger-base' : ''
        ]
          .filter(Boolean)
          .join(' ')}
      />
      <Typography variant="ht" class="text-gray-dark dark:text-gray-light">{statusText}</Typography>
    </div>
  {/if}
</div>
