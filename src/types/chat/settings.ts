import type { Animation, AnimationEasing, AnimationParams } from '../animation';
import type { UserNicknameColor } from './nickname';

export enum SettingName {
  HiddenNicknames = 'hidden',
  DefaultColor = 'color',
  CustomNicknameColors = 'custom',
  Font = 'font',
  Animation = 'animation',
  AnimationEasing = 'easing',
  AnimationParams = 'params',
  HideReward = 'reward',
  DisablePadding = 'disable',
  FontSize = 'size',
  GradientOnlyCustom = 'gradient',
  ChatType = 'type'
}

export type ChatType = 'default' | 'block' | 'alternative-block';

export type Settings = {
  channel: string;
  hiddenNicknames: string[];
  defaultColor: string;
  nicknameColors: UserNicknameColor;
  font: string;
  animation: Animation;
  animationEasing: AnimationEasing;
  animationParams: AnimationParams;
  hideReward: boolean;
  disablePadding: boolean;
  fontSize: number;
  gradientOnlyCustom: boolean;
  chatType: ChatType;
};
