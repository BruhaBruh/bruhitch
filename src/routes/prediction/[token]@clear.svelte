<script lang="ts" context="module">
  import { browser } from '$app/env';
  import { page } from '$app/stores';
  import {
    BaseResponseMessageType,
    CallbackResponseMessageType,
    RequestMessageType,
    type TwitchEventPredictionData,
    type WSRequest,
    type WSResponse
  } from '$types/ws';
  import type { Load } from '@sveltejs/kit';
  import { onDestroy, onMount } from 'svelte';
  import './prediction.css';

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

  const connect = async () => {
    const isSecure = $page.url.protocol.includes('https');

    const isLocalhost = $page.url.host.includes('localhost');

    const wsURL = `ws${isSecure ? 's' : ''}://${
      isLocalhost ? 'localhost' : '893589-cm69223.tmweb.ru'
    }/ws/v1?token=${token}`;

    ws = new WebSocket(wsURL);

    ws.addEventListener('open', () => {
      const subscribeRequest: WSRequest<undefined> = {
        type: RequestMessageType.SubscribePrediction
      };
      const pingRequest: WSRequest<undefined> = { type: RequestMessageType.Ping };

      interval = setInterval(() => ws.send(JSON.stringify(pingRequest)), 1000 * 20);
      setTimeout(() => ws.send(JSON.stringify(subscribeRequest)), 500);
    });

    ws.addEventListener('message', (e) => {
      const data: WSResponse<TwitchEventPredictionData | TwitchEventPredictionData> = JSON.parse(
        e.data
      );
      if (data.type === BaseResponseMessageType.Error) {
        console.error(data.message);
        return;
      }
      if (
        !(
          [
            CallbackResponseMessageType.SubscribePredictionBegin,
            CallbackResponseMessageType.SubscribePredictionProgress,
            CallbackResponseMessageType.SubscribePredictionEnd
          ] as string[]
        ).includes(data.type)
      )
        return;

      console.log(data);
    });

    ws.addEventListener('close', (e) => {
      clearInterval(interval);
      console.log(e.code, e.reason);
      try {
        const data: WSResponse<undefined> = JSON.parse(e.reason);
        if (data.type === BaseResponseMessageType.Reconnect) {
          ws.close(3000);
          connect();
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
    ws.close();
  });
</script>

testing
