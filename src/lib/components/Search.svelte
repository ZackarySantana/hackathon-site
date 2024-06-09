<script>
	import { writable } from 'svelte/store';
	import { queryParam } from 'sveltekit-search-params';
	import Input from './Input.svelte';

	/** @type {string} */
	let classes = '';
	export { classes as class };

	/** @type {string} */
	export let name;

	/** @type {string} */
	export let placeholder;

	/** @type {boolean} */
	export let useQuery;

	let value = queryParam(name);

	if (!useQuery) {
		value = writable('');
	}
</script>

<label
	role="search"
	for={name}
	class={`dark:bg-gray-dark4 border-gray-dark2 border-1 outline-blue-light1 focus-on-child-input flex items-center gap-3 rounded-md px-3 py-2 ${classes}`}
>
	<svg
		role="img"
		aria-label="Search icon"
		height="16"
		width="16"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 16 16"
		class="dark:text-gray-light1 text-gray-dark2"
		><path
			fill-rule="evenodd"
			clip-rule="evenodd"
			d="M2.3234 9.81874C4.07618 11.5715 6.75062 11.8398 8.78588 10.6244L12.93 14.7685C13.4377 15.2762 14.2608 15.2762 14.7685 14.7685C15.2762 14.2608 15.2762 13.4377 14.7685 12.93L10.6244 8.78588C11.8398 6.75062 11.5715 4.07619 9.81873 2.32341C7.74896 0.253628 4.39318 0.253628 2.3234 2.32341C0.253624 4.39319 0.253624 7.74896 2.3234 9.81874ZM7.98026 4.16188C9.03467 5.2163 9.03467 6.92585 7.98026 7.98026C6.92584 9.03468 5.2163 9.03468 4.16188 7.98026C3.10746 6.92585 3.10746 5.2163 4.16188 4.16188C5.2163 3.10747 6.92584 3.10747 7.98026 4.16188Z"
			fill="currentColor"
		>
		</path>
	</svg>
	<input
		type="text"
		id={name}
		{placeholder}
		{name}
		bind:value={$value}
		class="dark:text-gray-light2 placeholder-gray-dark1 w-full bg-transparent outline-none"
	/>
</label>
