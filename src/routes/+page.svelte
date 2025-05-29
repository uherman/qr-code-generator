<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '@/components/ui/button';
	import { Slider } from '$lib/components/ui/slider';
	import * as Card from '$lib/components/ui/card';
	import * as Collapsible from '$lib/components/ui/collapsible';
	import DownloadIcon from '@lucide/svelte/icons/download';
	import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
	import ColorPicker from 'svelte-awesome-color-picker';

	import QRCode from '@castlenine/svelte-qrcode';

	let data = $state('https://svelte.dev');
	let rendered = $state(false);
	let downloadUrl = $state('');
	let size = $state(256);
	let backgroundColor = $state('#FFFFFF');
	let color = $state('#000000');

	const handleDownloadUrlGenerated = (url = '') => {
		downloadUrl = url;
	};

	const renderQrCode = () => {
		rendered = false;
		const timeout = setTimeout(() => ((rendered = true), clearTimeout(timeout)), 0);
	};
</script>

<div class="flex h-full w-full flex-col items-center justify-center gap-10">
	<Card.Root class="w-full">
		<Card.Header>
			<Card.Title>Create a QR Code</Card.Title>
			<Card.Description>This tool is and will always be free.</Card.Description>
		</Card.Header>
		<Card.Content class="flex flex-col gap-5">
			<div>
				<Label for="data">QR-Code Content</Label>
				<Input
					class="mt-2"
					type="text"
					id="data"
					placeholder="Write something..."
					bind:value={data}
				/>
			</div>

			<div class="flex w-full flex-col items-center justify-center">
				<Collapsible.Root class="w-full">
					<Collapsible.Trigger class="w-full">
						<div class="flex w-full cursor-pointer flex-row items-center justify-center">
							Advanced settings
							<ChevronDownIcon />
						</div>
					</Collapsible.Trigger>
					<Collapsible.Content>
						<div>
							<Label for="size" class="mt-4">QR-Code Size</Label>
							<div class="flex flex-row items-center justify-between gap-2 px-1">
								<Slider id="size" type="single" bind:value={size} max={1000} step={1} />
								<span class="text-muted-foreground text-sm">{size}px</span>
							</div>
						</div>
						<div class="mt-4 flex flex-row gap-4">
							<div>
								<ColorPicker bind:hex={backgroundColor} label="Background Color" />
							</div>
							<div>
								<ColorPicker bind:hex={color} label="Foreground Color" />
							</div>
						</div>
					</Collapsible.Content>
				</Collapsible.Root>
			</div>
		</Card.Content>
		<Card.Footer>
			<div class="mt-4 flex w-full items-center justify-center">
				<Button class="cursor-pointer" onclick={renderQrCode}>Create QR code</Button>
			</div>
		</Card.Footer>
	</Card.Root>

	<div class="mt-10 flex w-full flex-col items-center justify-center">
		{#if rendered}
			<Card.Root>
				<Card.Content>
					<QRCode
						bind:data
						bind:size
						bind:backgroundColor
						bind:color
						isJoin
						downloadUrlFileFormat="png"
						dispatchDownloadUrl
						on:downloadUrlGenerated={(event) => handleDownloadUrlGenerated(event.detail.url)}
					/>
				</Card.Content>
				<Card.Footer class="flex flex-row justify-center">
					{#if downloadUrl}
						<Button class="" href={downloadUrl} download="qr-code.png" target="_blank">
							<DownloadIcon class="mr-2 size-4" />
							Download QR Code
						</Button>
					{/if}
				</Card.Footer>
			</Card.Root>
		{/if}
	</div>
</div>

<style>
	:global(.color) {
		border: 1px solid var(--primary);
	}
</style>
