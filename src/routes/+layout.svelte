<script lang="ts">
	import AppBar from '@/components/custom/app-bar.svelte';
	import { Toaster } from 'svelte-sonner';
	import '../app.css';

	let { children } = $props();
</script>

<Toaster richColors position="top-center" />
<div class="container mx-auto p-4">
	<AppBar />
	{@render children()}
</div>
