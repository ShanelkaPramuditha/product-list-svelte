<script>
	export let product;
</script>

<div>
	<!-- Thumbnail -->
	<img src={product.thumbnail} alt={product.title} class="w-full h-48 object-cover mb-4" />
	<h2 class="text-lg font-bold">{product.title}</h2>
	<p>{product.description}</p>
</div>
