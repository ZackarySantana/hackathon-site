<script>
	import Title from '$lib/components/Title.svelte';

	/** @type {boolean} */
	export let open = true;

	/** @type {string} */
	export let title;
</script>

<details {open}>
	<summary>
		<Title level="h4" green={false}>{title}</Title>
		<div class="summary-marker">
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
					d="M1.63616 5.36395C1.24563 5.75448 1.24563 6.38764 1.63616 6.77816L6.58591 11.7279L7.29301 12.435C7.68354 12.8256 8.3167 12.8256 8.70723 12.435L9.41433 11.7279L14.3641 6.77816C14.7546 6.38764 14.7546 5.75448 14.3641 5.36395L13.657 4.65684C13.2664 4.26632 12.6333 4.26632 12.2427 4.65684L8.00012 8.89948L3.75748 4.65684C3.36696 4.26632 2.73379 4.26632 2.34327 4.65684L1.63616 5.36395Z"
					fill="currentColor"
				/>
			</svg>
		</div>
	</summary>
	<slot />
</details>
