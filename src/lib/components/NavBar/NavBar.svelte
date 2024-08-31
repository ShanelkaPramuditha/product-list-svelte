<script lang="ts">
	import { searchQuery } from '$lib/stores/filterStore';
	import { page } from '$app/stores';
	import { AiOutlineShoppingCart } from 'svelte-icons-pack/ai';
	import { Icon } from 'svelte-icons-pack';
	import { cartTotal, clearCart } from '$lib/stores/cartStore';
	import { onDestroy } from 'svelte';

	let cartCount: number = 0;

	const unsubscribe = cartTotal.subscribe((value) => {
		cartCount = value;
	});

	// Clear cart function
	const handleClearCart = () => {
		clearCart();
	};

	const handleClick = (event: MouseEvent) => {
		event.preventDefault();
		window.location.href = '/';
	};

	onDestroy(() => {
		unsubscribe();
	});
</script>

<nav class="bg-white border-gray-200 border-b w-full sticky top-0 z-50">
	<div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
		<a href="/" class="flex items-center space-x-3 rtl:space-x-reverse" on:click={handleClick}>
			<img src="/logo/logo.png" class="h-8" alt="Store Logo" />
			<span class="self-center text-2xl font-semibold whitespace-nowrap">ShopiNest</span>
		</a>
		<div class="flex md:order-2 xs:m-0 mt-3 justify-between w-full xs:w-auto">
			<!-- Show only root path page -->
			{#if $page.url.pathname === '/'}
				<div class="relative md:block">
					<div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
						<svg
							class="w-4 h-4 text-gray-500"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 20 20"
						>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
							/>
						</svg>
						<span class="sr-only">Search icon</span>
					</div>
					<input
						type="text"
						id="search-navbar"
						bind:value={$searchQuery}
						class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
						placeholder="Search Product..."
					/>
				</div>
			{/if}
			<button class="relative flex items-center ms-5" on:click={handleClearCart}>
				<Icon
					src={AiOutlineShoppingCart}
					className="text-gray-700 hover:text-blue-600 transition-colors duration-200 ease-in-out"
					size="1.75rem"
				/>
				<span
					class="absolute -top-1 -right-2 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center"
				>
					{cartCount}
				</span>
			</button>
		</div>
	</div>
</nav>
