import { browser } from '$app/env';
import type { IconName } from '@components/ui/Icon';
import type { ToastColor, ToastItem } from '@components/ui/Toast';
import { writable } from 'svelte/store';

export type ModalType = any | null;

export type UIStore = {
  isDarkTheme: boolean;
  toastList: ToastItem[];
  modal: ModalType;
};

const createUI = (initialState: UIStore) => {
  const { set, update, subscribe } = writable<UIStore>(initialState);

  const theme = {
    toggle: () =>
      update((v) => {
        if (browser) {
          fetch(window.location.origin + '/theme', {
            method: 'POST',
            body: JSON.stringify({ isDark: !v.isDarkTheme })
          });
        }
        return { ...v, isDarkTheme: !v.isDarkTheme };
      }),
    set: (isDarkTheme: boolean) => {
      if (browser) {
        fetch(window.location.origin + '/theme', {
          method: 'POST',
          body: JSON.stringify({ isDark: isDarkTheme })
        });
      }
      update((v) => ({ ...v, isDarkTheme }));
    }
  };

  const toast = {
    add: (
      icon: IconName,
      header: string,
      description?: string,
      color: ToastColor = 'secondary',
      duration: number = 3000
    ) => {
      update((v) => ({
        ...v,
        toastList: [
          ...v.toastList,
          {
            id: new Date().getTime(),
            color,
            header,
            description,
            duration,
            icon
          }
        ].slice(-5)
      }));
    },
    remove: (id: number) => {
      update((v) => ({ ...v, toastList: v.toastList.filter((i) => i.id !== id) }));
    },
    reset: () => set(initialState)
  };

  const modal = {
    set: (modal: ModalType) => update((v) => ({ ...v, modal }))
  };

  return {
    subscribe,
    toast,
    modal,
    theme,
    reset: () => set(initialState)
  };
};

export const ui = createUI({ isDarkTheme: false, toastList: [], modal: null });
