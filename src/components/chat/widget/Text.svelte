<script lang="ts">
  import emotes from '$lib/stores/chat/emotes';

  export let message: string;

  let parsed: string[] = [];

  const updateParsedMessage = () => {
    const words = message.split(' ').filter((v) => v.trim() !== '');

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

    parsed = wordsOrEmotes.map((v) => {
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
  };

  $: message && updateParsedMessage();

  $: parsedMessage = parsed.join('');
</script>

<span style="position: relative">{@html parsedMessage}</span>

<style>
  :global(.emote) {
    margin-right: 0.25em;
  }

  :global(.emote-image) {
    position: relative;
    top: -0.1em;
    height: 1.1875em;
    display: inline-block;
  }
</style>
