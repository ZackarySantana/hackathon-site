<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { banner } from '$lib/banner';
	import Background from '$lib/components/Background.svelte';
	import Badge from '$lib/components/Badge.svelte';
	import Button from '$lib/components/Button.svelte';
	import Textarea from '$lib/components/Textarea.svelte';
	import Title from '$lib/components/Title.svelte';
	import AuthorButtons from './AuthorButtons.svelte';
	import ViewerButtons from './ViewerButtons.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	let loading = false;

	/** @type {Record<string, boolean>}*/
	let requestLoading = {};

	const isAuthor = data.project?.author === data.jwt?.payload.email;
</script>

<div class="grid w-full grid-cols-2 gap-10 px-5 py-5">
	<div class="flex flex-col gap-2">
		<!-- Title -->
		<Title>{data.project?.projectName}</Title>

		<!-- Tags -->
		<div class="my-2 flex flex-wrap gap-2">
			{#each data.project?.tags || [] as tag}
				<Badge color="green">{tag}</Badge>
			{/each}
		</div>

		<!-- Buttons area -->
		<div class="flex gap-2">
			{#if isAuthor}
				<AuthorButtons project={data.project} />
			{:else if data.project?.demo === undefined || data.project?.demo === ''}
				<ViewerButtons
					project_id={data.project?._id || 'invalid'}
					email={data.jwt?.payload.email || 'invalid'}
				/>
			{/if}
			{#if data.project?.demo !== undefined && data.project?.demo !== ''}
				<Button
					icon="link"
					text="View demo"
					filled={!isAuthor}
					class="w-fit text-sm"
					href={data.project?.demo}
				/>
			{/if}
		</div>

		<!-- Description -->
		<Title level="h4" green={false} class="mt-2 font-semibold">Description:</Title>
		<Title level="p" green={false} class="">{data.project?.description}</Title>

		<!-- The team -->
		<Title level="h4" green={false} class="mt-6 font-semibold">The team:</Title>
		{#each [data.project?.author, ...(data.project?.team?.filter((t) => t !== '') || [])] as member}
			<Badge color="light-gray">{member}</Badge>
		{/each}

		{#if isAuthor}
			<Title level="h4" green={false} class="mt-6 font-semibold">Team requests:</Title>
			{#each data.project?.requestToJoin || [] as request}
				<form
					class={`flex w-[50%] gap-2 ${requestLoading[request] ? 'opacity-50' : ''}`}
					method="POST"
					on:submit|preventDefault={() => (requestLoading[request] = true)}
					use:enhance={() => {
						return async ({ result, update }) => {
							if (result) {
								if (result.status === undefined || result.status < 200 || result.status > 299) {
									banner.set({
										title: 'Failed to handle request. Please try again.',
										type: 'danger'
									});
									requestLoading[request] = false;
								} else {
									await update();
									requestLoading[request] = false;
								}
							}
						};
					}}
				>
					<input type="hidden" name="project_id" value={data.project?._id} />
					<input type="hidden" name="email" value={request} />
					<p class="mr-auto">{request}</p>
					<button type="submit" formaction="?/removeRequest" disabled={requestLoading[request]}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 16 16"
							fill="none"
						>
							<path
								d="M11.889 3.40379C11.4985 3.01327 10.8653 3.01327 10.4748 3.40379L7.99993 5.87867L5.52506 3.40379C5.13453 3.01327 4.50137 3.01327 4.11084 3.40379L3.40374 4.1109C3.01321 4.50143 3.01321 5.13459 3.40374 5.52511L5.87861 7.99999L3.40374 10.4749C3.01321 10.8654 3.01321 11.4986 3.40374 11.8891L4.11084 12.5962C4.50137 12.9867 5.13453 12.9867 5.52506 12.5962L7.99993 10.1213L10.4748 12.5962C10.8653 12.9867 11.4985 12.9867 11.889 12.5962L12.5961 11.8891C12.9867 11.4986 12.9867 10.8654 12.5961 10.4749L10.1213 7.99999L12.5961 5.52511C12.9867 5.13459 12.9867 4.50143 12.5961 4.1109L11.889 3.40379Z"
								fill="#5C6C75"
							/>
						</svg>
					</button>
					<button type="submit" formaction="?/acceptRequest" disabled={requestLoading[request]}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 16 16"
							fill="none"
						>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M6.30598 9.05039L11.7612 3.59511C12.1518 3.20458 12.7849 3.20458 13.1755 3.59511L13.8826 4.30222C14.2731 4.69274 14.2731 5.32591 13.8826 5.71643L6.8154 12.7836C6.38834 13.2107 5.68308 13.1646 5.3152 12.6856L2.26653 8.71606C1.93013 8.27805 2.0125 7.65027 2.45051 7.31387L3.04533 6.85704C3.59284 6.43654 4.37757 6.5395 4.79807 7.08702L6.30598 9.05039Z"
								fill="#5C6C75"
							/>
						</svg>
					</button>
				</form>
			{/each}
		{/if}
	</div>

	<form
		class="flex flex-col gap-3"
		method="POST"
		action="?/addComment"
		on:submit|preventDefault={() => (loading = true)}
		use:enhance={() => {
			return async ({ result, update }) => {
				if (result) {
					loading = false;
				}
				if (result.status === undefined || result.status < 200 || result.status > 299) {
					banner.set({
						title: 'Comment failed to submit. Please try again.',
						type: 'danger'
					});
				} else {
					update();
				}
			};
		}}
	>
		<Title level="h3" green={false}>New Comment</Title>
		<Textarea placeholder="Let your ideas run wild" name="comment" useQuery={false} />
		<input type="hidden" name="project_id" value={data.project?._id} />
		<input type="hidden" name="email" value={data.jwt?.payload.email} />
		<Button icon="comment" class="w-fit" submit={true} disabled={loading}>Post</Button>
		<Title level="h3" green={false} class="mt-5">Comments</Title>
		{#each data.project?.comments || [] as comment}
			<Background class="border-1 flex flex-col gap-3 rounded-lg px-6 py-4">
				<div class="flex gap-5">
					<p class="font-badge text-xs uppercase">{comment.author}</p>
					<p class="text-xs">{comment.time}</p>
				</div>
				<p class="text-md">{comment.text}</p>
			</Background>
		{/each}
		{#if data.project?.comments === undefined || data.project.comments.length === 0}
			<Title level="p" green={false}>No comments yet</Title>
		{/if}
	</form>
</div>
