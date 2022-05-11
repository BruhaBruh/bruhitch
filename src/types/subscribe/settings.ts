import type { VerticalAlignment } from '$types/alignment';
import type { Animation, AnimationEasing, AnimationParams } from '$types/animation';

export type Settings = {
  /**
   * $username$ - username, subscribed
   * $tier$ - sub tier
   * $months$ - subscribed months
   * $streak$ - streak of months
   * ![alt text](link) - image
   */
  subPattern: string;
  /**
   * $username$ - username, gift sub to another user
   * $recipient$ - username, who get gift
   * $tier$ - sub tier
   * $months$ - subscribed months
   * ![alt text](link) - image
   */
  giftPattern: string;
  /**
   * $username$ - username, gift sub to another user
   * $recipient$ - username, who get gift
   * $tier$ - sub tier
   * $months$ - subscribed months
   * $duration$ - months of sub
   * ![alt text](link) - image
   */
  giftMultiMonthPattern: string;
  anonymous: string;
  disablePadding: boolean;
  fontSize: number;
  font: string;
  image: string;
  usernameColor: string;
  recipientColor: string;
  isGradientUsername: boolean;
  isGradientRecipient: boolean;
  animation: Animation;
  animationEasing: AnimationEasing;
  animationParams: Omit<AnimationParams, 'duration'>;
  vertical: VerticalAlignment;
};
