<script lang="ts">
  import { replaceBetween } from '$lib/replaceBetween';
  import emotes from '$lib/stores/chat/emotes';
  import config from '$lib/stores/subscribe/config';
  import { sanitizeHtml } from '@sika7/sanitize-html';
  import type { PubSubChatMessage } from '@twurple/pubsub/lib/messages/PubSubMessage';
  import { onMount } from 'svelte';

  export let message: PubSubChatMessage;

  let formattedMessage = '';

  const getImage = (id: number) => {
    const template = 'https://static-cdn.jtvnw.net/emoticons/v2/{id}/default/dark/3.0';
    const image = template.replace('{id}', id.toString());
    return `<span class="emote"><span><img class="emote-image" src="${image}"></span></span>`;
  };
  const getImageTemplate = (id: number) => {
    return `<!${id}!>`;
  };

  onMount(() => {
    let newMsg = message.message;
    if (message.emotes) {
      message.emotes
        .sort((a, b) => b.start - a.start)
        .forEach((emote) => {
          newMsg = replaceBetween(newMsg, emote.start, emote.end + 1, getImageTemplate(emote.id));
        });
    }

    const words = newMsg.split(' ').filter((v) => v.trim() !== '');
    let wordsOrEmotes: {
      service?: 'twitch' | 'stv' | 'bttv' | 'ffz';
      value: string;
    }[] = [];
    let text = '';

    words.forEach((v) => {
      if (/^<!\S*!>$/.test(v)) {
        if (text !== '') {
          wordsOrEmotes.push({ value: text.trim() });
          text = '';
        }
        wordsOrEmotes.push({ service: 'twitch', value: v });
        return;
      }
      if ($emotes.stv.find((e) => e.name === v)) {
        if (text !== '') {
          wordsOrEmotes.push({ value: text.trim() });
          text = '';
        }
        wordsOrEmotes.push({ service: 'stv', value: v });
        return;
      }
      if ($emotes.bttv.emotes.find((e) => e.code === v)) {
        if (text !== '') {
          wordsOrEmotes.push({ value: text.trim() });
          text = '';
        }
        wordsOrEmotes.push({ service: 'bttv', value: v });
        return;
      }
      if ($emotes.ffz.find((e) => e.name === v)) {
        if (text !== '') {
          wordsOrEmotes.push({ value: text.trim() });
          text = '';
        }
        wordsOrEmotes.push({ service: 'ffz', value: v });
        return;
      }
      text = `${text} ${v}`;
    });

    if (text !== '') wordsOrEmotes.push({ value: text.trim() });

    const parsed = wordsOrEmotes.map((v) => {
      switch (v.service) {
        case 'twitch': {
          const template = 'https://static-cdn.jtvnw.net/emoticons/v2/{id}/default/dark/3.0';
          const id = v.value.match(/^<!(\S*)!>$/);
          const image = template.replace('{id}', id[1]);
          return `<span class="emote"><span style="width: 0.5em; height: 0.5em;"><img class="emote-image" src="${image}"></span></span>`;
        }
        case 'bttv': {
          const image = $emotes.bttv.template.replace(
            '{id}',
            $emotes.bttv.emotes.find((e) => e.code === v.value).id
          );
          return `<span class="emote"><span style="width: 0.5em; height: 0.5em;"><img class="emote-image" src="${image}"></span></span>`;
        }
        case 'stv': {
          const image = $emotes.stv.find((e) => e.name === v.value).urls[
            $emotes.stv.find((e) => e.name === v.value).urls.length - 1
          ][1];
          return `<span class="emote"><span style="width: 0.5em; height: 0.5em;"><img class="emote-image" src="${image}"></span></span>`;
        }
        case 'ffz': {
          const ffzEmote = $emotes.ffz.find((e) => e.name === v.value);
          const keys = Object.keys(ffzEmote.urls);
          const image = `https:${ffzEmote.urls[keys[keys.length - 1]]}`;
          return `<span class="emote"><span style="width: 0.5em; height: 0.5em;"><img class="emote-image" src="${image}"></span></span>`;
        }
        default: {
          return `<span style="word-break: break-word;">${v.value}&nbsp;</span>`;
        }
      }
    });

    formattedMessage = sanitizeHtml(parsed.join(' '), [
      {
        tag: 'span',
        allowAttrs: ['class']
      },
      {
        tag: 'img',
        allowAttrs: ['src', 'class']
      }
    ]);
  });
</script>

<p
  class="whitespace-normal"
  style={`color: #CCCCCC; margin-top: ${$config.fontSize / 2}; font-size: ${
    $config.fontSize * 1.5
  }px`}
>
  {@html formattedMessage}
</p>

<style>
  :global(.emote) {
    margin-right: 0.25em;
  }

  :global(.emote > span) {
    width: 0.5em;
    height: 0.5em;
  }

  :global(.emote-image) {
    position: relative;
    top: -0.1em;
    height: 1.1875em;
    display: inline-block;
  }
</style>
