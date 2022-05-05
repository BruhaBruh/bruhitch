import { isColor } from '$lib/color';
import { Animation, AnimationEasing, type AnimationParams } from '$types/animation';
import type { Settings, VerticalAlign } from '$types/prediction/settings';
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
    setTextColor: (textColor: string) => {
      if (!isColor(textColor)) return;
      update((v) => ({ ...v, textColor }));
    },
    setBlueColor: (blueColor: string) => {
      if (!isColor(blueColor)) return;
      update((v) => ({ ...v, blueColor }));
    },
    setPinkColor: (pinkColor: string) => {
      if (!isColor(pinkColor)) return;
      update((v) => ({ ...v, pinkColor }));
    },
    setChannelPointImage: (channelPointImage: string) => {
      if (!isColor(channelPointImage)) return;
      update((v) => ({ ...v, channelPointImage }));
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
          start: Number(animationParams.start.toString()),
          opacity: Number(animationParams.opacity.toString()),
          duration: Number(animationParams.duration.toString())
        }
      }));
    },
    setVertical: (vertical: VerticalAlign) => update((v) => ({ ...v, vertical })),
    reset: () => set(initialState)
  };
};

const config = createConfig({
  textColor: '#8CF2A5',
  blueColor: '#5D90EF',
  pinkColor: '#E75F5F',
  channelPointImage:
    'https://static-cdn.jtvnw.net/channel-points-icons/215064792/5be9fe0b-62f4-4806-bdcf-d6d972417a54/icon-1.png',
  disablePadding: false,
  font: '',
  fontSize: 16,
  hideDelay: 5000,
  animation: Animation.Fade,
  animationEasing: AnimationEasing.Linear,
  animationParams: {},
  vertical: 'top'
});

export default config;
