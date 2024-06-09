<script>
	/** @type {string} */
	export let name;

	/** @type {Array<string>} */
	export let tags = [];

	let classes = '';
	export { classes as class };

	let checked = tags.includes(name);
	let additionalClasses = '';

	$: {
		if (checked) {
			// Apply green badge styles.
			additionalClasses =
				' bg-green-light3 border-green-light2 text-green-dark2 dark:bg-green-dark3 dark:border-green-dark2 dark:text-green-light1';
		} else {
			// Apply light gray badge styles.
			additionalClasses =
				' bg-gray-light3 border-gray-light2 text-gray-dark1 dark:bg-gray-dark1 dark:border-gray-dark2 dark:text-gray-light3';
		}
	}
</script>

<button
	type="button"
	class={`font-badge border-1 inline-flex w-fit items-center gap-1 rounded-3xl px-2 py-[0.5px] text-center text-xs font-bold uppercase ${classes} ${additionalClasses}`}
	on:click={() => (checked = !checked)}
>
	{name}
	<input type="checkbox" {name} class="hidden" {checked} />
</button>
