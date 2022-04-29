import type { Animation, AnimationEasing, AnimationParams } from '$types/animation';

export enum SettingName {
  Pattern = 'pattern',
  DisablePadding = 'padding',
  FontSize = 'size',
  Font = 'font',
  TextColor = 'color',
  BackgroundColor = 'bgcolor',
  BackgroundImage = 'backgroundImage',
  ColorNickname = 'nickname',
  IsGradientNickname = 'gradient',
  Animation = 'animation',
  AnimationEasing = 'easing',
  AnimationParams = 'params',
  VerticalAlign = 'vertical',
  HorizontalAlign = 'horizontal'
}

export type VerticalAlign = 'top' | 'center' | 'bottom';
export type HorizontalAlign = 'left' | 'center' | 'right';

export type Settings = {
  /**
   * $username$ - username of follower
   * ![alt text](link) - image
   */
  pattern: string;
  disablePadding: boolean;
  fontSize: number;
  font: string;
  textColor: string;
  backgroundColor: string;
  backgroundImage: string;
  colorNickname: string;
  isGradientNickname: boolean;
  animation: Animation;
  animationEasing: AnimationEasing;
  animationParams: Omit<AnimationParams, 'duration'>;
  vertical: VerticalAlign;
  horizontal: HorizontalAlign;
};
