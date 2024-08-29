<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import ProductCard from '$lib/components/Cards/ProductCard.svelte';
	import { fetchProduct } from '$lib';
	import type { IProduct } from '$lib/types';
	import { createQuery, QueryClient } from '@tanstack/svelte-query';
	import { page } from '$app/stores';

	let product: IProduct | null = null;

	const queryClient = new QueryClient();

	// Get the product id from the URL
	let productId: string | undefined;
	$: productId = $page.params.id;

	// Function to fetch products
	const fetchProductQueryFn = async () => {
		return fetchProduct(productId);
	};

	const productQuery = createQuery({
		queryKey: ['product'],
		queryFn: fetchProductQueryFn,
		staleTime: 5 * 60 * 1000 // 5 minutes
	});

	$: product = $productQuery?.data ?? null;
</script>

<div class="p-3">
	<div
		class="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center"
	>
		{#if product}
			<div>
				{product.title}
			</div>
		{:else}
			<p>Loading...</p>
		{/if}
	</div>
</div>
