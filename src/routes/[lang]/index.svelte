<script lang="ts" context="module">
  import { me } from '$lib/stores/me';
  import type { CardItem } from '$types/index/card';
  import Card from '@components/index/Card.svelte';
  import LL, { locale } from '@i18n/i18n-svelte';

  const publicCards: CardItem[] = [
    {
      path: 'settings',
      LL: 'settings'
    },
    {
      path: 'chat',
      LL: 'chat'
    }
  ];
  const privateCards: CardItem[] = [
    {
      path: 'settings',
      LL: 'settings'
    },
    {
      path: 'chat',
      LL: 'chat'
    },
    {
      path: 'followalerts',
      LL: 'followAlerts'
    },
    {
      path: 'subscribealerts',
      LL: 'subscribeAlerts'
    },
    {
      path: 'prediction',
      LL: 'predictionWidget'
    },
    {
      path: 'wip',
      LL: 'bitsAlerts'
    },
    {
      path: 'wip',
      LL: 'raidAlerts'
    },
    {
      path: 'wip',
      LL: 'donationAlerts'
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
      class="col-span-12 md:col-span-6 lg:col-span-4 2xl:col-span-3 aspect-video"
      href={`/${$locale}/${card.path}`}
    >
      {$LL[card.LL].name()}
    </Card>
  {/each}
</div>
