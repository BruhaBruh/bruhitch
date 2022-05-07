<script lang="ts" context="module">
  import fetchAllEmotes from '$lib/chat/fetchEmotes';
  import config from '$lib/stores/subscribe/config';
  import subscribe from '$lib/stores/subscribe/subscribe';
  import SubscribeWidget from '@components/subscribe/widget/SubscribeWidget.svelte';
  import type { Load } from '@sveltejs/kit';
  import { StaticAuthProvider } from '@twurple/auth';
  import { PubSubClient, PubSubListener, PubSubSubscriptionMessage } from '@twurple/pubsub';
  import { onDestroy, onMount } from 'svelte';
  import './subscribe.css';

  export const prerender = true;

  type LoadParams = {
    token: string;
  };

  export const load: Load<LoadParams> = async ({ params, fetch }) => {
    const { token } = params;

    if (!token) {
      return {
        status: 403,
        error: new Error('token is not defined')
      };
    }

    const t = await fetch('/api/v1/user/token?token=' + token)
      .then(async (r) => ({ status: r.status, data: await r.json() }))
      .catch(console.error);

    if (t && t.status === 200) {
      const settings = await fetch('/api/v1/subscribe/settings?token=' + token)
        .then(async (r) => ({ status: r.status, data: await r.json() }))
        .catch(console.error);

      if (settings && settings.status === 200) {
        config.loadSettings(settings.data);
      }

      await fetchAllEmotes(t.data.user, t.data.userId);

      return {
        props: {
          clientId: t?.data?.clientId,
          accessToken: t?.data?.clientId,
          scope: t?.data?.scope
        }
      };
    }

    return {
      clientId: '',
      accessToken: '',
      scope: []
    };
  };
</script>

<script lang="ts">
  export let clientId: string;
  export let accessToken: string;
  export let scope: string[];

  let authProvider: StaticAuthProvider = undefined;
  let pubSubClient: PubSubClient;
  let userId: string;
  let listener: PubSubListener<never>;

  onMount(async () => {
    if (!clientId || !accessToken || !scope) return console.log(clientId, scope);
    authProvider = new StaticAuthProvider(clientId, accessToken, scope);
    pubSubClient = new PubSubClient();
    userId = await pubSubClient.registerUserListener(authProvider);
    listener = await pubSubClient.onSubscription(userId, (message: PubSubSubscriptionMessage) => {
      subscribe.add(message);
    });
  });

  onDestroy(() => {
    if (listener) listener.remove();
  });
</script>

{#if authProvider}
  <SubscribeWidget />
{/if}
