<script lang="ts">
  import config, { getEasing } from '$lib/stores/chat/config';
  import { Animation } from '$types/animation';
  import type { ChatMessage } from '$types/chat';
  import { fade, scale, slide } from 'svelte/transition';
  import Text from './Text.svelte';
  import UserName from './UserName.svelte';

  export let msg: ChatMessage;

  const getAnimation = (animation: Animation) => {
    switch (animation) {
      case Animation.Slide:
        return slide;
      case Animation.Fade:
        return fade;
      case Animation.Scale:
        return scale;
      default:
        return undefined;
    }
  };

  $: animation = getAnimation($config.animation);
</script>

<div
  transition:animation={{ ...$config.animationParams, easing: getEasing($config.animationEasing) }}
  class="chat-message"
>
  <div class="layout">
    <div class="mds">
      <UserName
        color={msg.state.color}
        userBadges={msg.state.badges}
        nickname={msg.state['display-name']}
      /><Text message={msg.message} />
    </div>
  </div>
</div>

<style>
  .chat-message {
    position: relative;
    overflow-wrap: anywhere;
  }

  .layout {
    position: relative;
    border: 0;
    font-size: 100%;
    font: inherit;
    margin: 0;
    padding: 0;
    vertical-align: baseline;
  }

  .mds {
    display: inline;
    overflow-wrap: anywhere;
  }
</style>
