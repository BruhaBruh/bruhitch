<script lang="ts">
  import Checkbox from '@components/ui/Checkbox.svelte';
  import type { SelectValue } from '@components/ui/Select';
  import Typography from '@components/ui/Typography.svelte';
  import { createEventDispatcher } from 'svelte';

  export let selected: SelectValue[] = [];
  export let value: SelectValue;
  export let multi = false;
  export let disabled = false;

  const dispatch = createEventDispatcher();

  $: isSelected = selected.includes(value);

  const handleClick = () => {
    dispatch('select', !isSelected);
    if (multi) {
      if (isSelected) {
        selected = selected.filter((v) => v !== value);
      } else {
        selected = [...selected, value];
      }
    } else {
      if (isSelected) return;
      selected = [value];
    }
  };
</script>

<button
  on:click={handleClick}
  {disabled}
  class={[
    'h-8 disabled:text-gray-dark dark:disabled:text-gray-light disabled:hover:bg-transparent dark:disabled:hover:bg-transparent px-2 flex items-center space-x-2 border-2 border-transparent transition ease-in',
    isSelected && !multi
      ? 'text-gray-lightest bg-primary-base hover:bg-primary-dark disabled:bg-primary-lighter'
      : 'text-gray-darkest dark:text-gray-lightest hover:bg-gray-lighter dark:hover:bg-gray-darker focus:border-opacity-50 focus:border-primary-base'
  ]
    .filter(Boolean)
    .join(' ')}
>
  {#if multi}
    <Checkbox group={selected} {value} {disabled} on:click={disabled ? undefined : handleClick} />
  {/if}
  <Typography variant="button"><slot /></Typography>
</button>
