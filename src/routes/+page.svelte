<script>
	import Title from '$lib/components/Title.svelte';
	import { fixName } from '$lib/fix-name';
	import SidebarFilter from './SidebarFilter.svelte';
	import { page } from '$app/stores';
	import { queryParam, ssp } from 'sveltekit-search-params';
	import CreateProjectModal from './CreateProjectModal.svelte';
	import FilteredProjects from './FilteredProjects.svelte';
	import { current } from '$lib/skunkworks';

	/** @type {import('./$types').PageData} */
	export let data;

	let name = fixName(data.jwt?.payload.sub) || 'Guest';

	const addProject = queryParam('add', ssp.boolean());
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div class="flex w-full gap-10 px-5 py-5">
	<SidebarFilter />
	<div class="flex w-full flex-col gap-2">
		<Title>Welcome {name}!</Title>
		<Title level="h3" green={false}>
			The latest skunkworks was {current.name}
			{current.range}!
		</Title>

		<div class="mt-5 grid w-full grid-cols-2 gap-5">
			<FilteredProjects projects={data.projects} />
		</div>
	</div>

	{#if $addProject}
		<CreateProjectModal author={data.jwt?.payload.email ?? 'invalid.email'} />
	{/if}
</div>
