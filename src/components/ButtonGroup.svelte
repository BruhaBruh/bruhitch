<script lang="ts">
	import type { ButtonGroupDirection } from './ButtonGroup';

	export let direction: ButtonGroupDirection = 'horizontal';
</script>

<div
	{...$$restProps}
	class={[
		$$restProps.class,
		'btn-group flex items-stretch',
		direction === 'horizontal' ? 'hor' : '',
		direction === 'vertical' ? 'ver flex-col' : ''
	]
		.filter(Boolean)
		.join(' ')}
>
	<slot />
</div>

<style lang="postcss">
	:global(.btn-group > *:not(button)) {
		position: absolute;
		width: 1px;
		height: 1px;
		margin: -1px;
		border: 0;
		padding: 0;
		white-space: nowrap;
		clip-path: inset(100%);
		clip: rect(0 0 0 0);
		overflow: hidden;
	}

	:global(.btn-group > button) {
		flex-grow: 1;
	}

	:global(.btn-group > button:focus) {
		z-index: 1;
	}

	:global(.btn-group.hor > button:first-child) {
		border-end-end-radius: 0 !important;
		border-start-end-radius: 0 !important;
	}

	:global(.btn-group.hor > button:last-child) {
		border-end-start-radius: 0 !important;
		border-start-start-radius: 0 !important;
	}

	:global(.btn-group.ver > button:first-child) {
		border-end-start-radius: 0 !important;
		border-end-end-radius: 0 !important;
	}

	:global(.btn-group.ver > button:last-child) {
		border-start-start-radius: 0 !important;
		border-start-end-radius: 0 !important;
	}

	:global(.btn-group > button:not(:first-child):not(:last-child)) {
		border-radius: 0 !important;
	}
</style>
