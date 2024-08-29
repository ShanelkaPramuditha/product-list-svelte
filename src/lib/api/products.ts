import { PUBLIC_API_URL } from '$env/static/public';
import type { IProduct } from '$lib/types';

// Fetch all products from the API
export async function fetchProducts(
	page: number,
	limit: number,
	select: string[]
): Promise<{ products: IProduct[]; total: number }> {
	const skip = (page - 1) * limit;

	try {
		const res = await fetch(
			`${PUBLIC_API_URL}?limit=${limit}&skip=${skip}&select=${select.join(',')}`
		);
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
