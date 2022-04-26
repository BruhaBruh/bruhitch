<script lang="ts">
  import { ui } from '$lib/stores/ui';
  import { slide } from 'svelte/transition';
  import Toast from './ui/Toast.svelte';
</script>

{#if $ui.toastList.length}
  <div
    class="fixed bottom-0 left-1/2 -translate-x-1/2 p-2 sm:p-4 flex flex-col-reverse items-center z-30 max-w-sm w-full"
    transition:slide={{ duration: 150 }}
  >
    {#each $ui.toastList.sort((a, b) => b.id - a.id) as item (item.id)}
      <Toast {...item} class="mt-4" on:remove={(e) => ui.toast.remove(e.detail)} />
    {/each}
  </div>
{/if}
