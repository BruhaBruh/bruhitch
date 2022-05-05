import { isColor } from '$lib/color';
import { Animation, AnimationEasing, type AnimationParams } from '$types/animation';
import type { HorizontalAlign, Settings, VerticalAlign } from '$types/follow/settings';
import { writable } from 'svelte/store';

const createConfig = (initialState: Settings) => {
  const { set, update, subscribe } = writable(initialState);

  return {
    subscribe,
    set,
    loadSettings: (settings: Settings) => {
      if (!settings) return;
      set(settings);
      config.setFontSize(settings.fontSize);
    },
    setPattern: (pattern: string) => update((v) => ({ ...v, pattern })),
    setDisablePadding: (disablePadding: boolean) => update((v) => ({ ...v, disablePadding })),
    setFont: (font: string) => update((v) => ({ ...v, font })),
    setFontSize: (fontSize: number | string) => {
      if (typeof fontSize === 'number') {
        update((v) => ({ ...v, fontSize }));
      }
      const n = Number(fontSize);
      if (isNaN(n)) return;
      update((v) => ({ ...v, fontSize: n }));
    },
    setBackgroundImage: (backgroundImage: string) => {
      update((v) => ({ ...v, backgroundImage }));
    },
    setColorNickname: (colorNickname: string) => {
      if (!isColor(colorNickname)) return;
      update((v) => ({ ...v, colorNickname }));
    },
    setIsGradientNickname: (isGradientNickname: boolean) =>
      update((v) => ({ ...v, isGradientNickname })),
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
      update((v) => ({
        ...v,
        animationParams: {
          start: Number(animationParams.start.toString()),
          opacity: Number(animationParams.opacity.toString())
        }
      }));
    },
    setVertical: (vertical: VerticalAlign) => {
      update((v) => ({ ...v, vertical }));
    },
    setHorizontal: (horizontal: HorizontalAlign) => {
      update((v) => ({ ...v, horizontal }));
    },
    reset: () => set(initialState)
  };
};

const config = createConfig({
  pattern:
    '![alt](https://cdn.7tv.app/emote/60ccf4479f5edeff9938fa77/4x) $username$ just followed :0',
  disablePadding: false,
  font: '',
  fontSize: 16,
  backgroundImage: 'https://i.postimg.cc/7hZRH7Ls/giphy.webp',
  colorNickname: '#8CF2A5',
  isGradientNickname: false,
  animation: Animation.Fade,
  animationEasing: AnimationEasing.Linear,
  animationParams: {},
  vertical: 'top',
  horizontal: 'left'
});

export default config;
