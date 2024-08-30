<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import ProductCard from '$lib/components/Cards/ProductCard.svelte';
	import SkeletonCard from '$lib/components/Loaders/SkeletonCard.svelte';
	import { fetchProducts, fetchCategories } from '$lib';
	import type { IProduct, IProductCategory } from '$lib/types';
	import { createQuery, QueryClient } from '@tanstack/svelte-query';
	import PaginationButtons from '$lib/components/Buttons/PaginationButtons.svelte';

	let products: IProduct[] = [];
	let isLoading = true;
	let limit = 10;
	let currentPage = 1;
	let total = 0;
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

	// Filter values
	let selectedCategory: string = '';
	let minPrice: number | undefined = undefined;
	let maxPrice: number | undefined = undefined;
	let categories: IProductCategory[] = [];

	const queryClient = new QueryClient();

	// Function to fetch products
	const fetchProductsQueryFn = async () => {
		return fetchProducts(currentPage, limit, select, selectedCategory, minPrice, maxPrice);
	};

	// Function to fetch categories
	const fetchCategoriesQueryFn = async () => {
		return fetchCategories();
	};

	// Update product when page number changes
	$: productsQuery = createQuery({
		queryKey: ['products', currentPage, selectedCategory, minPrice, maxPrice],
		queryFn: fetchProductsQueryFn,
		staleTime: 5 * 60 * 1000 // 5 minutes
	});

	// Get categories
	const categoriesQuery = createQuery({
		queryKey: ['categories'],
		queryFn: fetchCategoriesQueryFn,
		staleTime: 60 * 60 * 1000 // 1 hour
	});

	$: isLoading = $productsQuery.isLoading;

	// Update products when query data changes
	$: products = $productsQuery.data?.products || [];
	$: total = $productsQuery.data?.total || 0;

	$: categories = $categoriesQuery.data?.categories || [];

	// Update the page from URL on mount
	onMount(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const pageParam = urlParams.get('page');
		if (pageParam) {
			currentPage = parseInt(pageParam, 10);
		}
		queryClient.invalidateQueries({ queryKey: ['products', currentPage] });
	});

	const handlePageChange = (newPage: number) => {
		if (newPage < 1) return;
		currentPage = newPage;
		goto(`?page=${currentPage}`);
		queryClient.invalidateQueries({ queryKey: ['products', currentPage] });
	};

	const applyFilters = () => {
		queryClient.invalidateQueries({
			queryKey: ['products', currentPage, selectedCategory, minPrice, maxPrice]
		});
	};

	// Cleanup
	onDestroy(() => {
		queryClient.clear();
	});
</script>

<div class="p-3">
	<!-- Filter -->
	<div class="filter-container">
		<label>
			Category:
			<select bind:value={selectedCategory}>
				<option value="">All</option>
				{#each categories as category}
					<option value={category.slug}>{category.name}</option>
				{/each}
			</select></label
		>

		<label>
			Price Range:
			<input type="number" bind:value={minPrice} placeholder="Min Price" />
			<input type="number" bind:value={maxPrice} placeholder="Max Price" />
		</label>

		<button on:click={applyFilters}>Apply Filters</button>
	</div>
	<div
		class="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center"
	>
		{#if isLoading}
			{#each Array(limit) as _, i}
				<SkeletonCard />
			{/each}
		{:else}
			{#each products as product}
				<ProductCard {product} />
			{/each}
		{/if}
	</div>

	{#if total > limit}
		<PaginationButtons {currentPage} {total} {limit} onPageChange={handlePageChange} />
	{/if}
</div>
