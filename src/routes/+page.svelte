<script lang="ts">
	import { Button } from '@/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import DownloadIcon from '@lucide/svelte/icons/download';
	import QRCode from '@castlenine/svelte-qrcode';
	import { blur } from 'svelte/transition';
	import { formatQrCodeData, type QrCodeData, type QrCodeFormat } from '@/utils/qr-code-format';
	import QrCodeTypeTabs from '@/components/custom/qr-code-type-tabs.svelte';
	import QrCodeAdvancedSettings, {
		type AdvancedSettings
	} from '@/components/custom/qr-code-advanced-settings.svelte';

	let data = $state('https://qr-code-generator-seven-beryl.vercel.app');
	let rendered = $state(false);
	let downloadUrl = $state('');
	let advancedOptionsOpen = $state(false);
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

	let options = $state<AdvancedSettings>({
		size: 256,
		shape: 'square',
		haveBackgroundRoundedEdges: false,
		haveGappedModules: true,
		backgroundColor: '#FFFFFF',
		color: '#000000',
		downloadUrlFileFormat: 'png'
	});

	const handleDownloadUrlGenerated = (url = '') => {
		downloadUrl = url;
	};

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

<div class="flex h-full w-full flex-col items-center justify-center gap-8">
	<Card.Root class="w-full">
		<Card.Header class="flex flex-col items-center justify-center">
			<Card.Title>Create a QR Code</Card.Title>
			<Card.Description>This tool is and will always be free.</Card.Description>
		</Card.Header>
		<Card.Content class="flex w-full flex-col items-center justify-center gap-5">
			<div class="flex w-full flex-col items-center justify-center">
				<QrCodeTypeTabs bind:qrCodeFormat bind:qrCodeData />
			</div>
			<div class="flex w-full flex-col items-center justify-center">
				<QrCodeAdvancedSettings
					bind:options
					bind:data={qrCodeData}
					bind:open={advancedOptionsOpen}
				/>
			</div>
		</Card.Content>
		<Card.Footer>
			<div class="mt-4 flex w-full items-center justify-center">
				<Button class="cursor-pointer" onclick={renderQrCode}>Create QR code</Button>
			</div>
		</Card.Footer>
	</Card.Root>

	<div class="flex w-full flex-col items-center justify-center">
		{#if rendered}
			<Card.Root class="flex w-full flex-col items-center justify-center sm:w-fit">
				<Card.Content>
					<span class="hidden">
						<QRCode
							bind:data
							bind:size={options.size}
							bind:backgroundColor={options.backgroundColor}
							bind:color={options.color}
							bind:downloadUrlFileFormat={options.downloadUrlFileFormat}
							bind:shape={options.shape}
							bind:haveBackgroundRoundedEdges={options.haveBackgroundRoundedEdges}
							bind:haveGappedModules={options.haveGappedModules}
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
							download={`qr-code.${options.downloadUrlFileFormat}`}
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
