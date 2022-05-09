<script lang="ts" context="module">
  import { me } from '$lib/stores/me';
  import type { CardItem } from '$types/index/card';
  import Card from '@components/index/Card.svelte';
  import LL, { locale } from '@i18n/i18n-svelte';

  const publicCards: CardItem[] = [
    {
      path: 'settings',
      LL: 'settings',
      isWorking: true
    },
    {
      path: 'chat',
      LL: 'chat',
      isWorking: true
    }
  ];
  const privateCards: CardItem[] = [
    {
      path: 'settings',
      LL: 'settings',
      isWorking: true
    },
    {
      path: 'chat',
      LL: 'chat',
      isWorking: true
    },
    {
      path: 'followalerts',
      LL: 'followAlerts',
      isWorking: true
    },
    {
      path: 'subscribealerts',
      LL: 'subscribeAlerts',
      isWorking: true
    },
    {
      path: 'prediction',
      LL: 'predictionWidget',
      isWorking: true
    },
    {
      path: 'donationalerts',
      LL: 'donationAlerts',
      isWorking: true
    },
    {
      path: 'wip',
      LL: 'bitsAlerts'
    },
    {
      path: 'wip',
      LL: 'raidAlerts'
    }
  ];
</script>

<script lang="ts">
  let cards: CardItem[] = publicCards;
  $: cards = $me ? privateCards : publicCards;
</script>

<svelte:head>
  <title>{$LL.pageNames.index()}</title>
</svelte:head>

<div class="grid grid-cols-12 gap-x-0 sm:gap-x-8 gap-y-8 container mx-auto">
  {#each cards as card}
    <Card
      tag="a"
      class={[
        'col-span-12 md:col-span-6 lg:col-span-4 2xl:col-span-3 aspect-video',
        card.isWorking ? 'border-primary-lighter dark:border-primary-darker' : ''
      ]
        .filter(Boolean)
        .join(' ')}
      href={`/${$locale}/${card.path}`}
    >
      {$LL[card.LL].name()}
    </Card>
  {/each}
</div>
