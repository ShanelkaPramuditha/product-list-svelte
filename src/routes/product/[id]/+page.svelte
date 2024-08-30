<script lang="ts">
	import { fetchProduct } from '$lib';
	import type { ICartItems, IProduct } from '$lib/types';
	import { createQuery, QueryClient } from '@tanstack/svelte-query';
	import { Image } from '@unpic/svelte';
	import { addToCart } from '$lib/stores/cartStores';

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

	const handleAddToCart = (item: ICartItems) => {
		addToCart(item);
	};
</script>

<div class="p-3 mt-10">
	{#if product}
		<div>
			<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				<div class="flex flex-col md:flex-row -mx-4">
					<div class="md:flex-1 px-4">
						<div class="h-[460px] rounded-lg bg-gray-300 mb-4">
							<div class="h-[460px] flex items-center justify-center">
								<Image
									src={product.thumbnail}
									layout="constrained"
									width={800}
									height={600}
									alt={product.title}
									placeholder="blur"
								/>
							</div>
						</div>
						<div class="flex -mx-2 mb-4">
							<div class="w-1/2 px-2">
								<button
									class="w-full bg-gray-900 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800"
									on:click={() => handleAddToCart(product)}>Add to Cart</button
								>
							</div>
							<div class="w-1/2 px-2">
								<button
									class="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-full font-bold hover:bg-gray-300"
									>Add to Wishlist</button
								>
							</div>
						</div>
					</div>
					<div class="md:flex-1 px-4">
						<h2 class="text-2xl font-bold text-gray-800 mb-2">{product.title}</h2>
						<div class="flex mb-4">
							<div class="mr-4">
								<span class="font-bold text-gray-700">Category:</span>
								<span class="text-gray-600"
									>{product.category.replace(/\b\w/g, (l) => l.toUpperCase())}</span
								>
							</div>
							<div>
								<span class="font-bold text-gray-700">Brand:</span>
								<span class="text-gray-600">{product.brand}</span>
							</div>
						</div>
						<div class="flex mb-4">
							<div class="mr-4">
								<span class="font-bold text-gray-700">Price:</span>
								<span class="text-gray-600">${product.price}</span>
							</div>
							<div>
								<span class="font-bold text-gray-700">Availability:</span>
								<span class="text-gray-600">{product.availabilityStatus}</span>
							</div>
						</div>
						<div>
							<span class="font-bold text-gray-700">Product Description:</span>
							<p class="text-gray-600 text-sm mt-2">
								{product.description}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	{:else}
		<p>Loading...</p>
	{/if}
</div>
