<script>
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import { skunkworks } from '$lib/skunkworks';
	import { queryParam, queryParameters, ssp } from 'sveltekit-search-params';

	/** @type {Array<import("$lib/project").Project>}*/
	export let projects;

	let filteredProjects = [...projects];

	const tagNames = [
		'Engineering',
		'Design',
		'Product',
		'Any',
		'C++',
		'Python',
		'TypeScript',
		'JavaScript',
		'Golang',
		'Other',
		'Atlas',
		'Query',
		'Evergreen',
		'Security',
		'Performance',
		'Durability',
		'Availability'
	];

	const all = queryParameters();

	// Reactive statement to filter projects based on selected tags
	$: {
		if ($all.length === 0) {
			filteredProjects = [...projects];
		} else {
			filteredProjects = [...projects].filter((project) => {
				// $all is an object with key and value pairs
				let skunkworksFilterPresent = false;
				let passesAtLeastOneSkunkworksFilter = false;
				for (const key in $all) {
					// If the key is not a tag, skip it
					if (!tagNames.includes(key)) {
						if (key === 'project-search') {
							if (
								!project.projectName.includes($all[key]) &&
								!project.author.includes($all[key]) &&
								project.team?.find((t) => t.includes($all[key])) == null &&
								!project.author.includes($all[key]) &&
								!project.description.includes($all[key])
							) {
								return false;
							}
						}
						if ($all[key] == 'true' && skunkworks.find((s) => s.name === key) != null) {
							skunkworksFilterPresent = true;
							if (project.skunkworks === key) {
								passesAtLeastOneSkunkworksFilter = true;
							}
						}
						continue;
					}
					// If the $all[key] is false, skip it
					if ($all[key] == 'false') {
						continue;
					}
					// Check if the project has the tag
					if (!project.tags.includes(key)) {
						return false;
					}
				}
				if (skunkworksFilterPresent && !passesAtLeastOneSkunkworksFilter) {
					return false;
				}
				return true;
			});
		}
	}
</script>

{#each filteredProjects as project}
	<ProjectCard
		id={project._id}
		title={project.projectName}
		description={project.description}
		teamMembers={[project.author, ...project.team]}
		tags={project.tags ?? []}
	/>
{/each}
