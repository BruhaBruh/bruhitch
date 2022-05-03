import { PubSubSubscriptionMessage } from '@twurple/pubsub';
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

const sub = new PubSubSubscriptionMessage({
  user_name: 'tww2',
  display_name: 'TWW2',
  channel_name: 'mr_woodchuck',
  user_id: '13405587',
  channel_id: '89614178',
  time: '2015-12-19T16:39:57-08:00',
  sub_plan: '3000',
  sub_plan_name: 'Channel Subscription (mr_woodchuck)',
  cumulative_months: 1,
  streak_months: 0,
  context: 'sub',
  sub_message: {
    message: 'A Twitch baby is born! KappaHD',
    emotes: [
      {
        start: 23,
        end: 30,
        id: 2867
      }
    ]
  }
});

const resub = new PubSubSubscriptionMessage({
  user_name: 'tww2',
  display_name: 'TWW2',
  channel_name: 'mr_woodchuck',
  user_id: '13405587',
  channel_id: '89614178',
  time: '2015-12-19T16:39:57-08:00',
  sub_plan: '1000',
  sub_plan_name: 'Channel Subscription (mr_woodchuck)',
  cumulative_months: 9,
  streak_months: 3,
  context: 'resub',
  sub_message: {
    message: 'A Twitch baby is born! KappaHD',
    emotes: [
      {
        start: 23,
        end: 30,
        id: 2867
      }
    ]
  }
});

const subgift = new PubSubSubscriptionMessage({
  user_name: 'tww2',
  display_name: 'TWW2',
  channel_name: 'mr_woodchuck',
  user_id: '13405587',
  channel_id: '89614178',
  time: '2015-12-19T16:39:57-08:00',
  sub_plan: '1000',
  sub_plan_name: 'Channel Subscription (mr_woodchuck)',
  months: 9,
  multi_month_duration: 0,
  context: 'subgift',
  sub_message: {
    message: '',
    emotes: null
  },
  recipient_id: '19571752',
  recipient_user_name: 'forstycup',
  recipient_display_name: 'forstycup'
});

const subgiftmultimonth = new PubSubSubscriptionMessage({
  user_name: 'tww2',
  display_name: 'TWW2',
  channel_name: 'mr_woodchuck',
  user_id: '13405587',
  channel_id: '89614178',
  time: '2015-12-19T16:39:57-08:00',
  sub_plan: '1000',
  sub_plan_name: 'Channel Subscription (mr_woodchuck)',
  months: 9,
  context: 'subgift',
  sub_message: {
    message: '',
    emotes: null
  },
  recipient_id: '19571752',
  recipient_user_name: 'forstycup',
  recipient_display_name: 'forstycup',
  multi_month_duration: 6
});

const anonsubgiftmultimonth = new PubSubSubscriptionMessage({
  user_id: '',
  user_name: '',
  display_name: '',
  channel_name: 'mr_woodchuck',
  channel_id: '89614178',
  time: '2015-12-19T16:39:57-08:00',
  sub_plan: '1000',
  sub_plan_name: 'Channel Subscription (mr_woodchuck)',
  months: 9,
  multi_month_duration: 0,
  context: 'anonsubgift',
  sub_message: {
    message: '',
    emotes: null
  },
  recipient_id: '13405587',
  recipient_user_name: 'tww2',
  recipient_display_name: 'TWW2'
});

const resubgiftmultimonth = new PubSubSubscriptionMessage({
  user_name: 'tww2',
  display_name: 'TWW2',
  channel_name: 'mr_woodchuck',
  user_id: '13405587',
  channel_id: '89614178',
  time: '2015-12-19T16:39:57-08:00',
  sub_plan: '1000',
  sub_plan_name: 'Channel Subscription (mr_woodchuck)',
  context: 'resubgift',
  sub_message: {
    message: '',
    emotes: null
  },
  recipient_id: '13405587',
  recipient_user_name: 'recc',
  recipient_display_name: 'RecC',
  months: 4,
  multi_month_duration: 0
});

const subscribe = createSubscribe([]);

export default subscribe;
