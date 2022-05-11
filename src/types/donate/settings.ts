import type { VerticalAlignment } from '$types/alignment';
import type { Animation, AnimationEasing, AnimationParams } from '$types/animation';

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
  vertical: VerticalAlignment;
};
