<script lang="ts">
	import { onMount } from 'svelte';
	import ProductCard from './components/ProductCard.svelte';
	import Filter from './components/Filter.svelte';
	import { PUBLIC_API_URL } from '$env/static/public';

	interface Product {
		id: number;
		title: string;
		description: string;
		thumbnail: string;
	}

	let products: Product[] = [];

	let page = 1;
	let limit = 5;

	let select = [
		'availabilityStatus',
		'price',
		'brand',
		'category',
		'description',
		'images',
		'price',
		'rating',
		'reviews',
		'stock',
		'tags',
		'thumbnail',
		'title',
		'warrentyInformation',
		'weight'
	];

	// Fetch products
	async function fetchProducts() {
		let skip = (page - 1) * limit;
		try {
			const res = await fetch(
				`${PUBLIC_API_URL}?limit=${limit}&skip=${skip}&select=${select.join(',')}`
			);
			const data = await res.json();
			products = data.products;
			console.log('Products:', products);
		} catch (error) {
			console.error('Error fetching products:', error);
		}
	}

	// Fetch products when the component is mounted
	onMount(() => {
		fetchProducts();
	});

	// Function to handle page change and fetch new data
	function changePage(newPage: number) {
		if (newPage > 0) {
			page = newPage;
			fetchProducts();
		}
	}
</script>

<Filter />
<div class="grid grid-cols-3 gap-4">
	{#each products as product}
		<ProductCard {product} />
	{/each}
</div>

<!-- Pagination Buttons -->
<div class="flex justify-center space-x-2">
	<button on:click={() => changePage(page - 1)} disabled={page <= 1}>Previous</button>
	<button on:click={() => changePage(page + 1)}>Next</button>
</div>
