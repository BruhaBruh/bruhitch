import type { ChipColor } from './Chip';

export type SelectValue = number | string;

export type SelectItem = {
	value: SelectValue;
	label: string;
	color?: ChipColor;
	disabled?: boolean;
};
