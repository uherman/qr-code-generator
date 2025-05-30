<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import * as Select from '$lib/components/ui/select';
	import * as Tabs from '$lib/components/ui/tabs';
	import { type QrCodeData, type QrCodeFormat } from '@/utils/qr-code-format';

	type QrCodeTypeTabsProps = {
		qrCodeFormat: QrCodeFormat;
		qrCodeData: QrCodeData;
	};

	let { qrCodeFormat = $bindable(), qrCodeData = $bindable() }: QrCodeTypeTabsProps = $props();

	const encryptions = [
		{ value: 'WPA', label: 'WPA' },
		{ value: 'WEP', label: 'WEP' },
		{ value: 'nopass', label: 'No Password' }
	];

	const triggerContentEncryptions = $derived(
		encryptions.find((e) => e.value === qrCodeData.wifi.encryption)?.label ?? 'Select an encryption'
	);

	$effect(() => {
		qrCodeData.wifi.encryption === 'nopass' && (qrCodeData.wifi.password = '');
	});
</script>

<Tabs.Root
	value="url"
	onValueChange={(value) => (qrCodeFormat = value as QrCodeFormat)}
	class="flex w-fit items-center justify-center"
>
	<Tabs.List>
		<Tabs.Trigger value="url">Url</Tabs.Trigger>
		<Tabs.Trigger value="wifi">Wifi</Tabs.Trigger>
		<Tabs.Trigger value="text">Text</Tabs.Trigger>
		<Tabs.Trigger value="email">Email</Tabs.Trigger>
		<Tabs.Trigger value="phone">Phone</Tabs.Trigger>
		<Tabs.Trigger value="sms">Sms</Tabs.Trigger>
	</Tabs.List>
	<Tabs.Content value="url" class="w-full">
		<Input
			class="mt-2"
			type="url"
			id="url"
			placeholder="https://example.com"
			bind:value={qrCodeData.url}
		/>
	</Tabs.Content>
	<Tabs.Content value="wifi" class="w-full">
		<Input
			class="mt-2"
			type="text"
			id="ssid"
			placeholder="SSID"
			bind:value={qrCodeData.wifi.ssid}
		/>
		<div class="mt-2 flex w-full flex-row items-center justify-start gap-2">
			<Select.Root type="single" name="encryption" bind:value={qrCodeData.wifi.encryption}>
				<Select.Trigger class="w-fit">
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
	<Tabs.Content value="text" class="w-full">
		<Input
			class="mt-2"
			type="text"
			id="text"
			placeholder="Enter text"
			bind:value={qrCodeData.text}
		/>
	</Tabs.Content>
	<Tabs.Content value="email" class="w-full">
		<Input
			class="mt-2"
			type="email"
			id="email"
			placeholder="Enter email address"
			bind:value={qrCodeData.email}
		/>
	</Tabs.Content>
	<Tabs.Content value="phone" class="w-full">
		<Input
			class="mt-2"
			type="tel"
			id="phone"
			placeholder="Enter phone number"
			bind:value={qrCodeData.phone}
		/>
	</Tabs.Content>
	<Tabs.Content value="sms" class="w-full">
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
