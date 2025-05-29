<script lang="ts">
	import AppBar from '@/components/custom/app-bar.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<div class="container mx-auto p-4">
	<AppBar />
	{@render children()}
</div>
