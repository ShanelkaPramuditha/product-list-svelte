import { PUBLIC_API_URL } from '$env/static/public';
import type { IProduct } from '$lib/types';

// Fetch all products from the API
export async function fetchProducts(
	page: number,
	limit: number,
	select: string[],
	category?: string,
	searchQuery?: string,
	sortField?: string,
	sortOrder?: string,
	minPrice?: number,
	maxPrice?: number
): Promise<{ products: IProduct[]; total: number }> {
	const skip = (page - 1) * limit;

	const paginationParams = new URLSearchParams({
		limit: limit.toString(),
		skip: skip.toString(),
		select: select.join(',')
	});

	if (sortField && sortOrder) {
		paginationParams.append('sortBy', sortField);
		paginationParams.append('order', sortOrder);
	}

	// Default URL with pagination params
	let url = `${PUBLIC_API_URL}?${paginationParams.toString()}`;

	// If search query is provided, update the URL
	if (searchQuery && !category) {
		url = `${PUBLIC_API_URL}/search?q=${searchQuery}&${paginationParams.toString()}`;
	}

	// If category is provided, update the URL
	if (!searchQuery && category) {
		url = `${PUBLIC_API_URL}/category/${category}?${paginationParams.toString()}`;
	}

	// If min price or max price is provided.
	if (minPrice && maxPrice) {
		console.log('minPrice:', minPrice, 'maxPrice:', maxPrice);
		url = `${PUBLIC_API_URL}`;
	}

	try {
		const finalUrl = `${url}`;

		const res = await fetch(finalUrl);

		if (!res.ok) {
			throw new Error('Network response was not ok');
		}
		const data = await res.json();

		// If min price or max price is provided, filter and return 10 products per page.
		if (minPrice && maxPrice) {
			const filteredProducts = data.products.filter(
				(product: IProduct) => product.price >= minPrice && product.price <= maxPrice
			);
			return {
				products: filteredProducts.slice(skip, skip + limit),
				total: filteredProducts.length
			};
		}

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
