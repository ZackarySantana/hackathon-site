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
	import { goto } from '$app/navigation';

	/** @type {string} */
	export let author;

	const addProject = queryParam('add', ssp.boolean());

	let formValid = false;
	let loading = false;
</script>

<Modal on:click={() => addProject.set(!$addProject)} title="Project Submission">
	<form
		class="mt-4 flex flex-col gap-6"
		method="POST"
		action="/?/addProject"
		on:submit|preventDefault={() => (loading = true)}
		use:enhance={() => {
			return async ({ result, update }) => {
				if (
					result.status === undefined ||
					result.status < 200 ||
					(result.status > 299 && result.status !== 302)
				) {
					banner.set({
						title: 'Project failed to create. Please try again.',
						type: 'danger'
					});
					loading = false;
				} else {
					banner.set({
						title: 'Project created!',
						type: 'success'
					});
					await update();
					goto('/project/' + JSON.parse(JSON.parse(JSON.stringify(result)).data).projectId);
					loading = false;
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
		<div class="flex flex-col gap-1">
			<Title level="label" green={false} for="projectName" class="font-semibold">
				Project name
			</Title>
			<Input required={true} name="projectName" placeholder="[Theme] name" useQuery={false} />
		</div>

		<div class="flex flex-col gap-1">
			<Title level="label" green={false} for="description" class="font-semibold">Description</Title>
			<Textarea
				name="description"
				placeholder="Breakdown your project in a few sentences"
				useQuery={false}
				required={true}
			/>
		</div>

		<div class="flex flex-col gap-1">
			<Title level="label" green={false} for="description" class="font-semibold">Team</Title>
			<Badge color="light-gray">{author}</Badge>
		</div>

		<div class="flex flex-col gap-1">
			<Title level="label" green={false} for="team" class="font-semibold">Add members</Title>
			<Input name="team" placeholder="MongoDB emails separated by commas" useQuery={false} />
		</div>

		<div class="flex flex-col gap-3">
			<Title level="label" green={false} class="font-semibold">Tags</Title>
			<div class="flex flex-col gap-1">
				<Title level="label" green={false} class="text-sm font-semibold">Looking for members</Title>
				<div class="flex gap-1">
					<BadgeCheckbox name="Engineering" />
					<BadgeCheckbox name="Design" />
					<BadgeCheckbox name="Product" />
					<BadgeCheckbox name="Other" />
				</div>
			</div>

			<div class="flex flex-col gap-1">
				<Title level="label" green={false} class="text-sm font-semibold">Language</Title>
				<div class="flex gap-1">
					<BadgeCheckbox name="C++" />
					<BadgeCheckbox name="Python" />
					<BadgeCheckbox name="JavaScript" />
					<BadgeCheckbox name="TypeScript" />
					<BadgeCheckbox name="Golang" />
					<BadgeCheckbox name="Other" />
				</div>
			</div>

			<div class="flex flex-col gap-1">
				<Title level="label" green={false} class="text-sm font-semibold">Product</Title>
				<div class="flex gap-1">
					<BadgeCheckbox name="Atlas" />
					<BadgeCheckbox name="Query" />
					<BadgeCheckbox name="Evergreen" />
				</div>
			</div>

			<div class="flex flex-col gap-1">
				<Title level="label" green={false} class="text-sm font-semibold">Topic</Title>
				<div class="flex gap-1">
					<BadgeCheckbox name="Security" />
					<BadgeCheckbox name="Performance" />
					<BadgeCheckbox name="Durability" />
					<BadgeCheckbox name="Availability" />
				</div>
			</div>
		</div>

		<div class="flex justify-end gap-5">
			<Button on:click={() => addProject.set(!$addProject)} text="Cancel" />
			<Button
				on:click={() => formValid && addProject.set(!$addProject)}
				text="Confirm"
				submit={true}
				filled={true}
				disabled={!formValid || loading}
			/>
		</div>
	</form>
</Modal>
