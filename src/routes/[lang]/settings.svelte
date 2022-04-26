<script lang="ts" context="module">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import replaceLocaleInUrl from '$lib/replaceLocaleInUrl';
  import { me } from '$lib/stores/me';
  import { ui } from '$lib/stores/ui';
  import FullScreenSpinner from '@components/FullScreenSpinner.svelte';
  import Button from '@components/ui/Button.svelte';
  import Modal from '@components/ui/Modal.svelte';
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
  let showDeleteAccountAlert = false;
  let deleteAccountIsLoading = false;

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

  const handleDeleteAccount = async () => {
    deleteAccountIsLoading = true;

    const status = await fetch('/api/v1/user/remove', { method: 'POST' }).then((r) => r.status);
    deleteAccountIsLoading = false;
    if (status !== 200) {
      ui.toast.add('circle-cancel', $LL.settings.accountNotDeleted(), 'Произошла ошибка', 'danger');
    } else {
      ui.toast.add('circle-check', $LL.settings.accountDeleted(), undefined, 'success');
      me.reset();
    }
  };
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
  {#if $me}
    <TextField title={$LL.settings.deleteAccount()} class="mb-4">
      <Button color="danger" on:click={() => (showDeleteAccountAlert = true)}>
        {$LL.settings.deleteAccount()}
      </Button>
    </TextField>
    <Modal
      show={showDeleteAccountAlert}
      header={$LL.settings.deleteAccount()}
      on:close={() => (showDeleteAccountAlert = false)}
    >
      <Typography variant="b1">
        {$LL.settings.deleteAccountDescription()}
      </Typography>
      <div slot="footer" class="flex justify-end space-x-4 w-full">
        <Button color="secondary" on:click={() => (showDeleteAccountAlert = false)}
          >{$LL.cancel()}</Button
        >
        <Button color="danger" on:click={handleDeleteAccount}>{$LL.delete()}</Button>
      </div>
    </Modal>
    <FullScreenSpinner show={deleteAccountIsLoading} />
  {/if}
</div>
