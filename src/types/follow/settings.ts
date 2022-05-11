import type { HorizontalAlignment, VerticalAlignment } from '$types/alignment';
import type { Animation, AnimationEasing, AnimationParams } from '$types/animation';

export type Settings = {
  /**
   * $username$ - username of follower
   * ![alt text](link) - image
   */
  pattern: string;
  disablePadding: boolean;
  fontSize: number;
  font: string;
  backgroundImage: string;
  colorNickname: string;
  isGradientNickname: boolean;
  animation: Animation;
  animationEasing: AnimationEasing;
  animationParams: Omit<AnimationParams, 'duration'>;
  vertical: VerticalAlignment;
  horizontal: HorizontalAlignment;
};
