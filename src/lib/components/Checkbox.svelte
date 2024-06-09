<script>
	import { queryParam, ssp } from 'sveltekit-search-params';

	/** @type {string} */
	export let value;

	/** @type {string} */
	export let displayValue = value;

	/** @type {boolean=} */
	export let checked = undefined;

	const checkedQuery = queryParam(value, ssp.boolean(checked));
</script>

<label class="flex items-center gap-1 text-sm">
	<input type="checkbox" name={value} bind:checked={$checkedQuery} class="accent-blue-light1" />
	{displayValue}
</label>
