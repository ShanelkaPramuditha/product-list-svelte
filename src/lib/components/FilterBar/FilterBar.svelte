<script lang="ts">
	import type { IProductCategory } from '$lib/types';
	import { OiFilterRemove16 } from 'svelte-icons-pack/oi';
	import { Icon } from 'svelte-icons-pack';
	import { searchQuery } from '$lib/stores/filterStore';

	export let selectedCategory: string = '';
	export let minPrice: number | undefined = undefined;
	export let maxPrice: number | undefined = undefined;
	export let categories: IProductCategory[] = [];
	export let sort: string = 'default';

	$: isFilterOn =
		selectedCategory !== '' ||
		minPrice !== undefined ||
		maxPrice !== undefined ||
		sort !== 'default' ||
		$searchQuery !== '';

	// Clear filters
	const clearFilters = () => {
		selectedCategory = '';
		minPrice = undefined;
		maxPrice = undefined;
		sort = 'default';
		searchQuery.set('');
	};

	$: selectedCategory ? searchQuery.set('') : null;
	$: $searchQuery ? (selectedCategory = '') : null;
	$: minPrice || maxPrice
		? ((selectedCategory = ''), ($searchQuery = ''), (sort = 'default'))
		: null;
</script>

<div class="filter-container p-4 rounded-lg flex flex-col sm:flex-row sm:items-end gap-4">
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
		<label for="minPrice" class="text-sm font-medium text-gray-700 mb-1">Price:</label>
		<div class="flex gap-2">
			<div class="relative w-full">
				<span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
				<input
					type="number"
					id="minPrice"
					bind:value={minPrice}
					placeholder="Min"
					class="w-full pl-7 border border-gray-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 [&::-webkit-inner-spin-button]:appearance-none"
				/>
			</div>

			<div class="relative w-full">
				<span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
				<input
					type="number"
					id="maxPrice"
					bind:value={maxPrice}
					placeholder="Max"
					class="w-full pl-7 border border-gray-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 [&::-webkit-inner-spin-button]:appearance-none"
				/>
			</div>
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
			disabled={!isFilterOn}
			on:click={clearFilters}
			class={`flex items-center text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 transition-colors duration-300` +
				(!isFilterOn
					? ' cursor-not-allowed bg-gray-400 hover:bg-gray-400'
					: ' bg-gray-700 hover:bg-gray-800')}
		>
			<Icon src={OiFilterRemove16} size={16} className="mr-2" />
			Clear Filters
		</button>
	</div>
</div>
