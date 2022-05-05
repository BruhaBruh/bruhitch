<script lang="ts">
  import Backdrop from './ui/Backdrop.svelte';
  import Icon from './ui/Icon.svelte';
  import Portal from './ui/Portal.svelte';

  export let show: boolean = false;
</script>

{#if show}
  <Portal target="#app-container">
    <Backdrop
      class="fixed z-50 top-0 left-0 w-full min-h-screen flex justify-center items-center p-2"
    >
      <Icon icon="spinner" size={96} class="fill-gray-lightest animate-spin" />
    </Backdrop>
  </Portal>
{/if}
