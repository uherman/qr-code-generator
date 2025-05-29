import { toast } from 'svelte-sonner';

export type QrCodeFormat = 'text' | 'url' | 'email' | 'phone' | 'sms' | 'wifi';

export type QrCodeData = {
	text?: string;
	url?: string;
	email?: string;
	phone?: string;
	sms: {
		phone: string;
		message?: string;
	};
	wifi: {
		ssid: string;
		password: string;
		encryption?: 'WPA' | 'WEP' | 'nopass';
	};
};

export const wifi = (data: QrCodeData) =>
	`WIFI:S:${data.wifi?.ssid};T:${data.wifi?.encryption};P:${data.wifi?.password};;`;

export const email = (data: QrCodeData) => `mailto:${data.email}`;

export const phone = (data: QrCodeData) => `tel:${data.phone}`;

export const sms = (data: QrCodeData) =>
	`sms:${data.sms?.phone}${data.sms?.message ? `?body=${encodeURIComponent(data.sms.message)}` : ''}`;

export const formatQrCodeData = (data: QrCodeData, format: QrCodeFormat) => {
	switch (format) {
		case 'url':
			if (!data.url) {
				toast.error('URL is required for format "url"');
				return undefined;
			}
			return data.url as string;
		case 'wifi':
			if (!data.wifi.ssid) {
				toast.error('SSID is required for format "wifi"');
				return undefined;
			}
			return wifi(data);
		case 'email':
			if (!data.email) {
				toast.error('Email is required for format "email"');
				return undefined;
			}
			return email(data);
		case 'phone':
			if (!data.phone) {
				toast.error('Phone number is required for format "phone"');
				return undefined;
			}
			return phone(data);
		case 'sms':
			if (!data.sms.phone) {
				toast.error('Phone number is required for format "sms"');
				return undefined;
			}
			return sms(data);
		case 'text':
			if (!data.text) {
				toast.error('Text is required for format "text"');
				return undefined;
			}
			return data.text as string;
		default:
			throw new Error('Unsupported QR code format');
	}
};
