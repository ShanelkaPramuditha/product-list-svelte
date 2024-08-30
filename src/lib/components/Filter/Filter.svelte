<script>
	let category = '';
	let priceRange = [0, 100];
</script>

<div class="flex space-x-4">
	<input type="text" bind:value={category} placeholder="Category" />
	<input type="range" min="0" max="100" bind:value={priceRange[0]} />
	<input type="range" min="0" max="100" bind:value={priceRange[1]} />
	<button>Apply</button>
</div>
