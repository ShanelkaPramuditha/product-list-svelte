<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { IProductCategory } from '$lib/types';

	export let selectedCategory: string = '';
	export let minPrice: number | undefined = undefined;
	export let maxPrice: number | undefined = undefined;
	export let categories: IProductCategory[] = [];
	export let sort: string = 'default';

	const dispatch = createEventDispatcher();

	const applyFilters = () => {
		dispatch('applyFilters');
	};
</script>

<div
	class="filter-container p-4 bg-white shadow-md rounded-lg flex flex-col sm:flex-row sm:items-end gap-4"
>
	<div class="flex flex-col">
		<label for="category" class="text-sm font-medium text-gray-700 mb-1">Category:</label>
		<select
			bind:value={selectedCategory}
			id="category"
			class="border border-gray-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
		>
			<option value="">All</option>
			{#each categories as category}
				<option value={category.slug}>{category.name}</option>
			{/each}
		</select>
	</div>

	<div class="flex flex-col">
		<label for="minPrice" class="text-sm font-medium text-gray-700 mb-1">Price Range:</label>
		<div class="flex gap-2">
			<input
				type="number"
				id="minPrice"
				bind:value={minPrice}
				placeholder="Min Price"
				class="w-full border border-gray-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
			/>
			<input
				type="number"
				id="maxPrice"
				bind:value={maxPrice}
				placeholder="Max Price"
				class="w-full border border-gray-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
			/>
		</div>
	</div>

	<div class="flex flex-col">
		<label for="sort" class="text-sm font-medium text-gray-700 mb-1">Sort By:</label>
		<select
			bind:value={sort}
			id="sort"
			class="border border-gray-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
		>
			<option value="default">Default</option>
			<option value="price,asc">Price: Low to High</option>
			<option value="price,desc">Price: High to Low</option>
			<option value="title,asc">Name: A to Z</option>
			<option value="title,desc">Name: Z to A</option>
		</select>
	</div>

	<div class="flex justify-center sm:justify-end w-full">
		<button
			on:click={applyFilters}
			class="bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
		>
			Reset Filters
		</button>
	</div>
</div>
