import { browser } from '$app/env';
import type { IconName } from '@components/ui/Icon';
import type { ToastColor, ToastItem } from '@components/ui/Toast';
import { writable } from 'svelte/store';

export type ModalType = any | null;

export type UIStore = {
  isDarkTheme: boolean;
  isOpenedSidebar: boolean;
  toastList: ToastItem[];
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

  const sidebar = {
    toggle: () => update((v) => ({ ...v, isOpenedSidebar: !v.isOpenedSidebar })),
    set: (isOpenedSidebar: boolean) => {
      update((v) => ({ ...v, isOpenedSidebar }));
    }
  };

  return {
    subscribe,
    toast,
    theme,
    sidebar,
    set,
    reset: () => set(initialState)
  };
};

export const ui = createUI({ isDarkTheme: false, isOpenedSidebar: false, toastList: [] });
