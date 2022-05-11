import { isColor } from '$lib/color';
import isNullOrUndefined from '$lib/isNullOrUndefined';
import type { VerticalAlignment } from '$types/alignment';
import { Animation, AnimationEasing, type AnimationParams } from '$types/animation';
import type { Settings } from '$types/subscribe/settings';
import { writable } from 'svelte/store';

const createConfig = (initialState: Settings) => {
  const { set, update, subscribe } = writable(initialState);

  return {
    subscribe,
    set,
    loadSettings: (settings: Settings) => {
      set(settings);
      config.setFontSize(settings.fontSize);
    },
    setSubPattern: (subPattern: string) => update((v) => ({ ...v, subPattern })),
    setGiftPattern: (giftPattern: string) => update((v) => ({ ...v, giftPattern })),
    setGiftMultiMonthPattern: (giftMultiMonthPattern: string) =>
      update((v) => ({ ...v, giftMultiMonthPattern })),
    setAnonymous: (anonymous: string) => update((v) => ({ ...v, anonymous })),
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
    setImage: (image: string) => {
      update((v) => ({ ...v, image }));
    },
    setUsernameColor: (usernameColor: string) => {
      if (!isColor(usernameColor)) return;
      update((v) => ({ ...v, usernameColor }));
    },
    setRecipientColor: (recipientColor: string) => {
      if (!isColor(recipientColor)) return;
      update((v) => ({ ...v, recipientColor }));
    },
    setIsGradientUsername: (isGradientUsername: boolean) =>
      update((v) => ({ ...v, isGradientUsername })),
    setIsGradientRecipient: (isGradientRecipient: boolean) =>
      update((v) => ({ ...v, isGradientRecipient })),
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
            : undefined
        }
      }));
    },
    setVertical: (vertical: VerticalAlignment) => {
      update((v) => ({ ...v, vertical }));
    },
    reset: () => set(initialState)
  };
};

const config = createConfig({
  subPattern:
    '![alt](https://cdn.7tv.app/emote/60ccf4479f5edeff9938fa77/4x) $username$ just subscribed',
  giftPattern:
    '![alt](https://cdn.7tv.app/emote/60ccf4479f5edeff9938fa77/4x) $username$ gift sub to $recipient$',
  giftMultiMonthPattern:
    '![alt](https://cdn.7tv.app/emote/60ccf4479f5edeff9938fa77/4x) $username$ gift sub to $recipient$ on $duration$ months',
  anonymous: 'Anonymous',
  disablePadding: false,
  font: '',
  fontSize: 16,
  image: 'https://i.postimg.cc/7hZRH7Ls/giphy.webp',
  usernameColor: '#8CF2A5',
  recipientColor: '#8CF2A5',
  isGradientUsername: false,
  isGradientRecipient: false,
  animation: Animation.Fade,
  animationEasing: AnimationEasing.Linear,
  animationParams: {},
  vertical: 'top'
});

export default config;
