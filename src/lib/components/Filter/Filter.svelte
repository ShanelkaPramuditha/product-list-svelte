<script>
	import { filters } from '../../../stores/filters';

	let category = '';
	let priceRange = [0, 100];

	function applyFilter() {
		filters.set({ category, priceRange });
	}
</script>

<div class="flex space-x-4">
	<input type="text" bind:value={category} placeholder="Category" />
	<input type="range" min="0" max="100" bind:value={priceRange[0]} />
	<input type="range" min="0" max="100" bind:value={priceRange[1]} />
	<button on:click={applyFilter}>Apply</button>
</div>
