export interface IProduct {
	brand: string;
	category: string;
	price: number;
	availabilityStatus: string;
	id: number;
	title: string;
	description: string;
	thumbnail: string;
}

export interface IProductCategory {
	slug: string;
	name: string;
	url: string;
}

export interface ICartItems {
	id: number;
}
