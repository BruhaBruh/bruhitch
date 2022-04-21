<script lang="ts" context="module">
  import { browser } from '$app/env';
  import fetchAllEmotes from '$lib/chat/fetchEmotes';
  import UrlParser from '$lib/chat/urlParser';
  import { replaceBetween } from '$lib/replaceBetween';
  import badges from '$lib/stores/chat/badges';
  import chat from '$lib/stores/chat/chat';
  import config from '$lib/stores/chat/config';
  import type { NewMessageResponse } from '$types/chat';
  import type { ChatTwitchBadge, TwitchBadge } from '$types/chat/badge';
  import ChatWidget from '@components/chat/widget/ChatWidget.svelte';
  import type { Load } from '@sveltejs/kit';
  import { onMount } from 'svelte';
  import { Events } from 'twitch-js';
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
      '/chat/badges?channel=' + channel
    ).then((r) => r.json());

    return {
      props: {
        channel,
        tbadges: badges,
        broadcasterId
      }
    };
  };
</script>

<script lang="ts">
  export let channel: string;
  export let broadcasterId: string;
  export let tbadges: TwitchBadge[];

  const handleNewMessage: (state: NewMessageResponse) => void = ({
    tags,
    _raw,
    message,
    isSelf
  }) => {
    if (
      ($config.hideReward && /custom-reward-id=/.test(_raw)) ||
      message.startsWith('!') ||
      $config.hiddenNicknames.map((n) => n.toLowerCase()).includes(tags.username.toLowerCase()) ||
      isSelf
    )
      return;

    let newMessage = message;
    tags.emotes
      .sort((a, b) => b.start - a.start)
      .forEach((emote) => {
        newMessage = replaceBetween(newMessage, emote.start, emote.end + 1, `<!${emote.id}!>`);
      });

    const badgeNames: ChatTwitchBadge[] = _raw
      .split(';')
      .find((v) => v.includes('badges='))
      .split('=')[1]
      .split(',')
      .map((v) => ({
        set_id: v.split('/')[0],
        version: v.split('/')[1]
      }));

    chat.add({ id: tags.id, user: tags, message: newMessage, badgeNames });
  };

  const handleRemoveMessage: (state: { targetMessageId: string }) => void = ({
    targetMessageId
  }) => {
    chat.remove(targetMessageId);
  };

  const loadConfigFromHref = () => {
    const {
      hiddenNicknames,
      defaultColor,
      nicknameColors,
      font,
      animation,
      animationEasing,
      animationParams,
      hideReward,
      disablePadding,
      fontSize,
      gradientOnlyCustom,
      chatType
    } = new UrlParser(window.location.href).getSettings();

    config.setHidden(hiddenNicknames);
    config.setDefaultColor(defaultColor);
    config.setCustomColor(nicknameColors);
    config.setFont(font);
    config.setAnimation(animation);
    config.setAnimationEasing(animationEasing);
    config.setAnimationParams(animationParams);
    config.setHideReward(hideReward);
    config.setDisablePadding(disablePadding);
    config.setFontSize(fontSize);
    config.setGradientOnlyCustom(gradientOnlyCustom);
    config.setChatType(chatType);
  };

  onMount(async () => {
    if (!browser) return;

    loadConfigFromHref();

    badges.set(tbadges);

    await fetchAllEmotes(channel, broadcasterId);

    const tjs = (window as any).TwitchJs;
    const twitchChat = new tjs.Chat({
      username: undefined,
      token: undefined,
      log: { level: 'warn' }
    });

    twitchChat.on(Events.PRIVATE_MESSAGE, handleNewMessage);

    twitchChat.on(Events.CLEAR_MESSAGE, handleRemoveMessage);

    twitchChat.on(Events.CLEAR_CHAT, () => chat.clear());

    twitchChat.on(Events.CONNECTED, () => console.log('Twitch: Connected!'));
    twitchChat.on(Events.DISCONNECTED, () => console.log('Twitch: Disonnected!'));
    twitchChat.on(Events.RECONNECT, () => console.log('Twitch: Reconnect!'));

    try {
      await twitchChat.connect();
      await twitchChat.join(channel);
    } catch (e) {
      window.location.reload();
    }
  });
</script>

<ChatWidget />
