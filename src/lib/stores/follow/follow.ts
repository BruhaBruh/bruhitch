import type { EventSubFollowData } from '$types/eventsub';
import { writable } from 'svelte/store';

export type FollowItem = {
  id: number;
  data: EventSubFollowData;
};

export type Follow = FollowItem[];

const createFollow = (initialState: Follow) => {
  const { set, update, subscribe } = writable(initialState);

  return {
    subscribe,
    add: (data: EventSubFollowData) =>
      update((v) => [...v, { id: new Date(data.followed_at).getTime(), data }]),
    removeById: (id: number) => update((v) => v.filter((i) => i.id !== id)),
    reset: () => set(initialState)
  };
};

const follow = createFollow([]);

export default follow;

const createShowedFollow = (initialState: number[]) => {
  const { set, subscribe, update } = writable(initialState);

  return {
    subscribe,
    add: (followedAt: string) =>
      update((v) => {
        let newArr = [...v, new Date(followedAt).getTime()].sort((a, b) => b - a);
        if (newArr.length > 50) {
          newArr = newArr.slice(-5);
        }
        return newArr;
      }),
    reset: () => set(initialState)
  };
};

export const showedFollow = createShowedFollow([]);
