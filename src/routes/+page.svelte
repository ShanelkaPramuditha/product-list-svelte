<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import ProductCard from '$lib/components/Cards/ProductCard.svelte';
	import SkeletonCard from '$lib/components/Loaders/SkeletonCard.svelte';
	import { fetchProducts, fetchCategories } from '$lib';
	import type { IProduct, IProductCategory } from '$lib/types';
	import { createQuery, QueryClient } from '@tanstack/svelte-query';
	import PaginationButtons from '$lib/components/Buttons/PaginationButtons.svelte';
	import { searchQuery } from '$lib/stores/searchStores';
	import FilterBar from '$lib/components/FilterBar/FilterBar.svelte';

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
	let sort: string = 'default';
	let categories: IProductCategory[] = [];

	const queryClient = new QueryClient();

	// Function to fetch products
	const fetchProductsQueryFn = async () => {
		const [sortField, sortOrder] = sort.split(',');
		return fetchProducts(
			currentPage,
			limit,
			select,
			selectedCategory,
			minPrice,
			maxPrice,
			$searchQuery,
			sortField,
			sortOrder
		);
	};

	// Function to fetch categories
	const fetchCategoriesQueryFn = async () => {
		return fetchCategories();
	};

	// Update product when page number changes
	$: productsQuery = createQuery({
		queryKey: ['products', currentPage, selectedCategory, minPrice, maxPrice, $searchQuery, sort],
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
		currentPage = 1;
		goto(`?page=${currentPage}`);

		queryClient.invalidateQueries({
			queryKey: ['products', currentPage, selectedCategory, minPrice, maxPrice, $searchQuery]
		});
	};

	// Cleanup
	onDestroy(() => {
		queryClient.clear();
	});
</script>

<div class="p-3">
	<FilterBar
		bind:selectedCategory
		bind:minPrice
		bind:maxPrice
		bind:sort
		{categories}
		on:applyFilters={applyFilters}
	/>

	<!-- Headline name -->
	<h1 class="text-2xl font-bold text-gray-800 my-5 ms-5">Products</h1>
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
		<div class="mt-10">
			<PaginationButtons {currentPage} {total} {limit} onPageChange={handlePageChange} />
		</div>
	{/if}
</div>
