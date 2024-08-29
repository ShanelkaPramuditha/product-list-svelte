<script>
	import { Icon } from 'svelte-icons-pack';
	export let icon;
</script>

<button
	class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2.5 py-2.5 text-center transition-colors duration-300"
>
	<Icon src={icon} size={20} />
</button>
