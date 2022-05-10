<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { spring } from 'svelte/motion';

  export let isSelected = false;

  const dispatch = createEventDispatcher();

  let leftMargin = spring(isSelected ? 22 : 2);

  $: {
    isSelected ? leftMargin.set(22) : leftMargin.set(2);
  }

  const handleClick = () => {
    isSelected = !isSelected;
    dispatch('toggled');
  };
</script>

<button
  {...$$restProps}
  type="button"
  class={[
    $$restProps.class,
    'switch relative block cursor-pointer h-5 w-10 rounded-full transition ease-in focus:ring-2 focus:ring-opacity-50 focus:ring-primary-base disabled:bg-gray-light dark:disabled:bg-gray-dark',
    isSelected ? 'bg-primary-base' : 'bg-gray-darker dark:bg-gray-lightest'
  ]
    .filter(Boolean)
    .join(' ')}
  on:click={handleClick}
>
  <div
    class={[
      'circ rounded-full h-4 w-4 transition ease-in bg-gray-lightest',
      $$restProps.disabled
        ? 'bg-gray-dark dark:bg-gray-light'
        : isSelected
        ? ''
        : 'dark:bg-gray-darker'
    ]
      .filter(Boolean)
      .join(' ')}
    style={`margin-left: ${$leftMargin}px`}
  />
</button>

<style lang="postcss">
  .switch:hover:not(:disabled) .circ {
    @apply bg-primary-lighter;
  }
</style>
