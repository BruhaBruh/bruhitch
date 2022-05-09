<script lang="ts">
  import config from '$lib/stores/donate/config';
  import type { SelectItem } from '@components/ui/Select';
  import Select from '@components/ui/Select.svelte';
  import TextField from '@components/ui/TextField.svelte';
  import LL from '@i18n/i18n-svelte';

  const verticalAlignTypes: SelectItem[] = [
    {
      value: 'top',
      label: $LL.donationAlerts.controls.top()
    },
    {
      value: 'center',
      label: $LL.donationAlerts.controls.center()
    },
    {
      value: 'bottom',
      label: $LL.donationAlerts.controls.bottom()
    }
  ];
</script>

<TextField title={$LL.donationAlerts.controls.verticalAlign()} class="mb-4">
  <Select
    on:selectitem={(e) => config.setVertical(e.detail)}
    selected={[$config.vertical]}
    values={verticalAlignTypes}
  />
</TextField>
