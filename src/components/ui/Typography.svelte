<script lang="ts">
  import type { TypographyVariant } from '@components/ui/Typography';

  export let variant: TypographyVariant;

  const variants: {
    [variant in TypographyVariant]: {
      element: 'h1' | 'h2' | 'h3' | 'p' | 'span';
      class: string;
    };
  } = {
    h1: { element: 'h1', class: 'font-semibold text-2xl' },
    h2: { element: 'h2', class: 'font-semibold text-2xl' },
    h3: { element: 'h3', class: 'font-semibold text-lg' },
    b1: { element: 'p', class: 'text-base' },
    b2: { element: 'p', class: 'text-sm' },
    ht: { element: 'p', class: 'text-xs' },
    button: { element: 'span', class: 'font-medium text-base' }
  };
</script>

{#if variants[variant]}
  <svelte:element
    this={variants[variant].element}
    {...$$restProps}
    class={[variants[variant].class, $$restProps.class].filter(Boolean).join(' ')}
  >
    <slot />
  </svelte:element>
{:else}
  <slot />
{/if}
