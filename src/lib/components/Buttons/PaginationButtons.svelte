<script lang="ts">
	import { Icon } from 'svelte-icons-pack';
	import { FaSolidArrowLeftLong, FaSolidArrowRightLong } from 'svelte-icons-pack/fa';

	export let currentPage: number;
	export let total: number;
	export let limit: number;
	export let onPageChange: (newPage: number) => void;

	const handleNextPage = () => {
		onPageChange(currentPage + 1);
	};

	const handlePrevPage = () => {
		if (currentPage > 1) {
			onPageChange(currentPage - 1);
		}
	};

	const handlePageInputChange = (e: Event) => {
		const input = e.target as HTMLInputElement | null;
		if (input) {
			if (input.value === '') {
				input.value = '1';
			}
			if (parseInt(input.value, 10) > Math.ceil(total / limit)) {
				input.value = Math.ceil(total / limit).toString();
			}

			const newPage = parseInt(input.value, 10);
			if (!isNaN(newPage)) {
				onPageChange(newPage);
			}
		}
	};
</script>

<div class="flex justify-center space-x-2 mt-4">
	<button
		class={`text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-2.5 py-2.5 text-center transition-colors duration-300 ${
			currentPage === 1 ? 'cursor-not-allowed bg-gray-400 hover:bg-gray-400' : ''
		}`}
		on:click={handlePrevPage}
		disabled={currentPage === 1}
	>
		<Icon src={FaSolidArrowLeftLong} size={20} />
	</button>

	<div class="flex items-center space-x-2">
		<span class="text-gray-700">Page</span>
		<input
			class="text-center py-2.5 px-2.5 w-16 text-gray-700 bg-white hover:bg-white focus:outline-1 focus:outline-gray-400 border border-gray-300 font-medium rounded-lg text-sm transition-colors duration-300"
			type="text"
			min="1"
			value={currentPage}
			on:input={handlePageInputChange}
		/>
		<span class="text-gray-700">of</span>
		<span class="text-gray-700">{Math.ceil(total / limit)}</span>
	</div>

	<button
		class={`text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-2.5 py-2.5 text-center transition-colors duration-300 ${
			currentPage === Math.ceil(total / limit)
				? 'cursor-not-allowed bg-gray-400 hover:bg-gray-400'
				: ''
		}`}
		on:click={handleNextPage}
		disabled={currentPage === Math.ceil(total / limit)}
	>
		<Icon src={FaSolidArrowRightLong} size={20} />
	</button>
</div>
