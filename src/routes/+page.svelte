<script lang="ts">
	import { onMount } from 'svelte';
	import ProductCard from './components/ProductCard.svelte';

	interface Product {
		id: number;
		title: string;
		description: string;
		thumbnail: string;
	}

	let products: Product[] = [];
	let page = 1;

	let limit = 100;
	let skip = 0;
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

	onMount(async () => {
		const res = await fetch(
			`https://dummyjson.com/products?limit=${limit}&skip=${skip}&select=${select.join(',')}`
		);
		const data = await res.json();
		products = data.products;
	});
</script>

<h1>Page {page}</h1>
<div class="grid grid-cols-3 gap-4">
	{#each products as product}
		<ProductCard {product} />
	{/each}
</div>
