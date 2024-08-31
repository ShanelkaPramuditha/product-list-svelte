import type { ICartItems } from '$lib/types';
import { createPersistentStore } from '$lib/stores/persistenStore';
import { derived } from 'svelte/store';

// Create a persistent store for cart items
export const cartItems = createPersistentStore<ICartItems[]>('cartItems', []);

// Function to add an item to the cart
export function addToCart(item: ICartItems) {
	cartItems.update((items) => {
		if (items.find((i) => i.id === item.id)) {
			return items;
		}
		return [...items, item];
	});
}

// Create a derived store to get the total number of items in the cart
export const cartTotal = derived(cartItems, ($cartItems) => $cartItems.length);

// Function to remove an item from the cart
export function removeFromCart(id: number) {
	cartItems.update((items) => items.filter((item) => item.id !== id));
}

// Get cart items
export function getCartItems() {
	return cartItems;
}

// Function to clear all items from the cart
export function clearCart() {
	cartItems.set([]);
}
