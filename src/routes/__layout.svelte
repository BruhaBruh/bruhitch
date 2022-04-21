<script lang="ts" context="module">
  import replaceLocaleInUrl from '$lib/replaceLocaleInUrl';
  import { ui } from '$lib/stores/ui';
  import App from '@components/App.svelte';
  import Header from '@components/Header.svelte';
  import Backdrop from '@components/ui/Backdrop.svelte';
  import Toast from '@components/ui/Toast.svelte';
  import { setLocale } from '@i18n/i18n-svelte';
  import type { Locales } from '@i18n/i18n-types';
  import { baseLocale, locales } from '@i18n/i18n-util';
  import { loadLocaleAsync } from '@i18n/i18n-util.async';
  import type { Load } from '@sveltejs/kit';
  import { slide } from 'svelte/transition';
  import '../app.css';

  type LoadParams = {
    lang?: Locales;
  };

  export const load: Load<LoadParams> = async ({ url, session, params }) => {
    const lang = params.lang || (url.pathname.split('/')[1] as Locales);

    if (!lang) {
      return {
        status: 302,
        redirect: `/${session.locale}`
      };
    }

    if (!locales.includes(lang)) {
      return {
        status: 302,
        redirect: replaceLocaleInUrl(url.pathname, baseLocale)
      };
    }

    delete session.locale;
    await loadLocaleAsync(lang);
    return { props: { locale: lang, isDark: session.isDark } };
  };
</script>

<script lang="ts">
  export let locale: Locales;
  export let isDark: boolean;

  setLocale(locale);
  ui.theme.set(isDark);
</script>

<App>
  <Header />
  {#if $ui.modal}
    <Backdrop
      class="fixed z-50 top-0 left-0 w-full min-h-screen flex justify-center items-center p-2"
      on:mousedown={() => ui.modal.set(null)}
    >
      <svelte:component this={$ui.modal} />
    </Backdrop>
  {/if}
  {#if $ui.toastList.length !== 0}
    <div
      class="fixed bottom-0 left-1/2 -translate-x-1/2 p-2 sm:p-4 flex flex-col-reverse items-center z-40 max-w-sm w-full"
      transition:slide={{ duration: 150 }}
    >
      {#each $ui.toastList.sort((a, b) => b.id - a.id) as item (item.id)}
        <Toast {...item} class="mt-4" on:remove={(e) => ui.toast.remove(e.detail)} />
      {/each}
    </div>
  {/if}
  <main class="px-2 sm:px-4 py-12">
    <slot />
  </main>
</App>
