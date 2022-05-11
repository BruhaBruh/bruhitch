<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import replaceLocaleInUrl from '$lib/replaceLocaleInUrl';
  import Select from '@components/ui/Select.svelte';
  import TextField from '@components/ui/TextField.svelte';
  import LL, { locale, setLocale } from '@i18n/i18n-svelte';
  import { locales } from '@i18n/i18n-util';
  import { loadLocale } from '@i18n/i18n-util.sync';

  const localeLanguages = {
    en: 'English',
    ru: 'Русский'
  };

  let selectedLocale = [$locale];
  let initialLocale = true;

  $: {
    if (initialLocale) {
      initialLocale = false;
    } else {
      goto(replaceLocaleInUrl($page.url.pathname, selectedLocale[0]));
      loadLocale(selectedLocale[0]);
      setLocale(selectedLocale[0]);
    }
  }
</script>

<TextField title={$LL.settings.language()} class="mb-4">
  <Select
    class="w-full max-w-sm"
    bind:selected={selectedLocale}
    values={locales.map((v) => ({
      value: v,
      label: localeLanguages[v] ?? 'Неизвестный язык'
    }))}
  />
</TextField>
