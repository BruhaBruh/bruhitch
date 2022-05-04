import type { PubSubSubscriptionMessage } from '@twurple/pubsub';
import { writable } from 'svelte/store';

export type SubscribeItem = {
  id: number;
  data: PubSubSubscriptionMessage;
};

export type Subscribe = SubscribeItem[];

const createSubscribe = (initialState: Subscribe) => {
  const { set, update, subscribe } = writable(initialState);

  return {
    subscribe,
    add: (data: PubSubSubscriptionMessage) =>
      update((v) => [...v, { id: data.time.getTime(), data }]),
    removeById: (id: number) => update((v) => v.filter((i) => i.id !== id)),
    reset: () => set(initialState)
  };
};

const subscribe = createSubscribe([]);

export default subscribe;
