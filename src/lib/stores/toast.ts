import type { IconName } from '@components/Icon';
import type { ToastColor, ToastItem } from '@components/Toast';
import { writable } from 'svelte/store';

const createToast = (initialState: ToastItem[]) => {
  const { set, update, subscribe } = writable(initialState);

  return {
    subscribe,
    add: (
      icon: IconName,
      header: string,
      description?: string,
      color: ToastColor = 'secondary',
      duration: number = 3000
    ) => {
      update((v) =>
        [
          ...v,
          {
            id: new Date().getTime(),
            color,
            header,
            description,
            duration,
            icon
          }
        ].slice(-5)
      );
    },
    remove: (id: number) => {
      update((v) => v.filter((i) => i.id !== id));
    },
    reset: () => set(initialState)
  };
};

export const toast = createToast([]);
