<script>
	import { banner } from '$lib/banner';

	/** @type {string} */
	export let title;

	/** @type {string} */
	export let type;

	/** @type {string} */
	let classes = '';
	export { classes as class };

	let additionalClasses = '';

	$: {
		if (type === 'info') {
			additionalClasses =
				' bg-blue-light3 border-blue-light2 text-blue-dark1 dark:bg-blue-dark3 dark:border-blue-dark2 dark:text-blue-light2';
		} else if (type === 'warning') {
			additionalClasses =
				' bg-yellow-light3 border-yellow-light2 text-yellow-dark2 dark:bg-yellow-dark3 dark:border-yellow-dark2 dark:text-yellow-light2';
		} else if (type === 'danger') {
			additionalClasses =
				' bg-red-light3 border-red-light2 text-red-dark2 dark:bg-red-dark3 dark:border-red-dark2 dark:text-red-light2';
		} else if (type === 'success') {
			additionalClasses =
				' bg-green-light3 border-green-light2 text-green-dark2 dark:bg-green-dark3 dark:border-green-dark2 dark:text-green-light1';
		}
	}
</script>

<div
	class={`border-1 relative z-[0] w-full overflow-hidden rounded-lg text-sm ${classes} ${additionalClasses}`}
>
	<div class="banner-left px-5 py-2">
		{title}
	</div>
	<button class="absolute right-2 top-[2px]" on:click={() => banner.set({ title: '', type: '' })}
		>x</button
	>
</div>
