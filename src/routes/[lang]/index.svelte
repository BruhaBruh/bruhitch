<script lang="ts" context="module">
</script>

<script lang="ts">
  import Card from '@components/index/Card.svelte';
  import { locale } from '@i18n/i18n-svelte';
</script>

<svelte:head>
  <title>Главная страница</title>
</svelte:head>

<div class="grid grid-cols-12 gap-4">
  <Card
    class="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 2xl:col-span-2 aspect-video"
    href={`/${$locale}/settings`}
    sveltekit:prefetch
  >
    Настройки
  </Card>
  <Card
    class="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 2xl:col-span-2 aspect-video"
    href={`/${$locale}/chat`}
    sveltekit:prefetch
  >
    Чат
  </Card>
  <Card
    class="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 2xl:col-span-2 aspect-video"
    href={`/${$locale}/donationalerts`}
    sveltekit:prefetch
  >
    Донат оповещения
  </Card>
</div>
