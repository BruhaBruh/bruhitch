<script lang="ts">
  import { ui } from '$lib/stores/ui';
  import Select from '@components/ui/Select.svelte';
  import TextField from '@components/ui/TextField.svelte';
  import LL from '@i18n/i18n-svelte';
</script>

<TextField title={$LL.settings.theme()} class="mb-4">
  <Select
    on:selectitem={(e) => ui.theme.set(e.detail === 'true')}
    selected={[$ui.isDarkTheme.toString()]}
    values={[
      { value: 'true', label: $LL.settings.darkTheme() },
      { value: 'false', label: $LL.settings.lightTheme() }
    ]}
  />
</TextField>
