<script>
	// can be html types
	/** @type {string} */
	export let as = 'div';

	/** @type {string} */
	let classes = '';
	export { classes as class };

	let styles = `${classes} dark:bg-black dark:text-gray-light2 dark:border-gray-dark2 bg-white`;
</script>

<svelte:element this={as} class={styles}>
	<slot />
</svelte:element>
