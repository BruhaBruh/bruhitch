<script lang="ts">
  import type { AvatarSize, AvatarVariant } from '@components/ui/Avatar';
  import Typography from '@components/ui/Typography.svelte';

  export let size: AvatarSize | string = 'medium';
  export let variant: AvatarVariant = 'rounded';
  export let src: string;
  export let alt: string;

  let loadError = !src;
  let showText = size !== 'extraSmall';

  const handleError = () => {
    loadError = true;
    console.log('test');
  };
  const fallbackColorClass = [
    'bg-gray-base text-gray-darker',
    'bg-primary-lighter text-primary-darker',
    'bg-success-lighter text-success-darker',
    'bg-warning-lighter text-warning-darker',
    'bg-danger-lighter text-danger-darker'
  ];
</script>

<figure
  {...$$restProps}
  class={[
    $$restProps.class,
    size === 'extraSmall' ? 'w-4 h-4' : '',
    size === 'small' ? 'w-6 h-6' : '',
    size === 'medium' ? 'w-8 h-8' : '',
    size === 'large' ? 'w-10 h-10' : '',
    size === 'huge' ? 'w-12 h-12' : '',
    variant === 'circle' ? 'rounded-full' : '',
    variant === 'rounded' ? 'rounded-sm' : '',
    'overflow-hidden select-none',
    loadError ? fallbackColorClass[Math.floor(Math.random() * fallbackColorClass.length)] : ''
  ]
    .filter(Boolean)
    .join(' ')}
>
  {#if !loadError}
    <img
      {src}
      {alt}
      class="object-cover object-center outline-none min-w-full min-h-full"
      on:error={handleError}
    />
  {/if}
  {#if showText && loadError}
    <figcaption class="h-full w-full flex items-center justify-center">
      <Typography variant={size === 'small' ? 'ht' : size === 'huge' ? 'b1' : 'b2'}
        ><slot /></Typography
      >
    </figcaption>
  {/if}
</figure>
