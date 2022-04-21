import type { BTTVEmote, FFZEmote, STVEmote } from '$types/chat/emote';
import { writable } from 'svelte/store';

export type BTTVState = {
  template: string;
  emotes: BTTVEmote[];
};

export type EmotesState = {
  bttv: BTTVState;
  ffz: FFZEmote[];
  stv: STVEmote[];
};

const createEmotes = (initialState: EmotesState) => {
  const { set, update, subscribe } = writable(initialState);

  return {
    subscribe,
    addBttv: (emotes: BTTVEmote[]) =>
      update((v) => ({
        ...v,
        bttv: {
          ...v.bttv,
          emotes: [...v.bttv.emotes, ...emotes]
        }
      })),
    addFfz: (emotes: FFZEmote[]) =>
      update((v) => ({
        ...v,
        ffz: [...v.ffz, ...emotes]
      })),
    addStv: (emotes: STVEmote[]) =>
      update((v) => ({
        ...v,
        stv: [...v.stv, ...emotes]
      })),
    reset: () => set(initialState)
  };
};

const emotes = createEmotes({
  bttv: {
    template: 'https://cdn.betterttv.net/emote/{id}/3x',
    emotes: []
  },
  ffz: [],
  stv: []
});

export default emotes;
