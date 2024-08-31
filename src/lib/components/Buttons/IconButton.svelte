<script lang="ts">
	import { Icon } from 'svelte-icons-pack';
	export let icon;
	export let isItemInCart;
	export let onClick: () => void;
</script>

<button
	on:click={onClick}
	disabled={isItemInCart}
	class={`text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2.5 py-2.5 text-center transition-colors duration-300` +
		(isItemInCart
			? ' cursor-not-allowed bg-blue-400 hover:bg-blue-400'
			: ' bg-blue-700 hover:bg-blue-800')}
>
	<Icon src={icon} size={20} />
</button>
