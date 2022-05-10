<script lang="ts" context="module">
  import { privateRoutes, publicRoutes } from '$lib/indexRoutes';
  import { me } from '$lib/stores/me';
  import Card from '@components/index/Card.svelte';
  import LL, { locale } from '@i18n/i18n-svelte';
</script>

<script lang="ts">
  $: routes = $me
    ? privateRoutes.filter((v) => v.isWorking)
    : publicRoutes.filter((v) => v.isWorking);
</script>

<svelte:head>
  <title>{$LL.pageNames.index()}</title>
</svelte:head>

<div class="grid grid-cols-12 gap-x-0 sm:gap-x-8 gap-y-8 container mx-auto">
  {#each routes as route}
    <Card
      tag="a"
      class="col-span-12 md:col-span-6 lg:col-span-4 2xl:col-span-3 aspect-video"
      href={`/${$locale}/${route.path}`}
    >
      {$LL[route.LL].name()}
    </Card>
  {/each}
</div>
