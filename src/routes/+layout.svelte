<script lang="ts">
	import AppBar from '@/components/custom/app-bar.svelte';
	import { Toaster } from 'svelte-sonner';
	import { ModeWatcher } from 'mode-watcher';
	import SparklesIcon from '@lucide/svelte/icons/sparkles';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import '../app.css';
	import Button from '@/components/ui/button/button.svelte';
	import { onMount } from 'svelte';

	let showAlert = $state(false);

	const handleAlertClick = () => {
		showAlert = false;
		localStorage.setItem('alert-dismissed', 'true');
	};

	onMount(() => {
		if (localStorage.getItem('alert-dismissed') !== 'true') {
			showAlert = true;
		}
	});

	let { children } = $props();
</script>

<ModeWatcher />
<Toaster richColors position="top-center" />
<div class="container mx-auto p-4">
	<AppBar />
	{@render children()}

	{#if showAlert}
		<Alert.Root
			variant="info"
			class="absolute bottom-4 left-1/2 z-50 w-97/100 -translate-x-1/2 sm:w-2/3"
		>
			<SparklesIcon class="size-4" />
			<Alert.Title>We truly value your privacy!</Alert.Title>
			<Alert.Description class="flex flex-row items-center justify-between"
				>This site does not use cookies, we do not store any generated QR codes or track user
				behavior.

				<Button class="cursor-pointer" variant="outline" onclick={handleAlertClick}>Got it!</Button>
			</Alert.Description>
		</Alert.Root>
	{/if}
</div>
