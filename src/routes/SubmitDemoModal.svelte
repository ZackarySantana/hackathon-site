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

	const submit = queryParam('submit', ssp.boolean());

	let loading = false;
</script>

<Modal on:click={() => submit.set(null)} title="Submit Project">
	<form
		class="mt-4 flex flex-col gap-6"
		method="POST"
		action="/?/submitDemo"
		on:submit|preventDefault={() => (loading = true)}
		use:enhance={() => {
			return async ({ result, update, action }) => {
				if (result) {
					submit.set(null);
					if (
						result.status === undefined ||
						result.status < 200 ||
						(result.status > 299 && result.status !== 302)
					) {
						console.log(result.status);
						console.log(result.status === undefined);
						if (result.status !== undefined) {
							console.log(result.status < 200);
							console.log(result.status > 299 && result.status !== 302);
						}
						banner.set({
							title: 'Project failed to submit. Please try again.',
							type: 'danger'
						});
						loading = false;
					} else {
						banner.set({
							title: 'Project submitted!',
							type: 'success'
						});
						await update();
					}
				}
			};
		}}
	>
		<input type="hidden" name="_id" value={project?._id} />

		<div class="flex flex-col gap-1">
			<Title level="label" green={false} for="Demo link" class="font-semibold">Demo link</Title>
			<Input required={true} name="demo" placeholder="https://youtube.com/...." useQuery={false} />
		</div>

		<div class="flex justify-end gap-5">
			<Button on:click={() => submit.set(null)} text="Cancel" />
			<Button text="Confirm" submit={true} filled={true} disabled={loading} />
		</div>
	</form>
</Modal>
