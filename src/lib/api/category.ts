import { PUBLIC_API_URL } from '$env/static/public';

import type { IProductCategory } from '$lib/types';

// Get all categories from the API
export async function fetchCategories(): Promise<{ categories: IProductCategory[] }> {
	try {
		const res = await fetch(`${PUBLIC_API_URL}/categories`);
		if (!res.ok) {
			throw new Error('Network response was not ok');
		}
		const data = await res.json();
		return {
			categories: data ?? []
		};
	} catch (error) {
		console.error('Error fetching categories:', error);
		return { categories: [] };
	}
}
