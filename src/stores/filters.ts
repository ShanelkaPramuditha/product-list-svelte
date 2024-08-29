import { writable } from 'svelte/store';

export const filters = writable({
	category: '',
	priceRange: [0, 100]
});
