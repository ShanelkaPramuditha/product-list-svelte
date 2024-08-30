<script lang="ts">
	import { fetchProduct } from '$lib';
	import type { IProduct } from '$lib/types';
	import { createQuery, QueryClient } from '@tanstack/svelte-query';
	import { Image } from '@unpic/svelte';

	export let data: { id: string };

	const { id } = data;

	let product: IProduct | null = null;

	const queryClient = new QueryClient();

	// Get the product id from the URL
	let productId: string | undefined;
	productId = id;

	// Function to fetch products
	const fetchProductQueryFn = async () => {
		return fetchProduct(productId);
	};

	$: productQuery = createQuery({
		queryKey: ['product', productId],
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
				<Image
					src={product.thumbnail}
					layout="constrained"
					width={800}
					height={600}
					alt={product.title}
					placeholder="blur"
				/>
			</div>
		{:else}
			<p>Loading...</p>
		{/if}
	</div>
</div>
