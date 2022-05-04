<script lang="ts">
  import { replaceBetween } from '$lib/replaceBetween';
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

  onMount(() => {
    let newMsg = message.message;
    if (message.emotes) {
      message.emotes
        .sort((a, b) => b.start - a.start)
        .forEach((emote) => {
          newMsg = replaceBetween(newMsg, emote.start, emote.end + 1, getImage(emote.id));
        });
    }
    formattedMessage = sanitizeHtml(`<style></style>${newMsg}`, [
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
