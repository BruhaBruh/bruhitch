<script lang="ts" context="module">
  import { me } from '$lib/stores/me';
  import Card from '@components/index/Card.svelte';
  import LL, { locale } from '@i18n/i18n-svelte';
</script>

<script lang="ts">
  let cards: {
    path: string;
    LL: string;
  }[] = [
    {
      path: 'settings',
      LL: 'settings'
    },
    {
      path: 'chat',
      LL: 'chat'
    }
  ];
  $: cards = $me
    ? [
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
      ]
    : [
        {
          path: 'settings',
          LL: 'settings'
        },
        {
          path: 'chat',
          LL: 'chat'
        }
      ];
</script>

<svelte:head>
  <title>{$LL.pageNames.index()}</title>
</svelte:head>

<div class="grid grid-cols-12 gap-x-0 sm:gap-x-8 gap-y-8 container mx-auto">
  {#each cards as card}
    <Card
      class="col-span-12 md:col-span-6 lg:col-span-4 2xl:col-span-3 aspect-video"
      href={`/${$locale}/${card.path}`}
      sveltekit:prefetch
    >
      {$LL[card.LL].name()}
    </Card>
  {/each}
</div>
