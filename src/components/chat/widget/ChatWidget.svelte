<script lang="ts">
  import chat from '$lib/stores/chat/chat';
  import config from '$lib/stores/chat/config';
  import { fade } from 'svelte/transition';
  import MessageAlternativeBlock from './MessageAlternativeBlock.svelte';
  import MessageBlock from './MessageBlock.svelte';
  import MessageDefault from './MessageDefault.svelte';
</script>

<div
  class="max-h-full h-screen flex flex-col-reverse items-stretch"
  style={[$config.disablePadding ? '' : `padding: ${$config.fontSize}px`]
    .filter(Boolean)
    .join('; ')}
>
  {#if !!$chat.length}
    <div
      class="chat-container text-gray-lightest bg-opacity-75"
      class:bg-gray-darkest={$config.chatType === 'default'}
      style={[
        `font-size: ${$config.fontSize * 2}px`,
        $config.chatType !== 'default' ? '' : `border-radius: ${$config.fontSize}px`,
        $config.chatType !== 'default' ? '' : `padding: ${$config.fontSize}px`,
        `font-family: ${
          $config.font ? $config.font + ', ' : ''
        }Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
        `--margin: ${$config.fontSize / 2}px`
      ]
        .filter(Boolean)
        .join('; ')}
      transition:fade
    >
      {#if $config.chatType === 'block'}
        {#each $chat.sort((a, b) => b.time - a.time) as msg (msg.id)}
          <MessageBlock {msg} />
        {/each}
      {:else if $config.chatType === 'alternative-block'}
        {#each $chat.sort((a, b) => b.time - a.time) as msg (msg.id)}
          <MessageAlternativeBlock {msg} />
        {/each}
      {:else}
        {#each $chat.sort((a, b) => b.time - a.time) as msg (msg.id)}
          <MessageDefault {msg} />
        {/each}
      {/if}
    </div>
  {/if}
</div>

<style>
  .chat-container {
    max-height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column-reverse;
    align-items: stretch;
  }

  :global(.chat-container > *) {
    margin-top: var(--margin);
  }

  :global(.chat-container > *:last-child) {
    margin-top: 0;
  }
</style>
