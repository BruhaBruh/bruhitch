export type ColorGradient = {
	start: string;
	end: string;
};

export type NicknameColor = string | ColorGradient;

export type UserNicknameColor = { [key: string]: NicknameColor };
