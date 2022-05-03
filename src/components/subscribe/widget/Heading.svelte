<script lang="ts">
  import { generateGradient, generateLightenColor } from '$lib/color';
  import config from '$lib/stores/subscribe/config';
  import { rawDataSymbol } from '@twurple/common';
  import type { PubSubSubscriptionMessage } from '@twurple/pubsub';

  export let msg: PubSubSubscriptionMessage;
  let heading = '';

  const withReplaceImages = (str: string) => {
    const imageRegex = /!\[([^\]]*)\]\((.*?)(?=\"|\))\)/gi;

    return str
      .replaceAll(
        imageRegex,
        `<span class="emote"><span style="width: 0.5em; height: 0.5em;"><img class="emote-image" src="$2" alt="$1"/></span></span>`
      )
      .split(' ')
      .join(' ');
  };

  const getUsername = (username: string, color: string, isGradient: boolean) => {
    let startColor = color;
    let endColor = isGradient ? generateLightenColor(color) : color;

    let gradient = generateGradient(startColor, endColor);

    return `<span style="background: linear-gradient(to right, ${gradient.join(
      ', '
    )}); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent">${
      username ? username : 'Anonymous'
    }</span>`;
  };

  const updateMessage = () => {
    const raw = msg[rawDataSymbol];
    const context = raw.context;
    let m = '';
    if (context === 'sub' || context === 'resub') {
      m = $config.subPattern;
    } else {
      if (msg.giftDuration) {
        m = $config.giftMultiMonthPattern;
      } else {
        m = $config.giftPattern;
      }
    }
    const user = getUsername(
      msg.userDisplayName,
      $config.usernameColor,
      $config.isGradientUsername
    );
    const gifter = getUsername(
      msg.gifterDisplayName,
      $config.recipientColor,
      $config.isGradientRecipient
    );
    m = m.replaceAll('$username$', msg.isGift ? gifter : user);
    m = m.replaceAll('$tier$', msg.subPlan === 'Prime' ? 'P' : msg.subPlan[0]);
    m = m.replaceAll('$months$', msg.cumulativeMonths.toString());
    m = m.replaceAll('$streak$', msg.streakMonths.toString());
    if (msg.isGift) {
      m = m.replaceAll('$recipient$', user);
      m = m.replaceAll('$duration$', msg.giftDuration.toString());
    }
    heading = withReplaceImages(m);
  };

  $: msg && updateMessage();
</script>

<p class="whitespace-normal font-semibold" style={`font-size: ${$config.fontSize}px`}>
  {@html heading}
</p>
