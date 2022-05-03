<script lang="ts" context="module">
  import { browser } from '$app/env';
  import { page } from '$app/stores';
  import config from '$lib/stores/follow/config';
  import follow from '$lib/stores/follow/follow';
  import {
    BaseResponseMessageType,
    CallbackResponseMessageType,
    RequestMessageType,
    type TwitchEventFollowData,
    type WSRequest,
    type WSResponse
  } from '$types/ws';
  import FollowWidget from '@components/follow/widget/FollowWidget.svelte';
  import type { Load } from '@sveltejs/kit';
  import { onDestroy, onMount } from 'svelte';
  import './follow.css';

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

    const settings = await fetch('/api/v1/follow/settings?token=' + token)
      .then(async (r) => ({ status: r.status, data: await r.json() }))
      .catch(console.error);

    if (settings && settings.status === 200) {
      config.loadSettings(settings.data);
    }

    return {
      props: {
        token
      }
    };
  };
</script>

<script lang="ts">
  export let token: string;

  let ws: WebSocket;

  const connect = async () => {
    const isSecure = $page.url.protocol.includes('https');

    const isLocalhost = $page.url.host.includes('localhost');

    const wsURL = `ws${isSecure ? 's' : ''}://${
      isLocalhost ? 'localhost' : '893589-cm69223.tmweb.ru'
    }/ws/v1?token=${token}`;

    ws = new WebSocket(wsURL);

    ws.addEventListener('open', () => {
      const subscribeRequest: WSRequest<undefined> = { type: RequestMessageType.SubscribeFollow };

      setTimeout(() => ws.send(JSON.stringify(subscribeRequest)), 500);
    });

    ws.addEventListener('message', (e) => {
      const data: WSResponse<TwitchEventFollowData> = JSON.parse(e.data);
      if (data.type !== CallbackResponseMessageType.SubscribeFollow) return;

      follow.add(data.data);
    });

    ws.addEventListener('close', (e) => {
      const data: WSResponse<undefined> = JSON.parse(e.reason);
      if (data.type === BaseResponseMessageType.Reconnect) {
        ws.close(3000);
        connect();
      }
    });
  };

  onMount(() => {
    if (!browser || !!ws) return;
    connect();
  });

  onDestroy(() => {
    if (!browser || !ws) return;

    ws.close();
  });
</script>

<FollowWidget />
