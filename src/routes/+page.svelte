<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '@/components/ui/button';

	import { Slider } from '$lib/components/ui/slider';
	import * as Card from '$lib/components/ui/card';
	import * as Collapsible from '$lib/components/ui/collapsible';
	import * as Select from '$lib/components/ui/select';
	import DownloadIcon from '@lucide/svelte/icons/download';
	import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
	import ChevronUpIcon from '@lucide/svelte/icons/chevron-up';
	import ColorPicker from 'svelte-awesome-color-picker';

	import QRCode from '@castlenine/svelte-qrcode';

	let data = $state('https://qr-code-generator-seven-beryl.vercel.app');
	let rendered = $state(false);
	let downloadUrl = $state('');
	let size = $state(256);
	let backgroundColor = $state('#FFFFFF');
	let color = $state('#000000');
	let downloadUrlFileFormat: 'png' | 'svg' | 'jpg' | 'jpeg' | 'webp' | undefined = $state('png');
	let collapsibleOpen = $state(false);

	const fileFormats = [
		{ value: 'png', label: 'png' },
		{ value: 'svg', label: 'svg' },
		{ value: 'jpg', label: 'jpg' },
		{ value: 'jpeg', label: 'jpeg' },
		{ value: 'webp', label: 'webp' }
	];

	const triggerContent = $derived(
		fileFormats.find((f) => f.value === downloadUrlFileFormat)?.label ?? 'Select a file format'
	);

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
				<Collapsible.Root class="w-full" bind:open={collapsibleOpen}>
					<Collapsible.Trigger class="w-full">
						<div class="flex w-full cursor-pointer flex-row items-center justify-center">
							Advanced settings
							{#if collapsibleOpen}
								<ChevronUpIcon />
							{:else}
								<ChevronDownIcon />
							{/if}
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

						<div
							class="mt-4 flex w-full flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between"
						>
							<div class="flex flex-col gap-1.5">
								<Label for="fileFormat">File Format</Label>
								<Select.Root type="single" name="fileFormat" bind:value={downloadUrlFileFormat}>
									<Select.Trigger class="w-[180px]">
										{triggerContent}
									</Select.Trigger>
									<Select.Content>
										<Select.Group>
											<Select.Label>File Formats</Select.Label>
											{#each fileFormats as format (format.value)}
												<Select.Item
													value={format.value}
													label={format.label}
													disabled={format.value === 'grapes'}
												>
													{format.label}
												</Select.Item>
											{/each}
										</Select.Group>
									</Select.Content>
								</Select.Root>
							</div>

							<div class="flex w-full flex-col gap-4 rounded-md border p-3 sm:w-fit sm:flex-row">
								<div>
									<ColorPicker bind:hex={backgroundColor} label="Background Color" />
								</div>
								<div>
									<ColorPicker bind:hex={color} label="Foreground Color" />
								</div>
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
			<Card.Root class="flex w-full flex-col items-center justify-center sm:w-fit">
				<Card.Content>
					<span class="hidden">
						<QRCode
							bind:data
							bind:size
							bind:backgroundColor
							bind:color
							bind:downloadUrlFileFormat
							isJoin
							dispatchDownloadUrl
							on:downloadUrlGenerated={(event) => handleDownloadUrlGenerated(event.detail.url)}
						/>
					</span>
					<img width="256" alt="generated qr-code" src={downloadUrl} />
				</Card.Content>
				<Card.Footer class="flex flex-row justify-center">
					{#if downloadUrl}
						<Button
							class=""
							href={downloadUrl}
							download={`qr-code.${downloadUrlFileFormat}`}
							target="_blank"
						>
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
