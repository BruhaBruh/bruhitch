<script lang="ts" context="module">
  import { browser } from '$app/env';
  import UrlParser from '$lib/chat/urlParser';
  import badges from '$lib/stores/chat/badges';
  import config from '$lib/stores/chat/config';
  import type { TwitchBadge } from '$types/chat/badge';
  import PreviewChat from '@components/chat/PreviewChat.svelte';
  import type { Load } from '@sveltejs/kit';
  import { onMount } from 'svelte';
  import './chat.css';

  export const prerender = true;

  type LoadParams = {
    channel: string;
  };

  export const load: Load<LoadParams> = async ({ params, fetch }) => {
    const { channel } = params;

    if (!channel) {
      return {
        status: 403,
        error: new Error('channel is not defined')
      };
    }

    const { badges, broadcasterId }: { badges: TwitchBadge[]; broadcasterId: string } = await fetch(
      '/api/v1/chat/badges?channel=' + channel
    ).then((r) => r.json());

    config.setChannel(channel);

    return {
      props: {
        tbadges: badges,
        broadcasterId
      }
    };
  };
</script>

<script lang="ts">
  export let broadcasterId: string;
  export let tbadges: TwitchBadge[];

  const loadConfigFromHref = () => {
    config.loadSettings(new UrlParser(window.location.href).getSettings());
  };

  onMount(async () => {
    if (!browser) return;

    loadConfigFromHref();

    badges.set(tbadges);
  });
</script>

<PreviewChat channel={$config.channel} withWrapper={false} />
