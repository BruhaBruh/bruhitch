<script lang="ts">
  import { copyText } from '$lib/copyText';
  import { replaceBetween } from '$lib/replaceBetween';
  import { ui } from '$lib/stores/ui';
  import type { IconName } from '@components/ui/Icon';
  import Icon from '@components/ui/Icon.svelte';
  import type { TextFieldStatus } from '@components/ui/TextField';
  import LL from '@i18n/i18n-svelte';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let input: HTMLInputElement = undefined;
  export let status: TextFieldStatus = undefined;
  export let placeholder = '';
  export let value: string | number = '';
  export let icon: IconName = undefined;
  export let iconClickable = false;
  export let readonly = false;
  export let disabled = false;
  export let type: 'text' | 'color' | 'number' = 'text';

  const handleInputClick = (e: MouseEvent) => {
    if (disabled) return;
    input.focus();
  };

  const handleIconClick = (e: MouseEvent) => {
    if (!iconClickable) return;
    e.stopPropagation();
    dispatch('iconclick', e);
  };

  const handleKeyPress = (e: KeyboardEvent & { currentTarget: HTMLInputElement }) => {
    if (type === 'text') return;
    const char = String.fromCharCode(e.charCode || e.which);
    const potentialNewValue = replaceBetween(
      e.currentTarget.value,
      e.currentTarget.selectionStart,
      e.currentTarget.selectionEnd,
      char
    );
    if (type === 'number') {
      const isNumberRegexp = /^[+-]?([0-9]*[.,])?([0-9]?)*$/i;
      if (isNumberRegexp.test(potentialNewValue)) return;
    } else if (type === 'color') {
      const isColorRegexp = /^#[a-f0-9]{0,6}$/i;
      if (isColorRegexp.test(potentialNewValue)) return;
    }
    e.stopPropagation();
    e.preventDefault();
  };

  const handleCopyColor = async () => {
    await copyText(value.toString());
    ui.toast.add('circle-check', $LL.copied(), undefined, 'success');
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
  style="min-height: 40px"
  on:click={handleInputClick}
>
  {#if type === 'color'}
    <button
      class="h-6 aspect-square rounded-sm border border-gray-base"
      style={`background-color: ${value}`}
      on:click={handleCopyColor}
    />
  {/if}
  <input
    class={[
      'w-full text-base bg-transparent appearance-none placeholder:text-gray-dark dark:placeholder:text-gray-light disabled:placeholder:text-current dark:disabled:placeholder:text-current'
    ]
      .filter(Boolean)
      .join(' ')}
    {placeholder}
    {readonly}
    {disabled}
    bind:this={input}
    bind:value
    type="text"
    on:change
    on:input
    on:keypress={handleKeyPress}
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
