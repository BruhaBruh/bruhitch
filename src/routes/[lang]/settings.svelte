<script lang="ts" context="module">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import replaceLocaleInUrl from '$lib/replaceLocaleInUrl';
  import { ui } from '$lib/stores/ui';
  import Select from '@components/ui/Select.svelte';
  import TextField from '@components/ui/TextField.svelte';
  import Typography from '@components/ui/Typography.svelte';
  import LL, { locale, setLocale } from '@i18n/i18n-svelte';
  import { locales } from '@i18n/i18n-util';
  import { loadLocale } from '@i18n/i18n-util.sync';
</script>

<script lang="ts">
  let selectedTheme = [`${$ui.isDarkTheme}`];
  let selectedLocale = [$locale];
  let initialLocale = true;

  const localeLanguages = {
    en: 'English',
    ru: 'Русский'
  };

  $: ui.theme.set(selectedTheme[0] === 'true');
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

<svelte:head>
  <title>{$LL.pageNames.settings()}</title>
</svelte:head>

<div class="container mx-auto">
  <Typography variant="h1" class="mb-8">{$LL.settings.name()}</Typography>
  <TextField title={$LL.settings.theme()} class="mb-4">
    <Select
      bind:selected={selectedTheme}
      values={[
        { value: 'true', label: $LL.settings.darkTheme() },
        { value: 'false', label: $LL.settings.lightTheme() }
      ]}
    />
  </TextField>
  <TextField title={$LL.settings.language()} class="mb-4">
    <Select
      bind:selected={selectedLocale}
      values={locales.map((v) => ({
        value: v,
        label: localeLanguages[v] ?? 'Неизвестный язык'
      }))}
    />
  </TextField>
</div>
