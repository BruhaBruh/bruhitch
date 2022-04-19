<script lang="ts">
	import { browser } from '$app/env';
	import { onDestroy } from 'svelte';
	import { slide } from 'svelte/transition';

	export let isOpen: boolean;
	export let btn: HTMLButtonElement;

	const handleDocumentClick = (e: PointerEvent) => {
		if (e.composedPath().includes(btn)) return;
		isOpen = false;
	};

	const updateListener = (isOpen: boolean) => {
		if (!browser) return;
		document.removeEventListener('click', handleDocumentClick);
		if (!isOpen) return;
		console.log('updated');
		document.addEventListener('click', handleDocumentClick);
	};

	$: updateListener(isOpen);

	onDestroy(() => {
		if (!browser) return;
		document.removeEventListener('click', handleDocumentClick);
	});
</script>

{#if isOpen}
	<div
		transition:slide={{ duration: 150 }}
		class={[
			$$restProps.class,
			'flex flex-col border border-gray-base bg-gray-lightest dark:bg-gray-darkest rounded-default py-1 z-10 overflow-y-auto overflow-x-hidden max-h-60'
		]
			.filter(Boolean)
			.join(' ')}
		on:click|stopPropagation
	>
		<slot />
	</div>
{/if}

<style lang="postcss">
	div::-webkit-scrollbar-track {
		@apply rounded-default;
	}
</style>
