import type { TwitchBadge } from '$types/chat/badge';
import { writable } from 'svelte/store';

const createBadges = (initialState: TwitchBadge[]) => {
  const { set, subscribe } = writable(initialState);

  return {
    subscribe,
    set: (badges: TwitchBadge[]) => set(badges),
    reset: () => set(initialState)
  };
};

const badges = createBadges([]);

export default badges;
