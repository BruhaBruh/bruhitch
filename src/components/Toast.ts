import type { IconName } from './Icon';

export type ToastColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger';

export type ToastItem = {
	id: number;
	color: ToastColor;
	header: string;
	description?: string;
	duration: number;
	icon: IconName;
};
