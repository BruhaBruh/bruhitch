<script lang="ts">
  import config from '$lib/stores/prediction/config';
  import Icon from '@components/ui/Icon.svelte';
  import { cubicOut } from 'svelte/easing';
  import { tweened } from 'svelte/motion';
  import { fade } from 'svelte/transition';
  import Cell from './Cell.svelte';

  export let users: number;
  let currentUsers = tweened(0, {
    duration: 1000,
    easing: cubicOut
  });

  $: currentUsers.set(users);
</script>

{#if users}
  <div transition:fade={{ duration: 150 }}>
    <Cell>
      <p>{$currentUsers.toFixed()}</p>
      <Icon icon="smile" class="fill-warning-base" size={$config.fontSize * 2} />
    </Cell>
  </div>
{/if}
