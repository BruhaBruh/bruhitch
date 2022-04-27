import type { Settings } from '$types/follow/settings';
import { writable } from 'svelte/store';

export type Config = Settings;

const colorRegex = /^#[a-f0-9]{6}$/i;

export const isColor = (color: string) => colorRegex.test(color);

const createConfig = (initialState: Config) => {
  const { set, update, subscribe } = writable(initialState);

  return {
    subscribe,
    setPattern: (pattern: string) => update((v) => ({ ...v, pattern })),
    setDisablePadding: (disablePadding: boolean) => update((v) => ({ ...v, disablePadding })),
    setFontSize: (fontSize: number) => update((v) => ({ ...v, fontSize })),
    setColor: (color: string) => {
      if (!isColor(color)) return;
      update((v) => ({ ...v, color }));
    },
    setIsGradient: (isGradient: boolean) => update((v) => ({ ...v, isGradient })),
    reset: () => set(initialState)
  };
};

const config = createConfig({
  pattern: '$username$ just followed',
  disablePadding: false,
  fontSize: 16,
  color: '#8CF2A5',
  isGradient: true
});

export default config;
