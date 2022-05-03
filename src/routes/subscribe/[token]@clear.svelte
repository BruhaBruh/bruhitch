<script lang="ts" context="module">
  import { browser } from '$app/env';
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
      const authProvider = new StaticAuthProvider(
        t.data.clientId,
        t.data.accessToken,
        t.data.scope
      );
      return {
        props: {
          authProvider
        }
      };
    }

    return {
      props: {
        accessToken: '',
        clientId: '',
        scope: []
      }
    };
  };
</script>

<script lang="ts">
  export let authProvider: StaticAuthProvider = undefined;

  let pubSubClient: PubSubClient;
  let userId: string;
  let listener: PubSubListener<never>;

  onMount(async () => {
    if (!browser) return;
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

{#if !authProvider}
  Undefined auth provider
{:else}
  <SubscribeWidget />
{/if}
