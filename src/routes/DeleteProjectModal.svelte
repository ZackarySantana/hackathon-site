<script>
	import { queryParam, ssp } from 'sveltekit-search-params';
	import { enhance } from '$app/forms';
	import Modal from '$lib/components/Modal.svelte';
	import Title from '$lib/components/Title.svelte';
	import Textarea from '$lib/components/Textarea.svelte';
	import Badge from '$lib/components/Badge.svelte';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import BadgeCheckbox from '$lib/components/BadgeCheckbox.svelte';
	import { banner } from '$lib/banner';
	import { writable } from 'svelte/store';
	import { goto } from '$app/navigation';

	/** @type {import("$lib/project").Project | undefined} */
	export let project;

	const p = writable(project);

	const deleteProject = queryParam('delete', ssp.boolean());

	let loading = false;
</script>

<Modal on:click={() => deleteProject.set(null)} title="Delete Project" widthFit={true}>
	<form
		class="mt-4 flex flex-col gap-6"
		method="POST"
		action="/?/deleteProject"
		on:submit|preventDefault={() => (loading = true)}
		use:enhance={() => {
			return async ({ result, update }) => {
				if (result) {
					deleteProject.set(null);
					if (
						result.status === undefined ||
						result.status < 200 ||
						(result.status > 299 && result.status !== 302)
					) {
						banner.set({
							title: 'Project failed to delete. Please try again.',
							type: 'danger'
						});
						loading = false;
					} else {
						banner.set({
							title: 'Project deleted!',
							type: 'success'
						});
						await update();
						goto('/');
					}
				}
			};
		}}
	>
		<input type="hidden" name="_id" value={project?._id} />

		<div class="flex justify-end gap-5">
			<Button on:click={() => deleteProject.set(null)} text="Cancel" />
			<Button text="Confirm" submit={true} filled={true} disabled={loading} />
		</div>
	</form>
</Modal>
