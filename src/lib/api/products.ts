import { PUBLIC_API_URL } from '$env/static/public';
import type { IProduct, IProductCategory } from '$lib/types';

// Fetch all products from the API
export async function fetchProducts(
	page: number,
	limit: number,
	select: string[],
	category?: string,
	minPrice?: number,
	maxPrice?: number
): Promise<{ products: IProduct[]; total: number }> {
	const skip = (page - 1) * limit;

	let url = PUBLIC_API_URL;

	if (category) {
		url = `${PUBLIC_API_URL}/category/${category}`;
	}

	console.log('url', url);

	// Add optional parameters
	const paginationParams = new URLSearchParams({
		limit: limit.toString(),
		skip: skip.toString()
		// select: select.join(',')
	});

	console.log('params', paginationParams.toString());

	console.log(`${url}?${paginationParams.toString()}`);

	try {
		const res = await fetch(`${url}?${paginationParams.toString()}`);

		if (!res.ok) {
			throw new Error('Network response was not ok');
		}
		const data = await res.json();
		return {
			products: data.products ?? [],
			total: data.total ?? 0
		};
	} catch (error) {
		console.error('Error fetching products:', error);
		return { products: [], total: 0 };
	}
}

// Fetch a single product from the API
export async function fetchProduct(id: string): Promise<IProduct | null> {
	try {
		const res = await fetch(`${PUBLIC_API_URL}/${id}`);
		if (!res.ok) {
			throw new Error('Network response was not ok');
		}
		const data = await res.json();
		return data ?? null;
	} catch (error) {
		console.error('Error fetching product:', error);
		return null;
	}
}

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
