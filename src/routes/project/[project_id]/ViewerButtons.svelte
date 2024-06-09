<script>
	import RequestJoinProjectButton from '$lib/components/RequestJoinProjectButton.svelte';

	/** @type {string} */
	export let project_id;

	/** @type {string} */
	export let email;
</script>

<RequestJoinProjectButton {project_id} {email} />
