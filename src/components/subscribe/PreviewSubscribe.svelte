<script lang="ts">
  import config from '$lib/stores/subscribe/config';
  import subscribe from '$lib/stores/subscribe/subscribe';
  import faker from '@faker-js/faker';
  import { PubSubSubscriptionMessage } from '@twurple/pubsub';
  import { onDestroy, onMount } from 'svelte';
  import SubscribeWidget from './widget/SubscribeWidget.svelte';

  export let withWrapper = true;

  let timeout: NodeJS.Timeout;

  onMount(() => {
    sendNewSubscribe();
  });

  const getNewSubscribe = (
    context: 'sub' | 'resub' | 'subgift' | 'anonsubgift' | 'resubgift' | 'anonresubgift',
    newSub: string,
    plan: 'Prime' | '1000' | '2000' | '3000',
    cumulative?: number,
    streak?: number,
    gifter?: string,
    months?: number
  ): PubSubSubscriptionMessage => {
    switch (context) {
      case 'sub': {
        return new PubSubSubscriptionMessage({
          user_name: newSub.toLowerCase(),
          display_name: newSub,
          channel_name: 'mr_woodchuck',
          user_id: '13405587',
          channel_id: '89614178',
          time: new Date().toISOString(),
          sub_plan: plan,
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
      }
      case 'resub': {
        return new PubSubSubscriptionMessage({
          user_name: newSub.toLowerCase(),
          display_name: newSub,
          channel_name: 'mr_woodchuck',
          user_id: '13405587',
          channel_id: '89614178',
          time: new Date().toISOString(),
          sub_plan: plan,
          sub_plan_name: 'Channel Subscription (mr_woodchuck)',
          cumulative_months: cumulative,
          streak_months: streak,
          context: 'resub',
          sub_message: {
            message: 'Its resub WOW! KappaHD',
            emotes: [
              {
                start: 15,
                end: 22,
                id: 2867
              }
            ]
          }
        });
      }
      case 'subgift': {
        return new PubSubSubscriptionMessage({
          user_name: gifter.toLowerCase(),
          display_name: gifter,
          channel_name: 'mr_woodchuck',
          user_id: '13405587',
          channel_id: '89614178',
          time: new Date().toISOString(),
          sub_plan: plan,
          sub_plan_name: 'Channel Subscription (mr_woodchuck)',
          months: cumulative ?? 1,
          context: 'subgift',
          sub_message: {
            message: '',
            emotes: null
          },
          recipient_id: '19571752',
          recipient_user_name: newSub.toLocaleLowerCase(),
          recipient_display_name: newSub,
          multi_month_duration: months // or undefined
        });
      }
      case 'resubgift': {
        return new PubSubSubscriptionMessage({
          user_name: gifter.toLowerCase(),
          display_name: gifter,
          channel_name: 'mr_woodchuck',
          user_id: '13405587',
          channel_id: '89614178',
          time: new Date().toISOString(),
          sub_plan: plan,
          sub_plan_name: 'Channel Subscription (mr_woodchuck)',
          context: 'resubgift',
          sub_message: {
            message: '',
            emotes: null
          },
          recipient_id: '13405587',
          recipient_user_name: newSub.toLowerCase(),
          recipient_display_name: newSub,
          months: cumulative,
          multi_month_duration: months
        });
      }
      case 'anonsubgift': {
        return new PubSubSubscriptionMessage({
          user_id: '',
          user_name: '',
          display_name: '',
          channel_name: 'mr_woodchuck',
          channel_id: '89614178',
          time: new Date().toISOString(),
          sub_plan: plan,
          sub_plan_name: 'Channel Subscription (mr_woodchuck)',
          months: 1,
          multi_month_duration: 0,
          context: 'anonsubgift',
          sub_message: {
            message: '',
            emotes: null
          },
          recipient_id: '13405587',
          recipient_user_name: newSub.toLowerCase(),
          recipient_display_name: newSub
        });
      }
      case 'anonresubgift': {
        return new PubSubSubscriptionMessage({
          user_id: '',
          user_name: '',
          display_name: '',
          channel_name: 'mr_woodchuck',
          channel_id: '89614178',
          time: new Date().toISOString(),
          sub_plan: '1000',
          sub_plan_name: 'Channel Subscription (mr_woodchuck)',
          months: cumulative,
          multi_month_duration: months,
          context: 'anonsubgift',
          sub_message: {
            message: '',
            emotes: null
          },
          recipient_id: '13405587',
          recipient_user_name: newSub.toLowerCase(),
          recipient_display_name: newSub
        });
      }
    }
  };

  const sendNewSubscribe = () => {
    const contexts = ['sub', 'resub', 'subgift', 'anonsubgift', 'resubgift', 'anonresubgift'];
    const plans: ('Prime' | '1000' | '2000' | '3000')[] = ['Prime', '1000', '2000', '3000'];

    const context = contexts[Math.floor(Math.random() * contexts.length)];
    const plan = plans[Math.floor(Math.random() * plans.length)];

    let msg: PubSubSubscriptionMessage;

    switch (context) {
      case 'sub': {
        msg = getNewSubscribe(context, faker.name.firstName(), plan);
        break;
      }
      case 'resub': {
        const cumulative = Math.floor(Math.random() * 12);
        const streak = Math.floor(Math.random() * cumulative);
        msg = getNewSubscribe(context, faker.name.firstName(), plan, cumulative, streak);
        break;
      }
      case 'subgift': {
        const cumulative = faker.datatype.boolean() ? Math.floor(Math.random() * 12) : undefined;
        msg = getNewSubscribe(
          context,
          faker.name.firstName(),
          plan,
          cumulative,
          undefined,
          faker.name.firstName(),
          Math.floor(Math.random() * 6)
        );
        break;
      }
      case 'resubgift': {
        const cumulative = faker.datatype.boolean() ? Math.floor(Math.random() * 12) : undefined;
        msg = getNewSubscribe(
          context,
          faker.name.firstName(),
          plan,
          cumulative,
          undefined,
          faker.name.firstName(),
          Math.floor(Math.random() * 6)
        );
        break;
      }
      case 'anonsubgift': {
        msg = getNewSubscribe(context, faker.name.firstName(), plan);
        break;
      }
      case 'anonresubgift': {
        const cumulative = Math.floor(Math.random() * 12);
        msg = getNewSubscribe(
          context,
          faker.name.firstName(),
          plan,
          cumulative,
          undefined,
          undefined,
          Math.floor(Math.random() * 6)
        );
      }
    }

    subscribe.add(msg);

    timeout = setTimeout(sendNewSubscribe, Math.floor(Math.random() * 2000 + 4000));
  };

  onDestroy(() => clearTimeout(timeout));

  config.subscribe((v) => subscribe.reset());
</script>

{#if withWrapper}
  <div
    {...$$restProps}
    class={[
      'preview border border-gray-base h-full sticky top-20 flex items-center justify-center overflow-hidden bg-gray-lightest',
      $$restProps.class
    ]
      .filter(Boolean)
      .join(' ')}
  >
    <div class="h-full w-full flex flex-col items-stretch justify-start overflow-hidden">
      <SubscribeWidget />
    </div>
  </div>
{:else}
  <SubscribeWidget />
{/if}

<style lang="postcss">
  .preview {
    height: 576px;
  }
</style>
