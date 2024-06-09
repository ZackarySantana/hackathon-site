<script>
	import Button from './Button.svelte';
	import Background from './Background.svelte';
	import Title from './Title.svelte';

	/** @type {string} */
	export let title;

	/** @type {boolean} */
	export let widthFit = false;
</script>

<div
	class="dark:bg-faded-white bg-faded-black fixed left-0 top-0 z-10 flex h-screen w-screen items-center justify-center"
>
	<Button on:click class="fixed left-0 top-0 z-[-1] h-screen w-screen opacity-0" />
	<Background class={`${widthFit ? 'w-fit' : 'min-w-[50%]'} rounded-2xl px-10 py-6`}>
		<Title level="h1">{title}</Title>
		<slot />
	</Background>
</div>
