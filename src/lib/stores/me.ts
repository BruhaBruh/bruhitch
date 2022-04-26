import { writable } from 'svelte/store';

const createMe = () => {
  const { set, subscribe } = writable<User>(null);

  return {
    subscribe,
    set: (user: User) => set(user),
    reset: () => set(null)
  };
};

export const me = createMe();

me.subscribe((v) => {});
