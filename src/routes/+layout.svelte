<script lang="ts">
	import '../app.css';
	import { browser } from '$app/environment';
	import { QueryClient } from '@tanstack/svelte-query';
	import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';
	import { PersistQueryClientProvider } from '@tanstack/svelte-query-persist-client';
	import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
	import NavBar from '$lib/components/NavBar/NavBar.svelte';
	import Footer from '$lib/components/Footer/Footer.svelte';

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	});

	const persister = createSyncStoragePersister({
		storage: browser ? window.localStorage : null
	});
</script>

<svelte:head>
	<title>Store</title>
</svelte:head>

<PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
	<main class="flex flex-col min-h-screen">
		<NavBar />
		<div class="flex-grow">
			<slot />
		</div>
		<Footer />
	</main>
	<SvelteQueryDevtools />
</PersistQueryClientProvider>
