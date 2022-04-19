<script lang="ts" context="module">
  import { ui } from '$lib/stores/ui';
  import App from '@components/App.svelte';
  import Header from '@components/Header.svelte';
  import { setLocale } from '@i18n/i18n-svelte';
  import type { Locales } from '@i18n/i18n-types';
  import { baseLocale, locales } from '@i18n/i18n-util';
  import { loadLocaleAsync } from '@i18n/i18n-util.async';
  import type { Load } from '@sveltejs/kit';
  import '../app.css';

  type LoadParams = {
    lang?: Locales;
  };

  const replaceLocaleInUrl = (path: string, locale: string): string => {
    const [, , ...rest] = path.split('/');
    return `/${[locale, ...rest].join('/')}`;
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

  <main class="px-2 sm:px-4 py-12">
    <slot />
  </main>
</App>
