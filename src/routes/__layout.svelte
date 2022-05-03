<script lang="ts" context="module">
  import { browser } from '$app/env';
  import replaceLocaleInUrl from '$lib/replaceLocaleInUrl';
  import { me } from '$lib/stores/me';
  import { ui } from '$lib/stores/ui';
  import App from '@components/App.svelte';
  import Header from '@components/Header.svelte';
  import ToastList from '@components/ToastList.svelte';
  import { setLocale } from '@i18n/i18n-svelte';
  import type { Locales } from '@i18n/i18n-types';
  import { baseLocale, locales } from '@i18n/i18n-util';
  import { loadLocaleAsync } from '@i18n/i18n-util.async';
  import type { Load } from '@sveltejs/kit';
  import { onDestroy, onMount } from 'svelte';
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
      if (['chat', 'follow', 'subscribe'].includes(lang)) {
        // delete session.locale;
        await loadLocaleAsync(baseLocale);
        return { props: { locale: baseLocale, isDark: session.isDark } };
      }
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

  let timeout: NodeJS.Timeout;

  const refreshToken = async () => {
    try {
      const res = await fetch('/api/v1/auth/refresh', {
        method: 'POST'
      }).then(async (r) => ({
        status: r.status,
        data: (await r.json()) as User
      }));
      if (res.status !== 200) return me.reset();
      me.set(res.data);
      timeout = setTimeout(refreshToken, 1000 * 60 * 3);
    } catch (e) {}
  };

  onMount(() => {
    if (!browser) return;
    refreshToken();
  });

  onDestroy(() => {
    clearTimeout(timeout);
  });
</script>

<App>
  <Header />
  <ToastList />
  <main class="px-2 sm:px-4 py-12">
    <slot />
  </main>
</App>
