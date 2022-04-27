<script lang="ts" context="module">
</script>

<script lang="ts">
  import { browser } from '$app/env';
  import { page } from '$app/stores';
  import { me } from '$lib/stores/me';
  import { MessageType, type MessageResponse } from '$types/ws';
  import { onDestroy } from 'svelte';

  let ws: WebSocket;

  me.subscribe(async (v) => {
    if (!browser || !!ws || !v) return;

    const { id } = await fetch('/api/v1/user/twitch').then((r) => r.json());

    const isSecure = $page.url.protocol.includes('https');

    const wsURL = `ws${isSecure ? 's' : ''}://${$page.url.host}/ws/v1?token=${id}`;

    ws = new WebSocket(wsURL);

    ws.addEventListener('open', () => {
      setTimeout(() => ws.send(JSON.stringify({ type: MessageType.SubscribeFollow })), 100);
    });

    ws.addEventListener('message', (e) => {
      const data: MessageResponse = JSON.parse(e.data);
      console.log(data);
    });
  });

  onDestroy(() => {
    if (!browser || !ws) return;

    ws.close();
  });
</script>

Testing WebSocket
