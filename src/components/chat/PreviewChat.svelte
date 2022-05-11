<script lang="ts">
  import { browser } from '$app/env';
  import fetchAllEmotes from '$lib/chat/fetchEmotes';
  import { getRandomColor } from '$lib/color';
  import { replaceBetween } from '$lib/replaceBetween';
  import badges from '$lib/stores/chat/badges';
  import chat from '$lib/stores/chat/chat';
  import config from '$lib/stores/chat/config';
  import emotes from '$lib/stores/chat/emotes';
  import type { TwitchBadge } from '$types/chat/badge';
  import Icon from '@components/ui/Icon.svelte';
  import Typography from '@components/ui/Typography.svelte';
  import faker from '@faker-js/faker';
  import { onDestroy } from 'svelte';
  import type { Badges } from 'tmi.js';
  import ChatWidget from './widget/ChatWidget.svelte';

  export let channel: string;
  export let withWrapper = true;

  let debouncedChannel: string;
  let isDebounceWork = true;

  //#region Restart on update channel
  let timeout: NodeJS.Timeout;

  const loadBadgesWithEmotes = async () => {
    try {
      const { badges: TBadges, broadcasterId }: { badges: TwitchBadge[]; broadcasterId: string } =
        await fetch('/api/v1/chat/badges?channel=' + debouncedChannel).then((r) => r.json());

      badges.set(TBadges);

      await fetchAllEmotes(debouncedChannel, broadcasterId);
    } catch (e) {
      console.error(e);
    }
  };

  const debounceChannel = () => {
    clearTimeout(timeout);
    isDebounceWork = true;
    timeout = setTimeout(() => {
      debouncedChannel = channel;
      isDebounceWork = false;
    }, 1000);
  };

  $: channel !== undefined && debounceChannel();

  $: debouncedChannel !== undefined && restartPreview();

  const restartPreview = async () => {
    if (!browser || !debouncedChannel) return;

    chat.clear();
    badges.reset();
    emotes.reset();
    await loadBadgesWithEmotes();

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(sendNewMessage, Math.floor(Math.random() * 2000 + 1000));
  };
  //#endregion

  //#region Generating message functions
  const getRandomBadges = (): Badges => {
    let badgeNames: Badges = {};
    for (let i = 0; i < Math.floor(Math.random() * 3); i++) {
      let hasAlready = true;
      while (hasAlready) {
        const randomBadgeId = Math.floor(Math.random() * $badges.length);
        const badge = $badges[randomBadgeId];
        if (Object.keys(badgeNames).includes(badge.set_id)) continue;

        badgeNames[badge.set_id] = badge.versions[badge.versions.length - 1].id;
        hasAlready = false;
      }
    }
    return badgeNames;
  };

  const defaultNicknames = [
    'BruhaBruh',
    'hyperspace42_',
    'nightbot',
    'twitch',
    'Pepega',
    'andrewkraevskii'
  ];

  type EmoteTag = {
    id: string;
    start: number;
    end: number;
  };

  const defaultEmotes: { emote: string; tag: EmoteTag }[] = [
    {
      emote: 'Kappa',
      tag: {
        id: '25',
        start: 0,
        end: 0
      }
    },
    {
      emote: 'PogChamp',
      tag: {
        id: '305954156',
        start: 0,
        end: 0
      }
    },
    {
      emote: 'BibleThump',
      tag: {
        id: '86',
        start: 0,
        end: 0
      }
    }
  ];

  const getNickname = (): string => {
    const randomType = Math.floor(Math.random() * 3);
    if (randomType === 0 || Object.keys($config.nicknameColors).length === 0) {
      return defaultNicknames[Math.floor(Math.random() * defaultNicknames.length)];
    } else if (randomType === 1) return faker.name.firstName();

    const nicknames = Object.keys($config.nicknameColors);

    return nicknames[Math.floor(Math.random() * nicknames.length)];
  };

  const getMessage = (): { message: string; emotes: EmoteTag[] } => {
    let message = faker.word.adjective(7);
    let amountOfEmotes = Math.floor(Math.random() * 4);
    let resultEmotes: EmoteTag[] = [];
    for (let i = 0; i < amountOfEmotes; i++) {
      const emoteType = Math.floor(Math.random() * 4);
      // 0 - Twitch 1 - BTTV 2 - 7TV 3 - FFZ
      if (emoteType === 0) {
        const { emote, tag } = defaultEmotes[Math.floor(Math.random() * defaultEmotes.length)];
        const start = message.length + 1;
        const end = message.length + emote.length;
        message += ' ' + emote;
        resultEmotes.push({
          id: tag.id,
          start,
          end
        });
        continue;
      } else if (emoteType === 2) {
        const bttvEmotes = $emotes.bttv.emotes.map((v) => v.code);
        if (bttvEmotes.length === 0) continue;
        message += ' ' + bttvEmotes[Math.floor(Math.random() * bttvEmotes.length)];
        continue;
      } else if (emoteType === 3) {
        const stvEmotes = $emotes.stv.map((v) => v.name);
        if (stvEmotes.length === 0) continue;
        message += ' ' + stvEmotes[Math.floor(Math.random() * stvEmotes.length)];
        continue;
      }
      const ffzEmotes = $emotes.ffz.map((v) => v.name);
      if (ffzEmotes.length === 0) continue;
      message += ' ' + ffzEmotes[Math.floor(Math.random() * ffzEmotes.length)];
    }
    return { message, emotes: resultEmotes };
  };

  const sendNewMessage = () => {
    const nickname = getNickname();
    if (!$config.hiddenNicknames.includes(nickname)) {
      const { message, emotes } = getMessage();
      let newMessage = message;
      emotes
        .sort((a, b) => b.start - a.start)
        .forEach((emote) => {
          newMessage = replaceBetween(newMessage, emote.start, emote.end + 1, `<!${emote.id}!>`);
        });
      chat.add({
        id: (Math.random() * 1000000).toString(),
        state: {
          'display-name': getNickname(),
          badges: getRandomBadges(),
          color: getRandomColor(),
          id: Math.floor(Math.random() * 100000000).toString(16)
        },
        message: newMessage
      });
    }

    timeout = setTimeout(sendNewMessage, Math.floor(Math.random() * 2000 + 1000));
  };
  //#endregion

  onDestroy(() => clearTimeout(timeout));

  config.subscribe(() => {
    chat.clear();
  });
</script>

{#if withWrapper}
  <div
    {...$$restProps}
    class={[
      'preview border border-gray-base h-full flex items-center justify-center overflow-hidden bg-gray-lightest',
      $$restProps.class
    ]
      .filter(Boolean)
      .join(' ')}
  >
    {#if isDebounceWork}
      <Icon icon="spinner" class="fill-gray-base animate-spin" size={64} />
    {:else if debouncedChannel}
      <div class="h-full w-full flex flex-col items-stretch justify-end overflow-hidden">
        <ChatWidget />
      </div>
    {:else}
      <Typography variant="b1" class="m-4 text-gray-darkest">Type channel name</Typography>
    {/if}
  </div>
{:else}
  <ChatWidget />
{/if}

<style lang="postcss">
  .preview {
    height: 576px;
  }
</style>
