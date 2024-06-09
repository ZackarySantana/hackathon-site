<script>
	/** @type {"light-gray" | "dark-gray" | "red" | "yellow" | "blue" | "green"} */
	export let color;

	let classes = '';
	export { classes as class };

	if (color === 'light-gray') {
		classes +=
			' bg-gray-light3 border-gray-light2 text-gray-dark1 dark:bg-gray-dark1 dark:border-gray-dark2 dark:text-gray-light3';
	} else if (color === 'dark-gray') {
		classes +=
			' bg-gray-dark2 border-gray-dark3 text-white dark:bg-gray-dark3 dark:border-gray-dark2 dark:text-white';
	} else if (color === 'red') {
		classes +=
			' bg-red-light3 border-red-light2 text-red-dark2 dark:bg-red-dark3 dark:border-red-dark2 dark:text-red-light2';
	} else if (color === 'yellow') {
		classes +=
			' bg-yellow-light3 border-yellow-light2 text-yellow-dark2 dark:bg-yellow-dark3 dark:border-yellow-dark2 dark:text-yellow-light2';
	} else if (color === 'blue') {
		classes +=
			' bg-blue-light3 border-blue-light2 text-blue-dark1 dark:bg-blue-dark3 dark:border-blue-dark2 dark:text-blue-light2';
	} else if (color === 'green') {
		classes +=
			' bg-green-light3 border-green-light2 text-green-dark2 dark:bg-green-dark3 dark:border-green-dark2 dark:text-green-light1';
	}
</script>

<div
	class={`font-badge border-1 inline-flex w-fit items-center gap-1 rounded-3xl px-2 py-[0.5px] text-center text-xs font-bold uppercase ${classes}`}
>
	<slot />
</div>
