<script lang="ts">
  import config from '$lib/stores/follow/config';
  import type { SelectItem } from '@components/ui/Select';
  import Select from '@components/ui/Select.svelte';
  import TextField from '@components/ui/TextField.svelte';
  import LL from '@i18n/i18n-svelte';

  const horizontalAlignTypes: SelectItem[] = [
    {
      value: 'left',
      label: $LL.followAlerts.controls.left()
    },
    {
      value: 'center',
      label: $LL.followAlerts.controls.center()
    },
    {
      value: 'right',
      label: $LL.followAlerts.controls.right()
    }
  ];
</script>

<TextField title={$LL.followAlerts.controls.horizontalAlign()} class="mb-4">
  <Select
    on:selectitem={(e) => config.setHorizontal(e.detail)}
    selected={[$config.horizontal]}
    values={horizontalAlignTypes}
  />
</TextField>
