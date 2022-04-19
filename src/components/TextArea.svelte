<script lang="ts">
	import type { TextFieldStatus } from './TextField';

	export let status: TextFieldStatus = undefined;
	export let placeholder = '';
	export let value: string | number = '';
	export let readonly = false;
	export let disabled = false;
	export let minRows: number = 2;
	export let maxRows: number | undefined = 3;

	let textarea: HTMLTextAreaElement;

	const handleInputClick = (e: MouseEvent) => {
		if (disabled) return;
		textarea.focus();
	};

	const autoheight = (node: HTMLTextAreaElement, value: any) => {
		const computedLineHeight = getComputedStyle(node).lineHeight;
		if (computedLineHeight === 'normal') return {};
		const lineheight = Number(computedLineHeight.replace('px', ''));

		const resize = () => {
			if (!node) return;
			node.style.height = '1px';
			node.style.height = node.scrollHeight + 'px';
			const rows = node.scrollHeight / lineheight;

			if (rows < minRows || maxRows < minRows) {
				node.style.height = minRows * lineheight + 'px';
			} else if (rows > maxRows) {
				node.style.height = maxRows * lineheight + 'px';
			}
		};

		resize();

		return {
			update() {
				resize();
			}
		};
	};
</script>

<div
	{...$$restProps}
	class={[
		$$restProps.class,
		'wrapper border px-3 rounded-default flex items-start justify-center space-x-1 transition ease-in',
		disabled
			? 'border-current text-gray-light dark:text-gray-dark'
			: [
					'cursor-text bg-gray-lightest dark:bg-gray-darkest dark:text-gray-lightest',
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
	on:click={handleInputClick}
>
	<textarea
		class={[
			'w-full h-full text-base bg-transparent appearance-none placeholder:text-gray-dark dark:placeholder:text-gray-light disabled:placeholder:text-current dark:disabled:placeholder:text-current resize-none'
		]
			.filter(Boolean)
			.join(' ')}
		{placeholder}
		{readonly}
		{disabled}
		use:autoheight={value}
		bind:this={textarea}
		bind:value
	/>
</div>

<style lang="postcss">
	.wrapper {
		min-height: 40px;
		padding-top: 5px;
		padding-bottom: 5px;
	}

	textarea::-webkit-scrollbar-track {
		@apply rounded-default;
	}
</style>
