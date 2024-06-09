<script>
	import { page } from '$app/stores';
	import { banner } from '$lib/banner';
	import Background from '$lib/components/Background.svelte';
	import Banner from '$lib/components/Banner.svelte';
	import Header from './Header.svelte';
	import './styles.css';

	/** @type {import('./$types').LayoutData} */
	export let data;
</script>

<div class={!data.lightMode ? 'dark' : ''}>
	<Background class="min-h-screen w-screen">
		<Header
			lightMode={data.lightMode}
			author={data.jwt?.payload.email ?? 'invalid.email'}
			projects={data.projects}
		/>

		<main class="pt-[70px]">
			{#if $banner !== undefined && $banner.title !== ''}
				<div class="mx-5 mt-5">
					<Banner title={$banner.title} type={$banner.type} />
				</div>
			{/if}
			<slot />
		</main>

		<footer class="flex w-screen justify-center py-10">
			<p>Made with ❤️ by Will Perez and Zackary Santana</p>
		</footer>
	</Background>
</div>
