import type { TwitchEventFollowData } from '$types/ws';
import { writable } from 'svelte/store';

export type FollowItem = {
  id: number;
  data: TwitchEventFollowData;
};

export type Follow = FollowItem[];

const createFollow = (initialState: Follow) => {
  const { set, update, subscribe } = writable(initialState);

  return {
    subscribe,
    add: (data: TwitchEventFollowData) =>
      update((v) => [...v, { id: new Date(data.followed_at).getTime(), data }]),
    removeById: (id: number) => update((v) => v.filter((i) => i.id !== id)),
    reset: () => set(initialState)
  };
};

const follow = createFollow([]);

export default follow;
