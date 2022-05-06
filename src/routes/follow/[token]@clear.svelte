<script lang="ts" context="module">
  import { browser } from '$app/env';
  import { page } from '$app/stores';
  import config from '$lib/stores/follow/config';
  import follow, { showedFollow } from '$lib/stores/follow/follow';
  import {
    BaseResponseMessageType,
    CallbackResponseMessageType,
    RequestMessageType,
    WSResponseMessageType,
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
  let interval: NodeJS.Timer;
  let retry = 0;
  let subscribeRetry = 0;
  let retryTimeout: NodeJS.Timeout;

  const subscribe = () => {
    const subscribeRequest: WSRequest<undefined> = { type: RequestMessageType.SubscribeFollow };
    setTimeout(() => {
      if (ws.OPEN) {
        ws.send(JSON.stringify(subscribeRequest));
      } else {
        retrySubscribe();
      }
    }, 500);
  };

  const retrySubscribe = () => {
    setTimeout(() => {
      subscribe();
    }, 5000 * subscribeRetry);
    subscribeRetry += 1;
  };

  const retryConnect = () => {
    retryTimeout = setTimeout(() => {
      if (!(ws.CLOSED || ws.CLOSING)) {
        ws.close(3000);
      }
      connect();
    }, 2000 * retry);
    retry += 1;
  };

  const connect = async () => {
    const isSecure = $page.url.protocol.includes('https');

    const isLocalhost = $page.url.host.includes('localhost');

    const wsURL = `ws${isSecure ? 's' : ''}://${
      isLocalhost ? 'localhost' : '893589-cm69223.tmweb.ru'
    }/ws/v1?token=${token}`;

    ws = new WebSocket(wsURL);

    ws.addEventListener('open', () => {
      retry = 0;
      clearTimeout(retryTimeout);

      const pingRequest: WSRequest<undefined> = { type: RequestMessageType.Ping };
      interval = setInterval(() => ws.send(JSON.stringify(pingRequest)), 1000 * 20);

      subscribe();
    });

    ws.addEventListener('message', (e) => {
      const data: WSResponse<TwitchEventFollowData> = JSON.parse(e.data);
      if (data.type === BaseResponseMessageType.Error) {
        if (data.message === 'Too Many Requests') {
          retrySubscribe();
        }
        console.error(data.message);
        return;
      }
      if (data.type === WSResponseMessageType.Subscribed) {
        subscribeRetry = 0;
      }
      if (data.type !== CallbackResponseMessageType.SubscribeFollow) return;
      const alreadyShowed = $showedFollow
        .map((v) => v)
        .includes(new Date(data.data.followed_at).getTime());

      if (alreadyShowed) return;

      follow.add(data.data);
      showedFollow.add(data.data.followed_at);
    });

    ws.addEventListener('close', (e) => {
      clearInterval(interval);
      console.log(e.code, e.reason);
      if (e.code === 1006) return retryConnect();
      try {
        const data: WSResponse<undefined> = JSON.parse(e.reason);
        if (data.type === BaseResponseMessageType.Reconnect) {
          retryConnect();
        }
      } catch (e) {}
    });
  };

  onMount(() => {
    if (!browser || !!ws) return;
    connect();
  });

  onDestroy(() => {
    if (!browser || !ws) return;
    clearInterval(interval);
    if (!(ws.CLOSED || ws.CLOSING)) {
      ws.close();
    }
  });
</script>

<FollowWidget />
