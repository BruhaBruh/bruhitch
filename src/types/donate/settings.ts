import type { Animation, AnimationEasing, AnimationParams } from '$types/animation';

export type VerticalAlign = 'top' | 'center' | 'bottom';

export type Settings = {
  usernameColor: string;
  isGradientUsername: boolean;
  currencyColor: string;
  isGradientCurrency: boolean;
  soundColor: string;
  textColor: string;
  anonymous: string;
  image: string;
  hideDelay: number;
  volume: number;
  disablePadding: boolean;
  fontSize: number;
  font: string;
  animation: Animation;
  animationEasing: AnimationEasing;
  animationParams: AnimationParams;
  vertical: VerticalAlign;
};