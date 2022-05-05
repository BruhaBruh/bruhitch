<script lang="ts" context="module">
  import { browser } from '$app/env';
  import { page } from '$app/stores';
  import config from '$lib/stores/prediction/config';
  import prediction from '$lib/stores/prediction/prediction';
  import {
    BaseResponseMessageType,
    CallbackResponseMessageType,
    RequestMessageType,
    type TwitchEventPredictionData,
    type WSRequest,
    type WSResponse
  } from '$types/ws';
  import PredictionWidget from '@components/prediction/widget/PredictionWidget.svelte';
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

    const settings = await fetch('/api/v1/prediction/settings?token=' + token)
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

      switch (data.type) {
        case CallbackResponseMessageType.SubscribePredictionBegin: {
          prediction.setPrediction('begin', data.data);
          break;
        }
        case CallbackResponseMessageType.SubscribePredictionProgress: {
          prediction.setPrediction('progress', data.data);
          break;
        }
        case CallbackResponseMessageType.SubscribePredictionEnd: {
          prediction.setPrediction('end', data.data);
          setTimeout(() => {
            prediction.reset();
          }, $config.hideDelay);
          break;
        }
      }
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

<PredictionWidget />
