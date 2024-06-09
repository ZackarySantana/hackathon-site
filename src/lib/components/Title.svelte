<script>
	/** @type {"h1" | "h2" | "h3" | "h4" | "p" | "label"}*/
	export let level = 'h1';

	/** @type {boolean} */
	export let green = true;

	/** @type {string=} */
	let forAttr = '';
	export { forAttr as for };

	/** @type {string} */
	let classes = '';
	export { classes as class };

	if (level === 'h1') {
		classes += ' text-3xl';
	} else if (level === 'h2') {
		classes += ' text-2xl';
	} else if (level === 'h3') {
		classes += ' text-xl';
	} else if (level === 'h4') {
		classes += ' text-lg';
	} else if (level === 'p' || level === 'label') {
		classes += ' text-md';
	}

	if (green) {
		classes += ' font-mongodb dark:text-green-dark1 text-green-dark2';
	}
</script>

<svelte:element this={level} class={`dark:font-semibold ${classes}`} for={forAttr}>
	<slot></slot>
</svelte:element>
