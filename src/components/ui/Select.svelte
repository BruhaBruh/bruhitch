<script lang="ts">
  import Icon from '@components/ui/Icon.svelte';
  import type { SelectItem, SelectValue } from '@components/ui/Select';
  import type { TextFieldStatus } from '@components/ui/TextField';
  import Typography from '@components/ui/Typography.svelte';
  import Chip from './Chip.svelte';
  import DropDown from './DropDown.svelte';
  import DropDownItem from './DropDownItem.svelte';

  export let status: TextFieldStatus = undefined;
  export let disabled = false;
  export let multi = false;
  export let values: SelectItem[] = [];
  export let selected: SelectValue[] = [];
  export let label = 'No choiced';
  export let dropDownPosition: 'left' | 'center' | 'right' = 'center';

  let isOpen = false;
  let btn: HTMLButtonElement;

  $: hasSelected = !!selected.length;
  $: selectedItems = selected.map((v) => values.find((i) => i.value === v));

  const handleButtonClick = (e: MouseEvent) => {
    if (disabled) return;
    isOpen = !isOpen;
  };

  const handleWheel = (
    e: WheelEvent & {
      currentTarget: EventTarget & HTMLDivElement;
    }
  ) => {
    e.preventDefault();
    if (e.deltaY > 0) {
      e.currentTarget.scrollLeft += 16;
    } else if (e.deltaY < 0) {
      e.currentTarget.scrollLeft -= 16;
    }
  };
</script>

<div {...$$restProps} class="relative">
  <button
    bind:this={btn}
    {disabled}
    class={[
      'h-10 border px-3 rounded-default flex items-center justify-center space-x-1 transition ease-in w-full',
      disabled
        ? 'border-current text-gray-light dark:text-gray-dark'
        : [
            'bg-gray-lightest dark:bg-gray-darkest dark:text-gray-lightest',
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
    on:click={handleButtonClick}
  >
    <div
      class="flex items-center space-x-1 h-7 overflow-y-auto flex-grow scrollbar-hidden"
      on:wheel={handleWheel}
    >
      {#if hasSelected}
        {#if multi}
          {#each selectedItems as item (item.value)}
            <Chip
              selected
              {disabled}
              color={item.color ?? 'secondary'}
              closeable
              on:close={() => {
                selected = selected.filter((v) => v !== item.value);
              }}>{item.label}</Chip
            >
          {/each}
        {:else}
          <Typography variant="b1">
            {selectedItems[0].label}
          </Typography>
        {/if}
      {:else}
        <Typography
          variant="b1"
          class={disabled ? 'text-current' : 'text-gray-dark dark:text-gray-light'}
          >{label}</Typography
        >
      {/if}
    </div>
    <Icon
      icon={isOpen ? 'chevron-up' : 'chevron-down'}
      size={24}
      class={[
        disabled
          ? 'fill-current'
          : 'fill-gray-dark hover:fill-gray-darker dark:fill-gray-light dark:hover:fill-gray-lighter'
      ]
        .filter(Boolean)
        .join(' ')}
    />
  </button>
  <DropDown
    bind:isOpen
    {btn}
    class={[
      'absolute top-full mt-1 min-w-full',
      dropDownPosition === 'left' ? 'left-0' : '',
      dropDownPosition === 'center' ? 'left-1/2 -translate-x-1/2' : '',
      dropDownPosition === 'right' ? 'right-0' : ''
    ]
      .filter(Boolean)
      .join(' ')}
  >
    {#each values as item (item.value)}
      <DropDownItem value={item.value} disabled={item.disabled} {multi} bind:selected>
        {item.label}
      </DropDownItem>
    {/each}
  </DropDown>
</div>
