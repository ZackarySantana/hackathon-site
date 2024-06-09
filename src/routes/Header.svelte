<script>
	import mongodb from '$lib/images/mongo.svg';
	import skunkworks from '$lib/images/skunkworks.png';
	import Background from '$lib/components/Background.svelte';
	import Search from '$lib/components/Search.svelte';
	import Button from '$lib/components/Button.svelte';
	import { enhance } from '$app/forms';
	import { queryParam, ssp } from 'sveltekit-search-params';
	import CreateProjectModal from './CreateProjectModal.svelte';
	import EditProjectModal from './EditProjectModal.svelte';
	import DeleteProjectModal from './DeleteProjectModal.svelte';
	import SubmitDemoModal from './SubmitDemoModal.svelte';

	/** @type {boolean} */
	export let lightMode;

	/** @type {string} */
	export let author;

	/** @type {Array<import("$lib/project").Project>}*/
	export let projects;

	const addProject = queryParam('add', ssp.boolean());
	const editProject = queryParam('edit', ssp.string());
	const deleteProject = queryParam('delete', ssp.string());
	const submit = queryParam('submit', ssp.string());
</script>

<header class="fixed z-[1] w-full">
	<Background as="nav" class="border-b-1 shadow-no-hover flex items-center gap-10 px-5 py-3">
		<div class="corner min-w-[15%]">
			<a href="/" class="flex items-center gap-3">
				<img src={skunkworks} alt="GitHub" class="h-6" />
				<p>Skunkworks</p>
			</a>
		</div>
		<Search
			class="w-full"
			name="project-search"
			placeholder="Search projects by name, description, and users"
			useQuery={true}
		/>
		<Button on:click={() => addProject.set(!$addProject)} text="Add a project" icon="plus" />
		<form
			method="POST"
			action="/?/toggleDarkMode"
			class="flex items-center justify-center"
			use:enhance
		>
			<button>
				{#if !lightMode}
					<svg viewBox="0 0 512.001 512.001" width="16" height="16" class="fill-green-dark1">
						<g>
							<path
								d="M508.162,247.909l-65.998-53.919l24.064-81.848c0.89-3.026,0.365-6.294-1.43-8.89c-1.794-2.594-4.667-4.241-7.813-4.476     l-85.154-6.389L343.38,11.985c-1.065-3.009-3.447-5.368-6.467-6.401c-3.02-1.03-6.348-0.629-9.033,1.097l-71.876,46.201     l-71.777-46.2c-2.683-1.725-6.009-2.134-9.03-1.102c-3.021,1.03-5.404,3.385-6.472,6.393l-28.545,80.412l-85.165,6.39     c-3.146,0.236-6.019,1.881-7.813,4.476c-1.795,2.594-2.321,5.863-1.43,8.89l24.064,81.848l-65.997,53.92     C1.41,249.893,0,252.864,0,256s1.41,6.107,3.838,8.092l65.998,53.92L45.772,399.86c-0.89,3.026-0.365,6.293,1.429,8.89     c1.795,2.594,4.665,4.241,7.813,4.476l85.068,6.389l28.647,80.423c1.07,3.005,3.454,5.356,6.473,6.384     c3.02,1.027,6.343,0.622,9.025-1.104L256,459.121l71.773,46.197c1.706,1.098,3.673,1.662,5.656,1.662     c1.133,0,2.272-0.184,3.37-0.558c3.019-1.028,5.403-3.379,6.473-6.384l28.647-80.423l85.068-6.388     c3.146-0.236,6.018-1.882,7.813-4.476c1.794-2.596,2.32-5.863,1.429-8.89l-24.064-81.848l65.998-53.92     c2.429-1.984,3.838-4.955,3.838-8.092C512,252.864,510.59,249.893,508.162,247.909z M423.573,306.215     c-3.254,2.658-4.599,7.008-3.414,11.039l22.374,76.101l-78.959,5.931c-4.121,0.309-7.674,3.02-9.06,6.913l-26.508,74.417     l-66.351-42.707c-1.722-1.108-3.688-1.662-5.655-1.662c-1.967,0-3.933,0.554-5.655,1.662l-66.351,42.707l-26.508-74.417     c-1.388-3.894-4.939-6.604-9.06-6.913l-78.96-5.931l22.374-76.101c1.185-4.03-0.16-8.381-3.414-11.039L26.965,256l61.463-50.215     c3.254-2.658,4.599-7.008,3.414-11.038l-22.374-76.1l79.065-5.932c4.126-0.309,7.681-3.025,9.066-6.923l26.409-74.398     l66.339,42.699c3.441,2.214,7.86,2.216,11.305,0.003l66.431-42.702l26.323,74.387c1.381,3.904,4.939,6.625,9.069,6.934     l79.06,5.932l-22.374,76.1c-1.185,4.03,0.16,8.38,3.414,11.038L485.035,256L423.573,306.215z"
							></path>
							<path
								d="M256,96.653c-86.424,0-156.735,70.311-156.735,156.735S169.576,410.123,256,410.123s156.735-70.311,156.735-156.735     S342.424,96.653,256,96.653z M256,389.225c-74.9,0-135.837-60.935-135.837-135.837S181.1,117.551,256,117.551     s135.837,60.935,135.837,135.837S330.9,389.225,256,389.225z"
							></path>
							<path
								d="M146.286,242.939h20.898c0-37.45,30.468-67.918,67.918-67.918v-20.898C186.129,154.123,146.286,193.966,146.286,242.939z     "
							></path>
						</g>
					</svg>
				{/if}
				{#if lightMode}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink"
						fill="#000000"
						version="1.1"
						id="Capa_1"
						viewBox="0 0 45.74 45.74"
						width="16"
						height="16"
						xml:space="preserve"
						color="currentColor"
						class="fill-green-dark2"
					>
						<g>
							<g>
								<path
									d="M12.2,15.267c0-3.322,0.896-6.43,2.448-9.113c0.376-0.649-0.191-1.451-0.918-1.265       C5.35,7.041-0.711,14.961,0.067,24.179c0.736,8.701,7.768,15.803,16.463,16.617c6.033,0.565,11.517-1.811,15.221-5.848       c0.5-0.546,0.073-1.432-0.666-1.401c-0.196,0.009-0.395,0.013-0.594,0.013C20.389,33.56,12.2,25.371,12.2,15.267z"
								/>
							</g>
						</g>
						<g>
							<path
								d="M23.144,5.6l0.917,2.633l2.788,0.061c0.354,0.008,0.498,0.456,0.218,0.669l-2.221,1.687l0.805,2.669      c0.104,0.338-0.279,0.614-0.568,0.414l-2.292-1.59l-2.29,1.59c-0.29,0.201-0.669-0.076-0.569-0.414l0.805-2.669l-2.221-1.687      c-0.28-0.213-0.134-0.661,0.218-0.669l2.788-0.061L22.44,5.6C22.556,5.267,23.027,5.267,23.144,5.6z"
							/>
						</g>
						<g>
							<path
								d="M40.26,26.44l0.881,2.53l2.679,0.057c0.389,0.009,0.549,0.502,0.24,0.737l-2.134,1.621l0.772,2.564      c0.111,0.371-0.309,0.677-0.627,0.454l-2.201-1.527l-2.2,1.527c-0.318,0.223-0.739-0.083-0.626-0.454l0.772-2.564l-2.133-1.621      c-0.31-0.234-0.149-0.729,0.238-0.737l2.679-0.057l0.884-2.53C39.612,26.074,40.131,26.074,40.26,26.44z"
							/>
						</g>
						<g>
							<path
								d="M39.926,8.098l1.325,3.799l4.021,0.086c0.452,0.01,0.639,0.584,0.278,0.858l-3.204,2.434l1.162,3.853      c0.131,0.433-0.356,0.788-0.729,0.529l-3.306-2.294l-3.305,2.294c-0.372,0.259-0.86-0.097-0.729-0.529l1.161-3.853l-3.205-2.434      c-0.358-0.273-0.172-0.849,0.279-0.858l4.022-0.086l1.324-3.799C39.173,7.672,39.776,7.672,39.926,8.098z"
							/>
						</g>
					</svg>
				{/if}
			</button>
		</form>
		<a href="/profile" class="p-2">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 10 13"
				fill="currentColor"
				class="text-gray-dark1 h-4 w-4"
			>
				<path
					d="M8.5 3.5C8.5 5.433 6.933 7 5 7C3.067 7 1.5 5.433 1.5 3.5C1.5 1.567 3.067 0 5 0C6.933 0 8.5 1.567 8.5 3.5Z"
				/>
				<path
					d="M1.591 7.56241C1.89921 7.20507 2.42858 7.22348 2.84253 7.45005C3.48309 7.80067 4.21827 8 5 8C5.78173 8 6.51691 7.80067 7.15747 7.45005C7.57142 7.22348 8.10079 7.20507 8.409 7.56241C9.08889 8.3507 9.5 9.37734 9.5 10.5V13H0.5V10.5C0.5 9.37734 0.911112 8.3507 1.591 7.56241Z"
				/>
			</svg>
		</a>
	</Background>
</header>
{#if $addProject}
	<CreateProjectModal {author} />
{/if}

{#if $editProject}
	<EditProjectModal {author} project={projects?.find((p) => p._id === $editProject)} />
{/if}

{#if $deleteProject}
	<DeleteProjectModal project={projects?.find((p) => p._id === $deleteProject)} />
{/if}

{#if $submit}
	<SubmitDemoModal project={projects?.find((p) => p._id === $submit)} />
{/if}
