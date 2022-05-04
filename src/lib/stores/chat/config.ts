import { isColor } from '$lib/color';
import { Animation, AnimationEasing, type AnimationParams } from '$types/animation';
import type { UserNicknameColor } from '$types/chat/nickname';
import type { ChatType, Settings } from '$types/chat/settings';
import * as easing from 'svelte/easing';
import { writable } from 'svelte/store';
import type { EasingFunction } from 'svelte/types/runtime/transition';

export const getEasing = (animationEasing: AnimationEasing): EasingFunction =>
  easing[animationEasing];

const createConfig = (initialState: Settings) => {
  const { set, update, subscribe } = writable(initialState);

  return {
    subscribe,
    set,
    loadSettings: (settings: Settings) => {
      set(settings);
      config.setFontSize(settings.fontSize);
    },
    setChannel: (channel: string) => {
      update((v) => ({ ...v, channel }));
    },
    setDefaultColor: (defaultColor: string) => {
      if (!isColor(defaultColor)) return;
      update((v) => ({ ...v, defaultColor }));
    },
    addCustomColor: (
      nickname: string,
      color?: string,
      gradient?: { start: string; end: string }
    ) => {
      if (color) {
        if (!isColor(color)) return;
        update((v) => ({
          ...v,
          nicknameColors: {
            ...v.nicknameColors,
            [nickname]: color
          }
        }));
      } else if (gradient) {
        if (!isColor(gradient.start) || !isColor(gradient.end)) return;
        update((v) => ({
          ...v,
          nicknameColors: {
            ...v.nicknameColors,
            [nickname]: gradient
          }
        }));
      }
    },
    setCustomColor: (nicknameColors: UserNicknameColor) =>
      update((v) => ({ ...v, nicknameColors })),
    setHidden: (hiddenNicknames: string[]) => update((v) => ({ ...v, hiddenNicknames })),
    setFont: (font: string) => update((v) => ({ ...v, font })),
    setAnimation: (animation: Animation) => {
      if (Object.values(Animation).includes(animation)) {
        update((v) => ({ ...v, animation }));
      }
    },
    setAnimationEasing: (animationEasing: AnimationEasing) => {
      if (Object.values(AnimationEasing).includes(animationEasing)) {
        update((v) => ({ ...v, animationEasing }));
      }
    },
    setAnimationParams: (animationParams: AnimationParams) => {
      if (JSON.stringify(animationParams) === JSON.stringify({})) return;
      update((v) => ({ ...v, animationParams }));
    },
    setHideReward: (hideReward: boolean) => update((v) => ({ ...v, hideReward })),
    setDisablePadding: (disablePadding: boolean) => update((v) => ({ ...v, disablePadding })),
    setFontSize: (fontSize: number | string) => {
      if (typeof fontSize === 'number') {
        update((v) => ({ ...v, fontSize }));
      }
      const n = Number(fontSize);
      if (isNaN(n)) return;
      update((v) => ({ ...v, fontSize: n }));
    },
    setGradientOnlyCustom: (gradientOnlyCustom: boolean) =>
      update((v) => ({ ...v, gradientOnlyCustom })),
    setChatType: (chatType: ChatType) => update((v) => ({ ...v, chatType })),
    reset: () => set(initialState)
  };
};

const config = createConfig({
  channel: '',
  hiddenNicknames: [],
  defaultColor: '#8CF2A5',
  nicknameColors: {},
  font: '',
  animation: Animation.Slide,
  animationEasing: AnimationEasing.Linear,
  animationParams: { duration: 150 },
  hideReward: false,
  disablePadding: false,
  fontSize: 16,
  gradientOnlyCustom: false,
  chatType: 'default'
});

export default config;
