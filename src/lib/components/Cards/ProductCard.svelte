<script lang="ts">
	import { BiCartAdd } from 'svelte-icons-pack/bi';
	import IconButton from '$lib/components/Buttons/IconButton.svelte';
	import { addToCart } from '$lib/stores/cartStore';
	import { Image } from '@unpic/svelte';
	import type { ICartItems } from '$lib/types';

	export let product;

	// Get rating
	const getStarRating = (rating: number) => {
		const fullStars = Math.floor(rating);
		const halfStar = rating % 1 !== 0;
		return { fullStars, halfStar };
	};

	const handleAddToCart = (item: ICartItems) => {
		addToCart(item);
	};

	const { fullStars, halfStar } = getStarRating(product.rating);
</script>

<div
	class="w-full max-w-xs bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
>
	<a href={`/product/${product.id}`}>
		<!-- <img src={product.thumbnail} alt={product.title} class="p-4 rounded-t-lg" /> -->
		<Image
			src={product.thumbnail}
			layout="constrained"
			width={800}
			height={800}
			alt={product.title}
			loading="eager"
		/>
	</a>

	<div class="px-5 pb-5">
		<a href={`/product/${product.id}`}>
			<h5 class="text-xl font-semibold tracking-tight text-gray-900 line-clamp-1">
				{product.title}
			</h5>
		</a>
		<div class="flex items-center mt-2.5 mb-5 justify-between">
			<div class="flex items-center space-x-1 rtl:space-x-reverse">
				<!-- Rating stars -->
				{#each Array(fullStars) as _, i}
					<svg
						class="w-4 h-4 text-yellow-300"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 22 20"
					>
						<path
							d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
						/>
					</svg>
				{/each}

				{#if halfStar}
					<svg
						class="w-4 h-4 text-yellow-300"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 22 20"
					>
						<path
							d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
						/>
					</svg>
				{/if}

				{#each Array(5 - fullStars - (halfStar ? 1 : 0)) as _, i}
					<svg
						class="w-4 h-4 text-gray-200 dark:text-gray-600"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 22 20"
					>
						<path
							d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
						/>
					</svg>
				{/each}
			</div>
			<span
				class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3"
				>{product.rating.toFixed(1)}</span
			>
		</div>
		<div class="flex items-center justify-between">
			<span class="text-xl font-bold text-gray-900">${product.price}</span>
			<IconButton icon={BiCartAdd} onClick={() => handleAddToCart(product)} />
		</div>
	</div>
</div>
