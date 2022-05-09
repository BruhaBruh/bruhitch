import type { DonationAlert } from '$types/donate';
import { writable } from 'svelte/store';

export type DonateItem = {
  id: number;
  data: DonationAlert;
};

export type Donate = DonateItem[];

const createDonate = (initialState: Donate) => {
  const { set, update, subscribe } = writable(initialState);

  return {
    subscribe,
    add: (data: DonationAlert) => update((v) => [...v, { id: data.id, data }]),
    removeById: (id: number) => update((v) => v.filter((i) => i.id !== id)),
    reset: () => set(initialState)
  };
};

const donate = createDonate([]);

export default donate;
