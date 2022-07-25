<script lang="ts" context="module">
  import fetchAllEmotes from '$lib/chat/fetchEmotes';
  import UrlParser from '$lib/chat/urlParser';
  import { BanWordRegex } from '$lib/constants';
  import { replaceBetween } from '$lib/replaceBetween';
  import badges from '$lib/stores/chat/badges';
  import chat from '$lib/stores/chat/chat';
  import config from '$lib/stores/chat/config';
  import type { TwitchBadge } from '$types/chat/badge';
  import ChatWidget from '@components/chat/widget/ChatWidget.svelte';
  import type { Load } from '@sveltejs/kit';
  import { onDestroy, onMount } from 'svelte';
  import type { ChatUserstate, Client } from 'tmi.js';
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
      '/badges?channel=' + channel
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
  export let client: Client = undefined;
  export let connected = false;

  const handleNewMessage = (state: ChatUserstate, message: string, isSelf: boolean) => {
    if ($config.hideReward && state['custom-reward-id']) return;
    if (message.startsWith('!')) return;
    if ($config.hiddenNicknames.map((v) => v.toLowerCase()).includes(state.username.toLowerCase()))
      return;

    let emoteTags: { id: string; start: number; end: number }[] = [];

    if (state.emotes) {
      Object.keys(state.emotes).map((emote) => {
        state.emotes[emote].map((pos) => {
          const [startString, endString] = pos.split('-');
          const start = Number(startString);
          const end = Number(endString);
          emoteTags.push({ id: emote, start, end });
        });
      });
    }

    let formattedMessage = message;
    emoteTags
      .sort((a, b) => b.start - a.start)
      .forEach((emote) => {
        formattedMessage = replaceBetween(
          formattedMessage,
          emote.start,
          emote.end + 1,
          `<!${emote.id}!>`
        );
      });

    formattedMessage = formattedMessage
      .split(' ')
      .map((v) => (BanWordRegex.test(v) ? '***' : v))
      .join(' ');

    chat.add({ id: state.id, state, message: formattedMessage });
  };

  const loadConfigFromHref = () => {
    config.loadSettings(new UrlParser(window.location.href).getSettings());
  };

  onMount(async () => {
    loadConfigFromHref();

    badges.set(tbadges);

    await fetchAllEmotes($config.channel, broadcasterId);

    client = new tmi.Client({
      connection: {
        reconnect: true,
        secure: true
      },
      channels: [$config.channel]
    });

    client.on('message', (_, userState, message, self) =>
      handleNewMessage(userState, message, self)
    );
    client.on('messagedeleted', (_, username, deletedMessage, state) => {
      chat.remove(state['target-msg-id']);
    });
    client.on('clearchat', () => {
      chat.clear();
    });
    client.on('ban', (_, username) => {
      chat.removeByNickname(username);
    });
    client.on('timeout', (_, username) => {
      chat.removeByNickname(username);
    });

    client.on('connected', () => {
      console.log('Twitch: Connected!');
      connected = true;
    });
    client.on('disconnected', () => {
      console.log('Twitch: Disonnected!');
      connected = false;
    });
    client.on('reconnect', () => console.log('Twitch: Reconnect!'));

    client.connect().catch(console.error);
  });

  onDestroy(() => {
    if (!client || !connected) return;
    client.disconnect();
  });
</script>

<svelte:head>
  <script defer src="/scripts/tmi.min.js"></script>
</svelte:head>

<ChatWidget />
