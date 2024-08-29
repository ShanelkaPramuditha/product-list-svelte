<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import ProductCard from '$lib/components/Cards/ProductCard.svelte';
	import { fetchProducts } from '$lib';
	import type { IProduct } from '$lib/types';
	import { createQuery, QueryClient } from '@tanstack/svelte-query';

	let products: IProduct[] = [];
	let limit = 10;
	let currentPage = 1;
	let select = [
		'availabilityStatus',
		'price',
		'brand',
		'category',
		'description',
		'images',
		'rating',
		'reviews',
		'stock',
		'tags',
		'thumbnail',
		'title',
		'warrentyInformation',
		'weight'
	];

	const queryClient = new QueryClient();

	// Function to fetch products
	const fetchProductsQueryFn = async () => {
		return fetchProducts(currentPage, limit, select);
	};

	// Update product when page number changes
	$: productsQuery = createQuery({
		queryKey: ['products', currentPage],
		queryFn: fetchProductsQueryFn,
		staleTime: 5 * 60 * 1000 // 5 minutes
	});

	// Update products when query data changes
	$: products = $productsQuery.data?.products || [];
	$: total = $productsQuery.data?.total || 0;

	// Update the page from URL on mount
	onMount(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const pageParam = urlParams.get('page');
		if (pageParam) {
			currentPage = parseInt(pageParam, 10);
		}
		queryClient.invalidateQueries({ queryKey: ['products', currentPage] });
	});

	// Function to handle page changes
	const handlePageChange = (newPage: number) => {
		if (newPage < 1) return;
		currentPage = newPage;
		goto(`?page=${currentPage}`);
		queryClient.invalidateQueries({ queryKey: ['products', currentPage] });
	};

	const handleNextPage = () => {
		handlePageChange(currentPage + 1);
	};

	const handlePrevPage = () => {
		if (currentPage > 1) {
			handlePageChange(currentPage - 1);
		}
	};

	const handlePageInputChange = (e: Event) => {
		const input = e.target as HTMLInputElement | null;
		if (input) {
			const newPage = parseInt(input.value, 10);
			if (!isNaN(newPage)) {
				handlePageChange(newPage);
			}
		}
	};

	// Cleanup
	onDestroy(() => {
		queryClient.clear();
	});
</script>

<div class="p-3">
	<div class="grid grid-cols-5 gap-4">
		{#each products as product}
			<ProductCard {product} />
		{/each}
	</div>

	<!-- Pagination Buttons -->
	<div class="flex justify-center space-x-2 mt-4">
		<button
			class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2.5 py-2.5 text-center transition-colors duration-300"
			on:click={handlePrevPage}
			disabled={currentPage === 1}
		>
			Previous
		</button>

		<div class="flex items-center space-x-2">
			<span class="text-gray-700">Page</span>
			<input
				class="text-center w-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
				type="number"
				min="1"
				value={currentPage}
				on:input={handlePageInputChange}
			/>
			of <span class="text-gray-700">{Math.ceil(total / limit)}</span>
		</div>
		<button
			class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2.5 py-2.5 text-center transition-colors duration-300"
			on:click={handleNextPage}
		>
			Next
		</button>
	</div>
</div>
