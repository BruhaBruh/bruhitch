import { writable } from 'svelte/store';

export type ModalState = any | null;

const createModal = (initialState: ModalState) => {
  const { set, subscribe } = writable<ModalState>(initialState);

  return {
    subscribe,
    set,
    reset: () => set(initialState)
  };
};

export const modal = createModal(null);
