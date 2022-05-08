<script lang="ts" context="module">
  import { browser } from '$app/env';
  import { page } from '$app/stores';
  import config from '$lib/stores/prediction/config';
  import prediction, { endedPredictions, showPrediction } from '$lib/stores/prediction/prediction';
  import type { EventSubPredictionData, EventSubPredictionEndData } from '$types/eventsub';
  import {
    BaseResponseMessageType,
    CallbackResponseMessageType,
    RequestMessageType,
    WSResponseMessageType,
    WsStatusCodes,
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
  let retry = 0;
  let subscribeRetry = 0;
  let retryTimeout: NodeJS.Timeout;

  const subscribe = () => {
    const subscribeRequest: WSRequest<undefined> = { type: RequestMessageType.SubscribePrediction };
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
        ws.close(WsStatusCodes.NormalClose);
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
      const data: WSResponse<EventSubPredictionData | EventSubPredictionEndData> = JSON.parse(
        e.data
      );
      if (data.type === BaseResponseMessageType.Reconnect) {
        return retryConnect();
      }
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

      const predictionIsSameId = $prediction?.data.id === data.data.id;
      const predictionInEnded = $endedPredictions.map((v) => v.id).includes(data.data.id);
      let predictionHasMoreChannelPoints = false;
      if (predictionIsSameId) {
        data.data.outcomes.forEach((v) => {
          if (predictionHasMoreChannelPoints) return;
          const outcome = $prediction.data.outcomes.find((i) => i.id === v.id);
          predictionHasMoreChannelPoints = (outcome.channel_points ?? 0) < (v.channel_points ?? 0);
        });
      }
      switch (data.type) {
        case CallbackResponseMessageType.SubscribePredictionBegin: {
          if (predictionInEnded || predictionIsSameId) return;
          prediction.setPrediction('begin', data.data);
          showPrediction.set(true);
          break;
        }
        case CallbackResponseMessageType.SubscribePredictionProgress: {
          if (predictionInEnded || !predictionHasMoreChannelPoints) return;
          prediction.setPrediction('progress', data.data);
          showPrediction.set(true);
          break;
        }
        case CallbackResponseMessageType.SubscribePredictionEnd: {
          if (predictionInEnded) return;
          prediction.setPrediction('end', data.data);
          showPrediction.set(true);
          endedPredictions.add(data.data.id);
          setTimeout(() => {
            showPrediction.set(false);
          }, $config.hideDelay);
          break;
        }
      }
    });

    ws.addEventListener('close', (e) => {
      clearInterval(interval);
      if (e.code === WsStatusCodes.AbnormalClosure || e.code === WsStatusCodes.InternalError)
        return retryConnect();
      try {
        const data: WSResponse<undefined> = JSON.parse(e.reason);
        if (data.type === BaseResponseMessageType.Reconnect) {
          retryConnect();
        }
        if (e.code === WsStatusCodes.Forbidden) {
          console.log(data.message);
        }
        console.log(e.code, data);
      } catch (err) {
        console.log(e.code, e.reason);
      }
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

<PredictionWidget />
