<script lang="ts">
  import type { IconName } from '@components/ui/Icon';
  import Icon from '@components/ui/Icon.svelte';
  import type { ToastColor } from '@components/ui/Toast';
  import Typography from '@components/ui/Typography.svelte';
  import { createEventDispatcher, onDestroy, onMount } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { fade } from 'svelte/transition';

  export let id: number;
  export let header: string;
  export let icon: IconName;
  export let color: ToastColor = 'secondary';
  export let description: string = undefined;
  export let duration = 3000;
  export let animation: any = fade;

  let timeout: NodeJS.Timeout;

  const dispatch = createEventDispatcher();

  const dispatchRemove = () => dispatch('remove', id);

  let progressHeight = tweened(100, {
    duration
  });

  onMount(() => {
    progressHeight.set(0);
    console.log(duration);
    timeout = setTimeout(() => dispatchRemove(), duration);
  });

  onDestroy(() => {
    clearTimeout(timeout);
  });

  const handleClick = () => dispatchRemove();
</script>

<div
  class={[
    $$restProps.class,
    'rounded-default p-2 shadow-xs flex items-center space-x-2 border border-gray-base bg-gray-lightest dark:bg-gray-darkest max-w-xs w-full'
  ]
    .filter(Boolean)
    .join(' ')}
  transition:animation={{ duration: 150 }}
>
  <div class="w-1 rounded-sm bg-gray-base flex items-end overflow-hidden self-stretch">
    <div
      class={[
        'w-full rounded-sm',
        color === 'primary' ? 'bg-primary-base' : '',
        color === 'secondary' ? 'bg-gray-darkest dark:bg-gray-lightest' : '',
        color === 'success' ? 'bg-success-base' : '',
        color === 'warning' ? 'bg-warning-base' : '',
        color === 'danger' ? 'bg-danger-base' : ''
      ]
        .filter(Boolean)
        .join(' ')}
      style={`height: ${$progressHeight}%`}
    />
  </div>
  <Icon
    size={32}
    {icon}
    class={[
      color === 'primary' ? 'fill-primary-base' : '',
      color === 'secondary' ? 'fill-gray-darkest dark:fill-gray-lightest' : '',
      color === 'success' ? 'fill-success-base' : '',
      color === 'warning' ? 'fill-warning-base' : '',
      color === 'danger' ? 'fill-danger-base' : ''
    ]
      .filter(Boolean)
      .join(' ')}
  />
  <div class="w-full">
    <Typography variant="b2" class="text-gray-darkest dark:text-gray-lightest">{header}</Typography>
    {#if description}
      <Typography variant="ht" class="text-gray-darker dark:text-gray-lighter"
        >{description}</Typography
      >
    {/if}
  </div>
  <button on:click={handleClick}>
    <Icon size={24} icon="cancel" class="fill-gray-base" />
  </button>
</div>
