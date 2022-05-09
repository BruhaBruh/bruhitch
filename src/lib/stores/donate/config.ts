import { isColor } from '$lib/color';
import isNullOrUndefined from '$lib/isNullOrUndefined';
import { Animation, AnimationEasing, type AnimationParams } from '$types/animation';
import type { Settings, VerticalAlign } from '$types/donate/settings';
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
    setUsernameColor: (usernameColor: string) => {
      if (!isColor(usernameColor)) return;
      update((v) => ({ ...v, usernameColor }));
    },
    setIsGradientUsername: (isGradientUsername: boolean) => {
      update((v) => ({ ...v, isGradientUsername }));
    },
    setCurrencyColor: (usernameColor: string) => {
      if (!isColor(usernameColor)) return;
      update((v) => ({ ...v, usernameColor }));
    },
    setIsGradientCurrency: (isGradientCurrency: boolean) => {
      update((v) => ({ ...v, isGradientCurrency }));
    },
    setSoundColor: (soundColor: string) => {
      if (!isColor(soundColor)) return;
      update((v) => ({ ...v, soundColor }));
    },
    setTextColor: (textColor: string) => {
      if (!isColor(textColor)) return;
      update((v) => ({ ...v, textColor }));
    },
    setAnonymous: (anonymous: string) => update((v) => ({ ...v, anonymous })),
    setImage: (image: string) => update((v) => ({ ...v, image })),
    setHideDelay: (hideDelay: number | string) => {
      if (typeof hideDelay === 'number') {
        update((v) => ({ ...v, hideDelay }));
      }
      const n = Number(hideDelay);
      if (isNaN(n)) return;
      update((v) => ({ ...v, hideDelay: n }));
    },
    setVolume: (volume: number | string) => {
      if (typeof volume === 'number') {
        const resultVolume = volume < 0 ? 0 : volume > 1 ? 1 : volume;
        update((v) => ({ ...v, volume: resultVolume }));
      }
      const n = Number(volume);
      if (isNaN(n)) return;
      const resultVolume = n < 0 ? 0 : n > 1 ? 1 : n;
      update((v) => ({ ...v, volume: resultVolume }));
    },
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
          start: !isNullOrUndefined(animationParams?.start)
            ? Number(animationParams.start.toString())
            : undefined,
          opacity: !isNullOrUndefined(animationParams?.opacity)
            ? Number(animationParams.opacity.toString())
            : undefined,
          duration: !isNullOrUndefined(animationParams?.duration)
            ? Number(animationParams.duration.toString())
            : undefined
        }
      }));
    },
    setVertical: (vertical: VerticalAlign) => {
      update((v) => ({ ...v, vertical }));
    },
    reset: () => set(initialState)
  };
};

const config = createConfig({
  usernameColor: '#3BEDA9',
  isGradientUsername: false,
  currencyColor: '#A6A6A6',
  isGradientCurrency: false,
  soundColor: '#C05DEF',
  textColor: '#CCCCCC',
  anonymous: 'Anonymous',
  image: 'https://i.postimg.cc/9F2qyTQc/photo-2022-05-05-09-31-08.jpg',
  hideDelay: 5000,
  volume: 0.5,
  disablePadding: false,
  font: '',
  fontSize: 16,
  animation: Animation.Fade,
  animationEasing: AnimationEasing.Linear,
  animationParams: {},
  vertical: 'top'
});

export default config;
