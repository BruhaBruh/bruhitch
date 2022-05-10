import { browser } from '$app/env';
import type { IconName } from '@components/ui/Icon';
import type { ToastColor, ToastItem } from '@components/ui/Toast';
import { writable } from 'svelte/store';

export type ModalType = any | null;

export type UIStore = {
  isDarkTheme: boolean;
  IsOpenedDrawer: boolean;
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

  const drawer = {
    toggle: () => update((v) => ({ ...v, IsOpenedDrawer: !v.IsOpenedDrawer })),
    set: (IsOpenedDrawer: boolean) => {
      update((v) => ({ ...v, IsOpenedDrawer }));
    }
  };

  return {
    subscribe,
    toast,
    theme,
    drawer,
    reset: () => set(initialState)
  };
};

export const ui = createUI({ isDarkTheme: false, IsOpenedDrawer: false, toastList: [] });
