<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '@/components/ui/button';
	import { Slider } from '$lib/components/ui/slider';
	import { Textarea } from '$lib/components/ui/textarea';
	import * as Card from '$lib/components/ui/card';
	import * as Collapsible from '$lib/components/ui/collapsible';
	import * as Select from '$lib/components/ui/select';
	import * as Tabs from '$lib/components/ui/tabs';
	import DownloadIcon from '@lucide/svelte/icons/download';
	import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
	import ChevronUpIcon from '@lucide/svelte/icons/chevron-up';
	import ColorPicker from 'svelte-awesome-color-picker';
	import QRCode from '@castlenine/svelte-qrcode';
	import { blur } from 'svelte/transition';
	import { formatQrCodeData, type QrCodeData, type QrCodeFormat } from '@/utils/qr-code-format';

	let data = $state('https://qr-code-generator-seven-beryl.vercel.app');
	let rendered = $state(false);
	let downloadUrl = $state('');
	let size = $state(256);
	let backgroundColor = $state('#FFFFFF');
	let color = $state('#000000');
	let downloadUrlFileFormat: 'png' | 'svg' | 'jpg' | 'jpeg' | 'webp' | undefined = $state('png');
	let collapsibleOpen = $state(false);
	let qrCodeFormat: QrCodeFormat = $state('url');
	let qrCodeData: QrCodeData = $state({
		wifi: {
			ssid: '',
			password: '',
			encryption: 'WPA'
		},
		sms: {
			phone: '',
			message: ''
		}
	});

	const fileFormats = [
		{ value: 'png', label: 'png' },
		{ value: 'svg', label: 'svg' },
		{ value: 'jpg', label: 'jpg' },
		{ value: 'jpeg', label: 'jpeg' },
		{ value: 'webp', label: 'webp' }
	];

	const encryptions = [
		{ value: 'WPA', label: 'WPA' },
		{ value: 'WEP', label: 'WEP' },
		{ value: 'nopass', label: 'No Password' }
	];

	const triggerContentFileFormat = $derived(
		fileFormats.find((f) => f.value === downloadUrlFileFormat)?.label ?? 'Select a file format'
	);

	const triggerContentEncryptions = $derived(
		encryptions.find((e) => e.value === qrCodeData.wifi.encryption)?.label ?? 'Select an encryption'
	);

	const handleDownloadUrlGenerated = (url = '') => {
		downloadUrl = url;
	};

	$effect(() => {
		if (qrCodeData.wifi.encryption === 'nopass') {
			qrCodeData.wifi.password = '';
		}
	});

	const renderQrCode = () => {
		const formattedData = formatQrCodeData(qrCodeData, qrCodeFormat);
		if (!formattedData) {
			return;
		}

		data = formattedData;
		rendered = false;
		const timeout = setTimeout(() => ((rendered = true), clearTimeout(timeout)), 0);
	};
</script>

<div class="flex h-full w-full flex-col items-center justify-center gap-10">
	<Card.Root class="w-full">
		<Card.Header class="flex flex-col items-center justify-center">
			<Card.Title>Create a QR Code</Card.Title>
			<Card.Description>This tool is and will always be free.</Card.Description>
		</Card.Header>
		<Card.Content class="flex w-full flex-col items-center justify-center gap-5">
			<div class="flex w-full flex-col items-center justify-center">
				<Tabs.Root
					value="url"
					onValueChange={(value) => (qrCodeFormat = value as QrCodeFormat)}
					class="flex w-full items-center justify-center"
				>
					<Tabs.List>
						<Tabs.Trigger value="url">Url</Tabs.Trigger>
						<Tabs.Trigger value="wifi">Wifi</Tabs.Trigger>
						<Tabs.Trigger value="text">Text</Tabs.Trigger>
						<Tabs.Trigger value="email">Email</Tabs.Trigger>
						<Tabs.Trigger value="phone">Phone</Tabs.Trigger>
						<Tabs.Trigger value="sms">Sms</Tabs.Trigger>
					</Tabs.List>
					<Tabs.Content value="url" class="w-full sm:w-1/2">
						<Input
							class="mt-2"
							type="url"
							id="url"
							placeholder="https://example.com"
							bind:value={qrCodeData.url}
						/>
					</Tabs.Content>
					<Tabs.Content value="wifi" class="w-full sm:w-1/2">
						<Input
							class="mt-2"
							type="text"
							id="ssid"
							placeholder="SSID"
							bind:value={qrCodeData.wifi.ssid}
						/>
						<div class="mt-2 flex w-full flex-row items-center justify-start gap-2">
							<Select.Root type="single" name="encryption" bind:value={qrCodeData.wifi.encryption}>
								<Select.Trigger class="w-[180px]">
									{triggerContentEncryptions}
								</Select.Trigger>
								<Select.Content>
									<Select.Group>
										<Select.Label>Encryptions</Select.Label>
										{#each encryptions as encryption (encryption.value)}
											<Select.Item value={encryption.value} label={encryption.label}>
												{encryption.label}
											</Select.Item>
										{/each}
									</Select.Group>
								</Select.Content>
							</Select.Root>
							{#if qrCodeData.wifi.encryption !== 'nopass'}
								<Input
									type="password"
									id="password"
									placeholder="Password"
									bind:value={qrCodeData.wifi.password}
								/>
							{/if}
						</div>
					</Tabs.Content>
					<Tabs.Content value="text" class="w-full sm:w-1/2">
						<Input
							class="mt-2"
							type="text"
							id="text"
							placeholder="Enter text"
							bind:value={qrCodeData.text}
						/>
					</Tabs.Content>
					<Tabs.Content value="email" class="w-full sm:w-1/2">
						<Input
							class="mt-2"
							type="email"
							id="email"
							placeholder="Enter email address"
							bind:value={qrCodeData.email}
						/>
					</Tabs.Content>
					<Tabs.Content value="phone" class="w-full sm:w-1/2">
						<Input
							class="mt-2"
							type="tel"
							id="phone"
							placeholder="Enter phone number"
							bind:value={qrCodeData.phone}
						/>
					</Tabs.Content>
					<Tabs.Content value="sms" class="w-full sm:w-1/2">
						<Input
							required
							class="mt-2"
							type="tel"
							id="sms"
							placeholder="Enter phone number for SMS"
							bind:value={qrCodeData.sms.phone}
						/>
						<Textarea
							class="mt-2"
							id="smsMessage"
							placeholder="Enter SMS message"
							bind:value={qrCodeData.sms.message}
						/>
					</Tabs.Content>
				</Tabs.Root>
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
										{triggerContentFileFormat}
									</Select.Trigger>
									<Select.Content>
										<Select.Group>
											<Select.Label>File Formats</Select.Label>
											{#each fileFormats as format (format.value)}
												<Select.Item value={format.value} label={format.label}>
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
					<img in:blur={{ duration: 300 }} width="256" alt="generated qr-code" src={downloadUrl} />
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

	:global(.wrapper .text-input) {
		color: black;
	}
</style>
