<script lang="ts">
  import follow from '$lib/stores/follow/follow';
  import faker from '@faker-js/faker';
  import { onDestroy, onMount } from 'svelte';
  import FollowWidget from './widget/FollowWidget.svelte';

  export let withWrapper = true;

  let timeout: NodeJS.Timeout;

  onMount(() => {
    sendNewFollow();
  });

  const sendNewFollow = () => {
    const nickname = faker.name.firstName();
    const broadcaster = faker.name.firstName();

    follow.add({
      user_id: faker.datatype.uuid(),
      user_login: nickname,
      user_name: nickname,
      broadcaster_user_id: faker.datatype.uuid(),
      broadcaster_user_login: broadcaster,
      broadcaster_user_name: broadcaster,
      followed_at: new Date().toISOString()
    });

    timeout = setTimeout(sendNewFollow, Math.floor(Math.random() * 2000 + 2000));
  };

  onDestroy(() => clearTimeout(timeout));
</script>

{#if withWrapper}
  <div
    {...$$restProps}
    class={[
      'preview border border-gray-base h-full sticky top-4 flex items-center justify-center overflow-hidden bg-gray-lightest',
      $$restProps.class
    ]
      .filter(Boolean)
      .join(' ')}
  >
    <div class="h-full w-full flex flex-col items-stretch justify-start overflow-hidden">
      <FollowWidget />
    </div>
  </div>
{:else}
  <FollowWidget />
{/if}

<style lang="postcss">
  .preview {
    height: 576px;
  }
</style>
