<script lang="ts">
  import type { RadioValue } from '@components/ui/Radio';
  import { scale } from 'svelte/transition';

  export let group: RadioValue = undefined;
  export let disabled = false;
  export let value: RadioValue = undefined;
  export let name: string = undefined;
  export let id: string = undefined;
</script>

<label class="radio relative block cursor-pointer">
  <input class="visually-hidden" type="radio" bind:group {disabled} {value} {name} {id} />
  <span
    class="radio__checkmark w-5 h-5 transition ease-in flex items-center justify-center rounded-full border border-gray-darker dark:border-gray-lighter"
  >
    {#if group === value}
      <div transition:scale={{ duration: 150 }} class="h-2.5 w-2.5 rounded-full bg-current" />
    {/if}
  </span>
</label>

<style lang="postcss">
  .radio__checkmark:hover {
    @apply border-primary-base;
  }

  .radio input:focus ~ .radio__checkmark {
    @apply ring-2 ring-opacity-50 ring-primary-base;
  }

  .radio input:disabled ~ .radio__checkmark {
    @apply border-gray-light dark:border-gray-dark text-gray-dark dark:text-gray-light;
  }

  .radio input:checked:disabled ~ .radio__checkmark {
    @apply bg-gray-light dark:bg-gray-dark;
  }

  .radio input:checked:not(:disabled) ~ .radio__checkmark {
    @apply bg-primary-base border-primary-base text-gray-lightest;
  }
</style>
