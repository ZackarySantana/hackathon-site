<script>
	import Checkbox from '$lib/components/Checkbox.svelte';
	import Details from '$lib/components/Details.svelte';
	import Title from '$lib/components/Title.svelte';
	import { current, skunkworks } from '$lib/skunkworks';
</script>

<div class="flex min-w-[15%] flex-col gap-8">
	<Title level="h3" green={false}>Project filters</Title>

	<Details title="Positions Open">
		<div class="mt-2 flex flex-col gap-2">
			<Checkbox value="Engineering" />
			<Checkbox value="Design" />
			<Checkbox value="Product" />
			<Checkbox value="Any" />
		</div>
	</Details>

	<Details title="Coding Language">
		<div class="mt-2 flex flex-col gap-2">
			<Checkbox value="C++" />
			<Checkbox value="Python" />
			<Checkbox value="TypeScript" />
			<Checkbox value="JavaScript" />
			<Checkbox value="Golang" />
			<Checkbox value="Other" />
		</div>
	</Details>

	<Details title="Product">
		<div class="mt-2 flex flex-col gap-2">
			<Checkbox value="Atlas" />
			<Checkbox value="Query" />
			<Checkbox value="Evergreen" />
		</div>
	</Details>

	<Details title="Topic">
		<div class="mt-2 flex flex-col gap-2">
			<Checkbox value="Security" />
			<Checkbox value="Performance" />
			<Checkbox value="Durability" />
			<Checkbox value="Availability" />
		</div>
	</Details>

	<Details title="Skunkworks" open={false}>
		<div class="mt-2 flex flex-col gap-2">
			{#each skunkworks as skunkwork}
				{#if skunkwork.name === current.name}
					<Checkbox value={skunkwork.name} displayValue={skunkwork.name + ' (Current)'} checked />
				{:else}
					<Checkbox value={skunkwork.name} />
				{/if}
			{/each}
		</div>
	</Details>
</div>
