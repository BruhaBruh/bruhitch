<script lang="ts" context="module">
  import Card from '@components/index/Card.svelte';
  import LL, { locale } from '@i18n/i18n-svelte';
</script>

<script lang="ts">
</script>

<svelte:head>
  <title>{$LL.pageNames.index()}</title>
</svelte:head>

<div class="grid grid-cols-12 gap-x-0 sm:gap-x-8 gap-y-8 container mx-auto">
  <Card
    class="col-span-12 md:col-span-6 lg:col-span-4 2xl:col-span-3 aspect-video"
    href={`/${$locale}/settings`}
    sveltekit:prefetch
  >
    {$LL.settings.name()}
  </Card>
  <Card
    class="col-span-12 md:col-span-6 lg:col-span-4 2xl:col-span-3 aspect-video"
    href={`/${$locale}/chat`}
    sveltekit:prefetch
  >
    {$LL.chat.name()}
  </Card>
  <Card
    class="col-span-12 md:col-span-6 lg:col-span-4 2xl:col-span-3 aspect-video"
    href={`/${$locale}/followalerts`}
    sveltekit:prefetch
  >
    {$LL.followAlerts.name()}
  </Card>
  <Card
    class="col-span-12 md:col-span-6 lg:col-span-4 2xl:col-span-3 aspect-video"
    href={`/${$locale}/subscribealerts`}
    sveltekit:prefetch
  >
    {$LL.subscribeAlerts.name()}
  </Card>
  <Card
    class="col-span-12 md:col-span-6 lg:col-span-4 2xl:col-span-3 aspect-video"
    href={`/${$locale}/bitsalerts`}
    sveltekit:prefetch
  >
    {$LL.bitsAlerts.name()}
  </Card>
  <Card
    class="col-span-12 md:col-span-6 lg:col-span-4 2xl:col-span-3 aspect-video"
    href={`/${$locale}/raidalerts`}
    sveltekit:prefetch
  >
    {$LL.raidAlerts.name()}
  </Card>
  <Card
    class="col-span-12 md:col-span-6 lg:col-span-4 2xl:col-span-3 aspect-video"
    href={`/${$locale}/donationalerts`}
    sveltekit:prefetch
  >
    {$LL.donationAlerts.name()}
  </Card>
</div>
