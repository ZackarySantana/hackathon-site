<script>
	import Badge from './Badge.svelte';
	import Title from './Title.svelte';

	/** @type {string} */
	export let id;

	/** @type {string} */
	export let title;

	/** @type {string} */
	export let description;

	/** @type {string[]} */
	export let teamMembers;

	/** @type {string[]} */
	export let tags;
</script>

<a href={`/project/${id}`} class="dark:border-gray-dark2 border-1 rounded-3xl px-6 py-4 shadow">
	<Title level="h3" green={false}>{title}</Title>
	<p class="text-gray-dark1 text-sm">By {teamMembers.join(', ')}</p>
	<p class="fade-text mt-2">{description}</p>
	<div class="mt-2 flex flex-wrap gap-2">
		{#each tags as tag}
			<Badge color="green">{tag}</Badge>
		{/each}
	</div>
</a>
