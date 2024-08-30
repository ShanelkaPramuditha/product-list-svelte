import { writable } from 'svelte/store';

export function createPersistentStore<T>(key: string, initialValue: T) {
	const store = writable<T>(initialValue);

	// Load initial value from localStorage
	if (typeof window !== 'undefined') {
		const storedValue = localStorage.getItem(key);
		if (storedValue) {
			store.set(JSON.parse(storedValue));
		}
	}

	// Save store value to localStorage when it changes
	store.subscribe((value) => {
		if (typeof window !== 'undefined') {
			localStorage.setItem(key, JSON.stringify(value));
		}
	});

	return store;
}
