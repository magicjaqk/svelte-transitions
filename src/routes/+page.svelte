<script lang="ts">
	import { fadeWipe } from '$lib/transitions/fade-wipe';

	let show = $state(false);
</script>

<main class="container mx-auto p-4 py-20">
	<button onclick={() => (show = !show)}> Toggle </button>

	<hr />

	<div class="flex items-center justify-between gap-20">
		{#if show}
			<div class="box bg-cyan-600 text-cyan-950" transition:fadeWipe>in/out</div>
			<div class="box bg-cyan-600 text-cyan-950" in:fadeWipe>in</div>
			<div class="box bg-cyan-600 text-cyan-950" out:fadeWipe>out</div>
		{/if}
	</div>

	<div class="mt-16 flex items-center justify-between gap-20">
		{#if show}
			<p class="max-w-md" transition:fadeWipe={{ direction: 'to bottom' }}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus
				tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices
				diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci
				nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis
				semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque
				congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue.
				Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue
				blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
				cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas
				adipiscing ante non diam sodales hendrerit.
			</p>
		{/if}
	</div>
</main>

<style>
	.box {
		height: 200px;
		width: 200px;
		border-radius: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
