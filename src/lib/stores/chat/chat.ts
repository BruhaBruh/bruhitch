import type { ChatMessage } from '$types/chat';
import { writable } from 'svelte/store';

const createChat = (initialState: ChatMessage[]) => {
  const { set, update, subscribe } = writable(initialState);

  return {
    subscribe,
    add: (msg: Omit<ChatMessage, 'time'>) => {
      update((v) => {
        const newArr = [...v, { ...msg, time: new Date().getTime() }];
        return newArr.sort((a, b) => b.time - a.time).slice(0, 20);
      });
      // I think, style tags in head needs to transition effect in svelte
      // and remove style tags if messages already removes
      const elements = window.document.querySelectorAll("head style:not([type='text/css'])");
      elements.forEach((v, i) => {
        if (i < 25 && elements.length > 50) {
          v.remove();
        }
      });
    },
    remove: (messageId: string) => {
      update((v) => v.filter((i) => i.id !== messageId));
    },
    removeByNickname: (nickname: string) => {
      update((v) =>
        v.filter((m) => {
          return m.state.username.toLowerCase() !== nickname.toLowerCase();
        })
      );
    },
    clear: () => set(initialState)
  };
};

const chat = createChat([]);

export default chat;
