<script lang="ts">
  import type { CheckboxValue } from '@components/ui/Checkbox';
  import Icon from '@components/ui/Icon.svelte';
  import { createEventDispatcher } from 'svelte';
  import { scale } from 'svelte/transition';

  const dispath = createEventDispatcher();

  export let group: CheckboxValue[] = [];
  export let disabled = false;
  export let value: CheckboxValue = undefined;
  export let name: string = undefined;
  export let id: string = undefined;

  const onChange = (e: Event) => {
    const { value, checked } = e.target as HTMLInputElement;
    if (checked) {
      group = [...group, value];
    } else {
      group = group.filter((item) => item !== value);
    }
    dispath('change', checked);
  };
</script>

<label
  class={['relative block checkbox', disabled ? '' : 'cursor-pointer'].filter(Boolean).join(' ')}
  on:click
>
  <input
    class="visually-hidden"
    type="checkbox"
    checked={group.includes(value)}
    {disabled}
    {value}
    on:change={onChange}
    {name}
    {id}
    on:click
  />
  <span
    class="checkbox__checkmark block w-5 h-5 transition ease-in rounded-sm border border-gray-darker dark:border-gray-lighter"
  >
    {#if group.includes(value)}
      <div transition:scale={{ duration: 150 }}>
        <Icon icon="check" size={0} class="w-full h-full fill-current" />
      </div>
    {/if}
  </span>
</label>

<style lang="postcss">
  .checkbox__checkmark:hover {
    @apply border-primary-base;
  }

  .checkbox input:focus ~ .checkbox__checkmark {
    @apply ring-2 ring-opacity-50 ring-primary-base;
  }

  .checkbox input:disabled ~ .checkbox__checkmark {
    @apply border-gray-light dark:border-gray-dark text-gray-dark dark:text-gray-light;
  }

  .checkbox input:checked:disabled ~ .checkbox__checkmark {
    @apply bg-gray-light dark:bg-gray-dark;
  }

  .checkbox input:checked:not(:disabled) ~ .checkbox__checkmark {
    @apply bg-primary-base border-primary-base text-gray-lightest;
  }
</style>
