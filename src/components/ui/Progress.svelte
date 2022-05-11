<script lang="ts">
  import type { IconName } from '@components/ui/Icon';
  import Icon from '@components/ui/Icon.svelte';
  import type { TextFieldStatus } from '@components/ui/TextField';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let input: HTMLInputElement = undefined;
  export let status: TextFieldStatus = undefined;
  export let placeholder = '';
  export let value: string | number = '';
  export let icon: IconName = undefined;
  export let iconClickable = false;
  export let disabled = false;

  const handleInputClick = (e: MouseEvent) => {
    if (disabled) return;
    input.focus();
  };

  const handleIconClick = (e: MouseEvent) => {
    if (!iconClickable) return;
    e.stopPropagation();
    dispatch('iconclick', e);
  };
</script>

<div
  {...$$restProps}
  class={[
    $$restProps.class,
    'h-10 border px-3 rounded-default flex items-center justify-center space-x-1 transition ease-in',
    disabled
      ? 'border-current text-gray-light dark:text-gray-dark'
      : [
          'cursor-text bg-gray-lightest dark:bg-gray-darkest dark:text-gray-lightest',
          'focus-within:ring-2 focus-within:ring-opacity-50 focus-within:ring-primary-base',
          status === undefined
            ? 'border-gray-lighter dark:border-gray-darker hover:border-gray-base dark:hover:border-gray-base'
            : '',
          status === 'validation' ? 'border-warning-base' : '',
          status === 'error' ? 'border-danger-base' : '',
          status === 'loading' ? 'border-primary-base' : '',
          status === 'success' ? 'border-success-base' : ''
        ]
          .filter(Boolean)
          .join(' ')
  ]
    .filter(Boolean)
    .join(' ')}
  on:click={handleInputClick}
>
  <input
    class={[
      'w-full text-base bg-transparent appearance-none placeholder:text-gray-dark dark:placeholder:text-gray-light disabled:placeholder:text-current dark:disabled:placeholder:text-current'
    ]
      .filter(Boolean)
      .join(' ')}
    {placeholder}
    {disabled}
    bind:this={input}
    bind:value
    type="range"
    on:change
    on:input
    min={$$restProps.min}
    max={$$restProps.max}
    step={$$restProps.step}
  />
  {#if icon}
    <Icon
      {icon}
      size={24}
      class={[
        disabled
          ? 'fill-current'
          : 'fill-gray-dark hover:fill-gray-darker dark:fill-gray-light dark:hover:fill-gray-lighter',
        iconClickable && !disabled ? 'cursor-pointer' : ''
      ]
        .filter(Boolean)
        .join(' ')}
      on:click={handleIconClick}
    />
  {/if}
</div>
