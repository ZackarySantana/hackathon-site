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

	/** @type {string} */
	export let author;

	/** @type {import("$lib/project").Project | undefined} */
	export let project;

	const p = writable(project);

	const editProject = queryParam('edit', ssp.boolean());

	let formValid = true;
	let loading = false;
</script>

<Modal on:click={() => editProject.set(null)} title="Edit Project">
	<form
		class="mt-4 flex flex-col gap-6"
		method="POST"
		action="/?/editProject"
		on:submit|preventDefault={() => (loading = true)}
		use:enhance={() => {
			return async ({ result, update }) => {
				if (result) {
					editProject.set(null);
					if (result.status === undefined || result.status < 200 || result.status > 299) {
						banner.set({
							title: 'Project failed to edit. Please try again.',
							type: 'danger'
						});
						loading = false;
					} else {
						banner.set({
							title: 'Project editted!',
							type: 'success'
						});
						await update();
						loading = false;
					}
				}
			};
		}}
		on:change={(/** @type {{ currentTarget: { checkValidity: () => any; }; }} */ e) => {
			if (e?.currentTarget?.checkValidity()) {
				formValid = true;
			} else {
				formValid = false;
			}
		}}
	>
		<input type="hidden" name="author" value={author} />
		<input type="hidden" name="_id" value={project?._id} />
		<div class="flex flex-col gap-1">
			<Title level="label" green={false} for="projectName" class="font-semibold">
				Project name
			</Title>
			<Input
				required={true}
				name="projectName"
				placeholder="[Theme] name"
				useQuery={false}
				initialValue={project?.projectName}
			/>
		</div>

		<div class="flex flex-col gap-1">
			<Title level="label" green={false} for="description" class="font-semibold">Description</Title>
			<Textarea
				name="description"
				placeholder="Breakdown your project in a few sentences"
				useQuery={false}
				required={true}
				initialValue={project?.description}
			/>
		</div>

		<div class="flex flex-col gap-1">
			<Title level="label" green={false} for="description" class="font-semibold">Team</Title>
			<Badge color="light-gray">zackary.santana@mongodb.com</Badge>
		</div>

		<div class="flex flex-col gap-1">
			<Title level="label" green={false} for="team" class="font-semibold">Add members</Title>
			<Input
				name="team"
				placeholder="MongoDB emails separated by commas"
				useQuery={false}
				initialValue={(project?.team || []).join(', ')}
			/>
		</div>

		<div class="flex flex-col gap-3">
			<Title level="label" green={false} class="font-semibold">Tags</Title>
			<div class="flex flex-col gap-1">
				<Title level="label" green={false} class="text-sm font-semibold">Looking for members</Title>
				<div class="flex gap-1">
					<BadgeCheckbox tags={project?.tags} name="Engineering" />
					<BadgeCheckbox tags={project?.tags} name="Design" />
					<BadgeCheckbox tags={project?.tags} name="Product" />
					<BadgeCheckbox tags={project?.tags} name="Other" />
				</div>
			</div>

			<div class="flex flex-col gap-1">
				<Title level="label" green={false} class="text-sm font-semibold">Language</Title>
				<div class="flex gap-1">
					<BadgeCheckbox tags={project?.tags} name="C++" />
					<BadgeCheckbox tags={project?.tags} name="Python" />
					<BadgeCheckbox tags={project?.tags} name="JavaScript" />
					<BadgeCheckbox tags={project?.tags} name="TypeScript" />
					<BadgeCheckbox tags={project?.tags} name="Golang" />
					<BadgeCheckbox tags={project?.tags} name="Other" />
				</div>
			</div>

			<div class="flex flex-col gap-1">
				<Title level="label" green={false} class="text-sm font-semibold">Product</Title>
				<div class="flex gap-1">
					<BadgeCheckbox tags={project?.tags} name="Atlas" />
					<BadgeCheckbox tags={project?.tags} name="Query" />
					<BadgeCheckbox tags={project?.tags} name="Evergreen" />
				</div>
			</div>

			<div class="flex flex-col gap-1">
				<Title level="label" green={false} class="text-sm font-semibold">Topic</Title>
				<div class="flex gap-1">
					<BadgeCheckbox tags={project?.tags} name="Security" />
					<BadgeCheckbox tags={project?.tags} name="Performance" />
					<BadgeCheckbox tags={project?.tags} name="Durability" />
					<BadgeCheckbox tags={project?.tags} name="Availability" />
				</div>
			</div>
		</div>

		<div class="flex justify-end gap-5">
			<Button on:click={() => editProject.set(null)} text="Cancel" />
			<Button
				on:click={() => formValid && editProject.set(!$editProject)}
				text="Confirm"
				submit={true}
				filled={true}
				disabled={!formValid || loading}
			/>
		</div>
	</form>
</Modal>
