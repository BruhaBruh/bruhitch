import type { VerticalAlignment } from '$types/alignment';
import type { Animation, AnimationEasing, AnimationParams } from '$types/animation';

export type Settings = {
  textColor: string;
  blueColor: string;
  pinkColor: string;
  channelPointImage: string;
  disablePadding: boolean;
  fontSize: number;
  font: string;
  hideDelay: number;
  animation: Animation;
  animationEasing: AnimationEasing;
  animationParams: AnimationParams;
  vertical: VerticalAlignment;
};
