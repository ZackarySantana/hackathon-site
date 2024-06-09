<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { banner } from '$lib/banner';
	import Button from '$lib/components/Button.svelte';

	/** @type {string} */
	export let project_id;

	/** @type {string} */
	export let email;

	let loading = false;
</script>

<form
	method="POST"
	action="/?/joinProject"
	on:submit|preventDefault={() => (loading = true)}
	use:enhance={() => {
		return async ({ result }) => {
			if (result) {
				loading = false;
			}
			if (result.status === undefined || result.status < 200 || result.status > 299) {
				banner.set({
					title: 'Request failed to send',
					type: 'danger'
				});
			} else {
				banner.set({
					title: 'Request sent!',
					type: 'success'
				});
			}
		};
	}}
>
	<input type="hidden" name="project_id" value={project_id} />
	<input type="hidden" name="email" value={email} />
	<Button
		text="Request to join"
		submit={true}
		filled={true}
		icon="plus"
		class="w-fit"
		disabled={loading}
	/>
</form>
