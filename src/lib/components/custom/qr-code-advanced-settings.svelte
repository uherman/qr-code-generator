<script lang="ts">
	import { Label } from '$lib/components/ui/label';
	import { Slider } from '$lib/components/ui/slider';
	import { Switch } from '$lib/components/ui/switch/index.js';
	import * as Collapsible from '$lib/components/ui/collapsible';
	import * as Select from '$lib/components/ui/select';
	import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
	import ChevronUpIcon from '@lucide/svelte/icons/chevron-up';
	import ColorPicker from 'svelte-awesome-color-picker';
	import { type QrCodeData } from '@/utils/qr-code-format';
	import Input from '../ui/input/input.svelte';

	export type AdvancedSettings = {
		size: number;
		shape: 'square' | 'circle';
		haveBackgroundRoundedEdges: boolean;
		haveGappedModules: boolean;
		backgroundColor: string;
		color: string;
		downloadUrlFileFormat: 'png' | 'svg' | 'jpg' | 'jpeg' | 'webp' | undefined;
	};

	type QrCodeAdvancedSettingsProps = {
		options: AdvancedSettings;
		open: boolean;
		data: QrCodeData;
	};

	let {
		options = $bindable<AdvancedSettings>(),
		open = $bindable(),
		data = $bindable<QrCodeData>()
	}: QrCodeAdvancedSettingsProps = $props();

	const fileFormats = [
		{ value: 'png', label: 'png' },
		{ value: 'svg', label: 'svg' },
		{ value: 'jpg', label: 'jpg' },
		{ value: 'jpeg', label: 'jpeg' },
		{ value: 'webp', label: 'webp' }
	];

	const shapes = [
		{ value: 'square', label: 'Square' },
		{ value: 'circle', label: 'Circle' }
	];

	const triggerContentFileFormat = $derived(
		fileFormats.find((f) => f.value === options.downloadUrlFileFormat)?.label ??
			'Select a file format'
	);

	const triggerContentShapes = $derived(
		shapes.find((s) => s.value === options.shape)?.label ?? 'Select a shape'
	);
</script>

<Collapsible.Root class="w-full" bind:open>
	<Collapsible.Trigger class="w-full">
		<div class="flex w-full cursor-pointer flex-row items-center justify-center">
			Advanced settings
			{#if open}
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
				<Slider id="size" type="single" bind:value={options.size} max={1000} step={1} />
				<Input bind:value={options.size} type="number" min={1} max={1000} class="w-[80px]" />
				<span class="text-muted-foreground text-sm">px</span>
			</div>
		</div>
		<div
			class="mt-4 flex w-full flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between"
		>
			<div class="flex flex-col items-center justify-start gap-2 md:flex-row">
				<div class="flex flex-col gap-1.5">
					<Label for="fileFormat">File Format</Label>
					<Select.Root type="single" name="fileFormat" bind:value={options.downloadUrlFileFormat}>
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
				<div class="flex flex-col gap-1.5">
					<Label for="shape">Shape</Label>
					<Select.Root type="single" name="shape" bind:value={options.shape}>
						<Select.Trigger class="w-[180px]">
							{triggerContentShapes}
						</Select.Trigger>
						<Select.Content>
							<Select.Group>
								<Select.Label>Shapes</Select.Label>
								{#each shapes as shape (shape.value)}
									<Select.Item value={shape.value} label={shape.label}>
										{shape.label}
									</Select.Item>
								{/each}
							</Select.Group>
						</Select.Content>
					</Select.Root>
				</div>
			</div>
			<div class="flex w-full flex-col gap-4 rounded-md border p-3 sm:w-fit sm:flex-row">
				<div>
					<ColorPicker bind:hex={options.backgroundColor} label="Background Color" />
				</div>
				<div>
					<ColorPicker bind:hex={options.color} label="Foreground Color" />
				</div>
			</div>
		</div>
		<div class="mt-4 flex flex-col">
			<div class="mt-4 flex items-center space-x-2">
				<Switch id="rounded" bind:checked={options.haveBackgroundRoundedEdges} />
				<Label for="rounded">Rounded</Label>
			</div>
			<div class="mt-4 flex items-center space-x-2">
				<Switch id="gapped-modules" bind:checked={options.haveGappedModules} />
				<Label for="gapped-modules">Gapped Modules</Label>
			</div>
		</div>
	</Collapsible.Content>
</Collapsible.Root>
