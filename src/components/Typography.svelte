<script lang="ts">
	import type { TypographyVariant } from './Typography';

	export let variant: TypographyVariant;
</script>

{#if variant === 'h1'}
	<h1
		{...$$restProps}
		class={['font-semibold text-2xl', $$restProps.class].filter(Boolean).join(' ')}
	>
		<slot />
	</h1>
{:else if variant === 'h2'}
	<h2
		{...$$restProps}
		class={['font-semibold text-xl', $$restProps.class].filter(Boolean).join(' ')}
	>
		<slot />
	</h2>
{:else if variant === 'h3'}
	<h3
		{...$$restProps}
		class={['font-semibold text-lg', $$restProps.class].filter(Boolean).join(' ')}
	>
		<slot />
	</h3>
{:else if variant === 'b1'}
	<p {...$$restProps} class={['text-base', $$restProps.class].filter(Boolean).join(' ')}>
		<slot />
	</p>
{:else if variant === 'b2'}
	<p {...$$restProps} class={['text-sm', $$restProps.class].filter(Boolean).join(' ')}><slot /></p>
{:else if variant === 'ht'}
	<p {...$$restProps} class={['text-xs', $$restProps.class].filter(Boolean).join(' ')}><slot /></p>
{:else if variant === 'button'}
	<span
		{...$$restProps}
		class={['font-medium text-base', $$restProps.class].filter(Boolean).join(' ')}><slot /></span
	>
{:else}
	<slot />
{/if}
