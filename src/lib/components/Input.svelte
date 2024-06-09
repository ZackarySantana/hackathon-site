<script>
	import { writable } from 'svelte/store';
	import { queryParam } from 'sveltekit-search-params';

	/** @type {string} */
	export let name;

	/** @type {string} */
	export let placeholder;

	/** @type {boolean} */
	export let useQuery;

	/** @type {string} */
	export let initialValue = '';

	/** @type {boolean} */
	export let required = false;

	let value = queryParam(name);

	if (!useQuery) {
		value = writable(initialValue);
	}
</script>

<div
	class="dark:bg-gray-dark4 border-gray-dark2 border-1 outline-blue-light1 focus-on-child-input flex items-center gap-3 rounded-md px-3 py-2"
>
	<input
		type="text"
		id={name}
		{placeholder}
		{name}
		{required}
		bind:value={$value}
		class="dark:text-gray-light2 placeholder-gray-dark1 w-full bg-transparent outline-none"
	/>
</div>
