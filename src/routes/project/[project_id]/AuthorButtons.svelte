<script>
	import Button from '$lib/components/Button.svelte';
	import { queryParam, ssp } from 'sveltekit-search-params';

	const deleteProject = queryParam('delete', ssp.string());
	const editProject = queryParam('edit', ssp.string());
	const submitProject = queryParam('submit', ssp.string());

	/** @type {import("$lib/project").Project=} */
	export let project;
</script>

<Button
	on:click={() => submitProject.set(project?._id ?? 'invalid')}
	text={`${project?.demo === undefined || project?.demo == '' ? 'Submit demo' : 'Resubmit demo'}`}
	icon="submit"
	filled={true}
	class="w-fit text-sm"
/>
<Button
	on:click={() => editProject.set(project?._id ?? 'invalid')}
	text="Edit"
	icon="edit"
	class="w-fit text-sm"
/>
<Button
	color="red"
	on:click={() => deleteProject.set(project?._id ?? 'invalid')}
	text="Delete"
	icon="trash"
	class="w-fit text-sm"
/>
